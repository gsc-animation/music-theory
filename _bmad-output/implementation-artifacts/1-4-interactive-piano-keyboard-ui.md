# Story 1.4: Interactive Piano Keyboard UI

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Student,
I want a virtual piano keyboard that I can tap,
so that I can play notes.

## Acceptance Criteria

1. **Given** the Piano component is rendered
   **When** I view the screen
   **Then** I see a single-octave piano keyboard (C4-C5 range initially)
2. **And** the white keys and black keys are visually distinct according to the "Bamboo" design system
3. **When** I tap/click a key
   **Then** the key visually depresses (active state) instantly
4. **And** the `playNote` action is dispatched to `useAudioStore` with the correct note pitch
5. **And** the touch target for each key is at least 48x48px (physically larger for white keys)
6. **And** releasing the key reverts the visual state
7. **And** the keyboard is responsive and usable on mobile portrait screens

## Tasks / Subtasks

- [x] Task 1: Create Reusable Piano Key Component
  - [x] Create `src/features/piano/components/PianoKey.tsx`
  - [x] Implement props: `note`, `type` (white/black), `label` (optional)
  - [x] Style with Tailwind CSS using "Bamboo" palette (White keys: Rice Paper, Black keys: Warm Wood/Dark)
  - [x] Add active state styles (pseudo-class `:active` and class-based toggle)
  - [x] **Crucial:** Implement `onPointerDown` / `onPointerUp` / `onPointerLeave` handlers for responsiveness (avoid just `onClick` which is slow on mobile)
- [x] Task 2: Implement Piano Keyboard Layout
  - [x] Create `src/features/piano/components/PianoKeyboard.tsx`
  - [x] Define octaves data structure (C4 to B4)
  - [x] Render keys in correct flex/grid layout
  - [x] Handle black key positioning (absolute positioning over white keys or CSS grid overlap)
- [x] Task 3: Integrate with Audio Store
  - [x] Connect `PianoKey` to `useAudioStore`
  - [x] Dispatch `triggerNote` on interaction
- [x] Task 4: Responsive & Touch Optimization
  - [x] Verify 48px touch targets
  - [x] Prevent default touch actions (scrolling/selection) on the keyboard area (`touch-action: none`)
  - [x] Test multi-touch support (optional but good for chords)

## Dev Notes

### Architecture Compliance

- **Component Location:** `src/features/piano/components/`
  - **Pattern:** Feature-based organization.
- **State Management:** Connect to `useAudioStore`. Do NOT import `audioEngine` directly.
- **Styling:** Tailwind CSS. Use `bg-ricePaper` for white keys, `bg-warmWood` (or darker variant) for black keys.
  - **Active State:** Use `active:bg-bambooGreen` or similar visual feedback for "pressed" state.

### Technical Requirements

- **Input Handling:** Use Pointer Events (`onPointerDown`, `onPointerUp`, `onPointerLeave`, `onPointerEnter` if dragging) instead of Mouse/Touch events for unified handling.
- **Responsiveness:**
  - White keys should share available width equally.
  - Black keys should be positioned relative to white keys (standard piano geometry: between C-D, D-E, F-G, G-A, A-B).
  - **CSS Grid** is recommended for overlapping keys, or absolute positioning of black keys within a relative container.
- **Latency:** Visual feedback must be CSS-based (no React state wait) for perceived instant response.

### Visual Design (UX) Requirements

- **Look & Feel:** "Bamboo" aesthetic.
  - White keys: Rounded bottom corners, slight shadow/depth.
  - Black keys: "Ebony" wood look, shorter than white keys.
- **Touch Targets:**
  - Mobile portrait: Keys must be tall enough to hit easily.
  - Disable browser zooming/panning on the keyboard container.

### Previous Story Intelligence (Story 1.3)

- **Store Usage:** `useAudioStore` is ready. Use `triggerNote(note)`.
- **String Management:** Maintain the pattern of extracting strings to constants if labels are added (e.g., key labels).
- **Testing:** `vi.mock` the store in tests as established in 1.3.

### References

- [Architecture: Feature-Folder Pattern](_bmad-output/planning-artifacts/architecture.md#core-patterns)
- [UX: Touch Targets](_bmad-output/planning-artifacts/ux-design-specification.md#spacing--layout-foundation)
- [Project Context](_bmad-output/project-context.md)

## Dev Agent Record

### Agent Model Used

gemini-2-pro-preview

### Debug Log References

- Fixed broken tests in Story 1.3 due to missing import in `AudioUnlocker` caused by the refactor in the previous step.
- Implemented `PianoKey` using Pointer Events for unified touch/mouse handling.
- Implemented `PianoKeyboard` using a layered approach (flex for white keys, absolute for black keys) to ensure correct visual stacking and spacing.
- Integrated `PianoKeyboard` into `HomePage` and connected it to `useAudioStore`.
- Verified 100% test pass rate for all new and existing components.

### Completion Notes List

- Created `PianoKey` component with "Bamboo" styling and active state feedback.
- Created `PianoKeyboard` component that renders a scalable octave of keys.
- Integrated the keyboard into the `HomePage` for user interaction.
- Verified responsiveness and touch handling.
- All tests passing.

### File List

- src/features/piano/components/PianoKey.tsx
- src/features/piano/components/PianoKeyboard.tsx
- src/features/piano/components/PianoKey.test.tsx
- src/features/piano/components/PianoKeyboard.test.tsx
- src/pages/HomePage.tsx
- src/features/audio/components/AudioUnlocker.tsx
- src/features/audio/components/AudioUnlocker.test.tsx
