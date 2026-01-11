# Code Review Attack Plan: Story 1.8

## Story Context
**Story**: 1.8 Time Signature & Rhythm Accuracy
**Goal**: Implement 3/4 and 4/4 time signature switching, ensure notes split into measures correctly to avoid VexFlow errors, and refine piano key visual precision.

## Risk Analysis
1.  **Algorithmic Complexity (High)**: `distributeNotesToMeasures` is a new core logic component. Errors here will break the entire staff rendering.
    *   *Risk*: Off-by-one errors in splitting logic.
    *   *Risk*: Handling of empty arrays or invalid note strings.
2.  **Rendering Stability (Medium)**: VexFlow integration in `MusicStaff.tsx` is complex.
    *   *Risk*: `useEffect` dependencies causing infinite render loops or memory leaks.
    *   *Risk*: `System.addStave` usage might not clean up correctly on re-renders.
3.  **State Management (Low)**: `useAudioStore` changes are simple, but side effects (clearing notes vs keeping them) when switching signatures need verification.
4.  **Visual Precision (Low)**: CSS percentages in `PianoKeyboard` are static but critical for polish.

## Targeted Areas
1.  **`src/utils/music-math.ts`**:
    *   Scrutinize `distributeNotesToMeasures`. Does it assume all notes are quarter notes? (Story implication: yes ("w" duration or simple counting), but need to verify robustness).
    *   Check for bounds checking.
2.  **`src/features/sheet/components/MusicStaff.tsx`**:
    *   Review `useEffect` cleanup.
    *   Verify `voice.setStrict(false)` usage - is it masking legitimate errors?
    *   Check how it handles an empty `measures` array.
3.  **`src/features/piano/components/PianoKeyboard.tsx`**:
    *   Verify the decimal precision math.
4.  **Unlisted Changes**:
    *   `src/pages/HomePage.test.tsx`: Verify the test changes align with intended behavior (persistence vs reset).
    *   `src/services/audio-engine.ts`: Verify the type fix is safe.

## Adversarial Strategies
1.  **"The Overflower"**: What happens if I have 5 notes in the state and switch from 4/4 to 3/4? Do we get 2 measures (3+2)?
2.  **"The Ghost Note"**: Does `distributeNotesToMeasures` crash on empty input or malformed strings?
3.  **"The Rounding Error"**: Do the piano keys drift visually on different screen sizes (checking `calc` vs `%`)?
4.  **"The Type Lie"**: Is the `Tone.BaseContext` fix hiding a deeper version mismatch issue?

## Review Checklist
- [ ] `distributeNotesToMeasures` pure function tests.
- [ ] VexFlow resource cleanup.
- [ ] CSS precision check.
- [ ] Verify test coverage for the "unlisted" files.
