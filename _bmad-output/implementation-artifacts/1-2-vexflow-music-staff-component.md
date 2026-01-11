# Story 1.2: VexFlow Music Staff Component

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Student,
I want to see a musical staff that renders notes dynamically,
so that I can visualize the music I am learning.

## Acceptance Criteria

1. **Given** the application is loaded
   **When** I view the main screen
   **Then** I see a Treble Clef staff rendered via VexFlow
2. **And** passing a note prop (e.g., 'C4') renders the correct note on the staff
3. **And** the staff resizes responsively on mobile screens
4. **And** the component cleans up correctly (no duplicate SVGs on re-render)

## Tasks / Subtasks

- [x] Task 1: Create MusicStaff Component Structure
  - [x] Create `src/features/sheet/components/MusicStaff.tsx`
  - [x] Define props interface: `notes: string[]`, `clef?: string`, `timeSignature?: string`, `width?: number`
- [x] Task 2: Implement VexFlow Rendering Logic
  - [x] Initialize `VF.Renderer` attached to a `useRef` container
  - [x] Render a `Stave` (Treble clef, Time Signature)
  - [x] Implement `useEffect` to redraw when props change
  - [x] Handle note parsing: Convert string (e.g., "C4") to `VF.StaveNote`
- [x] Task 3: Implement Responsive Resizing
  - [x] Add `ResizeObserver` to container to detect width changes
  - [x] Trigger re-render with new width on resize
- [x] Task 4: Integration & Storybook/Demo
  - [x] Add `MusicStaff` to `HomePage.tsx` (or a demo section) with a hardcoded note to verify
  - [x] Ensure styling matches "Bamboo" theme (container sizing, centering)

## Dev Notes

### Architecture Compliance

- **Component Location:** `src/features/sheet/components/MusicStaff.tsx`
- **Library:** Use `vexflow` (standard package).
  - *Tip:* Import as `import { Factory, EasyScore, System } from 'vexflow'` or `import Vex from 'vexflow'`.
- **Rendering Pattern:**
  - VexFlow is imperative. Wrap it in a `useEffect`.
  - **CRITICAL:** Clear the container (`divRef.current.innerHTML = ''`) before drawing to avoid appending multiple SVGs.
- **Responsiveness:**
  - The staff must fit mobile screens (320px+).
  - Use `viewBox` scaling or simple redraw-on-resize. Redraw is safer for VexFlow.

### Technical Requirements

- **Props:**
  - `notes`: Array of keys (e.g., `['c/4', 'e/4', 'g/4']`).
  - `width`: Optional, defaults to container width.
- **Styling:**
  - Container: `w-full h-auto flex justify-center bg-ricePaper rounded-xl shadow-sm border border-warmWood/20`.
  - VexFlow Elements: Default black is fine, or style via VexFlow options to match `stoneGrey`.

### Visual Design (UX) Requirements

- **Theme:** The staff should sit inside a "Card" container (Rounded corners 12px-16px).
- **Colors:**
  - Background: `ricePaper` (#FAFAFA).
  - Border: Subtle `warmWood` (#8D6E63).

### Previous Story Intelligence (Story 1.1)

- **Tailwind v4:** Remember usage of standard class names.
- **Base UI:** Not strictly needed for the canvas itself, but the container can be a standard `div`.
- **Directory Structure:** Ensure `src/features/sheet/components/` exists.

### References

- [Architecture: Requirements Mapping](_bmad-output/planning-artifacts/architecture.md#requirements-to-structure-mapping)
- [UX: Spacing & Layout](_bmad-output/planning-artifacts/ux-design-specification.md#spacing--layout-foundation)

## Dev Agent Record

### Agent Model Used

gemini-2-pro-preview

### Debug Log References

- Encountered `IncompleteVoice` error with single note in 4/4 time. Fixed test case to use `c4/w` (whole note).
- JSDOM does not support `ResizeObserver`. Added global mock in `tests/setup.ts`.
- `ResizeObserver` mock required special `vi.fn()` handling to work with `new` keyword.
- Missing `test` script in `package.json`, added `vitest`.
- [Code Review] Fixed `IncompleteVoice` error for partial measures by disabling strict mode on Voice.
- [Code Review] Added debounce to `ResizeObserver` to improve performance.
- [Code Review] Updated tests to verifying single note rendering (`C4`) instead of whole note workaround.

### Completion Notes List

- Implemented `MusicStaff` component using VexFlow 5.0.0.
- Implemented responsive resizing using `ResizeObserver` (hooks into container width).
- Added `MusicStaff.test.tsx` with 3 test cases: render, VexFlow integration (SVG check), resize observation, and cleanup.
- Created `HomePage` to demonstrate the component.
- Updated `App.tsx` to route to `HomePage`.
- Configured Vitest global setup for `ResizeObserver`.
- Fixed critical rendering issue for partial measures (single notes) identified during review.

### File List

- src/features/sheet/components/MusicStaff.tsx
- src/features/sheet/components/MusicStaff.test.tsx
- src/pages/HomePage.tsx
- src/App.tsx
- tests/setup.ts
- package.json
