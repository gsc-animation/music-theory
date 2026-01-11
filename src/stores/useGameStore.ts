import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { generateRandomNote } from '../features/game/logic/note-generator';
import { calculateScore, calculateStreak } from '../features/game/logic/scoring';

interface GameState {
  isPlaying: boolean;
  targetNote: string | null;
  score: number;
  streak: number;
  highScore: number;

  startGame: () => void;
  stopGame: () => void;
  checkAnswer: (note: string) => boolean;
}

const getSavedHighScore = (): number => {
  try {
    const val = localStorage.getItem('highScore');
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  } catch {
    return 0;
  }
};

const saveHighScore = (score: number) => {
  try {
    localStorage.setItem('highScore', score.toString());
  } catch (e) {
    console.warn('Failed to save high score:', e);
  }
};

export const useGameStore = create<GameState>()(
  devtools(
    (set, get) => ({
      isPlaying: false,
      targetNote: null,
      score: 0,
      streak: 0,
      highScore: getSavedHighScore(),

      startGame: () => {
        set({
          isPlaying: true,
          score: 0,
          streak: 0,
          targetNote: generateRandomNote()
        });
      },

      stopGame: () => {
        set({
          isPlaying: false,
          targetNote: null
        });
      },

      checkAnswer: (note: string) => {
        const { targetNote, score, streak, highScore } = get();

        // Game must be playing and have a target
        if (!targetNote) return false;

        // Simple case-insensitive comparison
        const isCorrect = note.toUpperCase() === targetNote.toUpperCase();

        if (isCorrect) {
          const newScore = calculateScore(score, true);
          const newStreak = calculateStreak(streak, true);
          // Generate new note, ensuring it's different from current
          const newTarget = generateRandomNote(targetNote);

          // Update high score if needed
          const newHighScore = Math.max(newStreak, highScore);
          if (newHighScore > highScore) {
             saveHighScore(newHighScore);
          }

          set({
            score: newScore,
            streak: newStreak,
            targetNote: newTarget,
            highScore: newHighScore
          });

          return true;
        } else {
          const newStreak = calculateStreak(streak, false);
          // Incorrect: Reset streak, keep target
          set({ streak: newStreak });
          return false;
        }
      }
    }),
    { name: 'GameStore' }
  )
);
