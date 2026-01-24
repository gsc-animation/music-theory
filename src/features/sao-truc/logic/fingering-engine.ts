import type { FluteType, Fingering, FingeringDataset } from '../types'
import rawData from './fingerings.json'

// Cast the raw JSON to our strict type
const fingeringData = rawData as unknown as FingeringDataset

const normalizeNote = (note: string): string => {
  if (!note) return ''

  // 1. Force first char upper, rest lower (basic clean up first)
  // Actually we want to preserve '4' etc.
  // So just capitalize the first letter.
  const normalized = note.charAt(0).toUpperCase() + note.slice(1)

  // 2. Map flats to sharps
  const flatsMap: Record<string, string> = {
    Db: 'C#',
    Eb: 'D#',
    Gb: 'F#',
    Ab: 'G#',
    Bb: 'A#',
  }

  // Check for flat symbol 'b'
  if (normalized.includes('b')) {
    // Attempt to match Note+Accidental part
    // e.g. "Bb4" -> "Bb", "4"
    const match = normalized.match(/^([A-G]b)(\d*)$/)
    if (match) {
      const notePart = match[1]
      const octavePart = match[2]
      if (flatsMap[notePart]) {
        return flatsMap[notePart] + octavePart
      }
    }
  }

  return normalized
}

export const getFingering = (note: string, type: FluteType): Fingering | null => {
  const fluteData = fingeringData[type]
  if (!fluteData) return null

  const targetNote = normalizeNote(note)

  // Try normalized match
  let fingering = fluteData[targetNote]

  // Fallbacks
  if (!fingering) {
    // Try raw
    fingering = fluteData[note]
  }

  // Try Upper Case (e.g. if input is "c4")
  if (!fingering) {
    fingering = fluteData[note.toUpperCase()]
  }

  return fingering || null
}
