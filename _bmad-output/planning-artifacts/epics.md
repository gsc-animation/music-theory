---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - _bmad-output/planning-artifacts/architecture.md
  - _bmad-output/planning-artifacts/ux-design-specification.md
workflowType: 'epics'
lastStep: 4
status: 'complete'
completedAt: '2026-01-10'
---

# music-theory - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for music-theory, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

- **FR1**: Interactive Music Sheet with VexFlow rendering.
- **FR2**: Note Dictionary with toggleable Solfège (Do, Re, Mi) and Latin (C, D, E) labels.
- **FR3**: Instant Audio-Visual Feedback (Tone.js sound + visual highlight) on interaction.
- **FR4**: Note Recognition Game with random note generation and streak scoring.
- **FR5**: Sáo Trúc Lite with static fingering charts for 6-hole/10-hole systems.
- **FR6**: Offline Capability via PWA Service Worker (app shell + assets).
- **FR7**: Microphone Input for real-time pitch detection (Growth Feature).
- **FR8**: Guitar Module with fretboard visualization (Growth Feature).
- **FR9**: User Accounts for cloud sync (Growth Feature).
- **FR10**: Social Practice / Classroom mode (Growth Feature).
- **FR11**: Content Marketplace for sharing sheet music (Vision).
- **FR12**: Advanced Instruments support (Dan Bau, etc.) (Vision).
- **FR13**: AI Tutor for adaptive learning (Vision).
- **FR14**: Localization Engine for stateful toggling of notation systems across all views.
- **FR15**: Gamification system with local streaks and badges.
- **FR16**: Audio "Unlock" strategy to handle browser autoplay policies.

### NonFunctional Requirements

- **NFR1**: Audio Latency < 50ms on average mid-range Android devices.
- **NFR2**: Time to Interactive (TTI) < 2 seconds on 4G networks.
- **NFR3**: Initial bundle size < 3MB.
- **NFR4**: Animations must maintain 60fps.
- **NFR5**: Core Game Loop must be fully functional offline.
- **NFR6**: Crash-free session rate > 99.5%.
- **NFR7**: State persistence to localStorage/IndexedDB immediately on change.
- **NFR8**: Touch targets minimum 48x48 CSS pixels.
- **NFR9**: Responsive design optimized for portrait mode (16:9 to 20:9).
- **NFR10**: Full Vietnamese localization including diacritics.

### Additional Requirements

- **Architecture**: Use Starter Template: `npm create vite@latest music-theory -- --template react-ts`.
- **Architecture**: State Management using Zustand for high-performance audio/visual sync.
- **Architecture**: Styling with Tailwind CSS for mobile-first responsiveness.
- **Architecture**: Routing via React Router DOM.
- **Architecture**: Audio Engine using Singleton Service Pattern (Tone.js wrapper).
- **Architecture**: Feature-based folder structure (`src/features/...`).
- **UX**: "Rosetta Stone" Toggle always visible for notation switching.
- **UX**: Celebratory animations (particles) for small wins.
- **UX**: Warm color palette (Bamboo Green, Warm Wood, Rice Paper).
- **UX**: Font: Nunito/Quicksand for text, Fira Code/Roboto Mono for notes.
- **UX**: Material UI (Base/Unstyled) + Tailwind for components.

### FR Coverage Map

- **FR1 (Interactive Sheet)**: Epic 1 - Core notation rendering
- **FR2 (Note Toggle)**: Epic 1 - Notation system switching
- **FR3 (Audio Feedback)**: Epic 1 - Immediate audio response
- **FR4 (Note Game)**: Epic 3 - Game logic and scoring
- **FR5 (Sáo Trúc)**: Epic 2 - Flute simulation
- **FR6 (Offline PWA)**: Epic 4 - Offline support
- **FR7 (Local Tracking)**: Epic 3 - Score persistence
- **FR8 (Mobile Interface)**: Epic 1 - Responsive layout
- **FR15 (Gamification)**: Epic 3 - Badges and streaks
- **FR16 (Audio Unlock)**: Epic 1 - Autoplay handling

