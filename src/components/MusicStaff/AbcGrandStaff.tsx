import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import abcjs from 'abcjs'
import { useAudioStore } from '../../stores/useAudioStore'

/**
 * Convert note format (e.g., "C4", "F#5") to ABC notation
 */
const noteToAbc = (note: string, showNoteNames: boolean = false): string => {
  const match = note.match(/^([A-G])([#b]?)(\d)$/)
  if (!match) return ''

  const [, letter, accidental, octaveStr] = match
  const octave = parseInt(octaveStr, 10)

  let abcAccidental = ''
  if (accidental === '#') abcAccidental = '^'
  else if (accidental === 'b') abcAccidental = '_'

  let abcNote = ''
  if (octave <= 3) {
    abcNote = letter
    const commas = 4 - octave
    abcNote += ','.repeat(commas)
  } else if (octave === 4) {
    abcNote = letter
  } else if (octave === 5) {
    abcNote = letter.toLowerCase()
  } else {
    abcNote = letter.toLowerCase()
    const apostrophes = octave - 5
    abcNote += "'".repeat(apostrophes)
  }

  // Add annotation for note name if enabled
  if (showNoteNames) {
    const displayName = letter + (accidental || '')
    return `"^${displayName}"${abcAccidental}${abcNote}`
  }

  return abcAccidental + abcNote
}

interface AbcGrandStaffProps {
  showTwoStaves?: boolean
  showNoteNames?: boolean
  className?: string
}

/**
 * AbcGrandStaff - Renders a Grand Staff using abcjs
 * Displays 2 rows of grand staff, each row with 4 measures x 4 beats
 */
export const AbcGrandStaff: React.FC<AbcGrandStaffProps> = ({
  showTwoStaves = true,
  showNoteNames = false,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const recordedNotes = useAudioStore((state) => state.recordedNotes)

  const displayNotes = useMemo(() => {
    // Get last 32 recorded notes for 2 rows x 4 measures x 4 notes = 32 notes max
    const recentNotes = recordedNotes.slice(-32)
    const allNotes = [...recentNotes, ...activeNotes.filter((n: string) => !recentNotes.includes(n))]
    return allNotes.slice(-32)
  }, [activeNotes, recordedNotes])

  const generateAbc = useCallback(() => {
    // Helper to create synchronized grand staff measures
    // Each note position has treble and bass staves aligned
    const createSyncedMeasures = (notes: string[], count: number) => {
      const trebleParts: string[] = []
      const bassParts: string[] = []
      
      for (let i = 0; i < count; i++) {
        const note = notes[i]
        if (note) {
          const match = note.match(/^([A-G])([#b]?)(\d)$/)
          if (match) {
            const octave = parseInt(match[3], 10)
            const abc = noteToAbc(note, showNoteNames)
            if (octave >= 4) {
              trebleParts.push(abc)
              bassParts.push('z') // Rest in bass when treble has note
            } else {
              trebleParts.push('z') // Rest in treble when bass has note
              bassParts.push(abc)
            }
          } else {
            trebleParts.push('z')
            bassParts.push('z')
          }
        } else {
          trebleParts.push('z')
          bassParts.push('z')
        }
        
        // Add bar line after every 4 notes
        if ((i + 1) % 4 === 0 && i < count - 1) {
          trebleParts.push('|')
          bassParts.push('|')
        }
      }
      
      return {
        treble: trebleParts.join(' ') + ' |',
        bass: bassParts.join(' ') + ' |'
      }
    }

    if (displayNotes.length === 0) {
      if (showTwoStaves) {
        // Default display: 2 rows with sample notes
        return `X:1
M:4/4
L:1/4
K:C clef=treble
%%staves {1 2}
V:1 clef=treble
V:2 clef=bass
[V:1] C z E z | G z B z | c z e z | g z b z |
[V:2] z D z F | z A z C | z d z f | z a z c' |
[V:1] C z E z | G z B z | c z e z | g z b z |
[V:2] z D z F | z A z C | z d z f | z a z c' |`
      }
      return `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c | c d e f | g a b c' |
C D E F | G A B c | c d e f | g a b c' |`
    }

    if (showTwoStaves) {
      // Row 1: first 16 notes (4 measures x 4 notes)
      const row1Notes = displayNotes.slice(0, 16)
      const row1 = createSyncedMeasures(row1Notes, 16)
      
      // Row 2: next 16 notes
      const row2Notes = displayNotes.slice(16, 32)
      const row2 = row2Notes.length > 0 
        ? createSyncedMeasures(row2Notes, 16)
        : { treble: 'z z z z | z z z z | z z z z | z z z z |', bass: 'z z z z | z z z z | z z z z | z z z z |' }

      return `X:1
M:4/4
L:1/4
K:C clef=treble
%%staves {1 2}
V:1 clef=treble
V:2 clef=bass
[V:1] ${row1.treble}
[V:2] ${row1.bass}
[V:1] ${row2.treble}
[V:2] ${row2.bass}`
    }

    const abcNotes = displayNotes
      .map((n: string) => noteToAbc(n, showNoteNames))
      .filter((n: string) => n.length > 0)
      .join(' ')

    return `X:1
M:4/4
L:1/4
K:C
${abcNotes} |`
  }, [displayNotes, showTwoStaves, showNoteNames])

  useEffect(() => {
    if (!containerRef.current) return

    const abc = generateAbc()

    try {
      abcjs.renderAbc(containerRef.current, abc, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: 740,
        paddingtop: 5,
        paddingbottom: 5,
        paddingleft: 10,
        paddingright: 10,
        wrap: {
          minSpacing: 1.8,
          maxSpacing: 2.7,
          preferredMeasuresPerLine: 4,
        },
      })
    } catch (error) {
      console.warn('AbcGrandStaff: Render error:', error)
    }
  }, [generateAbc])

  return (
    <div className={`abc-grand-staff ${className}`}>
      <div
        ref={containerRef}
        className="abc-paper bg-slate-800/50 rounded-lg min-h-[280px] overflow-hidden"
      />
      <style>{`
        .abc-grand-staff .abcjs-container svg {
          width: 100%;
          max-width: 100%;
        }
        .abc-grand-staff path.abcjs-notehead,
        .abc-grand-staff path.abcjs-stem,
        .abc-grand-staff path.abcjs-beam {
          fill: #cbd5e1;
          stroke: #cbd5e1;
        }
        .abc-grand-staff path.abcjs-staff,
        .abc-grand-staff path.abcjs-bar {
          stroke: #64748b;
        }
        .abc-grand-staff text {
          fill: #94a3b8;
        }
        .abc-grand-staff text.abcjs-annotation {
          fill: #30e8e8;
          font-size: 10px;
          font-weight: bold;
        }
        .abc-grand-staff .abcjs-note.abcjs-highlight path {
          fill: #30e8e8 !important;
          stroke: #30e8e8 !important;
        }
        /* Hide voice names */
        .abc-grand-staff text.abcjs-voice-name {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default AbcGrandStaff
