# 🎵 Music Theory Course

An interactive, gamified music theory learning platform built with React, TypeScript, and Vite.

## ✨ Features

- **Progressive Learning Path** - Structured modules from fundamentals to advanced
- **Interactive Theory Content** - Engaging lessons with inline quizzes
- **Note Training Games** - Gamified exercises with Journey Map progression
- **ABC Notation Rendering** - Live sheet music display using abcjs
- **Audio Synthesis** - Play notes and chords in browser
- **XP & Progress Tracking** - Persistent progress with Zustand stores

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

> **Note:** Development server runs on **http://localhost:5504/** by default.

### 🧪 Test Pages

| Page                 | URL               | Purpose                                   |
| -------------------- | ----------------- | ----------------------------------------- |
| Fretboard Click Test | `/test-fretboard` | Debug guitar fretboard position detection |
| UI Component Test    | `/test-ui`        | Test UI components and layouts            |

---

## 📝 Progressive Content Page

The Progressive Content system provides an optimized UX for presenting learning materials to students. Content reveals progressively as students engage with quizzes, ensuring comprehension before advancing.

### How It Works

```
┌─────────────────────────────────────────┐
│  Section 1: Introduction                │  ← Visible on load
│  ...theory content...                   │
│  ┌─────────────────────────────────┐    │
│  │ 📝 Quiz: What is a semitone?    │    │  ← Student must answer
│  │    ○ Option A                   │    │
│  │    ● Option B (correct)         │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  🔒 Trả lời câu hỏi để tiếp tục...      │  ← Lock hint
├─────────────────────────────────────────┤
│  Section 2: (Hidden until quiz done)    │  ← Reveals after answer
│  ...more content...                     │
│  📝 Quiz...                             │
├─────────────────────────────────────────┤
│  Section 3: (Hidden)                    │
│  ...                                    │
└─────────────────────────────────────────┘
```

### UX Benefits

| Feature                | Benefit                               |
| ---------------------- | ------------------------------------- |
| **Progressive Reveal** | Prevents information overload         |
| **Lock Hints**         | Clear indication of next action       |
| **Auto-scroll**        | Smooth transition to new content      |
| **Immediate Feedback** | Correct/incorrect with explanations   |
| **Completion Unlock**  | Games & exercises unlock after theory |

---

### Content Authoring Format

Create lesson content in TypeScript data files using this structure:

```typescript
// src/data/course-data/module-1/1.4-tones-semitones.ts

export const submodule1_4: SubmoduleData = {
  id: '1.4',
  title: 'Cung và Nửa cung',

  theorySections: `
## Nửa cung (Semitones)

Nửa cung là khoảng cách **nhỏ nhất** giữa hai nốt liền kề.

![Piano keyboard](/images/piano-semitone.svg)

{{quiz:Nửa cung là khoảng cách như thế nào?|Lớn nhất;*Nhỏ nhất;Trung bình|Nửa cung = khoảng cách nhỏ nhất!}}

---

## Cung (Whole Steps)

Một cung = 2 nửa cung liên tiếp.

{{quiz:1 Cung bằng bao nhiêu nửa cung?|1;*2;3|1 Cung = 2 Nửa cung}}

---

## So sánh

| Interval | Piano | Guitar |
|----------|-------|--------|
| Nửa cung | 1 phím | 1 fret |
| Cung     | 2 phím | 2 frets |
  `,

  interactiveExamples: [...],
  game: { ... }
}
```

---

### Syntax Reference

#### Section Separators

Use `---` (horizontal rule) to divide content into progressive sections:

```markdown
## Section 1

Content here...

---

## Section 2

More content...
```

#### Inline Quiz Syntax

```
{{quiz:QUESTION|OPTION1;*CORRECT_OPTION;OPTION3|EXPLANATION}}
```

| Part          | Description                                          |
| ------------- | ---------------------------------------------------- |
| `QUESTION`    | The quiz question text                               |
| `OPTIONS`     | Semicolon-separated options, prefix correct with `*` |
| `EXPLANATION` | Shown after answering (optional)                     |

**Examples:**

```markdown
{{quiz:What note is this?|C;D;*E;F|E is on the first line of treble clef}}

{{quiz:How many semitones in a whole step?|1;*2;3|Whole step = 2 semitones}}
```

#### Rich Content Support

All standard Markdown works inside sections:

```markdown
## Section Title

Regular paragraph with **bold** and _italic_.

- Bullet lists
- Work great

| Tables | Also |
| ------ | ---- |
| Work   | Fine |

> Blockquotes for emphasis

\`\`\`
Code blocks if needed
\`\`\`
```

#### ABC Notation (Sheet Music)

Embed interactive sheet music with play buttons:

```markdown
{{abc:Title|X:1
M:4/4
K:C
CDEF GABc|
}}
```

#### Grand Staff View

Embed Grand Staff with treble and bass clefs:

```markdown
{{grandStaff:Title|X:1
M:4/4
K:C
V:1
CDEF GABc|
V:2 clef=bass
C,D,E,F, G,A,B,C|
}}
```

---

### 🎹 Instrument Synchronization (CRITICAL)

**All musical playback MUST synchronize with virtual instruments.** When notes play in ANY of the following contexts, the Piano, Guitar, and/or Flute MUST visually highlight the corresponding notes:

| Context                           | Component          | Synchronization Behavior          |
| --------------------------------- | ------------------ | --------------------------------- |
| `{{abc:...}}`                     | `AbcRenderer`      | During playback AND on note click |
| `{{grandStaff:...}}`              | `InlineGrandStaff` | During playback AND on note click |
| Interactive Examples              | Various            | During playback AND on note click |
| Grand Staff View (floating panel) | `AbcGrandStaff`    | During playback AND on note click |

