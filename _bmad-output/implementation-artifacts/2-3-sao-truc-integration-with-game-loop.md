# Story 2.3: Sáo Trúc Integration with Game Loop

Status: done

## Story

As a Learner,
I want the flute chart to update when I play notes on the piano or see them on the staff,
so that I can cross-reference the sound with the fingering.

## Acceptance Criteria

1.  **Component**: `SaoTrucVisualizer` container component created in `src/features/sao-truc/components/`.
2.  **Integration**:
    *   Connects to `useAudioStore` to listen for `activeNotes`.
    *   Determines the note to display (e.g., the last/most recent active note).
    *   Uses `getFingering` from `fingering-engine` to convert the note to hole states.
    *   Passes hole states to `FingeringChart`.
3.  **User Interface**:
    *   Displays the `FingeringChart`.
    *   Includes a toggle/selector for Flute Type (6-hole vs 10-hole).
    *   Shows the name of the note being fingered (optional but helpful).
4.  **Behavior**:
    *   **Given** I play a note on the Piano (Story 1.4), **Then** the Flute chart updates immediately to show the fingering for that note.
    *   **Given** I switch the flute type, **Then** the fingering updates for the *same* note (if applicable).
    *   **Given** no note is playing, **Then** it shows a default state (e.g., all open, or last note, or specific "rest" state).

## Tasks / Subtasks

- [x] **Task 1: Create Container Component**
    - [x] Create `src/features/sao-truc/components/SaoTrucVisualizer.tsx`.
    - [x] Implement `activeNotes` subscription from `useAudioStore`.
    - [x] Implement local state for `fluteType` ('6-hole' | '10-hole').
- [x] **Task 2: Implement Logic Binding**
    - [x] Import `getFingering` from `../logic/fingering-engine`.
    - [x] Logic to select the "current" note from `activeNotes` (handle chords by picking last/highest).
    - [x] Handle null/undefined fingering (e.g., note out of range).
- [x] **Task 3: UI Implementation**
    - [x] Render `FingeringChart` with calculated holes.
    - [x] Add Flute Type toggle button(s).
    - [x] Style the container (positioning, background).
- [x] **Task 4: Integration Demo**
    - [x] Add `SaoTrucVisualizer` to `src/pages/HomePage.tsx` (or appropriate layout) to verify integration with Piano/Staff.
- [x] **Task 5: Testing**
    - [x] Create `src/features/sao-truc/components/SaoTrucVisualizer.test.tsx`.
    - [x] Test integration with mock store (verify updates when activeNotes changes).
    - [x] Test flute type toggle.

## Dev Notes

### Architecture & Compliance
- **State Management**: `useAudioStore` is the source of truth for "what is playing".
- **Logic Isolation**: Keep the "which holes to close" logic in `fingering-engine.ts`, the component just calls it.
- **Performance**:
    - `useAudioStore` subscription should be selective if possible, or component is light enough to re-render.
    - `getFingering` is cheap (JSON lookup).

### Technical Details
- **Monophonic Nature**: Sáo Trúc is monophonic. The Piano is polyphonic.
    - **Strategy**: If `activeNotes.length > 0`, take `activeNotes[activeNotes.length - 1]` (most recently played) OR sort by pitch and take highest?
    - **Decision**: Most recently played (last in array) usually feels most natural for "following along".
- **Range**:
    - 6-hole: C4-C6 (Diatonic+).
    - 10-hole: Chromatic.
    - If a note is out of range, `getFingering` returns null. We should handle this (show nothing or "invalid" state).

### References
- [Story 2.1](../implementation-artifacts/2-1-sao-truc-data-model-fingering-charts.md): Data model source.
- [Story 2.2](../implementation-artifacts/2-2-fingering-visualizer-component.md): Visualizer component source.
- [Architecture](../planning-artifacts/architecture.md): Store pattern.

## Senior Developer Review (AI)
- **Outcome**: Approved (with fixes)
- **Date**: 2026-01-11
- **Action Items Resolved**:
  - [x] Fixed misleading UI state for out-of-range notes (now shows "Out of Range").
  - [x] Fixed infinite loop in tests caused by unstable mock references.

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet

### Completion Notes List
- Implemented `SaoTrucVisualizer` container component connected to `useAudioStore`.
- Implemented logic to display the most recently played note on the fingering chart.
- Added toggle for 6-hole/10-hole flute types.
- Integrated the visualizer into the `HomePage` alongside the Music Staff.
- Added comprehensive unit tests for the visualizer container.

### File List
- src/features/sao-truc/components/SaoTrucVisualizer.tsx
- src/features/sao-truc/components/SaoTrucVisualizer.test.tsx
- src/pages/HomePage.tsx
