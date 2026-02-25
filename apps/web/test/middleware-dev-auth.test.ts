// @vitest-environment node

import { describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';

function buildRequest(pathname: string, hasSessionCookie: boolean): NextRequest {
  return {
    nextUrl: new URL(`https://humanhomes.dev${pathname}`),
    url: `https://humanhomes.dev${pathname}`,
    cookies: {
      get: (name: string) =>
        name === 'humanhomes_dev_session' && hasSessionCookie
          ? { name, value: 'true' }
          : undefined,
    },
  } as unknown as NextRequest;
}

describe('middleware dev auth routing', () => {
  it('allows public routes without dev session', async () => {
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    vi.resetModules();
    const { default: middleware } = await import('../src/middleware');

    const response = await middleware(buildRequest('/about', false));
    expect(response.headers.get('location')).toBeNull();
  });

  it('redirects protected routes to /dev-login without dev session', async () => {
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    vi.resetModules();
    const { default: middleware } = await import('../src/middleware');

    const response = await middleware(buildRequest('/discover', false));
    const location = response.headers.get('location');
    expect(location).toContain('/dev-login');
    expect(location).toContain('redirect=%2Fdiscover');
  });

  it('allows protected routes with dev session cookie', async () => {
    delete process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    vi.resetModules();
    const { default: middleware } = await import('../src/middleware');

    const response = await middleware(buildRequest('/discover', true));
    expect(response.headers.get('location')).toBeNull();
  });
});
