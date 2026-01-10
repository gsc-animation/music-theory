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
lastStep: 6
---

# UX Design Specification music-theory

**Author:** Steve
**Date:** 2026-01-10

---

<!-- UX design content will be appended sequentially through collaborative workflow steps -->

## Executive Summary

### Project Vision
To create a "fun, instant, and accessible" music learning experience that feels like a game, not a textbook. The design must prioritize performance (perceived speed) and clarity, making music theory approachable for a 7-year-old Vietnamese student on their parent's Android phone.

### Target Users
*   **The Young Beginner (Bé An, 7yo):** Needs colorful, large touch targets, immediate feedback, and gamified progress. Attention span is short.
*   **The Casual Hobbyist (Minh, 20yo):** Needs clear utility, quick access to specific knowledge (chords, reading), and mobile responsiveness for on-the-go practice.
*   **Facilitators (Parents):** Need to trust the platform is safe and educational.

### Key Design Challenges
1.  **Perceived Latency:** The UI must respond *instantly* to touch, even if the audio engine has a slight delay, to maintain the illusion of a real instrument.
2.  **Cognitive Load Management:** displaying complex musical notation (staves, notes, fingerings) on small mobile screens without overwhelming the user.
3.  **Dual-Notation System:** The UI must elegantly handle the toggling between "Do-Re-Mi" and "C-D-E" labels without cluttering the interface.

### Design Opportunities
1.  **The "Aha!" Loop:** Using immediate visual reinforcement (lighting up keys/notes) synchronized with sound to create a satisfying feedback loop.
2.  **Cultural Delight:** Incorporating visual motifs relevant to Vietnamese culture (e.g., bamboo textures for the Sáo Trúc module) to create emotional resonance.
3.  **Micro-Interactions:** celebratory animations for small wins (identifying a note correctly) to build confidence and habit.

## Core User Experience

### Defining Experience
The core experience is **"Gamified Instant Gratification."**
Unlike traditional music study which is slow and dry, using *music-theory* feels like popping bubble wrap—satisfying, immediate, and addictive. The user sees a note, touches a button, and *instantly* hears the sound and sees a light. This tight feedback loop turns "studying" into "playing."

**Core User Action:** The "Identify & Verify" Loop.
1.  **Stimulus:** System displays a note on the staff.
2.  **Action:** User taps the corresponding key/hole.
3.  **Feedback:** Instant sound + Green Light (Success) or Red Light (Correction).
4.  **Reward:** Score increments, encouraging the next attempt.

### Platform Strategy
*   **Mobile-First PWA:** Designed primarily for vertical (portrait) orientation on Android smartphones (the most common device for the target demographic).
*   **Touch-Centric:** All interaction targets (piano keys, holes) must be large enough for "fat thumbs" (>48px).
*   **Offline-Ready:** The experience must not break if the 4G connection drops; the app shell and audio assets load once and persist.
*   **Audio-Unlocked:** specific UX patterns (e.g., "Tap to Start") to handle browser autoplay policies and unlock the AudioContext immediately.

### Effortless Interactions
*   **The "Rosetta Stone" Toggle:** A single, always-visible switch to flip between "Do-Re-Mi" and "C-D-E" notation. No digging in settings.
*   **Instant Audio:** Audio samples must be preloaded/synthesized so there is zero perceptible lag between touch and sound.
*   **No-Login Start:** Users can start practicing immediately upon landing on the site; no registration wall blocks the first "Aha!" moment.

### Critical Success Moments
*   **The First "Ding":** The very first time a user taps a note, the sound must be loud, clear, and instant. If it lags or is silent, trust is lost.
*   **The "I Get It" Moment:** When a user toggles the notation switch and sees the labels change instantly, realizing they can learn in their preferred language.
*   **The Streak:** Visualizing a string of correct answers (e.g., x5, x10) to build momentum and the feeling of competence.

