/**
 * Module 3, Submodule 3.1: The Major Scale
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_1: Submodule = {
  id: '3.1',
  title: 'The Major Scale',
  description: 'Construction formula (W-W-H-W-W-W-H)',
  sections: ['theory', 'grandStaff', 'piano', 'guitar', 'abcDemo'],
  theoryContent: `
## The Major Scale

The **major scale** is the foundation of Western music. It has a bright, happy sound.

### The Formula
**W - W - H - W - W - W - H**

(W = Whole step, H = Half step)

### C Major Scale
C - D - E - F - G - A - B - C

Starting on C uses only white keys because the half steps naturally fall between E-F and B-C.

### Building Major Scales
From any starting note, apply the W-W-H-W-W-W-H pattern to build a major scale.
  `,
  abcDemos: [
    {
      id: '3.1.1',
      title: 'C Major Scale',
      description: 'The C major scale ascending and descending',
      abc: `X:1
M:4/4
L:1/4
K:C
C D E F | G A B c | B A G F | E D C2 |]`,
      playable: true
    },
    {
      id: '3.1.2',
      title: 'G Major Scale',
      description: 'G major scale with F#',
      abc: `X:1
M:4/4
L:1/4
K:G
G A B c | d e ^f g | ^f e d c | B A G2 |]`,
      playable: true
    }
  ]
}
