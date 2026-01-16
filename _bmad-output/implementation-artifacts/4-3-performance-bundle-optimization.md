# Story 4.3: Performance & Bundle Optimization

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User on a slow phone,
I want the app to open instantly,
So that I don't get frustrated waiting.

## Acceptance Criteria

1.  **Bundle Size**: The initial entry JavaScript bundle (parsed on main thread) is < 3MB (ideally < 1MB for core shell).
2.  **Code Splitting**: Large libraries (`tone`, `vexflow`) are separated into their own chunks or lazy-loaded.
3.  **Lighthouse Score**: The "Performance" category in Lighthouse scores > 90 on Mobile simulation.
4.  **Visual Stability**: Cumulative Layout Shift (CLS) is < 0.1.
5.  **Responsiveness**: First Input Delay (FID) / Interaction to Next Paint (INP) is optimized (no long tasks > 200ms on startup).

## Tasks / Subtasks

- [x] **Bundle Analysis**
    - [x] Install `rollup-plugin-visualizer` (dev dependency).
    - [x] Run a build with analysis enabled (`npm run build -- --stats`) to identify large chunks.
    - [x] Snapshot current bundle size and composition.

- [x] **Vite Configuration Optimization**
    - [x] Configure `build.rollupOptions.output.manualChunks` in `vite.config.ts`.
    - [x] Create a specific chunk for `tone` (Audio Engine).
    - [x] Create a specific chunk for `vexflow` (Notation Engine).
    - [x] Create a specific chunk for `react` vendor (React, ReactDOM, Router, Zustand).

- [x] **Lazy Loading Implementation**
    - [x] Identify routes or components that can be lazy-loaded using `React.lazy` and `Suspense`.
    - [x] **Candidate:** `PracticePage` (if it holds the heavy VexFlow logic).
    - [x] **Candidate:** `FingeringVisualizer` (Sáo Trúc module).
    - [x] Ensure `AudioEngine` doesn't block the main thread init if possible (though Singleton pattern makes this tricky, chunking is the primary defense).

- [x] **Verification**
    - [x] Run `npm run build` and verify chunk sizes in output.
    - [x] Run Lighthouse audit on the production preview (`npm run preview`).
    - [x] Verify functionality (Audio and Notation still work correctly after splitting).

## Dev Notes

### Architecture Compliance
-   **Tooling**: Use Vite's built-in Rollup capabilities.
-   **Pattern**: Route-based code splitting is the easiest win. `HomePage` should be lightweight. `PracticePage` carries the weight of VexFlow.
-   **Constraint**: `AudioEngine` is a singleton. If it's imported in `App.tsx` (e.g. for global unlock), it might pull `tone`.
    -   *Workaround:* If `manualChunks` puts `tone` in a separate file, the browser can download it in parallel, but execution might still block.
    -   *Advanced:* Dynamic import for the Audio Engine logic: `const { Tone } = await import('tone')` inside the `initialize()` method.

### Technical Requirements
-   **Visualizer**: `rollup-plugin-visualizer` is excellent for proving the "Before/After".
-   **Target**: 3MB is a generous limit (NFR3). We should aim lower (~500KB initial) if possible, but VexFlow + Tone are heavy.
    -   VexFlow: ~300KB minified.
    -   Tone.js: ~150KB minified.
    -   React + DOM: ~40KB.
    -   Total is well under 1MB raw, but "Unpacked\" size is what counts for parsing. 3MB constraint likely refers to "Resource Size" over network or "Parsed Size"? Usually Transfer Size. We are safe, but optimization ensures speed.

### Configuration Reference (Vite Manual Chunks)

```typescript
// vite.config.ts snippet
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
        audio: ['tone'],
        notation: ['vexflow'],
      },
    },
  },
},
```

## Dev Agent Record

### Agent Model Used
Claude 3.5 Sonnet (via Claude Code)

### Completion Notes List
- [x] Added `rollup-plugin-visualizer`
- [x] Configured `manualChunks` for vendor, audio, and notation
- [x] Implemented Lazy Loading for `MusicStaff` and `SaoTrucVisualizer` in `HomePage`
- [x] Implemented Dynamic Import for `Tone.js` in `AudioEngine` to reduce initial bundle size further
- [x] Reduced initial bundle size from ~1.7MB to ~333kB (Well under 3MB limit)
- [x] Updated tests to support lazy loaded components

### File List
- `package.json`
- `vite.config.ts`
- `src/pages/HomePage.tsx`
- `src/services/audio-engine.ts`
- `src/pages/HomePage.test.tsx`
