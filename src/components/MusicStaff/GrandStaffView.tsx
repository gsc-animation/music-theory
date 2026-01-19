import React from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import clsx from 'clsx'

/**
 * Map note names to staff positions
 * Position 0 = middle C (C4), positive = up, negative = down
 * Each step = one line/space on staff
 */
const NOTE_POSITIONS: Record<string, number> = {
  // Bass clef notes (below middle C)
  C2: -14,
  D2: -13,
  E2: -12,
  F2: -11,
  G2: -10,
  A2: -9,
  B2: -8,
  C3: -7,
  D3: -6,
  E3: -5,
  F3: -4,
  G3: -3,
  A3: -2,
  B3: -1,
  // Middle C
  C4: 0,
  // Treble clef notes (above middle C)
  D4: 1,
  E4: 2,
  F4: 3,
  G4: 4,
  A4: 5,
  B4: 6,
  C5: 7,
  D5: 8,
  E5: 9,
  F5: 10,
  G5: 11,
  A5: 12,
  B5: 13,
  C6: 14,
  D6: 15,
  E6: 16,
}

// Also handle sharps/flats by mapping to base note positions
const getNotePosition = (note: string): number | null => {
  // Normalize: C#4 -> C4, Db4 -> D4, etc.
  const match = note.match(/^([A-G])([#b])?(\d)$/)
  if (!match) return null
  const [, letter, , octave] = match
  const baseNote = `${letter}${octave}`
  return NOTE_POSITIONS[baseNote] ?? null
}

// Check if note is sharp or flat
const isSharpOrFlat = (note: string): 'sharp' | 'flat' | null => {
  if (note.includes('#')) return 'sharp'
  if (note.includes('b')) return 'flat'
  return null
}

// Get display name for note
const getNoteDisplayName = (note: string): string => {
  return note.replace(/(\d)/, '')
}

interface StaffNoteProps {
  note: string
  position: number
  xPosition: number // Horizontal position as percentage
  isActive?: boolean // Currently being played
}

const StaffNote: React.FC<StaffNoteProps> = ({
  note,
  position,
  xPosition,
  isActive = false,
}) => {
  const accidental = isSharpOrFlat(note)

  // Position calculation:
  // Middle C (position 0) is at the ledger line between staves
  // Each position step = 5px (half a staff line spacing)
  // Staff gap center is at ~60px from treble bottom
  const baseOffset = 60 // Center point between staves
  const pixelOffset = baseOffset - position * 5

  // Determine if we need ledger lines
  const needsLedgerLine = position === 0 // Middle C

  return (
    <div
      className={clsx(
        'absolute flex items-center group cursor-pointer transition-all duration-150',
        isActive ? 'scale-110' : 'hover:scale-105'
      )}
      style={{
        top: `${pixelOffset}px`,
        left: `${xPosition}%`,
        transform: 'translateX(-50%)',
      }}
    >
      {/* Ledger line for middle C */}
      {needsLedgerLine && (
        <div className="absolute w-6 h-[1px] bg-slate-400 dark:bg-slate-500 -left-1" />
      )}
      {/* Accidental symbol */}
      {accidental && (
        <span className="absolute -left-4 text-[10px] font-bold text-slate-600 dark:text-slate-300">
          {accidental === 'sharp' ? '♯' : '♭'}
        </span>
      )}
      {/* Note head */}
      <div
        className={clsx(
          'w-[13px] h-[9px] rounded-[50%] -rotate-[25deg] border border-white',
          isActive
            ? 'bg-primary shadow-[0_0_12px_rgba(48,232,232,0.8)]'
            : 'bg-slate-700 dark:bg-slate-300'
        )}
      />
      {/* Note stem */}
      <div
        className={clsx(
          'absolute w-[1px] h-8',
          isActive ? 'bg-primary' : 'bg-slate-700 dark:bg-slate-300',
          position >= 0 ? 'bottom-[4px] right-[0.5px]' : 'top-[4px] left-[0.5px]'
        )}
      />
      {/* Note label */}
      <span
        className={clsx(
          'absolute top-6 text-[10px] font-bold font-serif whitespace-nowrap',
          isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
        )}
      >
        {getNoteDisplayName(note)}
      </span>
    </div>
  )
}

export interface GrandStaffViewProps {
  className?: string
}

/**
 * GrandStaffView - Displays a proper grand staff (treble + bass clefs)
 * that accumulates notes when instruments are played
 */
export const GrandStaffView: React.FC<GrandStaffViewProps> = ({ className }) => {
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const recordedNotes = useAudioStore((state) => state.recordedNotes)
  const clearRecordedNotes = useAudioStore((state) => state.clearRecordedNotes)

  // Calculate max notes to display (limit to avoid overcrowding)
  const MAX_VISIBLE_NOTES = 16
  const visibleNotes = recordedNotes.slice(-MAX_VISIBLE_NOTES)

  // Get notes with their positions and horizontal placement
  const notesToRender = visibleNotes
    .map((note, index) => ({
      note,
      position: getNotePosition(note),
      // Spread notes across 10% to 90% of width
      xPosition: 15 + (index / Math.max(visibleNotes.length - 1, 1)) * 70,
      isActive: activeNotes.includes(note),
    }))
    .filter((n): n is { note: string; position: number; xPosition: number; isActive: boolean } =>
      n.position !== null
    )

  const noteCount = recordedNotes.length

  return (
    <div className={clsx('p-3 relative overflow-hidden min-h-[220px]', className)}>
      {/* Controls toolbar */}
      <div className="flex flex-wrap gap-2 justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-md p-0.5 border border-slate-200 dark:border-slate-600">
              <button className="px-2 py-0.5 text-[9px] font-bold bg-white dark:bg-slate-800 shadow-sm rounded-sm text-slate-700 dark:text-slate-200">
                2 Staffs
              </button>
              <button className="px-2 py-0.5 text-[9px] font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 hover:bg-slate-200/50 rounded-sm">
                1 Staff
              </button>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600" />
            {/* Clear Staff button */}
            <button
              onClick={clearRecordedNotes}
              disabled={noteCount === 0}
              className={clsx(
                'flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold border transition-colors',
                noteCount > 0
                  ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800 hover:bg-red-100'
                  : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
              )}
            >
              <span className="material-symbols-outlined text-[12px]">delete</span>
              Clear Staff
            </button>
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-serif italic">
          {noteCount > 0
            ? `${noteCount} note${noteCount > 1 ? 's' : ''} recorded`
            : 'Play an instrument to add notes'}
        </div>
      </div>

      {/* Grand Staff container */}
      <div className="w-full max-w-4xl mx-auto relative pt-4 pb-12 px-16 select-none">
        <div className="relative">
          {/* Bracket connecting both staves */}
          <div
            className="absolute left-[-1px] top-0 bottom-0 w-[14px] border-l-[5px] border-t-[5px] border-b-[5px] border-slate-800 dark:border-slate-400 rounded-tl rounded-bl"
            style={{ borderRightWidth: 0 }}
          />

          {/* Left bar line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-800 dark:bg-slate-400" />

          {/* Right bar line */}
          <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-slate-400" />

          {/* Staves container */}
          <div className="flex flex-col gap-[60px]">
            {/* Treble Staff */}
            <div className="relative h-10 w-full">
              {/* Treble Clef symbol */}
              <div className="absolute -left-10 -top-[22px] text-[3.8rem] leading-none font-serif text-slate-800 dark:text-slate-200 z-10">
                𝄞
              </div>
              {/* Staff lines */}
              <div className="flex flex-col justify-between h-full w-full absolute top-0 left-0">
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
              </div>

              {/* Render treble clef notes (position > 0) */}
              {notesToRender
                .filter((n) => n.position > 0)
                .map((n, i) => (
                  <StaffNote
                    key={`treble-${i}-${n.note}`}
                    note={n.note}
                    position={n.position}
                    xPosition={n.xPosition}
                    isActive={n.isActive}
                  />
                ))}
            </div>

            {/* Bass Staff */}
            <div className="relative h-10 w-full">
              {/* Bass Clef symbol */}
              <div className="absolute -left-10 -top-[16px] text-[2.4rem] leading-none font-serif text-slate-800 dark:text-slate-200 z-10">
                𝄢
              </div>
              {/* Staff lines */}
              <div className="flex flex-col justify-between h-full w-full absolute top-0 left-0">
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
                <div className="h-[1px] w-full bg-slate-300 dark:bg-slate-600" />
              </div>

              {/* Render bass clef notes (position < 0) */}
              {notesToRender
                .filter((n) => n.position < 0)
                .map((n, i) => (
                  <StaffNote
                    key={`bass-${i}-${n.note}`}
                    note={n.note}
                    position={n.position}
                    xPosition={n.xPosition}
                    isActive={n.isActive}
                  />
                ))}
            </div>
          </div>

          {/* Middle C (between staves) */}
          {notesToRender
            .filter((n) => n.position === 0)
            .map((n, i) => (
              <div
                key={`middleC-${i}`}
                className="absolute"
                style={{ top: '50%', marginTop: '-5px', left: `${n.xPosition}%` }}
              >
                <StaffNote
                  note={n.note}
                  position={n.position}
                  xPosition={50}
                  isActive={n.isActive}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default GrandStaffView
