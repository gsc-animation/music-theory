# Story 1.8: Time Signature & Rhythm Accuracy

## Context
The application currently renders all notes into a single measure, which causes VexFlow errors ("Too many ticks") when the number of notes exceeds the capacity of a single measure. Additionally, users need control over the time signature to accurately represent different rhythmic structures. The piano keyboard also requires visual refinement to ensure black keys are perfectly centered.

## User Story
**As a** music student,
**I want to** select a time signature (3/4 or 4/4) and have my played notes appear in correctly organized measures,
**So that** the sheet music looks correct and doesn't break when I play a long melody.

## Acceptance Criteria
1.  **Time Signature Selection:**
    *   UI control to toggle between "4/4" and "3/4" time signatures.
    *   The staff updates immediately to reflect the chosen time signature.
2.  **Measure Management (VexFlow):**
    *   Notes that exceed the duration of a single measure are automatically moved to a new measure.
    *   The "Too many ticks" VexFlow error is resolved by properly distributing notes across multiple measures (Systems).
    *   Currently assuming all played notes are Quarter notes (or simple default duration) for the sake of measure calculation, unless duration logic is already present.
3.  **Visual Polish:**
    *   Piano black keys are visually centered between their respective white keys.
    *   Staff renders cleanly without overlapping.

## Technical Notes
*   **MusicStaff Component:**
    *   Need to implement logic to chunk the `notes` array based on the `timeSignature` capacity (e.g., 4/4 = 4 quarter notes, 3/4 = 3 quarter notes).
    *   VexFlow `Factory.EasyScore` can handle multiple voices/staves, but we might need to use `System.addStave` repeatedly or configure `score.voice` to handle auto-beaming/measuring if supported, or manually split the string.
    *   Manual splitting is likely more robust: Calculate total ticks, split into arrays of notes per measure, render multiple staves/measures.
*   **Piano Key Positioning:**
    *   Re-calculate CSS `left` percentages for black keys to ensure mathematical precision (C# centered on 14.28%, etc.).

## Tasks
- [x] **Task 1: Time Signature State & UI**
    - [x] Add `timeSignature` to global store (or local state if preferred, but store is better for persistence).
    - [x] Create a `TimeSignatureSelector` component (or add to `ControlPanel`).
- [x] **Task 2: Implement Measure Splitting Logic**
    - [x] Create a utility function `distributeNotesToMeasures(notes: string[], timeSignature: string): string[][]`.
    - [x] Logic should handle simple note counting for now (assuming uniform duration) or tick counting if we support different durations.
- [x] **Task 3: Update MusicStaff Component**
    - [x] Refactor `MusicStaff.tsx` to render multiple measures (Staves) horizontally or wrap lines.
    - [x] Use VexFlow's `System` to add multiple staves if needed, or just draw multiple measures in one system.
    - [x] Handle the "Too many ticks" error gracefully.
- [x] **Task 4: Fix Piano Black Key Positioning**
    - [x] Audit `PianoKeyboard.tsx` CSS percentages.
    - [x] Apply precise values for 7-key octave layout.

## Definition of Done
- [x] Can switch between 3/4 and 4/4.
- [x] Playing 5 quarter notes in 4/4 results in 2 measures (4 in first, 1 in second).
- [x] No console errors from VexFlow.
- [x] Piano keys look correct.
- [x] Tests updated/added for measure splitting logic.

## Dev Agent Record
### Implementation Plan
- Added `timeSignature` to `useAudioStore`.
- Created `TimeSignatureSelector` component.
- Implemented `distributeNotesToMeasures` utility to split notes based on time signature.
- Updated `MusicStaff` to render multiple measures using VexFlow's System.
- Calculated precise CSS percentages for Piano black keys.

### Completion Notes
- **Time Signature**: User can toggle between 3/4 and 4/4.
- **Rhythm Accuracy**: Notes are distributed across measures to prevent VexFlow errors.
- **Visual Polish**: Piano keys are mathematically centered.
- **Tests**: Added tests for store, utility, and UI components. All tests passing.

## File List
- src/stores/useAudioStore.ts
- src/stores/useAudioStore.test.ts
- src/components/ui/TimeSignatureSelector.tsx
- src/components/ui/TimeSignatureSelector.test.tsx
- src/pages/HomePage.tsx
- src/utils/music-math.ts
- src/utils/music-math.test.ts
- src/features/sheet/components/MusicStaff.tsx
- src/features/piano/components/PianoKeyboard.tsx
- src/features/piano/components/PianoKeyboard.test.tsx
- src/pages/HomePage.test.tsx
- src/services/audio-engine.ts

## Change Log
- Added `TimeSignatureSelector` to HomePage with improved styling.
- Updated `MusicStaff` to handle multi-measure rendering with manual horizontal positioning.
- Refined `PianoKeyboard` black key positioning and added 300ms visual feedback.
- Added "Clear Staff" button to header.
- Implemented 4-measure capacity limit for staff.

## Status
done
