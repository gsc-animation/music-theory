import { describe, it, expect } from 'vitest';
import { calculateScore, calculateStreak } from './scoring';

describe('Scoring Logic', () => {
  describe('calculateScore', () => {
    it('increments score on correct answer', () => {
      expect(calculateScore(10, true)).toBe(11);
    });

    it('maintains score on incorrect answer', () => {
      expect(calculateScore(10, false)).toBe(10);
    });
  });

  describe('calculateStreak', () => {
    it('increments streak on correct answer', () => {
      expect(calculateStreak(5, true)).toBe(6);
    });

    it('resets streak to 0 on incorrect answer', () => {
      expect(calculateStreak(5, false)).toBe(0);
    });
  });
});
