import { Submodule, Module } from '@/data/course-data/types'

/**
 * Factory for creating test module data
 */
export const createTestModule = (overrides?: Partial<Module>): Module => ({
  id: 1,
  name: 'Test Module',
  subtitle: 'Fundamentals',
  icon: '🎵',
  color: 'emerald',
  description: 'Test module description',
  submodules: [],
  ...overrides,
})

/**
 * Factory for creating test submodule data
 */
export const createTestSubmodule = (overrides?: Partial<Submodule>): Submodule => ({
  id: '1.1',
  title: 'Test Lesson',
  description: 'Test lesson description',
  theoryContent: `# Test Theory

This is test theory content.

---

{{quiz:test|What is C?|C|D|E|F|C}}

This is the second section.`,
  locked: false,
  completed: false,
  ...overrides,
})

/**
 * Factory for creating ABC notation strings
 */
export const createTestAbc = (overrides?: {
  title?: string
  notes?: string
  key?: string
}): string => {
  const { title = 'Test', notes = 'C D E F', key = 'C' } = overrides || {}
  return `X:1
T:${title}
M:4/4
L:1/4
K:${key}
${notes}|]`
}

/**
 * Factory for creating progress state
 */
export const createProgressState = (overrides?: {
  completedLessons?: string[]
  currentLesson?: string
  totalXP?: number
}) => {
  const { completedLessons = [], currentLesson = '1.1', totalXP = 0 } = overrides || {}

  return {
    completedLessons: completedLessons.reduce(
      (acc, id) => ({
        ...acc,
        [id]: {
          completed: true,
          xp: 100,
          timestamp: Date.now(),
        },
      }),
      {}
    ),
    currentLesson,
    totalXP,
    level: Math.floor(totalXP / 500) + 1,
  }
}

/**
 * Factory for creating user profile data
 */
export const createUserProfile = (overrides?: {
  name?: string
  xp?: number
  completedModules?: number[]
}) => {
  const { name = 'Test User', xp = 0, completedModules = [] } = overrides || {}

  return {
    name,
    xp,
    level: Math.floor(xp / 500) + 1,
    completedModules,
    createdAt: Date.now(),
  }
}