### Experience Principles
1.  **Speed is Trust:** In music, timing is everything. The UI must react faster than the user thinks.
2.  **Culture is Comfort:** Use familiar terminology and visuals (Sáo Trúc bamboo aesthetics) to make the technology feel welcoming, not alien.
3.  **Clarity over Complexity:** Show only what is needed for the current task. Hide advanced music theory clutter until the user is ready.
4.  **Forgiving Feedback:** Mistakes are learning opportunities. Error feedback should be gentle and instructive, not punitive.

## Desired Emotional Response

### Primary Emotional Goals
*   **Joyful Competence:** The user should feel "I can do this!" The system transforms the intimidation of music theory into a series of winnable micro-games.
*   **Cultural Connection:** A feeling of home and familiarity, provided by the Sáo Trúc visuals and the Vietnamese language priority.
*   **Flow:** The feeling of being "in the zone," facilitated by the instant responsiveness and lack of technical friction.

### Emotional Journey Mapping
*   **Discovery:** *Curiosity* ("Can I really learn this on a phone?") $\rightarrow$ *Delight* ("Wow, it sounds like a real piano!").
*   **Action (The Drill):** *Focus* (Identifying the note) $\rightarrow$ *Satisfaction* (The "Ding" and green flash).
*   **Failure:** *Encouragement* (Gentle shake, "Try again") $\rightarrow$ *Determination* (Not frustration; the game feels fair).
*   **Return:** *Pride* ("Look at my streak badge") $\rightarrow$ *Habit* ("I'll just play for 5 minutes").

### Micro-Emotions
*   **The "Snap":** The visceral satisfaction of a button press that responds instantly (like popping bubble wrap).
*   **The "Cozy" Factor:** Warm colors (bamboo yellows/greens) and rounded corners invoke a safe, non-academic environment.
*   **Relief:** The feeling when switching notation styles and suddenly understanding the symbols.

### Design Implications
*   **Joyful Competence:** Use celebratory particles (confetti, stars) even for small wins. Avoid harsh red error states; use softer "try again" visuals.
*   **Cultural Connection:** Use textures (bamboo, rice paper) subtly in the background or UI borders. Use a font that supports Vietnamese diacritics beautifully.
*   **Flow:** Eliminate loading spinners whenever possible. Transitions between screens should be seamless morphs, not hard cuts.
*   **Safety/Trust:** No dark patterns. No unexpected popups asking for money or data. The UI feels stable and honest.

### Emotional Design Principles
1.  **Celebrate Every Win:** Learning music is hard. The UI should be the user's biggest cheerleader.
2.  **Never Blame the User:** If they get it wrong, it's a "miss," not a "failure." If the audio doesn't load, it's "checking sound," not "error."
3.  **Warmth over Coolness:** Prefer warm, organic tones (EdTech) over cold, sterile blues (Corporate SaaS).

## Visual Design Foundation

