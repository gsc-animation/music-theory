import React from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useNotationStore } from '../../stores/useNotationStore'
import VirtualPiano from '../VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../VirtualGuitar/VirtualGuitar'

/**
 * Unified instrument panel showing Guitar, Flute, and Piano
 * All instruments share activeNotes for cross-highlighting
 */
export const InstrumentPanel: React.FC = () => {
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const appendNote = useNotationStore((state) => state.appendNote)

  // Handle note stop - adds to notation
  const handleStopNote = (note: string) => {
    stopNote(note)
    appendNote(note)
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Guitar Fretboard - compact */}
      <div className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] rotate-90">music_note</span>
            Guitar Fretboard
          </h3>
          <span className="text-[8px] text-slate-400 uppercase">C Major</span>
        </div>
        <div className="h-[65px] px-3 py-2">
          <VirtualGuitar
            activeNotes={activeNotes}
            onPlayNote={(note) => {
              startNote(note)
              setTimeout(() => handleStopNote(note), 200)
            }}
          />
        </div>
      </div>

      {/* Flute - minimal */}
      <div className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
            Flute
          </h3>
        </div>
        <div className="h-[35px] px-3 py-1 flex items-center">
          <FluteSimple activeNotes={activeNotes} />
        </div>
      </div>

      {/* Piano - full */}
      <div>
        <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px]">piano</span>
            Piano
          </h3>
          <span className="text-[8px] text-slate-400 uppercase">3 Octave</span>
        </div>
        <div className="p-2">
          <VirtualPiano
            startOctave={3}
            octaves={3}
            onStartNote={startNote}
            onStopNote={handleStopNote}
            activeNotes={activeNotes}
          />
        </div>
      </div>
    </div>
  )
}

/**
 * Simple flute visualization with active note highlighting
 */
const FluteSimple: React.FC<{ activeNotes: string[] }> = ({ activeNotes }) => {
  // Map notes to flute holes (simplified 6-hole flute)
  const holes = [
    { id: 1, notes: ['D4', 'D5'] },
    { id: 2, notes: ['E4', 'E5'] },
    { id: 3, notes: ['F4', 'F5', 'F#4', 'F#5'] },
    { id: 4, notes: ['G4', 'G5'] },
    { id: 5, notes: ['A4', 'A5'] },
    { id: 6, notes: ['B4', 'B5'] },
  ]

  const isHoleActive = (hole: (typeof holes)[0]) => hole.notes.some((n) => activeNotes.includes(n))

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
      <div className="relative flex items-center w-full max-w-2xl justify-center">
        {/* Mouthpiece */}
        <div className="w-8 h-4 bg-slate-300 dark:bg-slate-700 rounded-l-full border-r-2 border-slate-400 shadow-sm z-10 shrink-0" />
        {/* Body */}
        <div className="h-4 flex-1 max-w-md bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 flex items-center justify-evenly px-4 rounded-r-full shadow-sm">
          {holes.map((hole) => (
            <div
              key={hole.id}
              className={`
                w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center
                transition-all duration-150
                ${
                  isHoleActive(hole)
                    ? 'bg-[#30e8e8] border-[#136363] shadow-[0_0_8px_rgba(48,232,232,0.6)]'
                    : 'bg-slate-300 dark:bg-slate-600 border-slate-400 dark:border-slate-500'
                }
              `}
            >
              <span
                className={`text-[6px] font-bold ${isHoleActive(hole) ? 'text-[#111818]' : 'text-slate-500'}`}
              >
                {hole.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InstrumentPanel
