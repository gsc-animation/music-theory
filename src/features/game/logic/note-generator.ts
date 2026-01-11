const NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const DEFAULT_OCTAVES = [3, 4, 5];

/**
 * Generates a random note (e.g., "C4", "F#5") within the default range.
 * @param prevNote - If provided, ensures the new note is different from this one.
 * @param octaves - Optional array of octaves to choose from (default: 3, 4, 5).
 * @returns A string representing the note (e.g., "C4")
 */
export const generateRandomNote = (prevNote?: string, octaves: number[] = DEFAULT_OCTAVES): string => {
  let note: string;
  // Simple guard against infinite loop if pool has only 1 item (unlikely here)
  let attempts = 0;

  do {
    const n = NOTES[Math.floor(Math.random() * NOTES.length)];
    const o = octaves[Math.floor(Math.random() * octaves.length)];
    // Randomize accidental? For now, stick to natural notes as per "Simple" requirement unless FR says otherwise.
    // FR says "Note Recognition Game". Usually starts with naturals.
    // Let's stick to naturals for MVP.
    note = `${n}${o}`;
    attempts++;
  } while (note === prevNote && attempts < 10);

  return note;
};
