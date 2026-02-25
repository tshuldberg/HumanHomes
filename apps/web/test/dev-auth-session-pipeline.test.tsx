import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DevAuthProvider, useDevAuth } from '../src/lib/dev-auth';

function AuthProbe() {
  const auth = useDevAuth();

  if (!auth.isLoaded) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div>{auth.isSignedIn ? 'signed-in' : 'signed-out'}</div>
      <button type="button" onClick={() => auth.signIn('admin', 'admin')}>
        sign-in
      </button>
      <button type="button" onClick={() => auth.signOut()}>
        sign-out
      </button>
    </div>
  );
}

function renderProbe() {
  return render(
    <DevAuthProvider>
      <AuthProbe />
    </DevAuthProvider>,
  );
}

describe('dev auth session pipeline', () => {
  beforeEach(() => {
    sessionStorage.clear();
    document.cookie = 'humanhomes_dev_session=; Path=/; Max-Age=0; SameSite=Lax';
  });

  it('starts signed out with no existing session artifacts', async () => {
    renderProbe();

    await waitFor(() => {
      expect(screen.getByText('signed-out')).toBeInTheDocument();
    });
  });

  it('signs in and persists both sessionStorage and cookie state', async () => {
    renderProbe();

    await waitFor(() => {
      expect(screen.getByText('signed-out')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'sign-in' }));

    await waitFor(() => {
      expect(screen.getByText('signed-in')).toBeInTheDocument();
    });

    expect(sessionStorage.getItem('humanhomes_dev_session')).toBe('true');
    expect(document.cookie).toContain('humanhomes_dev_session=true');
  });

  it('signs out and clears persisted session artifacts', async () => {
    sessionStorage.setItem('humanhomes_dev_session', 'true');
    document.cookie = 'humanhomes_dev_session=true; Path=/; SameSite=Lax';

    renderProbe();

    await waitFor(() => {
      expect(screen.getByText('signed-in')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'sign-out' }));

    await waitFor(() => {
      expect(screen.getByText('signed-out')).toBeInTheDocument();
    });

    expect(sessionStorage.getItem('humanhomes_dev_session')).toBeNull();
    expect(document.cookie).not.toContain('humanhomes_dev_session=true');
  });

  it('hydrates signed-in state from sessionStorage on initial load', async () => {
    sessionStorage.setItem('humanhomes_dev_session', 'true');

    renderProbe();

    await waitFor(() => {
      expect(screen.getByText('signed-in')).toBeInTheDocument();
    });
  });

  it('hydrates signed-in state from cookie when storage is empty', async () => {
    document.cookie = 'humanhomes_dev_session=true; Path=/; SameSite=Lax';

    renderProbe();

    await waitFor(() => {
      expect(screen.getByText('signed-in')).toBeInTheDocument();
    });
    expect(sessionStorage.getItem('humanhomes_dev_session')).toBe('true');
  });
});
