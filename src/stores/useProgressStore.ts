import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'
import { scheduleSyncToSupabase, initializeProgressSync } from '../services/progress-sync'

/**
 * IndexedDB storage adapter for Zustand
 * Provides SQLite-like persistence in the browser
 */
const DB_NAME = 'music-theory-db'
const STORE_NAME = 'progress'
const DB_VERSION = 1

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
  })
}

const indexedDBStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.get(name)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result ?? null)
      })
    } catch {
      // Fallback to localStorage if IndexedDB fails
      return localStorage.getItem(name)
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.put(value, name)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
      })
    } catch {
      // Fallback to localStorage if IndexedDB fails
      localStorage.setItem(name, value)
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      const db = await openDB()
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite')
        const store = transaction.objectStore(STORE_NAME)
        const request = store.delete(name)

        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
      })
    } catch {
      localStorage.removeItem(name)
    }
  },
}

/**
 * User progress state interface
 */

export interface LevelCompletion {
  percentage: number
  stars: number
  passed: boolean
  bestTime?: number
}

export interface UserProgress {
  // Completed submodules (e.g., ["1.1", "1.2", "2.1"])
  completedSubmodules: string[]

  // Game level completions (key format: "levelId-gameType", e.g. "1-note-id")
  completedLevels: Record<string, LevelCompletion>

  // Current position in the course
  currentModuleId: number
  currentSubmoduleId: string

  // Gamification
  totalXP: number
  streakDays: number
  lastActiveDate: string // ISO date string

  // Practice statistics
  practiceSessionsCompleted: number
  totalPracticeMinutes: number

  // Quiz/exercise results per submodule
  submoduleScores: Record<string, number> // submoduleId -> best score (0-100)

  // Section progress per submodule (for inline quiz tracking)
  sectionProgress: Record<string, { visibleCount: number; totalSections: number }>
}

interface ProgressState extends UserProgress {
  // Actions
  completeSubmodule: (submoduleId: string) => void
  setCurrentPosition: (moduleId: number, submoduleId: string) => void
  addXP: (amount: number) => void
  updateStreak: () => void
  recordPracticeSession: (minutes: number) => void
  setSubmoduleScore: (submoduleId: string, score: number) => void
  setLevelScore: (
    levelKey: string,
    percentage: number,
    requiredScore: number,
    xpReward: number
  ) => void
  isSubmoduleCompleted: (submoduleId: string) => boolean
  getModuleProgress: (moduleId: number) => number
  resetProgress: () => void

  // Cloud sync actions
  initFromCloud: () => Promise<void>
  _applyMergedProgress: (progress: UserProgress) => void

  // Section progress tracking
  setSectionProgress: (submoduleId: string, visibleCount: number, totalSections: number) => void
  getSectionProgress: (
    submoduleId: string
  ) => { visibleCount: number; totalSections: number } | undefined
}

const initialState: UserProgress = {
  completedSubmodules: [],
  completedLevels: {},
  currentModuleId: 1,
  currentSubmoduleId: '1.1',
  totalXP: 0,
  streakDays: 0,
  lastActiveDate: '',
  practiceSessionsCompleted: 0,
  totalPracticeMinutes: 0,
  submoduleScores: {},
  sectionProgress: {},
}

