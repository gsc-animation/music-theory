/**
 * Chord Detection Utility
 *
 * Detects chord names from an array of notes.
 * Uses interval analysis to identify chord quality.
 */

import { CHORD_VOICINGS, type ChordVoicing } from '../data/chord-voicings'

// Chromatic scale for interval calculation
const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

// Enharmonic equivalents
const ENHARMONIC: Record<string, string> = {
  Db: 'C#',
  Eb: 'D#',
  Fb: 'E',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
  Cb: 'B',
  'E#': 'F',
  'B#': 'C',
}

/**
 * Normalize note name to sharp representation
 */
function normalizeNote(note: string): string {
  // Remove octave number
  const noteName = note.replace(/[0-9]/g, '')
  return ENHARMONIC[noteName] || noteName
}

/**
 * Get semitone value of a note (C = 0)
 */
function getSemitone(note: string): number {
  const normalized = normalizeNote(note)
  return CHROMATIC.indexOf(normalized)
}

/**
 * Get interval set from notes (relative to root)
 */
function getIntervalSet(notes: string[]): Set<number> {
  if (notes.length === 0) return new Set()

  const normalizedNotes = notes.map(normalizeNote)
  const uniqueNotes = [...new Set(normalizedNotes)]

  if (uniqueNotes.length === 0) return new Set()

  const rootSemitone = getSemitone(uniqueNotes[0])
  const intervals = new Set<number>()

  uniqueNotes.forEach((note) => {
    const semitone = getSemitone(note)
    const interval = (semitone - rootSemitone + 12) % 12
    intervals.add(interval)
  })

  return intervals
}

/**
 * Check if two sets of intervals match
 */
function intervalsMatch(set1: Set<number>, set2: Set<number>): boolean {
  if (set1.size !== set2.size) return false
  for (const val of set1) {
    if (!set2.has(val)) return false
  }
  return true
}

/**
 * Chord interval patterns
 */
const CHORD_PATTERNS: Record<string, Set<number>> = {
  // Triads
  major: new Set([0, 4, 7]), // Major: 1 3 5
  minor: new Set([0, 3, 7]), // Minor: 1 b3 5
  dim: new Set([0, 3, 6]), // Diminished: 1 b3 b5
  aug: new Set([0, 4, 8]), // Augmented: 1 3 #5

  // 7th chords
  '7': new Set([0, 4, 7, 10]), // Dominant 7: 1 3 5 b7
  maj7: new Set([0, 4, 7, 11]), // Major 7: 1 3 5 7
  m7: new Set([0, 3, 7, 10]), // Minor 7: 1 b3 5 b7
  m7b5: new Set([0, 3, 6, 10]), // Half-dim: 1 b3 b5 b7
  dim7: new Set([0, 3, 6, 9]), // Diminished 7: 1 b3 b5 bb7
}

/**
 * Detect chord quality from interval set
 */
function detectQuality(intervals: Set<number>): string {
  for (const [quality, pattern] of Object.entries(CHORD_PATTERNS)) {
    if (intervalsMatch(intervals, pattern)) {
      return quality
    }
  }
  return ''
}

/**
 * Detect chord name from array of notes
 *
 * @param notes Array of notes with octaves (e.g., ['C4', 'E4', 'G4'])
 * @returns Chord name (e.g., 'C') or null if not recognized
 */
export function detectChordFromNotes(notes: string[]): string | null {
  if (notes.length < 3) return null

  const normalizedNotes = notes.map(normalizeNote)
  const uniqueNotes = [...new Set(normalizedNotes)]

  if (uniqueNotes.length < 3) return null

  // Try each note as potential root
  for (const potentialRoot of uniqueNotes) {
    const rootSemitone = getSemitone(potentialRoot)
    const intervals = new Set<number>()

    uniqueNotes.forEach((note) => {
      const semitone = getSemitone(note)
      const interval = (semitone - rootSemitone + 12) % 12
      intervals.add(interval)
    })

    const quality = detectQuality(intervals)

    if (quality) {
      // Build chord name
      let chordName = potentialRoot

      if (quality === 'minor') {
        chordName += 'm'
      } else if (quality === 'dim') {
        chordName += 'dim'
      } else if (quality === 'aug') {
        chordName += 'aug'
      } else if (quality === '7') {
        chordName += '7'
      } else if (quality === 'maj7') {
        chordName += 'maj7'
      } else if (quality === 'm7') {
        chordName += 'm7'
      } else if (quality === 'm7b5') {
        chordName += 'm7b5'
      } else if (quality === 'dim7') {
        chordName += 'dim7'
      }
      // 'major' quality doesn't add suffix

      return chordName
    }
  }

  return null
}

/**
 * Get chord voicing if detected chord exists in database
 */
export function getVoicingForNotes(notes: string[]): ChordVoicing | null {
  const chordName = detectChordFromNotes(notes)
  if (!chordName) return null

  return CHORD_VOICINGS[chordName] || null
}

/**
 * Check if notes form a known chord
 */
export function isKnownChord(notes: string[]): boolean {
  return detectChordFromNotes(notes) !== null
}
