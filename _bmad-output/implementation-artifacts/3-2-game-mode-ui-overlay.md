# Story 3.2: Game Mode UI Overlay

Status: done

## Story

As a Player,
I want to see my current target note and score,
So that I know what to play and how well I am doing.

## Acceptance Criteria

1.  **Game HUD Layout**:
    *   Displays "Target Note" clearly (visually rendered on the Staff).
    *   Displays "Score" and "Streak" counters in a dedicated HUD area.
    *   Layout is responsive (mobile-first), ensuring visibility without obscuring the staff or piano.
2.  **State Integration**:
    *   Connects to `useGameStore` to display real-time `score`, `streak`, and `targetNote`.
    *   Updates immediately when state changes.
3.  **Game Controls**:
    *   "Start Game" button (visible when `!isPlaying`).
    *   "Stop Game" button (visible when `isPlaying`).
    *   Start/Stop actions dispatch to `useGameStore`.
4.  **Visual Feedback (Basic)**:
    *   UI clearly indicates active game state (e.g., specific mode indicator or layout change).
5.  **Component Integration**:
    *   The `MusicStaff` component displays the `targetNote` when the game is active.
    *   The `PianoKeyboard` remains interactive for input.

## Tasks / Subtasks

- [x] **Task 1: Game HUD Component**
    - [x] Create `src/features/game/components/GameOverlay.tsx` (or `GameHUD.tsx`).
    - [x] Implement Score and Streak display using `useGameStore` selectors.
    - [x] Implement Start/Stop buttons with proper styling ("Bamboo" theme).
- [x] **Task 2: MusicStaff Integration**
    - [x] Modify `src/pages/HomePage.tsx` (or parent container) to pass `targetNote` to `MusicStaff` when `isPlaying` is true.
    - [x] Ensure `MusicStaff` correctly renders the target note.
    - [x] *Optimization*: Ensure `MusicStaff` uses `React.memo` or similar to avoid re-rendering if only the score changes (performance guardrail).
- [x] **Task 3: Page Integration**
    - [x] Integrate `GameOverlay` into `HomePage.tsx`.
    - [x] Ensure layout places HUD appropriately (e.g., top bar or overlay) without shifting layout unexpectedly.

## Dev Notes

### Architecture & Compliance
- **State Management**: Use **Zustand**.
    - **Critical**: Use granular selectors to prevent performance regressions.
    - Example: `const score = useGameStore(state => state.score)` instead of selecting the whole state.
- **Directory Structure**:
    - Components: `src/features/game/components/`
- **Styling**:
    - Use **Tailwind CSS**.
    - Maintain "Bamboo" theme (Warm Wood, Rice Paper colors).
    - Touch targets for buttons must be ≥ 48px (NFR8).

### Technical Details
- **Game Logic Flow**:
    - When `isPlaying` is true, `useGameStore.targetNote` is the source of truth for the Staff.
    - When `isPlaying` is false, the Staff might show user input or be empty (default behavior).
- **Performance**:
    - The Game HUD (Score/Streak) updates frequently. Isolate this from the VexFlow rendering (MusicStaff) to ensure 60FPS animations.
    - The `MusicStaff` should only re-render when `targetNote` changes, not when `score` changes.

### References
- [Story 3.1](3-1-game-state-management-zustand.md): Game State Store.
- [Epic 3](../planning-artifacts/epics.md): Gamified Note Trainer.
- [Architecture](../planning-artifacts/architecture.md): Performance patterns (Ref-Subscription vs State).

## Dev Agent Record

### Agent Model Used
Claude 3.5 Sonnet (via workflow)

### Completion Notes List
- [x] Created story file.
- [x] Ready for implementation.
- [x] Implemented GameOverlay component with HUD stats and controls.
- [x] Integrated GameOverlay into HomePage.
- [x] Updated MusicStaff to support highlightNote prop for game mode.
- [x] Integrated game store with MusicStaff and PianoKeyboard.
- [x] Added unit tests for GameOverlay.
- [x] Fixed issues found in code review (hardcoded strings, type safety).
- [x] Updated SaoTrucVisualizer.test.tsx to fix build issues and remove any types.

### File List
- src/features/game/components/GameOverlay.tsx
- src/features/game/components/GameOverlay.test.tsx
- src/pages/HomePage.tsx
- src/features/sheet/components/MusicStaff.tsx
- src/features/sao-truc/components/SaoTrucVisualizer.test.tsx
- src/constants/app-strings.ts
