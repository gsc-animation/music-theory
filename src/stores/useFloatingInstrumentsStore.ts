import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type InstrumentType = 'piano' | 'guitar' | 'flute'

interface InstrumentState {
  isVisible: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
}

interface FloatingInstrumentsState {
  instruments: Record<InstrumentType, InstrumentState>
  activeInstrument: InstrumentType | null

  // Actions
  showInstrument: (type: InstrumentType) => void
  hideInstrument: (type: InstrumentType) => void
  toggleInstrument: (type: InstrumentType) => void
  minimizeInstrument: (type: InstrumentType) => void
  restoreInstrument: (type: InstrumentType) => void
  setPosition: (type: InstrumentType, position: { x: number; y: number }) => void
  setSize: (type: InstrumentType, size: { width: number; height: number }) => void
  bringToFront: (type: InstrumentType) => void
  hideAll: () => void
}

const defaultInstrumentState = (y: number, width: number, height: number): InstrumentState => ({
  isVisible: false,
  position: { x: 20, y },
  size: { width, height },
  isMinimized: false,
})

export const useFloatingInstrumentsStore = create<FloatingInstrumentsState>()(
  persist(
    (set) => ({
      instruments: {
        piano: defaultInstrumentState(100, 520, 220),
        guitar: defaultInstrumentState(340, 520, 180),
        flute: defaultInstrumentState(540, 520, 100),
      },
      activeInstrument: null,

      showInstrument: (type) =>
        set((state) => ({
          instruments: {
            ...state.instruments,
            [type]: { ...state.instruments[type], isVisible: true, isMinimized: false },
          },
          activeInstrument: type,
        })),

      hideInstrument: (type) =>
        set((state) => ({
          instruments: {
            ...state.instruments,
            [type]: { ...state.instruments[type], isVisible: false },
          },
          activeInstrument: state.activeInstrument === type ? null : state.activeInstrument,
        })),

      toggleInstrument: (type) =>
        set((state) => {
          const isVisible = !state.instruments[type].isVisible
          return {
            instruments: {
              ...state.instruments,
              [type]: { ...state.instruments[type], isVisible, isMinimized: false },
            },
            activeInstrument: isVisible
              ? type
              : state.activeInstrument === type
                ? null
                : state.activeInstrument,
          }
        }),

      minimizeInstrument: (type) =>
        set((state) => ({
          instruments: {
            ...state.instruments,
            [type]: { ...state.instruments[type], isMinimized: true },
          },
        })),

      restoreInstrument: (type) =>
        set((state) => ({
          instruments: {
            ...state.instruments,
            [type]: { ...state.instruments[type], isMinimized: false },
          },
          activeInstrument: type,
        })),

      setPosition: (type, position) =>
        set((state) => ({
          instruments: {
            ...state.instruments,
            [type]: { ...state.instruments[type], position },
          },
        })),

      setSize: (type, size) =>
        set((state) => ({
          instruments: {
            ...state.instruments,
            [type]: { ...state.instruments[type], size },
          },
        })),

      bringToFront: (type) => set({ activeInstrument: type }),

      hideAll: () =>
        set((state) => ({
          instruments: {
            piano: { ...state.instruments.piano, isVisible: false },
            guitar: { ...state.instruments.guitar, isVisible: false },
            flute: { ...state.instruments.flute, isVisible: false },
          },
          activeInstrument: null,
        })),
    }),
    {
      name: 'floating-instruments-state',
    }
  )
)
