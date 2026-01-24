import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Module definition
 */
export interface Module {
  id: number
  name: string
  subtitle: string
  progress: number // 0-100
  locked: boolean
}

/**
 * Default modules from Requirements.md
 */
const DEFAULT_MODULES: Module[] = [
  { id: 1, name: 'Fundamentals', subtitle: 'Pitch & Notation', progress: 100, locked: false },
  { id: 2, name: 'Rhythm & Meter', subtitle: 'Time & Pulse', progress: 20, locked: false },
  { id: 3, name: 'Scales & Melody', subtitle: 'Patterns & Motion', progress: 0, locked: false },
  { id: 4, name: 'Harmony', subtitle: 'Chords & Progressions', progress: 0, locked: true },
  { id: 5, name: 'Composition', subtitle: 'Form & Structure', progress: 0, locked: true },
]

interface ModuleState {
  modules: Module[]
  currentModuleId: number
  currentLessonIndex: number
  totalXP: number

  // Actions
  setCurrentModule: (id: number) => void
  setCurrentLesson: (index: number) => void
  updateProgress: (moduleId: number, progress: number) => void
  addXP: (amount: number) => void
  unlockModule: (moduleId: number) => void
}

export const useModuleStore = create<ModuleState>()(
  persist(
    (set) => ({
      modules: DEFAULT_MODULES,
      currentModuleId: 1,
      currentLessonIndex: 0,
      totalXP: 450,

      setCurrentModule: (id) => set({ currentModuleId: id }),

      setCurrentLesson: (index) => set({ currentLessonIndex: index }),

      updateProgress: (moduleId, progress) =>
        set((state) => ({
          modules: state.modules.map((m) =>
            m.id === moduleId ? { ...m, progress: Math.min(100, Math.max(0, progress)) } : m
          ),
        })),

      addXP: (amount) => set((state) => ({ totalXP: state.totalXP + amount })),

      unlockModule: (moduleId) =>
        set((state) => ({
          modules: state.modules.map((m) => (m.id === moduleId ? { ...m, locked: false } : m)),
        })),
    }),
    { name: 'music-theory-modules' }
  )
)

export default useModuleStore
