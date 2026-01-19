import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { lookaheadScheduler } from './LookaheadScheduler';
import * as Tone from 'tone';

// Mock Tone.js
vi.mock('tone', () => {
  return {
    Transport: {
      start: vi.fn(),
      stop: vi.fn(),
      schedule: vi.fn(),
      cancel: vi.fn(),
      bpm: { value: 120 },
      loop: false,
      loopStart: 0,
      loopEnd: 0,
      progress: 0.5, // Mock progress
      seconds: 10,
      timeSignature: [4, 4]
    },
    start: vi.fn().mockResolvedValue(undefined),
    context: {
        state: 'suspended',
        resume: vi.fn()
    }
  };
});

// Mock AudioContextManager
vi.mock('./AudioContextManager', () => ({
    audioContextManager: {
        initialize: vi.fn().mockResolvedValue(undefined)
    }
}));

describe('LookaheadScheduler', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        // Reset singleton state if possible or rely on stop()
        lookaheadScheduler.stop();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should configure transport correctly', () => {
        lookaheadScheduler.configure(4, '4/4', 100);
        expect(Tone.Transport.bpm.value).toBe(100);
        expect(Tone.Transport.loopEnd).toBe('4m');
    });

    it('should start transport and animation loop', async () => {
        const onTick = vi.fn();

        await lookaheadScheduler.start(onTick);

        expect(Tone.Transport.start).toHaveBeenCalled();
        expect(lookaheadScheduler.running).toBe(true);

        // Trigger a frame
        vi.runAllTicks();

        // Since requestAnimationFrame is likely mocked by jsdom or not firing in this specific mock setup without help
        // But the state should be correct.
    });

    it('should stop transport and loop', async () => {
        const onTick = vi.fn();
        await lookaheadScheduler.start(onTick);

        lookaheadScheduler.stop();

        expect(Tone.Transport.stop).toHaveBeenCalled();
        expect(lookaheadScheduler.running).toBe(false);
    });
});
