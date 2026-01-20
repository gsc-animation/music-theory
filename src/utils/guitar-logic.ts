
// Notes in chromatic order
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Standard Guitar Tuning: E4, B3, G3, D3, A2, E2 (String 1 to 6)
// Range: E2 to approximately E5 (with 8 frets)
export const GUITAR_TUNING = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'];

/**
 * Parses a scientific pitch note (e.g., "C#4") into its components.
 */
export const parseNote = (note: string): { noteName: string, octave: number } | null => {
  const match = note.match(/^([A-G][#b]?)(-?\d+)$/);
  if (!match) return null;
  return {
    noteName: match[1],
    octave: parseInt(match[2], 10),
  };
};

/**
 * Gets the note at a specific string and fret.
 * @param stringIndex 0-indexed string (0 = High E, 5 = Low E)
 * @param fret Fret number (0 = open)
 */
export const getNoteAtPosition = (stringIndex: number, fret: number): string => {
  if (stringIndex < 0 || stringIndex >= GUITAR_TUNING.length) return '';

  const openNoteStr = GUITAR_TUNING[stringIndex];
  const openNote = parseNote(openNoteStr);

  if (!openNote) return '';

  const noteIndex = NOTES.indexOf(openNote.noteName);
  if (noteIndex === -1) return '';

  const totalSemitones = noteIndex + fret;
  const newNoteIndex = totalSemitones % 12;
  const octaveShift = Math.floor(totalSemitones / 12);

  return `${NOTES[newNoteIndex]}${openNote.octave + octaveShift}`;
};

/**
 * Finds all positions (string, fret) for a given note.
 * Limited to first 15 frets.
 */
export const getPositionsForNote = (targetNote: string): Array<{ stringIndex: number, fret: number }> => {
  const positions: Array<{ stringIndex: number, fret: number }> = [];

  // Normalize target note (ensure it parses)
  const parsed = parseNote(targetNote);
  if (!parsed) return positions;

  for (let stringIndex = 0; stringIndex < GUITAR_TUNING.length; stringIndex++) {
    // Check frets 0 to 15
    for (let fret = 0; fret <= 15; fret++) {
      const noteAtPos = getNoteAtPosition(stringIndex, fret);
      if (noteAtPos === targetNote) {
        positions.push({ stringIndex, fret });
      }
    }
  }

  return positions;
};
