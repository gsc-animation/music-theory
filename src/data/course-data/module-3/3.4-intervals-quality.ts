/**
 * Module 3, Submodule 3.4: Intervals (Quality)
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_4: Submodule = {
  id: '3.4',
  title: 'Intervals (Quality)',
  description: 'Major, Minor, Perfect, Augmented, and Diminished',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Interval Quality

The **quality** describes the exact size of an interval in half steps.

### Perfect Intervals
Unison, 4th, 5th, and Octave can be **Perfect**.

### Major/Minor Intervals
2nd, 3rd, 6th, and 7th can be **Major** or **Minor**.

| Interval | Minor | Major |
|----------|-------|-------|
| 2nd | 1 half step | 2 half steps |
| 3rd | 3 half steps | 4 half steps |
| 6th | 8 half steps | 9 half steps |
| 7th | 10 half steps | 11 half steps |

### Augmented & Diminished
- **Augmented**: One half step larger than perfect/major
- **Diminished**: One half step smaller than perfect/minor
  `
}
