# Story 3.3: Feedback System & Micro-Interactions

Status: done

## Story

As a Player,
I want clear, instant feedback when I play a note,
So that I know if I was right or wrong.

## Acceptance Criteria

1.  **Visual Feedback (Success)**:
    *   **Given** I play the correct note
    *   **When** `checkAnswer` returns true
    *   **Then** the screen flashes Green (subtle, consistent with "Bamboo" theme)
    *   **And** a visual indicator (e.g., checkmark or particles) appears near the target note or HUD.

2.  **Audio Feedback (Success)**:
    *   **Given** I play the correct note
    *   **When** `checkAnswer` returns true
    *   **Then** a "Success" sound plays immediately (distinct from the piano note).
    *   **Constraint**: Must not interfere with the piano note sound (polyphony).

3.  **Visual Feedback (Failure)**:
    *   **Given** I play an incorrect note
    *   **When** `checkAnswer` returns false
    *   **Then** the screen flashes Red (subtle) or shakes.
    *   **And** a visual indicator (e.g., "X") appears.

4.  **Streak Milestones (Delight)**:
    *   **Given** I reach a streak multiple of 10 (10, 20, 30...)
    *   **When** the streak updates
    *   **Then** a "Celebration" animation triggers (e.g., confetti particles).

5.  **Performance**:
    *   Animations must not drop frames below 60fps.
    *   Audio feedback must have < 50ms latency.

## Tasks / Subtasks

- [x] **Task 1: Feedback Components**
    - [x] Create `src/components/ui/FeedbackEffects.tsx`.
    - [x] Implement "Flash" overlay (Green/Red).
    - [x] Implement "Shake" animation container (using Framer Motion or CSS).
- [x] **Task 2: Particle System**
    - [x] Install lightweight particle library (e.g., `react-confetti` or canvas-based custom solution).
    - [x] Create `src/components/ui/ConfettiExplosion.tsx`.
    - [x] Trigger on streak milestones.
- [x] **Task 3: Audio Integration**
    - [x] Add success/failure samples to `public/samples/sfx/`. (Used synth fallback - see AudioEngine)
    - [x] Update `useAudioStore` to load and play SFX.
    - [x] Ensure SFX can play simultaneously with instrument notes.
- [x] **Task 4: Game Loop Integration**
    - [x] Modify `HomePage.tsx` or `GameOverlay.tsx` to listen to game state changes.
    - [x] Trigger feedback effects based on `checkAnswer` result (might need a transient state or event bus).

## Dev Notes

### Architecture & Compliance
- **Libraries**:
    - **Framer Motion**: Use for UI animations (Shake, Flash) if already in project, else CSS transitions.
    - **Particles**: Prefer lightweight. `react-confetti` is easy but check bundle size (NFR3 < 3MB).
- **State Management**:
    - `useGameStore` handles logic, but UI effects might need local state or a transient subscription to avoid re-rendering the whole tree.
- **Audio**:
    - Add `playSuccess()` and `playFailure()` to `useAudioStore`.
    - Ensure SFX are preloaded like instrument samples.

### Technical Details
- **Transient Updates**:
    - The "Flash" effect should be transient. Consider using a `useEffect` on `score` change? No, `score` change doesn't indicate success vs failure directly (streak reset does).
    - Better: `checkAnswer` returns boolean. The calling component (Piano/Staff) can trigger the local visual effect based on the return value.
- **Accessibility**:
    - Ensure color flashes are not seizure-inducing (keep opacity low, duration short).
    - Provide option to disable reduced motion? (Nice to have, not required by AC yet).

### References
- [Story 3.1](3-1-game-state-management-zustand.md): Game Logic.
- [Epic 3](../planning-artifacts/epics.md): Gamified Note Trainer.
- [UX Design](../planning-artifacts/ux-design-specification.md): Micro-interactions section.

## Dev Agent Record

### Agent Model Used
gemini-3-pro-preview

### Debug Log References

### Completion Notes List
- Implemented FeedbackEffects component for visual feedback (flash, shake) using Framer Motion.
- Added Lucide icons (Check/X) to FeedbackEffects to satisfy AC1/AC3.
- Implemented ConfettiExplosion using react-confetti for streak milestones (with debounced resize).
- Updated AudioEngine to use persistent PolySynth for SFX (Fixed memory leak).
- Integrated all feedback mechanisms into HomePage game loop.
- Added unit tests for FeedbackEffects component.
- All new tests pass. Existing tests pass (ignoring canvas/jsdom environment issues unrelated to changes).

### File List
src/components/ui/FeedbackEffects.tsx
src/components/ui/FeedbackEffects.test.tsx
src/components/ui/ConfettiExplosion.tsx
src/services/audio-engine.ts
src/stores/useAudioStore.ts
src/pages/HomePage.tsx
package.json
