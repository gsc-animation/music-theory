import { describe, it, expect } from 'vitest';
import { getNoteAtPosition, getPositionsForNote, GUITAR_TUNING } from './guitar-logic';

describe('guitar-logic', () => {
  describe('GUITAR_TUNING', () => {
    it('should be standard tuning EADGBE (reversed high to low strings)', () => {
      // String 0 is High E (E4)
      // String 5 is Low E (E2)
      expect(GUITAR_TUNING).toEqual(['E4', 'B3', 'G3', 'D3', 'A2', 'E2']);
    });
  });

  describe('getNoteAtPosition', () => {
    it('should return correct open string notes', () => {
      expect(getNoteAtPosition(0, 0)).toBe('E4');
      expect(getNoteAtPosition(5, 0)).toBe('E2');
    });

    it('should return correct notes at specific frets', () => {
      // Low E (String 5) + 1 fret = F2
      expect(getNoteAtPosition(5, 1)).toBe('F2');
      // Low E (String 5) + 3 frets = G2
      expect(getNoteAtPosition(5, 3)).toBe('G2');
      // A (String 4) + 2 frets = B2
      expect(getNoteAtPosition(4, 2)).toBe('B2');
      // High E (String 0) + 12 frets = E5
      expect(getNoteAtPosition(0, 12)).toBe('E5');
    });

    it('should handle sharps correctly', () => {
      // Low E + 1 fret = F, +2 = F#
      expect(getNoteAtPosition(5, 2)).toBe('F#2');
    });

    it('should return empty string for invalid inputs', () => {
      expect(getNoteAtPosition(-1, 0)).toBe('');
      expect(getNoteAtPosition(6, 0)).toBe('');
    });
  });

  describe('getPositionsForNote', () => {
    it('should find multiple positions for E4', () => {
      const positions = getPositionsForNote('E4');
      // Should include Open High E (0, 0)
      expect(positions).toContainEqual({ stringIndex: 0, fret: 0 });
      // Should include 5th fret on B string (1, 5)
      expect(positions).toContainEqual({ stringIndex: 1, fret: 5 });
      // Should include 9th fret on G string (2, 9)
      expect(positions).toContainEqual({ stringIndex: 2, fret: 9 });
    });

    it('should find positions for C3', () => {
      // C3 is on A string (4) at 3rd fret
      const positions = getPositionsForNote('C3');
      expect(positions).toContainEqual({ stringIndex: 4, fret: 3 });
      // Also on Low E string (5) at 8th fret
      expect(positions).toContainEqual({ stringIndex: 5, fret: 8 });
    });

    it('should return empty array for invalid note', () => {
      expect(getPositionsForNote('H9')).toEqual([]);
    });
  });
});