### Color System
*   **Primary Palette (Bamboo & Growth):**
    *   **Primary Green:** `Bamboo Green` (#4CAF50) - Represents growth, correctness, and the bamboo flute. Used for primary actions and success states.
    *   **Secondary Earth:** `Warm Wood` (#8D6E63) - Represents the instrument body and stability. Used for structural elements and borders.
    *   **Background:** `Rice Paper` (#FAFAFA) - A warm, off-white background that reduces eye strain and feels organic.
*   **Functional Colors:**
    *   **Success:** `Bright Leaf` (#66BB6A) - High-contrast green for immediate positive feedback.
    *   **Error/Correction:** `Gentle Clay` (#E57373) - A softer terracotta/red that signals "try again" without being aggressive.
    *   **Neutral:** `Stone Grey` (#616161) - For text and secondary icons, ensuring high contrast against the rice paper background.

### Typography System
*   **Primary Typeface:** **Nunito** or **Quicksand** (Rounded Sans-serif).
    *   **Rationale:** These fonts are friendly, approachable, and highly legible for children. They have excellent support for Vietnamese diacritics.
*   **Hierarchy:**
    *   **Headings:** Bold, playful, with slightly larger letter spacing to feel open.
    *   **Body:** High legibility with generous line height (1.5) to ensure readability on small screens.
    *   **Labels (Musical Notes):** A clear, monospaced or distinct sans-serif (e.g., **Fira Code** or **Roboto Mono**) for note names (C, D, E / Do, Re, Mi) to prevent ambiguity.

### Spacing & Layout Foundation
*   **Grid System:** 8pt base grid. All spacing and sizing should be multiples of 8 (8, 16, 24, 32, 48).
*   **Touch Targets:** **Minimum 48x48dp** for all interactive elements (piano keys, flute holes, toggle switches). This is non-negotiable for the "fat thumb" mobile experience.
*   **Density:** "Airy." The layout should focus on one task at a time (e.g., a single staff line and the answer keys) to reduce cognitive load for beginners.
*   **Container Style:** Card-based layout with generous **Rounded Corners (12px - 16px)** to reinforce the friendly, safe, and "organic" feel.

### Accessibility Considerations
*   **Contrast:** All text and essential icons must meet WCAG AA standards (4.5:1 contrast ratio).
*   **Color Independence:** Color should not be the only indicator of success/failure. Use icons (Checkmark vs. X) or shapes alongside color changes (Green Light vs. Red Light) to support color-blind users.
*   **Screen Reader:** All interactive elements must have proper ARIA labels (e.g., `aria-label="Note C, Do"`).

## Design System Foundation

### 1.1 Design System Choice

**Themeable System: Material UI (MUI) v6 + Tailwind CSS**

We will utilize a hybrid approach: using **MUI Core (unstyled)** or **MUI Base** components for accessibility and behavioral reliability, styled with **Tailwind CSS** to achieve the unique "Bamboo & Rice Paper" aesthetic without fighting default Material Design opinionated styles.

### Rationale for Selection

1.  **Accessibility (a11y) & Localization:** MUI has best-in-class support for accessibility (keyboard nav, screen readers) and RTL/Internationalization, which is critical for an educational tool that must support diverse users (including potential future expansion).
2.  **Speed of Development:** Tailwind CSS allows for rapid styling and iteration of the custom "organic" look (rounded corners, warm colors) without writing heavy custom CSS.
3.  **Performance:** By using the unstyled/base components and Tailwind's utility-first approach, we keep the bundle size optimized for the 3G/4G target market, avoiding the heavy runtime costs of full styled-components if managed poorly.
4.  **Touch-Ready:** MUI's components are mobile-first and touch-optimized out of the box (Ripple effects, touch target sizes), saving us from rebuilding complex interactions for the Sáo Trúc and Piano keys.

### Implementation Approach

*   **Foundation:** React 19 + Vite.
*   **Component Library:** `@mui/base` (headless components) for complex interactives (Modals, Toggles, Sliders).
*   **Styling Engine:** Tailwind CSS v4.
*   **Iconography:** `Lucide React` (for clean, rounded icons that match Quicksand/Nunito).
*   **Animation:** `Framer Motion` for the "Game Loop" feedback (micro-interactions, success particles).

### Customization Strategy

*   **Design Tokens:** We will map the "Bamboo & Growth" color palette to Tailwind configuration (`colors.bamboo`, `colors.ricePaper`).
*   **Typography:** Configure Tailwind font family utilities to use **Nunito** for UI and **Fira Code** for musical notation.
*   **Component Overrides:** We will create a `components/` directory where we wrap MUI Base components with our specific Tailwind classes to create our "Lego Blocks" (e.g., `<BambooButton>`, `<NoteCard>`, `<ToggleSwitch>`).
*   **Touch Targets:** Global override in CSS to ensure `min-height: 48px` and `min-width: 48px` for all tappable areas.
