---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
  - 6
inputDocuments:
  - /Users/steve/INFCAP/gsc-animation/music-theory/_bmad-output/planning-artifacts/product-brief-music-theory-2026-01-10.md
workflowType: 'prd'
lastStep: 6
---

# Product Requirements Document - music-theory

**Author:** Steve
**Date:** 2026-01-10

## Executive Summary

The **music-theory** project envisions the premier online music education platform specifically tailored for the Vietnamese market. It bridges the gap between global standards and local needs by combining advanced web technologies (React, WebAssembly, Tone.js) with deep cultural localization. The platform is designed to be an accessible, low-latency, and interactive learning environment for Piano, Guitar, and the traditional Vietnamese Bamboo Flute (Sáo Trúc), addressing the specific infrastructure constraints (low-end devices, unstable 4G) and pedagogical nuances (Solfège vs. Latin notation) of Vietnam.

### What Makes This Special

Unlike generic global competitors like Musicca, **music-theory** offers:
1.  **Hyper-Localization:** It natively handles the cognitive friction between Solfège ("Do Re Mi") and Latin ("C D E") systems used in Vietnamese schools vs. international practice.
2.  **Sáo Trúc Simulator:** It features the world's first web-based dynamic fingering and simulation engine for the Vietnamese Bamboo Flute.
3.  **Infrastructure Optimization:** It is engineered specifically for "instant" interaction on average Vietnamese hardware (mid-range Android) and networks, ensuring no audio lag which is critical for music learning.

## Project Classification

**Technical Type:** web_app (PWA)
**Domain:** edtech
**Complexity:** medium
**Project Context:** Greenfield - new project

**Classification Signals:**
- **Web App:** "Single Page Application (PWA)", "React", "WebAssembly", "Tone.js", "Offline-first".
- **EdTech:** "music education", "learners", "students", "teachers", "pedagogical nuances".
- **Complexity:** Medium (EdTech standard), though with high technical complexity in audio scheduling and localized rendering.

## Success Criteria

### User Success
*   **The "Confidence Shift":** Users transition from believing "music theory is too hard" to completing their first level perfect score.
*   **Active Learning:** Success is defined by the number of correct notes played or identified (interaction), not just passive reading.
*   **Skill Acquisition:** A user who scores 0/10 on the pre-test scores at least 7/10 on the post-test after 15 minutes of usage.
*   **Social Validation:** Users feel proud enough of their progress to share "Music Theory Master" badges on Zalo/Facebook.

### Business Success (Non-Profit / Educational Impact)
*   **Market Penetration:** Establish the platform as the #1 free resource for music theory in Vietnam within 12 months.
*   **Retention:** Achieve a Day-7 Retention Rate > 20%, indicating users are building a habit.
*   **Brand Authority:** Become the recommended reference tool for music teachers and local centers.

### Technical Success
*   **Performance:** Average "Time to Interactive" (TTI) < 2s on 4G networks to ensure accessibility.
*   **Audio Latency:** Audio feedback occurs within 50ms of user interaction on average Android hardware to maintain the "instrument" illusion.
*   **Stability:** Crash-free rate > 99.5% across supported mobile browsers (Chrome Android, Safari iOS).

### Measurable Outcomes
*   **Engagement:** Average Session Duration > 10 minutes.
*   **Completion:** > 50% of first-time users complete the "Onboarding/Grade 1" module.
*   **Virality:** > 100 weekly shares of Leaderboard achievements.

## Product Scope

### MVP - Minimum Viable Product (The "Music Reader")
*   **Interactive Music Sheet:** VexFlow-rendered staff with dynamic note display.
*   **Note Dictionary:** Context-aware toggle between Solfège (Do, Re, Mi) and Latin (C, D, E) labels.
*   **Audio-Visual Feedback:** Instant Tone.js piano sound on touch/click with visual highlighting.
*   **Note Recognition Game:** Random note identification drills with simple scoring (streak counter).
*   **Sáo Trúc Lite:** Static fingering charts for 6-hole and 10-hole systems (visual reference only).
*   **Offline Capability:** Basic PWA Service Worker for offline access to app shell and samples.
*   **Constraints:** No microphone input, no user accounts (localStorage only), Piano and Sáo Trúc focus only.

