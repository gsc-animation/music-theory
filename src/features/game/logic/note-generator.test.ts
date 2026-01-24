import { describe, it, expect } from 'vitest'
import { generateRandomNote } from './note-generator'

describe('generateRandomNote', () => {
  it('returns a valid note string format', () => {
    const note = generateRandomNote()
    // Matches A-G, optional sharp/flat, followed by number
    expect(note).toMatch(/^[A-G][#b]?[0-9]$/)
  })

  it('returns a note within default range (C3-B5)', () => {
    const note = generateRandomNote()
    const octave = parseInt(note.slice(-1))
    expect(octave).toBeGreaterThanOrEqual(3)
    expect(octave).toBeLessThanOrEqual(5)
  })

  it('does not return the same note twice in a row if prevNote provided', () => {
    // Run multiple times to reduce chance of false positive
    for (let i = 0; i < 10; i++) {
      const prev = 'C4'
      const next = generateRandomNote(prev)
      expect(next).not.toBe(prev)
    }
  })
})
