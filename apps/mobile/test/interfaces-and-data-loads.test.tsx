import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@clerk/clerk-expo', () => ({
  useUser: () => ({
    user: {
      firstName: 'Jordan',
    },
  }),
}));

import DiscoverScreen from '../app/(tabs)/index';
import MessagesScreen from '../app/(tabs)/messages';

describe('HumanHomes mobile interface/data loads', () => {
  it('loads discover page with user greeting and neighborhood content', () => {
    render(<DiscoverScreen />);

    expect(screen.getByText('Welcome, Jordan')).toBeInTheDocument();
    expect(screen.getByText('Home Stories')).toBeInTheDocument();
    expect(screen.getByText('Neighborhoods Near You')).toBeInTheDocument();
    expect(screen.getByText('Temescal, Oakland')).toBeInTheDocument();
    expect(screen.getByText('Sellwood, Portland')).toBeInTheDocument();
  });

  it('loads messages empty-state interface copy', () => {
    render(<MessagesScreen />);

    expect(screen.getByText('Your Conversations')).toBeInTheDocument();
    expect(
      screen.getByText(/When you connect with a seller or buyer/),
    ).toBeInTheDocument();
  });
});
