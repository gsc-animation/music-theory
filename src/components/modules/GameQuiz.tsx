import React, { useState, useMemo } from 'react'
import { LevelSelector } from './LevelSelector'
import { NoteIdentificationQuiz } from './NoteIdentificationQuiz'
import type { GameLevel, GameType } from '../../data/game-levels'
import { getLevelNotes, SUB_GAMES, GAME_LEVELS } from '../../data/game-levels'
import { useProgressStore } from '../../stores/useProgressStore'

interface GameQuizProps {
  submoduleId: string
}

interface SelectedGame {
  level: GameLevel
  gameType: GameType
}

/**
 * GameQuiz - Wrapper that shows level selector and quiz
 * Manages state between level selection and gameplay
 */
export const GameQuiz: React.FC<GameQuizProps> = ({ submoduleId }) => {
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null)
  const [showingResults, setShowingResults] = useState(false)
  const [lastPercentage, setLastPercentage] = useState(0)
  const setLevelScore = useProgressStore((s) => s.setLevelScore)
  const completedLevels = useProgressStore((s) => s.completedLevels)
  const completeSubmodule = useProgressStore((s) => s.completeSubmodule)

  const handleSelectLevel = (level: GameLevel, gameType: GameType) => {
    setSelectedGame({ level, gameType })
    setShowingResults(false)
  }

  const handleBack = () => {
    setSelectedGame(null)
    setShowingResults(false)
  }

  const handleQuizComplete = (score: number, total: number) => {
    if (!selectedGame) return

    const percentage = Math.round((score / total) * 100)
    setLastPercentage(percentage)
    // Use composite key: levelId-gameType
    const key = `${selectedGame.level.id}-${selectedGame.gameType}`
    setLevelScore(key, percentage, selectedGame.level.requiredScore, selectedGame.level.xpReward)
    setShowingResults(true)

    // Check if all games in current level have >= 60% - then check module completion
    const allLevelGamesCompleted = SUB_GAMES.every((g) => {
      const levelKey = `${selectedGame.level.id}-${g.type}`
      const completion = completedLevels[levelKey]
      if (g.type === selectedGame.gameType) {
        return percentage >= 60
      }
      return completion?.passed && completion.percentage >= 60
    })

    // Check if ALL levels have all games >= 60%
    if (allLevelGamesCompleted) {
      const allModuleComplete = GAME_LEVELS.every((level) =>
        SUB_GAMES.every((g) => {
          const levelKey = `${level.id}-${g.type}`
          const completion = completedLevels[levelKey]
          if (level.id === selectedGame.level.id && g.type === selectedGame.gameType) {
            return percentage >= 60
          }
          return completion?.passed && completion.percentage >= 60
        })
      )

      if (allModuleComplete) {
        completeSubmodule(submoduleId)
      }
    }
  }

  // Get next game in sequence
  const getNextGame = useMemo(() => {
    if (!selectedGame) return null

    const currentGameIndex = SUB_GAMES.findIndex((g) => g.type === selectedGame.gameType)
    const nextGameIndex = currentGameIndex + 1

    // If there's another game type in this level
    if (nextGameIndex < SUB_GAMES.length) {
      return {
        level: selectedGame.level,
        gameType: SUB_GAMES[nextGameIndex].type,
        label: SUB_GAMES[nextGameIndex].label,
        icon: SUB_GAMES[nextGameIndex].icon,
      }
    }

    // Check if next level is unlocked (current >= 50%)
    if (lastPercentage >= 50) {
      const nextLevel = GAME_LEVELS.find((l) => l.id === selectedGame.level.id + 1)
      if (nextLevel) {
        return {
          level: nextLevel,
          gameType: SUB_GAMES[0].type,
          label: `Level ${nextLevel.id}`,
          icon: '🎯',
        }
      }
    }

    return null
  }, [selectedGame, lastPercentage])

  const handleNextGame = () => {
    if (!getNextGame) return
    setSelectedGame({ level: getNextGame.level, gameType: getNextGame.gameType })
    setShowingResults(false)
  }

  const handlePlayAgain = () => {
    if (!selectedGame) return
    setShowingResults(false)
    // Force re-render by creating new object
    setSelectedGame({ ...selectedGame })
  }

  // Show level selector if no level selected
  if (!selectedGame) {
    return <LevelSelector onSelectLevel={handleSelectLevel} />
  }

  // Show quiz for selected level and game type
  const notes = getLevelNotes(selectedGame.level)
  const gameInfo = SUB_GAMES.find((g) => g.type === selectedGame.gameType)

  return (
    <div>
      {/* Level Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Levels
        </button>
        <div className="text-right">
          <span className="text-xs text-slate-400">
            Level {selectedGame.level.id} • {gameInfo?.icon} {gameInfo?.label}
          </span>
          <h3 className="font-bold text-slate-800 dark:text-white text-sm">{selectedGame.level.name}</h3>
        </div>
      </div>

      {/* Quiz with specific game type */}
      <NoteIdentificationQuiz
        key={`${submoduleId}-${selectedGame.level.id}-${selectedGame.gameType}-${showingResults}`}
        submoduleId={`${submoduleId}-${selectedGame.level.id}-${selectedGame.gameType}`}
        notes={notes}
        questionCount={selectedGame.level.questionCount}
        initialGameType={selectedGame.gameType}
        onComplete={handleQuizComplete}
      />

      {/* Action buttons after completion */}
      {showingResults && (
        <div className="mt-4 flex flex-col items-center gap-3">
          {/* Primary action: Next Game (if available) */}
          {getNextGame && (
            <button
              onClick={handleNextGame}
              className="px-6 py-2.5 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors flex items-center gap-2"
            >
              <span>Next Game: {getNextGame.icon} {getNextGame.label}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          )}

          {/* Secondary actions */}
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
            >
              Choose Level
            </button>
            <button
              onClick={handlePlayAgain}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default GameQuiz
