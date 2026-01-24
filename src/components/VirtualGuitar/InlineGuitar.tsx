/**
 * InlineGuitar - Compact guitar fretboard for inline use in TheoryContent
 *
 * Behavior:
 * - If highlightNotes contains many different note letters → show all notes (color-coded)
 * - If highlightNotes contains only one note letter (e.g., all F notes) → show only that note
 *
 * Color scheme:
 * E - yellow, F - orange, B - blue, A - red, G - green, C - gray, D - purple
 */
import React, { useMemo } from 'react'
import {
  getNoteAtPosition,
  GUITAR_TUNING,
  transposeGuitarToWritten,
} from '../../utils/guitar-logic'
import { useAudioStore } from '../../stores/useAudioStore'

interface InlineGuitarProps {
  /** Optional title displayed above the fretboard */
  title?: string
  /** Notes to highlight - determines what notes to show */
  highlightNotes?: string[]
}

// Color map for each note letter (naturals and accidentals)
const NOTE_COLORS: Record<string, string> = {
  C: '#9ca3af', // gray
  'C#': '#30e8e8', // cyan for sharps
  Db: '#a78bfa', // purple for flats
  D: '#a855f7', // purple
  'D#': '#30e8e8', // cyan
  Eb: '#a78bfa', // purple
  E: '#facc15', // yellow
  F: '#fb923c', // orange
  'F#': '#30e8e8', // cyan
  Gb: '#a78bfa', // purple
  G: '#22c55e', // green
  'G#': '#30e8e8', // cyan
  Ab: '#a78bfa', // purple
  A: '#ef4444', // red
  'A#': '#30e8e8', // cyan
  Bb: '#a78bfa', // purple
  B: '#3b82f6', // blue
}

// Get note color based on letter
const getNoteColor = (noteLetter: string): string => {
  // Try exact match first
  if (NOTE_COLORS[noteLetter]) {
    return NOTE_COLORS[noteLetter]
  }
  // Fallback to base letter
  const letter = noteLetter.replace('#', '').replace('b', '')
  return NOTE_COLORS[letter] || '#30e8e8'
}

// Full 12 frets for complete note coverage
const TOTAL_FRETS = 12
// Dimensions - reduced height by 20%
const WIDTH = 600
const HEIGHT = 110
const PADDING_X = 25
const PADDING_Y = 10
const FRETBOARD_WIDTH = WIDTH - PADDING_X * 2
const FRETBOARD_HEIGHT = HEIGHT - PADDING_Y * 2
const STRING_SPACING = FRETBOARD_HEIGHT / 5
const FRET_SPACING = FRETBOARD_WIDTH / TOTAL_FRETS

