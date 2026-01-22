import React, { useState, useRef, useEffect } from 'react'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getNoteLabel } from '../../utils/note-labels'

export type KeyType = 'white' | 'black'

interface PianoKeyProps {
  note: string
  type: KeyType
  label?: string
  isHighlighted?: boolean // For cross-instrument highlighting
  onStartNote: (note: string) => void
  onStopNote: (note: string) => void
}

const PianoKey: React.FC<PianoKeyProps> = ({
  note,
  type,
  label: _label,
  isHighlighted = false,
  onStartNote,
  onStopNote,
}) => {
  const [isActive, setIsActive] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const localizedLabel = getNoteLabel(note, notationSystem)
  const displayLabel = _label ? localizedLabel.replace(/[0-9]/g, '') : undefined

  // Combined active state (local press OR cross-instrument highlight)
  const showActive = isActive || isHighlighted

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
    'relative flex items-end justify-center pb-2 rounded-b-lg shadow-sm transition-colors duration-75 select-none touch-none cursor-pointer h-full'

  // Module 5 colors: white keys white bg, black keys #111818, active cyan #30e8e8
  const typeClasses =
    type === 'white'
      ? `h-[120px] w-full z-0 border border-slate-200 ${showActive ? 'bg-[#30e8e8]' : 'bg-white'}`
      : `h-[75px] w-full z-10 ${showActive ? 'bg-[#30e8e8]' : 'bg-[#111818]'} text-white rounded-b`

  const activeClasses = showActive ? 'shadow-[inset_0_-5px_0_rgba(0,0,0,0.1)]' : ''

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
