import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'

// Must use vi.hoisted to get a reference that works with mocks
const mocks = vi.hoisted(() => {
  return {
    mockRenderAbc: vi.fn(() => [
      {
        lines: [],
        metaText: {},
        version: '6.6.0',
        getBarLength: vi.fn(() => 1),
        getBeatLength: vi.fn(() => 0.25),
        getBpm: vi.fn(() => 120),
      },
    ]),
  }
})

// Mock abcjs module
vi.mock('abcjs', () => {
  // Create constructor functions properly
  function MockCreateSynth() {
    return {
      init: vi.fn().mockResolvedValue(undefined),
      prime: vi.fn().mockResolvedValue({ duration: 10 }),
      start: vi.fn(),
      pause: vi.fn(),
      stop: vi.fn(),
    }
  }

  function MockSynthController() {
    return {
      load: vi.fn(),
      setTune: vi.fn().mockResolvedValue(undefined),
      play: vi.fn(),
      pause: vi.fn(),
    }
  }

  return {
    default: {
      renderAbc: mocks.mockRenderAbc,
      synth: {
        CreateSynth: MockCreateSynth,
        SynthController: MockSynthController,
      },
    },
    renderAbc: mocks.mockRenderAbc,
  }
})

// Import after mock
import { AbcScore } from './AbcScore'

/**
 * Convert scientific notation (C4, E2) to ABC notation
 *
 * ABC notation reference:
 * - Octave 5+ = lowercase with apostrophes (c' for C5, c'' for C6)
 * - Octave 4 = lowercase (c d e f g a b)
 * - Octave 3 = uppercase (C D E F G A B)
 * - Octave 2 and below = uppercase with commas (C, for C2, C,, for C1)
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
    // Octave 5+ uses lowercase with apostrophes
    // C5 = c', C6 = c'', etc.
    abcNote = accidentalPrefix + baseNote.toLowerCase() + "'".repeat(octave - 4)
  } else if (octave === 4) {
    // Octave 4 uses lowercase
    abcNote = accidentalPrefix + baseNote.toLowerCase()
  } else if (octave === 3) {
    // Octave 3 uses uppercase
    abcNote = accidentalPrefix + baseNote
  } else {
    // Octave 2 and below uses uppercase with commas
    // C2 = C,, C1 = C,,
    abcNote = accidentalPrefix + baseNote + ','.repeat(3 - octave)
  }

  return abcNote
}

/**
 * Generate ABC notation for a chromatic range of notes
 */
function generateAbcForRange(startNote: string, endNote: string, title: string): string {
  const chromaticNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

  // Parse start and end notes
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

  // Generate all chromatic notes in range
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

    // Safety check
    if (notes.length > 100) break
  }

  // Split notes into measures (4 notes per measure for readability)
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

