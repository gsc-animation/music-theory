import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { HomePage } from './HomePage';

// Mock MusicStaff to verify props
vi.mock('../features/sheet/components/MusicStaff', () => ({
  MusicStaff: ({ notes }: { notes: string[] }) => (
    <div data-testid="music-staff-mock">{notes.join(', ')}</div>
  ),
}));

// Mock Audio Engine
vi.mock('../services/audio-engine', () => ({
  audioEngine: {
    initialize: vi.fn(),
    startNote: vi.fn(),
    stopNote: vi.fn(),
    playNote: vi.fn(),
  }
}));

describe('HomePage Integration', () => {
  it('updates staff when piano key is pressed', () => {
    render(<HomePage />);
    const c4Key = screen.getByRole('button', { name: /C4/i });
    const staff = screen.getByTestId('music-staff-mock');

    // Initial state: Rest
    expect(staff).toHaveTextContent('b4/w/r');

    // Press key
    act(() => {
        fireEvent.pointerDown(c4Key);
    });

    // Check staff update - now records history, so "c4" instead of chord "(c4)/w"
    expect(staff).toHaveTextContent('c4');

    // Release key
    act(() => {
        fireEvent.pointerUp(c4Key);
    });

    // Check staff persistence (should NOT reset to rest)
    expect(staff).toHaveTextContent('c4');
  });
});
