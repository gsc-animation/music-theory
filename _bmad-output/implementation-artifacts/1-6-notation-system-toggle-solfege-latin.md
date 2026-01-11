# Story 1.6: Notation System Toggle (Solfège/Latin)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Vietnamese Learner,
I want to toggle between "Do-Re-Mi" and "C-D-E" labels,
So that I can use the system I am familiar with.

## Acceptance Criteria

1. **Given** the "Rosetta Stone" toggle is visible on the screen
   **When** I switch the toggle to "Solfège"
   **Then** all piano keys displaying "C, D, E..." update to show "Do, Re, Mi..."
2. **And** when I switch it back to "Latin"
   **Then** the labels revert to "C, D, E..."
3. **And** the preference is saved to `localStorage` immediately
   **So that** if I reload the page, my preferred notation system is remembered
4. **And** the toggle is accessible and has a minimum touch target of 48x48px
5. **And** the notation change applies globally to any other components displaying note names (e.g., Target Note in Game Mode, future Fretboard)

## Tasks / Subtasks

- [x] Task 1: Implement `useSettingsStore` with Persistence
  - [x] Create `src/stores/useSettingsStore.ts` using Zustand
  - [x] Define state: `notationSystem: 'latin' | 'solfege'`
  - [x] Implement actions: `setNotationSystem(system)` and `toggleNotationSystem()`
  - [x] Add `persist` middleware to save to `localStorage` key `'music-theory-settings'`
  - [x] Add unit tests for the store
- [x] Task 2: Create Note Label Logic
  - [x] Create `src/utils/note-labels.ts` (or `src/features/notation/logic/note-labels.ts`)
  - [x] Implement `getNoteLabel(note: string, system: NotationSystem): string`
  - [x] Handle conversion: 'C' -> 'Do', 'D' -> 'Re', 'E' -> 'Mi', 'F' -> 'Fa', 'G' -> 'Sol', 'A' -> 'La', 'B' -> 'Si'
  - [x] Support scientific notation preservation if needed (e.g., 'C4' -> 'Do4' or just 'Do') - *Decision: Just Note Name for Piano Keys usually, but handle both.*
  - [x] Add unit tests for conversion logic
- [x] Task 3: Create `NotationToggle` Component
  - [x] Create `src/components/ui/NotationToggle.tsx`
  - [x] Use Headless UI Switch or simple Button implementation styled with Tailwind
  - [x] Ensure 48x48px touch target
  - [x] Bind to `useSettingsStore`
  - [x] Place in `MainLayout` or `HomePage` header area
- [x] Task 4: Update `PianoKey` to Support Localization
  - [x] Update `src/features/piano/components/PianoKey.tsx`
  - [x] Subscribe to `useSettingsStore.notationSystem`
  - [x] Use `getNoteLabel` to render the text
  - [x] Verify `memo` optimization isn't broken (props vs store subscription) - *Hint: Subscription inside component triggers re-render, which is intended.*
- [x] Task 5: Integration & Verification
  - [x] Verify persistence works across reloads
  - [x] Verify latency impact is negligible
  - [x] Run full test suite

## Dev Notes

### Architecture Compliance

- **State Management:** Use `useSettingsStore` for user preferences. Keep it separate from `useAudioStore` (transient audio state).
- **Persistence:** Use Zustand `persist` middleware.
- **Folder Structure:**
  - Logic: `src/utils/note-labels.ts` (Shared utility) OR `src/features/notation/logic` if we treat Notation as a feature. *Recommendation: `src/utils/note-labels.ts` for broad reuse.*
  - Component: `src/components/ui/NotationToggle.tsx` (Generic UI) or `src/features/settings/components/NotationToggle.tsx`.
- **Naming:**
  - Store: `useSettingsStore`
  - Component: `NotationToggle`
- **Performance:**
  - `PianoKey` re-renders on toggle are acceptable (infrequent action).
  - Ensure `localStorage` writes are synchronous but fast. Zustand `persist` handles this.

### Technical Requirements

- **Vietnamese Solfège Mapping:**
  - C -> Do
  - D -> Re
  - E -> Mi
  - F -> Fa
  - G -> Sol
  - A -> La
  - B -> Si (Note: Use 'Si', not 'Ti', for Vietnamese context)
  - Sharps/Flats: C# -> Do# / Do Thăng? *Decision: Keep simple '#' for now unless 'Thăng' is requested. MVP uses Symbols.*\
- **Zustand Persist:**
  - `create(persist((set) => ({ ... }), { name: 'music-theory-settings' }))`

### Previous Story Intelligence (Story 1.5)

- **PianoKey:** Recently refactored to use Pointer Events. Be careful not to break the `onPointerDown`/`Up` handlers when editing the label rendering.
- **Performance:** 1.5 focused on Audio-Visual Sync. Changing the label string in `PianoKey` shouldn't affect audio latency, but verify.

### References

- [Architecture: State Management](_bmad-output/planning-artifacts/architecture.md#core-architectural-decisions)
- [UX Design: Rosetta Stone](_bmad-output/planning-artifacts/ux-design-specification.md#effortless-interactions)
- [PRD: Localization Engine](_bmad-output/planning-artifacts/prd.md#journey-requirements-summary)

## Dev Agent Record

### Agent Model Used

gemini-3-pro-preview

### Debug Log References

### Completion Notes List

- Implemented `useSettingsStore` with persistence middleware and full test coverage.

### File List

- src/stores/useSettingsStore.ts
- src/stores/useSettingsStore.test.ts
- src/utils/note-labels.ts
- src/utils/note-labels.test.ts
- src/components/ui/NotationToggle.tsx
- src/components/ui/NotationToggle.test.tsx
- src/pages/HomePage.tsx
- tests/integration/NotationSystem.test.tsx
- src/features/piano/components/PianoKey.tsx
- src/features/piano/components/PianoKey.test.tsx
- src/constants/app-strings.ts
