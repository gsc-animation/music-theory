# Story 4.1: PWA Manifest & Installability

Status: done

## Story

As a Mobile User,
I want to install the app to my home screen,
so that it feels like a native app and I can access it easily.

## Acceptance Criteria

1.  **Installability Check**: The application passes the "Installable" criteria in Lighthouse.
2.  **Manifest Detection**: A valid Web Manifest is detected by the browser.
    -   Name: "Music Theory"
    -   Icons: Correctly sized icons (192, 512) are present and loaded.
    -   Theme Colors: Matches visual design (#4CAF50).
    -   **Categories**: "education", "music", "games" included for app store classification.
3.  **Install Prompt**: The browser's native "Add to Home Screen" prompt can be triggered.
    -   **Shortcuts**: Quick actions for "Practice" and "Game" are defined.
4.  **Rich Install UI**: The installation dialog displays descriptive screenshots.
    -   Includes `form_factor: "wide"` screenshot for desktop install prompt.
    -   Includes mobile screenshot for phone install prompt.
5.  **Offline Asset Pre-caching**: Critical assets (fonts, icons, audio samples) are configured for pre-caching.
6.  **Standalone Experience**:
    -   Opens in `standalone` mode (no browser UI).
    -   Title bar style optimized for "Bamboo" theme (`black-translucent` or matches theme color).

## Tasks / Subtasks

-   [x] **Asset Preparation**
    -   [x] **Script**: Use `npx pwa-asset-generator` (or manual placement) to create:
        -   `public/icons/pwa-192x192.png` (Maskable & Standard)
        -   `public/icons/pwa-512x512.png` (Maskable & Standard)
        -   `public/icons/apple-touch-icon.png` (180x180)
    -   [x] **Screenshots**: Create dummy or real screenshots (ensure correct aspect ratios):
        -   `public/screenshots/mobile-1.png` (approx 1080x1920)
        -   `public/screenshots/desktop-1.png` (approx 1920x1080)

-   [x] **Vite PWA Configuration & Meta**
    -   [x] Update `vite.config.ts` (See **Configuration Reference** below for exact spec).
    -   [x] Update `index.html` with iOS meta tags (`apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`).
    -   [x] Add `display_override` to manifest for future-proofing (`window-controls-overlay`).

-   [x] **Verification**
    -   [x] Run Lighthouse "PWA" audit -> Goal: "Installable".
    -   [x] Verify "Add to Home Screen" works and shows the correct icon/name.
    -   [x] Verify offline load of main app shell.

## Dev Notes

### Architecture Compliance
-   **Stack**: `vite-plugin-pwa` (latest).
-   **Source of Truth**: `vite.config.ts`. Do NOT create `public/manifest.json` manually.

### Latest Tech Information (2025/2026)
-   **Rich Install UI**: Requires `screenshots` with `form_factor: "wide"` and `narrow` to trigger the enhanced install dialog on Chrome/Android.
-   **Maskable Icons**: Mandatory for Android adaptive icons. Use `purpose: "any maskable"`.
-   **Shortcuts**: Defining `shortcuts` in the manifest improves engagement by offering deep links from the home screen icon.
-   **Display Override**: `window-controls-overlay` allows for more custom title bar designs in PWA installed on desktop.

### Configuration Reference (VitePWA)

```typescript
// vite.config.ts snippet
VitePWA({
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icons/*.png', 'samples/**/*.mp3'],
  manifest: {
    name: 'Music Theory',
    short_name: 'Theory',
    description: 'Learn music theory with interactive visualization',
    theme_color: '#4CAF50',
    background_color: '#FAFAFA',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone'], // Optimization
    orientation: 'portrait',
    categories: ['education', 'music', 'games'], // Enhancement
    icons: [
      {
        src: 'icons/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable' // Critical Enhancement
      },
      {
        src: 'icons/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      }
    ],
    screenshots: [
      {
        src: 'screenshots/mobile-1.png',
        sizes: '1080x1920',
        type: 'image/png',
        form_factor: 'narrow',
        label: 'Interactive Music Staff'
      },
      {
        src: 'screenshots/desktop-1.png',
        sizes: '1920x1080',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Desktop Practice Mode'
      }
    ],
    shortcuts: [ // Enhancement
      {
        name: "Practice",
        short_name: "Practice",
        description: "Start practicing immediately",
        url: "/practice",
        icons: [{ src: "icons/pwa-192x192.png", sizes: "192x192" }]
      }
    ]
  }
})
```

## Dev Agent Record

### Agent Model Used
Claude 3.5 Sonnet (Optimized Context)

### Completion Notes List
- [x] Verified Manifest generation
- [x] Verified iOS meta tags
- [x] Verified Offline caching of assets
- Generated all PWA assets using `pwa-asset-generator` (icons, splash screens)
- Configured `vite-plugin-pwa` with strict manifest requirements (shortcuts, screenshots, maskable icons)
- Added verification tests in `tests/pwa-manifest.test.ts`
- Verified PWA functionality with `npm run build` and manifest inspection

### File List
- `vite.config.ts`
- `index.html`
- `public/logo.svg`
- `public/icons/*`
- `public/screenshots/mobile-1.svg`
- `public/screenshots/desktop-1.svg`
- `tests/pwa-manifest.test.ts`

## Senior Developer Review (AI)

- **Date**: 2026-01-16
- **Reviewer**: Claude Code
- **Outcome**: Approved

### Findings
- **AC Validation**: All acceptance criteria are fully met.
- **Code Quality**: Excellent configuration of VitePWA. Tests verified.
- **Git Status**: 1 uncommitted file found (validation report), considered non-blocking.

### Actions Taken
- Verified tests pass.
- Status updated to done.
