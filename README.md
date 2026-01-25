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

# Build for production
npm run build
```

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

Embed interactive sheet music:

```markdown
{{abc:X:1
M:4/4
K:C
CDEF GABc|
}}
```

---

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
