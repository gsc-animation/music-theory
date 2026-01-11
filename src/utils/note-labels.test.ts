import { describe, it, expect } from 'vitest';
import { getNoteLabel } from './note-labels';

describe('getNoteLabel', () => {
  it('should return original note if system is latin', () => {
    expect(getNoteLabel('C', 'latin')).toBe('C');
    expect(getNoteLabel('C4', 'latin')).toBe('C4');
    expect(getNoteLabel('F#3', 'latin')).toBe('F#3');
  });

  it('should convert basic notes to Solfège', () => {
    expect(getNoteLabel('C', 'solfege')).toBe('Do');
    expect(getNoteLabel('D', 'solfege')).toBe('Re');
    expect(getNoteLabel('E', 'solfege')).toBe('Mi');
    expect(getNoteLabel('F', 'solfege')).toBe('Fa');
    expect(getNoteLabel('G', 'solfege')).toBe('Sol');
    expect(getNoteLabel('A', 'solfege')).toBe('La');
    expect(getNoteLabel('B', 'solfege')).toBe('Si');
  });

  it('should handle sharps and flats in Solfège', () => {
    expect(getNoteLabel('C#', 'solfege')).toBe('Do#');
    expect(getNoteLabel('Db', 'solfege')).toBe('Reb'); // Or Do#? Usually we map the letter. Db -> Re flat.
  });

  it('should handle scientific notation (octaves)', () => {
    expect(getNoteLabel('C4', 'solfege')).toBe('Do4');
    expect(getNoteLabel('G5', 'solfege')).toBe('Sol5');
    expect(getNoteLabel('F#3', 'solfege')).toBe('Fa#3');
  });

  it('should return original string if invalid note provided', () => {
    expect(getNoteLabel('H', 'solfege')).toBe('H');
    expect(getNoteLabel('', 'solfege')).toBe('');
  });
});
