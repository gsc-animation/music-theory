import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSettingsStore } from './useSettingsStore';

// Mock persist middleware behavior if needed, or rely on jsdom localStorage
// For simplicity in unit tests, we often want to test the logic.
// However, since persist is a middleware, we need to ensure the store behaves correctly.

describe('useSettingsStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    // Zustand stores persist state between tests, so we need to reset
    useSettingsStore.setState({ notationSystem: 'latin' });
    localStorage.clear();
  });

  it('should have default notation system as "latin"', () => {
    expect(useSettingsStore.getState().notationSystem).toBe('latin');
  });

  it('should update notation system when setNotationSystem is called', () => {
    useSettingsStore.getState().setNotationSystem('solfege');
    expect(useSettingsStore.getState().notationSystem).toBe('solfege');

    useSettingsStore.getState().setNotationSystem('latin');
    expect(useSettingsStore.getState().notationSystem).toBe('latin');
  });

  it('should toggle notation system', () => {
    // latin -> solfege
    useSettingsStore.getState().toggleNotationSystem();
    expect(useSettingsStore.getState().notationSystem).toBe('solfege');

    // solfege -> latin
    useSettingsStore.getState().toggleNotationSystem();
    expect(useSettingsStore.getState().notationSystem).toBe('latin');
  });

  it('should persist state to localStorage', () => {
    useSettingsStore.getState().setNotationSystem('solfege');

    // Verify it's in localStorage
    const storedValue = localStorage.getItem('music-theory-settings');
    expect(storedValue).toBeDefined();
    expect(storedValue).toContain('solfege');
  });
});
