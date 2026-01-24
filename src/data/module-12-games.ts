/**
 * Module 1.2 Game Suite: Octave-focused games
 *
 * Game Types:
 * - octave-id: Identify octave number from staff position
 * - octave-play: Play specific octave on instrument
 * - pitch-compare: Compare pitch heights
 */

export type Module12GameType = 'octave-id' | 'octave-play' | 'pitch-compare'

export interface Module12GameLevel {
  id: number
  name: string
  description: string
  notes: string[] // Notes WITH octaves (e.g., ['C3', 'C4', 'C5'])
  timerSeconds: number | null
  questionCount: number
  requiredScore: number
  xpReward: number
}

// Module 1.2 specific levels - focus on octave recognition
export const MODULE_12_LEVELS: Module12GameLevel[] = [
  {
    id: 1,
    name: 'C Octaves',
    description: 'Identify C across different octaves',
    notes: ['C3', 'C4', 'C5'],
    timerSeconds: null,
    questionCount: 5,
    requiredScore: 60,
    xpReward: 15,
  },
  {
    id: 2,
    name: 'C & F Octaves',
    description: 'The two landmark notes',
    notes: ['C3', 'C4', 'C5', 'F3', 'F4', 'F5'],
    timerSeconds: null,
    questionCount: 6,
    requiredScore: 60,
    xpReward: 20,
  },
  {
    id: 3,
    name: 'All C-D-E',
    description: 'First three notes with octaves',
    notes: ['C3', 'C4', 'C5', 'D3', 'D4', 'E3', 'E4'],
    timerSeconds: 12,
    questionCount: 8,
    requiredScore: 70,
    xpReward: 30,
  },
  {
    id: 4,
    name: 'F-G-A-B',
    description: 'Upper half of the scale',
    notes: ['F3', 'F4', 'G3', 'G4', 'A3', 'A4', 'B3', 'B4'],
    timerSeconds: 10,
    questionCount: 8,
    requiredScore: 70,
    xpReward: 30,
  },
  {
    id: 5,
    name: 'Full Range',
    description: 'All notes across octaves',
    notes: [
      'C3',
      'D3',
      'E3',
      'F3',
      'G3',
      'A3',
      'B3',
      'C4',
      'D4',
      'E4',
      'F4',
      'G4',
      'A4',
      'B4',
      'C5',
    ],
    timerSeconds: 8,
    questionCount: 10,
    requiredScore: 75,
    xpReward: 40,
  },
  {
    id: 6,
    name: 'Master',
    description: 'Speed challenge with all notes!',
    notes: [
      'C3',
      'D3',
      'E3',
      'F3',
      'G3',
      'A3',
      'B3',
      'C4',
      'D4',
      'E4',
      'F4',
      'G4',
      'A4',
      'B4',
      'C5',
    ],
    timerSeconds: 6,
    questionCount: 15,
    requiredScore: 80,
    xpReward: 60,
  },
]

// Sub-game types for Module 1.2
export const MODULE_12_SUB_GAMES: {
  type: Module12GameType
  label: string
  icon: string
  description: string
}[] = [
  {
    type: 'octave-id',
    label: 'Octave Challenge',
    icon: '🎯',
    description: 'Identify the octave number',
  },
  {
    type: 'octave-play',
    label: 'Find Frequency',
    icon: '🎹',
    description: 'Play the correct octave',
  },
  {
    type: 'pitch-compare',
    label: 'High/Low Battle',
    icon: '⚔️',
    description: 'Compare pitch heights',
  },
]

/**
 * Get level by ID
 */
export function getModule12Level(id: number): Module12GameLevel | undefined {
  return MODULE_12_LEVELS.find((l) => l.id === id)
}

/**
 * Calculate stars for a score
 */
export function calculateStars(percentage: number): number {
  if (percentage >= 100) return 3
  if (percentage >= 80) return 2
  if (percentage >= 60) return 1
  return 0
}

/**
 * Generate octave choices for a given note
 * Returns array of possible answers like ['C3', 'C4', 'C5']
 */
export function getOctaveChoices(noteLetter: string): string[] {
  return [3, 4, 5].map((octave) => `${noteLetter}${octave}`)
}

/**
 * Compare two notes by pitch
 * Returns: 1 if noteA is higher, -1 if noteB is higher, 0 if equal
 */
export function comparePitch(noteA: string, noteB: string): number {
  const parseNote = (note: string) => {
    const match = note.match(/^([A-G])([#b]?)(\d)$/)
    if (!match) return 0
    const [, letter, accidental, octaveStr] = match
    const octave = parseInt(octaveStr, 10)
    const letterValue = 'CDEFGAB'.indexOf(letter)
    let pitch = octave * 12 + letterValue
    if (accidental === '#') pitch += 0.5
    if (accidental === 'b') pitch -= 0.5
    return pitch
  }

  const pitchA = parseNote(noteA)
  const pitchB = parseNote(noteB)

  if (pitchA > pitchB) return 1
  if (pitchA < pitchB) return -1
  return 0
}
