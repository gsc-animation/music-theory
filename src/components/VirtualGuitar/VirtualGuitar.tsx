import React, { useMemo } from 'react'
import { getNoteAtPosition, getPositionsForNote, GUITAR_TUNING } from '../../utils/guitar-logic'

interface VirtualGuitarProps {
  /** Notes currently active/playing (e.g., ['C4', 'E4', 'G4']) */
  activeNotes?: string[]
  /** Callback when a note is clicked */
  onPlayNote: (note: string) => void
  /** Whether to show note labels on the fretboard */
  showLabels?: boolean
}

// Module 5 design: show first 8 frets only
const TOTAL_FRETS = 8
// SVG Dimensions - more compact like Module 5
const WIDTH = 600
const HEIGHT = 120
const PADDING_X = 30
const PADDING_Y = 15
const FRETBOARD_WIDTH = WIDTH - PADDING_X * 2
const FRETBOARD_HEIGHT = HEIGHT - PADDING_Y * 2
const STRING_SPACING = FRETBOARD_HEIGHT / 5
const FRET_SPACING = FRETBOARD_WIDTH / TOTAL_FRETS

export const VirtualGuitar: React.FC<VirtualGuitarProps> = ({
  activeNotes = [],
  onPlayNote,
  showLabels = true,
}) => {
  // Pre-calculate active positions for fast lookup
  const activePositions = useMemo(() => {
    const map = new Map<string, boolean>()
    activeNotes.forEach(note => {
      const positions = getPositionsForNote(note)
      positions.forEach(pos => {
        // Only show positions for first 8 frets
        if (pos.fret <= TOTAL_FRETS) {
          map.set(`${pos.stringIndex}-${pos.fret}`, true)
        }
      })
    })
    return map
  }, [activeNotes])

  const handleFretClick = (stringIndex: number, fret: number) => {
    const note = getNoteAtPosition(stringIndex, fret)
    if (note) {
      onPlayNote(note)
    }
  }

  // Fret markers (3, 5, 7 visible in first 8 frets)
  const singleDots = [3, 5, 7]

  return (
    <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
      {/* Header with key label */}
      <div className="flex justify-end px-3 py-1 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-[9px] text-slate-400 uppercase font-medium tracking-wide">C Major</span>
      </div>
      
      <div className="p-3">
        {/* Fretboard */}
        <div className="relative">
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="w-full h-auto cursor-pointer select-none"
            aria-label="Virtual Guitar Fretboard"
          >
            {/* Fretboard Background - Module 5 light color */}
            <rect
              x={PADDING_X}
              y={PADDING_Y}
              width={FRETBOARD_WIDTH}
              height={FRETBOARD_HEIGHT}
              fill="#f8fafc"
              className="dark:fill-[#1e293b]"
            />

            {/* Frets (Vertical Lines) - slate color */}
            {Array.from({ length: TOTAL_FRETS + 1 }).map((_, i) => (
              <line
                key={`fret-${i}`}
                x1={PADDING_X + i * FRET_SPACING}
                y1={PADDING_Y}
                x2={PADDING_X + i * FRET_SPACING}
                y2={HEIGHT - PADDING_Y}
                stroke="#cbd5e1"
                strokeWidth={i === 0 ? 4 : 2}
              />
            ))}

            {/* Fret Markers (Dots at 3, 5, 7) */}
            {singleDots.map(fret => (
              <circle
                key={`dot-${fret}`}
                cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
                cy={HEIGHT / 2}
                r={4}
                fill="#cbd5e1"
                opacity={0.6}
              />
            ))}

            {/* Strings - slate-400 color */}
            {GUITAR_TUNING.map((_, stringIndex) => (
              <line
                key={`string-${stringIndex}`}
                x1={PADDING_X}
                y1={PADDING_Y + stringIndex * STRING_SPACING}
                x2={WIDTH - PADDING_X}
                y2={PADDING_Y + stringIndex * STRING_SPACING}
                stroke="#94a3b8"
                strokeWidth={1 + (stringIndex * 0.3)}
              />
            ))}

            {/* Click Areas & Active Notes */}
            {GUITAR_TUNING.map((_, stringIndex) => (
              Array.from({ length: TOTAL_FRETS + 1 }).map((_, fret) => {
                const isActive = activePositions.has(`${stringIndex}-${fret}`)
                const renderX = fret === 0 ? PADDING_X - 10 : PADDING_X + (fret - 0.5) * FRET_SPACING
                const note = getNoteAtPosition(stringIndex, fret)
                const y = PADDING_Y + stringIndex * STRING_SPACING

                return (
                  <g
                    key={`pos-${stringIndex}-${fret}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFretClick(stringIndex, fret)
                    }}
                  >
                    {/* Invisible Click Target */}
                    <rect
                      x={renderX - 12}
                      y={y - STRING_SPACING / 2}
                      width={fret === 0 ? 24 : FRET_SPACING}
                      height={STRING_SPACING}
                      fill="transparent"
                      className="hover:fill-slate-200/50 dark:hover:fill-slate-700/50"
                    />

                    {/* Active Note Indicator - Module 5 cyan with glow */}
                    {isActive && (
                      <circle
                        cx={renderX}
                        cy={y}
                        r={8}
                        fill="#30e8e8"
                        stroke="#ffffff"
                        strokeWidth={1}
                        style={{ filter: 'drop-shadow(0 0 6px rgba(48, 232, 232, 0.6))' }}
                      />
                    )}

                    {/* Note Label */}
                    {(isActive || (showLabels && fret === 0)) && (
                      <text
                        x={renderX}
                        y={y}
                        dy={3}
                        textAnchor="middle"
                        fontSize="7"
                        fill={isActive ? '#111818' : '#94a3b8'}
                        pointerEvents="none"
                        fontWeight="bold"
                      >
                        {note?.replace(/[0-9]/g, '')}
                      </text>
                    )}
                  </g>
                )
              })
            ))}
          </svg>
        </div>
      </div>
    </div>
  )
}
