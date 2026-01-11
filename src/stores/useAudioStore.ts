import { create } from 'zustand';
import { audioEngine } from '../services/audio-engine';

interface AudioState {
  isReady: boolean;
  isPlaying: boolean;
  activeNotes: string[];
  initializeAudio: () => Promise<void>;
  startNote: (note: string) => void;
  stopNote: (note: string) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isReady: false,
  isPlaying: false,
  activeNotes: [],

  initializeAudio: async () => {
    try {
      await audioEngine.initialize();
      set({ isReady: true });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  },

  startNote: (note: string) => {
    audioEngine.startNote(note);
    set((state) => ({
      activeNotes: [...state.activeNotes, note],
      isPlaying: true
    }));
  },

  stopNote: (note: string) => {
    audioEngine.stopNote(note);
    set((state) => {
      const newActiveNotes = state.activeNotes.filter(n => n !== note);
      return {
        activeNotes: newActiveNotes,
        isPlaying: newActiveNotes.length > 0
      };
    });
  },
}));
