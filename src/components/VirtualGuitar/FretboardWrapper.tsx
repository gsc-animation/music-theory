/**
 * FretboardWrapper - React wrapper for @moonwave99/fretboard.js
 *
 * Provides:
 * - Note highlighting from activeNotes
 * - Chord diagram rendering with finger numbers
 * - Click interaction to play notes
 * - Dark/Light mode support
 * - Responsive sizing
 */

import React, { useEffect, useRef, useCallback, useMemo } from 'react'
import { Fretboard } from '@moonwave99/fretboard.js'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getChordVoicing, type ChordVoicing } from '../../data/chord-voicings'
import {
  transposeWrittenToGuitar,
  transposeGuitarToWritten,
  getPositionsForNote,
} from '../../utils/guitar-logic'

interface FretboardWrapperProps {
  /** Notes to highlight on fretboard (written pitch from staff, e.g., ['C4', 'E4', 'G4']) */
  activeNotes?: string[]
  /** Chord voicing string (e.g., 'x32010') - if provided, renders chord diagram */
  chord?: string
  /** Chord name for display and finger lookup (e.g., 'C', 'Am') */
  chordName?: string
  /** Callback when a position is clicked */
  onNoteClick?: (note: string) => void
  /** Compact mode for inline use */
  compact?: boolean
  /** Show note labels on dots */
  showLabels?: boolean
  /** Show finger numbers on chord diagrams */
  showFingers?: boolean
  /** Number of frets to display */
  fretCount?: number
}

// Styling config matching reference fretboard.js examples
const getConfig = (compact: boolean, isDark: boolean) => ({
  // Sizing - use large width, container CSS will constrain
  // Height increased by 15% to show all dots properly
  width: 600,
  height: compact ? 127 : 173, // +15% from 110/150

  // Fret settings
  fretCount: 7,
  showFretNumbers: true,
  fretNumbersMargin: 15,
  fretNumbersHeight: 20, // Reduced from default 40 to extend hoverDiv to cover all 6 strings
  scaleFrets: false,

  // Dot styling - clean circular notes like reference
  dotSize: compact ? 20 : 26,
  dotStrokeWidth: 2,
  dotTextSize: compact ? 11 : 13,

  // Nut (first fret marker)
  nutWidth: 5,

  // Padding - increased to show notes at edges properly
  // NOTE: bottomPadding must be 0 so hoverDiv click layer covers all 6 strings
  topPadding: 15,
  bottomPadding: 0,
  leftPadding: 15,
  rightPadding: 15,

  // Theme colors - matching reference image style
  fretColor: isDark ? '#4b5563' : '#94a3b8',
  stringColor: isDark ? '#6b7280' : '#64748b',
  nutColor: isDark ? '#d1d5db' : '#374151',

  // Dot colors - cyan/teal like reference
  dotFill: isDark ? '#22d3ee' : '#06b6d4',
  dotStrokeColor: isDark ? '#155e75' : '#ffffff',

  // Root note color (for highlighting)
  rootFill: isDark ? '#ec4899' : '#db2777',

  // Font
  font: 'Inter, system-ui, sans-serif',

  // Crop to show only used frets
  crop: false,
})

