/**
 * Module 1, Submodule 1.1: The Staff & Clefs
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_1: Submodule = {
  id: '1.1',
  title: 'The Staff & Clefs',
  description: 'Understanding the 5 lines, Treble Clef (G Clef), and Bass Clef (F Clef)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## The Musical Staff

The **staff** (or stave) consists of **5 horizontal lines** and **4 spaces**. Each line and space represents a different musical pitch.

### Treble Clef (G Clef)
The treble clef curls around the **G line** (second line from bottom). It's used for higher-pitched instruments and the right hand of piano.

**Line notes (bottom to top):** E - G - B - D - F ("Every Good Boy Does Fine")

{{abc:Treble Clef Line Notes|X:1
L:1/2
K:C clef=treble
E G B d f|]}}

**Space notes (bottom to top):** F - A - C - E ("FACE")

{{abc:Treble Clef Space Notes|X:1
L:1/2
K:C clef=treble
F A c e|]}}

### Bass Clef (F Clef)
The bass clef has two dots surrounding the **F line** (fourth line from bottom). It's used for lower-pitched instruments and the left hand of piano.

**Line notes (bottom to top):** G - B - D - F - A ("Good Boys Do Fine Always")

{{abc:Bass Clef Line Notes|X:1
L:1/2
K:C clef=bass
G, B, D F A|]}}

**Space notes (bottom to top):** A - C - E - G ("All Cows Eat Grass")

{{abc:Bass Clef Space Notes|X:1
L:1/2
K:C clef=bass
A, C E G|]}}

### The Grand Staff
When treble and bass clefs are joined by a brace, they form the **Grand Staff** - used for piano music. Middle C sits on a ledger line between the two staves.
  `,
  staffAbc: `X:1
T:Grand Staff Overview
M:4/4
L:1/4
K:C clef=treble
%%staves {1 2}
V:1 clef=treble
E G B d | f a c' e' |]
V:2 clef=bass
G, B, D F | A c e g |]`,
  abcDemos: [
    {
      id: '1.1.1',
      title: 'Treble Clef Notes',
      description: 'Notes on the treble clef staff from E4 to F5',
      abc: `X:1
M:4/4
L:1/4
K:C clef=treble
E F G A | B c d e | f |]`,
      interactive: true,
      playable: true
    },
    {
      id: '1.1.2',
      title: 'Bass Clef Notes',
      description: 'Notes on the bass clef staff from G2 to A3',
      abc: `X:1
M:4/4
L:1/4
K:C clef=bass
G, A, B, C | D E F G | A |]`,
      interactive: true,
      playable: true
    }
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
      questionCount: 5
    }
  ]
}
