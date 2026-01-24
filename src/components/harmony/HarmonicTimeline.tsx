import React, { useState, useCallback } from 'react'
import { useNotationStore } from '../../stores/useNotationStore'

export interface ChordBlock {
  id: string
  name: string
  numeral: string
  function: 'tonic' | 'subdominant' | 'dominant'
  notes: string[]
}

const FUNCTION_COLORS = {
  tonic: { bg: 'bg-blue-500/10', border: 'border-blue-500', text: 'text-blue-500' },
  subdominant: { bg: 'bg-amber-500/10', border: 'border-amber-500', text: 'text-amber-500' },
  dominant: { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-500' },
}

interface HarmonicTimelineProps {
  className?: string
}

/**
 * Harmonic Timeline - drag-and-drop chord progression builder
 */
export const HarmonicTimeline: React.FC<HarmonicTimelineProps> = ({ className }) => {
  const appendChord = useNotationStore((state) => state.appendChord)

  const [chords, setChords] = useState<ChordBlock[]>([
    { id: '1', name: 'C', numeral: 'I', function: 'tonic', notes: ['C4', 'E4', 'G4'] },
    { id: '2', name: 'F', numeral: 'IV', function: 'subdominant', notes: ['F4', 'A4', 'C5'] },
    { id: '3', name: 'G7', numeral: 'V7', function: 'dominant', notes: ['G4', 'B4', 'D5', 'F5'] },
    { id: '4', name: 'Am', numeral: 'vi', function: 'tonic', notes: ['A4', 'C5', 'E5'] },
  ])

  const [draggedId, setDraggedId] = useState<string | null>(null)
  const [playheadPosition, setPlayheadPosition] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    if (!draggedId || draggedId === targetId) return

    const draggedIndex = chords.findIndex((c) => c.id === draggedId)
    const targetIndex = chords.findIndex((c) => c.id === targetId)

    const newChords = [...chords]
    const [removed] = newChords.splice(draggedIndex, 1)
    newChords.splice(targetIndex, 0, removed)

    setChords(newChords)
    setDraggedId(null)
  }

  const handleDropZone = (e: React.DragEvent) => {
    e.preventDefault()
    // For now, just add a placeholder - in real app would open chord picker
    const newChord: ChordBlock = {
      id: Date.now().toString(),
      name: 'Dm',
      numeral: 'ii',
      function: 'subdominant',
      notes: ['D4', 'F4', 'A4'],
    }
    setChords([...chords, newChord])
  }

  const handleChordClick = useCallback(
    (chord: ChordBlock) => {
      appendChord(chord.notes)
    },
    [appendChord]
  )

  const handleRemoveChord = (id: string) => {
    setChords(chords.filter((c) => c.id !== id))
  }

  const handlePlay = () => {
    if (isPlaying) {
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    setPlayheadPosition(0)

    // Animate playhead
    const totalDuration = chords.length * 1000 // 1 second per chord
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      setPlayheadPosition(progress * 100)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsPlaying(false)
      }
    }

    requestAnimationFrame(animate)

    // Play chords sequentially
    chords.forEach((chord, index) => {
      setTimeout(() => {
        appendChord(chord.notes)
      }, index * 1000)
    })
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Chord blocks */}
      <div className="flex items-stretch overflow-x-auto no-scrollbar relative h-16 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        {chords.map((chord) => {
          const colors = FUNCTION_COLORS[chord.function]
          return (
            <div
              key={chord.id}
              draggable
              onDragStart={(e) => handleDragStart(e, chord.id)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, chord.id)}
              onClick={() => handleChordClick(chord)}
              className={`
                chord-block flex-1 min-w-[80px] relative group
                ${colors.bg} border-l-4 ${colors.border}
                cursor-grab active:cursor-grabbing
                hover:brightness-95 transition-all
                ${draggedId === chord.id ? 'opacity-50' : ''}
              `}
            >
              <span className={`text-sm font-bold ${colors.text}`}>{chord.name}</span>
              <span className="text-[9px] font-semibold text-slate-500">{chord.numeral}</span>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveChord(chord.id)
                }}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] transition-opacity"
              >
                ×
              </button>
            </div>
          )
        })}

        {/* Drop zone */}
        <div
          onDragOver={handleDragOver}
          onDrop={handleDropZone}
          className="chord-block flex-1 min-w-[80px] bg-slate-100/30 dark:bg-slate-700/30 border-dashed border-2 border-slate-200 dark:border-slate-600 flex-row gap-2"
        >
          <span className="material-symbols-outlined text-slate-300 text-lg">add_circle</span>
          <span className="text-[9px] font-bold text-slate-400 uppercase">Drop</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden relative">
        <div
          className="absolute left-0 top-0 bottom-0 bg-[#30e8e8] transition-all duration-100"
          style={{ width: `${playheadPosition}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePlay}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {isPlaying ? 'stop' : 'play_arrow'}
            </span>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
          <button
            onClick={() => {
              setChords([])
              setPlayheadPosition(0)
            }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            Clear
          </button>
        </div>
        <span className="text-[10px] text-slate-400">
          {chords.length} chord{chords.length !== 1 ? 's' : ''} • Drag to reorder
        </span>
      </div>
    </div>
  )
}

export default HarmonicTimeline
