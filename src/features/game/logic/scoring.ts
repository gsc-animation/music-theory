/**
 * Calculates the new score.
 * @param currentScore Current score
 * @param isCorrect Whether the answer was correct
 * @returns New score
 */
export const calculateScore = (currentScore: number, isCorrect: boolean): number => {
  return isCorrect ? currentScore + 1 : currentScore;
};

/**
 * Calculates the new streak.
 * @param currentStreak Current streak
 * @param isCorrect Whether the answer was correct
 * @returns New streak
 */
export const calculateStreak = (currentStreak: number, isCorrect: boolean): number => {
  return isCorrect ? currentStreak + 1 : 0;
};
