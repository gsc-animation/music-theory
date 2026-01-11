# Story 2.2: Fingering Visualizer Component

Status: done

## Story

As a Learner,
I want to see a visual representation of the bamboo flute,
so that I can learn the finger placement.

## Acceptance Criteria

1.  **Component**: `FingeringChart` component created in `src/features/sao-truc/components/`.
2.  **Props**: Accepts `holes: HoleState[]` and `type: FluteType` (optional, default 6-hole).
3.  **Visualization**:
    *   Renders a vertical bamboo flute.
    *   Correctly visualizes 6 (or 10) holes.
    *   Visualizes Open (O), Closed (X), and Half-hole (H) states clearly.
    *   Closed holes should look "covered" (e.g., dark circle).
    *   Open holes should look "empty" (e.g., ring).
    *   Half holes should look half-covered.
4.  **Styling**: Matches the "Bamboo & Growth" visual theme (Bamboo Green, Warm Wood colors).

## Tasks

- [x] **Task 1: Component Scaffold**
    - [x] Create `src/features/sao-truc/components/FingeringChart.tsx`.
    - [x] Define props interface using `HoleState` from `../types`.
- [x] **Task 2: SVG Implementation**
    - [x] Implement SVG drawing for the flute body (bamboo texture/color).
    - [x] Implement SVG drawing for holes (circles).
- [x] **Task 3: Hole State Logic**
    - [x] Implement rendering logic for Open (Ring), Closed (Filled), Half (Half-filled) states.
    - [x] Handle 6-hole vs 10-hole layout (positioning).
- [x] **Task 4: Testing**
    - [x] Create `src/features/sao-truc/components/FingeringChart.test.tsx`.
    - [x] Verify component renders correct number of holes.
    - [x] Verify visual classes/attributes update based on props.

## Dev Notes

### Architecture & Compliance
- **Location**: `src/features/sao-truc/components/`.
- **Styling**: Tailwind CSS classes within SVG or wrapper.
    - Bamboo Body: `fill-bamboo/20` or similar? Or `warm-wood`? Real flute is bamboo (yellow/green) or wood.
    - "Bamboo & Growth" theme usually implies Green. But real Sáo Trúc is often light wood color.
    - Decision: Use `bg-warm-wood` for body, or a gradient.
- **Responsiveness**: SVG should scale. `viewBox` is key.

### Visual Design Details
- **Orientation**: Vertical is standard for fingering charts (Mouthpiece top, End bottom).
- **Hole Layout**:
    - Mouthpiece (blow hole) at top (usually not fingered).
    - 6 Finger holes below.
    - Distance between holes is roughly equal for visualization purposes.

### References
- [Epic 2](../planning-artifacts/epics.md): Visualizer context.
- [Design](../planning-artifacts/ux-design-specification.md): Theme colors.

## Senior Developer Review (AI)
- **Outcome**: Approved (with fixes)
- **Date**: 2026-01-11
- **Action Items Resolved**:
  - [x] Fixed 10-hole visualization (added dynamic SVG height).
  - [x] Added tests for Half-hole rendering.
  - [x] Added tests for 10-hole rendering.

## Dev Agent Record

### Agent Model Used
Claude 3.5 Sonnet

### Completion Notes List
- Implemented `FingeringChart` component using SVG for high-quality, scalable rendering.
- Visualized 6-hole flute with blow hole and 6 finger holes.
- Implemented visual states for Open (Ring), Closed (Filled), and Half-hole (Half-filled).
- Styled using Tailwind `warm-wood` and `rice-paper` theme colors.
- Verified rendering with unit tests.

### File List
- src/features/sao-truc/components/FingeringChart.tsx
- src/features/sao-truc/components/FingeringChart.test.tsx

## Change Log
- Initial creation of FingeringChart component.
