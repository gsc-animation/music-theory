import React, { useMemo } from 'react'
import { GAME_LEVELS, SUB_GAMES, calculateStars } from '../../data/game-levels'
import type { GameLevel, GameType } from '../../data/game-levels'
import { useProgressStore } from '../../stores/useProgressStore'

interface LevelSelectorProps {
  onSelectLevel: (level: GameLevel, gameType: GameType) => void
  onBack?: () => void
}

/**
 * Journey Map Level Selector - Quest-style level progression
 * Clicking a level starts the game sequence automatically (no sub-game selection)
 */
export const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel, onBack }) => {
  const completedLevels = useProgressStore((s) => s.completedLevels || {})

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true
    // Previous level must have at least one sub-game with >= 50%
    const prevLevelKey = `${levelId - 1}-`
    return Object.keys(completedLevels).some((k) => {
      if (!k.startsWith(prevLevelKey)) return false
      const completion = completedLevels[k]
      return completion?.percentage >= 50
    })
  }

  // Calculate overall level stars (0-3) based on best performance across all sub-games
  const getLevelStars = (levelId: number) => {
    let bestPercentage = 0
    for (const subGame of SUB_GAMES) {
      const key = `${levelId}-${subGame.type}`
      const completion = completedLevels[key as keyof typeof completedLevels]
      if (completion && completion.percentage > bestPercentage) {
        bestPercentage = completion.percentage
      }
    }
    return calculateStars(bestPercentage)
  }

  // Check if level has any completion
  const hasLevelProgress = (levelId: number) => {
    return SUB_GAMES.some((subGame) => {
      const key = `${levelId}-${subGame.type}`
      return completedLevels[key as keyof typeof completedLevels]?.percentage > 0
    })
  }

  // Check if all 3 games in level are completed
  const isLevelComplete = (levelId: number) => {
    return SUB_GAMES.every((subGame) => {
      const key = `${levelId}-${subGame.type}`
      const completion = completedLevels[key as keyof typeof completedLevels]
      return completion?.percentage >= 60
    })
  }

  // Get completion count for level
  const getCompletedGamesCount = (levelId: number) => {
    return SUB_GAMES.filter((subGame) => {
      const key = `${levelId}-${subGame.type}`
      const completion = completedLevels[key as keyof typeof completedLevels]
      return completion?.percentage >= 60
    }).length
  }

  // Handle level click - start with first game type automatically
  const handleLevelClick = (level: GameLevel) => {
    onSelectLevel(level, SUB_GAMES[0].type)
  }

  // Pre-computed star positions for background decoration
  const starPositions = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        left: `${(i * 17 + 5) % 100}%`,
        top: `${(i * 23 + 10) % 100}%`,
        delay: `${(i * 0.3) % 2}s`,
      })),
    []
  )

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-4 min-h-[500px]">
      {/* Background decoration - stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {starPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: pos.delay,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
        )}
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          Journey Map
        </h2>
        <div className="w-16" />
      </div>

      {/* Journey Path */}
      <div className="relative">
        {/* Vertical dotted path line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 border-l-2 border-dashed border-slate-600/50" />

        {/* Level Nodes */}
        <div className="relative space-y-4">
          {GAME_LEVELS.map((level, index) => {
            const isUnlocked = isLevelUnlocked(level.id)
            const levelStars = getLevelStars(level.id)
            const hasProgress = hasLevelProgress(level.id)
            const completed = isLevelComplete(level.id)
            const completedCount = getCompletedGamesCount(level.id)
            const isLeft = index % 2 === 0

            return (
              <div key={level.id} className="relative">
                {/* Connector dot on the path */}
                <div
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full z-10 ${
                    completed
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                      : isUnlocked
                        ? hasProgress
                          ? 'bg-[#30e8e8] shadow-lg shadow-[#30e8e8]/50'
                          : 'bg-[#30e8e8]'
                        : 'bg-slate-600'
                  }`}
                />

                {/* Level Card - alternating sides */}
                <div className={`relative ${isLeft ? 'mr-[52%] pr-4' : 'ml-[52%] pl-4'}`}>
                  <button
                    onClick={() => isUnlocked && handleLevelClick(level)}
                    disabled={!isUnlocked}
                    className={`w-full p-3 rounded-xl border-2 transition-all duration-300 ${
                      completed
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
                          completed
                            ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
                            : isUnlocked
                              ? hasProgress
                                ? 'bg-gradient-to-br from-[#30e8e8] to-[#1f9d9d] text-slate-900'
                                : 'bg-[#30e8e8] text-slate-900'
                              : 'bg-slate-700 text-slate-500'
                        }`}
                      >
                        {completed ? '✓' : isUnlocked ? level.id : '🔒'}
                        {/* Glow effect for in-progress levels */}
                        {isUnlocked && hasProgress && !completed && (
                          <div className="absolute inset-0 rounded-full bg-[#30e8e8]/30 animate-ping" />
                        )}
                      </div>

                      {/* Level Info */}
                      <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                        <h4 className="font-bold text-white text-sm">{level.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{level.description}</p>

                        {/* Progress indicator */}
                        {hasProgress && !completed && (
                          <p
                            className={`text-[10px] text-[#30e8e8] mt-1 ${isLeft ? 'text-right' : 'text-left'}`}
                          >
                            {completedCount}/3 games done
                          </p>
                        )}

                        {/* 3-Star Rating */}
                        <div
                          className={`flex gap-1 mt-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}
                        >
                          {[1, 2, 3].map((s) => (
                            <span
                              key={s}
                              className={`text-lg transition-transform ${
                                s <= levelStars
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

        {/* End point - treasure/goal */}
        <div className="relative mt-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-3xl shadow-lg shadow-amber-500/30">
            🏆
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelSelector
