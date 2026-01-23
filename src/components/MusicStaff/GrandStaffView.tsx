import React from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getNoteLabel } from '../../utils/note-labels'
import clsx from 'clsx'

/**
 * Map note names to staff positions - SEQUENTIAL (each note = 1 step)
 * Position 0 = Middle C (C4)
 * Each step = one line/space on staff (5px)
 *
 * Treble staff lines (bottom to top): E4, G4, B4, D5, F5
 * Bass staff lines (bottom to top): G2, B2, D3, F3, A3
 */
const NOTE_POSITIONS: Record<string, number> = {
  // E2-B2: Extended bass for guitar
  E2: -12,
  F2: -11,
  G2: -10,
  A2: -9,
  B2: -8,
  // C3-B3: Bass clef
  C3: -7,
  D3: -6,
  E3: -5,
  F3: -4,
  G3: -3,
  A3: -2,
  B3: -1,
  // C4: Middle C (ledger line)
  C4: 0,
  // D4-B5: Treble clef
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
}

// Handle sharps/flats by mapping to base note positions
const getNotePosition = (note: string): number | null => {
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

// Get display name for note (without octave)
const getNoteDisplayName = (note: string): string => {
  return note.replace(/(\d)/, '')
}

// Get localized display name for note (respects VN Mode)
const getLocalizedNoteDisplayName = (note: string, notationSystem: 'latin' | 'solfege'): string => {
  const noteWithoutOctave = note.replace(/(\d)/, '')
  return getNoteLabel(noteWithoutOctave, notationSystem)
}

interface StaffNoteProps {
  note: string
  position: number
  xPosition: number
  isActive?: boolean
  staffType: 'treble' | 'bass' | 'middle'
}

/**
 * StaffNote - Renders a note on the staff
 * Position is calculated relative to the staff it belongs to:
 * - Treble: position 1-13, bottom of staff = position ~2 (E4)
 * - Bass: position -12 to -1, bottom of staff = position ~-10 (G2)
 * - Middle: position 0 (C4 ledger line)
 */
const StaffNote: React.FC<StaffNoteProps> = ({
  note,
  position,
  xPosition,
  isActive = false,
  staffType,
}) => {
  const accidental = isSharpOrFlat(note)
  const notationSystem = useSettingsStore((state) => state.notationSystem)

  /**
   * Calculate pixel offset relative to the staff container
   *
   * Staff height = 40px (h-10)
   * 5 lines spaced 10px apart (0, 10, 20, 30, 40)
   * Notes on lines: position at line px value
   * Notes on spaces: position at line px value + 5 (halfway between lines)
   *
   * TREBLE CLEF (staff lines from top to bottom):
   *   Line 1 (top):    F5 = position 10 -> 0px
   *   Line 2:          D5 = position 8  -> 10px
   *   Line 3:          B4 = position 6  -> 20px
   *   Line 4:          G4 = position 4  -> 30px
   *   Line 5 (bottom): E4 = position 2  -> 40px
   *
   *   Spaces from top to bottom:
   *   E5 = position 9  -> 5px  (between F5 and D5)
   *   C5 = position 7  -> 15px (between D5 and B4)
   *   A4 = position 5  -> 25px (between B4 and G4)
   *   F4 = position 3  -> 35px (between G4 and E4)
   *   D4 = position 1  -> 45px (below E4, needs ledger line)
   *
   * BASS CLEF (staff lines from top to bottom):
   *   Line 1 (top):    A3 = position -2  -> 0px
   *   Line 2:          F3 = position -4  -> 10px
   *   Line 3:          D3 = position -6  -> 20px
   *   Line 4:          B2 = position -8  -> 30px
   *   Line 5 (bottom): G2 = position -10 -> 40px
   *
   *   Spaces from top to bottom:
   *   G3 = position -3  -> 5px  (between A3 and F3)
   *   E3 = position -5  -> 15px (between F3 and D3)
   *   C3 = position -7  -> 25px (between D3 and B2)
   *   A2 = position -9  -> 35px (between B2 and G2)
   */
  let pixelOffset: number

  if (staffType === 'treble') {
    // Treble: each step of position = 5px
    // Reference: position 10 (F5) = 0px (top line)
    // Formula: (10 - position) * 5
    // position 10 -> 0px, position 2 -> 40px, position 1 -> 45px (below staff)
    pixelOffset = (10 - position) * 5
  } else if (staffType === 'bass') {
    // Bass: each step of position = 5px
    // Reference: position -2 (A3) = 0px (top line)
    // Formula: (-2 - position) * 5
    // position -2 -> 0px, position -10 -> 40px, position -11 -> 45px (below staff)
    pixelOffset = (-2 - position) * 5
  } else {
    // Middle C (position 0) - on ledger line between staves
    // Position it below treble: (10 - 0) * 5 = 50px below treble top
    // But since it's rendered separately, we just center it
    pixelOffset = 0
  }

  // Clamp to reasonable range for visibility (allow notes above and below staff)
  const clampedOffset = Math.max(-30, Math.min(70, pixelOffset))

  return (
    <div
      className={clsx(
        'absolute flex items-center group cursor-pointer transition-all duration-150',
        isActive ? 'scale-110' : 'hover:scale-105'
      )}
      style={{
        top: `${clampedOffset}px`,
        left: `${xPosition}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Ledger line for notes outside staff */}
      {(position === 0 || position <= 1 || position >= 11 || position <= -9 || position >= -1) && (
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
      {/* Note stem - up for notes below middle, down for above */}
      <div
        className={clsx(
          'absolute w-[1px] h-8',
          isActive ? 'bg-primary' : 'bg-slate-700 dark:bg-slate-300',
          position >= 4 ? 'top-[4px] left-[0.5px]' : 'bottom-[4px] right-[0.5px]'
        )}
      />
      {/* Note label */}
      <span
        className={clsx(
          'absolute top-6 text-[10px] font-bold font-serif whitespace-nowrap',
          isActive ? 'text-primary' : 'text-slate-500 dark:text-slate-400'
        )}
      >
        {getLocalizedNoteDisplayName(note, notationSystem)}
      </span>
    </div>
  )
}

export interface GrandStaffViewProps {
  className?: string
}

/**
 * GrandStaffView - Displays a proper grand staff (treble + bass clefs)
 * C4 is Middle C (center note on ledger line)
 */
export const GrandStaffView: React.FC<GrandStaffViewProps> = ({ className }) => {
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const recordedNotes = useAudioStore((state) => state.recordedNotes)
  const clearRecordedNotes = useAudioStore((state) => state.clearRecordedNotes)

  const MAX_VISIBLE_NOTES = 16
  const visibleNotes = recordedNotes.slice(-MAX_VISIBLE_NOTES)

  const notesToRender = visibleNotes
    .map((note, index) => ({
      note,
      position: getNotePosition(note),
      xPosition: 15 + (index / Math.max(visibleNotes.length - 1, 1)) * 70,
      isActive: activeNotes.includes(note),
    }))
    .filter(
      (n): n is { note: string; position: number; xPosition: number; isActive: boolean } =>
        n.position !== null
    )

  const noteCount = recordedNotes.length

  // Separate notes by staff
  const trebleNotes = notesToRender.filter((n) => n.position > 0)
  const bassNotes = notesToRender.filter((n) => n.position < 0)
  const middleCNotes = notesToRender.filter((n) => n.position === 0)

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

              {/* Render treble clef notes */}
              {trebleNotes.map((n, i) => (
                <StaffNote
                  key={`treble-${i}-${n.note}`}
                  note={n.note}
                  position={n.position}
                  xPosition={n.xPosition}
                  isActive={n.isActive}
                  staffType="treble"
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

              {/* Render bass clef notes */}
              {bassNotes.map((n, i) => (
                <StaffNote
                  key={`bass-${i}-${n.note}`}
                  note={n.note}
                  position={n.position}
                  xPosition={n.xPosition}
                  isActive={n.isActive}
                  staffType="bass"
                />
              ))}
            </div>
          </div>

          {/* Middle C (between staves) */}
          {middleCNotes.map((n, i) => (
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
                staffType="middle"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GrandStaffView
