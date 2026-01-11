import { create } from 'zustand';
import { audioEngine } from '../services/audio-engine';

interface AudioState {
  isReady: boolean;
  isPlaying: boolean;
  currentNote: string | null;
  initializeAudio: () => Promise<void>;
  triggerNote: (note: string, duration?: string) => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isReady: false,
  isPlaying: false,
  currentNote: null,

  initializeAudio: async () => {
    try {
      await audioEngine.initialize();
      set({ isReady: true });
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  },

  triggerNote: (note: string, duration: string = '8n') => {
    audioEngine.playNote(note, duration);
    set({ currentNote: note, isPlaying: true });

    // Reset playing state after duration (simplified for now)
    // In a real app, we might want more complex state management for note release
    setTimeout(() => {
        set((state) => state.currentNote === note ? { isPlaying: false, currentNote: null } : {});
    }, 200);
  },
}));