### Growth Features (Post-MVP)
*   **Microphone Input:** Real-time pitch detection allowing users to play real instruments to answer.
*   **Guitar Module:** Fretboard visualization and basic chord training.
*   **User Accounts:** Cloud sync for progress tracking across devices.
*   **Social Practice:** Classroom mode for teacher assignments.

### Vision (Future)
*   **Content Marketplace:** Platform for teachers to upload and share V-Pop sheet music.
*   **Advanced Instruments:** Support for Dan Bau and other traditional Vietnamese instruments.
*   **AI Tutor:** Adaptive learning paths based on user performance error patterns.

## User Journeys

### Journey 1: Bé An - The "Aha!" Moment
Bé An (7 years old) has just started piano lessons but finds the sheet music confusing. Her teacher calls the notes "Do Re Mi," but the book says "C D E." She feels frustrated and tells her mom she wants to quit because she "isn't smart enough." Her mom opens *music-theory* on her phone and hands it to An.

An sees a piano on the screen. She presses a key, and it instantly makes a sound and lights up. She sees a big toggle switch: "Do-Re-Mi" vs "C-D-E". She taps it, and the letters on the screen change to the familiar "Do Re Mi" she hears in class. Suddenly, it clicks. She plays a matching game, tapping "Mi" when the screen shows "Mi", getting a satisfying "Ding!" and green light each time. After 10 correct answers in a row, she gets a "Junior Musician" badge. She runs to her piano and realizes the keys are the same.

### Journey 2: Minh - The Commuter Guitarist
Minh (20, university student) is learning guitar to impress his friends. He practices on his acoustic guitar at home but spends 2 hours a day on the bus commuting. He wants to use that dead time to learn the fretboard, but his 4G connection is spotty and video tutorials buffer constantly.

Minh opens *music-theory* on the bus. The app loads instantly even though he has 1 bar of signal. He opens the "Note Trainer" mode. He doesn't need audio, so he mutes it and relies on visual feedback. He drills identifying notes on the G-string. The app tracks his streak locally. By the time he gets off the bus, he has memorized the first 5 frets. When he gets home, he picks up his real guitar and knows exactly where to place his fingers.

### Journey 3: Mrs. Lan - The Trusting Facilitator
Mrs. Lan (40, mother) is wary of letting her kids play games on phones. She worries about ads, inappropriate content, and "brain rot." She is looking for something educational to help An with her music but doesn't want to pay for a subscription yet.

She searches and finds *music-theory*. She notices immediately there are no banner ads. The interface is clean, professional, and culturally familiar (Vietnamese language first). She tests it herself for a minute, seeing that it's purely about music notes—no chat, no social media tracking. She sees the "Sáo Trúc" section and smiles, remembering her own father playing it. She feels safe handing the phone to An, knowing it's a digital textbook, not a distraction.

### Journey Requirements Summary

These journeys reveal requirements for:

*   **Localization Engine:** The system must support instant, stateful toggling between Solfège and Latin notation across all views (Staff, Keyboard, Fretboard).
*   **Performance/Offline:** The PWA must load the core "Game Loop" (Note rendering + Interaction) even without an active internet connection after the first visit.
*   **Feedback System:** Immediate visual (Color change) and audio (Sample playback) feedback is non-negotiable for the "Aha!" moment.
*   **Safety/Privacy:** No forced login or tracking for the basic loop; the app must function as a standalone tool to build trust with parents.
*   **Gamification:** Simple local-storage based streaks and badges to provide the dopamine hit for retention without requiring a backend account system initially.

