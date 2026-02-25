import React from 'react';
import { Alert } from 'react-native';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

const router = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
}));

const signOutMock = vi.hoisted(() => vi.fn());

vi.mock('expo-router', () => {
  const Link = ({
    href,
    asChild,
    children,
  }: {
    href: string;
    asChild?: boolean;
    children: React.ReactNode;
  }) => {
    if (asChild && React.isValidElement(children)) return children;
    return React.createElement('a', { href }, children);
  };

  const StackRoot = ({ children }: { children?: React.ReactNode }) =>
    React.createElement('div', null, children);
  const Stack = Object.assign(StackRoot, { Screen: () => null });

  return {
    useRouter: () => router,
    Link,
    Stack,
  };
});

vi.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      firstName: 'Jordan',
      lastName: 'Stone',
      imageUrl: null,
      primaryEmailAddress: { emailAddress: 'jordan@example.com' },
    },
  }),
  useAuth: () => ({
    signOut: signOutMock,
    isSignedIn: true,
    isLoaded: true,
  }),
}));

import DiscoverScreen from '../app/(tabs)/index';
import ProfileScreen from '../app/(tabs)/profile/index';

describe('HumanHomes mobile: discover/settings button behavior', () => {
  beforeEach(() => {
    router.push.mockReset();
    router.replace.mockReset();
    router.back.mockReset();
    signOutMock.mockReset();
    (Alert.alert as unknown as ReturnType<typeof vi.fn>).mockClear();
  });

  it('fires neighborhood card actions for each discover card', () => {
    render(<DiscoverScreen />);

    fireEvent.click(screen.getByRole('button', { name: /Temescal, Oakland/i }));
    fireEvent.click(screen.getByRole('button', { name: /Sellwood, Portland/i }));
    fireEvent.click(screen.getByRole('button', { name: /Noe Valley, San Francisco/i }));

    const alertCalls = (Alert.alert as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(alertCalls).toHaveLength(3);
    expect(alertCalls.at(0)?.[0]).toBe('Temescal, Oakland');
    expect(alertCalls.at(1)?.[0]).toBe('Sellwood, Portland');
    expect(alertCalls.at(2)?.[0]).toBe('Noe Valley, San Francisco');
  });

  it('fires profile settings actions and sign-out action', () => {
    render(<ProfileScreen />);

    fireEvent.click(screen.getByRole('button', { name: /Notifications/i }));
    fireEvent.click(screen.getByRole('button', { name: /Privacy/i }));
    fireEvent.click(screen.getByRole('button', { name: /Help & Support/i }));

    const alertCalls = (Alert.alert as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(alertCalls.at(0)?.[0]).toBe('Notifications');
    expect(alertCalls.at(1)?.[0]).toBe('Privacy');
    expect(alertCalls.at(2)?.[0]).toBe('Help & Support');

    fireEvent.click(screen.getByRole('button', { name: 'Sign Out' }));
    expect(signOutMock).toHaveBeenCalledTimes(1);
  });
});
