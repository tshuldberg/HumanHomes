import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const devAuthState = vi.hoisted(() => ({
  isLoaded: true,
  isSignedIn: false,
  user: {
    firstName: 'Admin',
    fullName: 'Admin User',
    imageUrl: null,
    primaryEmailAddress: { emailAddress: 'admin@humanhomes.dev' },
  },
  signIn: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock('@/lib/dev-auth', () => ({
  useDevAuth: () => devAuthState,
}));

import DevLoginPage from '../src/app/dev-login/page';
import AppLayout from '../src/app/(app)/layout';
import ProfileClient from '../src/app/(app)/profile/profile-client';

describe('HumanHomes web auth/layout/profile actions', () => {
  beforeEach(() => {
    const router = (globalThis as { __HH_ROUTER__: { push: ReturnType<typeof vi.fn>; replace: ReturnType<typeof vi.fn>; back: ReturnType<typeof vi.fn> } }).__HH_ROUTER__;
    const nav = (globalThis as { __HH_NAV_STATE__: { pathname: string; searchParams: URLSearchParams } }).__HH_NAV_STATE__;
    router.push.mockReset();
    router.replace.mockReset();
    router.back.mockReset();
    nav.pathname = '/discover';
    nav.searchParams = new URLSearchParams();

    devAuthState.isLoaded = true;
    devAuthState.isSignedIn = false;
    devAuthState.signIn.mockReset();
    devAuthState.signOut.mockReset();
  });

  it('submits dev login and routes to discover on valid credentials', () => {
    const router = (globalThis as { __HH_ROUTER__: { push: ReturnType<typeof vi.fn> } }).__HH_ROUTER__;
    devAuthState.signIn.mockReturnValue(true);

    render(<DevLoginPage />);
    const adminInputs = screen.getAllByPlaceholderText('admin');

    fireEvent.change(adminInputs[0], {
      target: { value: 'admin' },
    });
    fireEvent.change(adminInputs[1], {
      target: { value: 'admin' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    expect(devAuthState.signIn).toHaveBeenCalledWith('admin', 'admin');
    expect(router.push).toHaveBeenCalledWith('/discover');
  });

  it('shows invalid credential error on failed dev login', () => {
    devAuthState.signIn.mockReturnValue(false);
    render(<DevLoginPage />);

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('shows sign in CTA in app layout when not signed in', () => {
    devAuthState.isSignedIn = false;
    render(
      <AppLayout>
        <div>child</div>
      </AppLayout>,
    );

    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/dev-login');
  });

  it('signs out and routes home from app layout', () => {
    const router = (globalThis as { __HH_ROUTER__: { push: ReturnType<typeof vi.fn> } }).__HH_ROUTER__;
    devAuthState.isSignedIn = true;
    render(
      <AppLayout>
        <div>child</div>
      </AppLayout>,
    );

    fireEvent.click(screen.getByRole('button', { name: /Sign Out/ }));
    expect(devAuthState.signOut).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith('/');
  });

  it('toggles profile role and updates story placeholder', () => {
    devAuthState.isSignedIn = true;
    render(<ProfileClient />);

    expect(screen.getByPlaceholderText(/I'm a teacher and parent of two/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Selling My Home' }));
    expect(
      screen.getByPlaceholderText(/We've lived here for 20 years/),
    ).toBeInTheDocument();
  });
});
