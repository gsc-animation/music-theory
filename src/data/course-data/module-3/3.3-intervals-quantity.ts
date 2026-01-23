/**
 * Module 3, Submodule 3.3: Intervals (Quantity)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_3: Submodule = {
  id: '3.3',
  title: 'Intervals (Quantity)',
  description: 'Distance between notes (2nd, 3rd, 4th, 5th...)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Intervals: Distance Between Notes

An **interval** is the distance between two notes, counted by the number of letter names.

### Counting Intervals
Count both the starting and ending notes:
- C to D = 2nd (C, D)
- C to E = 3rd (C, D, E)
- C to G = 5th (C, D, E, F, G)

### Interval Names
| Interval | Notes Apart |
|----------|-------------|
| Unison | 0 |
| 2nd | 1 |
| 3rd | 2 |
| 4th | 3 |
| 5th | 4 |
| 6th | 5 |
| 7th | 6 |
| Octave | 7 |
  `
}
