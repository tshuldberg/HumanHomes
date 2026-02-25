import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

(globalThis as { React?: typeof React }).React = React;

const router = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
};

const navState = {
  pathname: '/discover',
  searchParams: new URLSearchParams(),
};

(globalThis as { __HH_ROUTER__?: typeof router }).__HH_ROUTER__ = router;
(globalThis as { __HH_NAV_STATE__?: typeof navState }).__HH_NAV_STATE__ = navState;

vi.mock('next/navigation', () => ({
  useRouter: () => router,
  usePathname: () => navState.pathname,
  useSearchParams: () => navState.searchParams,
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => React.createElement('a', { href, ...props }, children),
}));

vi.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
  useAuth: () => ({ getToken: vi.fn() }),
  SignIn: () => React.createElement('div', null, 'SignIn Component'),
  SignUp: () => React.createElement('div', null, 'SignUp Component'),
}));
