/**
 * Module 1, Submodule 1.4: Tones & Semitones
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_4: Submodule = {
  id: '1.4',
  title: 'Tones & Semitones',
  description: 'Understanding Whole Steps and Half Steps',
  sections: ['theory', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## Half Steps and Whole Steps

### Half Step (Semitone)
The **smallest distance** between two notes in Western music. On piano, it's the distance from any key to the very next key (black or white).

Examples of half steps:
- E to F (no black key between)
- B to C (no black key between)
- C to C♯
- F♯ to G

### Whole Step (Whole Tone)
Two half steps combined. On piano, skip one key.

Examples of whole steps:
- C to D
- D to E  
- F to G
- A to B

### Why It Matters
Scales are built from specific patterns of whole and half steps. Understanding this is fundamental to all music theory.
  `,
  abcDemos: [
    {
      id: '1.4.1',
      title: 'Half Steps (Semitones)',
      description: 'Chromatic movement by half steps',
      abc: `X:1
M:4/4
L:1/4
K:C
C ^C D ^D | E F ^F G |]`,
      playable: true,
    },
    {
      id: '1.4.2',
      title: 'Whole Steps',
      description: 'Movement by whole steps only',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E ^F | ^G ^A c |]`,
      playable: true,
    },
  ],
}
