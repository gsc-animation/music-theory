# Story 1.1: Project Initialization & Architecture Setup

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Developer,
I want to initialize the Vite+React project with the defined directory structure and dependencies,
so that we have a stable foundation for development.

## Acceptance Criteria

1. **Given** a new environment
   **When** `npm install` and `npm run dev` are run
   **Then** the default Vite app loads without errors
2. **And** `package.json` includes `tone`, `vexflow`, `zustand`, `tailwindcss`, `vite-plugin-pwa`
3. **And** `tailwind.config.js` is configured with the "Bamboo" palette

## Tasks / Subtasks

- [x] Task 1: Initialize Project & Dependencies
  - [x] Run `npm create vite@latest music-theory -- --template react-ts`
  - [x] Install core dependencies: `tone`, `vexflow`, `zustand`, `react-router-dom`
  - [x] Install UI dependencies: `@mui/base` (Using `@base-ui/react`), `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`
  - [x] Install dev dependencies: `tailwindcss`, `postcss`, `autoprefixer`, `vite-plugin-pwa`, `@types/tone`, `@types/vexflow`
- [x] Task 2: Configure Tailwind CSS & Typography
  - [x] Initialize Tailwind: `npx tailwindcss init -p` (Used Tailwind v4 `@tailwindcss/vite`)
  - [x] Update `tailwind.config.js` with Bamboo palette (Configured via CSS variables in `src/index.css` for v4)
  - [x] Configure Fonts: Nunito/Quicksand (UI) and Fira Code/Roboto Mono (Code/Notes) via Google Fonts in `index.html` or CSS import
- [x] Task 3: Implement Project Structure
  - [x] Create directory tree: `src/features`, `src/services`, `src/stores`, `src/components/ui`, `src/components/layout`, `public/samples`
  - [x] Create strict architectural boundaries: `src/services/audio-engine.ts` (Singleton)
- [x] Task 4: Setup PWA & Build
  - [x] Configure `vite-plugin-pwa` in `vite.config.ts` (minimal manifest)
  - [x] Verify `npm run build` produces a valid distribution
  - [x] Verify `npm run dev` starts the server

## Dev Notes

### Architecture Compliance

- **Project Structure:** strict adherence to the Feature-Folder pattern.
  - `src/features/sheet/`
  - `src/features/audio/`
  - `src/features/sao-truc/`
  - `src/features/game/`
- **State Management:** `zustand` is mandatory. Do NOT use Redux or Context API for high-frequency state.
- **Styling:** Use Tailwind Utility classes. Avoid CSS Modules unless absolutely necessary for complex animations.

### Technical Requirements

- **Tone.js:** Ensure `tone` is installed. Note that `tone` might need specific TypeScript configuration or types (`@types/tone`).
- **VexFlow:** Ensure `vexflow` is installed (likely `vexflow` or `vexflow-git` depending on latest stable). Use standard `vexflow` package.
- **PWA:** Basic PWA setup is required. The `vite-plugin-pwa` should be configured with `registerType: 'autoUpdate'` for now.

### Visual Design (UX) Requirements

- **Palette:**
  - `bamboo`: `#4CAF50`
  - `warmWood`: `#8D6E63`
  - `ricePaper`: `#FAFAFA`
  - `brightLeaf`: `#66BB6A` (Success)
  - `gentleClay`: `#E57373` (Error)
  - `stoneGrey`: `#616161` (Neutral)
- **Fonts:**
  - Import `Nunito` (weights 400, 600, 700) and `Fira Code` from Google Fonts.

### References

- [Architecture: Technical Stack](_bmad-output/planning-artifacts/architecture.md#technical-stack)
- [Architecture: Project Structure](_bmad-output/planning-artifacts/architecture.md#complete-project-directory-structure)
- [UX: Color System](_bmad-output/planning-artifacts/ux-design-specification.md#color-system)

## Dev Agent Record

### Agent Model Used

Claude 3.5 Sonnet (via Claude Code)

### Debug Log References

- Tailwind CSS v4 requires `@tailwindcss/vite` instead of `tailwind.config.js`. Configured via `src/index.css` CSS variables.
- `@mui/base` installed as `@base-ui/react` (new package name).
- Added `vitest` and `@testing-library` to support testing as Architecture required `tests/setup.ts`.
- **Review Update:** Corrected `package.json` name from `temp-app` to `music-theory`.
- **Review Update:** Removed `console.log` from production code in `audio-engine.ts`.

### Completion Notes List

- Initialized Vite+React+TS project.
- Installed all dependencies (Tone.js, VexFlow, Zustand, Router, Base UI, Tailwind v4).
- Configured Tailwind v4 with Bamboo palette variables in `src/index.css`.
- Configured Fonts (Nunito, Fira Code) in `index.html`.
- Created Project Structure (`src/features`, `src/services`, etc.).
- Created `AudioEngine` singleton (`src/services/audio-engine.ts`).
- Added `vitest` unit tests for `AudioEngine` to verify singleton and initialization.
- Verified build success with PWA manifest generation.
- **Review Fixes Applied:** Renamed package, cleaned up logging, updated file list.

### File List

- package.json
- package-lock.json
- vite.config.ts
- index.html
- src/index.css
- src/services/audio-engine.ts
- src/services/audio-engine.test.ts
- tests/setup.ts
- tsconfig.json
- tsconfig.app.json
- tsconfig.node.json
- eslint.config.js
- README.md
