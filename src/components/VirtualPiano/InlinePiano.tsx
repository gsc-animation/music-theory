/**
 * InlinePiano - Compact piano keyboard for inline use in TheoryContent
 *
 * Supports:
 * - Highlighting specific notes with cyan glow
 * - Click-to-play on any key
 * - Automatic note labels
 */
import React from 'react'
import { useAudioStore } from '../../stores/useAudioStore'

interface InlinePianoProps {
  /** Optional title displayed above the keyboard */
  title?: string
  /** Notes to highlight (e.g., ['C4', 'E4', 'G4']) */
  highlightNotes?: string[]
  /** Starting octave (default: 3) */
  startOctave?: number
  /** Number of octaves to display (default: 2) */
  octaves?: number
}

const NOTES = [
  { note: 'C', type: 'white' },
  { note: 'C#', type: 'black' },
  { note: 'D', type: 'white' },
  { note: 'D#', type: 'black' },
  { note: 'E', type: 'white' },
  { note: 'F', type: 'white' },
  { note: 'F#', type: 'black' },
  { note: 'G', type: 'white' },
  { note: 'G#', type: 'black' },
  { note: 'A', type: 'white' },
  { note: 'A#', type: 'black' },
  { note: 'B', type: 'white' },
] as const

// SVG dimensions - increased to match guitar fretboard height (110px)
const KEY_WIDTH = 31
const WHITE_KEY_HEIGHT = 110
const BLACK_KEY_HEIGHT = 70
const BLACK_KEY_WIDTH = 20

export const InlinePiano: React.FC<InlinePianoProps> = ({
  title,
  highlightNotes = [],
  startOctave = 3,
  octaves = 3,
}) => {
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)

  const handleKeyClick = (note: string) => {
    startNote(note)
    setTimeout(() => stopNote(note), 300)
  }

  // Build all keys
  const allKeys: Array<{
    note: string
    type: 'white' | 'black'
    x: number
    octave: number
  }> = []

  let whiteKeyIndex = 0
  for (let oct = 0; oct < octaves; oct++) {
    const currentOctave = startOctave + oct
    for (const noteInfo of NOTES) {
      const fullNote = `${noteInfo.note}${currentOctave}`
      if (noteInfo.type === 'white') {
        allKeys.push({
          note: fullNote,
          type: 'white',
          x: whiteKeyIndex * KEY_WIDTH,
          octave: currentOctave,
        })
        whiteKeyIndex++
      }
    }
  }

  // Add black keys with correct positioning
  whiteKeyIndex = 0
  for (let oct = 0; oct < octaves; oct++) {
    const currentOctave = startOctave + oct
    for (const noteInfo of NOTES) {
      if (noteInfo.type === 'white') {
        whiteKeyIndex++
      } else {
        const fullNote = `${noteInfo.note}${currentOctave}`
        // Black key is positioned to the left of the next white key
        const x = whiteKeyIndex * KEY_WIDTH - BLACK_KEY_WIDTH / 2
        allKeys.push({
          note: fullNote,
          type: 'black',
          x,
          octave: currentOctave,
        })
      }
    }
  }

  const totalWidth = whiteKeyIndex * KEY_WIDTH
  const whiteKeys = allKeys.filter((k) => k.type === 'white')
  const blackKeys = allKeys.filter((k) => k.type === 'black')

  return (
    <div className="inline-piano-wrapper my-4">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-blue-500 text-sm">piano</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{title}</span>
          <span className="text-[9px] text-slate-400">(click to play)</span>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-100 dark:bg-slate-800/50 p-2 w-full">
        <svg
          width="100%"
          height={WHITE_KEY_HEIGHT + 10}
          viewBox={`0 0 ${totalWidth} ${WHITE_KEY_HEIGHT + 10}`}
          className="cursor-pointer select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* White Keys */}
          {whiteKeys.map((key) => {
            const noteLetter = key.note.replace(/[0-9]/g, '')
            // Match by letter (e.g., C3,C4 highlights all C notes)
            const highlightLetters = highlightNotes.map((n) => n.replace(/[0-9]/g, ''))
            const isHighlighted = highlightLetters.includes(noteLetter)
            return (
              <g key={key.note} onClick={() => handleKeyClick(key.note)}>
                <rect
                  x={key.x + 1}
                  y={5}
                  width={KEY_WIDTH - 2}
                  height={WHITE_KEY_HEIGHT}
                  rx={3}
                  fill={isHighlighted ? '#30e8e8' : '#ffffff'}
                  stroke="#cbd5e1"
                  strokeWidth={1}
                  className="hover:fill-slate-100 dark:hover:fill-slate-200 transition-colors"
                  style={
                    isHighlighted
                      ? { filter: 'drop-shadow(0 0 6px rgba(48, 232, 232, 0.6))' }
                      : undefined
                  }
                />
                {/* Note label with octave */}
                <text
                  x={key.x + KEY_WIDTH / 2}
                  y={WHITE_KEY_HEIGHT - 5}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill={isHighlighted ? '#111818' : '#64748b'}
                >
                  {key.note}
                </text>
              </g>
            )
          })}

          {/* Black Keys */}
          {blackKeys.map((key) => {
            const noteLetter = key.note.replace(/[0-9]/g, '')
            const highlightLetters = highlightNotes.map((n) => n.replace(/[0-9]/g, ''))
            const isHighlighted = highlightLetters.includes(noteLetter)
            return (
              <g key={key.note} onClick={() => handleKeyClick(key.note)}>
                <rect
                  x={key.x}
                  y={5}
                  width={BLACK_KEY_WIDTH}
                  height={BLACK_KEY_HEIGHT}
                  rx={2}
                  fill={isHighlighted ? '#30e8e8' : '#1e293b'}
                  stroke={isHighlighted ? '#ffffff' : '#0f172a'}
                  strokeWidth={1}
                  className="hover:fill-slate-700 transition-colors"
                  style={
                    isHighlighted
                      ? { filter: 'drop-shadow(0 0 6px rgba(48, 232, 232, 0.6))' }
                      : undefined
                  }
                />
                {/* Note label for highlighted black keys */}
                {isHighlighted && (
                  <text
                    x={key.x + BLACK_KEY_WIDTH / 2}
                    y={BLACK_KEY_HEIGHT - 5}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill="#111818"
                  >
                    {key.note}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export default InlinePiano
