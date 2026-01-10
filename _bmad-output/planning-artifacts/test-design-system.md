# System-Level Test Design

## Testability Assessment

*   **Controllability: PASS**
    *   **Architecture Support:** The use of Zustand for state management allows for predictable state injection and manipulation during testing. The Singleton Service Pattern for the Audio Engine (Tone.js wrapper) enables mocking of the audio context, which is critical for headless testing environments.
    *   **Data Control:** `localStorage` persistence can be easily seeded or cleared before tests to simulate returning or new user scenarios.
    *   **Environment:** Vite's environment variable handling allows for easy switching between production and test configurations (e.g., muting audio in CI).

*   **Observability: PASS**
    *   **State Inspection:** Zustand stores expose state that can be queried directly in component tests or integration tests to verify internal logic (e.g., `score`, `streak`, `currentNote`).
    *   **Determinism:** The use of `requestAnimationFrame` for the playback cursor loop is deterministic in a browser environment, but will require careful handling in Playwright (using `page.clock` or similar) to avoid flakiness.
    *   **NFR Validation:** Performance metrics (latency) are observable via the browser's Performance API, which can be accessed by Playwright/k6.

*   **Reliability: PASS**
    *   **Isolation:** The "Feature-Folder" structure encourages loose coupling, making it easier to test features like `sao-truc` or `piano` in isolation.
    *   **Reproducibility:** Logic for note conversion and game rules is pure functions (or nearly pure), ensuring reproducible test results.
    *   **Dependencies:** External dependencies (Tone.js, VexFlow) are encapsulated in wrappers/components, allowing them to be mocked if they cause instability in CI (though VexFlow is canvas-based and should be stable).

## Architecturally Significant Requirements (ASRs)

| ASR ID | Requirement | Impact | Probability | Score | Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ASR-01** | **Audio Latency < 50ms** | 3 (Critical) | 3 (Likely) | **9** | **High Risk.** Requires specialized performance testing. Standard functional tests won't catch this. Strategy: Real-device testing and browser performance profiling. |
| **ASR-02** | **Offline Capability (PWA)** | 3 (Critical) | 2 (Possible) | **6** | **High Risk.** Service Worker caching is notoriously tricky to get right across all browsers. Strategy: E2E tests specifically for offline mode (Playwright network emulation). |
| **ASR-03** | **Sáo Trúc & Notation Localization** | 2 (Degraded) | 2 (Possible) | 4 | Medium Risk. The logic for switching between systems must be robust. Strategy: High volume of Unit/Property-based tests for the "Rosetta Stone" logic. |
| **ASR-04** | **Mobile Responsiveness (Portrait)** | 2 (Degraded) | 3 (Likely) | **6** | **High Risk.** Canvas rendering (VexFlow) often breaks on resize/mobile. Strategy: Visual regression testing across multiple mobile viewports. |

## Test Levels Strategy

*   **Unit: 60%**
    *   **Rationale:** The core domain logic (music theory rules, note conversion, scoring, fingering lookups) is complex but has no side effects. These should be heavily unit tested for speed and correctness.
    *   **Scope:** `src/features/**/logic/*.ts`, `src/services/audio-engine.ts` (mocked Tone.js).

*   **Integration: 20%**
    *   **Rationale:** Validating the interaction between the Zustand stores and the React components (UI updates when state changes). Also verifying the "Rosetta Stone" toggle updates all listening components.
    *   **Scope:** Component testing (Playwright-CT or React Testing Library) for `MusicStaff`, `Piano`, `FingeringChart`.

*   **E2E: 20%**
    *   **Rationale:** Critical user journeys (Game Loop, Offline Load) and Visual Regression. These are slower but essential to ensure the "app feel" matches requirements.
    *   **Scope:** Full game loops, offline functionality, PWA installability prompts.

## NFR Testing Approach

*   **Security (Low Priority):**
    *   **Context:** No user accounts or backend initially.
    *   **Approach:** Basic checks to ensure no unintended data leakage if local storage is inspected. `npm audit` for dependency vulnerabilities.

*   **Performance (Critical Priority):**
    *   **Context:** Audio latency is the "make or break" feature.
    *   **Approach:**
        *   **Latency:** Custom harness to measure time between `interaction` event and `audioContext` output timestamp.
        *   **Load:** Lighthouse CI to enforce TTI < 2s and bundle size < 3MB limits.
        *   **Animation:** FPS monitoring during the game loop.

*   **Reliability (High Priority):**
    *   **Context:** Offline support.
    *   **Approach:** Playwright E2E tests that load the app, cut network connection, and assert core features (play note, see chart) still function.

*   **Maintainability (Medium Priority):**
    *   **Context:** Codebase longevity.
    *   **Approach:** ESLint/Prettier enforcement, strict TypeScript checks, Component library reuse.

## Test Environment Requirements

*   **CI Environment (GitHub Actions):**
    *   Standard Ubuntu runners for Unit/Integration.
    *   Headless browser (Chromium/Webkit) for E2E.
    *   **Constraint:** Audio hardware is usually not available/reliable in CI. Audio tests must rely on "virtual" audio contexts or signal analysis, not physical sound output.

*   **Local/Device Lab:**
    *   Essential for verifying ASR-01 (Latency) on actual Android hardware (mid-range). Automated tests can't fully substitute for manual "feel" testing here.

## Testability Concerns

1.  **Audio in CI:** Testing Tone.js output in a headless CI environment is difficult. We may need to mock the `AudioContext` entirely for CI runs, which risks masking integration issues.
    *   **Mitigation:** Create a robust `AudioEngine` mock that verifies *calls* to Tone.js, trusting the library to handle the actual sound generation. Use manual device testing for the final "ear check."

2.  **Canvas Verification:** VexFlow renders to HTML5 Canvas. Standard DOM queries won't see the notes inside the canvas.
    *   **Mitigation:** Use Visual Regression Testing (Snapshot comparison) for the Music Staff. This is brittle but necessary.

## Recommendations for Sprint 0

1.  **Initialize Test Framework:** Set up Vitest (Unit) and Playwright (E2E/Component) immediately.
2.  **Audio Mock Strategy:** Define the `AudioEngine` interface early so it can be swapped for a mock in tests.
3.  **Visual Regression Baseline:** Capture golden snapshots of the VexFlow staff for standard notes (C4, G4, A5) to prevent rendering regressions.
4.  **Lighthouse CI:** Add to pipeline to police the 3MB bundle limit from Day 1.
