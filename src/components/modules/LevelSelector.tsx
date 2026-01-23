import React, { useState } from 'react'
import { GAME_LEVELS, SUB_GAMES, calculateStars } from '../../data/game-levels'
import type { GameLevel, GameType } from '../../data/game-levels'
import { useProgressStore } from '../../stores/useProgressStore'

interface LevelSelectorProps {
  onSelectLevel: (level: GameLevel, gameType: GameType) => void
  onBack?: () => void
}

/**
 * Level selection screen with 7 levels, each having 3 sub-games
 */
export const LevelSelector: React.FC<LevelSelectorProps> = ({ onSelectLevel, onBack }) => {
  const completedLevels = useProgressStore((s) => s.completedLevels || {})
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null)

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

  const getSubGameStars = (levelId: number, gameType: GameType) => {
    const key = `${levelId}-${gameType}`
    const completion = completedLevels[key as keyof typeof completedLevels]
    return completion ? calculateStars(completion.percentage) : 0
  }

  const getLevelTotalStars = (levelId: number) => {
    let total = 0
    for (const subGame of SUB_GAMES) {
      total += getSubGameStars(levelId, subGame.type)
    }
    return total
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back
          </button>
        )}
        <h2 className="text-lg font-bold text-slate-800 dark:text-white">🎮 Note Training</h2>
        <div className="w-16" />
      </div>

      {/* Levels Grid */}
      <div className="space-y-2">
        {GAME_LEVELS.map((level) => {
          const isUnlocked = isLevelUnlocked(level.id)
          const isExpanded = expandedLevel === level.id
          const totalStars = getLevelTotalStars(level.id)

          return (
            <div key={level.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
              {/* Level Header */}
              <button
                onClick={() => isUnlocked && setExpandedLevel(isExpanded ? null : level.id)}
                disabled={!isUnlocked}
                className={`w-full p-3 flex items-center justify-between transition-colors ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-900 opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Level badge */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isUnlocked ? 'bg-[#30e8e8] text-[#111818]' : 'bg-slate-300 dark:bg-slate-700 text-slate-500'
                    }`}
                  >
                    {isUnlocked ? level.id : '🔒'}
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{level.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{level.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Stars earned */}
                  <span className="text-xs text-yellow-500 font-bold">
                    {'★'.repeat(totalStars)}
                    <span className="text-slate-300 dark:text-slate-600">{'★'.repeat(9 - totalStars)}</span>
                  </span>
                  {/* Expand icon */}
                  {isUnlocked && (
                    <span
                      className={`material-symbols-outlined text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    >
                      expand_more
                    </span>
                  )}
                </div>
              </button>

              {/* Sub-games (expanded) */}
              {isExpanded && (
                <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-3 gap-2">
                    {SUB_GAMES.map((subGame) => {
                      const stars = getSubGameStars(level.id, subGame.type)
                      return (
                        <button
                          key={subGame.type}
                          onClick={() => onSelectLevel(level, subGame.type)}
                          className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#30e8e8] transition-colors text-center"
                        >
                          <span className="text-2xl">{subGame.icon}</span>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">{subGame.label}</p>
                          <div className="flex justify-center gap-0.5 mt-1">
                            {[1, 2, 3].map((s) => (
                              <span
                                key={s}
                                className={`text-xs ${s <= stars ? 'text-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LevelSelector
