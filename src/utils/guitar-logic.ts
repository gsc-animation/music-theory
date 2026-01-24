// Notes in chromatic order
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Standard Guitar Tuning: E4, B3, G3, D3, A2, E2 (String 1 to 6)
// Range: E2 to approximately E5 (with 8 frets)
export const GUITAR_TUNING = ['E4', 'B3', 'G3', 'D3', 'A2', 'E2']

/**
 * Parses a scientific pitch note (e.g., "C#4") into its components.
 */
export const parseNote = (note: string): { noteName: string; octave: number } | null => {
  const match = note.match(/^([A-G][#b]?)(-?\d+)$/)
  if (!match) return null
  return {
    noteName: match[1],
    octave: parseInt(match[2], 10),
  }
}

/**
 * Gets the note at a specific string and fret.
 * @param stringIndex 0-indexed string (0 = High E, 5 = Low E)
 * @param fret Fret number (0 = open)
 */
export const getNoteAtPosition = (stringIndex: number, fret: number): string => {
  if (stringIndex < 0 || stringIndex >= GUITAR_TUNING.length) return ''

  const openNoteStr = GUITAR_TUNING[stringIndex]
  const openNote = parseNote(openNoteStr)

  if (!openNote) return ''

  const noteIndex = NOTES.indexOf(openNote.noteName)
  if (noteIndex === -1) return ''

  const totalSemitones = noteIndex + fret
  const newNoteIndex = totalSemitones % 12
  const octaveShift = Math.floor(totalSemitones / 12)

  return `${NOTES[newNoteIndex]}${openNote.octave + octaveShift}`
}

/**
 * Finds all positions (string, fret) for a given note.
 * Limited to first 15 frets.
 */
/**
 * Transposes a guitar sounding pitch UP one octave to get the written pitch.
 * Guitar is a transposing instrument - written music is ONE OCTAVE HIGHER than it sounds.
 *
 * When guitar plays E4 (sounding pitch, high E string open) → display E5 on staff (written pitch)
 * When guitar plays E3 (sounding pitch, D string fret 2) → display E4 on staff (first line of treble)
 * When guitar plays E2 (sounding pitch, low E string open) → display E3 on staff
 *
 * @param soundingNote The sounding pitch from guitar (e.g., 'E4' from high E string)
 * @returns The written pitch for staff display (e.g., 'E5')
 */
export const transposeGuitarToWritten = (soundingNote: string): string | null => {
  const parsed = parseNote(soundingNote)
  if (!parsed) return null

  // Transpose UP one octave (guitar sounds one octave lower than written)
  const writtenOctave = parsed.octave + 1

  return `${parsed.noteName}${writtenOctave}`
}

/**
 * Transposes a written pitch DOWN one octave to get guitar sounding pitch.
 * Used when receiving notes from staff/piano to find guitar fretboard positions.
 *
 * When staff shows E5 (written) → find E4 on guitar (sounding, high E string open)
 * When staff shows E4 (written, first line) → find E3 on guitar (sounding, D string fret 2)
 *
 * @param writtenNote The written pitch from staff (e.g., 'E5')
 * @returns The sounding pitch on guitar (e.g., 'E4')
 */
export const transposeWrittenToGuitar = (writtenNote: string): string | null => {
  const parsed = parseNote(writtenNote)
  if (!parsed) return null

  // Transpose DOWN one octave (written pitch is one octave higher than guitar sounds)
  const soundingOctave = parsed.octave - 1

  // Check if the transposed note is within guitar range (E2-E5)
  if (soundingOctave < 2) return null

  return `${parsed.noteName}${soundingOctave}`
}

export const getPositionsForNote = (
  targetNote: string
): Array<{ stringIndex: number; fret: number }> => {
  const positions: Array<{ stringIndex: number; fret: number }> = []

  // Normalize target note (ensure it parses)
  const parsed = parseNote(targetNote)
  if (!parsed) return positions

  for (let stringIndex = 0; stringIndex < GUITAR_TUNING.length; stringIndex++) {
    // Check frets 0 to 15
    for (let fret = 0; fret <= 15; fret++) {
      const noteAtPos = getNoteAtPosition(stringIndex, fret)
      if (noteAtPos === targetNote) {
        positions.push({ stringIndex, fret })
      }
    }
  }

  return positions
}
