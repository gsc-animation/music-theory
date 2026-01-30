/**
 * Game Registry - Central registration for all game types
 *
 * This module provides a centralized registry of all available game types,
 * enabling submodules to reference games by ID and share games across modules.
 */
import React from 'react'
import type { GameConfig } from './game-types'

/**
 * Definition of a game type in the registry.
 */
export interface GameDefinition {
  /** Unique identifier for this game type */
  id: string
  /** Display name (English) */
  name: string
  /** Display name (Vietnamese) */
  nameVi: string
  /** Emoji icon for the game */
  icon: string
  /** Description of what the game teaches */
  description: string
  /** Vietnamese description */
  descriptionVi: string
  /** Lazily loaded component - uses any to support varied game prop interfaces */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.LazyExoticComponent<React.ComponentType<any>>
  /** Default configuration for this game */
  defaultConfig: Partial<GameConfig>
}

/**
 * Central registry of all available games.
 *
 * To add a new game:
 * 1. Create the game component implementing GameComponentProps
 * 2. Add an entry here with a unique ID
 * 3. Reference the ID in submodule data files
 */
export const GAME_REGISTRY: Record<string, GameDefinition> = {
  // ===== Module 1.1: Staff & Clefs =====
  'note-id': {
    id: 'note-id',
    name: 'Note Identification',
    nameVi: 'Nhận Diện Nốt',
    icon: '🎵',
    description: 'Identify notes on the staff',
    descriptionVi: 'Nhận diện nốt nhạc trên khuông nhạc',
    component: React.lazy(() => import('../components/modules/NoteIdentificationQuiz')),
    defaultConfig: {
      questionCount: 5,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 30,
    },
  },

  'instrument-match': {
    id: 'instrument-match',
    name: 'Play the Note',
    nameVi: 'Chơi Nốt Nhạc',
    icon: '🎹',
    description: 'Hear the note name, play it on the instrument',
    descriptionVi: 'Nghe tên nốt, nhấn phím đúng trên Piano/Guitar',
    component: React.lazy(() => import('../components/modules/NoteIdentificationQuiz')),
    defaultConfig: {
      questionCount: 5,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 40,
      initialGameType: 'instrument-match',
    },
  },

  'staff-placement': {
    id: 'staff-placement',
    name: 'Staff Placement',
    nameVi: 'Đặt Nốt Lên Khuông',
    icon: '📍',
    description: 'Click the correct note position on the staff',
    descriptionVi: 'Click vào đúng vị trí nốt trên khuông nhạc',
    component: React.lazy(() => import('../components/modules/NoteIdentificationQuiz')),
    defaultConfig: {
      questionCount: 5,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 50,
      initialGameType: 'staff-placement',
    },
  },

  // ===== Module 1.2: Note Names =====
  'note-hunt': {
    id: 'note-hunt',
    name: 'Note Hunt',
    nameVi: 'Săn Nốt',
    icon: '🎯',
    description: 'Find specific notes on the piano',
    descriptionVi: 'Tìm tất cả nốt C/F trên Piano',
    component: React.lazy(() => import('../components/modules/NoteHuntGame')),
    defaultConfig: {
      questionCount: 8,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 20,
    },
  },

  'listen-match': {
    id: 'listen-match',
    name: 'Listen & Match',
    nameVi: 'Nghe Quãng Tám',
    icon: '👂',
    description: 'Listen to notes and match the octave',
    descriptionVi: 'Nghe nốt và chọn đúng quãng tám',
    component: React.lazy(() => import('../components/modules/ListenMatchGame')),
    defaultConfig: {
      questionCount: 8,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 25,
    },
  },

  'same-different': {
    id: 'same-different',
    name: 'Same or Different',
    nameVi: 'Giống hay Khác',
    icon: '⚖️',
    description: 'Compare two note names',
    descriptionVi: 'So sánh tên của 2 nốt nhạc',
    component: React.lazy(() => import('../components/modules/SameOrDifferentGame')),
    defaultConfig: {
      questionCount: 10,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 30,
    },
  },

  // ===== Module 1.3: Accidentals =====
  'accidental-spotter': {
    id: 'accidental-spotter',
    name: 'Accidental Spotter',
    nameVi: 'Soi Dấu Hóa',
    icon: '👁️',
    description: 'Identify notes with accidentals on the staff',
    descriptionVi: 'Nhận diện nốt có dấu hóa trên khuông nhạc',
    component: React.lazy(() => import('../components/modules/AccidentalSpotterGame')),
    defaultConfig: {
      questionCount: 10,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 25,
    },
  },

  'black-key-ninja': {
    id: 'black-key-ninja',
    name: 'Black Key Ninja',
    nameVi: 'Ninja Phím Đen',
    icon: '🥷',
    description: 'Speed challenge on black keys',
    descriptionVi: 'Tốc độ bấm phím đen trên Piano và Guitar',
    component: React.lazy(() => import('../components/modules/BlackKeyNinjaGame')),
    defaultConfig: {
      questionCount: 15,
      timerSeconds: 30,
      requiredScore: 70,
      xpReward: 35,
    },
  },

  // ===== Module 1.4+: Additional Games =====
  'high-low-battle': {
    id: 'high-low-battle',
    name: 'High Low Battle',
    nameVi: 'Cao Thấp Đối Kháng',
    icon: '⬆️⬇️',
    description: 'Compare which note is higher or lower',
    descriptionVi: 'So sánh nốt nào cao hơn, thấp hơn',
    component: React.lazy(() => import('../components/modules/HighLowBattleGame')),
    defaultConfig: {
      questionCount: 10,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 25,
    },
  },

  'octave-challenge': {
    id: 'octave-challenge',
    name: 'Octave Challenge',
    nameVi: 'Thử Thách Quãng Tám',
    icon: '🎹',
    description: 'Identify octave relationships',
    descriptionVi: 'Nhận diện mối quan hệ quãng tám',
    component: React.lazy(() => import('../components/modules/OctaveChallengeGame')),
    defaultConfig: {
      questionCount: 8,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 30,
    },
  },

  'find-frequency': {
    id: 'find-frequency',
    name: 'Find the Frequency',
    nameVi: 'Tìm Tần Số',
    icon: '📊',
    description: 'Match notes to their frequencies',
    descriptionVi: 'Ghép nốt nhạc với tần số',
    component: React.lazy(() => import('../components/modules/FindTheFrequencyGame')),
    defaultConfig: {
      questionCount: 5,
      timerSeconds: null,
      requiredScore: 60,
      xpReward: 20,
    },
  },
}

/**
 * Get a game definition by ID.
 * Throws if game not found.
 */
export function getGameDefinition(gameId: string): GameDefinition {
  const game = GAME_REGISTRY[gameId]
  if (!game) {
    throw new Error(
      `Game "${gameId}" not found in registry. Available games: ${Object.keys(GAME_REGISTRY).join(', ')}`
    )
  }
  return game
}

/**
 * Get all registered game IDs.
 */
export function getAllGameIds(): string[] {
  return Object.keys(GAME_REGISTRY)
}

/**
 * Check if a game exists in the registry.
 */
export function hasGame(gameId: string): boolean {
  return gameId in GAME_REGISTRY
}
