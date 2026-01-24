import { POINTS_PER_CORRECT_ANSWER } from '../constants'

/**
 * Calculates the new score.
 * @param currentScore Current score
 * @param isCorrect Whether the answer was correct
 * @returns New score
 */
export const calculateScore = (currentScore: number, isCorrect: boolean): number => {
  return isCorrect ? currentScore + POINTS_PER_CORRECT_ANSWER : currentScore
}

/**
 * Calculates the new streak.
 * @param currentStreak Current streak
 * @param isCorrect Whether the answer was correct
 * @returns New streak
 */
export const calculateStreak = (currentStreak: number, isCorrect: boolean): number => {
  return isCorrect ? currentStreak + 1 : 0
}
