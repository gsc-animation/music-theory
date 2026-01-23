/**
 * Music Theory Course Data
 * Complete curriculum definition with 5 modules and 26 submodules
 */

// Section types that can be shown/hidden in SubmodulePage
export type SectionType = 
  | 'theory' 
  | 'grandStaff' 
  | 'piano' 
  | 'guitar' 
  | 'flute' 
  | 'abcDemo' 
  | 'practice'

export interface AbcDemo {
  id: string
  title: string
  description: string
  abc: string
  interactive?: boolean
  playable?: boolean
}

export interface Exercise {
  type: 'note-id' | 'interval' | 'chord' | 'rhythm'
  notes?: string[]       // For note-id: notes to quiz on
  questionCount?: number // Number of questions
}

export interface Submodule {
  id: string              // e.g., "1.1", "1.2"
  title: string
  description: string
  sections: SectionType[]
  theoryContent?: string  // Markdown content for theory section
  staffAbc?: string       // ABC notation for Grand Staff
  abcDemos?: AbcDemo[]
  exercises?: Exercise[]  // Interactive quizzes/exercises
}

export interface Module {
  id: number
  name: string
  subtitle: string
  icon: string
  submodules: Submodule[]
}

// ============================================================================
// MODULE 1: THE FUNDAMENTALS (Pitch & Notation)
// ============================================================================
const MODULE_1_SUBMODULES: Submodule[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
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
        playable: true
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
        playable: true
      }
    ]
  },
  {
    id: '1.5',
    title: 'Enharmonic Equivalents',
    description: 'Notes that sound the same but are spelled differently (e.g., C# and Db)',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Enharmonic Equivalents

**Enharmonic** notes are notes that sound identical but have different names.

### Common Enharmonic Pairs
| Sharp | Flat |
|-------|------|
| C♯ | D♭ |
| D♯ | E♭ |
| F♯ | G♭ |
| G♯ | A♭ |
| A♯ | B♭ |

### Natural Enharmonics
| Note | Enharmonic |
|------|------------|
| E | F♭ |
| F | E♯ |
| B | C♭ |
| C | B♯ |

### Why Different Names?
The choice depends on musical context:
- Key signature (G♯ in A major, A♭ in F minor)
- Direction of melody (ascending often uses sharps)
- Harmonic function
    `,
    abcDemos: [
      {
        id: '1.5.1',
        title: 'Enharmonic Pairs',
        description: 'Same sound, different spelling',
        abc: `X:1
M:4/4
L:1/2
K:C
^C _D | ^D _E | ^F _G | ^G _A |]`,
        playable: true
      }
    ]
  }
]

// ============================================================================
// MODULE 2: RHYTHM & METER
// ============================================================================
const MODULE_2_SUBMODULES: Submodule[] = [
  {
    id: '2.1',
    title: 'Note Values',
    description: 'Whole, Half, Quarter, Eighth, and Sixteenth notes',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Note Values (Duration)

Note values tell us **how long** to hold a note. Each value is half the duration of the previous.

| Note | Beats (in 4/4) | Symbol |
|------|----------------|--------|
| Whole | 4 beats | ○ |
| Half | 2 beats | 𝅗𝅥 |
| Quarter | 1 beat | ♩ |
| Eighth | ½ beat | ♪ |
| Sixteenth | ¼ beat | 𝅘𝅥𝅯 |

### Counting
- Quarter notes: 1, 2, 3, 4
- Eighth notes: 1 & 2 & 3 & 4 &
- Sixteenth notes: 1 e & a 2 e & a 3 e & a 4 e & a
    `
  },
  {
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
    `
  },
  {
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
    `
  },
  {
    id: '2.4',
    title: 'Time Signatures (Simple)',
    description: 'Understanding top/bottom numbers (4/4, 3/4, 2/4)',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Time Signatures

The **time signature** appears at the beginning of a piece and tells us:
- **Top number**: How many beats per measure
- **Bottom number**: Which note value gets one beat

### Common Time Signatures

| Signature | Beats | Beat Unit | Feel |
|-----------|-------|-----------|------|
| 4/4 | 4 | Quarter | March, Rock |
| 3/4 | 3 | Quarter | Waltz |
| 2/4 | 2 | Quarter | Polka, March |
| 2/2 | 2 | Half | Cut time |

### 4/4 = Common Time
4/4 is so common it's sometimes written as **C** (common time).
    `
  },
  {
    id: '2.5',
    title: 'Compound Meter',
    description: 'Introduction to 6/8 and triplet feel',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Compound Meter

In **compound meter**, beats are divided into **three** instead of two.

### 6/8 Time
- 6 eighth notes per measure
- But felt as **2 groups of 3**
- Each dotted quarter = 1 beat

### 6/8 vs 3/4
Both have 6 eighth notes per measure, but:
- 3/4: THREE beats (1-2-3, 1-2-3)
- 6/8: TWO beats (1-2-3, 4-5-6)

### Triplets
In simple meter, **triplets** divide a beat into 3 equal parts instead of 2.
    `
  },
  {
    id: '2.6',
    title: 'Tempo & BPM',
    description: 'Beats Per Minute and Italian tempo markings',
    sections: ['theory', 'abcDemo'],
    theoryContent: `
## Tempo

**Tempo** is the speed of the music, measured in **BPM** (beats per minute).

### Italian Tempo Markings

| Term | BPM Range | English |
|------|-----------|---------|
| Largo | 40-60 | Very slow |
| Adagio | 66-76 | Slow |
| Andante | 76-108 | Walking pace |
| Moderato | 108-120 | Moderate |
| Allegro | 120-168 | Fast |
| Vivace | 168-176 | Lively |
| Presto | 168-200 | Very fast |

### Metronome
A metronome clicks at a set BPM to help musicians keep steady time.
    `
  }
]

