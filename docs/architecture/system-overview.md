# System Architecture Overview

## 1. Context (Level 1)

The **Music Theory Platform** is a Single Page Application (SPA) designed to teach music theory and instrument practice (Piano, Guitar, Sáo Trúc) to Vietnamese users. It interacts with the user via a web browser and stores progress locally (and eventually remotely via a future backend).

**Users:**
- **Students:** Learn music theory, practice instruments, take quizzes.
- **Teachers (Future):** Track student progress (out of scope for MVP).

**System:**
- **Music Theory Web App:** The core application.

**External Systems:**
- **Browser Web Audio API:** For low-latency audio synthesis and processing.
- **Browser LocalStorage/IndexedDB:** For saving user progress offline.
- **CDN:** For delivering static assets (audio samples, images) optimized for Vietnam.

## 2. Containers (Level 2)

The system is architected as a **React-based Single Page Application (SPA)** built with Vite.

| Container | Technology | Responsibilities |
| :--- | :--- | :--- |
| **Frontend App** | React, TypeScript, Vite | UI rendering, user interaction, routing. |
| **Audio Engine** | Tone.js, Web Audio API | Audio synthesis, sample playback, scheduling, pitch detection. |
| **Notation Engine** | VexFlow, SVG | Rendering musical notation, handling interactions with notes. |
| **Game Loop** | RequestAnimationFrame, Custom Scheduler | Synchronizing audio and visual updates (cursor, animations). |
| **State Manager** | Zustand | Managing global app state (user settings, progress) and transient game state (current note, score). |

## 3. Components (Level 3)

### 3.1 Core Modules

#### **Audio System**
- **`AudioContextManager`**: Singleton managing the `AudioContext` lifecycle (unlocking on mobile).
- **`InstrumentSampler`**: Wrapper around `Tone.Sampler` to handle loading/caching of instrument samples (Piano, Guitar, Sáo).
- **`LookaheadScheduler`**: Precise timing system to schedule audio events ahead of the main thread to prevent jitter.
- **`PitchDetector`**: (Future) WASM-based module (YIN algorithm) for detecting pitch from microphone input.

#### **Visual System**
- **`MusicStaff`**: Wrapper component for VexFlow. Handles resizing, rendering notes from state, and user interactions.
- **`GameCanvas`**: Overlay layer for high-performance animations (cursor, feedback effects) synchronized with the audio clock.
- **`SáoTrúcVisualizer`**: Custom SVG engine to render bamboo flute fingering charts (6-hole/10-hole) and half-holing techniques.

#### **State Management (Zustand Stores)**
- **`useSettingsStore`**: User preferences (Notation system: Solfège/Latin, Volume, Instrument).
- **`useLessonStore`**: Current lesson data, progress, score.
- **`useAudioStore`**: Audio engine status (loading, ready, playing), analyser data for visualizations.

#### **UI Components**
- **`VirtualPiano`**: Touch-optimized piano keyboard.
- **`VirtualGuitar`**: Interactive fretboard with CAGED system support.
- **`VirtualSáo`**: Interactive flute interface with breath control simulation.

## 4. Key Flows

### 4.1 Audio-Visual Synchronization
1. **User** starts a lesson/exercise.
2. **`LookaheadScheduler`** looks ahead (e.g., 100ms) and schedules audio events using `Tone.Transport` or `AudioContext.currentTime`.
3. **`Tone.Draw`** schedules visual callbacks to update the UI (e.g., move cursor, highlight note) exactly when the audio event triggers.
4. **`GameCanvas`** renders the update via `requestAnimationFrame` to ensure 60fps smoothness.

### 4.2 Sáo Trúc Simulation
1. **User** selects a note or inputs via microphone.
2. **`VirtualSáo`** determines the correct fingering based on the selected type (6/10 hole) and register (octave).
3. **`SáoTrúcVisualizer`** renders the SVG fingering chart, applying opacity/masks for half-holing if needed.
4. **`InstrumentSampler`** plays the corresponding sample (with pitch shifting if needed for specific keys).

## 5. Deployment View
- **Build Artifact:** Static files (HTML, JS, CSS, Assets).
- **Hosting:** Static Web Hosting (e.g., Vercel, Netlify) or specialized CDN (Cloudflare) for Vietnam performance.
- **PWA:** Service Workers cache assets for offline access.
