import React from 'react';
import { useGameStore } from '../../../stores/useGameStore';
import { APP_STRINGS } from '../../../constants/app-strings';

export const GameOverlay: React.FC = () => {
  const isPlaying = useGameStore((state) => state.isPlaying);
  const score = useGameStore((state) => state.score);
  const streak = useGameStore((state) => state.streak);
  const bestStreak = useGameStore((state) => state.bestStreak);
  const startGame = useGameStore((state) => state.startGame);
  const stopGame = useGameStore((state) => state.stopGame);

  return (
    <div className="fixed top-12 sm:top-4 left-0 right-0 p-2 sm:p-4 pointer-events-none flex justify-between items-start z-10">
      {/* HUD Stats */}
      {isPlaying && (
        <div className="flex flex-col gap-1 sm:gap-2 bg-white/90 dark:bg-stone-800/90 p-2 sm:p-3 rounded-lg shadow-md border border-stone-200 dark:border-stone-700 pointer-events-auto">
          <div className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
            {APP_STRINGS.GAME.SCORE}: <span className="text-emerald-600 dark:text-emerald-400 text-base sm:text-lg">{score}</span>
          </div>
          <div className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
            {APP_STRINGS.GAME.STREAK}: <span className="text-amber-600 dark:text-amber-400 text-base sm:text-lg">{streak}</span>
          </div>
          <div className="text-[10px] sm:text-xs text-stone-400">
            {APP_STRINGS.GAME.BEST_STREAK}: {bestStreak}
          </div>
        </div>
      )}

      {/* Game Controls */}
      <div className="pointer-events-auto ml-auto">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg font-bold transition-all transform hover:scale-105 active:scale-95 min-w-[48px] min-h-[48px] text-sm sm:text-base"
          >
            {APP_STRINGS.GAME.START}
          </button>
        ) : (
          <button
            onClick={stopGame}
            className="px-3 sm:px-4 py-2 bg-stone-500 hover:bg-stone-600 text-white rounded-lg shadow font-medium transition-all min-w-[48px] min-h-[48px] text-sm"
          >
            {APP_STRINGS.GAME.STOP}
          </button>
        )}
      </div>
    </div>
  );
};
