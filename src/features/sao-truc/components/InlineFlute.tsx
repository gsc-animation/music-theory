/**
 * InlineFlute - Compact flute visualization for inline use in TheoryContent
 *
 * Shows flute fingering chart for specified notes (DISPLAY ONLY - no click interaction).
 * Groups same-letter notes to show only unique fingerings.
 * Supports {{flute:Title|C4,D4,E4}} syntax.
 */
import React, { useMemo } from 'react'
import { getFingering } from '../logic/fingering-engine'
import { getNoteLabel } from '../../../utils/note-labels'
import { useSettingsStore } from '../../../stores/useSettingsStore'
import type { HoleState } from '../types'

interface InlineFluteProps {
  /** Optional title displayed above the flute */
  title?: string
  /** Notes to highlight/show fingerings for */
  highlightNotes?: string[]
}

// Color map for each note letter
const NOTE_COLORS: Record<string, string> = {
  C: '#9ca3af', // gray
  D: '#a855f7', // purple
  E: '#facc15', // yellow
  F: '#fb923c', // orange
  G: '#22c55e', // green
  A: '#ef4444', // red
  B: '#3b82f6', // blue
}

export const InlineFlute: React.FC<InlineFluteProps> = ({ title, highlightNotes = [] }) => {
  const notationSystem = useSettingsStore((state) => state.notationSystem)

  // Get unique fingerings (deduplicate same note letters with same fingering)
  const fingerings = useMemo(() => {
    const seen = new Set<string>()
    return highlightNotes
      .map((note) => ({
        note,
        letter: note.replace(/[0-9]/g, ''),
        fingering: getFingering(note, '6-hole'),
      }))
      .filter((f) => {
        if (!f.fingering) return false
        // Use fingering pattern as key to deduplicate
        const key = f.fingering.holes.join('')
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
  }, [highlightNotes])

  // Render a single flute with fingering (display only, no click)
  const renderFlute = (holes: HoleState[], note: string, noteLetter: string) => {
    const color = NOTE_COLORS[noteLetter] || '#30e8e8'
    const fluteWidth = 600
    const fluteHeight = 60

    return (
      <div key={note} className="flex items-center gap-3 p-1 rounded">
        {/* Note Label */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-black shadow-md"
          style={{ backgroundColor: color }}
        >
          {getNoteLabel(noteLetter, notationSystem)}
        </div>

        {/* Flute SVG - Display only */}
        <svg
          width={fluteWidth}
          height={fluteHeight}
          viewBox={`0 0 ${fluteWidth} ${fluteHeight}`}
          className="select-none"
        >
          <defs>
            <linearGradient id={`fluteGrad-${note}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#cfa572" />
              <stop offset="50%" stopColor="#f3deb0" />
              <stop offset="100%" stopColor="#cfa572" />
            </linearGradient>
          </defs>

          {/* Flute Body */}
          <rect
            x="5"
            y="12"
            width={fluteWidth - 10}
            height={fluteHeight - 24}
            rx="18"
            fill={`url(#fluteGrad-${note})`}
            stroke="#a8a29e"
            strokeWidth="1"
          />

          {/* Blow Hole - centered in its space (between x=5 and x=120) */}
          <g>
            {/* Blow hole (ellipse) - centered at x=62 */}
            <ellipse
              cx="62"
              cy={fluteHeight / 2}
              rx="11"
              ry="8"
              fill="#1e293b"
              stroke="#475569"
              strokeWidth="1"
            />
            {/* Wind/breath indicator arrow */}
            <path
              d="M 32 30 L 48 30 L 42 23 M 48 30 L 42 37"
              stroke="#dc2626"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Separator line */}
          <line
            x1="120"
            y1="15"
            x2="120"
            y2={fluteHeight - 15}
            stroke="#78716c"
            strokeWidth="2"
            strokeDasharray="4,3"
          />

          {/* Left Hand Label - above flute, clear background */}
          <rect x="215" y="0" width="60" height="12" fill="#1e293b" rx="3" />
          <text x="245" y="9" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="bold">
            Tay trái
          </text>

          {/* Right Hand Label - above flute, clear background */}
          <rect x="455" y="0" width="60" height="12" fill="#1e293b" rx="3" />
          <text x="485" y="9" fontSize="9" fill="#ffffff" textAnchor="middle" fontWeight="bold">
            Tay phải
          </text>

          {/* Finger Holes - 3 left hand + big gap + 3 right hand */}
          {[...holes].reverse().map((state, i) => {
            // First 3 holes (left hand): 6, 5, 4
            // Last 3 holes (right hand): 3, 2, 1
            const leftHandStart = 200
            const holeSpacing = 50
            const handGap = 70 // Gap between hands

            let cx: number
            if (i < 3) {
              // Left hand (holes 6, 5, 4)
              cx = leftHandStart + i * holeSpacing
            } else {
              // Right hand (holes 3, 2, 1) - add extra gap
              cx = leftHandStart + i * holeSpacing + handGap
            }

            const cy = fluteHeight / 2
            const r = 11

            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={state === 'X' ? '#1e293b' : '#fef3c7'}
                  stroke="#475569"
                  strokeWidth="1.5"
                />
                {state === 'H' && (
                  <path
                    d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`}
                    fill="#1e293b"
                  />
                )}
                {/* Hole number */}
                <text
                  x={cx}
                  y={fluteHeight - 2}
                  fontSize="9"
                  fill="#1e293b"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {6 - i}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    )
  }

  return (
    <div className="inline-flute-wrapper my-3">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="material-symbols-outlined text-amber-600 text-sm">music_note</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{title}</span>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-amber-50/50 dark:bg-slate-800/50 p-3">
        {fingerings.length > 0 ? (
          <div className="flex flex-col gap-2">
            {fingerings.map((f) =>
              f.fingering ? renderFlute(f.fingering.holes, f.note, f.letter) : null
            )}
          </div>
        ) : (
          <div className="text-center text-slate-400 text-sm py-4">
            No valid fingerings for specified notes
          </div>
        )}

        {/* Legend with better contrast */}
        <div className="flex items-center gap-4 mt-3 pt-2 border-t border-amber-200/50 dark:border-slate-700">
          <span className="text-[10px] text-slate-500 font-semibold">Hướng dẫn:</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#1e293b] border-2 border-slate-500"></div>
            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">Bịt</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-[#fef3c7] border-2 border-slate-500"></div>
            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">Mở</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-red-600 text-sm font-bold">→</span>
            <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">
              Lỗ thổi
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InlineFlute
