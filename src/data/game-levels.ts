/**
 * Game Level Configuration
 * Each level has the same notes across 3 mini-games (Name, Play, Place)
 */

export type GameType = 'note-id' | 'instrument-match' | 'staff-placement'

export interface GameLevel {
  id: number
  name: string
  description: string
  notes: string[]           // Notes included (without octave)
  timerSeconds: number | null
  questionCount: number
  requiredScore: number
  xpReward: number
}

// Notes with octaves for quiz display
export const NOTE_OCTAVES: Record<string, string> = {
  E: 'E4',
  F: 'F4',
  G: 'G4',
  A: 'A4',
  B: 'B4',
  C: 'C5',
  D: 'D5',
}

// 7 Levels - progressive note introduction
export const GAME_LEVELS: GameLevel[] = [
  {
    id: 1,
    name: 'E & G',
    description: 'First two line notes',
    notes: ['E', 'G'],
    timerSeconds: null,
    questionCount: 5,
    requiredScore: 60,
    xpReward: 15,
  },
  {
    id: 2,
    name: 'E, G, B',
    description: 'Three line notes',
    notes: ['E', 'G', 'B'],
    timerSeconds: null,
    questionCount: 6,
    requiredScore: 60,
    xpReward: 20,
  },
  {
    id: 3,
    name: 'All Lines',
    description: 'E-G-B-D-F (Every Good Boy Does Fine)',
    notes: ['E', 'G', 'B', 'D', 'F'],
    timerSeconds: 8,
    questionCount: 8,
    requiredScore: 70,
    xpReward: 30,
  },
  {
    id: 4,
    name: 'F & A',
    description: 'First two space notes',
    notes: ['F', 'A'],
    timerSeconds: null,
    questionCount: 5,
    requiredScore: 60,
    xpReward: 15,
  },
  {
    id: 5,
    name: 'All Spaces',
    description: 'F-A-C-E (FACE)',
    notes: ['F', 'A', 'C', 'E'],
    timerSeconds: 8,
    questionCount: 8,
    requiredScore: 70,
    xpReward: 30,
  },
  {
    id: 6,
    name: 'Mixed Notes',
    description: 'Lines and spaces together',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    timerSeconds: 6,
    questionCount: 10,
    requiredScore: 75,
    xpReward: 40,
  },
  {
    id: 7,
    name: 'Master',
    description: 'All notes - speed challenge!',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    timerSeconds: 4,
    questionCount: 15,
    requiredScore: 80,
    xpReward: 60,
  },
]

// Sub-game types per level
export const SUB_GAMES: { type: GameType; label: string; icon: string }[] = [
  { type: 'note-id', label: 'Name', icon: '🎵' },
  { type: 'instrument-match', label: 'Play', icon: '🎹' },
  { type: 'staff-placement', label: 'Place', icon: '📍' },
]

/**
 * Get level by ID
 */
export function getLevel(id: number): GameLevel | undefined {
  return GAME_LEVELS.find((l) => l.id === id)
}

/**
 * Get notes with octaves for a level
 */
export function getLevelNotes(level: GameLevel): string[] {
  return level.notes.map((n) => NOTE_OCTAVES[n] || `${n}4`)
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