## Epic List

### Epic 1: The Interactive Staff & Audio Engine
Goal: Users can play the virtual piano, see notes on the staff, and toggle between Solfège/Latin notation with <50ms latency.
**FRs covered:** FR1, FR2, FR3, FR8, FR16

### Epic 2: The Sáo Trúc Simulator
Goal: Users can view and interact with Sáo Trúc fingering charts to learn the specific finger positions for 6-hole and 10-hole flutes.
**FRs covered:** FR5

### Epic 3: Gamified Note Trainer
Goal: Users can practice identifying notes in a game mode, tracking their streaks and scores locally to build a daily habit.
**FRs covered:** FR4, FR7, FR15

### Epic 4: PWA Offline & Reliability
Goal: Users can install the app to their home screen and use it without an internet connection, ensuring access on the go.
**FRs covered:** FR6

## Epic 1: The Interactive Staff & Audio Engine

Goal: Users can play the virtual piano, see notes on the staff, and toggle between Solfège/Latin notation with <50ms latency.

### Story 1.1: Project Initialization & Architecture Setup

As a Developer,
I want to initialize the Vite+React project with the defined directory structure and dependencies,
So that we have a stable foundation for development.

**Acceptance Criteria:**

**Given** a new environment
**When** `npm install` and `npm run dev` are run
**Then** the default Vite app loads without errors
**And** `package.json` includes `tone`, `vexflow`, `zustand`, `tailwindcss`, `vite-plugin-pwa`
**And** `tailwind.config.js` is configured with the "Bamboo" palette

### Story 1.2: VexFlow Music Staff Component

As a Student,
I want to see a musical staff that renders notes dynamically,
So that I can visualize the music I am learning.

**Acceptance Criteria:**

**Given** the application is loaded
**When** I view the main screen
**Then** I see a Treble Clef staff rendered via VexFlow
**And** passing a note prop (e.g., 'C4') renders the correct note on the staff
**And** the staff resizes responsively on mobile screens

### Story 1.3: Audio Engine Singleton & Unlock Strategy

As a User,
I want the audio to play immediately when I interact, without being blocked by browser policies,
So that I can hear the notes.

**Acceptance Criteria:**

**Given** the application is loaded
**When** I first interact with the app (e.g., "Tap to Start")
**Then** the `AudioEngine` singleton initializes the Tone.js context
**And** the context state changes to 'running'
**And** subsequent calls to `playNote` produce sound

### Story 1.4: Interactive Piano Keyboard UI

As a Student,
I want a virtual piano keyboard that I can tap,
So that I can play notes.

**Acceptance Criteria:**

**Given** the Piano component
**When** I tap a key
**Then** visual feedback (highlight) appears immediately
**And** the `playNote` action is dispatched to the store
**And** touch targets are at least 48x48px

### Story 1.5: Audio-Visual Synchronization (The Loop)

As a Student,
I want the staff to update instantly when I play a piano key,
So that I can connect the sound to the symbol.

**Acceptance Criteria:**

**Given** the app is running
**When** I play a note on the virtual piano
**Then** the staff updates to show that note
**And** the correct sound plays within 50ms
**And** no React re-render lag is perceptible

### Story 1.6: Notation System Toggle (Solfège/Latin)

As a Vietnamese Learner,
I want to toggle between "Do-Re-Mi" and "C-D-E" labels,
So that I can use the system I am familiar with.

**Acceptance Criteria:**

**Given** the "Rosetta Stone" toggle
**When** I switch to "Solfège"
**Then** all piano key labels change to Do, Re, Mi
**And** when switched back to "Latin", they show C, D, E
**And** the preference is saved to localStorage

## Epic 2: The Sáo Trúc Simulator

Goal: Users can view and interact with Sáo Trúc fingering charts to learn the specific finger positions for 6-hole and 10-hole flutes.

### Story 2.1: Sáo Trúc Data Model & Fingering Charts

As a Content Creator,
I want a structured JSON data model for flute fingerings,
So that we can easily manage fingering charts for different flute types.

