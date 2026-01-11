# Story 1.3: Audio Engine Singleton & Unlock Strategy

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a User,
I want the audio to play immediately when I interact, without being blocked by browser policies,
so that I can hear the notes.

## Acceptance Criteria

1. **Given** the application is loaded
   **When** I first interact with the app (e.g., "Tap to Start")
   **Then** the `AudioEngine` singleton initializes the Tone.js context
2. **And** the context state changes to 'running'
3. **And** subsequent calls to `playNote` produce sound
4. **And** the unlock interaction is handled gracefully (e.g., via a modal or overlay) if autoplay is blocked
5. **And** the audio engine handles multiple rapid triggers without glitching (polyphony management)

## Tasks / Subtasks

- [x] Task 1: Implement Audio Engine Service
  - [x] Create `src/services/audio-engine.ts` (Singleton pattern)
  - [x] Implement `initialize()` method to start Tone.js context
  - [x] Implement `playNote(note, duration)` method
  - [x] Implement `getState()` to expose context state (suspended/running)
- [x] Task 2: Create Audio Store (Zustand)
  - [x] Create `src/stores/useAudioStore.ts`
  - [x] Define state: `isReady`, `isPlaying`, `currentNote`
  - [x] Define actions: `initializeAudio`, `triggerNote`
  - [x] Connect store actions to `AudioEngine` methods
- [x] Task 3: Implement Audio Unlock UI
  - [x] Create `src/features/audio/components/AudioUnlocker.tsx`
  - [x] Show "Tap to Start" overlay if context is suspended
  - [x] Handle user interaction to resume context
  - [x] Auto-hide overlay once audio is ready
- [x] Task 4: Integration
  - [x] Add `AudioUnlocker` to `App.tsx` or `MainLayout`
  - [x] Verify sound plays on button click after unlock
  - [x] Test on mobile device (simulation) to verify touch unlock

## Dev Notes

### Architecture Compliance

- **Service Location:** `src/services/audio-engine.ts`
  - **Pattern:** Singleton. Export a single instance (e.g., `export const audioEngine = new AudioEngine()`).
- **Store Location:** `src/stores/useAudioStore.ts`
  - **Library:** Zustand.
  - **Pattern:** Store-Action Pattern. Components dispatch to Store -> Store calls Service.
- **Unlock Component:** `src/features/audio/components/AudioUnlocker.tsx`
  - **Library:** Headless UI (Dialog) or simple conditional rendering.
- **Audio Library:** `tone` (Tone.js).
  - **Constraint:** Use `Tone.Sampler` or `Tone.Synth`. For MVP, a simple Synth is fine, but structure it to swap for Sampler later.

### Technical Requirements

- **Latency:** Must be low (<50ms). Use `Tone.now()` for scheduling if needed, but for immediate feedback, `triggerAttackRelease` is acceptable.
- **Autoplay Policy:** Browsers block AudioContext until a user gesture.
  - Check `Tone.context.state`. If 'suspended', show unlock UI.
  - Resume with `Tone.start()` on user click.
- **Polyphony:** Use `Tone.PolySynth` to allow chords or overlapping notes (e.g., rapid playing).

### Visual Design (UX) Requirements

- **Unlock UI:**
  - Simple overlay or modal.
  - Text: "Tap to Start Music Theory" or similar welcoming message.
  - Button: Large touch target (>48px), Bamboo Green color.
- **Feedback:**
  - When unlocked, provide a subtle visual cue (e.g., "Audio Ready" toast or icon change).

### Previous Story Intelligence (Story 1.2)

- **Project Structure:** `src/features/` pattern is established. Follow it.
- **Testing:** Add unit tests for the Service (mocking Tone.js) and Store.
- **Git:** Commit messages should follow the established pattern.

### References

- [Architecture: Audio Architecture](_bmad-output/planning-artifacts/architecture.md#core-architectural-decisions)
- [UX: Audio-Unlocked](_bmad-output/planning-artifacts/ux-design-specification.md#platform-strategy)
- [Project Context](_bmad-output/project-context.md)

## Dev Agent Record

### Agent Model Used

gemini-2-pro-preview

### Debug Log References

- Encountered issues with testing `AudioEngine` singleton state persistence across tests. Mocked `tone` module carefully to simulate context behavior.
- `AudioUnlocker` test had trouble finding elements initially due to `useAudioStore` mock returning object but component using selector. Updated mock to support selector pattern.
- `MainLayout` created to house `AudioUnlocker` and wrap pages, keeping `App.tsx` clean.

### Completion Notes List

- Implemented `AudioEngine` singleton wrapping `Tone.js` with `PolySynth` support.
- Created `useAudioStore` using Zustand to manage audio state (`isReady`, `currentNote`).
- Implemented `AudioUnlocker` component with accessible overlay and "Tap to Start" interaction.
- Integrated `AudioUnlocker` via `MainLayout` into the application.
- Added comprehensive unit tests for Service, Store, and Components.
- Verified 100% test pass rate for new components.

### File List

- src/services/audio-engine.ts
- src/services/audio-engine.test.ts
- src/stores/useAudioStore.ts
- src/stores/useAudioStore.test.ts
- src/features/audio/components/AudioUnlocker.tsx
- src/features/audio/components/AudioUnlocker.test.tsx
- src/components/layout/MainLayout.tsx
- src/components/layout/MainLayout.test.tsx
- src/App.tsx
