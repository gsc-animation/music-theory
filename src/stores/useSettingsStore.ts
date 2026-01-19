import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'light' | 'dark' | 'system';

interface SettingsState {
  notationSystem: 'latin' | 'solfege';
  theme: Theme;
  setNotationSystem: (system: 'latin' | 'solfege') => void;
  toggleNotationSystem: () => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notationSystem: 'latin',
      theme: 'system',
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
    }),
    {
      name: 'music-theory-settings',
    }
  )
);
