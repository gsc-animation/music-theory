/**
 * Module 2, Submodule 2.4: Time Signatures (Simple)
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_4: Submodule = {
  id: '2.4',
  title: 'Time Signatures (Simple)',
  description: 'Understanding top/bottom numbers (4/4, 3/4, 2/4)',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Time Signatures

The **time signature** appears at the beginning of a piece and tells us:
- **Top number**: How many beats per measure
- **Bottom number**: Which note value gets one beat

### Common Time Signatures

| Signature | Beats | Beat Unit | Feel |
|-----------|-------|-----------|------|
| 4/4 | 4 | Quarter | March, Rock |
| 3/4 | 3 | Quarter | Waltz |
| 2/4 | 2 | Quarter | Polka, March |
| 2/2 | 2 | Half | Cut time |

### 4/4 = Common Time
4/4 is so common it's sometimes written as **C** (common time).
  `,
}
