# Course Implementation - Session 2 Planning

## Overview

Continue building the Music Theory Course from Session 1, which established:

- Course data structure (5 modules, 26 submodules)
- IndexedDB user progress tracking
- Sidebar navigation with expandable modules
- SubmodulePage with configurable sections

---

## Session 2 Objectives

### 1. Lesson-Specific ABC Notation

**Goal:** Show custom staff notation per submodule.

**Changes:**

```typescript
// AbcGrandStaff.tsx - Add prop
interface AbcGrandStaffProps {
  showNoteNames?: boolean
  overrideAbc?: string  // NEW: Use this ABC instead of recorded notes
}

// SubmodulePage.tsx - Pass staff ABC
<AbcGrandStaff
  showNoteNames={showNoteNames}
  overrideAbc={submodule.staffAbc}
/>
```

**Files:**

- `src/components/MusicStaff/AbcGrandStaff.tsx`
- `src/pages/SubmodulePage.tsx`

---

### 2. Enhanced ABC Demonstrations

**Goal:** Each lesson shows interactive ABC examples demonstrating the concept.

**Current state:** AbcDemoSection renders demos from `submodule.abcDemos[]`

**Enhancements:**

- Add click-to-play individual notes
- Highlight notes on piano/guitar when demo plays
- Add tempo control per demo

**Files:**

- `src/components/modules/AbcDemoSection.tsx`

---

### 3. Quiz/Exercise Components

**Goal:** Interactive practice within lessons.

**New Components:**

```
src/components/modules/
├── NoteIdentificationQuiz.tsx   # Click staff note → select note name
├── IntervalQuiz.tsx             # Play interval → identify type
├── ChordQuiz.tsx                # Play chord → identify quality
└── PracticeSection.tsx          # Wrapper for practice mode
```

**Data structure update:**

```typescript
interface Submodule {
  // existing...
  exercises?: Exercise[]
}

interface Exercise {
  type: 'note-id' | 'interval' | 'chord' | 'rhythm'
  config: object
}
```

---

### 4. Progress Integration

**Goal:** Track exercise scores, unlock next lessons.

**Changes:**

- Update `useProgressStore.ts` with exercise results
- Add "70% to unlock next" logic
- Show progress in SubmodulePage header

---

## Implementation Order

1. Add `overrideAbc` to AbcGrandStaff (~20 min)
2. Wire up lesson-specific notation in SubmodulePage (~10 min)
3. Create NoteIdentificationQuiz component (~45 min)
4. Add exercise data to course-data.ts (~30 min)
5. Integrate scoring with progress store (~20 min)

---

## Reference Files

| File                                                                | Purpose              |
| ------------------------------------------------------------------- | -------------------- |
| [course-data.ts](../src/data/course-data.ts)                        | Curriculum structure |
| [useProgressStore.ts](../src/stores/useProgressStore.ts)            | Progress tracking    |
| [SubmodulePage.tsx](../src/pages/SubmodulePage.tsx)                 | Lesson page          |
| [AbcGrandStaff.tsx](../src/components/MusicStaff/AbcGrandStaff.tsx) | Staff rendering      |
| [AbcDemoSection.tsx](../src/components/modules/AbcDemoSection.tsx)  | ABC demos            |

---

## Commands

```bash
# Start dev server
npm run dev

# Build & verify
npm run build

# Run tests
npm test
```
