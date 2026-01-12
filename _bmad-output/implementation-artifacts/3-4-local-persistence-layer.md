# Story 3.4: Local Persistence Layer

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a Returning Player,
I want my high scores and streak data saved locally,
So that I can pick up exactly where I left off, even if I close the browser.

## Acceptance Criteria

1.  **Automatic Persistence**:
    *   **Given** I have an active game session
    *   **When** my score or streak changes
    *   **Then** the new values are immediately saved to local storage.
    *   **And** this happens without blocking the UI (no frame drops).
    *   **And** this MUST fail gracefully if storage is unavailable or quota is exceeded (no crash).

2.  **Session Restoration**:
    *   **Given** I have played before
    *   **When** I reload the page or reopen the PWA
    *   **Then** my "Best Streak" is restored from storage.
    *   **And** the UI shows a "Loading..." state if restoration is slow (prevent "flash of zero").
    *   **And** if an active streak was interrupted, it is reset (active streak is transient).

3.  **Data Durability (PWA)**:
    *   **Given** the app is installed as a PWA
    *   **When** the OS runs low on space
    *   **Then** the app attempts to request "Persistent Storage" permission (best effort) to prevent data eviction.
    *   **Constraint**: This MUST only run in a Secure Context (HTTPS) to prevent browser errors.

4.  **Schema Versioning**:
    *   **Given** the storage schema might change in future updates
    *   **When** saving data
    *   **Then** a `version` field is included in the persisted object to allow future migrations.

5.  **Strict State Isolation**:
    *   **Given** the store contains complex objects (AudioContext, MediaStream)
    *   **When** persisting state
    *   **Then** ONLY the `bestStreak` and `totalScore` (integers) are saved.
    *   **Constraint**: Persisting `AudioContext` or `MediaStream` is strictly FORBIDDEN as it breaks hydration.

## Tasks / Subtasks

- [x] **Task 1: Architecture Setup**
    - [x] Install `idb-keyval` or confirm `zustand/persist` strategy.
        - *Decision*: Use `zustand/persist` with `localStorage` for now as the data schema is trivial (< 1KB).
    - [x] Configure `zustand/persist` middleware in `useGameStore`.
    - [x] **Implement Schema Versioning**: Add `version: 1` to the persist config options.

- [x] **Task 2: Update Game Store**
    - [x] Modify `src/stores/useGameStore.ts`.
    - [x] Define `PersistedState` interface (strictly `bestStreak`, `totalScore`, `version`).
    - [x] Add `persist` middleware to the store creation.
    - [x] **Strict Whitelist**: Use `partialize` to explicitly select ONLY `bestStreak` and `totalScore`.

- [x] **Task 3: Storage Durability (PWA)**
    - [x] Create `src/services/storage-manager.ts`.
    - [x] Implement `requestPersistentStorage()` function using `navigator.storage.persist()`.
    - [x] **Safety Check**: Wrap in `if (window.isSecureContext && navigator.storage)` check.
    - [x] **Debug Stats**: Implement `getStorageEstimate()` to log usage/quota in development mode.

- [x] **Task 4: UI Integration (Dashboard)**
    - [x] Update `HomePage.tsx` to display "Best Streak".
    - [x] **Hydration State**: Handle the `onRehydrateStorage` callback (if supported) or check initial state to show a spinner/skeleton if needed (likely instant for localStorage, but good practice).

## Implementation Guide

### 1. State Management (Zustand)
- Use `zustand/middleware/persist`.
- **Configuration Pattern**:
    ```typescript
    {
      name: 'music-theory-storage',
      version: 1, // Enhancement: Versioning
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bestStreak: state.bestStreak,
        totalScore: state.totalScore
      }), // Enhancement: Strict Whitelist
      onRehydrateStorage: () => (state) => {
        console.log('Hydration finished');
      }
    }
    ```

### 2. Storage Durability Service
- **Location**: `src/services/storage-manager.ts`
- **Pattern**:
    ```typescript
    export async function requestPersistentStorage(): Promise<boolean> {
      if (!window.isSecureContext || !navigator.storage) return false;
      // ... implementation
    }
    ```
- **Service Worker Note**: While minimal now, this service will coordinate with SW updates in future stories.

### 3. Error Handling & Quotas
- **Requirement**: Wrap storage calls in try/catch (if using raw API) or rely on `createJSONStorage`'s internal handling.
- **Quota Exceeded**: If `localStorage` is full (rare for integers), catch the error and degrade gracefully (game continues, just doesn't save).

### 4. Developer Visibility
- **Enhancement**: In `development` mode (`import.meta.env.DEV`), log the storage estimate to console on startup.
  - `navigator.storage.estimate().then(...)`

## Dev Agent Record

### Agent Model Used
gemini-3-pro-preview

### Debug Log References

### Completion Notes List
- Implemented `useGameStore` persistence using `zustand/middleware/persist` with strict partialization.
- Created `src/services/storage-manager.ts` for PWA durability requests (secure context only).
- Updated `HomePage.tsx` to display `Best Streak` and trigger storage durability request on mount.
- Added comprehensive unit tests for `useGameStore.persistence` and `storage-manager`.
- Updated `GameOverlay` to show Best Streak instead of High Score (renamed constant).
- Verified tests pass with `npm test`.

### File List
src/stores/useGameStore.ts
src/stores/useGameStore.persistence.test.ts
src/stores/useGameStore.test.ts
src/services/storage-manager.ts
src/services/storage-manager.test.ts
src/pages/HomePage.tsx
src/features/game/components/GameOverlay.tsx
src/features/game/components/GameOverlay.test.tsx
src/constants/app-strings.ts
