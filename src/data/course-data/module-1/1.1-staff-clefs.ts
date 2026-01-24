/**
 * Module 1, Submodule 1.1: The Staff & Clefs
 *
 * Progressive curriculum:
 * 1. Empty staff (5 lines, 4 spaces)
 * 2. Treble Clef introduction
 * 3. Bass Clef introduction
 * 4. First notes: C, D, E
 * 5. Complete alphabet: F, G, A, B
 * 6. Line/space mnemonics
 * 7. Grand Staff
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_1: Submodule = {
  id: '1.1',
  title: 'The Staff & Clefs',
  description: 'Understanding the 5 lines, Treble Clef (G Clef), and Bass Clef (F Clef)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## 1. The Musical Staff

Before we learn any notes, let's understand where music is written. The **staff** (also called "stave") is like a ladder for music:

- **5 horizontal lines** - numbered 1 (bottom) to 5 (top)
- **4 spaces** between those lines - numbered 1 (bottom) to 4 (top)

Each line and each space represents a different musical pitch. Notes go **higher** as you move up the staff, and **lower** as you move down.

{{abc:Empty Staff - 5 Lines & 4 Spaces|X:1
L:1/4
K:C clef=treble
x4|]}}

> 💡 **Think of it like a ladder:** Higher rungs = higher sounds!

---

## 2. Meet the Treble Clef (G Clef)

A **clef** is a symbol at the beginning of the staff that tells us the names of the notes. Different clefs are used for different instruments and voice ranges.

The **Treble Clef** (also called **G Clef**) is the most common clef. Notice how it curls around the **second line from the bottom** - that line is the note **G**.

{{abc:Treble Clef - Notice the G Line|X:1
L:1/4
K:C clef=treble
x4|]}}

**Used for:**
- 🎹 Right hand of piano
- 🎸 Guitar
- 🎺 Trumpet, flute, violin
- 🎤 Soprano and alto voices

---

## 3. Meet the Bass Clef (F Clef)

The **Bass Clef** (also called **F Clef**) is used for lower sounds. Notice the two dots surrounding the **fourth line from the bottom** - that line is the note **F**.

{{abc:Bass Clef - Notice the F Line|X:1
L:1/4
K:C clef=bass
x4|]}}

**Used for:**
- 🎹 Left hand of piano
- 🎻 Cello, double bass
- 🎤 Bass and baritone voices
- 🎵 Tuba, trombone

---

## 4. Your First Notes: C, D, E

Music uses only **7 letter names**: A, B, C, D, E, F, G - then it repeats!

Let's start with the first three notes that are easiest to remember:

### Middle C
**Middle C** is the "home base" note - it sits on a small line between treble and bass staves.

{{abc:Middle C - Your Home Base|X:1
L:1/2
K:C clef=treble
C2|]}}

### D - One Step Up
**D** is one step higher than C. It sits in the space just below the staff.

{{abc:D Note - One Step from C|X:1
L:1/2
K:C clef=treble
D2|]}}

### E - Another Step Up
**E** is on the first (bottom) line of the treble staff.

{{abc:E Note - First Line|X:1
L:1/2
K:C clef=treble
E2|]}}

### C, D, E Together

{{abc:C D E - Your First Three Notes|X:1
L:1/2
K:C clef=treble
C D E z|]}}

---

## 5. Complete the Alphabet: F, G, A, B

Now let's learn the remaining four notes to complete the musical alphabet:

### F - First Space
**F** sits in the first space of the treble staff.

{{abc:F Note - First Space|X:1
L:1/2
K:C clef=treble
F2|]}}

### G - Second Line (The Treble Clef Line!)
**G** is on the second line - the same line the treble clef curls around!

{{abc:G Note - The Treble Clef Line|X:1
L:1/2
K:C clef=treble
G2|]}}

### A - Second Space
**A** sits in the second space.

{{abc:A Note - Second Space|X:1
L:1/2
K:C clef=treble
A2|]}}

### B - Third Line
**B** is on the third (middle) line.

{{abc:B Note - Third Line|X:1
L:1/2
K:C clef=treble
B2|]}}

### F, G, A, B Together

{{abc:F G A B - Complete the Alphabet|X:1
L:1/2
K:C clef=treble
F G A B|]}}

### 🎉 The Complete C Scale!

{{abc:C D E F G A B C - One Octave!|X:1
L:1/4
K:C clef=treble
C D E F | G A B c|]}}

---

## 6. Memory Tricks (Mnemonics)

Now that you know the notes, here are some memory tricks to help you remember which notes sit on lines vs. spaces:

### Treble Clef Line Notes
**Lines (bottom to top):** E - G - B - D - F

> 📝 **"Every Good Boy Does Fine"**

{{abc:Treble Clef Line Notes|X:1
L:1/2
K:C clef=treble
E G B d f|]}}

### Treble Clef Space Notes
**Spaces (bottom to top):** F - A - C - E

> 📝 **"FACE"** (spells a word!)

{{abc:Treble Clef Space Notes|X:1
L:1/2
K:C clef=treble
F A c e|]}}

### Bass Clef Line Notes
**Lines (bottom to top):** G - B - D - F - A

> 📝 **"Good Boys Do Fine Always"**

{{abc:Bass Clef Line Notes|X:1
L:1/2
K:C clef=bass
G,, B,, D, F, A,|]}}

### Bass Clef Space Notes
**Spaces (bottom to top):** A - C - E - G

> 📝 **"All Cows Eat Grass"**

{{abc:Bass Clef Space Notes|X:1
L:1/2
K:C clef=bass
A,, C, E, G,|]}}

---

## 7. The Grand Staff

When treble and bass clefs are joined by a **brace** (a curly bracket), they form the **Grand Staff**. This is used for piano music because pianists play both high and low notes simultaneously.

**Middle C** sits on a small ledger line right between the two staves - it's the meeting point!

{{abc:Middle C - The Meeting Point|X:1
L:1/2
K:C clef=treble
C2|]}}
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
      id: '1.1.0',
      title: 'Empty Treble Staff',
      description: 'The blank canvas - 5 lines ready for music',
      abc: `X:1
L:1/4
K:C clef=treble
x4|]`,
      interactive: false,
      playable: false,
    },
    {
      id: '1.1.0b',
      title: 'Empty Bass Staff',
      description: 'Bass clef with 5 lines for lower notes',
      abc: `X:1
L:1/4
K:C clef=bass
x4|]`,
      interactive: false,
      playable: false,
    },
    {
      id: '1.1.1a',
      title: 'C, D, E Notes',
      description: 'Your first three notes - the beginning of every scale',
      abc: `X:1
L:1/2
K:C clef=treble
C D E z|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.1b',
      title: 'F, G, A, B Notes',
      description: 'Complete the musical alphabet',
      abc: `X:1
L:1/2
K:C clef=treble
F G A B|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.1c',
      title: 'Complete C Scale',
      description: 'All 8 notes from C to C - one octave!',
      abc: `X:1
L:1/4
K:C clef=treble
C D E F | G A B c|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.2',
      title: 'Treble Clef Line Notes',
      description: 'E - G - B - D - F ("Every Good Boy Does Fine")',
      abc: `X:1
L:1/2
K:C clef=treble
E G B d f|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.3',
      title: 'Treble Clef Space Notes',
      description: 'F - A - C - E ("FACE")',
      abc: `X:1
L:1/2
K:C clef=treble
F A c e|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.4',
      title: 'Bass Clef Line Notes',
      description: 'G - B - D - F - A ("Good Boys Do Fine Always")',
      abc: `X:1
L:1/2
K:C clef=bass
G,, B,, D, F, A,|]`,
      interactive: true,
      playable: true,
    },
    {
      id: '1.1.5',
      title: 'Bass Clef Space Notes',
      description: 'A - C - E - G ("All Cows Eat Grass")',
      abc: `X:1
L:1/2
K:C clef=bass
A,, C, E, G,|]`,
      interactive: true,
      playable: true,
    },
  ],
  exercises: [
    {
      type: 'note-id',
      notes: ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
      questionCount: 5,
    },
  ],
}
