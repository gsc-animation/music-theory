/**
 * Module 1, Submodule 1.3: Accidentals
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_3: Submodule = {
  id: '1.3',
  title: 'Accidentals',
  description: 'Sharps (#), Flats (b), and Naturals (♮)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Accidentals: Sharps, Flats & Naturals

**Accidentals** are symbols that raise or lower a note's pitch.

### Sharp (♯)
Raises a note by a **half step** (semitone). On piano, move one key to the right.
- C♯ is the black key immediately right of C
- E♯ is the same as F (no black key between E and F)

### Flat (♭)
Lowers a note by a **half step**. On piano, move one key to the left.
- B♭ is the black key immediately left of B
- C♭ is the same as B

### Natural (♮)
Cancels a previous sharp or flat, returning to the natural note.

### Rules
- Accidentals affect all notes of the same pitch for the rest of the measure
- Bar lines cancel accidentals (unless in key signature)
  `,
  abcDemos: [
    {
      id: '1.3.1',
      title: 'Sharps',
      description: 'Natural notes followed by their sharps',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^C D ^D | E F ^F G | ^G A ^A B |]`,
      playable: true
    },
    {
      id: '1.3.2',
      title: 'Flats',
      description: 'Natural notes followed by their flats',
      abc: `X:1
M:4/4
L:1/4
K:C
D _D E _E | G _G A _A | B _B c |]`,
      playable: true
    }
  ]
}
