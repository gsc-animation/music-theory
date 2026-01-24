/**
 * Module 2, Submodule 2.3: Dotted Notes & Ties
 */
import type { Submodule } from '../types'

export const SUBMODULE_2_3: Submodule = {
  id: '2.3',
  title: 'Dotted Notes & Ties',
  description: 'Extending duration (adding half value)',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Extending Note Duration

### Dotted Notes
A **dot** after a note adds **half its value**.

| Note | Value | Dotted Value |
|------|-------|--------------|
| Dotted half | 2 | 2 + 1 = 3 beats |
| Dotted quarter | 1 | 1 + ½ = 1.5 beats |
| Dotted eighth | ½ | ½ + ¼ = 0.75 beats |

### Ties
A **tie** connects two notes of the same pitch, combining their durations. Used when a note crosses a bar line or to create unusual rhythms.
  `,
}
