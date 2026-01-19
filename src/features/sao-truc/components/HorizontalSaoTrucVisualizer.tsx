import React, { useState, useEffect } from 'react'
import { useAudioStore } from '../../../stores/useAudioStore'
import { getFingering } from '../logic/fingering-engine'
import HorizontalFingeringChart from './HorizontalFingeringChart'
import type { FluteType, HoleState } from '../types'

const HorizontalSaoTrucVisualizer: React.FC = () => {
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const [fluteType, setFluteType] = useState<FluteType>('6-hole')
  const [currentFingering, setCurrentFingering] = useState<HoleState[]>([])
  const [currentNote, setCurrentNote] = useState<string>('-')

  useEffect(() => {
    // Strategy: Take the last played note, or persist the current note if silence
    const effectiveNote = (activeNotes.length > 0)
      ? activeNotes[activeNotes.length - 1]
      : (currentNote !== '-' ? currentNote : null)

    if (effectiveNote) {
      // Only update current note reference if it's a new active note
      if (activeNotes.length > 0) setCurrentNote(effectiveNote)

      const fingering = getFingering(effectiveNote, fluteType)
      if (fingering) {
        setCurrentFingering(fingering.holes)
      } else {
        // Handle invalid/out-of-range notes
        setCurrentFingering([])
      }
    } else {
      // Initial state only (never played)
      const holeCount = fluteType === '6-hole' ? 6 : 10
      setCurrentFingering(Array(holeCount).fill('O'))
      setCurrentNote('-')
    }
  }, [activeNotes, fluteType])

  return (
    <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-sm p-3 flex items-center gap-4">
      {/* Flute Type Toggle */}
      <div className="flex gap-1">
        <button
          onClick={() => setFluteType('6-hole')}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            fluteType === '6-hole'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          6h
        </button>
        <button
          onClick={() => setFluteType('10-hole')}
          className={`px-2 py-1 text-xs rounded-full transition-colors ${
            fluteType === '10-hole'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          10h
        </button>
      </div>

      {/* Note Display */}
      <span className="text-sm font-mono text-stone-500 min-w-[60px]">
        {currentNote === '-' ? 'Ready' : currentNote}
      </span>

      {/* Horizontal Flute */}
      <div className="flex-1">
        <HorizontalFingeringChart holes={currentFingering} type={fluteType} />
      </div>
    </div>
  )
}

export default HorizontalSaoTrucVisualizer
