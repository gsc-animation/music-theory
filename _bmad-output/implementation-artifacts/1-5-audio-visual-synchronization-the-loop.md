# Story 1.5: Audio-Visual Synchronization (The Loop)

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Student,
I want the staff to update instantly when I play a piano key,
so that I can connect the sound to the symbol.

## Acceptance Criteria

1. **Given** the app is running
   **When** I press a key on the virtual piano
   **Then** the corresponding note appears on the `MusicStaff` component instantly
2. **And** the note remains visible while the key is held
3. **And** releasing the key removes the note from the staff (or updates to show nothing/rest)
4. **And** the audio plays simultaneously with the visual update (<50ms latency)
5. **And** if I press multiple keys (chords), all notes appear on the staff (optional but good for robustness)
6. **And** the integration uses `useAudioStore` as the single source of truth for "currently playing notes"

## Tasks / Subtasks

- [x] Task 1: Update `useAudioStore` for State Tracking
  - [x] Add `activeNotes: string[]` to the store state
  - [x] Implement `startNote(note: string)` action: Play sound (Tone.js) AND add to `activeNotes`
  - [x] Implement `stopNote(note: string)` action: Stop sound (Tone.js release) AND remove from `activeNotes`
  - [x] Ensure actions handles duplicates (Set-like behavior)
  - [x] Update tests for `useAudioStore`
- [x] Task 2: Update `PianoKey` Component
  - [x] Refactor interaction handlers to call `startNote` on `onPointerDown`
  - [x] Refactor interaction handlers to call `stopNote` on `onPointerUp` / `onPointerLeave`
  - [x] Ensure visual "pressed" state matches the store state (subscribe to `activeNotes` or keep local if faster, but store is source of truth)
- [x] Task 3: Integrate Staff with Audio Store
  - [x] Create a container or update `HomePage` to subscribe to `useAudioStore.activeNotes`
  - [x] Pass `activeNotes` prop to `MusicStaff`
  - [x] Verify `MusicStaff` re-renders correctly when props change
- [x] Task 4: Performance Verification
  - [x] Verify no "double plays" or audio glitches
  - [x] Verify latency is imperceptible (React Profiler)

## Dev Notes

### Architecture Compliance

- **State Management:** The `useAudioStore` is the **central hub**.
  - **Pattern:** `Piano` (Input) -> `Store` (State+Audio) -> `Staff` (Output).
  - Do NOT wire Piano directly to Staff.
- **Performance:**
  - `MusicStaff` uses `useEffect` to redraw. This is fast enough for single notes.
  - If latency is an issue, consider `useRef` subscription (Transient Updates) but likely overkill for this specific story unless `MusicStaff` is heavy.
  - Ensure `stopNote` triggers `triggerRelease` in Tone.js to prevent "stuck" notes.

### Technical Requirements

- **Tone.js Integration:**
  - `startNote`: `synth.triggerAttack(note)`
  - `stopNote`: `synth.triggerRelease(note)` (or `triggerAttackRelease` if just a tap, but for "hold", use Attack/Release pair).
  - *Correction:* Story 1.3 might have implemented `playNote` as `triggerAttackRelease`. If we want "hold" behavior, we need separate Attack/Release. Check `audio-engine.ts` capabilities. If only `playNote` exists, refactor to support `start/stop`.
- **Note Formatting:** `PianoKey` usually sends `C4`. `MusicStaff` (VexFlow) expects `c/4`.
  - Ensure `note-converter.ts` (if exists) or utility function handles `C4` -> `c/4` conversion before passing to `MusicStaff`.
  - *Previous Story Note:* `MusicStaff` Task 2 mentioned "Handle note parsing: Convert string (e.g., 'C4') to `VF.StaveNote`". So `MusicStaff` handles it.

### Previous Story Intelligence (Story 1.2 & 1.4)

- **MusicStaff (1.2):** Already handles `notes` prop change via `useEffect`. Clean up is handled.
- **PianoKey (1.4):** Uses Pointer Events. Ensure `onPointerLeave` handles the "slide off" case to stop the note.
- **Git History:** Recent refactors improved touch targets. Keep this in mind.

### References

- [Architecture: Audio Pattern](_bmad-output/planning-artifacts/architecture.md#core-patterns)
- [Story 1.2: MusicStaff](_bmad-output/implementation-artifacts/1-2-vexflow-music-staff-component.md)
- [Story 1.4: PianoKey](_bmad-output/implementation-artifacts/1-4-interactive-piano-keyboard-ui.md)

## Dev Agent Record

### Agent Model Used

gemini-3-pro-preview

### Debug Log References

- Fixed `Maximum update depth exceeded` error in `HomePage` by splitting `useAudioStore` selector into individual hooks to avoid object identity changes triggering re-renders.
- Updated `useAudioStore` to include `startNote` and `stopNote` methods for fine-grained control, replacing `triggerNote` usage in `PianoKeyboard`.
- Created `note-converter.ts` to bridge the gap between `PianoKey` output ("C4") and VexFlow input ("c4/w").
- Added `HomePage.test.tsx` to verify integration between Piano, Store, and Staff.

### Completion Notes List

- Implemented `activeNotes` state in `useAudioStore` to track currently played notes.
- Updated `AudioEngine` to support `startNote` (triggerAttack) and `stopNote` (triggerRelease) for sustained notes.
- Updated `PianoKey` and `PianoKeyboard` to use `onPointerDown`/`Up` to trigger start/stop actions, enabling "hold" behavior.
- Integrated `MusicStaff` in `HomePage` to display `activeNotes` in real-time.
- Verified all new and existing tests pass.

### File List

- src/stores/useAudioStore.ts
- src/stores/useAudioStore.test.ts
- src/services/audio-engine.ts
- src/services/audio-engine.test.ts
- src/features/piano/components/PianoKey.tsx
- src/features/piano/components/PianoKey.test.tsx
- src/features/piano/components/PianoKeyboard.tsx
- src/features/piano/components/PianoKeyboard.test.tsx
- src/pages/HomePage.tsx
- src/pages/HomePage.test.tsx

## Senior Developer Review (AI)

**Outcome:** Approve

**Review Date:** 2026-01-11

**Findings:**
- **Medium (Chords):** `MusicStaff` logic for chord rendering was corrected in `HomePage.tsx` to use VexFlow chord syntax `(c4 e4)/w`.
- **Medium (Legacy Code):** `triggerNote` and `currentNote` were removed from `useAudioStore` to prevent technical debt.
- **Medium (Untracked Files):** New test file `HomePage.test.tsx` was created. `note-converter.ts` was deleted as it was refactored into inline logic.

**Resolution:**
- All High/Medium issues fixed.
- Tests passed (29 tests).
- Story marked as done.

## Change Log

- 2026-01-11: Implemented Audio-Visual Sync loop.
- 2026-01-11: Addressed code review findings (Chords logic, Store cleanup).
