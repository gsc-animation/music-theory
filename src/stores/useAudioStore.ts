import { create } from 'zustand'
import { audioEngine } from '../services/audio-engine'

// Module-level timeout ID for highlight auto-clear (6 seconds)
let highlightTimeoutId: ReturnType<typeof setTimeout> | null = null

interface AudioState {
  isReady: boolean
  isPlaying: boolean
  activeNotes: string[]
  recordedNotes: string[]
  timeSignature: string
  initializeAudio: () => Promise<void>
  startNote: (note: string) => void
  stopNote: (note: string) => void
  // Play note without recording (for preview/click playback)
  playNote: (note: string) => void
  releaseNote: (note: string) => void
  // Highlight note for visual feedback only (no audio)
  highlightNote: (note: string) => void
  unhighlightNote: (note: string) => void
  clearHighlights: () => void
  clearRecordedNotes: () => void
  setTimeSignature: (signature: string) => void
  playSuccess: () => void
  playFailure: () => void
  replayRecordedNotes: () => void
}

export const useAudioStore = create<AudioState>((set) => ({
  isReady: false,
  isPlaying: false,
  activeNotes: [],
  recordedNotes: [],
  timeSignature: '4/4',

  initializeAudio: async () => {
    try {
      await audioEngine.initialize()
      set({ isReady: true })
    } catch (error) {
      console.error('Failed to initialize audio:', error)
    }
  },

  startNote: (note: string) => {
    audioEngine.startNote(note)
    set((state) => ({
      activeNotes: [...state.activeNotes, note],
      recordedNotes: [...state.recordedNotes, note],
      isPlaying: true,
    }))
  },

  stopNote: (note: string) => {
    audioEngine.stopNote(note)
    set((state) => {
      const newActiveNotes = state.activeNotes.filter((n) => n !== note)
      return {
        activeNotes: newActiveNotes,
        isPlaying: newActiveNotes.length > 0,
      }
    })
  },

  // Play note without recording - for preview/click playback
  // This highlights instruments but doesn't add to recordedNotes
  playNote: (note: string) => {
    audioEngine.startNote(note)
    set((state) => ({
      activeNotes: state.activeNotes.includes(note)
        ? state.activeNotes
        : [...state.activeNotes, note],
      isPlaying: true,
    }))
  },

  // Release note without affecting recordedNotes
  releaseNote: (note: string) => {
    audioEngine.stopNote(note)
    set((state) => {
      const newActiveNotes = state.activeNotes.filter((n) => n !== note)
      return {
        activeNotes: newActiveNotes,
        isPlaying: newActiveNotes.length > 0,
      }
    })
  },

  // Highlight timeout ID (stored outside state to avoid re-renders)
  // Will be set when using highlightNote

  // Highlight note for visual feedback only (no audio)
  // Used during abcjs playback to sync instruments
  // Auto-clears after 6 seconds of no activity
  highlightNote: (note: string) => {
    // Clear existing timeout
    if (highlightTimeoutId !== null) {
      clearTimeout(highlightTimeoutId)
    }

    set((state) => ({
      activeNotes: state.activeNotes.includes(note)
        ? state.activeNotes
        : [...state.activeNotes, note],
    }))

    // Set new timeout to clear all highlights after 6 seconds
    highlightTimeoutId = setTimeout(() => {
      set({ activeNotes: [] })
      highlightTimeoutId = null
    }, 6000)
  },

  // Remove highlight from note (no audio)
  unhighlightNote: (note: string) => {
    set((state) => ({
      activeNotes: state.activeNotes.filter((n) => n !== note),
    }))
  },

  // Clear all highlights immediately
  clearHighlights: () => {
    if (highlightTimeoutId !== null) {
      clearTimeout(highlightTimeoutId)
      highlightTimeoutId = null
    }
    set({ activeNotes: [] })
  },

  clearRecordedNotes: () => set({ recordedNotes: [] }),

  setTimeSignature: (signature: string) => set({ timeSignature: signature }),

  playSuccess: () => {
    audioEngine.playSuccess()
  },

  playFailure: () => {
    audioEngine.playFailure()
  },

  replayRecordedNotes: () => {
    const state = useAudioStore.getState()
    const notes = state.recordedNotes
    if (notes.length === 0) return

    notes.forEach((note, index) => {
      setTimeout(() => {
        audioEngine.startNote(note)
        setTimeout(() => {
          audioEngine.stopNote(note)
        }, 150)
      }, index * 200)
    })
  },
}))
