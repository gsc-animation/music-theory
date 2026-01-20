import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import abcjs from 'abcjs'
import { useAudioStore } from '../../stores/useAudioStore'

/**
 * Convert note format (e.g., "C4", "F#5") to ABC notation
 */
const noteToAbc = (note: string): string => {
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

  return abcAccidental + abcNote
}

interface AbcGrandStaffProps {
  showTwoStaves?: boolean
  className?: string
}

/**
 * AbcGrandStaff - Renders a Grand Staff using abcjs
 */
export const AbcGrandStaff: React.FC<AbcGrandStaffProps> = ({
  showTwoStaves = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const recordedNotes = useAudioStore((state) => state.recordedNotes)

  const displayNotes = useMemo(() => {
    const allNotes = new Set<string>()
    activeNotes.forEach((n: string) => allNotes.add(n))
    recordedNotes.slice(-12).forEach((n: string) => allNotes.add(n))
    return Array.from(allNotes)
  }, [activeNotes, recordedNotes])

  const generateAbc = useCallback(() => {
    if (displayNotes.length === 0) {
      if (showTwoStaves) {
        return `X:1
M:4/4
L:1/4
K:C clef=treble
%%staves {1 2}
V:1 clef=treble
V:2 clef=bass
[V:1] C D E F | G A B c |
[V:2] C, D, E, F, | G, A, B, C |`
      }
      return `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c |`
    }

    if (showTwoStaves) {
      const trebleNotes: string[] = []
      const bassNotes: string[] = []

      displayNotes.forEach((note: string) => {
        const match = note.match(/^([A-G])([#b]?)(\d)$/)
        if (!match) return
        const octave = parseInt(match[3], 10)
        const abc = noteToAbc(note)
        if (octave >= 4) {
          trebleNotes.push(abc)
        } else {
          bassNotes.push(abc)
        }
      })

      const trebleLine = trebleNotes.length > 0 ? trebleNotes.join(' ') : 'z4'
      const bassLine = bassNotes.length > 0 ? bassNotes.join(' ') : 'z4'

      return `X:1
M:4/4
L:1/4
K:C clef=treble
%%staves {1 2}
V:1 clef=treble
V:2 clef=bass
[V:1] ${trebleLine} |
[V:2] ${bassLine} |`
    }

    const abcNotes = displayNotes
      .map((n: string) => noteToAbc(n))
      .filter((n: string) => n.length > 0)
      .join(' ')

    return `X:1
M:4/4
L:1/4
K:C
${abcNotes} |`
  }, [displayNotes, showTwoStaves])

  useEffect(() => {
    if (!containerRef.current) return

    const abc = generateAbc()

    try {
      abcjs.renderAbc(containerRef.current, abc, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: 600,
        paddingtop: 10,
        paddingbottom: 10,
        paddingleft: 10,
        paddingright: 10,
      })
    } catch (error) {
      console.warn('AbcGrandStaff: Render error:', error)
    }
  }, [generateAbc])

  return (
    <div className={`abc-grand-staff ${className}`}>
      <div
        ref={containerRef}
        className="abc-paper bg-slate-800/50 rounded-lg min-h-[120px] overflow-hidden"
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
        .abc-grand-staff .abcjs-note.abcjs-highlight path {
          fill: #30e8e8 !important;
          stroke: #30e8e8 !important;
        }
      `}</style>
    </div>
  )
}

export default AbcGrandStaff
