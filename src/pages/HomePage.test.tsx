import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor, cleanup } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useAudioStore } from '../stores/useAudioStore';

// Mock MusicStaff to verify props
// Use a real module mock instead of string to handle React.lazy import correctly in tests
vi.mock('../components/MusicStaff/MusicStaff', () => ({
  MusicStaff: ({ notes }: { notes: string[] }) => (
    <div data-testid="music-staff-mock">{notes.join(', ')}</div>
  ),
}));

// We also need to mock the features path if it's imported from there in some places,
// but HomePage.tsx imports from '../components/MusicStaff/MusicStaff'
// (which is a lazy import in HomePage.tsx: const MusicStaff = React.lazy(() => import('../components/MusicStaff/MusicStaff')...))

// Mock Audio Engine
vi.mock('../services/audio-engine', () => ({
  audioEngine: {
    initialize: vi.fn(),
    startNote: vi.fn(),
    stopNote: vi.fn(),
    playNote: vi.fn(),
  }
}));

// Mock Storage Manager
vi.mock('../services/storage-manager', () => ({
  requestPersistentStorage: vi.fn().mockResolvedValue(true),
  getStorageEstimate: vi.fn().mockResolvedValue({ usage: 0, quota: 0 }),
}));

describe('HomePage Integration', () => {
  beforeEach(() => {
    // Reset store state
    useAudioStore.setState({
      activeNotes: [],
      recordedNotes: [],
      isPlaying: false,
    });
    cleanup();
  });

  it('updates staff when piano key is pressed', async () => {
    render(<HomePage />);
    const c4Key = screen.getByRole('button', { name: /C4/i });

    // Wait for Suspense to load the lazy component
    const staff = await waitFor(() => screen.getByTestId('music-staff-mock'));

    // Initial state: Rest
    expect(staff).toHaveTextContent('b4/w/r');

    // Press key
    await act(async () => {
        fireEvent.pointerDown(c4Key);
    });

    // Check staff update - now records history
    // Since we cleared recordedNotes, it should contain just this note formatted for VexFlow
    // "c4/q" is the expected format from HomePage.tsx logic: .map(n => n.toLowerCase() + '/q')
    await waitFor(() => {
       expect(screen.getByTestId('music-staff-mock')).toHaveTextContent('c4/q');
    });

    // Release key
    await act(async () => {
        fireEvent.pointerUp(c4Key);
    });

    // Check staff persistence (should NOT reset to rest)
    expect(screen.getByTestId('music-staff-mock')).toHaveTextContent('c4/q');
  });
});
