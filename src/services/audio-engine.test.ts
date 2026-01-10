import { describe, it, expect, vi } from 'vitest';
import { audioEngine } from './audio-engine';
import * as Tone from 'tone';

vi.mock('tone', () => ({
  start: vi.fn(),
  getContext: vi.fn(),
}));

describe('AudioEngine', () => {
  it('should be a singleton', () => {
    const instance1 = audioEngine;
    const instance2 = audioEngine;
    expect(instance1).toBe(instance2);
  });

  it('should initialize Tone.js', async () => {
    await audioEngine.initialize();
    expect(Tone.start).toHaveBeenCalled();
  });
});
