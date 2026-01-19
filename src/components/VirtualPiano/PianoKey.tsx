import React, { useState, useRef, useEffect } from 'react'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getNoteLabel } from '../../utils/note-labels'

export type KeyType = 'white' | 'black'

interface PianoKeyProps {
  note: string
  type: KeyType
  label?: string
  onStartNote: (note: string) => void
  onStopNote: (note: string) => void
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  type,
  label: _label,
  onStartNote,
  onStopNote,
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false) // Track if key was pressed
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const localizedLabel = getNoteLabel(note, notationSystem)
  // Strip octave numbers for display cleanliness (e.g. "Do4" -> "Do")
  // Only show label if it was requested (white keys usually)
  const displayLabel = _label ? localizedLabel.replace(/[0-9]/g, '') : undefined

  const clearHighlightTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault() // Prevent scrolling/selection
    clearHighlightTimeout()
    setIsActive(true)
    setIsPressed(true)
    onStartNote(note)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    if (isPressed) {
      onStopNote(note)
      setIsPressed(false)
    }
    // Keep highlight for 300ms
    timeoutRef.current = setTimeout(() => {
      setIsActive(false)
    }, 300)
  }

  const handlePointerLeave = (e: React.PointerEvent) => {
    e.preventDefault()
    // Only stop note if it was actively pressed
    if (isPressed) {
      onStopNote(note)
      setIsPressed(false)
      // Keep highlight for 300ms
      timeoutRef.current = setTimeout(() => {
        setIsActive(false)
      }, 300)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => clearHighlightTimeout()
  }, [])

  const baseClasses =
    'relative flex items-end justify-center pb-2 rounded-b-lg shadow-sm transition-colors duration-75 select-none touch-none'

  const typeClasses =
    type === 'white'
      ? `h-48 w-full z-0 border border-warm-wood/20 ${isActive ? 'bg-bamboo/20' : 'bg-rice-paper'}`
      : `h-32 w-full z-10 border border-warm-wood/40 ${isActive ? 'bg-warm-wood/80' : 'bg-warm-wood'} text-white`

  const activeClasses = isActive ? 'scale-[0.98] origin-top' : ''

  return (
    <button
      className={`${baseClasses} ${typeClasses} ${activeClasses}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      aria-label={`Piano key ${note}`}
      style={{ touchAction: 'none' }}
    >
      {displayLabel && (
        <span className="text-sm font-bold opacity-80 pointer-events-none">{displayLabel}</span>
      )}
    </button>
  )
}

export default PianoKey
