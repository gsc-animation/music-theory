import { describe, it, expect } from 'vitest';
import { getFingering } from './fingering-engine';

describe('Fingering Engine', () => {
  it('returns correct fingering for C4 on 6-hole flute', () => {
    const fingering = getFingering('C4', '6-hole');
    expect(fingering).toBeDefined();
    expect(fingering?.note).toBe('C4');
    expect(fingering?.holes).toEqual(['X', 'X', 'X', 'X', 'X', 'X']);
  });

  it('returns correct fingering for D4 on 6-hole flute', () => {
    const fingering = getFingering('D4', '6-hole');
    expect(fingering).toBeDefined();
    // Assuming D4 = Lift hole 1
    expect(fingering?.holes).toEqual(['O', 'X', 'X', 'X', 'X', 'X']);
  });

  it('returns null for invalid note', () => {
    const fingering = getFingering('Invalid', '6-hole');
    expect(fingering).toBeNull();
  });

  it('returns null for invalid flute type', () => {
    // @ts-ignore - testing runtime safety
    const fingering = getFingering('C4', 'invalid-type');
    expect(fingering).toBeNull();
  });

  it('normalizes flat notes to sharps (e.g. Db4 -> C#4)', () => {
    const fingeringDb = getFingering('Db4', '6-hole');
    const fingeringCs = getFingering('C#4', '6-hole');

    expect(fingeringDb).toBeDefined();
    expect(fingeringDb?.note).toBe('C#4'); // Expecting normalized note name from JSON if matched
    expect(fingeringDb).toEqual(fingeringCs);
  });
});
