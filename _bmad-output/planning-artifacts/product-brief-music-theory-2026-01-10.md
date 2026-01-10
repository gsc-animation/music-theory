---
stepsCompleted:
  - 1
  - 2
  - 3
  - 4
  - 5
inputDocuments:
  - /Users/steve/INFCAP/gsc-animation/music-theory/Requirements.md
date: 2026-01-10
author: Steve
---

# Product Brief: music-theory

<!-- Content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

The **music-theory** project aims to build the premier online music education platform specifically tailored for the Vietnamese market. Inspired by the utility of Musicca.com but significantly enhanced for local needs, this platform addresses the unique technical and pedagogical challenges of music education in Vietnam. It combines advanced web technologies (React, WebAssembly, Web Audio API) with deep cultural localization to provide an interactive, low-latency learning experience for Piano, Guitar, and uniquely, the Vietnamese Bamboo Flute (Sáo Trúc). By prioritizing a "mobile-first" approach and optimizing for local infrastructure constraints, the platform seeks to democratize access to high-quality music theory and instrument training for millions of Vietnamese learners.

---

## Core Vision

### Problem Statement
Vietnamese music learners currently lack access to high-quality, interactive online music theory tools that are compatible with their specific environment. Global platforms are often too heavy for mid-range mobile devices common in Vietnam, suffer from network latency, and fail to accommodate local pedagogical nuances—specifically the simultaneous use of Solfège and Latin notation systems and the complete lack of digital tools for traditional instruments like the Sáo Trúc.

### Problem Impact
- **Educational Friction:** Students struggle to apply concepts when software uses notation systems (e.g., exclusively English "C, D, E") that differ from what they learn in school (Solfège "Do, Re, Mi").
- **Accessibility Barrier:** High latency and poor performance on average Android devices make existing interactive tools frustrating or unusable for a large segment of the population.
- **Cultural Exclusion:** The absence of tools for traditional instruments like Sáo Trúc limits the preservation and modernization of traditional music education.

### Why Existing Solutions Fall Short
- **Musicca.com:** The "gold standard" competitor lacks deep localization (language and notation context), has no support for Sáo Trúc, and uses generic architecture not optimized for Vietnam's specific network instability (undersea cable issues).
- **Generic Apps:** Often fail to handle the complex state management required for real-time music feedback or use inefficient audio synthesis that drains battery and causes audio glitches on lower-end hardware.

### Proposed Solution
A high-performance **Single Page Application (PWA)** built on the **React** ecosystem, leveraging **Tone.js** for precise audio scheduling and **VexFlow** for dynamic music notation.
- **Architecture:** Offline-first PWA design with a domestic Multi-CDN strategy to ensure speed and stability.
- **Audio Engine:** Custom "Lookahead Scheduler" and WASM-based pitch detection (YIN algorithm) to guarantee professional-grade timing and interaction, even on mobile.
- **Pedagogy:** A sophisticated "Note Dictionary Strategy Pattern" to dynamically switch between Solfège and Latin notation based on user context.

### Key Differentiators
1.  **Sáo Trúc Simulator:** The world's first comprehensive web-based simulator and dynamic fingering chart engine for the Vietnamese Bamboo Flute, supporting 6-hole and 10-hole systems with "half-holing" visualization.
2.  **Context-Aware Localization:** Unlike simple translation, the system adapts musical terminology (e.g., displaying "C Major" for Guitar vs "Nốt Đô" for sight-reading) to match specific learning contexts.
3.  **Hyper-Localization of Tech:** Specific engineering for Vietnamese infrastructure, including "unlocking" mobile audio contexts and using highly compressed, pitch-shifted samples to respect user data plans and device memory.

## Target Users

### Primary Users

#### 1. The Young Beginner (e.g., "Bé An", 7 years old)
- **Context:** A Grade 1 student just starting to get acquainted with music in school or at a small local center.
- **Motivation:** Loves playing games and wants to play simple songs on the piano or recorder. Parents want a safe, educational activity.
- **Pain Points:** Traditional music theory books are dry and boring. Existing apps are in English (hard to understand) or too laggy on dad's older Android phone.
- **Success Vision:** Can recognize notes on the staff and play a simple nursery rhyme within the first week. "It feels like playing a game, not studying!"

#### 2. The Casual Hobbyist (e.g., "Minh", 20 years old)
- **Context:** A university student or young professional learning Guitar or Sáo Trúc in their free time to socialize.
- **Motivation:** Wants to read sheet music to play popular V-Pop songs or traditional folk tunes.
- **Pain Points:** Confused by the mix of "Do Re Mi" and "C D E". Finds YouTube tutorials hard to follow without understanding the basics of rhythm and pitch.
- **Success Vision:** Quickly grasps the connection between the sheet music and their instrument's fingering.

