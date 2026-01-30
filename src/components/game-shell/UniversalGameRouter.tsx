/**
 * UniversalGameRouter - Universal game orchestration component
 *
 * Replaces module-specific quiz components (Module12GameQuiz, Module13GameQuiz)
 * with a single, registry-driven router that works for all submodules.
 */
import React, { useState, useCallback, Suspense, useMemo } from 'react'
import type { SubmoduleGameConfig, GameConfig } from '../../data/game-types'
import { mergeGameConfig } from '../../data/game-types'
import { getGameDefinition } from '../../data/game-registry'
import { useProgressStore } from '../../stores/useProgressStore'
import { JourneyMap } from './JourneyMap'
import { GameCelebration } from './GameCelebration'

interface UniversalGameRouterProps {
  /** Submodule ID for progress tracking */
  submoduleId: string
  /** List of games configured for this submodule */
  games?: SubmoduleGameConfig[]
  /** Optional callback when all games are completed */
  onAllComplete?: () => void
}

/**
 * Loading skeleton for lazy-loaded game components
 */
const GameSkeleton: React.FC = () => (
  <div className="bg-slate-800/50 rounded-xl p-8 animate-pulse">
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 bg-slate-700 rounded-full" />
      <div className="w-48 h-6 bg-slate-700 rounded" />
      <div className="w-64 h-4 bg-slate-700 rounded" />
    </div>
  </div>
)

/**
 * UniversalGameRouter - Orchestrates game selection, loading, and progression
 */
export const UniversalGameRouter: React.FC<UniversalGameRouterProps> = ({
  submoduleId,
  games = [],
  onAllComplete,
}) => {
  // View state: null = journey map, number = active game index
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [lastCompletedIndex, setLastCompletedIndex] = useState<number | null>(null)

  // Progress store for persistence
  const completedLevels = useProgressStore((state) => state.completedLevels)
  const setLevelScore = useProgressStore((state) => state.setLevelScore)
  const completeSubmodule = useProgressStore((state) => state.completeSubmodule)

  // Get progress key for a game
  const getGameKey = useCallback(
    (gameIndex: number) => `${submoduleId}-game-${gameIndex}`,
    [submoduleId]
  )

  // Restore completed games from store (persisted across sessions)
  const completedGames = useMemo(() => {
    const completed = new Set<number>()
    games.forEach((_, index) => {
      const key = `${submoduleId}-game-${index}`
      if (completedLevels[key]?.passed) {
        completed.add(index)
      }
    })
    return completed
  }, [games, submoduleId, completedLevels])

  // Handle game completion
  const handleGameComplete = useCallback(
    (score: number, total: number) => {
      if (selectedGameIndex === null) return

      const percentage = Math.round((score / Math.max(total, 1)) * 100)
      const key = getGameKey(selectedGameIndex)
      const gameConfig = games[selectedGameIndex]
      const gameDef = getGameDefinition(gameConfig.type)
      const config = mergeGameConfig(gameDef.defaultConfig, gameConfig.config)

      // Save to progress store (this updates completedLevels, which triggers useMemo)
      setLevelScore(key, percentage, config.requiredScore ?? 60, config.xpReward ?? 30)

      // Update local celebration state
      setLastCompletedIndex(selectedGameIndex)
      setShowCelebration(true)

      // Check if all games completed (use +1 because current game just completed)
      if (completedGames.size + 1 >= games.length) {
        completeSubmodule(submoduleId)
        onAllComplete?.()
      }
    },
    [
      selectedGameIndex,
      games,
      getGameKey,
      setLevelScore,
      completedGames.size,
      completeSubmodule,
      submoduleId,
      onAllComplete,
    ]
  )

  // Continue to next game after celebration
  const handleContinue = useCallback(() => {
    if (lastCompletedIndex === null) return

    const nextIndex = lastCompletedIndex + 1
    if (nextIndex < games.length) {
      setSelectedGameIndex(nextIndex)
    } else {
      setSelectedGameIndex(null)
    }
    setShowCelebration(false)
  }, [lastCompletedIndex, games.length])

  // Back to journey map
  const handleBackToMap = useCallback(() => {
    setSelectedGameIndex(null)
    setShowCelebration(false)
  }, [])

  // If no games configured, show empty state
  if (games.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-4xl mb-4">🎮</div>
        <p className="text-slate-400">Chưa có trò chơi cho bài học này.</p>
      </div>
    )
  }

  // Show celebration screen
  if (showCelebration && lastCompletedIndex !== null) {
    return (
      <GameCelebration
        games={games}
        completedGameIndex={lastCompletedIndex}
        completedGames={completedGames}
        onContinue={handleContinue}
        onBackToMap={handleBackToMap}
      />
    )
  }

  // Show journey map (game selector)
  if (selectedGameIndex === null) {
    return (
      <JourneyMap
        games={games}
        completedGames={completedGames}
        onSelectGame={setSelectedGameIndex}
        subtitle={`Hoàn thành ${games.length} thử thách`}
      />
    )
  }

  // Render selected game
  const currentGameConfig = games[selectedGameIndex]
  const gameDef = getGameDefinition(currentGameConfig.type)
  const mergedConfig: GameConfig = mergeGameConfig(gameDef.defaultConfig, currentGameConfig.config)

  const GameComponent = gameDef.component

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleBackToMap}
          className="flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Journey Map
        </button>
        <div className="text-right">
          <span className="text-xs text-[#30e8e8]">
            {currentGameConfig.labelVi || gameDef.nameVi}
          </span>
          <div className="flex gap-0.5 justify-end">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`text-xs ${
                  completedGames.has(selectedGameIndex) ? 'text-yellow-400' : 'text-slate-600'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Game Component */}
      <Suspense fallback={<GameSkeleton />}>
        <GameComponent
          submoduleId={submoduleId}
          onComplete={handleGameComplete}
          {...mergedConfig}
        />
      </Suspense>
    </div>
  )
}

export default UniversalGameRouter