#### Implementation Requirements

1. **Click Interactions**: When user clicks a note on any ABC/staff notation:
   - Play audio via `playNoteWithRelease()` or `playNote()`/`releaseNote()`
   - This automatically updates `activeNotes` in audio store → instruments highlight

2. **Playback Animations**: When music plays via play button:
   - Use `abcjs.TimingCallbacks` with `eventCallback`
   - Convert `midiPitches` to note names using `midiPitchToNoteName()`
   - Call `highlightNote()` for each note as it plays
   - Call `unhighlightNote()` when note ends or changes
   - Call `clearHighlights()` on playback stop

#### Code Pattern (AbcRenderer / InlineGrandStaff)

```typescript
// Import from audio store
const { highlightNote, unhighlightNote, clearHighlights } = useAudioStore()

// Track current notes for cleanup
const currentNotesRef = useRef<string[]>([])

// In eventCallback during playback:
const eventCallback = (ev) => {
  // Clear previous highlights
  currentNotesRef.current.forEach((note) => unhighlightNote(note))
  currentNotesRef.current = []

  // Highlight new notes
  if (ev.midiPitches?.length > 0) {
    const notes = ev.midiPitches.map((p) => midiPitchToNoteName(p.pitch)).filter((n) => n !== '')
    currentNotesRef.current = notes
    notes.forEach((note) => highlightNote(note))
  }
}

// On playback stop:
currentNotesRef.current.forEach((note) => unhighlightNote(note))
clearHighlights()
```

#### MIDI Pitch to Note Name Conversion

```typescript
const midiPitchToNoteName = (midiPitch: number): string => {
  if (midiPitch < 12 || midiPitch > 127) return ''
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const octave = Math.floor(midiPitch / 12) - 1
  const noteIndex = midiPitch % 12
  return `${noteNames[noteIndex]}${octave}`
}
```

#### ⚠️ Common Issues

| Issue                                        | Cause                                            | Fix                                             |
| -------------------------------------------- | ------------------------------------------------ | ----------------------------------------------- |
| Instruments not highlighting during playback | Missing `highlightNote()` calls in eventCallback | Add MIDI-to-note conversion and highlight calls |
| Highlights persist after stop                | Not clearing notes on playback end               | Call `clearHighlights()` in stopPlayback        |
| Chords only play one note                    | Only processing first pitch                      | Iterate ALL `pitches` in click handler          |
| Audio engine not initialized                 | First interaction issue                          | Auto-initialize in `playNote()` functions       |

### Component Architecture

```
SubmodulePage.tsx
    │
    ├── ProgressiveTheoryContent.tsx   ← Main orchestrator
    │       │
    │       ├── TheorySection (revealed progressively)
    │       │       └── MarkdownRenderer
    │       │               └── InlineQuiz.tsx
    │       │
    │       └── Lock Hint ("🔒 Trả lời câu hỏi...")
    │
    ├── InteractiveExamples.tsx        ← Unlocks after theory
    │       └── ABCNotation + Audio
    │
    └── NoteTrainingGame.tsx           ← Unlocks after theory
            └── JourneyMap + GameStages
```

---

### Customization

#### Styling Lock Hints

```css
/* src/index.css */
.lock-hint {
  @apply bg-gray-800/50 backdrop-blur-sm
         border border-gray-700 rounded-lg
         p-4 text-center text-gray-400;
}
```

#### Quiz Styling

Quiz components use these CSS classes:

- `.quiz-container` - Main wrapper
- `.quiz-option` - Each answer option
- `.quiz-option.correct` - Correct answer highlight
- `.quiz-option.incorrect` - Wrong answer highlight
- `.quiz-explanation` - Explanation text

#### Completion Callbacks

```tsx
<ProgressiveTheoryContent
  content={theorySections}
  onAllComplete={() => {
    // Unlock games, show badge, etc.
    setTheoryCompleted(true)
  }}
/>
```

---

## 📁 Project Structure

```
src/
├── components/
│   └── modules/
│       ├── ProgressiveTheoryContent.tsx  ← Progressive reveal
│       ├── InlineQuiz.tsx                ← Quiz component
│       ├── NoteTrainingGame.tsx          ← Game component
│       └── ...
├── data/
│   └── course-data/
│       ├── module-1/
│       │   ├── 1.1-staff-clefs.ts
│       │   ├── 1.2-note-names.ts
│       │   └── ...
│       └── module-2/
├── pages/
│   ├── SubmodulePage.tsx                 ← Lesson page
│   └── ...
├── stores/
│   ├── useProgressStore.ts               ← XP & progress
│   └── useAudioStore.ts                  ← Audio synthesis
└── types/
    └── course.ts                         ← Type definitions
```

---

## 🎮 Game System

### Journey Map

Games use a stage-based progression:

```typescript
const gameStages: GameStage[] = [
  { id: 'e-g', name: 'E & G', notes: ['E4', 'G4'], starsRequired: 0 },
  { id: 'e-g-b', name: 'E, G, B', notes: ['E4', 'G4', 'B4'], starsRequired: 2 },
  // ... more stages
]
```

### Star Rating

| Performance     | Stars  |
| --------------- | ------ |
| < 70% accuracy  | ⭐     |
| 70-89% accuracy | ⭐⭐   |
| ≥ 90% accuracy  | ⭐⭐⭐ |

---

## 🛠️ Tech Stack

- **React 18** + TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **abcjs** - Music notation rendering
- **Tone.js** - Audio synthesis
- **React Router** - Navigation

---

## 📝 License

MIT