## Non-Functional Requirements

### Performance
*   **Audio Latency:** The system must achieve an audio latency of **< 50ms** from touch interaction to sound output on average mid-range Android devices. This is critical to maintain the illusion of playing a real instrument.
*   **Time to Interactive (TTI):** The application must reach TTI in **< 2 seconds** on 4G networks (using standard 4G throttling profiles).
*   **Asset Optimization:** Initial bundle size (including core audio samples) must be **< 3MB** to ensure rapid loading.
*   **Frame Rate:** Animations (staff rendering, key lighting) must maintain **60fps** to provide a fluid, game-like feel.

### Reliability
*   **Offline Functionality:** The core "Game Loop" (Note Recognition, Sáo Trúc Fingering) must be fully functional offline via Service Workers after the first successful load.
*   **Crash-Free Sessions:** The application must maintain a crash-free session rate of **> 99.5%** across target devices (Android 10+, iOS 15+).
*   **State Persistence:** User progress (streaks, badges, settings) must be saved to `localStorage` or `IndexedDB` immediately upon change to prevent data loss if the browser is closed or crashes.

### Usability (Accessibility & Localization)
*   **Touch Targets:** All primary interaction elements (piano keys, flute holes) must have a minimum touch target size of **48x48 CSS pixels** to accommodate various finger sizes.
*   **Device Support:** The UI must be fully responsive and optimized for **portrait mode** on mobile devices with aspect ratios ranging from 16:9 to 20:9.
*   **Language Support:** The interface must support full Vietnamese localization, including correct rendering of diacritics in all fonts.

## Innovation & Novel Patterns

### Detected Innovation Areas

*   **Cultural-Technical Synthesis (Sáo Trúc Simulator):**
    The integration of a traditional Vietnamese instrument (Sáo Trúc) with modern web audio technologies (WebAssembly/Tone.js) represents a novel application of "Ethno-Computing." No existing platform offers a dynamic, web-based fingering simulator for this specific instrument, democratizing access to cultural heritage through digital means.

*   **Cognitive Localization Engine:**
    Unlike standard localization (translating UI text), music-theory implements "Cognitive Localization" by treating musical notation systems (Solfège vs. Latin) as a dynamic, toggleable layer. This challenges the assumption that music theory is a "universal language" and acknowledges the specific pedagogical friction point for Vietnamese learners.

*   **Low-Latency PWA Architecture:**
    The commitment to <50ms audio latency on mid-range Android devices via a PWA challenges the dominance of native apps for music software. By optimizing the "Game Loop" for the specific constraints of the Vietnamese mobile infrastructure (4G, older devices), the project innovates in accessibility.

### Market Context & Competitive Landscape

*   **Global Competitors (Musicca, Teoria):** Focus on Western classical tradition (Latin notation default) and desktop/broadband environments. They lack the specific cultural instruments and the "mobile-first, offline-first" optimization required for the target market.
*   **Local Solutions:** Mostly static PDF repositories or low-quality native apps with aggressive monetization. None provide the interactive, instrument-focused feedback loop.

### Validation Approach

*   **The "Sáo Trúc" Test:** Validate the simulator with real Sáo Trúc players to ensure fingering accuracy and audio fidelity.
*   **The "Teacher's Pet" Test:** Validate the Solfège/Latin toggle with music teachers to confirm it resolves the student confusion they witness in classrooms.
*   **Latency Benchmarking:** Automated testing on a device lab of representative Vietnamese smartphones (e.g., Samsung A-series, Oppo, Xiaomi) to guarantee the <50ms target.

### Risk Mitigation

*   **Audio Latency Risk:** If Web Audio API latency is too high on certain Android devices, fallback to visual-only feedback (The "Minh" Journey) is a viable mitigation, keeping the core utility intact.
*   **Niche Appeal:** If the Sáo Trúc module is too niche, the core Piano/Guitar modules provide broader appeal to sustain growth.
