/**
 * Module 3, Submodule 3.5: The Minor Scales
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_5: Submodule = {
  id: '3.5',
  title: 'The Minor Scales',
  description: 'Natural Minor, Harmonic Minor, and Melodic Minor',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Minor Scales

Minor scales have a darker, sadder sound than major scales.

### Natural Minor
Formula: **W - H - W - W - H - W - W**

A Natural Minor: A - B - C - D - E - F - G - A

### Harmonic Minor
Raise the 7th note of natural minor by a half step.
A Harmonic Minor: A - B - C - D - E - F - **G#** - A

### Melodic Minor
- **Ascending**: Raise 6th and 7th
- **Descending**: Natural minor

### Relative Major/Minor
Every major key has a **relative minor** starting 3 half steps lower:
- C major → A minor
- G major → E minor
  `,
}
