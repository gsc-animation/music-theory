# 🗺️ Product Roadmap 2026

> **Status**: Verified & Synced (Jan 2026)
> **Goal**: Complete interactive music theory platform with Modules 1-5.

---

## 🎯 Current Focus: Deep Verification & Interactive Mechanics

The Data Layer for Modules 1-5 is **Fully Implemented**. The current focus is ensuring the **Game Mechanics** (Rhythm Tap, Melody Composition, etc.) are correctly wired up to this data.

---

## ✅ Phase 1: Core Foundation & Data Layer (Completed)

> **North Star**: A complete curriculum structure from Pitch to Harmony.

### 1.1 Content Architecture

- [x] **Module 1 (Pitch)**: 5 Submodules (`1.1` - `1.5`)
- [x] **Module 2 (Rhythm)**: 6 Submodules (`2.1` - `2.6`)
  - Note Values, Rests, Dotted Notes, Time Signatures, Compound Meter, Tempo.
- [x] **Module 3 (Scales)**: Data structure implemented.
- [x] **Module 4 (Chords)**: Data structure implemented.
- [x] **Module 5 (Harmony)**: 6 Submodules (`5.1` - `5.6`)
  - Progressions, Cadences, Contour, Structure, Dynamics, Modulation.

### 1.2 Interactive Core

- [x] **Dual-Mode Audio**: Tone.js + ABCJS Synth.
- [x] **Unified Visualizers**: `InstrumentPanel` (Piano, Guitar, Flute) with sync.
- [x] **Journey Engine**: `JourneyMap`, `UniversalGameRouter` with "Interleaved Mastery" logic.
- [x] **Practice Library**: `PracticePage` with dynamic loading (Butterworth/Sahaja).

---

## 🚧 Phase 2: Interactive Mechanics & Polish (In Progress)

> **North Star**: Turning static data into "Beautiful" Play.

### 2.1 Rhythm Mechanic Verification

Although Module 2 data exists (`2.1-note-values.ts`), we need to verify the _Game Components_ are active.

- [ ] **Rhythm Tap Engine**: Verify/Implement `rhythm-tap` game type.
  - Input: Spacebar/Click vs Tone.Transport time.
  - Feedback: Visual accuracy indicator.
- [ ] **Beat Counter**: Verify `beat-counter` logic.

### 2.2 Advanced Visualizers

- [ ] **Popup Instruments**: Verify "Keyboard/Fretboard Popup" behavior mentioned in requirements.
- [ ] **Dynamic Overlay**: Enhance `FeedbackOverlay` for multi-stage games.

### 2.3 Mobile & PWA

- [ ] **Touch Latency**: Verify iOS "Unlock" behavior (User Gesture).
- [ ] **Layout**: Final check of `InstrumentPanel` on mobile viewport.

---

## 🔮 Phase 3: Expansion (Q2 2026)

- [ ] **Microphone Input**: Pitch detection for "Real Instrument" mode.
- [ ] **User Accounts**: Sync IndexedDB to Supabase (Cloud Save).
- [ ] **Social Sharing**: Share "Moment of Mastery" images.

---

## 📉 Known Tech Debt

- **Type Safety**: Strictly type the `GameConfig` interfaces for new game types.
- **Bundle Size**: Lazy load heavy game components (`React.lazy`).
- **Test Coverage**: specific unit tests for `rhythm-logic.ts`.
