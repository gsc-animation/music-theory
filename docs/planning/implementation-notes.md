# Implementation Notes

## Architecture Decisions

### State Management

- **Zustand** for global state (simpler than Redux, TypeScript-friendly)
- **IndexedDB** via custom adapter for progress persistence (more robust than localStorage)
- Separate stores: `useModuleStore`, `useProgressStore`, `useAudioStore`, `useSettingsStore`

### Routing

- **React Router v6** with lazy loading for performance
- Routes: `/`, `/module/:id/:submoduleId`, `/practice`, `/profile`

### Audio

- **Tone.js** for interactive instrument playback
- **abcjs** for staff rendering and synchronized playback

---

## Key Data Structures

### Submodule Configuration

```typescript
interface Submodule {
  id: string // "1.1", "1.2", etc.
  title: string
  description: string
  sections: SectionType[] // Controls what UI sections appear
  theoryContent?: string // Markdown for theory panel
  staffAbc?: string // ABC notation for Grand Staff
  abcDemos?: AbcDemo[] // Interactive notation examples
  exercises?: Exercise[] // Quizzes/exercises
}
```

### Progress Tracking

```typescript
interface UserProgress {
  completedSubmodules: string[]
  currentModuleId: number
  currentSubmoduleId: string
  totalXP: number
  streakDays: number
  lastActiveDate: string
  submoduleScores: Record<string, number>
}
```

---

## Component Patterns

### Lazy Loading

All heavy components use `React.lazy()`:

```tsx
const AbcGrandStaff = React.lazy(() => import('../components/MusicStaff/AbcGrandStaff'))
```

### Conditional Sections

SubmodulePage checks `submodule.sections` to show/hide UI:

```tsx
const hasSection = (section: string) => submodule?.sections.includes(section as never)
{hasSection('piano') && <VirtualPiano ... />}
```

### ABC Override Pattern

For lesson-specific notation:

```tsx
<AbcGrandStaff
  showNoteNames={showNoteNames}
  overrideAbc={submodule.staffAbc} // Bypasses recorded notes
/>
```

---

## Known Technical Debt

1. **Formatting/Prettier Issues** - Many files have eslint formatting warnings (not blocking builds)
2. **abcjs Types** - Some TypeScript workarounds for abcjs callback types
3. **No Tests** - Unit tests not yet implemented
4. **Bundle Size** - Main chunks exceed 500KB (could benefit from more code splitting)

---

## File Organization

```
src/
├── data/
│   └── course-data.ts      # Curriculum definition
├── stores/
│   ├── useProgressStore.ts # User progress (IndexedDB)
│   └── useAudioStore.ts    # Audio engine state
├── components/
│   └── modules/
│       ├── AbcDemoSection.tsx
│       └── NoteIdentificationQuiz.tsx
├── pages/
│   ├── SubmodulePage.tsx   # Dynamic lesson page
│   ├── PracticePage.tsx
│   └── ProfilePage.tsx
```