### Secondary Users
*While the focus is on the learner, we acknowledge the "Facilitators":*
- **Parents/Music Tutors:** They don't use the app to learn, but they recommend it because it's "safe," works on any device, and keeps the student engaged without needing constant supervision.

### User Journey (The "Fun & Easy" Path)
1.  **Discovery:** Users search for "học nhạc lý online" or "cách đọc nốt nhạc" and find the site. It loads instantly, even on 4G.
2.  **Onboarding (The "Grade 1" Test):** No login required immediately. They see a simple, colorful exercise: "Nốt này tên là gì?" (What note is this?).
3.  **Core Interaction (The "Aha!" Moment):**
    *   **Action:** They press a virtual piano key or blow into their Sáo Trúc (microphone).
    *   **Feedback:** The system responds *instantly* (low latency). A cheerful sound plays, and the note lights up green.
    *   **Result:** They realize, "I can do this!" The intimidation of music theory vanishes.
4.  **Habit Formation:** Short, 5-minute daily exercises that feel like unlocking levels in a game.

## Success Metrics

### User Success Metrics
*   **The "Confidence Shift":** Users transition from believing "music theory is too hard" to completing their first level perfect score.
*   **Active Learning:** Users don't just read; they interact. Success is defined by the number of correct notes played or identified, not just page views.
*   **Social Validation:** Participation in leaderboards or sharing achievement badges ("Music Theory Master - Level 1") on social media.

### Business Objectives (Non-Profit / Educational Impact)
*   **Market Penetration:** Establish the platform as the #1 free resource for music theory in Vietnam within 12 months.
*   **Retention:** Build a habit-forming product where users return daily for short practice sessions.
*   **Brand Authority:** Become the recommended tool for music teachers across the country.

### Key Performance Indicators (KPIs)
*   **Engagement (Primary):** **Average Session Duration > 10 minutes**. (This indicates deep focus and practice, not just browsing).
*   **Retention:** **Day-7 Retention Rate > 20%**. (Users come back a week after their first visit).
*   **Completion Rate:** % of users who finish the "Onboarding/Grade 1" module with a passing score.
*   **Virality:** Number of weekly shares of Leaderboard achievements on Facebook/Zalo.
*   **Technical Performance:** **Average "Time to Interactive" (TTI) < 2s** on 4G networks (critical for the "fun/instant" feeling).

## MVP Scope

### Core Features (The "Music Reader" MVP)
1.  **Interactive Music Sheet:**
    *   VexFlow-rendered staff that displays notes dynamically.
    *   "Note Dictionary" system: Toggles between Solfège (Do, Re, Mi) and Latin (C, D, E) labels on demand.
2.  **Audio-Visual Feedback Loop:**
    *   Click/Touch a note on the staff -> Hear the correct Piano sound immediately (Tone.js).
    *   Virtual Piano Keyboard on screen -> Press key -> See corresponding note light up on the staff.
3.  **Basic "Note Recognition" Game:**
    *   Random notes appear on the treble clef.
    *   User has 5 seconds to identify the note (Multiple choice or Piano key press).
    *   Simple scoring system (streak counter).
4.  **Sáo Trúc (Bamboo Flute) "Lite" Support:**
    *   Static fingering chart: Show a note, display the basic 6-hole fingering diagram. (No complex blowing simulation yet, just visual reference).
5.  **Offline Capability:**
    *   Basic Service Worker to cache the app shell and audio samples so it works without internet after the first load.

### Out of Scope for MVP
*   **Microphone Input (Pitch Detection):** We will NOT implement the "blow into the mic to play" feature in MVP. It's technically risky and requires extensive testing across devices.
*   **Guitar Fretboard & Chords:** We will focus on Piano and Sáo Trúc (melody instruments) first to teach basic reading. Guitar chords introduce complexity (multiple notes at once) that we'll save for v1.1.
*   **User Accounts/Login:** No backend database for saving progress. Scores are stored in local `localStorage` only.
*   **Complex Rhythms:** We will stick to whole, half, and quarter notes. No sixteenth notes or triplets yet.

### MVP Success Criteria
*   **Functional:** A user can tap through all 7 natural notes (Do-Si) on the staff and hear the correct pitch without audio glitches on a low-end Android device.
*   **Educational:** A user who scores 0/10 on the pre-test scores at least 7/10 on the post-test after 15 minutes of usage.
*   **Performance:** App loads in under 3 seconds on a simulated 3G network.

### Future Vision
*   **Phase 2:** Unlock the Microphone! Allow users to play their real Sáo Trúc or Guitar to answer questions.
*   **Phase 3:** "Social Practice." Classroom mode where a teacher can assign exercises and see student progress.
*   **Phase 4:** Content Marketplace. Teachers can upload their own V-Pop sheet music for students to learn.
