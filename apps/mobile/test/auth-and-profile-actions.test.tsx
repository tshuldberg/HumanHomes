import React from 'react';
import { Alert } from 'react-native';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

const router = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
}));

const signInCreateMock = vi.hoisted(() => vi.fn());
const signUpCreateMock = vi.hoisted(() => vi.fn());
const prepareVerificationMock = vi.hoisted(() => vi.fn());
const attemptVerificationMock = vi.hoisted(() => vi.fn());
const setActiveMock = vi.hoisted(() => vi.fn());
const signOutMock = vi.hoisted(() => vi.fn());

const clerkUser = vi.hoisted(() => ({
  firstName: 'Avery',
  lastName: 'Stone',
  imageUrl: null,
  primaryEmailAddress: { emailAddress: 'avery@example.com' },
}));

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
    if (asChild && React.isValidElement(children)) {
      return children;
    }
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
  useSignIn: () => ({
    signIn: { create: signInCreateMock },
    setActive: setActiveMock,
    isLoaded: true,
  }),
  useSignUp: () => ({
    signUp: {
      create: signUpCreateMock,
      prepareEmailAddressVerification: prepareVerificationMock,
      attemptEmailAddressVerification: attemptVerificationMock,
    },
    setActive: setActiveMock,
    isLoaded: true,
  }),
  useUser: () => ({ user: clerkUser }),
  useAuth: () => ({
    signOut: signOutMock,
    isSignedIn: true,
    isLoaded: true,
  }),
}));

import SignInScreen from '../app/(auth)/sign-in';
import SignUpScreen from '../app/(auth)/sign-up';
import ProfileScreen from '../app/(tabs)/profile/index';
import EditProfileScreen from '../app/(tabs)/profile/edit';

describe('HumanHomes mobile auth/profile actions', () => {
  beforeEach(() => {
    router.push.mockReset();
    router.replace.mockReset();
    router.back.mockReset();
    signInCreateMock.mockReset();
    signUpCreateMock.mockReset();
    prepareVerificationMock.mockReset();
    attemptVerificationMock.mockReset();
    setActiveMock.mockReset();
    signOutMock.mockReset();
    (Alert.alert as unknown as ReturnType<typeof vi.fn>).mockClear();

    signInCreateMock.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'sess_sign_in',
    });
    signUpCreateMock.mockResolvedValue({});
    prepareVerificationMock.mockResolvedValue({});
    attemptVerificationMock.mockResolvedValue({
      status: 'complete',
      createdSessionId: 'sess_sign_up',
    });
    setActiveMock.mockResolvedValue(undefined);
    signOutMock.mockResolvedValue(undefined);
  });

  it('signs in and routes to app tabs', async () => {
    render(<SignInScreen />);

    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'buyer@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your password'), {
      target: { value: 'hunter2' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(signInCreateMock).toHaveBeenCalledWith({
        identifier: 'buyer@example.com',
        password: 'hunter2',
      });
    });
    expect(setActiveMock).toHaveBeenCalledWith({ session: 'sess_sign_in' });
    expect(router.replace).toHaveBeenCalledWith('/(tabs)');
  });

  it('shows sign-in error and does not route when credentials fail', async () => {
    signInCreateMock.mockRejectedValueOnce(new Error('Invalid email or password'));

    render(<SignInScreen />);

    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'buyer@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your password'), {
      target: { value: 'wrong-password' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument();
    });
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('completes sign-up and email verification flow', async () => {
    render(<SignUpScreen />);

    fireEvent.change(screen.getByPlaceholderText('First'), {
      target: { value: 'Taylor' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last'), {
      target: { value: 'Harper' },
    });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create a password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(signUpCreateMock).toHaveBeenCalledWith({
        firstName: 'Taylor',
        lastName: 'Harper',
        emailAddress: 'new@example.com',
        password: 'password123',
      });
      expect(prepareVerificationMock).toHaveBeenCalledWith({
        strategy: 'email_code',
      });
    });

    fireEvent.change(screen.getByPlaceholderText('000000'), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify Email' }));

    await waitFor(() => {
      expect(attemptVerificationMock).toHaveBeenCalledWith({ code: '123456' });
    });
    expect(setActiveMock).toHaveBeenCalledWith({ session: 'sess_sign_up' });
    expect(router.replace).toHaveBeenCalledWith('/(tabs)');
  });

  it('shows verification error and stays on verify step for invalid code', async () => {
    attemptVerificationMock.mockRejectedValueOnce(new Error('Invalid verification code.'));

    render(<SignUpScreen />);

    fireEvent.change(screen.getByPlaceholderText('First'), {
      target: { value: 'Taylor' },
    });
    fireEvent.change(screen.getByPlaceholderText('Last'), {
      target: { value: 'Harper' },
    });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create a password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create Account' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Verify Email' })).toBeInTheDocument();
    });

    fireEvent.change(screen.getByPlaceholderText('000000'), {
      target: { value: '999999' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Verify Email' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid verification code.')).toBeInTheDocument();
    });
    expect(router.replace).not.toHaveBeenCalledWith('/(tabs)');
  });

  it('routes to edit profile and signs out from profile screen', () => {
    render(<ProfileScreen />);

    fireEvent.click(screen.getByText('Edit Profile'));
    expect(router.push).toHaveBeenCalledWith('/(tabs)/profile/edit');

    fireEvent.click(screen.getByRole('button', { name: 'Sign Out' }));
    expect(signOutMock).toHaveBeenCalledTimes(1);
  });

  it('saves profile edits and returns after alert confirmation', () => {
    vi.useFakeTimers();
    render(<EditProfileScreen />);

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }));
    act(() => {
      vi.advanceTimersByTime(500);
    });

    const alertMock = Alert.alert as unknown as ReturnType<typeof vi.fn>;
    expect(alertMock).toHaveBeenCalledTimes(1);
    const firstCall = alertMock.mock.calls[0];
    const maybeActions = (firstCall ? firstCall[2] : undefined) as
      | Array<{ onPress?: () => void }>
      | undefined;
    maybeActions?.[0]?.onPress?.();
    expect(router.back).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});
