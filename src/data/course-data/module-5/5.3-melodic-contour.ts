/**
 * Module 5, Submodule 5.3: Melodic Contour
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_3: Submodule = {
  id: '5.3',
  title: 'Melodic Contour',
  description: 'Passing tones and neighbor tones (making melodies smooth)',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Non-Chord Tones

Notes that don't belong to the underlying chord but add melodic interest.

### Passing Tone
Connects two chord tones by step:
C - **D** - E (D passes between C and E)

### Neighbor Tone
Steps away from and back to a chord tone:
C - **D** - C or C - **B** - C

### Other Types
- **Suspension**: Held over from previous chord
- **Anticipation**: Arrives early
- **Appoggiatura**: Leaps to, steps away

### Melodic Guidelines
- Stepwise motion is smooth
- Leaps add energy (follow with step in opposite direction)
- Avoid augmented intervals
  `,
}