**Acceptance Criteria:**

**Given** the `fingerings.json` file
**When** analyzed
**Then** it contains complete mappings for 6-hole and 10-hole flutes (C4-C6)
**And** querying a note returns the correct open/closed/half-closed state for each hole

### Story 2.2: Fingering Visualizer Component

As a Learner,
I want to see a visual representation of the bamboo flute,
So that I can learn the finger placement.

**Acceptance Criteria:**

**Given** the `FingeringChart` component
**When** passed a fingering state
**Then** it renders a vertical bamboo flute with the correct hole states
**And** it supports "half-hole" visualization
**And** it matches the "Bamboo & Growth" visual theme

### Story 2.3: Sáo Trúc Integration with Game Loop

As a Learner,
I want the flute chart to update when I play notes on the piano or see them on the staff,
So that I can cross-reference the sound with the fingering.

**Acceptance Criteria:**

**Given** "Sáo Trúc Mode" is active
**When** I play a note on the virtual piano
**Then** the fingering chart instantly updates to show that note
**And** switching between 6-hole/10-hole updates the view immediately

## Epic 3: Gamified Note Trainer

Goal: Users can practice identifying notes in a game mode, tracking their streaks and scores locally to build a daily habit.

### Story 3.1: Game State Management (Zustand)

As a Developer,
I want a centralized store to manage game logic,
So that scoring and note generation are consistent across the app.

**Acceptance Criteria:**

**Given** `useGameStore`
**When** `startGame()` is called
**Then** a random `targetNote` is generated
**And** `checkAnswer(note)` increments score if correct
**And** `checkAnswer(note)` resets streak if incorrect

### Story 3.2: Game Mode UI Overlay

As a Player,
I want to see my current target note and score,
So that I know what to play and how well I am doing.

**Acceptance Criteria:**

**Given** Game Mode is active
**When** I look at the screen
**Then** I see a "Target Note" on the staff
**And** I see a "Streak: X" counter in the header
**And** unrelated UI elements are minimized

### Story 3.3: Feedback System & Micro-Interactions

As a Player,
I want clear, instant feedback when I play a note,
So that I know if I was right or wrong.

**Acceptance Criteria:**

**Given** I play a correct note
**When** the interaction occurs
**Then** the screen flashes Green and a success sound plays
**And** particles/confetti trigger at streak milestones (e.g., 10)
**And** Incorrect answers trigger a Red shake animation

### Story 3.4: Local Persistence Layer

As a Returning Player,
I want my high scores saved,
So that I can pick up where I left off.

**Acceptance Criteria:**

**Given** I have achieved a high score
**When** I reload the browser
**Then** my "Best Streak" is preserved in `localStorage`
**And** it is displayed on the dashboard

## Epic 4: PWA Offline & Reliability

Goal: Users can install the app to their home screen and use it without an internet connection, ensuring access on the go.

### Story 4.1: PWA Manifest & Installability

As a Mobile User,
I want to install the app to my home screen,
So that it feels like a native app.

**Acceptance Criteria:**

**Given** the browser checks the site
**When** I visit
**Then** the manifest is detected
**And** the "Install App" prompt is available
**And** the app has the correct name "Music Theory" and icon

### Story 4.2: Service Worker & Caching Strategy

As a User with spotty internet,
I want the app to load even if I'm offline,
So that I can practice anywhere.

**Acceptance Criteria:**

**Given** I have visited the site once
**When** I go offline and reload
**Then** the app shell loads successfully
**And** audio samples (piano/flute) play from the cache
**And** `vite-plugin-pwa` is configured with a 'CacheFirst' strategy for assets

### Story 4.3: Performance & Bundle Optimization

As a User on a slow phone,
I want the app to open instantly,
So that I don't get frustrated waiting.

**Acceptance Criteria:**

**Given** the production build
**When** analyzed
**Then** the initial JS bundle is < 3MB
**And** large libraries (Tone.js, VexFlow) are code-split or optimized
**And** Lighthouse Performance score is > 90
