import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { StateStorage } from 'zustand/middleware'

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
  }
}

/**
 * User progress state interface
 */
export interface UserProgress {
  // Completed submodules (e.g., ["1.1", "1.2", "2.1"])
  completedSubmodules: string[]
  
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
}

interface ProgressState extends UserProgress {
  // Actions
  completeSubmodule: (submoduleId: string) => void
  setCurrentPosition: (moduleId: number, submoduleId: string) => void
  addXP: (amount: number) => void
  updateStreak: () => void
  recordPracticeSession: (minutes: number) => void
  setSubmoduleScore: (submoduleId: string, score: number) => void
  isSubmoduleCompleted: (submoduleId: string) => boolean
  getModuleProgress: (moduleId: number) => number
  resetProgress: () => void
}

const initialState: UserProgress = {
  completedSubmodules: [],
  currentModuleId: 1,
  currentSubmoduleId: '1.1',
  totalXP: 0,
  streakDays: 0,
  lastActiveDate: '',
  practiceSessionsCompleted: 0,
  totalPracticeMinutes: 0,
  submoduleScores: {}
}

// XP rewards
const XP_COMPLETE_SUBMODULE = 50
const XP_PERFECT_SCORE = 25
const XP_STREAK_BONUS = 10

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      completeSubmodule: (submoduleId) => set((state) => {
        if (state.completedSubmodules.includes(submoduleId)) {
          return state // Already completed
        }
        
        return {
          completedSubmodules: [...state.completedSubmodules, submoduleId],
          totalXP: state.totalXP + XP_COMPLETE_SUBMODULE
        }
      }),
      
      setCurrentPosition: (moduleId, submoduleId) => set({
        currentModuleId: moduleId,
        currentSubmoduleId: submoduleId
      }),
      
      addXP: (amount) => set((state) => ({
        totalXP: state.totalXP + amount
      })),
      
      updateStreak: () => set((state) => {
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
            totalXP: state.totalXP + XP_STREAK_BONUS
          }
        }
        
        // Streak broken or first day
        return {
          streakDays: 1,
          lastActiveDate: today
        }
      }),
      
      recordPracticeSession: (minutes) => set((state) => ({
        practiceSessionsCompleted: state.practiceSessionsCompleted + 1,
        totalPracticeMinutes: state.totalPracticeMinutes + minutes
      })),
      
      setSubmoduleScore: (submoduleId, score) => set((state) => {
        const currentBest = state.submoduleScores[submoduleId] || 0
        const isPerfect = score === 100 && currentBest < 100
        
        return {
          submoduleScores: {
            ...state.submoduleScores,
            [submoduleId]: Math.max(currentBest, score)
          },
          totalXP: state.totalXP + (isPerfect ? XP_PERFECT_SCORE : 0)
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
        
        const completed = moduleSubmodules.filter(id => 
          state.completedSubmodules.includes(id)
        ).length
        
        return Math.round((completed / moduleSubmodules.length) * 100)
      },
      
      resetProgress: () => set(initialState)
    }),
    {
      name: 'music-theory-progress',
      storage: createJSONStorage(() => indexedDBStorage),
      partialize: (state) => ({
        completedSubmodules: state.completedSubmodules,
        currentModuleId: state.currentModuleId,
        currentSubmoduleId: state.currentSubmoduleId,
        totalXP: state.totalXP,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        practiceSessionsCompleted: state.practiceSessionsCompleted,
        totalPracticeMinutes: state.totalPracticeMinutes,
        submoduleScores: state.submoduleScores
      })
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
    5: 6  // Module 5 has 6 submodules
  }
  
  const count = moduleSubmoduleCounts[moduleId] || 0
  return Array.from({ length: count }, (_, i) => `${moduleId}.${i + 1}`)
}

export default useProgressStore
