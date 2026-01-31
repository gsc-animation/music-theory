# Architectural Decisions Record (ADR)

## ADR-001: Frontend Framework Selection
- **Decision:** Use **React** with **TypeScript** and **Vite**.
- **Context:** The application requires complex state management for interactive music theory lessons and real-time audio visualization.
- **Rationale:**
  - React's Virtual DOM is efficient for frequent UI updates (e.g., highlighting notes).
  - Huge ecosystem for audio (Tone.js wrappers) and notation (VexFlow wrappers).
  - TypeScript ensures type safety for complex musical data structures.
  - Vite offers superior dev experience and build performance compared to CRA/Webpack.
- **Alternatives Considered:** Vue.js (less VexFlow support), Angular (too heavy), Vanilla JS (too hard to maintain state).
- **Status:** Accepted.

## ADR-002: State Management Strategy
- **Decision:** Use **Zustand**.
- **Context:** We need to manage both global settings (volume, instrument) and high-frequency game state (current beat, cursor position).
- **Rationale:**
  - Redux is too boilerplate-heavy and can have performance overhead for high-frequency updates if not optimized carefully.
  - Context API causes too many re-renders.
  - Zustand is lightweight, supports transient updates (subscribing to state slices without re-rendering components), which is crucial for the game loop.
- **Status:** Accepted.

## ADR-003: Audio Engine
- **Decision:** Use **Tone.js**.
- **Context:** Direct Web Audio API is powerful but verbose and error-prone for scheduling.
- **Rationale:**
  - Provides a robust `Transport` for scheduling events.
  - Built-in `Sampler` simplifies loading/pitch-shifting instrument samples.
  - `Tone.Draw` simplifies syncing visual events with audio.
- **Status:** Accepted.

## ADR-004: Music Notation Rendering
- **Decision:** Use **VexFlow** with **SVG** output.
- **Context:** We need to render professional-grade sheet music that is interactive.
- **Rationale:**
  - Industry standard for web-based notation.
  - SVG allows attaching DOM event listeners (click, hover) to individual notes, essential for interactive exercises. Canvas would require complex coordinate mapping.
- **Status:** Accepted.

## ADR-005: Mobile Latency Handling
- **Decision:** Implement **"Unlock Audio" strategy** and **Lookahead Scheduling**.
- **Context:** Mobile browsers block auto-playing audio and have high input latency.
- **Rationale:**
  - Must capture the first user interaction (touch) to resume the `AudioContext`.
  - Lookahead scheduling (scheduling audio events ~100ms in the future) decouples audio timing from the main thread's visual jitter, ensuring rhythmic precision.
- **Status:** Accepted.

## ADR-006: Sáo Trúc Fingering Visualization
- **Decision:** Build a custom **SVG Component Engine**.
- **Context:** No existing libraries support Vietnamese bamboo flute fingering charts (especially half-holing).
- **Rationale:**
  - SVG allows precise control over shapes (circles, half-circles) and styling.
  - Lightweight and scalable compared to using static images for every possible fingering combination.
- **Status:** Accepted.
