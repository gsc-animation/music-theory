/**
 * Module 2, Submodule 2.2: Rests
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_2: Submodule = {
  id: '2.2',
  title: 'Rests',
  description: 'Silence values corresponding to note durations',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Rests (Silence)

Every note value has a corresponding **rest** symbol indicating silence for that duration.

| Rest | Duration | Appearance |
|------|----------|------------|
| Whole rest | 4 beats | Hangs from line |
| Half rest | 2 beats | Sits on line |
| Quarter rest | 1 beat | Squiggle |
| Eighth rest | ½ beat | Flag with dot |
| Sixteenth rest | ¼ beat | Two flags |

Rests are just as important as notes - they create space and rhythm.
  `,
}
