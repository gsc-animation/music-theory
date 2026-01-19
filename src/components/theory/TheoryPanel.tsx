import React, { useState } from 'react'
import { CircleOfFifths } from './CircleOfFifths'
import { useNotationStore } from '../../stores/useNotationStore'

const DIATONIC_DEGREES = [
  { numeral: 'I', name: 'Tonic', notes: ['C', 'E', 'G'], color: 'bg-blue-500' },
  { numeral: 'ii', name: 'Supertonic', notes: ['D', 'F', 'A'], color: 'bg-amber-500' },
  { numeral: 'iii', name: 'Mediant', notes: ['E', 'G', 'B'], color: 'bg-amber-500' },
  { numeral: 'IV', name: 'Subdominant', notes: ['F', 'A', 'C'], color: 'bg-amber-500' },
  { numeral: 'V', name: 'Dominant', notes: ['G', 'B', 'D'], color: 'bg-red-500' },
  { numeral: 'vi', name: 'Submediant', notes: ['A', 'C', 'E'], color: 'bg-amber-500' },
  { numeral: 'vii°', name: 'Leading', notes: ['B', 'D', 'F'], color: 'bg-red-500' },
]

interface TheoryPanelProps {
  className?: string
}

/**
 * Theory Panel with Circle of Fifths and Diatonic Palette
 */
export const TheoryPanel: React.FC<TheoryPanelProps> = ({ className }) => {
  const [selectedKey, setSelectedKey] = useState('C')
  const appendChord = useNotationStore((state) => state.appendChord)
  const setKey = useNotationStore((state) => state.setKey)

  const handleKeySelect = (key: string) => {
    setSelectedKey(key)
    setKey(key)
  }

  const handleChordClick = (notes: string[]) => {
    // Convert to full note names with octave
    const chordNotes = notes.map((n) => `${n}4`)
    appendChord(chordNotes)
  }

  return (
    <div className={`flex flex-col lg:flex-row gap-4 ${className}`}>
      {/* Circle of Fifths */}
      <div className="flex-shrink-0 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
          Circle of Fifths
        </h4>
        <CircleOfFifths selectedKey={selectedKey} onKeySelect={handleKeySelect} />
      </div>

      {/* Diatonic Palette */}
      <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-3">
          Diatonic Palette ({selectedKey} Major)
        </h4>
        <div className="grid grid-cols-7 gap-1">
          {DIATONIC_DEGREES.map((degree) => (
            <button
              key={degree.numeral}
              onClick={() => handleChordClick(degree.notes)}
              className="flex flex-col items-center p-2 rounded-lg hover:bg-white dark:hover:bg-slate-700 transition-colors group"
            >
              <div
                className={`w-8 h-8 rounded-lg ${degree.color} flex items-center justify-center text-white font-bold text-xs shadow-sm group-hover:scale-110 transition-transform`}
              >
                {degree.numeral}
              </div>
              <span className="text-[8px] text-slate-500 mt-1 truncate w-full text-center">
                {degree.name}
              </span>
            </button>
          ))}
        </div>

        {/* Chord function legend */}
        <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-200 dark:border-slate-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-[9px] text-slate-500">Tonic</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-[9px] text-slate-500">Pre-dom</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-[9px] text-slate-500">Dominant</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TheoryPanel
