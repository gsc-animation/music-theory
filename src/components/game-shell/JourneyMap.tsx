/**
 * JourneyMap - Reusable game selection UI component
 *
 * Displays a visual journey map with game nodes that unlock progressively.
 * Extracted from Module12GameQuiz/Module13GameQuiz for reuse.
 */
import React, { useMemo } from 'react'
import type { SubmoduleGameConfig } from '../../data/game-types'
import { getGameDefinition } from '../../data/game-registry'

interface JourneyMapProps {
  /** List of games for this submodule */
  games: SubmoduleGameConfig[]
  /** Currently completed game indices */
  completedGames: Set<number>
  /** Callback when a game is selected */
  onSelectGame: (gameIndex: number) => void
  /** Custom title for the journey map */
  title?: string
  /** Custom subtitle */
  subtitle?: string
}

export const JourneyMap: React.FC<JourneyMapProps> = ({
  games,
  completedGames,
  onSelectGame,
  title = 'Journey Map',
  subtitle,
}) => {
  // Pre-compute star positions for background decoration
  const starPositions = useMemo(
    () =>
      [...Array(15)].map((_, i) => ({
        left: `${(i * 17 + 5) % 100}%`,
        top: `${(i * 23 + 10) % 100}%`,
        delay: `${(i * 0.3) % 2}s`,
      })),
    []
  )

  const isGameUnlocked = (index: number): boolean => {
    if (index === 0) return true
    return completedGames.has(index - 1)
  }

  const allComplete = completedGames.size >= games.length

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 min-h-[450px]">
      {/* Background decoration - stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{ left: pos.left, top: pos.top, animationDelay: pos.delay }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-center mb-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white flex items-center justify-center gap-2">
            <span className="text-2xl">🗺️</span>
            {title}
          </h2>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
      </div>

      {allComplete && (
        <div className="relative text-center mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <span className="text-emerald-400 font-medium">
            ✅ Bạn đã hoàn thành tất cả thử thách!
          </span>
        </div>
      )}

      {/* Journey Path */}
      <div className="relative">
        {/* Vertical dotted path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-slate-600/50" />

        {/* Game Nodes */}
        <div className="relative space-y-4">
          {games.map((gameConfig, index) => {
            const gameDef = getGameDefinition(gameConfig.type)
            const isUnlocked = isGameUnlocked(index)
            const isCompleted = completedGames.has(index)
            const isLeft = index % 2 === 0

            // Use overrides from gameConfig or fallback to registry
            const icon = gameDef.icon
            const label = gameConfig.labelVi || gameDef.nameVi
            const description = gameConfig.description || gameDef.descriptionVi

            return (
              <div key={`${gameConfig.type}-${index}`} className="relative">
                {/* Connector dot on the path */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 ${
                    isCompleted
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                      : isUnlocked
                        ? 'bg-[#30e8e8] shadow-lg shadow-[#30e8e8]/50'
                        : 'bg-slate-600'
                  }`}
                />

                {/* Game Card - alternating sides */}
                <div className={`relative ${isLeft ? 'mr-[52%] pr-4' : 'ml-[52%] pl-4'}`}>
                  <button
                    onClick={() => isUnlocked && onSelectGame(index)}
                    disabled={!isUnlocked}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                      isCompleted
                        ? 'bg-emerald-500/10 border-emerald-500/50 hover:border-emerald-400'
                        : isUnlocked
                          ? 'bg-slate-800/80 border-slate-700 hover:border-[#30e8e8] hover:bg-slate-800 hover:shadow-lg hover:shadow-[#30e8e8]/10'
                          : 'bg-slate-900/50 border-slate-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Level Circle Badge */}
                      <div
                        className={`relative w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shrink-0 ${
                          isCompleted
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
                            : isUnlocked
                              ? 'bg-gradient-to-br from-[#30e8e8] to-[#1f9d9d] text-slate-900'
                              : 'bg-slate-700 text-slate-500'
                        }`}
                      >
                        {isCompleted ? '✓' : isUnlocked ? icon : '🔒'}
                        {/* Glow effect for unlocked but not completed */}
                        {isUnlocked && !isCompleted && (
                          <div className="absolute inset-0 rounded-full bg-[#30e8e8]/30 animate-ping" />
                        )}
                      </div>

                      {/* Game Info */}
                      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-bold text-white text-sm">{label}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{description}</p>

                        {/* 3-Star Rating */}
                        <div
                          className={`flex gap-1 mt-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}
                        >
                          {[1, 2, 3].map((s) => (
                            <span
                              key={s}
                              className={`text-lg transition-transform ${
                                isCompleted
                                  ? 'text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]'
                                  : 'text-slate-600'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* End point - trophy */}
        <div className="relative mt-6 flex justify-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg ${
              allComplete
                ? 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/30'
                : 'bg-slate-700/50'
            }`}
          >
            {allComplete ? '🏆' : '🎯'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JourneyMap
