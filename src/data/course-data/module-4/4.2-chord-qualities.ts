/**
 * Module 4, Submodule 4.2: Chord Qualities
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_2: Submodule = {
  id: '4.2',
  title: 'Chord Qualities',
  description: 'Major, Minor, Diminished, and Augmented triads',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Chord Qualities

The **quality** of a triad depends on the intervals between notes.

### Four Triad Types

| Quality | Formula | Sound |
|---------|---------|-------|
| Major | M3 + m3 | Happy, bright |
| Minor | m3 + M3 | Sad, dark |
| Diminished | m3 + m3 | Tense, unstable |
| Augmented | M3 + M3 | Mysterious, unresolved |

### In Half Steps
- Major: 4 + 3 = 7 half steps (C-E-G)
- Minor: 3 + 4 = 7 half steps (C-Eb-G)
- Diminished: 3 + 3 = 6 half steps (C-Eb-Gb)
- Augmented: 4 + 4 = 8 half steps (C-E-G#)
  `
}
