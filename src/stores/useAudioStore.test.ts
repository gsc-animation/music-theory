import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAudioStore } from './useAudioStore';
import { audioEngine } from '../services/audio-engine';

// Mock audio engine
vi.mock('../services/audio-engine', () => ({
  audioEngine: {
    initialize: vi.fn(),
    playNote: vi.fn(),
    getState: vi.fn().mockReturnValue('suspended'),
  },
}));

describe('useAudioStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset store state
    const { result } = renderHook(() => useAudioStore());
    act(() => {
      useAudioStore.setState({ isReady: false, isPlaying: false, currentNote: null });
    });
  });

  it('should have initial state', () => {
    const { result } = renderHook(() => useAudioStore());
    expect(result.current.isReady).toBe(false);
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.currentNote).toBe(null);
  });

  it('should initialize audio', async () => {
    const { result } = renderHook(() => useAudioStore());

    await act(async () => {
      await result.current.initializeAudio();
    });

    expect(audioEngine.initialize).toHaveBeenCalled();
    expect(result.current.isReady).toBe(true);
  });

  it('should trigger note', () => {
    const { result } = renderHook(() => useAudioStore());

    act(() => {
      result.current.triggerNote('C4');
    });

    expect(audioEngine.playNote).toHaveBeenCalledWith('C4', '8n');
    expect(result.current.currentNote).toBe('C4');
    expect(result.current.isPlaying).toBe(true);
  });
});
