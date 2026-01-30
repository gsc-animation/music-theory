/**
 * Music Theory Course Data Types
 */

// Section types that can be shown/hidden in SubmodulePage
export type SectionType =
  | 'theory'
  | 'grandStaff'
  | 'piano'
  | 'guitar'
  | 'flute'
  | 'abcDemo'
  | 'practice'

export interface AbcDemo {
  id: string
  title: string
  description: string
  abc: string
  interactive?: boolean
  playable?: boolean
}

export interface Exercise {
  type: 'note-id' | 'interval' | 'chord' | 'rhythm' | 'accidental-game'
  notes?: string[] // For note-id: notes to quiz on
  questionCount?: number // Number of questions
  gameType?: string // For accidental-game: specifies which module's game (e.g., 'module-1.3')
}

// Re-export game types for convenience
export type { SubmoduleGameConfig } from '../game-types'

export interface Submodule {
  id: string // e.g., "1.1", "1.2"
  title: string
  description: string
  sections: SectionType[]
  theoryContent?: string // Markdown content for theory section
  staffAbc?: string // ABC notation for Grand Staff
  abcDemos?: AbcDemo[]
  exercises?: Exercise[] // @deprecated - Use games instead
  games?: import('../game-types').SubmoduleGameConfig[] // New game config format
}

export interface Module {
  id: number
  name: string
  subtitle: string
  icon: string
  submodules: Submodule[]
}