// XP rewards
const XP_COMPLETE_SUBMODULE = 50
const XP_PERFECT_SCORE = 25
const XP_STREAK_BONUS = 10

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,

      completeSubmodule: (submoduleId) =>
        set((state) => {
          if (state.completedSubmodules.includes(submoduleId)) {
            return state // Already completed
          }

          return {
            completedSubmodules: [...state.completedSubmodules, submoduleId],
            totalXP: state.totalXP + XP_COMPLETE_SUBMODULE,
          }
        }),

      setCurrentPosition: (moduleId, submoduleId) =>
        set({
          currentModuleId: moduleId,
          currentSubmoduleId: submoduleId,
        }),

      addXP: (amount) =>
        set((state) => ({
          totalXP: state.totalXP + amount,
        })),

      updateStreak: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          const lastActive = state.lastActiveDate

          if (lastActive === today) {
            // Already updated today
            return state
          }

          const yesterday = new Date()
          yesterday.setDate(yesterday.getDate() - 1)
          const yesterdayStr = yesterday.toISOString().split('T')[0]

          if (lastActive === yesterdayStr) {
            // Streak continues
            return {
              streakDays: state.streakDays + 1,
              lastActiveDate: today,
              totalXP: state.totalXP + XP_STREAK_BONUS,
            }
          }

          // Streak broken or first day
          return {
            streakDays: 1,
            lastActiveDate: today,
          }
        }),

      recordPracticeSession: (minutes) =>
        set((state) => ({
          practiceSessionsCompleted: state.practiceSessionsCompleted + 1,
          totalPracticeMinutes: state.totalPracticeMinutes + minutes,
        })),

      setSubmoduleScore: (submoduleId, score) =>
        set((state) => {
          const currentBest = state.submoduleScores[submoduleId] || 0
          const isPerfect = score === 100 && currentBest < 100

          return {
            submoduleScores: {
              ...state.submoduleScores,
              [submoduleId]: Math.max(currentBest, score),
            },
            totalXP: state.totalXP + (isPerfect ? XP_PERFECT_SCORE : 0),
          }
        }),

      isSubmoduleCompleted: (submoduleId) => {
        return get().completedSubmodules.includes(submoduleId)
      },

      getModuleProgress: (moduleId) => {
        const state = get()
        // Import dynamically to avoid circular dependency
        const moduleSubmodules = getModuleSubmoduleIds(moduleId)
        if (moduleSubmodules.length === 0) return 0

        const completed = moduleSubmodules.filter((id) =>
          state.completedSubmodules.includes(id)
        ).length

        return Math.round((completed / moduleSubmodules.length) * 100)
      },

      setLevelScore: (levelKey, percentage, requiredScore, xpReward) =>
        set((state) => {
          const existing = state.completedLevels[levelKey]
          const passed = percentage >= requiredScore
          const stars = percentage >= 100 ? 3 : percentage >= 80 ? 2 : percentage >= 60 ? 1 : 0
          const isFirstPass = passed && !existing?.passed

          // XP calculation:
          // - First pass: full xpReward
          // - Replay (already passed): 10% of xpReward
          // - Failed attempt: 0 XP
          let xpToAdd = 0
          if (isFirstPass) {
            xpToAdd = xpReward // Full XP for first completion
          } else if (passed && existing?.passed) {
            xpToAdd = Math.round(xpReward * 0.1) // 10% XP for replay
          }

          return {
            completedLevels: {
              ...state.completedLevels,
              [levelKey]: {
                percentage: Math.max(percentage, existing?.percentage || 0),
                stars: Math.max(stars, existing?.stars || 0),
                passed: passed || existing?.passed || false,
              },
            },
            totalXP: state.totalXP + xpToAdd,
          }
        }),

      resetProgress: () => {
        // Reset local state
        set(initialState)
        // Immediately sync reset to Supabase (bypass debounce to ensure it completes)
        import('../services/progress-sync').then(({ saveProgressToSupabase }) => {
          saveProgressToSupabase(initialState).then((success) => {
            if (success) {
              console.log('[ProgressStore] 🗑️ Progress reset synced to Supabase')
            }
          })
        })
        // Also clear any bypass-quiz flags from localStorage
        Object.keys(localStorage)
          .filter((key) => key.startsWith('bypass-quiz-'))
          .forEach((key) => localStorage.removeItem(key))
      },

      // Cloud sync actions
      initFromCloud: async () => {
        const currentState = get()
        const localProgress: UserProgress = {
          completedSubmodules: currentState.completedSubmodules,
          completedLevels: currentState.completedLevels,
          submoduleScores: currentState.submoduleScores,
          sectionProgress: currentState.sectionProgress,
          totalXP: currentState.totalXP,
          streakDays: currentState.streakDays,
          lastActiveDate: currentState.lastActiveDate,
          practiceSessionsCompleted: currentState.practiceSessionsCompleted,
          totalPracticeMinutes: currentState.totalPracticeMinutes,
          currentModuleId: currentState.currentModuleId,
          currentSubmoduleId: currentState.currentSubmoduleId,
        }

        const mergedProgress = await initializeProgressSync(localProgress)
        if (mergedProgress) {
          set(mergedProgress)
        }
      },

      _applyMergedProgress: (progress: UserProgress) => set(progress),

      // Section progress tracking
      setSectionProgress: (submoduleId, visibleCount, totalSections) =>
        set((state) => {
          const percentage = Math.round((visibleCount / totalSections) * 100)
          console.log(
            `[SectionProgress] 📊 ${submoduleId}: ${visibleCount}/${totalSections} (${percentage}%)`
          )
          return {
            sectionProgress: {
              ...state.sectionProgress,
              [submoduleId]: { visibleCount, totalSections },
            },
          }
        }),

      getSectionProgress: (submoduleId) => get().sectionProgress[submoduleId],
    }),
    {
      name: 'music-theory-progress',
      storage: createJSONStorage(() => indexedDBStorage),
      partialize: (state) => ({
        completedSubmodules: state.completedSubmodules,
        completedLevels: state.completedLevels,
        currentModuleId: state.currentModuleId,
        currentSubmoduleId: state.currentSubmoduleId,
        totalXP: state.totalXP,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        practiceSessionsCompleted: state.practiceSessionsCompleted,
        totalPracticeMinutes: state.totalPracticeMinutes,
        submoduleScores: state.submoduleScores,
        sectionProgress: state.sectionProgress,
      }),
    }
  )
)

/**
 * Helper to get submodule IDs for a module
 * Defined here to avoid circular imports with course-data
 */
function getModuleSubmoduleIds(moduleId: number): string[] {
  const moduleSubmoduleCounts: Record<number, number> = {
    1: 5, // Module 1 has 5 submodules (1.1 - 1.5)
    2: 6, // Module 2 has 6 submodules (2.1 - 2.6)
    3: 6, // Module 3 has 6 submodules
    4: 7, // Module 4 has 7 submodules
    5: 6, // Module 5 has 6 submodules
  }

  const count = moduleSubmoduleCounts[moduleId] || 0
  return Array.from({ length: count }, (_, i) => `${moduleId}.${i + 1}`)
}

export default useProgressStore

/**
 * Subscribe to store changes and sync to Supabase
 * This runs once when the module loads
 */
useProgressStore.subscribe((state) => {
  // Extract only the data fields (not actions) for syncing
  const progressData: UserProgress = {
    completedSubmodules: state.completedSubmodules,
    completedLevels: state.completedLevels,
    submoduleScores: state.submoduleScores,
    sectionProgress: state.sectionProgress,
    totalXP: state.totalXP,
    streakDays: state.streakDays,
    lastActiveDate: state.lastActiveDate,
    practiceSessionsCompleted: state.practiceSessionsCompleted,
    totalPracticeMinutes: state.totalPracticeMinutes,
    currentModuleId: state.currentModuleId,
    currentSubmoduleId: state.currentSubmoduleId,
  }

  // Schedule debounced sync to cloud
  scheduleSyncToSupabase(progressData)
})
