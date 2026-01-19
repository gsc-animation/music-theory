import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * ABC Notation Header structure
 */
interface ABCHeader {
  title: string      // T: field
  meter: string      // M: field (e.g., "4/4")
  unitLength: string // L: field (e.g., "1/4")
  key: string        // K: field (e.g., "C")
  tempo: number      // Q: field (BPM)
}

/**
 * History entry for undo functionality
 */
interface HistoryEntry {
  notes: string
  timestamp: number
}

/**
 * Central notation store state and actions
 */
interface NotationState {
  // State
  header: ABCHeader
  notes: string              // Just the notes portion
  history: HistoryEntry[]    // For undo
  historyIndex: number

  // Computed
  getFullNotation: () => string

  // Actions - Notes
  appendNote: (note: string, duration?: string) => void
  appendChord: (notes: string[]) => void
  appendRest: (duration?: string) => void
  addBarLine: () => void
  backspace: () => void

  // Actions - Header
  setTitle: (title: string) => void
  setKey: (key: string) => void
  setMeter: (meter: string) => void
  setTempo: (bpm: number) => void
  setUnitLength: (length: string) => void

  // Actions - Control
  setNotation: (notes: string) => void
  clear: () => void
  undo: () => void
  redo: () => void
}

const DEFAULT_HEADER: ABCHeader = {
  title: 'Sahaja Yoga Music Studying',
  meter: '4/4',
  unitLength: '1/4',
  key: 'C',
  tempo: 100,
}

const MAX_HISTORY = 50

/**
 * Converts a note name to ABC notation format
 * e.g., "C4" -> "C", "C5" -> "c", "C3" -> "C,"
 */
export function noteToABC(note: string): string {
  const match = note.match(/^([A-Ga-g])([#b]?)(\d)$/)
  if (!match) return note

  const [, letter, accidental, octaveStr] = match
  const octave = parseInt(octaveStr, 10)
  const baseLetter = letter.toUpperCase()

  // ABC notation: C4 = C, C5 = c, C3 = C,, C6 = c'
  let abcNote = ''

  if (octave >= 5) {
    abcNote = baseLetter.toLowerCase()
    // Add apostrophes for octaves above 5
    for (let i = 5; i < octave; i++) {
      abcNote += "'"
    }
  } else {
    abcNote = baseLetter
    // Add commas for octaves below 4
    for (let i = 4; i > octave; i--) {
      abcNote += ','
    }
  }

  // Add accidental
  if (accidental === '#') {
    abcNote = '^' + abcNote
  } else if (accidental === 'b') {
    abcNote = '_' + abcNote
  }

  return abcNote
}

/**
 * Builds the full ABC notation string from header and notes
 */
function buildNotation(header: ABCHeader, notes: string): string {
  const lines = [
    `X:1`,
    `T:${header.title}`,
    `M:${header.meter}`,
    `L:${header.unitLength}`,
    `Q:${header.tempo}`,
    `K:${header.key}`,
    notes || ''
  ]
  return lines.join('\n')
}

export const useNotationStore = create<NotationState>()(
  persist(
    (set, get) => ({
      // Initial state
      header: { ...DEFAULT_HEADER },
      notes: '',
      history: [],
      historyIndex: -1,

      // Computed - get full ABC notation
      getFullNotation: () => {
        const { header, notes } = get()
        return buildNotation(header, notes)
      },

      // Append a single note
      appendNote: (note: string, duration?: string) => {
        const abcNote = noteToABC(note) + (duration || '')
        set((state) => {
          const newNotes = state.notes + abcNote
          return {
            notes: newNotes,
            history: [...state.history.slice(0, state.historyIndex + 1), { notes: newNotes, timestamp: Date.now() }].slice(-MAX_HISTORY),
            historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY - 1),
          }
        })
      },

      // Append a chord [CEG]
      appendChord: (notes: string[]) => {
        const abcNotes = notes.map(n => noteToABC(n)).join('')
        const chord = `[${abcNotes}]`
        set((state) => {
          const newNotes = state.notes + chord
          return {
            notes: newNotes,
            history: [...state.history.slice(0, state.historyIndex + 1), { notes: newNotes, timestamp: Date.now() }].slice(-MAX_HISTORY),
            historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY - 1),
          }
        })
      },

      // Append a rest
      appendRest: (duration?: string) => {
        const rest = 'z' + (duration || '')
        set((state) => {
          const newNotes = state.notes + rest
          return {
            notes: newNotes,
            history: [...state.history.slice(0, state.historyIndex + 1), { notes: newNotes, timestamp: Date.now() }].slice(-MAX_HISTORY),
            historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY - 1),
          }
        })
      },

      // Add a bar line
      addBarLine: () => {
        set((state) => ({
          notes: state.notes + ' | ',
        }))
      },

      // Remove last character/element
      backspace: () => {
        set((state) => {
          // Simple backspace - remove last character
          // Could be improved to remove entire notes/chords
          const newNotes = state.notes.slice(0, -1)
          return {
            notes: newNotes,
          }
        })
      },

      // Header setters
      setTitle: (title: string) => set((state) => ({
        header: { ...state.header, title },
      })),

      setKey: (key: string) => set((state) => ({
        header: { ...state.header, key },
      })),

      setMeter: (meter: string) => set((state) => ({
        header: { ...state.header, meter },
      })),

      setTempo: (bpm: number) => set((state) => ({
        header: { ...state.header, tempo: bpm },
      })),

      setUnitLength: (length: string) => set((state) => ({
        header: { ...state.header, unitLength: length },
      })),

      // Set entire notation (for loading/pasting)
      setNotation: (notes: string) => {
        set((state) => ({
          notes,
          history: [...state.history.slice(0, state.historyIndex + 1), { notes, timestamp: Date.now() }].slice(-MAX_HISTORY),
          historyIndex: Math.min(state.historyIndex + 1, MAX_HISTORY - 1),
        }))
      },

      // Clear notation
      clear: () => {
        set((state) => ({
          notes: '',
          history: [...state.history, { notes: '', timestamp: Date.now() }].slice(-MAX_HISTORY),
          historyIndex: state.history.length,
        }))
      },

      // Undo
      undo: () => {
        set((state) => {
          if (state.historyIndex <= 0) return state
          const newIndex = state.historyIndex - 1
          return {
            notes: state.history[newIndex]?.notes || '',
            historyIndex: newIndex,
          }
        })
      },

      // Redo
      redo: () => {
        set((state) => {
          if (state.historyIndex >= state.history.length - 1) return state
          const newIndex = state.historyIndex + 1
          return {
            notes: state.history[newIndex]?.notes || '',
            historyIndex: newIndex,
          }
        })
      },
    }),
    {
      name: 'music-theory-notation',
      partialize: (state) => ({
        header: state.header,
        notes: state.notes,
      }),
    }
  )
)

export default useNotationStore