export const InlineGuitar: React.FC<InlineGuitarProps> = ({ title, highlightNotes = [] }) => {
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)

  // Build set of highlight note letters (without octave)
  const highlightLetters = useMemo(() => {
    const set = new Set<string>()
    highlightNotes.forEach((note) => {
      const letter = note.replace(/[0-9]/g, '')
      set.add(letter)
    })
    return set
  }, [highlightNotes])

  // Determine if showing all notes or just specific ones
  // If 4+ different note letters → show all notes
  // Otherwise → show only the specified notes
  const showAllNotes = highlightLetters.size >= 4

  const handleFretClick = (stringIndex: number, fret: number) => {
    const soundingNote = getNoteAtPosition(stringIndex, fret)
    if (soundingNote) {
      const writtenNote = transposeGuitarToWritten(soundingNote)
      if (writtenNote) {
        startNote(writtenNote)
        setTimeout(() => stopNote(writtenNote), 300)
      }
    }
  }

  // Fret markers
  const singleDots = [3, 5, 7, 9]
  const doubleDots = [12]

  return (
    <div className="inline-guitar-wrapper my-3">
      {title && (
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-amber-500 text-sm">music_note</span>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">{title}</span>
          <span className="text-[9px] text-slate-400">(click to play)</span>
        </div>
      )}

      <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-800/50">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-auto cursor-pointer select-none"
          aria-label="Guitar Fretboard"
        >
          {/* Fretboard Background */}
          <rect
            x={PADDING_X}
            y={PADDING_Y}
            width={FRETBOARD_WIDTH}
            height={FRETBOARD_HEIGHT}
            fill="#1e293b"
            className="dark:fill-[#0f172a]"
          />

          {/* Frets */}
          {Array.from({ length: TOTAL_FRETS + 1 }).map((_, i) => (
            <line
              key={`fret-${i}`}
              x1={PADDING_X + i * FRET_SPACING}
              y1={PADDING_Y}
              x2={PADDING_X + i * FRET_SPACING}
              y2={HEIGHT - PADDING_Y}
              stroke="#64748b"
              strokeWidth={i === 0 ? 3 : 1.5}
            />
          ))}

          {/* Single Fret Markers */}
          {singleDots.map((fret) => (
            <circle
              key={`dot-${fret}`}
              cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
              cy={HEIGHT / 2}
              r={3}
              fill="#475569"
            />
          ))}

          {/* Double Fret Markers */}
          {doubleDots.map((fret) => (
            <g key={`double-dot-${fret}`}>
              <circle
                cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
                cy={HEIGHT / 2 - 10}
                r={3}
                fill="#475569"
              />
              <circle
                cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
                cy={HEIGHT / 2 + 10}
                r={3}
                fill="#475569"
              />
            </g>
          ))}

          {/* Strings */}
          {GUITAR_TUNING.map((_, stringIndex) => (
            <line
              key={`string-${stringIndex}`}
              x1={PADDING_X}
              y1={PADDING_Y + stringIndex * STRING_SPACING}
              x2={WIDTH - PADDING_X}
              y2={PADDING_Y + stringIndex * STRING_SPACING}
              stroke="#94a3b8"
              strokeWidth={0.8 + stringIndex * 0.25}
            />
          ))}

          {/* Notes on Fretboard */}
          {GUITAR_TUNING.map((_, stringIndex) =>
            Array.from({ length: TOTAL_FRETS + 1 }).map((_, fret) => {
              const soundingNote = getNoteAtPosition(stringIndex, fret)
              if (!soundingNote) return null

              const noteLetter = soundingNote.replace(/[0-9]/g, '')
              const isNatural = !noteLetter.includes('#') && !noteLetter.includes('b')

              // Check if this specific note (including accidentals) should be displayed
              const isHighlightedAccidental = highlightLetters.has(noteLetter)

              // For natural notes: show if showAllNotes OR if specifically highlighted
              // For accidentals: only show if specifically highlighted
              const shouldShow = isNatural
                ? showAllNotes || highlightLetters.has(noteLetter)
                : isHighlightedAccidental
              if (!shouldShow) return null

              const renderX = fret === 0 ? PADDING_X - 8 : PADDING_X + (fret - 0.5) * FRET_SPACING
              const y = PADDING_Y + stringIndex * STRING_SPACING
              const color = getNoteColor(noteLetter)

              return (
                <g
                  key={`pos-${stringIndex}-${fret}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleFretClick(stringIndex, fret)
                  }}
                >
                  {/* Click Target */}
                  <rect
                    x={renderX - 10}
                    y={y - STRING_SPACING / 2}
                    width={fret === 0 ? 20 : FRET_SPACING}
                    height={STRING_SPACING}
                    fill="transparent"
                    className="hover:fill-white/10"
                  />

                  {/* Note Circle - Color-coded */}
                  <circle
                    cx={renderX}
                    cy={y}
                    r={8}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth={0.5}
                  />

                  {/* Note Label with octave */}
                  <text
                    x={renderX}
                    y={y}
                    dy={3}
                    textAnchor="middle"
                    fontSize="7"
                    fill="#000000"
                    pointerEvents="none"
                    fontWeight="bold"
                  >
                    {soundingNote}
                  </text>
                </g>
              )
            })
          )}
        </svg>
      </div>
    </div>
  )
}

export default InlineGuitar
