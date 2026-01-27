import React from 'react'
import PianoKey from './PianoKey'

interface VirtualPianoProps {
  startOctave?: number
  octaves?: number
  activeNotes?: string[]
  onStartNote: (note: string) => void
  onStopNote: (note: string) => void
  /** Optional: Show hint dots on these note letters (for progressive difficulty) */
  allowedNotes?: string[]
  /** Optional: Notes to highlight as success (green) */
  successNotes?: string[]
  /** Optional: Notes to highlight as error (red) */
  errorNotes?: string[]
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

export const VirtualPiano: React.FC<VirtualPianoProps> = ({
  startOctave = 4,
  octaves = 1,
  activeNotes = [],
  onStartNote,
  onStopNote,
  allowedNotes,
  successNotes = [],
  errorNotes = [],
}) => {
  const renderOctave = (octaveIndex: number) => {
    const currentOctave = startOctave + octaveIndex

    const whiteKeys = NOTES.filter((n) => n.type === 'white').map(
      (n) => `${n.note}${currentOctave}`
    )
    const blackKeys = NOTES.filter((n) => n.type === 'black').map(
      (n) => `${n.note}${currentOctave}`
    )

    return (
      <div
        key={octaveIndex}
        className="relative flex h-48 w-full max-w-md select-none touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* White Keys Layer */}
        {whiteKeys.map((note, index) => {
          const noteLetter = note.replace(/[0-9]/g, '')
          const isHinted = allowedNotes && allowedNotes.includes(noteLetter)
          const leftPosition = index * 14.2857 // 100% / 7 keys
          return (
            <div
              key={note}
              className="absolute h-full"
              style={{ left: `${leftPosition}%`, width: '14.2857%' }}
            >
              <PianoKey
                note={note}
                type="white"
                onStartNote={onStartNote}
                onStopNote={onStopNote}
                label={noteLetter}
                isHighlighted={activeNotes.includes(note)}
                isSuccess={successNotes.includes(note)}
                isError={errorNotes.includes(note)}
              />
              {/* Hint dot for allowed notes */}
              {isHinted && !activeNotes.includes(note) && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#30e8e8] animate-pulse shadow-lg shadow-[#30e8e8]/50 pointer-events-none" />
              )}
            </div>
          )
        })}

        {/* Black Keys Layer */}
        {blackKeys.map((note) => {
          const noteName = note.replace(/[0-9]/g, '')

          let left = 0
          if (noteName === 'C#') left = 9.2857
          if (noteName === 'D#') left = 23.5714
          if (noteName === 'F#') left = 52.1429
          if (noteName === 'G#') left = 66.4286
          if (noteName === 'A#') left = 80.7143

          return (
            <div
              key={note}
              className="absolute top-0 w-[10%] h-20 pointer-events-auto z-10"
              style={{ left: `${left}%` }}
            >
              <PianoKey
                note={note}
                type="black"
                onStartNote={onStartNote}
                onStopNote={onStopNote}
                isHighlighted={activeNotes.includes(note)}
                isSuccess={successNotes.includes(note)}
                isError={errorNotes.includes(note)}
              />
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      data-testid="virtual-piano"
      className="flex justify-center w-full px-4"
      style={{ touchAction: 'none' }}
    >
      {Array.from({ length: octaves }).map((_, i) => renderOctave(i))}
    </div>
  )
}

export default VirtualPiano