export const FretboardWrapper: React.FC<FretboardWrapperProps> = ({
  activeNotes = [],
  chord,
  chordName,
  onNoteClick,
  compact = false,
  showLabels = true,
  showFingers = true,
  fretCount,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const fretboardRef = useRef<Fretboard | null>(null)

  // Get theme from settings store
  const theme = useSettingsStore((state) => state.theme)
  const isDark = theme === 'dark'

  // Memoize config
  const config = useMemo(() => {
    const baseConfig = getConfig(compact, isDark)
    if (fretCount) {
      baseConfig.fretCount = fretCount
    }
    return baseConfig
  }, [compact, isDark, fretCount])

  // Convert activeNotes (written pitch) to fretboard positions
  const positions = useMemo(() => {
    const positionList: Array<{ string: number; fret: number; note?: string }> = []

    activeNotes.forEach((writtenNote) => {
      // Transpose written pitch down to guitar sounding pitch
      const soundingNote = transposeWrittenToGuitar(writtenNote)
      if (soundingNote) {
        const notePositions = getPositionsForNote(soundingNote)
        // Include ALL positions within fret range (not just the first one)
        notePositions.forEach((p) => {
          if (p.fret <= config.fretCount) {
            positionList.push({
              string: p.stringIndex + 1, // fretboard.js uses 1-indexed strings
              fret: p.fret,
              note: soundingNote.replace(/[0-9]/g, ''), // Note letter without octave
            })
          }
        })
      }
    })

    return positionList
  }, [activeNotes, config.fretCount])

  // Store onNoteClick in a ref to avoid re-renders when callback changes
  const onNoteClickRef = useRef(onNoteClick)
  useEffect(() => {
    onNoteClickRef.current = onNoteClick
  }, [onNoteClick])

  // Handle click on fretboard - uses ref to avoid dependency issues
  const handleClick = useCallback(
    (position: { string: number; fret: number }) => {
      const callback = onNoteClickRef.current
      if (!callback) return

      // Convert position to note
      // fretboard.js string is 1-indexed, our guitar-logic uses 0-indexed
      const stringIndex = position.string - 1
      const fret = position.fret

      // Import getNoteAtPosition dynamically to avoid circular deps
      import('../../utils/guitar-logic').then(({ getNoteAtPosition }) => {
        const soundingNote = getNoteAtPosition(stringIndex, fret)
        if (soundingNote) {
          const writtenNote = transposeGuitarToWritten(soundingNote)
          if (writtenNote) {
            callback(writtenNote)
          }
        }
      })
    },
    [] // No dependencies - uses ref for callback
  )

  // Get chord voicing data
  const chordVoicing: ChordVoicing | undefined = useMemo(() => {
    if (chordName) {
      return getChordVoicing(chordName)
    }
    return undefined
  }, [chordName])

  // Initialize and update fretboard
  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous instance
    containerRef.current.innerHTML = ''

    // Create new fretboard instance
    const fretboard = new Fretboard({
      el: containerRef.current,
      ...config,
    })

    fretboardRef.current = fretboard

    // Render based on mode
    if (chord || chordVoicing) {
      // Chord diagram mode
      const voicingString = chord || chordVoicing?.voicing
      if (voicingString) {
        const barres = chordVoicing?.barres?.map((b) => ({
          fret: b.fret,
          stringFrom: b.stringFrom,
          stringTo: b.stringTo,
        }))

        fretboard.renderChord(voicingString, barres)

        // Add finger numbers if available
        if (showFingers && chordVoicing?.fingers) {
          fretboard.style({
            text: (position: { string: number; fret: number }) => {
              const fingerData = chordVoicing.fingers.find(
                (f) => f.string === position.string && f.fret === position.fret
              )
              return fingerData?.finger?.toString() || ''
            },
            fontSize: compact ? 10 : 14,
            fontFill: isDark ? '#0f172a' : '#ffffff',
          })
        }

        // Handle muted strings
        const mutedStrings: number[] = []
        voicingString.split('').forEach((char, index) => {
          if (char === 'x') {
            mutedStrings.push(6 - index) // Convert to string number
          }
        })
        if (mutedStrings.length > 0) {
          fretboard.muteStrings({
            strings: mutedStrings,
            stroke: isDark ? '#f87171' : '#ef4444',
          })
        }
      }
    } else if (positions.length > 0) {
      // Note highlighting mode
      fretboard.setDots(positions).render()

      // Style dots with note labels
      if (showLabels) {
        fretboard.style({
          text: (position: { string: number; fret: number; note?: string }) => {
            const pos = positions.find(
              (p) => p.string === position.string && p.fret === position.fret
            )
            return pos?.note || ''
          },
          fontSize: compact ? 10 : 12,
          fontFill: isDark ? '#0f172a' : '#ffffff',
        })
      }
    } else {
      // Empty fretboard
      fretboard.render()
    }

    // Always set up click handler - use ref pattern to handle dynamic callback
    // The handleClick function checks onNoteClickRef.current for undefined
    fretboard.on('click', (position: { string: number; fret: number; note?: string }) => {
      handleClick({ string: position.string, fret: position.fret })
    })

    // Fix hoverDiv to cover all 6 strings (library sets bottom offset by default)
    const container = containerRef.current
    if (container) {
      const hoverDiv = container.querySelector('.hoverDiv') as HTMLDivElement | null
      if (hoverDiv) {
        hoverDiv.style.bottom = '0'
      }
    }

    // Cleanup
    return () => {
      if (fretboardRef.current) {
        fretboardRef.current.removeEventListeners()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config,
    chord,
    chordVoicing,
    positions,
    showLabels,
    showFingers,
    isDark,
    compact,
    // handleClick uses ref so doesn't need to be in deps
  ])

  return (
    <div
      className="fretboard-wrapper relative"
      style={{
        width: '100%',
        touchAction: 'manipulation',
      }}
    >
      {/* Fretboard container */}
      <div
        ref={containerRef}
        className={`
          fretboard-container
          rounded-lg
          ${isDark ? 'bg-slate-900' : 'bg-slate-50'}
          border ${isDark ? 'border-slate-700' : 'border-slate-200'}
        `}
        style={{
          minHeight: config.height,
          width: '100%',
        }}
      />

      {/* Chord name label - overlay on top of fretboard */}
      {chordName && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ opacity: 0.4 }}
        >
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {chordName}
          </span>
        </div>
      )}
    </div>
  )
}

export default FretboardWrapper
