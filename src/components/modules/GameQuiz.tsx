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
  gameIndex: number // Track which game in the sequence (0, 1, 2)
}

interface GameResult {
  gameType: GameType
  score: number
  total: number
  percentage: number
}

/**
 * GameQuiz - Auto-progression through all 3 game types per level
 * Name → Play → Place, then show level complete summary
 */
export const GameQuiz: React.FC<GameQuizProps> = ({ submoduleId }) => {
  const [selectedGame, setSelectedGame] = useState<SelectedGame | null>(null)
  const [showingResults, setShowingResults] = useState(false)
  const [levelResults, setLevelResults] = useState<GameResult[]>([])
  const [isLevelComplete, setIsLevelComplete] = useState(false)

  const setLevelScore = useProgressStore((s) => s.setLevelScore)
  const completedLevels = useProgressStore((s) => s.completedLevels)
  const completeSubmodule = useProgressStore((s) => s.completeSubmodule)

  const handleSelectLevel = (level: GameLevel, _gameType: GameType) => {
    // Start fresh with first game type
    setSelectedGame({ level, gameType: SUB_GAMES[0].type, gameIndex: 0 })
    setShowingResults(false)
    setLevelResults([])
    setIsLevelComplete(false)
  }

  const handleBack = () => {
    setSelectedGame(null)
    setShowingResults(false)
    setLevelResults([])
    setIsLevelComplete(false)
  }

  const handleQuizComplete = (score: number, total: number) => {
    if (!selectedGame) return

    const percentage = Math.round((score / total) * 100)

    // Save this game's result
    const key = `${selectedGame.level.id}-${selectedGame.gameType}`
    setLevelScore(key, percentage, selectedGame.level.requiredScore, selectedGame.level.xpReward)

    // Add to level results
    const newResult: GameResult = {
      gameType: selectedGame.gameType,
      score,
      total,
      percentage,
    }
    const updatedResults = [...levelResults, newResult]
    setLevelResults(updatedResults)

    // Check if there are more games in this level
    const nextGameIndex = selectedGame.gameIndex + 1

    if (nextGameIndex < SUB_GAMES.length) {
      // Show brief result then auto-advance to next game
      setShowingResults(true)
      setTimeout(() => {
        setSelectedGame({
          level: selectedGame.level,
          gameType: SUB_GAMES[nextGameIndex].type,
          gameIndex: nextGameIndex,
        })
        setShowingResults(false)
      }, 1500) // Brief pause to show result
    } else {
      // All 3 games complete - show level summary
      setIsLevelComplete(true)
      setShowingResults(true)

      // Check module completion
      const allLevelGamesCompleted = updatedResults.every((r) => r.percentage >= 60)
      if (allLevelGamesCompleted) {
        const allModuleComplete = GAME_LEVELS.every((level) =>
          SUB_GAMES.every((g) => {
            const levelKey = `${level.id}-${g.type}`
            const completion = completedLevels[levelKey]
            if (level.id === selectedGame.level.id) {
              const result = updatedResults.find((r) => r.gameType === g.type)
              return result ? result.percentage >= 60 : false
            }
            return completion?.passed && completion.percentage >= 60
          })
        )

        if (allModuleComplete) {
          completeSubmodule(submoduleId)
        }
      }
    }
  }

  // Calculate level average
  const levelAverage = useMemo(() => {
    if (levelResults.length === 0) return 0
    const sum = levelResults.reduce((acc, r) => acc + r.percentage, 0)
    return Math.round(sum / levelResults.length)
  }, [levelResults])

  // Get next level
  const nextLevel = useMemo(() => {
    if (!selectedGame || !isLevelComplete) return null
    if (levelAverage < 50) return null
    return GAME_LEVELS.find((l) => l.id === selectedGame.level.id + 1) || null
  }, [selectedGame, isLevelComplete, levelAverage])

  const handleNextLevel = () => {
    if (!nextLevel) return
    setSelectedGame({ level: nextLevel, gameType: SUB_GAMES[0].type, gameIndex: 0 })
    setShowingResults(false)
    setLevelResults([])
    setIsLevelComplete(false)
  }

  const handlePlayAgain = () => {
    if (!selectedGame) return
    // Restart from first game
    setSelectedGame({ level: selectedGame.level, gameType: SUB_GAMES[0].type, gameIndex: 0 })
    setShowingResults(false)
    setLevelResults([])
    setIsLevelComplete(false)
  }

  // Show level selector if no level selected
  if (!selectedGame) {
    return <LevelSelector onSelectLevel={handleSelectLevel} />
  }

  // Show quiz for selected level and game type
  const notes = getLevelNotes(selectedGame.level)
  const gameInfo = SUB_GAMES.find((g) => g.type === selectedGame.gameType)
  const currentGameNumber = selectedGame.gameIndex + 1

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4">
      {/* Level Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Map
        </button>
        <div className="text-right">
          <span className="text-xs text-[#30e8e8]">
            Level {selectedGame.level.id} • Game {currentGameNumber}/3
          </span>
          <h3 className="font-bold text-white text-sm">{selectedGame.level.name}</h3>
        </div>
      </div>

      {/* Game type selector - large clickable buttons */}
      <div className="mb-4 flex items-center gap-3">
        {SUB_GAMES.map((game, idx) => {
          const result = levelResults.find((r) => r.gameType === game.type)
          const isCurrent = idx === selectedGame.gameIndex
          const isCompleted =
            idx < selectedGame.gameIndex || (showingResults && idx === selectedGame.gameIndex)

          return (
            <button
              key={game.type}
              onClick={() => {
                // Allow jumping to any game in the sequence
                if (!showingResults) {
                  setSelectedGame({
                    level: selectedGame.level,
                    gameType: game.type,
                    gameIndex: idx,
                  })
                }
              }}
              disabled={showingResults}
              className={`flex-1 flex flex-col items-center gap-2 py-3 px-4 rounded-xl transition-all border-2 ${
                isCurrent
                  ? 'bg-[#30e8e8]/20 border-[#30e8e8] scale-105'
                  : isCompleted
                    ? result && result.percentage >= 60
                      ? 'bg-emerald-500/10 border-emerald-500/50'
                      : 'bg-amber-500/10 border-amber-500/50'
                    : 'bg-slate-800 border-slate-700 hover:border-slate-500'
              } ${showingResults ? 'cursor-default opacity-70' : 'cursor-pointer hover:scale-102'}`}
            >
              <span className={`text-2xl ${isCurrent ? 'animate-pulse' : ''}`}>{game.icon}</span>
              <span
                className={`text-sm font-bold ${
                  isCurrent ? 'text-[#30e8e8]' : isCompleted ? 'text-slate-300' : 'text-slate-400'
                }`}
              >
                {game.label}
              </span>
              {/* Progress indicator */}
              <div
                className={`w-full h-1 rounded-full ${
                  isCompleted
                    ? result && result.percentage >= 60
                      ? 'bg-emerald-500'
                      : result
                        ? 'bg-amber-500'
                        : 'bg-slate-600'
                    : isCurrent
                      ? 'bg-[#30e8e8]'
                      : 'bg-slate-700'
                }`}
              />
            </button>
          )
        })}
      </div>

      {/* Show results or quiz */}
      {showingResults ? (
        isLevelComplete ? (
          // Level Complete Summary
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-5xl text-amber-500 mb-3">
              {levelAverage >= 80
                ? 'emoji_events'
                : levelAverage >= 60
                  ? 'celebration'
                  : 'sentiment_neutral'}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">
              Level {selectedGame.level.id} Complete!
            </h3>

            {/* Individual game results */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {levelResults.map((result, idx) => {
                const game = SUB_GAMES[idx]
                return (
                  <div
                    key={result.gameType}
                    className={`p-2 rounded-lg ${
                      result.percentage >= 80
                        ? 'bg-emerald-500/20 border border-emerald-500/30'
                        : result.percentage >= 60
                          ? 'bg-amber-500/20 border border-amber-500/30'
                          : 'bg-rose-500/20 border border-rose-500/30'
                    }`}
                  >
                    <span className="text-lg">{game?.icon}</span>
                    <p className="text-xs text-slate-300 mt-1">{game?.label}</p>
                    <p
                      className={`text-lg font-bold ${
                        result.percentage >= 80
                          ? 'text-emerald-400'
                          : result.percentage >= 60
                            ? 'text-amber-400'
                            : 'text-rose-400'
                      }`}
                    >
                      {result.percentage}%
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Overall score */}
            <p className="text-3xl font-bold mb-1">
              <span
                className={
                  levelAverage >= 80
                    ? 'text-emerald-400'
                    : levelAverage >= 60
                      ? 'text-amber-400'
                      : 'text-rose-400'
                }
              >
                {levelAverage}%
              </span>
            </p>
            <p className="text-sm text-slate-400 mb-4">Average Score</p>

            {/* Stars earned */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`text-2xl transition-all ${
                    (levelAverage >= 60 && s === 1) ||
                    (levelAverage >= 80 && s <= 2) ||
                    (levelAverage >= 100 && s <= 3)
                      ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] scale-110'
                      : 'text-slate-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col items-center gap-3">
              {nextLevel && (
                <button
                  onClick={handleNextLevel}
                  className="px-6 py-2.5 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors flex items-center gap-2"
                >
                  <span>Next Level: {nextLevel.name}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              )}
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors"
                >
                  Journey Map
                </button>
                <button
                  onClick={handlePlayAgain}
                  className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Brief result before next game
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <span className="material-symbols-outlined text-4xl text-[#30e8e8] mb-2 animate-pulse">
              check_circle
            </span>
            <p className="text-lg font-bold text-white mb-1">
              {gameInfo?.icon} {gameInfo?.label} Complete!
            </p>
            <p className="text-2xl font-bold text-emerald-400 mb-2">
              {levelResults[levelResults.length - 1]?.percentage}%
            </p>
            <p className="text-sm text-slate-400">Loading next game...</p>
            <div className="mt-3 flex justify-center">
              <div className="w-6 h-6 border-2 border-[#30e8e8] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        )
      ) : (
        <NoteIdentificationQuiz
          key={`${submoduleId}-${selectedGame.level.id}-${selectedGame.gameType}-${selectedGame.gameIndex}`}
          submoduleId={`${submoduleId}-${selectedGame.level.id}-${selectedGame.gameType}`}
          notes={notes}
          questionCount={selectedGame.level.questionCount}
          initialGameType={selectedGame.gameType}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  )
}

export default GameQuiz
