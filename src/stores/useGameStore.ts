import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { generateRandomNote } from '../features/game/logic/note-generator';
import { POINTS_PER_CORRECT_ANSWER, STORAGE_KEY } from '../features/game/constants';
import { calculateScore, calculateStreak } from '../features/game/logic/scoring';

interface GameState {
  isPlaying: boolean;
  targetNote: string | null;
  score: number;
  streak: number;
  bestStreak: number;
  totalScore: number;

  startGame: () => void;
  stopGame: () => void;
  checkAnswer: (note: string) => boolean;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        isPlaying: false,
        targetNote: null,
        score: 0,
        streak: 0,
        bestStreak: 0,
        totalScore: 0,

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
          const { targetNote, score, streak, bestStreak, totalScore } = get();

          if (!targetNote) return false;

          const isCorrect = note.toUpperCase() === targetNote.toUpperCase();

          if (isCorrect) {
            const newScore = calculateScore(score, true);
            const newStreak = calculateStreak(streak, true);
            const newTarget = generateRandomNote(targetNote);

            const newBestStreak = Math.max(newStreak, bestStreak);
            const newTotalScore = totalScore + POINTS_PER_CORRECT_ANSWER;

            set({
              score: newScore,
              streak: newStreak,
              targetNote: newTarget,
              bestStreak: newBestStreak,
              totalScore: newTotalScore
            });

            return true;
          } else {
            const newStreak = calculateStreak(streak, false);
            set({ streak: newStreak });
            return false;
          }
        }
      }),
      {
        name: STORAGE_KEY,
        version: 1,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          bestStreak: state.bestStreak,
          totalScore: state.totalScore
        })
      }
    ),
    { name: 'GameStore' }
  )
);
