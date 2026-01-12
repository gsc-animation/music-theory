import { create } from 'zustand';
import { audioEngine } from '../services/audio-engine';

interface AudioState {
  isReady: boolean;
  isPlaying: boolean;
  activeNotes: string[];
  recordedNotes: string[];
  timeSignature: string;
  initializeAudio: () => Promise<void>;
  startNote: (note: string) => void;
  stopNote: (note: string) => void;
  clearRecordedNotes: () => void;
  setTimeSignature: (signature: string) => void;
  playSuccess: () => void;
  playFailure: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  isReady: false,
  isPlaying: false,
  activeNotes: [],
  recordedNotes: [],
  timeSignature: '4/4',

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
      recordedNotes: [...state.recordedNotes, note],
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

  clearRecordedNotes: () => set({ recordedNotes: [] }),

  setTimeSignature: (signature: string) => set({ timeSignature: signature }),

  playSuccess: () => {
    audioEngine.playSuccess();
  },

  playFailure: () => {
    audioEngine.playFailure();
  }
}));
