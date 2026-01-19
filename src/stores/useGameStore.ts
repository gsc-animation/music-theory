import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { generateRandomNote } from '../features/game/logic/note-generator';
import { POINTS_PER_CORRECT_ANSWER, STORAGE_KEY } from '../features/game/constants';
import { ScoringEngine } from '../services/ScoringEngine';
import type { ScoreFeedback } from '../services/ScoringEngine';

interface GameState {
  isPlaying: boolean;
  targetNote: string | null;
  targetTime: number | null;
  lastFeedback: ScoreFeedback | null;
  score: number;
  streak: number;
  bestStreak: number;
  totalScore: number;

  startGame: () => void;
  stopGame: () => void;
  setTargetTime: (time: number) => void;
  checkAnswer: (note: string, timestamp?: number) => boolean;
}

export const useGameStore = create<GameState>()(
  devtools(
    persist(
      (set, get) => ({
        isPlaying: false,
        targetNote: null,
        targetTime: null,
        lastFeedback: null,
        score: 0,
        streak: 0,
        bestStreak: 0,
        totalScore: 0,

        startGame: () => {
          set({
            isPlaying: true,
            score: 0,
            streak: 0,
            targetNote: generateRandomNote(),
            targetTime: null,
            lastFeedback: null
          });
        },

        stopGame: () => {
          set({
            isPlaying: false,
            targetNote: null,
            targetTime: null,
            lastFeedback: null
          });
        },

        setTargetTime: (time: number) => {
          set({ targetTime: time });
        },

        checkAnswer: (note: string, timestamp?: number) => {
          const { targetNote, score, streak, bestStreak, totalScore, targetTime } = get();

          if (!targetNote) return false;

          const isCorrectNote = note.toUpperCase() === targetNote.toUpperCase();

          let feedback: ScoreFeedback | null = null;
          let points = 0;
          let isStreakKept = false;

          if (isCorrectNote) {
            if (targetTime && timestamp) {
              // Rhythm mode logic
              feedback = ScoringEngine.compare(targetTime, timestamp);
              points = feedback.scoreDelta;
              // Only keep streak if it's not a miss (Perfect or Good/Early/Late)
              isStreakKept = feedback.rating !== 'MISS';
            } else {
              // Classic mode logic (no timing)
              points = POINTS_PER_CORRECT_ANSWER;
              isStreakKept = true;
              feedback = {
                rating: 'PERFECT',
                scoreDelta: points,
                timeDelta: 0,
                label: 'Correct!'
              };
            }

            const newScore = score + points;
            const newStreak = isStreakKept ? streak + 1 : 0;
            const newTarget = generateRandomNote(targetNote);
            const newBestStreak = Math.max(newStreak, bestStreak);
            const newTotalScore = totalScore + points;

            set({
              score: newScore,
              streak: newStreak,
              targetNote: newTarget,
              bestStreak: newBestStreak,
              totalScore: newTotalScore,
              lastFeedback: feedback,
              targetTime: null // Reset target time after answer
            });

            return true;
          } else {
            // Wrong note
            set({
              streak: 0,
              lastFeedback: {
                rating: 'MISS',
                scoreDelta: 0,
                timeDelta: 0,
                label: 'Wrong Note'
              }
            });
            return false;
          }
        }
      }),
      {
        name: STORAGE_KEY,
        version: 2,
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
