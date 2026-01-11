# Story 1.7: Enhanced Piano Range & Notation Recording
Status: done

## Story
As a Music Theory Student,
I want to play on a larger 3-octave keyboard and see my played notes recorded on the staff,
So that I can practice wider scales and see the notation history of what I just played.

## Acceptance Criteria
1. **Given** the Piano Keyboard is visible
   **When** I view the keyboard
   **Then** it displays 3 full octaves (e.g., C3 to B5) instead of just 1.

2. **Given** I am playing the piano
   **When** I press keys sequentially (e.g., C4, then E4, then G4)
   **Then** the Music Staff adds each note to the staff visualization in order (not just the currently held chord).

3. **Given** notes have been recorded on the staff
   **When** I click the "Clear" button
   **Then** the staff is reset to empty (or a rest) and the recorded history is cleared.

4. **Given** the Notation System toggle (Story 1.6)
   **When** I switch systems (Latin/Solfege)
   **Then** the staff rendering itself remains standard music notation (dots on lines), but any text labels (if present) respect the setting. (Note: Standard staff notation is universal, so VexFlow rendering doesn't change, but this confirms non-regression).

## Tasks
- [x] Task 1: Expand Piano Range
    - Update `HomePage.tsx` to set `PianoKeyboard` prop `octaves={3}` and `startOctave={3}`.
- [x] Task 2: Implement Note Recording State
    - Update `useAudioStore` to add `recordedNotes: string[]`.
    - Update `startNote` action to append the new note to `recordedNotes`.
    - Add `clearRecordedNotes()` action.
- [x] Task 3: Update Staff Visualization Logic
    - Modify `HomePage.tsx` to pass the `recordedNotes` list to `MusicStaff` instead of just `activeNotes`.
    - Ensure `activeNotes` (keys currently held down) are still highlighted or handled if possible, OR switch purely to "History Mode" where the staff acts as a record.
    - *Decision:* The staff should show the history of played notes.
- [x] Task 4: Add Clear Controls
    - Add a "Clear" button near the staff in `HomePage.tsx`.
    - Style it using the existing "Bamboo" design system.

## Technical Notes
- **VexFlow Rendering:** `MusicStaff` takes a list of notes. If `recordedNotes` gets too long, it might overflow.
    - *Constraint:* For this story, we will limit the display to the last N notes (e.g., 8 or 12) or allow it to wrap if `MusicStaff` supports it.
    - *Implementation:* The current `MusicStaff` wrapper uses `EasyScore` with `notes.join(', ')`. This works for sequential notes.
- **Octave Indexing:** C4 is middle C. 3 octaves starting at C3 gives a good range (C3-B5).

## Dev Agent Record
- **Date:** 2026-01-11
- **Status:** Completed
- **Notes:**
  - Implemented 3-octave keyboard range in `HomePage.tsx`.
  - Added `recordedNotes` state to `useAudioStore` to track played notes.
  - Updated `MusicStaff` to display the last 12 recorded notes.
  - Added a "Clear Staff" button to reset the history.
  - Added unit tests for `useAudioStore` recording logic.
  - Verified all tests pass.

## File List
- src/pages/HomePage.tsx
- src/stores/useAudioStore.ts
- src/services/audio-engine.ts

## Senior Developer Review (AI)
- **Date:** 2026-01-11
- **Findings:**
  - Identified potential VexFlow robustness issue where notes lacked explicit duration.
- **Fixes:**
  - Updated `HomePage.tsx` to explicitly append `/q` (quarter note) to recorded notes sent to `MusicStaff`.
  - Confirmed `src/services/audio-engine.ts` was part of the implementation context.
- **Status:** Approved
