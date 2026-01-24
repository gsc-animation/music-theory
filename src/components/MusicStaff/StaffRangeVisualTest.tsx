import React from 'react'
import { AbcScore } from './AbcScore'

/**
 * Convert scientific notation (C4, E2) to ABC notation
 */
function scientificToPitch(note: string): string {
  const match = note.match(/^([A-Ga-g])([#b]?)(\d)$/)
  if (!match) return note

  const [, letter, accidental, octaveStr] = match
  const octave = parseInt(octaveStr, 10)
  const baseNote = letter.toUpperCase()

  let abcNote = ''
  let accidentalPrefix = ''

  if (accidental === '#') accidentalPrefix = '^'
  else if (accidental === 'b') accidentalPrefix = '_'

  if (octave >= 5) {
    abcNote = accidentalPrefix + baseNote.toLowerCase() + "'".repeat(octave - 4)
  } else if (octave === 4) {
    abcNote = accidentalPrefix + baseNote.toLowerCase()
  } else if (octave === 3) {
    abcNote = accidentalPrefix + baseNote
  } else {
    abcNote = accidentalPrefix + baseNote + ','.repeat(3 - octave)
  }

  return abcNote
}

/**
 * Generate ABC notation for a chromatic range of notes
 */
function generateAbcForRange(startNote: string, endNote: string, title: string): string {
  const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  const startMatch = startNote.match(/^([A-G])([#b]?)(\d)$/)
  const endMatch = endNote.match(/^([A-G])([#b]?)(\d)$/)

  if (!startMatch || !endMatch) {
    throw new Error('Invalid note format')
  }

  const getNoteIndex = (letter: string, accidental: string): number => {
    const baseIdx = chromaticNotes.indexOf(letter)
    if (accidental === '#') return (baseIdx + 1) % 12
    if (accidental === 'b') return (baseIdx + 11) % 12
    return baseIdx
  }

  const startIdx = getNoteIndex(startMatch[1], startMatch[2])
  const startOctave = parseInt(startMatch[3], 10)
  const endIdx = getNoteIndex(endMatch[1], endMatch[2])
  const endOctave = parseInt(endMatch[3], 10)

  const notes: string[] = []
  let currentOctave = startOctave
  let currentIdx = startIdx

  while (currentOctave < endOctave || (currentOctave === endOctave && currentIdx <= endIdx)) {
    const chromaticNote = chromaticNotes[currentIdx]
    const hasSharp = chromaticNote.includes('#')
    const baseLetter = chromaticNote.replace('#', '')
    const scientificNote = `${baseLetter}${hasSharp ? '#' : ''}${currentOctave}`
    notes.push(scientificToPitch(scientificNote))

    currentIdx++
    if (currentIdx >= 12) {
      currentIdx = 0
      currentOctave++
    }

    if (notes.length > 100) break
  }

  const measures: string[] = []
  for (let i = 0; i < notes.length; i += 4) {
    measures.push(notes.slice(i, i + 4).join(' '))
  }

  return `X:1
T:${title}
M:4/4
L:1/4
K:C
${measures.join(' | ')} |]`
}

/**
 * Visual test page for Music Staff rendering with ABCJS
 *
 * This component renders both piano and guitar ranges
 * for visual verification of correct staff display.
 */
export const StaffRangeVisualTest: React.FC = () => {
  const pianoNotation = generateAbcForRange('C3', 'B5', 'Piano Staff Range (C3-B5)')
  const guitarNotation = generateAbcForRange('E2', 'E5', 'Guitar Staff Range (E2-E5)')

  // Diatonic (white keys only) versions for cleaner visualization
  const pianoDiatonicNotation = `X:1
T:Piano Diatonic Range (C3-B5)
M:4/4
L:1/4
K:C
C D E F | G A B c | d e f g | a b c' d' | e' f' g' a' | b' |]`

  const guitarDiatonicNotation = `X:1
T:Guitar Diatonic Range (E2-E5)
M:4/4
L:1/4
K:C
E, F, G, A, | B, C D E | F G A B | c d e f | g a b c' | d' e' |]`

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold mb-6">Music Staff Rendering Test</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-blue-600">1. Piano Staff Range</h2>
        <p className="text-gray-600 text-sm">
          Range: C3 to B5 (3 octaves) - Includes all chromatic notes
        </p>
        <div className="border rounded-lg p-4 bg-white">
          <AbcScore notation={pianoNotation} showControls={true} />
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-gray-500">View ABC Notation</summary>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
            {pianoNotation}
          </pre>
        </details>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-blue-600">2. Piano Diatonic (White Keys)</h2>
        <p className="text-gray-600 text-sm">
          Range: C3 to B5 - Natural notes only for cleaner visualization
        </p>
        <div className="border rounded-lg p-4 bg-white">
          <AbcScore notation={pianoDiatonicNotation} showControls={true} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-green-600">3. Guitar Staff Range</h2>
        <p className="text-gray-600 text-sm">
          Range: E2 to E5 (3 octaves) - Standard guitar range, includes all chromatic notes
        </p>
        <div className="border rounded-lg p-4 bg-white">
          <AbcScore notation={guitarNotation} showControls={true} />
        </div>
        <details className="text-sm">
          <summary className="cursor-pointer text-gray-500">View ABC Notation</summary>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-xs overflow-x-auto">
            {guitarNotation}
          </pre>
        </details>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-green-600">4. Guitar Diatonic (Natural Notes)</h2>
        <p className="text-gray-600 text-sm">
          Range: E2 to E5 - Natural notes only for cleaner visualization
        </p>
        <div className="border rounded-lg p-4 bg-white">
          <AbcScore notation={guitarDiatonicNotation} showControls={true} />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Visual Verification Checklist:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>
            <strong>Piano Range:</strong> Should display C3 (first ledger line below treble) through
            B5 (above staff)
          </li>
          <li>
            <strong>Guitar Range:</strong> Should display E2 (well below bass clef) through E5
            (above treble staff)
          </li>
          <li>
            <strong>Ledger Lines:</strong> Notes outside the staff should have proper ledger lines
          </li>
          <li>
            <strong>Accidentals:</strong> Sharps (^) should appear before notes in chromatic
            versions
          </li>
          <li>
            <strong>Bar Lines:</strong> Notes should be grouped into measures of 4
          </li>
          <li>
            <strong>Playback:</strong> Audio controls should work and play the notes in sequence
          </li>
        </ul>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">ABC Notation Reference:</h3>
        <table className="text-sm text-gray-700 w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-1">Octave</th>
              <th className="text-left p-1">ABC Format</th>
              <th className="text-left p-1">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-1">2 and below</td>
              <td className="p-1">Uppercase + commas</td>
              <td className="p-1 font-mono">C, D, E,</td>
            </tr>
            <tr className="border-b">
              <td className="p-1">3</td>
              <td className="p-1">Uppercase</td>
              <td className="p-1 font-mono">C D E</td>
            </tr>
            <tr className="border-b">
              <td className="p-1">4</td>
              <td className="p-1">Lowercase</td>
              <td className="p-1 font-mono">c d e</td>
            </tr>
            <tr>
              <td className="p-1">5 and above</td>
              <td className="p-1">Lowercase + apostrophes</td>
              <td className="p-1 font-mono">c' d' e'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StaffRangeVisualTest
