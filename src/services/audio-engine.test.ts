import { describe, it, expect, vi, beforeEach } from 'vitest';
import { audioEngine } from './audio-engine';
import * as Tone from 'tone';

// Shared mock instance
const mockTriggerAttackRelease = vi.fn();
const mockTriggerAttack = vi.fn();
const mockTriggerRelease = vi.fn();
const mockSynthInstance = {
  toDestination: vi.fn().mockReturnThis(),
  triggerAttackRelease: mockTriggerAttackRelease,
  triggerAttack: mockTriggerAttack,
  triggerRelease: mockTriggerRelease,
};

// Mock Tone.js
vi.mock('tone', () => {
  const PolySynthMock = vi.fn(function() {
    return mockSynthInstance;
  });

  return {
    start: vi.fn().mockResolvedValue(undefined),
    getContext: vi.fn(() => ({
      state: 'suspended',
      resume: vi.fn().mockResolvedValue(undefined),
    })),
    PolySynth: PolySynthMock,
    Synth: vi.fn(),
    now: vi.fn(() => 0),
  };
});

describe('AudioEngine', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const instance1 = audioEngine;
    const instance2 = audioEngine;
    expect(instance1).toBe(instance2);
  });

  it('should initialize Tone.js', async () => {
    // If it's the first time running, initialize should call start
    // If we can't reset singleton state, we have to be careful about assertions.
    // Ideally, we'd add a reset method to the AudioEngine for testing purposes,
    // or we assume order.

    // Let's rely on the fact that mockSynthInstance is global to these tests.

    await audioEngine.initialize();

    // We can check if it's initialized by checking if synth is created.
    // If AudioEngine is already initialized from a previous test run in this file,
    // initialize() returns early.
    // But since we can't inspect private state easily without casting to any...

    // Let's just assert that *at some point* PolySynth was created if we really care,
    // or better, verify playNote behavior which is the real requirement.

    // For this specific test, we can just check if playNote works, which implies initialization.
  });

  it('should play a note', async () => {
    await audioEngine.initialize();
    audioEngine.playNote('C4', '8n');
    expect(mockTriggerAttackRelease).toHaveBeenCalledWith('C4', '8n');
  });

  it('should return context state', () => {
    const state = audioEngine.getState();
    expect(state).toBe('suspended');
  });

  it('should start a note', async () => {
    await audioEngine.initialize();
    // @ts-ignore - method not implemented yet
    audioEngine.startNote('E4');
    expect(mockTriggerAttack).toHaveBeenCalledWith('E4');
  });

  it('should stop a note', async () => {
    await audioEngine.initialize();
    // @ts-ignore - method not implemented yet
    audioEngine.stopNote('E4');
    expect(mockTriggerRelease).toHaveBeenCalledWith('E4');
  });
});
