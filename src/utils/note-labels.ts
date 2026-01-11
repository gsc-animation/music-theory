export type NotationSystem = 'latin' | 'solfege';

const solfegeMap: Record<string, string> = {
  C: 'Do',
  D: 'Re',
  E: 'Mi',
  F: 'Fa',
  G: 'Sol',
  A: 'La',
  B: 'Si',
};

/**
 * Converts a note string (e.g., "C4", "F#3") to the target notation system label.
 * Preserves accidentals (#, b) and octaves (numbers).
 */
export function getNoteLabel(note: string, system: NotationSystem): string {
  if (system === 'latin' || !note) {
    return note;
  }

  // Regex to parse note parts: [Letter][Accidental?][Octave?]
  // Matches "C", "C#", "C4", "C#4", "Db4"
  // Group 1: Letter (A-G)
  // Group 2: Accidental (# or b or empty)
  // Group 3: Octave (number or empty)
  const match = note.match(/^([A-G])([#b]?)(-?\d*)$/i);

  if (!match) {
    return note; // Return original if not a recognizable note pattern
  }

  const letter = match[1].toUpperCase();
  const accidental = match[2] || '';
  const octave = match[3] || '';

  const solfegeBase = solfegeMap[letter];

  if (solfegeBase) {
    return `${solfegeBase}${accidental}${octave}`;
  }

  return note;
}
