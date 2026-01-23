import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface SettingsState {
  notationSystem: 'latin' | 'solfege'
  theme: Theme
  vnMode: boolean
  bpm: number
  setNotationSystem: (system: 'latin' | 'solfege') => void
  toggleNotationSystem: () => void
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setVnMode: (vnMode: boolean) => void
  toggleVnMode: () => void
  setBpm: (bpm: number) => void
  adjustBpm: (delta: number) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notationSystem: 'latin',
      theme: 'system',
      vnMode: false,
      bpm: 120,
      setNotationSystem: (system) => set({ notationSystem: system }),
      toggleNotationSystem: () =>
        set((state) => ({
          notationSystem: state.notationSystem === 'latin' ? 'solfege' : 'latin',
        })),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setVnMode: (vnMode) => set({ vnMode }),
      toggleVnMode: () =>
        set((state) => ({
          vnMode: !state.vnMode,
        })),
      setBpm: (bpm) => set({ bpm: Math.max(40, Math.min(240, bpm)) }),
      adjustBpm: (delta) =>
        set((state) => ({
          bpm: Math.max(40, Math.min(240, state.bpm + delta)),
        })),
    }),
    {
      name: 'music-theory-settings',
    }
  )
)
