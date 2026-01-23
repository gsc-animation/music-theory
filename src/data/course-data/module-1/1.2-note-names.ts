/**
 * Module 1, Submodule 1.2: Note Names & Pitch
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_2: Submodule = {
  id: '1.2',
  title: 'Note Names & Pitch',
  description: 'Identifying notes (A-B-C-D-E-F-G) on the keyboard and staff',
  sections: ['theory', 'grandStaff', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## The Musical Alphabet

Music uses only **7 letter names**: A, B, C, D, E, F, G. After G, the pattern repeats starting at A again.

### Finding Notes on the Piano
- White keys follow the pattern A-B-C-D-E-F-G
- **Middle C** is the C nearest the center of the piano
- The pattern of 2 and 3 black keys helps identify notes

### Octaves
When you play from one C to the next C (8 notes), you've played an **octave**. The higher C vibrates exactly twice as fast as the lower C.

### Staff Position = Pitch
Higher on the staff = higher pitch. Lower on the staff = lower pitch.
  `,
  abcDemos: [
    {
      id: '1.2.1',
      title: 'The Musical Alphabet',
      description: 'All 7 natural notes in order',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c |]`,
      playable: true
    },
    {
      id: '1.2.2',
      title: 'Octave Comparison',
      description: 'Same notes in different octaves',
      abc: `X:1
M:4/4
L:1/2
K:C
C c | D d | E e | F f |]`,
      playable: true
    }
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
      questionCount: 7
    }
  ]
}
