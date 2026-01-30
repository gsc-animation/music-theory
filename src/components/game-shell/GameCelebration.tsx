/**
 * GameCelebration - Celebration screen between games
 *
 * Displays when a game is completed, showing progress and next game preview.
 * Extracted from Module12GameQuiz/Module13GameQuiz for reuse.
 */
import React, { useMemo } from 'react'
import type { SubmoduleGameConfig } from '../../data/game-types'
import { getGameDefinition } from '../../data/game-registry'

interface GameCelebrationProps {
  /** List of all games in this submodule */
  games: SubmoduleGameConfig[]
  /** Index of the game that was just completed */
  completedGameIndex: number
  /** Set of all completed game indices */
  completedGames: Set<number>
  /** Callback to continue to next game or back to map */
  onContinue: () => void
  /** Callback to go back to journey map */
  onBackToMap: () => void
}

export const GameCelebration: React.FC<GameCelebrationProps> = ({
  games,
  completedGameIndex,
  completedGames,
  onContinue,
  onBackToMap,
}) => {
  const currentGame = games[completedGameIndex]
  const nextGame = games[completedGameIndex + 1]
  const isAllComplete = completedGameIndex >= games.length - 1

  const currentGameDef = getGameDefinition(currentGame.type)
  const nextGameDef = nextGame ? getGameDefinition(nextGame.type) : null

  // Pre-computed star positions for background decoration
  const starPositions = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        left: `${(i * 17 + 5) % 100}%`,
        top: `${(i * 23 + 10) % 100}%`,
        delay: `${(i * 0.3) % 2}s`,
      })),
    []
  )

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 min-h-[400px]">
      {/* Background stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{ left: pos.left, top: pos.top, animationDelay: pos.delay }}
          />
        ))}
      </div>

      <div className="relative text-center py-8">
        {isAllComplete ? (
          <>
            <div className="text-6xl mb-4 animate-bounce">🎓</div>
            <h3 className="text-2xl font-bold text-white mb-2">Hành Trình Hoàn Thành!</h3>
            <p className="text-emerald-400 text-lg mb-4">Bạn đã chinh phục tất cả các trò chơi!</p>

            <div className="flex justify-center gap-4 mb-6">
              {games.map((game, i) => {
                const gameDef = getGameDefinition(game.type)
                return (
                  <div key={`${game.type}-${i}`} className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{gameDef.icon}</span>
                    <span className="text-yellow-400 text-lg">★★★</span>
                  </div>
                )
              })}
            </div>

            <button
              onClick={onBackToMap}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#30e8e8] text-[#111818] rounded-xl font-bold hover:bg-[#26d4d4] transition-all hover:scale-105 shadow-lg"
            >
              <span className="material-symbols-outlined">home</span>
              Quay lại Journey Map
            </button>
          </>
        ) : (
          <>
            <div className="text-5xl mb-4 animate-pulse">{currentGameDef.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">
              {currentGame.labelVi || currentGameDef.nameVi} - Hoàn thành!
            </h3>

            <div className="flex justify-center gap-4 my-6">
              {games.map((game, i) => {
                const gameDef = getGameDefinition(game.type)
                const isCompleted = completedGames.has(i) || i === completedGameIndex
                const isNext = i === completedGameIndex + 1

                return (
                  <div key={`${game.type}-${i}`} className="flex flex-col items-center gap-1">
                    <span className={`text-2xl ${isCompleted ? '' : 'opacity-30'}`}>
                      {gameDef.icon}
                    </span>
                    <span
                      className={`text-sm ${isCompleted ? 'text-yellow-400' : isNext ? 'text-[#30e8e8]' : 'text-slate-600'}`}
                    >
                      {isCompleted ? '★' : isNext ? '●' : '○'}
                    </span>
                  </div>
                )
              })}
            </div>

            {nextGameDef && (
              <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-[#30e8e8]/30 max-w-xs mx-auto">
                <p className="text-slate-400 text-sm mb-2">Thử thách tiếp theo:</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">{nextGameDef.icon}</span>
                  <div>
                    <h4 className="font-bold text-white">
                      {nextGame.labelVi || nextGameDef.nameVi}
                    </h4>
                    <p className="text-xs text-[#30e8e8]">
                      {nextGame.description || nextGameDef.descriptionVi}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center gap-3">
              <button
                onClick={onBackToMap}
                className="px-4 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-all"
              >
                Journey Map
              </button>
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#30e8e8] text-[#111818] rounded-xl font-bold hover:bg-[#26d4d4] transition-all hover:scale-105 shadow-lg shadow-[#30e8e8]/30"
              >
                Tiếp tục Hành Trình
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default GameCelebration
