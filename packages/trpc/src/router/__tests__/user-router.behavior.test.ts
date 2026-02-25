import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('drizzle-orm', () => ({
  eq: (left: unknown, right: unknown) => ({ left, right }),
}));

vi.mock('@humanhomes/db', () => {
  const users = {
    id: 'users.id',
    clerkId: 'users.clerkId',
  };
  const profiles = {
    userId: 'profiles.userId',
    isPublic: 'profiles.isPublic',
  };

  return {
    users,
    profiles,
  };
});

import { appRouter } from '../index.js';

type DbUser = {
  id: string;
  clerkId: string;
  email: string;
  name: string | null;
  role: 'buyer' | 'seller' | 'both' | null;
  avatarUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type DbProfile = {
  id: string;
  userId: string;
  type: 'buyer' | 'seller';
  bio: string | null;
  story: string | null;
  photoUrls: string[];
  verificationTier: number;
  preferences: Record<string, unknown>;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
};

function createFakeDb(seed?: { users?: DbUser[]; profiles?: DbProfile[] }) {
  const users = [...(seed?.users ?? [])];
  const profiles = [...(seed?.profiles ?? [])];

  return {
    query: {
      users: {
        findFirst: async ({ where }: { where: { left: string; right: string } }) => {
          if (String(where.left).includes('clerkId')) {
            return users.find((user) => user.clerkId === where.right) ?? null;
          }
          if (String(where.left).includes('users.id')) {
            return users.find((user) => user.id === where.right) ?? null;
          }
          return null;
        },
      },
      profiles: {
        findMany: async ({ where }: { where: { right: string } }) =>
          profiles.filter((profile) => profile.userId === where.right),
      },
    },
    update: (_table: unknown) => ({
      set: (input: Partial<DbProfile>) => ({
        where: (where: { right: string }) => ({
          returning: async () => {
            const index = profiles.findIndex((profile) => profile.userId === where.right);
            if (index === -1) return [];
            const next: DbProfile = {
              ...profiles[index]!,
              ...input,
            } as DbProfile;
            profiles[index] = next;
            return [next];
          },
        }),
      }),
    }),
    __state: {
      users,
      profiles,
    },
  };
}

function makeUser(overrides: Partial<DbUser> = {}): DbUser {
  return {
    id: 'f53a4cc1-6fce-4d4a-b89f-6f87ddc644f0',
    clerkId: 'clerk_abc_123',
    email: 'alex@example.com',
    name: 'Alex Lane',
    role: 'buyer',
    avatarUrl: null,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

function makeProfile(overrides: Partial<DbProfile> = {}): DbProfile {
  return {
    id: '00b3a16d-77cc-45f7-b31e-e33fd5f0f54e',
    userId: 'f53a4cc1-6fce-4d4a-b89f-6f87ddc644f0',
    type: 'buyer',
    bio: 'Looking for a walkable neighborhood',
    story: 'We are hoping to find a long-term family home.',
    photoUrls: [],
    verificationTier: 1,
    preferences: { walkable: true },
    isPublic: true,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

describe('tRPC user router: auth, profile updates, and data retrieval pipeline', () => {
  const userId = 'clerk_abc_123';
  let db: ReturnType<typeof createFakeDb>;

  beforeEach(() => {
    db = createFakeDb({
      users: [makeUser()],
      profiles: [
        makeProfile({ id: 'prof-public', isPublic: true }),
        makeProfile({ id: 'prof-private', type: 'seller', isPublic: false }),
      ],
    });
  });

  it('blocks protected routes when caller is not authenticated', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId: null });

    await expect(caller.user.getMe()).rejects.toMatchObject({
      code: 'UNAUTHORIZED',
    });
  });

  it('returns signed-in user and all profile records for getMe', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId });

    const me = await caller.user.getMe();

    expect(me?.email).toBe('alex@example.com');
    expect(me?.profiles).toHaveLength(2);
    expect(me?.profiles.map((profile) => profile.id).sort()).toEqual([
      'prof-private',
      'prof-public',
    ]);
  });

  it('returns null for getMe when auth id is valid but no user record exists', async () => {
    const emptyDb = createFakeDb({ users: [], profiles: [] });
    const caller = appRouter.createCaller({ db: emptyDb as never, userId: 'clerk_unknown' });

    await expect(caller.user.getMe()).resolves.toBeNull();
  });

  it('updates profile data and returns persisted values', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId });

    const updated = await caller.user.updateProfile({
      bio: 'Family of four seeking a close-knit neighborhood.',
      story: 'We are relocating to be closer to grandparents.',
      preferences: { schools: 'high-priority' },
    });

    expect(updated?.bio).toBe('Family of four seeking a close-knit neighborhood.');
    expect(updated?.story).toBe('We are relocating to be closer to grandparents.');
    expect(updated?.preferences).toEqual({ schools: 'high-priority' });

    expect(db.__state.profiles[0]!.bio).toBe('Family of four seeking a close-knit neighborhood.');
  });

  it('rejects invalid profile update payloads with validation errors', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId });

    await expect(
      caller.user.updateProfile({
        bio: 'x'.repeat(3001),
      }),
    ).rejects.toMatchObject({ code: 'BAD_REQUEST' });
  });

  it('returns public profile view only and strips clerkId from getById response', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId: null });

    const publicUser = await caller.user.getById({
      userId: 'f53a4cc1-6fce-4d4a-b89f-6f87ddc644f0',
    });

    expect(publicUser).not.toBeNull();
    expect(publicUser).not.toHaveProperty('clerkId');
    expect(publicUser?.profiles).toHaveLength(1);
    expect(publicUser?.profiles[0]?.isPublic).toBe(true);
  });

  it('returns null from getById when target user is missing', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId: null });

    const result = await caller.user.getById({
      userId: '3f26fdb8-1f4e-412c-b09c-556a1ab2a67e',
    });

    expect(result).toBeNull();
  });

  it('returns health status for public health checks', async () => {
    const caller = appRouter.createCaller({ db: db as never, userId: null });

    const health = await caller.health.check();

    expect(health.status).toBe('ok');
    expect(health.version).toBe('0.1.0');
    expect(typeof health.timestamp).toBe('string');
  });
});
