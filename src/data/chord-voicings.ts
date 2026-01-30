/**
 * Guitar Chord Voicing Database
 *
 * Each chord includes:
 * - voicing: String notation for fretboard.js renderChord() (e.g., 'x32010')
 * - fingers: Array of positions with finger numbers (1=Index, 2=Middle, 3=Ring, 4=Pinky)
 * - barres: Optional barre chord information
 */

export type FingerNumber = 1 | 2 | 3 | 4

export interface ChordPosition {
  string: number // 1-6, where 1 = high E, 6 = low E
  fret: number // 0 = open, 1+ = fret position
  finger?: FingerNumber
}

export interface Barre {
  fret: number
  stringFrom?: number // Defaults to lowest string (6)
  stringTo?: number // Defaults to highest string (1)
}

export interface ChordVoicing {
  voicing: string
  fingers: ChordPosition[]
  barres?: Barre[]
  notes?: string[] // The actual notes in the chord (for detection)
}

export const CHORD_VOICINGS: Record<string, ChordVoicing> = {
  // ============ OPEN MAJOR CHORDS ============
  C: {
    voicing: 'x32010',
    fingers: [
      { string: 5, fret: 3, finger: 3 }, // C - ring
      { string: 4, fret: 2, finger: 2 }, // E - middle
      { string: 2, fret: 1, finger: 1 }, // C - index
    ],
    notes: ['C', 'E', 'G'],
  },
  G: {
    voicing: '320003',
    fingers: [
      { string: 6, fret: 3, finger: 2 }, // G - middle
      { string: 5, fret: 2, finger: 1 }, // B - index
      { string: 1, fret: 3, finger: 3 }, // G - ring (or pinky)
    ],
    notes: ['G', 'B', 'D'],
  },
  D: {
    voicing: 'xx0232',
    fingers: [
      { string: 3, fret: 2, finger: 1 }, // A - index
      { string: 2, fret: 3, finger: 3 }, // D - ring
      { string: 1, fret: 2, finger: 2 }, // F# - middle
    ],
    notes: ['D', 'F#', 'A'],
  },
  A: {
    voicing: 'x02220',
    fingers: [
      { string: 4, fret: 2, finger: 2 }, // E - middle
      { string: 3, fret: 2, finger: 3 }, // A - ring
      { string: 2, fret: 2, finger: 4 }, // C# - pinky
    ],
    notes: ['A', 'C#', 'E'],
  },
  E: {
    voicing: '022100',
    fingers: [
      { string: 5, fret: 2, finger: 2 }, // B - middle
      { string: 4, fret: 2, finger: 3 }, // E - ring
      { string: 3, fret: 1, finger: 1 }, // G# - index
    ],
    notes: ['E', 'G#', 'B'],
  },

  // ============ OPEN MINOR CHORDS ============
  Am: {
    voicing: 'x02210',
    fingers: [
      { string: 4, fret: 2, finger: 2 }, // E - middle
      { string: 3, fret: 2, finger: 3 }, // A - ring
      { string: 2, fret: 1, finger: 1 }, // C - index
    ],
    notes: ['A', 'C', 'E'],
  },
  Em: {
    voicing: '022000',
    fingers: [
      { string: 5, fret: 2, finger: 2 }, // B - middle
      { string: 4, fret: 2, finger: 3 }, // E - ring
    ],
    notes: ['E', 'G', 'B'],
  },
  Dm: {
    voicing: 'xx0231',
    fingers: [
      { string: 3, fret: 2, finger: 2 }, // A - middle
      { string: 2, fret: 3, finger: 3 }, // D - ring
      { string: 1, fret: 1, finger: 1 }, // F - index
    ],
    notes: ['D', 'F', 'A'],
  },
  Cm: {
    voicing: 'x35543',
    fingers: [
      { string: 4, fret: 5, finger: 3 }, // G - ring
      { string: 3, fret: 5, finger: 4 }, // C - pinky
      { string: 2, fret: 4, finger: 2 }, // Eb - middle
    ],
    barres: [{ fret: 3, stringFrom: 5, stringTo: 1 }],
    notes: ['C', 'Eb', 'G'],
  },

  // ============ BARRE CHORDS ============
  F: {
    voicing: '133211',
    fingers: [
      { string: 4, fret: 3, finger: 3 }, // A - ring
      { string: 3, fret: 2, finger: 2 }, // C - middle
    ],
    barres: [{ fret: 1 }], // Full barre with index
    notes: ['F', 'A', 'C'],
  },
  Fm: {
    voicing: '133111',
    fingers: [
      { string: 4, fret: 3, finger: 3 }, // Ab - ring
    ],
    barres: [{ fret: 1 }],
    notes: ['F', 'Ab', 'C'],
  },
  B: {
    voicing: 'x24442',
    fingers: [
      { string: 4, fret: 4, finger: 3 }, // F# - ring
      { string: 3, fret: 4, finger: 4 }, // B - pinky
    ],
    barres: [{ fret: 2, stringFrom: 5, stringTo: 1 }],
    notes: ['B', 'D#', 'F#'],
  },
  Bm: {
    voicing: 'x24432',
    fingers: [
      { string: 4, fret: 4, finger: 3 }, // F# - ring
      { string: 3, fret: 4, finger: 4 }, // B - pinky
      { string: 2, fret: 3, finger: 2 }, // D - middle
    ],
    barres: [{ fret: 2, stringFrom: 5, stringTo: 1 }],
    notes: ['B', 'D', 'F#'],
  },

  // ============ DIMINISHED CHORDS ============
  Cdim: {
    voicing: 'x3424x',
    fingers: [
      { string: 5, fret: 3, finger: 1 }, // C - index
      { string: 4, fret: 4, finger: 3 }, // Gb - ring
      { string: 3, fret: 2, finger: 2 }, // Eb - middle (should be 2nd fret for proper dim)
      { string: 2, fret: 4, finger: 4 }, // C - pinky
    ],
    notes: ['C', 'Eb', 'Gb'],
  },
  Ddim: {
    voicing: 'xx0131',
    fingers: [
      { string: 3, fret: 1, finger: 1 }, // Ab - index
      { string: 2, fret: 3, finger: 3 }, // D - ring
      { string: 1, fret: 1, finger: 1 }, // F - index (barre position)
    ],
    notes: ['D', 'F', 'Ab'],
  },

  // ============ AUGMENTED CHORDS ============
  Caug: {
    voicing: 'x32110',
    fingers: [
      { string: 5, fret: 3, finger: 4 }, // C - pinky
      { string: 4, fret: 2, finger: 3 }, // E - ring
      { string: 3, fret: 1, finger: 1 }, // G# - index
      { string: 2, fret: 1, finger: 1 }, // C - index (barre)
    ],
    notes: ['C', 'E', 'G#'],
  },
  Eaug: {
    voicing: '032110',
    fingers: [
      { string: 5, fret: 3, finger: 4 }, // E - pinky
      { string: 4, fret: 2, finger: 3 }, // G# - ring
      { string: 3, fret: 1, finger: 1 }, // C - index
      { string: 2, fret: 1, finger: 2 }, // E - middle
    ],
    notes: ['E', 'G#', 'C'],
  },

  // ============ 7TH CHORDS ============
  C7: {
    voicing: 'x32310',
    fingers: [
      { string: 5, fret: 3, finger: 3 }, // C - ring
      { string: 4, fret: 2, finger: 2 }, // E - middle
      { string: 3, fret: 3, finger: 4 }, // Bb - pinky
      { string: 2, fret: 1, finger: 1 }, // C - index
    ],
    notes: ['C', 'E', 'G', 'Bb'],
  },
  G7: {
    voicing: '320001',
    fingers: [
      { string: 6, fret: 3, finger: 3 }, // G - ring
      { string: 5, fret: 2, finger: 2 }, // B - middle
      { string: 1, fret: 1, finger: 1 }, // F - index
    ],
    notes: ['G', 'B', 'D', 'F'],
  },
  D7: {
    voicing: 'xx0212',
    fingers: [
      { string: 3, fret: 2, finger: 2 }, // A - middle
      { string: 2, fret: 1, finger: 1 }, // C - index
      { string: 1, fret: 2, finger: 3 }, // F# - ring
    ],
    notes: ['D', 'F#', 'A', 'C'],
  },
  A7: {
    voicing: 'x02020',
    fingers: [
      { string: 4, fret: 2, finger: 2 }, // E - middle
      { string: 2, fret: 2, finger: 3 }, // G - ring
    ],
    notes: ['A', 'C#', 'E', 'G'],
  },
  E7: {
    voicing: '020100',
    fingers: [
      { string: 5, fret: 2, finger: 2 }, // B - middle
      { string: 3, fret: 1, finger: 1 }, // G# - index
    ],
    notes: ['E', 'G#', 'B', 'D'],
  },
  Am7: {
    voicing: 'x02010',
    fingers: [
      { string: 4, fret: 2, finger: 2 }, // E - middle
      { string: 2, fret: 1, finger: 1 }, // C - index
    ],
    notes: ['A', 'C', 'E', 'G'],
  },
  Em7: {
    voicing: '020000',
    fingers: [
      { string: 5, fret: 2, finger: 2 }, // B - middle
    ],
    notes: ['E', 'G', 'B', 'D'],
  },
  Dm7: {
    voicing: 'xx0211',
    fingers: [
      { string: 3, fret: 2, finger: 2 }, // A - middle
      { string: 2, fret: 1, finger: 1 }, // C - index (barre)
      { string: 1, fret: 1, finger: 1 }, // F - index (barre)
    ],
    notes: ['D', 'F', 'A', 'C'],
  },

  // ============ MAJOR 7TH CHORDS ============
  Cmaj7: {
    voicing: 'x32000',
    fingers: [
      { string: 5, fret: 3, finger: 3 }, // C - ring
      { string: 4, fret: 2, finger: 2 }, // E - middle
    ],
    notes: ['C', 'E', 'G', 'B'],
  },
  Gmaj7: {
    voicing: '320002',
    fingers: [
      { string: 6, fret: 3, finger: 3 }, // G - ring
      { string: 5, fret: 2, finger: 2 }, // B - middle
      { string: 1, fret: 2, finger: 1 }, // F# - index
    ],
    notes: ['G', 'B', 'D', 'F#'],
  },
  Fmaj7: {
    voicing: 'xx3210',
    fingers: [
      { string: 4, fret: 3, finger: 3 }, // A - ring
      { string: 3, fret: 2, finger: 2 }, // C - middle
      { string: 2, fret: 1, finger: 1 }, // E - index
    ],
    notes: ['F', 'A', 'C', 'E'],
  },
}

/**
 * Get chord voicing by name
 */
export function getChordVoicing(chordName: string): ChordVoicing | undefined {
  return CHORD_VOICINGS[chordName]
}

/**
 * Get all chord names
 */
export function getAllChordNames(): string[] {
  return Object.keys(CHORD_VOICINGS)
}

/**
 * Get finger label for display
 */
export function getFingerLabel(finger: FingerNumber): string {
  const labels: Record<FingerNumber, string> = {
    1: 'I', // Index
    2: 'M', // Middle
    3: 'R', // Ring
    4: 'P', // Pinky
  }
  return labels[finger]
}
