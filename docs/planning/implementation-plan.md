# Implementation Plan

## Phase 1: Core Foundation & Audio Engine (Week 1)
**Goal:** Establish the project structure, audio context, and basic instrument playback.

- [ ] **Task 1.1: Project Initialization & Architecture Setup**
  - Set up folder structure (`src/components`, `src/hooks`, `src/stores`, `src/services`).
  - Configure path aliases (e.g., `@/components`).
  - Set up standard code quality tools (ESLint, Prettier).
- [ ] **Task 1.2: VexFlow Music Staff Component**
  - Create `MusicStaff` component using VexFlow.
  - Implement basic prop interface: `notes: Note[]`, `width`, `timeSignature`.
  - Ensure responsive resizing.
- [ ] **Task 1.3: Audio Engine Singleton & Unlock Strategy**
  - Implement `AudioContextManager` service.
  - Create `useAudioContext` hook.
  - Implement "unlock" mechanism on first user interaction (button click/touch).
- [ ] **Task 1.4: Instrument Sampler & Basic Playback**
  - Implement `InstrumentSampler` using Tone.js.
  - Load a basic Piano sample set.
  - Create `useInstrument` hook to trigger notes.
- [ ] **Task 1.5: Interactive Piano Keyboard UI**
  - Build `VirtualPiano` component.
  - Handle touch events for multi-touch support.
  - Connect UI events to `useInstrument` to play sounds.

## Phase 2: Synchronization & Notation Logic (Week 2)
**Goal:** Synchronize audio playback with visual notation and implement the core game loop.

- [ ] **Task 2.1: Audio-Visual Synchronization (The Loop)**
  - Implement `LookaheadScheduler` logic using `Tone.Transport`.
  - Create a "Play" button that starts the transport.
  - Sync a visual cursor moving across the `MusicStaff` with the beat.
- [ ] **Task 2.2: Notation System Toggle (Solfège / Latin)**
  - Create `useSettingsStore` with `notationSystem` ('solfege' | 'latin').
  - Implement a helper function `formatNoteName(note, system)` to display notes correctly.
  - Add a settings UI to toggle between systems.
- [ ] **Task 2.3: Enhanced Piano Range & Notation Recording**
  - Expand `VirtualPiano` to support scrolling/range selection.
  - Implement "Record" mode: user plays piano, notes appear on `MusicStaff`.
- [ ] **Task 2.4: Rhythm Accuracy Check**
  - Implement logic to compare played timing vs. expected timing.
  - visual feedback (green/red) on the note heads.

## Phase 3: Sáo Trúc & Advanced Instruments (Week 3)
**Goal:** Implement the specialized Sáo Trúc visualizer and guitar fretboard.

- [ ] **Task 3.1: Sáo Trúc Data Model & Fingering Charts**
  - Define data structure for Sáo fingerings (6-hole / 10-hole).
  - Create a mapping of `Note -> FingeringConfig`.
- [ ] **Task 3.2: Fingering Visualizer Component**
  - Build `SaoTrucVisualizer` SVG component.
  - Implement props for `open`, `closed`, `half-closed` holes.
- [ ] **Task 3.3: Sáo Trúc Integration with Game Loop**
  - Display the fingering chart dynamically as the song plays.
- [ ] **Task 3.4: Virtual Guitar Fretboard**
  - Build `VirtualGuitar` component.
  - Implement logic to show notes based on selected string/fret.

## Phase 4: Polish & Performance (Week 4)
**Goal:** Optimize for mobile, PWA features, and offline support.

- [ ] **Task 4.1: PWA Manifest & Installability**
  - Configure `vite-plugin-pwa`.
  - Add icons and manifest file.
- [ ] **Task 4.2: Service Worker Caching Strategy**
  - Configure Workbox to cache audio samples and assets.
  - Test offline functionality.
- [ ] **Task 4.3: Performance Bundle Optimization**
  - Analyze bundle size.
  - Implement code splitting (lazy load heavy components like complex lessons).
  - Optimize re-renders with `memo` and `useCallback`.
