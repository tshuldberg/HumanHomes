import { z } from "zod";
import { eq } from "drizzle-orm";
import { users, profiles } from "@humanhomes/db";
import { updateProfileSchema } from "@humanhomes/shared";
import { t, publicProcedure, protectedProcedure } from "../trpc.js";

export const userRouter = t.router({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.clerkId, ctx.userId),
    });

    if (!user) {
      return null;
    }

    const userProfiles = await ctx.db.query.profiles.findMany({
      where: eq(profiles.userId, user.id),
    });

    return { ...user, profiles: userProfiles };
  }),

  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.clerkId, ctx.userId),
      });

      if (!user) {
        return null;
      }

      const [updated] = await ctx.db
        .update(profiles)
        .set({ ...input, updatedAt: new Date() })
        .where(eq(profiles.userId, user.id))
        .returning();

      return updated ?? null;
    }),

  getById: publicProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.userId),
      });

      if (!user) {
        return null;
      }

      const publicProfiles = await ctx.db.query.profiles.findMany({
        where: eq(profiles.userId, user.id),
      });

      const { clerkId: _, ...publicUser } = user;
      return {
        ...publicUser,
        profiles: publicProfiles.filter((p) => p.isPublic),
      };
    }),
});
