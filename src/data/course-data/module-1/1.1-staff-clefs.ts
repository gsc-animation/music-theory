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

**Space notes (bottom to top):** F - A - C - E ("FACE")

### Bass Clef (F Clef)
The bass clef has two dots surrounding the **F line** (fourth line from bottom). It's used for lower-pitched instruments and the left hand of piano.

**Line notes (bottom to top):** G - B - D - F - A ("Good Boys Do Fine Always")

**Space notes (bottom to top):** A - C - E - G ("All Cows Eat Grass")

### The Grand Staff
When treble and bass clefs are joined by a brace, they form the **Grand Staff** - used for piano music. Middle C sits on a ledger line between the two staves.
  `,
  staffAbc: `X:1
T:Bonny Green
C:Traditional English Folk Song
R:Jig
O:Bucknell, England
Q:1/8=180
M:6/8
L:1/8
K:C
%%staves {1 2}
V:1 clef=treble name="Treble"
G | cBc ded | cBA GAB | cBc AGF | EFD C2 |
V:2 clef=bass name="Bass"
z | C,3 G,3 | A,3 E,3 | C,3 F,3 | G,3 C,2 |`,
  abcDemos: [
    {
      id: '1.1.1',
      title: 'Treble Clef Line Notes',
      description: 'E - G - B - D - F ("Every Good Boy Does Fine")',
      abc: `X:1
L:1/2
K:C clef=treble
E G B d f|]`,
      interactive: true,
      playable: true
    },
    {
      id: '1.1.2',
      title: 'Treble Clef Space Notes',
      description: 'F - A - C - E ("FACE")',
      abc: `X:1
L:1/2
K:C clef=treble
F A c e|]`,
      interactive: true,
      playable: true
    },
    {
      id: '1.1.3',
      title: 'Bass Clef Line Notes',
      description: 'G - B - D - F - A ("Good Boys Do Fine Always")',
      abc: `X:1
L:1/2
K:C clef=bass
G,, B,, D, F, A,|]`,
      interactive: true,
      playable: true
    },
    {
      id: '1.1.4',
      title: 'Bass Clef Space Notes',
      description: 'A - C - E - G ("All Cows Eat Grass")',
      abc: `X:1
L:1/2
K:C clef=bass
A,, C, E, G,|]`,
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
