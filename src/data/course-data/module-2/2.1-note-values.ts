/**
 * Module 2, Submodule 2.1: Note Values
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_1: Submodule = {
  id: '2.1',
  title: 'Note Values',
  description: 'Whole, Half, Quarter, Eighth, and Sixteenth notes',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Note Values (Duration)

Note values tell us **how long** to hold a note. Each value is half the duration of the previous.

| Note | Beats (in 4/4) | Symbol |
|------|----------------|--------|
| Whole | 4 beats | ○ |
| Half | 2 beats | 𝅗𝅥 |
| Quarter | 1 beat | ♩ |
| Eighth | ½ beat | ♪ |
| Sixteenth | ¼ beat | 𝅘𝅥𝅯 |

### Counting
- Quarter notes: 1, 2, 3, 4
- Eighth notes: 1 & 2 & 3 & 4 &
- Sixteenth notes: 1 e & a 2 e & a 3 e & a 4 e & a
  `,
}
