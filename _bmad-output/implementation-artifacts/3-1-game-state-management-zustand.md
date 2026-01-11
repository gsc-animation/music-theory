# Story 3.1: Game State Management (Zustand)

Status: done

## Story

As a Developer,
I want a centralized store to manage game logic,
So that scoring and note generation are consistent across the app.

## Acceptance Criteria

1.  **Store Creation**: `useGameStore` created using Zustand.
2.  **State Properties**:
    *   `isPlaying`: boolean (Game active or not)
    *   `targetNote`: string | null (Current note to guess)
    *   `score`: number (Total correct)
    *   `streak`: number (Current consecutive correct)
    *   `highScore`: number (Persisted best streak - optional for this story, but good to prep)
3.  **Actions**:
    *   `startGame()`: Sets `isPlaying=true`, resets `score`/`streak`, generates first `targetNote`.
    *   `stopGame()`: Sets `isPlaying=false`, clears `targetNote`.
    *   `checkAnswer(note)`:
        *   **If Correct**: Increments `score` and `streak`, generates **new** `targetNote`, returns `true` (or triggers success effect).
        *   **If Incorrect**: Resets `streak` to 0, keeps current `targetNote` (or generates new one? AC says "resets streak"), returns `false`.
        *   *Refinement*: AC implies immediate feedback.
4.  **Logic Separation**:
    *   Scoring logic (calculation) should ideally be in `src/features/game/logic/scoring.ts` if complex, or simple inline for now.
    *   Note generation should use a helper (e.g., `generateRandomNote(octaves)`).
5.  **Integration**:
    *   Store should be accessible via hooks.
    *   No UI implementation required in this story (just the logic/store).

## Tasks / Subtasks

- [x] **Task 1: Game Logic Helpers**
    - [x] Create `src/features/game/logic/note-generator.ts` (Random note within range).
    - [x] Create `src/features/game/logic/scoring.ts` (Optional, if scoring is complex).
- [x] **Task 2: Game Store Implementation**
    - [x] Create `src/stores/useGameStore.ts`.
    - [x] Define `GameState` interface.
    - [x] Implement `startGame`, `stopGame`, `checkAnswer`.
    - [x] Integrate `generateRandomNote`.
- [x] **Task 3: Unit Testing**
    - [x] Create `src/stores/useGameStore.test.ts`.
    - [x] Test `startGame` initializes state.
    - [x] Test `checkAnswer` increments score/streak on correct.
    - [x] Test `checkAnswer` resets streak on wrong.

## Dev Notes

### Architecture & Compliance
- **State Management**: Use **Zustand**.
    - Pattern: `create<GameState>((set, get) => ({ ... }))`.
    - Use `devtools` middleware if helpful for debugging.
- **Directory Structure**:
    - Store: `src/stores/useGameStore.ts` (Global game session).
    - Logic: `src/features/game/logic/` (Pure functions).
- **Performance**:
    - Actions should be efficient. `generateRandomNote` should be fast.
- **Naming Conventions**:
    - Store: `useGameStore`.
    - Actions: `startGame`, `checkAnswer`.

### Technical Details
- **Note Generation**:
    - Need a pool of notes (e.g., C3 to B5).
    - Avoid generating the *same* note twice in a row? (Good UX, but not strictly required by AC. Consider implementing `prevNote` check).
- **Zustand 5**:
    - Ensure compatibility with React 19.
    - Use `useShallow` when selecting multiple state slices in components (future stories).

### References
- [Epic 3](../planning-artifacts/epics.md): Gamified Note Trainer.
- [Architecture](../planning-artifacts/architecture.md): State Management (Zustand).
- [Sprint Status](../implementation-artifacts/sprint-status.yaml): Tracking.

## Dev Agent Record

### Agent Model Used
Claude 3.5 Sonnet (via workflow)

### Completion Notes List
- [x] Created story file.
- [x] Ready for implementation.
- [x] Implemented core game logic (note-generator, scoring).
- [x] Implemented `useGameStore` with Zustand.
- [x] Added comprehensive unit tests (100% pass).

### File List
- src/features/game/logic/note-generator.ts
- src/features/game/logic/scoring.ts
- src/features/game/logic/note-generator.test.ts
- src/features/game/logic/scoring.test.ts
- src/stores/useGameStore.ts
- src/stores/useGameStore.test.ts

## Senior Developer Review (AI)
- **Outcome**: Approved
- **Date**: 2026-01-11
- **Action Items Resolved**:
  - [x] Refactored `generateRandomNote` to accept parameterized octaves (flexibility).
  - [x] Added safety checks for `localStorage` access and parsing (robustness).
