import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from '../src/app/page';
import DiscoverPage from '../src/app/(app)/discover/page';
import MessagesPage from '../src/app/(app)/messages/page';

describe('HumanHomes web pages: interfaces and data loads', () => {
  it('loads landing page actions and navigation links', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: 'Sign In' })).toHaveAttribute('href', '/sign-in');
    expect(screen.getByRole('link', { name: 'Join' })).toHaveAttribute('href', '/sign-up');
    expect(screen.getByRole('link', { name: 'Discover Homes' })).toHaveAttribute('href', '/discover');
    expect(screen.getByRole('link', { name: 'Join the Community' })).toHaveAttribute('href', '/sign-up');
  });

  it('loads discover page neighborhood data cards and preference controls', () => {
    render(<DiscoverPage />);

    expect(screen.getByText('Temescal')).toBeInTheDocument();
    expect(screen.getByText('Sellwood')).toBeInTheDocument();
    expect(screen.getByText('Bernal Heights')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Walkable streets' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Yard space' })).toBeInTheDocument();
  });

  it('loads messages page empty-state content', () => {
    render(<MessagesPage />);

    expect(screen.getByText('No conversations yet')).toBeInTheDocument();
    expect(
      screen.getByText(/When you reach out to a seller or a buyer contacts you/),
    ).toBeInTheDocument();
  });
});
