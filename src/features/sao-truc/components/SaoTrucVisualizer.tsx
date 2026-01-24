import React, { useState, useEffect } from 'react'
import { useAudioStore } from '../../../stores/useAudioStore'
import { useSettingsStore } from '../../../stores/useSettingsStore'
import { getFingering } from '../logic/fingering-engine'
import { getNoteLabel } from '../../../utils/note-labels'
import FingeringChart from './FingeringChart'
import type { FluteType, HoleState } from '../types'

const SaoTrucVisualizer: React.FC = () => {
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const [fluteType, setFluteType] = useState<FluteType>('6-hole')
  const [currentFingering, setCurrentFingering] = useState<HoleState[]>([])
  const [currentNote, setCurrentNote] = useState<string>('-')

  useEffect(() => {
    // Strategy: Take the last played note, or persist the current note if silence
    const effectiveNote =
      activeNotes.length > 0
        ? activeNotes[activeNotes.length - 1]
        : currentNote !== '-'
          ? currentNote
          : null

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

  const getStatusText = () => {
    if (currentNote === '-') return 'Ready'
    const displayNote = getNoteLabel(currentNote, notationSystem)
    if (currentFingering.length === 0) return `Note: ${displayNote} (Out of Range)`
    return `Note: ${displayNote}`
  }

  return (
    <div className="flex flex-col items-center p-4 bg-rice-paper/50 rounded-xl shadow-sm border border-warm-wood/20">
      <h3 className="text-warm-wood font-bold mb-2">Sáo Trúc Visualizer</h3>

      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFluteType('6-hole')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            fluteType === '6-hole'
              ? 'bg-warm-wood text-rice-paper shadow-md'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
        >
          6-hole
        </button>
        <button
          onClick={() => setFluteType('10-hole')}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            fluteType === '10-hole'
              ? 'bg-warm-wood text-rice-paper shadow-md'
              : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
          }`}
        >
          10-hole
        </button>
      </div>

      <div className="flex flex-col items-center">
        <div className="mb-2 text-stone-500 font-mono text-sm h-5 text-center w-full">
          {getStatusText()}
        </div>
        <FingeringChart holes={currentFingering} type={fluteType} />
      </div>
    </div>
  )
}

export default SaoTrucVisualizer