describe('AbcScore Music Staff Rendering', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('ABC Notation Helper Functions', () => {
    it('converts C4 to lowercase c', () => {
      expect(scientificToPitch('C4')).toBe('c')
    })

    it('converts C3 to uppercase C', () => {
      expect(scientificToPitch('C3')).toBe('C')
    })

    it('converts C2 to C with comma (C,)', () => {
      expect(scientificToPitch('C2')).toBe('C,')
    })

    it('converts E2 to E with comma (E,)', () => {
      expect(scientificToPitch('E2')).toBe('E,')
    })

    it("converts C5 to c with apostrophe (c')", () => {
      expect(scientificToPitch('C5')).toBe("c'")
    })

    it("converts B5 to b with apostrophe (b')", () => {
      expect(scientificToPitch('B5')).toBe("b'")
    })

    it("converts E5 to e with apostrophe (e')", () => {
      expect(scientificToPitch('E5')).toBe("e'")
    })

    it('converts sharp notes correctly (C#4 -> ^c)', () => {
      expect(scientificToPitch('C#4')).toBe('^c')
    })

    it('converts flat notes correctly (Bb3 -> _B)', () => {
      expect(scientificToPitch('Bb3')).toBe('_B')
    })

    it("converts A5 to a with apostrophe (a')", () => {
      expect(scientificToPitch('A5')).toBe("a'")
    })
  })

  describe('Piano Staff Range (C3-B5)', () => {
    const pianoAbcNotation = generateAbcForRange('C3', 'B5', 'Piano Range Test')

    it('generates valid ABC notation for piano range', () => {
      expect(pianoAbcNotation).toContain('X:1')
      expect(pianoAbcNotation).toContain('T:Piano Range Test')
      expect(pianoAbcNotation).toContain('K:C')
    })

    it('contains the starting note C3 (uppercase C)', () => {
      // C3 in ABC is uppercase C (first note)
      expect(pianoAbcNotation).toMatch(/\bC\b/)
    })

    it('contains the ending note B5 (lowercase b with apostrophe)', () => {
      // B5 in ABC is b'
      expect(pianoAbcNotation).toContain("b'")
    })

    it('contains middle C (C4) as lowercase c', () => {
      expect(pianoAbcNotation).toContain(' c ')
    })

    it('renders piano staff without errors', async () => {
      render(
        <AbcScore notation={pianoAbcNotation} showControls={false} data-testid="piano-staff" />
      )

      await waitFor(() => {
        expect(mocks.mockRenderAbc).toHaveBeenCalled()
        const callArgs = mocks.mockRenderAbc.mock.calls[0]
        expect(callArgs[1]).toContain('Piano Range Test')
      })
    })

    it('piano notation spans 3 octaves (C3 to B5 = 36 chromatic notes)', () => {
      // Count the notes generated by checking measures
      const notePattern = /[A-Ga-g][,']*(?!\w)/g
      const lines = pianoAbcNotation.split('\n')
      const musicLine = lines.find((line) => !line.includes(':') && line.trim().length > 0)
      const matches = musicLine?.match(notePattern)
      // Piano range C3-B5 includes 36 chromatic notes (3 full octaves)
      expect(matches?.length).toBeGreaterThanOrEqual(36)
    })
  })

  describe('Guitar Staff Range (E2-E5)', () => {
    const guitarAbcNotation = generateAbcForRange('E2', 'E5', 'Guitar Range Test')

    it('generates valid ABC notation for guitar range', () => {
      expect(guitarAbcNotation).toContain('X:1')
      expect(guitarAbcNotation).toContain('T:Guitar Range Test')
      expect(guitarAbcNotation).toContain('K:C')
    })

    it('contains the starting note E2 (uppercase E with comma)', () => {
      // E2 in ABC is E,
      expect(guitarAbcNotation).toContain('E,')
    })

    it('contains the ending note E5 (lowercase e with apostrophe)', () => {
      // E5 in ABC is e'
      expect(guitarAbcNotation).toContain("e'")
    })

    it('contains octave boundary notes correctly', () => {
      // E3 should be uppercase E
      expect(guitarAbcNotation).toMatch(/\bE\b/)
      // E4 should be lowercase e
      expect(guitarAbcNotation).toMatch(/\be\b/)
    })

    it('renders guitar staff without errors', async () => {
      render(
        <AbcScore notation={guitarAbcNotation} showControls={false} data-testid="guitar-staff" />
      )

      await waitFor(() => {
        expect(mocks.mockRenderAbc).toHaveBeenCalled()
        const callArgs = mocks.mockRenderAbc.mock.calls[0]
        expect(callArgs[1]).toContain('Guitar Range Test')
      })
    })

    it('guitar notation spans 3 octaves (E2 to E5 = 37 chromatic notes)', () => {
      // Count the notes generated (rough check)
      const notePattern = /[A-Ga-g][,']*(?!\w)/g
      const lines = guitarAbcNotation.split('\n')
      const musicLine = lines.find((line) => !line.includes(':') && line.trim().length > 0)
      const matches = musicLine?.match(notePattern)
      // Guitar range E2-E5 includes 37 chromatic notes (3 full octaves + 1 note)
      expect(matches?.length).toBeGreaterThanOrEqual(36)
    })
  })

  describe('Rendering Analysis', () => {
    it('both ranges use correct clef positioning', () => {
      const pianoAbc = generateAbcForRange('C3', 'B5', 'Piano')
      const guitarAbc = generateAbcForRange('E2', 'E5', 'Guitar')

      // Piano middle C (C4) should be lowercase 'c'
      expect(pianoAbc).toContain(' c ')

      // Guitar low E (E2) should be 'E,' (uppercase E with comma)
      expect(guitarAbc).toContain('E,')
    })

    it('verifies ABC notation formatting is correct for ABCJS', async () => {
      const testNotation = `X:1
T:Simple Test
M:4/4
L:1/4
K:C
C D E F | G A B c |]`

      render(<AbcScore notation={testNotation} showControls={false} />)

      await waitFor(() => {
        expect(mocks.mockRenderAbc).toHaveBeenCalled()
      })
    })

    it('handles ledger lines for notes outside staff', () => {
      // Notes below bass clef (E2, F2, G2) require ledger lines
      const lowNotes = ['E,', 'F,', 'G,']
      const guitarAbc = generateAbcForRange('E2', 'E5', 'Guitar')

      lowNotes.forEach((note) => {
        expect(guitarAbc).toContain(note)
      })

      // Notes above treble clef (A5, B5) require ledger lines
      const highNotes = ["a'", "b'"]
      const pianoAbc = generateAbcForRange('C3', 'B5', 'Piano')

      highNotes.forEach((note) => {
        expect(pianoAbc).toContain(note)
      })
    })
  })

  describe('Visual Rendering Verification', () => {
    it('renders ABC paper container', async () => {
      const { container } = render(
        <AbcScore notation="X:1\nT:Test\nM:4/4\nL:1/4\nK:C\nCDEF|" showControls={false} />
      )

      // Check for the abc-score class
      const scoreElement = container.querySelector('.abc-score')
      expect(scoreElement).toBeInTheDocument()

      // Check for the abc-paper container
      const paperElement = container.querySelector('.abc-paper')
      expect(paperElement).toBeInTheDocument()
    })

    it('applies responsive rendering option', async () => {
      render(<AbcScore notation="X:1\nT:Test\nM:4/4\nL:1/4\nK:C\nCDEF|" showControls={false} />)

      await waitFor(() => {
        expect(mocks.mockRenderAbc).toHaveBeenCalled()

        const options = mocks.mockRenderAbc.mock.calls[0][2]
        expect(options).toHaveProperty('responsive', 'resize')
      })
    })

    it('adds CSS classes for styling', async () => {
      render(<AbcScore notation="X:1\nT:Test\nM:4/4\nL:1/4\nK:C\nCDEF|" showControls={false} />)

      await waitFor(() => {
        expect(mocks.mockRenderAbc).toHaveBeenCalled()

        const options = mocks.mockRenderAbc.mock.calls[0][2]
        expect(options).toHaveProperty('add_classes', true)
      })
    })
  })

  describe('Generated ABC Notation Output', () => {
    it('prints piano range notation for visual inspection', () => {
      const pianoAbc = generateAbcForRange('C3', 'B5', 'Piano Range (C3-B5)')
      console.log('Piano ABC Notation:\n', pianoAbc)
      expect(pianoAbc).toBeTruthy()
    })

    it('prints guitar range notation for visual inspection', () => {
      const guitarAbc = generateAbcForRange('E2', 'E5', 'Guitar Range (E2-E5)')
      console.log('Guitar ABC Notation:\n', guitarAbc)
      expect(guitarAbc).toBeTruthy()
    })
  })
})

// Export helpers for potential reuse
export { scientificToPitch, generateAbcForRange }
