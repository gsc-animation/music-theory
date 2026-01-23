/**
 * Module 4, Submodule 4.6: Chord Inversions
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_6: Submodule = {
  id: '4.6',
  title: 'Chord Inversions',
  description: 'Slash chords (e.g., C/E, G/B) and voice leading basics',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Chord Inversions

An **inversion** puts a note other than the root in the bass.

### Three Positions

| Position | Bass Note | Symbol |
|----------|-----------|--------|
| Root position | Root | C |
| 1st inversion | 3rd | C/E |
| 2nd inversion | 5th | C/G |

### Voice Leading
Inversions create smoother bass lines:
- C → G/B → Am (bass: C → B → A)
- Instead of C → G → Am (bass: C → G → A)

### Slash Chord Notation
C/E means "C chord with E in the bass"
  `
}
