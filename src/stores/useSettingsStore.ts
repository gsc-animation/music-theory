import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  notationSystem: 'latin' | 'solfege';
  setNotationSystem: (system: 'latin' | 'solfege') => void;
  toggleNotationSystem: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      notationSystem: 'latin',
      setNotationSystem: (system) => set({ notationSystem: system }),
      toggleNotationSystem: () =>
        set((state) => ({
          notationSystem: state.notationSystem === 'latin' ? 'solfege' : 'latin',
        })),
    }),
    {
      name: 'music-theory-settings',
    }
  )
);
