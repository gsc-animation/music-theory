import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor, cleanup } from '@testing-library/react';
import { HomePage } from './HomePage';
import { useAudioStore } from '../stores/useAudioStore';
import { useNotationStore } from '../stores/useNotationStore';

// Mock AbcScore component (replacing MusicStaff)
vi.mock('../components/MusicStaff/AbcScore', () => ({
  default: ({ notation }: { notation: string }) => (
    <div data-testid="abc-score-mock">{notation}</div>
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

// Mock Storage Manager
vi.mock('../services/storage-manager', () => ({
  requestPersistentStorage: vi.fn().mockResolvedValue(true),
  getStorageEstimate: vi.fn().mockResolvedValue({ usage: 0, quota: 0 }),
}));

describe('HomePage Integration', () => {
  beforeEach(() => {
    // Reset audio store state
    useAudioStore.setState({
      activeNotes: [],
      recordedNotes: [],
      isPlaying: false,
    });
    // Reset notation store state
    useNotationStore.setState({
      notes: '',
      header: {
        title: 'Untitled',
        meter: '4/4',
        unitLength: '1/4',
        key: 'C',
        tempo: 120,
      },
      history: [],
      historyIndex: -1,
    });
    cleanup();
  });

  it('updates ABC notation when piano key is pressed', async () => {
    render(<HomePage />);
    const c4Key = screen.getByRole('button', { name: /C4/i });

    // Wait for Suspense to load the lazy component
    await waitFor(() => screen.getByTestId('abc-score-mock'));

    // Initial state: no notes in store
    expect(useNotationStore.getState().notes).toBe('');

    // Press and release key (note is added on key release)
    await act(async () => {
      fireEvent.pointerDown(c4Key);
    });
    await act(async () => {
      fireEvent.pointerUp(c4Key);
    });

    // Check store has the note (C4 becomes 'C' in ABC notation)
    await waitFor(() => {
      const notes = useNotationStore.getState().notes;
      expect(notes).toContain('C');
    });
  });
});