// ============================================================================
// MODULE 3: SCALES & MELODY
// ============================================================================
const MODULE_3_SUBMODULES: Submodule[] = [
  {
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
  },
  {
    id: '3.2',
    title: 'Key Signatures',
    description: 'Order of Sharps and Flats; identifying keys on the staff',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Key Signatures

A **key signature** tells us which notes are sharp or flat throughout a piece.

### Order of Sharps
**F - C - G - D - A - E - B** ("Father Charles Goes Down And Ends Battle")

| Sharps | Key |
|--------|-----|
| 0 | C Major |
| 1 (F#) | G Major |
| 2 (F#, C#) | D Major |
| 3 | A Major |
| 4 | E Major |
| 5 | B Major |

### Order of Flats
**B - E - A - D - G - C - F** (reverse of sharps)

| Flats | Key |
|-------|-----|
| 1 (Bb) | F Major |
| 2 (Bb, Eb) | Bb Major |
| 3 | Eb Major |
| 4 | Ab Major |
    `
  },
  {
    id: '3.3',
    title: 'Intervals (Quantity)',
    description: 'Distance between notes (2nd, 3rd, 4th, 5th...)',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Intervals: Distance Between Notes

An **interval** is the distance between two notes, counted by the number of letter names.

### Counting Intervals
Count both the starting and ending notes:
- C to D = 2nd (C, D)
- C to E = 3rd (C, D, E)
- C to G = 5th (C, D, E, F, G)

### Interval Names
| Interval | Notes Apart |
|----------|-------------|
| Unison | 0 |
| 2nd | 1 |
| 3rd | 2 |
| 4th | 3 |
| 5th | 4 |
| 6th | 5 |
| 7th | 6 |
| Octave | 7 |
    `
  },
  {
    id: '3.4',
    title: 'Intervals (Quality)',
    description: 'Major, Minor, Perfect, Augmented, and Diminished',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Interval Quality

The **quality** describes the exact size of an interval in half steps.

### Perfect Intervals
Unison, 4th, 5th, and Octave can be **Perfect**.

### Major/Minor Intervals
2nd, 3rd, 6th, and 7th can be **Major** or **Minor**.

| Interval | Minor | Major |
|----------|-------|-------|
| 2nd | 1 half step | 2 half steps |
| 3rd | 3 half steps | 4 half steps |
| 6th | 8 half steps | 9 half steps |
| 7th | 10 half steps | 11 half steps |

### Augmented & Diminished
- **Augmented**: One half step larger than perfect/major
- **Diminished**: One half step smaller than perfect/minor
    `
  },
  {
    id: '3.5',
    title: 'The Minor Scales',
    description: 'Natural Minor, Harmonic Minor, and Melodic Minor',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Minor Scales

Minor scales have a darker, sadder sound than major scales.

### Natural Minor
Formula: **W - H - W - W - H - W - W**

A Natural Minor: A - B - C - D - E - F - G - A

### Harmonic Minor
Raise the 7th note of natural minor by a half step.
A Harmonic Minor: A - B - C - D - E - F - **G#** - A

### Melodic Minor
- **Ascending**: Raise 6th and 7th
- **Descending**: Natural minor

### Relative Major/Minor
Every major key has a **relative minor** starting 3 half steps lower:
- C major → A minor
- G major → E minor
    `
  },
  {
    id: '3.6',
    title: 'The Pentatonic Scale',
    description: 'Major and Minor pentatonic patterns (crucial for soloing)',
    sections: ['theory', 'grandStaff', 'piano', 'guitar', 'abcDemo'],
    theoryContent: `
## Pentatonic Scales

**Pentatonic** means "five notes." These scales are used extensively in rock, blues, pop, and folk music.

### Major Pentatonic
Scale degrees: 1 - 2 - 3 - 5 - 6

C Major Pentatonic: C - D - E - G - A

### Minor Pentatonic
Scale degrees: 1 - ♭3 - 4 - 5 - ♭7

A Minor Pentatonic: A - C - D - E - G

### Why So Popular?
- No half steps = no "wrong" notes
- Works over many chord progressions
- Easy to play on guitar (box patterns)
    `
  }
]

// ============================================================================
// MODULE 4: HARMONY (The Core)
// ============================================================================
const MODULE_4_SUBMODULES: Submodule[] = [
  {
    id: '4.1',
    title: 'Triads (Chords)',
    description: 'Building 3-note chords (Root, 3rd, 5th)',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Triads: Three-Note Chords

A **triad** is built by stacking two intervals of a third.

### Structure
- **Root**: The chord's foundation
- **Third**: 3rd note above the root
- **Fifth**: 5th note above the root

### Building a C Major Triad
C (root) + E (3rd) + G (5th) = C Major chord

### Chord Spelling
All triads are spelled using "every other" letter:
- C-E-G, D-F-A, E-G-B, etc.
    `
  },
  {
    id: '4.2',
    title: 'Chord Qualities',
    description: 'Major, Minor, Diminished, and Augmented triads',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Chord Qualities

The **quality** of a triad depends on the intervals between notes.

### Four Triad Types

| Quality | Formula | Sound |
|---------|---------|-------|
| Major | M3 + m3 | Happy, bright |
| Minor | m3 + M3 | Sad, dark |
| Diminished | m3 + m3 | Tense, unstable |
| Augmented | M3 + M3 | Mysterious, unresolved |

### In Half Steps
- Major: 4 + 3 = 7 half steps (C-E-G)
- Minor: 3 + 4 = 7 half steps (C-Eb-G)
- Diminished: 3 + 3 = 6 half steps (C-Eb-Gb)
- Augmented: 4 + 4 = 8 half steps (C-E-G#)
    `
  },
  {
    id: '4.3',
    title: 'Diatonic Chords',
    description: 'Chords built strictly from the notes of a specific key',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Diatonic Chords

**Diatonic** chords use only the notes from a specific key.

### Chords in C Major
Building triads on each scale degree:

| Degree | Chord | Quality |
|--------|-------|---------|
| I | C-E-G | Major |
| ii | D-F-A | minor |
| iii | E-G-B | minor |
| IV | F-A-C | Major |
| V | G-B-D | Major |
| vi | A-C-E | minor |
| vii° | B-D-F | diminished |

### The Pattern
In any major key: **I - ii - iii - IV - V - vi - vii°**

Major chords: I, IV, V
Minor chords: ii, iii, vi
Diminished: vii°
    `
  },
  {
    id: '4.4',
    title: 'Roman Numeral Analysis',
    description: 'The Nashville Number System (I, ii, iii, IV, V, vi, vii°)',
    sections: ['theory', 'abcDemo'],
    theoryContent: `
## Roman Numeral Analysis

Roman numerals show chord function regardless of key.

### Notation Rules
- **Uppercase** = Major chord (I, IV, V)
- **Lowercase** = minor chord (ii, iii, vi)
- **° symbol** = diminished (vii°)
- **+ symbol** = augmented

### Nashville Number System
Professional musicians often use Arabic numerals:
1 - 4 - 5 - 1 (same as I - IV - V - I)

### Why Use It?
- Transpose songs instantly
- Understand harmonic relationships
- Communicate with any musician
    `
  },
  {
    id: '4.5',
    title: 'Circle of Fifths',
    description: 'Visualizing key relationships and accidentals',
    sections: ['theory'],
    theoryContent: `
## The Circle of Fifths

A visual diagram showing relationships between all 12 major (and minor) keys.

### Moving Clockwise
Each step adds one sharp:
C → G → D → A → E → B → F# → C#

### Moving Counter-clockwise
Each step adds one flat:
C → F → Bb → Eb → Ab → Db → Gb → Cb

### Uses
- Find key signatures quickly
- Identify closely related keys
- Plan modulations
- Understand chord progressions (V-I movement)
    `
  },
  {
    id: '4.6',
    title: 'Chord Inversions',
    description: 'Slash chords (e.g., C/E, G/B) and voice leading basics',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Chord Inversions

An **inversion** puts a note other than the root in the bass.

### Three Positions

| Position | Bass Note | Symbol |
|----------|-----------|--------|
| Root position | Root | C |
| 1st inversion | 3rd | C/E |
| 2nd inversion | 5th | C/G |

### Voice Leading
Inversions create smoother bass lines:
- C → G/B → Am (bass: C → B → A)
- Instead of C → G → Am (bass: C → G → A)

### Slash Chord Notation
C/E means "C chord with E in the bass"
    `
  },
  {
    id: '4.7',
    title: 'Seventh Chords',
    description: 'Major 7 (Maj7), Minor 7 (min7), Dominant 7 (dom7)',
    sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
    theoryContent: `
## Seventh Chords

Add a 7th above the root for richer harmony.

### Common Seventh Chords

| Type | Symbol | Formula | Sound |
|------|--------|---------|-------|
| Major 7 | Cmaj7 | 1-3-5-7 | Dreamy, jazz |
| Minor 7 | Cm7 | 1-♭3-5-♭7 | Smooth, mellow |
| Dominant 7 | C7 | 1-3-5-♭7 | Bluesy, wants resolution |
| Minor 7♭5 | Cm7♭5 | 1-♭3-♭5-♭7 | Dark, unstable |
| Diminished 7 | Cdim7 | 1-♭3-♭5-𝄫7 | Very tense |

### The Dominant 7
The V7 chord strongly wants to resolve to I - this is the most important progression in tonal music.
    `
  }
]

// ============================================================================
// MODULE 5: COMPOSITION & FORM
// ============================================================================
const MODULE_5_SUBMODULES: Submodule[] = [
  {
    id: '5.1',
    title: 'Common Chord Progressions',
    description: 'Pop/Rock formulas (I-V-vi-IV, ii-V-I)',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Common Chord Progressions

### Pop/Rock Progressions

**I - V - vi - IV** ("Axis of Awesome")
C - G - Am - F
Used in: "Let It Be," "No Woman No Cry," hundreds more

**I - IV - V - I**
The most basic progression in Western music

**vi - IV - I - V**
Am - F - C - G
Emotional, dramatic

### Jazz Progressions

**ii - V - I**
Dm7 - G7 - Cmaj7
The most important jazz progression

**I - vi - ii - V** ("Rhythm Changes")
Common turnaround progression
    `
  },
  {
    id: '5.2',
    title: 'Cadences',
    description: 'Musical punctuation (Perfect, Plagal, Half, Deceptive)',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Cadences: Musical Punctuation

A **cadence** is a harmonic arrival point - like punctuation in a sentence.

### Four Main Cadences

| Cadence | Progression | Effect |
|---------|-------------|--------|
| **Perfect (Authentic)** | V → I | Complete, final |
| **Plagal ("Amen")** | IV → I | Softer ending |
| **Half** | ? → V | Incomplete, pause |
| **Deceptive** | V → vi | Surprise, continues |

### Examples in C Major
- Perfect: G → C
- Plagal: F → C  
- Half: Am → G
- Deceptive: G → Am
    `
  },
  {
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
    `
  },
  {
    id: '5.4',
    title: 'Song Structure',
    description: 'Verse, Chorus, Bridge, Pre-Chorus, Intro/Outro',
    sections: ['theory'],
    theoryContent: `
## Song Structure

### Common Sections

| Section | Function | 
|---------|----------|
| **Intro** | Sets mood, grabs attention |
| **Verse** | Tells the story, lower energy |
| **Pre-Chorus** | Builds tension before chorus |
| **Chorus** | Main hook, highest energy |
| **Bridge** | Contrast, new perspective |
| **Outro** | Conclusion, fade or final statement |

### Common Forms

**Verse-Chorus:**
Intro - V - C - V - C - Bridge - C - Outro

**AABA (32-bar):**
A (8) - A (8) - B (8) - A (8)

**12-Bar Blues:**
I-I-I-I | IV-IV-I-I | V-IV-I-V
    `
  },
  {
    id: '5.5',
    title: 'Dynamics & Articulation',
    description: 'Markings for volume (p, f, mf) and touch (staccato, legato)',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Dynamics

**Dynamic markings** indicate volume.

| Marking | Name | Meaning |
|---------|------|---------|
| ppp | Pianississimo | Very very soft |
| pp | Pianissimo | Very soft |
| p | Piano | Soft |
| mp | Mezzo-piano | Medium soft |
| mf | Mezzo-forte | Medium loud |
| f | Forte | Loud |
| ff | Fortissimo | Very loud |
| fff | Fortississimo | Very very loud |

### Changes
- **Crescendo (<)**: Gradually louder
- **Decrescendo (>)**: Gradually softer

## Articulation

| Symbol | Name | Effect |
|--------|------|--------|
| · | Staccato | Short, detached |
| – | Tenuto | Hold full value |
| > | Accent | Emphasis |
| ∧ | Marcato | Strong accent |
| ⌢ | Slur | Smooth, connected |
    `
  },
  {
    id: '5.6',
    title: 'Modulation',
    description: 'Briefly changing keys within a song',
    sections: ['theory', 'grandStaff', 'abcDemo'],
    theoryContent: `
## Modulation

**Modulation** is changing from one key to another within a piece.

### Common Modulations

| Type | Target | Used For |
|------|--------|----------|
| Up a half step | Any key | Final chorus lift |
| To relative major/minor | vi or I | Verse to chorus |
| To dominant | V | Development sections |
| To subdominant | IV | Softer contrast |

### Techniques

**Pivot Chord**: A chord that exists in both keys
- C major to G major: D minor is ii in C, iii in G

**Direct Modulation**: Jump to new key without preparation

**Common-Tone Modulation**: Hold one note while harmony changes

### The "Truck Driver's Modulation"
Suddenly shifting up a half step for the final chorus - dramatic but sometimes clichéd!
    `
  }
]

// ============================================================================
// COMPLETE CURRICULUM
// ============================================================================
export const COURSE_MODULES: Module[] = [
  {
    id: 1,
    name: 'Fundamentals',
    subtitle: 'Pitch & Notation',
    icon: 'music_note',
    submodules: MODULE_1_SUBMODULES
  },
  {
    id: 2,
    name: 'Rhythm & Meter',
    subtitle: 'Time & Pulse',
    icon: 'timer',
    submodules: MODULE_2_SUBMODULES
  },
  {
    id: 3,
    name: 'Scales & Melody',
    subtitle: 'Patterns & Motion',
    icon: 'trending_up',
    submodules: MODULE_3_SUBMODULES
  },
  {
    id: 4,
    name: 'Harmony',
    subtitle: 'Chords & Progressions',
    icon: 'auto_awesome',
    submodules: MODULE_4_SUBMODULES
  },
  {
    id: 5,
    name: 'Composition & Form',
    subtitle: 'Structure & Style',
    icon: 'edit_note',
    submodules: MODULE_5_SUBMODULES
  }
]

// Helper to get total submodules count
export const getTotalSubmodules = (): number => {
  return COURSE_MODULES.reduce((acc, module) => acc + module.submodules.length, 0)
}

// Helper to find a submodule by ID
export const findSubmodule = (submoduleId: string): Submodule | undefined => {
  for (const module of COURSE_MODULES) {
    const found = module.submodules.find(s => s.id === submoduleId)
    if (found) return found
  }
  return undefined
}

// Helper to find a module by ID
export const findModule = (moduleId: number): Module | undefined => {
  return COURSE_MODULES.find(m => m.id === moduleId)
}

// Helper to get next submodule
export const getNextSubmodule = (currentId: string): Submodule | undefined => {
  const allSubmodules = COURSE_MODULES.flatMap(m => m.submodules)
  const currentIndex = allSubmodules.findIndex(s => s.id === currentId)
  return allSubmodules[currentIndex + 1]
}

// Helper to get previous submodule  
export const getPreviousSubmodule = (currentId: string): Submodule | undefined => {
  const allSubmodules = COURSE_MODULES.flatMap(m => m.submodules)
  const currentIndex = allSubmodules.findIndex(s => s.id === currentId)
  return currentIndex > 0 ? allSubmodules[currentIndex - 1] : undefined
}
