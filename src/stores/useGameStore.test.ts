import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGameStore } from './useGameStore';

describe('useGameStore', () => {
  beforeEach(() => {
    // Reset store state
    useGameStore.setState({
      isPlaying: false,
      score: 0,
      streak: 0,
      targetNote: null,
      bestStreak: 0,
      totalScore: 0
    });
    vi.restoreAllMocks();
  });

  it('initializes with default values', () => {
    const state = useGameStore.getState();
    expect(state.isPlaying).toBe(false);
    expect(state.score).toBe(0);
    expect(state.streak).toBe(0);
    expect(state.targetNote).toBeNull();
  });

  it('startGame resets score and sets isPlaying', () => {
    useGameStore.setState({ score: 10, streak: 5 });
    useGameStore.getState().startGame();

    const state = useGameStore.getState();
    expect(state.isPlaying).toBe(true);
    expect(state.score).toBe(0);
    expect(state.streak).toBe(0);
    expect(state.targetNote).toMatch(/^[A-G][#b]?[0-9]$/);
  });

  it('stopGame clears game state', () => {
    useGameStore.getState().startGame();
    useGameStore.getState().stopGame();

    const state = useGameStore.getState();
    expect(state.isPlaying).toBe(false);
    expect(state.targetNote).toBeNull();
  });

  it('checkAnswer increments score/streak on correct answer', () => {
    useGameStore.getState().startGame();
    const target = useGameStore.getState().targetNote;
    expect(target).not.toBeNull();

    // Simulate correct answer
    const result = useGameStore.getState().checkAnswer(target!);

    const state = useGameStore.getState();
    expect(result).toBe(true);
    expect(state.score).toBe(1);
    expect(state.streak).toBe(1);
    // Target should change (or be re-generated, likely different)
    // Note: It's possible random gen returns same note if we didn't implement 'prevNote' check in store integration,
    // but our generator supports it.
  });

  it('checkAnswer resets streak on incorrect answer', () => {
    useGameStore.getState().startGame();
    const target = useGameStore.getState().targetNote;

    // Create a wrong note (e.g., if target is C4, use D4)
    const wrongNote = target === 'C4' ? 'D4' : 'C4';

    // Set some initial streak
    useGameStore.setState({ streak: 5, score: 10 });

    const result = useGameStore.getState().checkAnswer(wrongNote);

    const state = useGameStore.getState();
    expect(result).toBe(false);
    expect(state.score).toBe(10); // Score shouldn't change
    expect(state.streak).toBe(0); // Streak resets
    expect(state.targetNote).toBe(target); // Target persists
  });
});
