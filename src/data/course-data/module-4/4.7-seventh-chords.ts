/**
 * Module 4, Submodule 4.7: Seventh Chords
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_7: Submodule = {
  id: '4.7',
  title: 'Seventh Chords',
  description: 'Major 7 (Maj7), Minor 7 (min7), Dominant 7 (dom7)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Seventh Chords

Add a 7th above the root for richer harmony.

### Common Seventh Chords

| Type | Symbol | Formula | Sound |
|------|--------|---------|-------|
| Major 7 | Cmaj7 | 1-3-5-7 | Dreamy, jazz |
| Minor 7 | Cm7 | 1-♭3-5-♭7 | Smooth, mellow |
| Dominant 7 | C7 | 1-3-5-♭7 | Bluesy, wants resolution |
| Minor 7♭5 | Cm7♭5 | 1-♭3-♭5-♭7 | Dark, unstable |
| Diminished 7 | Cdim7 | 1-♭3-♭5-𝄫7 | Very tense |

### The Dominant 7
The V7 chord strongly wants to resolve to I - this is the most important progression in tonal music.
  `,
}
