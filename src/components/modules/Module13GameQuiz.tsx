import React, { useState, useCallback } from 'react'
import { AccidentalSpotterGame } from './AccidentalSpotterGame'
import { BlackKeyNinjaGame } from './BlackKeyNinjaGame'
import { useProgressStore } from '../../stores/useProgressStore'

interface Module13GameQuizProps {
  submoduleId: string
}

type GameType = 'spotter' | 'ninja' | 'editor'

interface GameConfig {
  type: GameType
  label: string
  labelVi: string
  icon: string
  description: string
  stars: number
  unlockMessage: string
}

const GAMES: GameConfig[] = [
  {
    type: 'spotter',
    label: 'Accidental Spotter',
    labelVi: 'Soi Dấu Hóa',
    icon: '👁️',
    description: 'Nhận diện nốt có dấu hóa trên khuông nhạc',
    stars: 1,
    unlockMessage: 'Bắt đầu hành trình!',
  },
  {
    type: 'ninja',
    label: 'Black Key Ninja',
    labelVi: 'Ninja Phím Đen',
    icon: '🥷',
    description: 'Tốc độ bấm phím đen trên Piano và Guitar',
    stars: 2,
    unlockMessage: 'Cần hoàn thành Soi Dấu Hóa!',
  },
  {
    type: 'editor',
    label: 'The Editor',
    labelVi: 'Biên Tập Viên',
    icon: '✍️',
    description: 'Nghe và thêm dấu hóa vào khuông nhạc',
    stars: 3,
    unlockMessage: 'Cần hoàn thành Ninja Phím Đen!',
  },
]

/**
 * Module13GameQuiz - Orchestrates the 3-tier game journey for Module 1.3
 *
 * Features:
 * - Journey Map UI with unlock progression
 * - Celebration screens between games
 * - Skip option with 50% score penalty
 * - Can be embedded in other pages
 * - Tracks progress in global store
 */
export const Module13GameQuiz: React.FC<Module13GameQuizProps> = ({ submoduleId }) => {
  const completedLevels = useProgressStore((state) => state.completedLevels ?? {})
  const setLevelScore = useProgressStore((state) => state.setLevelScore)

  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)
  const [lastCompletedGame, setLastCompletedGame] = useState<GameType | null>(null)
  const [skippedGames, setSkippedGames] = useState<Set<GameType>>(new Set())

  // Get the key for storing game progress
  const getGameKey = (gameType: GameType) => `${submoduleId}-${gameType}`

  // Check if a game is unlocked
  const isGameUnlocked = useCallback(
    (gameIndex: number): boolean => {
      if (gameIndex === 0) return true
      // Check if previous game was completed OR skipped
      const prevGame = GAMES[gameIndex - 1]
      const prevKey = getGameKey(prevGame.type)
      const prevCompleted = completedLevels[prevKey]?.passed === true
      const prevSkipped = skippedGames.has(prevGame.type)
      return prevCompleted || prevSkipped
    },
    [completedLevels, skippedGames, submoduleId]
  )

  // Get completion status for a game
  const getGameStatus = useCallback(
    (gameType: GameType): { completed: boolean; stars: number; skipped: boolean } => {
      const key = getGameKey(gameType)
      const data = completedLevels[key]
      return {
        completed: data?.passed === true,
        stars: data?.stars ?? 0,
        skipped: skippedGames.has(gameType),
      }
    },
    [completedLevels, skippedGames, submoduleId]
  )

  // Handle game completion - mark as passed in store
  const handleGameComplete = useCallback(
    (gameType: GameType, score: number, total: number) => {
      const key = getGameKey(gameType)
      const percentage = Math.round((score / Math.max(total, 1)) * 100)
      // Mark as completed with score (requiredScore = 60, xpReward = 30)
      // The progress store uses Math.max() to keep best score
      setLevelScore(key, Math.max(percentage, 60), 60, 30)
      
      // If this game was previously skipped, remove from skipped set
      // This allows players to "redeem" a skipped game by completing it
      if (skippedGames.has(gameType)) {
        setSkippedGames((prev) => {
          const newSet = new Set(prev)
          newSet.delete(gameType)
          return newSet
        })
      }
      
      setLastCompletedGame(gameType)
      setShowCelebration(true)
    },
    [setLevelScore, skippedGames, submoduleId]
  )

  // Handle skipping a game (BỎ BÀI)
  const handleSkipGame = useCallback(
    (gameType: GameType) => {
      const key = getGameKey(gameType)
      // Mark as passed but with only 50% score (30% stars penalty)
      setLevelScore(key, 50, 60, 0) // 50% score, no XP reward for skip
      setSkippedGames((prev) => new Set([...prev, gameType]))
    },
    [setLevelScore, submoduleId]
  )

  // Continue to next game after celebration
  const handleContinueJourney = () => {
    setShowCelebration(false)
    setSelectedGame(null)
    setLastCompletedGame(null)
  }

  // Start a specific game
  const handleStartGame = (gameType: GameType) => {
    setSelectedGame(gameType)
  }

  // Celebration Screen
  if (showCelebration && lastCompletedGame) {
    const gameIndex = GAMES.findIndex((g) => g.type === lastCompletedGame)
    const game = GAMES[gameIndex]
    const nextGame = GAMES[gameIndex + 1]
    const isLastGame = gameIndex === GAMES.length - 1

    return (
      <div className="bg-gradient-to-b from-emerald-500/20 to-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">{game.icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{game.labelVi} Hoàn Thành!</h3>
        <p className="text-emerald-400 text-lg mb-6">
          {isLastGame
            ? 'Bạn đã hoàn thành tất cả thử thách Module 1.3!'
            : `Tiếp theo: ${nextGame?.labelVi}`}
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {GAMES.map((g) => {
            const status = getGameStatus(g.type)
            return (
              <div key={g.type} className="text-center">
                <span className="text-3xl">{g.icon}</span>
                <div className="flex justify-center gap-0.5 mt-1">
                  {[...Array(3)].map((_, si) => (
                    <span
                      key={si}
                      className={`text-xs ${si < status.stars ? 'text-yellow-400' : 'text-slate-600'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {status.skipped && (
                  <span className="text-xs text-orange-400">Đã bỏ</span>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={handleContinueJourney}
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-xl font-bold text-lg hover:bg-emerald-400 transition-all hover:scale-105 shadow-lg shadow-emerald-500/30"
        >
          {isLastGame ? (
            <>
              <span className="material-symbols-outlined">emoji_events</span>
              Xem Kết Quả
            </>
          ) : (
            <>
              Tiếp tục Hành Trình
              <span className="material-symbols-outlined">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    )
  }

  // Render selected game
  if (selectedGame === 'spotter') {
    return (
      <div>
        <button
          onClick={() => setSelectedGame(null)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 mb-4 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Quay lại Bản đồ
        </button>
        <AccidentalSpotterGame
          submoduleId={submoduleId}
          onComplete={(score, total) => handleGameComplete('spotter', score, total)}
        />
      </div>
    )
  }

  if (selectedGame === 'ninja') {
    return (
      <div>
        <button
          onClick={() => setSelectedGame(null)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 mb-4 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Quay lại Bản đồ
        </button>
        <BlackKeyNinjaGame
          submoduleId={submoduleId}
          onComplete={(score, total) => handleGameComplete('ninja', score, total)}
        />
      </div>
    )
  }

  if (selectedGame === 'editor') {
    return (
      <div>
        <button
          onClick={() => setSelectedGame(null)}
          className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-200 mb-4 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Quay lại Bản đồ
        </button>
        <div className="bg-slate-800/50 rounded-xl p-8 text-center">
          <div className="text-6xl mb-4">✍️</div>
          <h3 className="text-xl font-bold text-white mb-2">Biên Tập Viên</h3>
          <p className="text-slate-400 mb-6">Game này đang được phát triển...</p>
          <p className="text-sm text-slate-500">
            Sẽ cho phép bạn nghe giai điệu và thêm dấu hóa vào khuông nhạc!
          </p>
        </div>
      </div>
    )
  }

  // Journey Map (default view)
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">🗺️</span>
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Hành Trình Dấu Hóa</h3>
          <p className="text-sm text-slate-500">Module 1.3 - Hoàn thành 3 thử thách</p>
        </div>
      </div>

      {/* Journey Path */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-amber-500 via-violet-500 to-emerald-500 opacity-30" />

        {/* Game nodes */}
        <div className="space-y-4">
          {GAMES.map((game, index) => {
            const unlocked = isGameUnlocked(index)
            const status = getGameStatus(game.type)

            return (
              <div
                key={game.type}
                className={`relative flex items-center gap-4 p-4 rounded-xl transition-all ${
                  unlocked
                    ? 'bg-white dark:bg-slate-700/50 hover:shadow-lg cursor-pointer'
                    : 'bg-slate-100 dark:bg-slate-800/30 opacity-60'
                }`}
                onClick={() => unlocked && handleStartGame(game.type)}
              >
                {/* Icon node */}
                <div
                  className={`relative z-10 w-16 h-16 rounded-xl flex items-center justify-center text-3xl ${
                    status.completed
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600'
                      : status.skipped
                        ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                        : unlocked
                          ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                          : 'bg-slate-300 dark:bg-slate-600'
                  }`}
                >
                  {game.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-800 dark:text-white">{game.labelVi}</h4>
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(game.stars)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < status.stars ? 'text-yellow-400' : 'text-slate-400'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    {status.skipped && (
                      <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full">
                        Đã bỏ (50%)
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{game.description}</p>
                  {!unlocked && (
                    <p className="text-xs text-amber-500 mt-1">🔒 {game.unlockMessage}</p>
                  )}
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
                  {status.completed ? (
                    <span className="text-emerald-500 text-2xl">✓</span>
                  ) : status.skipped ? (
                    <span className="text-orange-400 text-xl">⏭️</span>
                  ) : unlocked ? (
                    <span className="material-symbols-outlined text-amber-500">play_arrow</span>
                  ) : (
                    <span className="material-symbols-outlined text-slate-400">lock</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer with skip option */}
      <div className="mt-6 text-center space-y-3">
        <p className="text-sm text-slate-400">
          💡 Hoàn thành từng game để mở khóa thử thách tiếp theo!
        </p>

        {/* Skip button - show for unlocked but uncompleted games (not the last game) */}
        {GAMES.some((g, i) => {
          const unlocked = isGameUnlocked(i)
          const status = getGameStatus(g.type)
          // Show skip section if there's an unlocked, uncompleted game that's not the last
          return unlocked && !status.completed && !status.skipped && i < GAMES.length - 1
        }) && (
          <div className="pt-2 border-t border-slate-700">
            <p className="text-xs text-slate-500 mb-2">
              Hoặc lựa chọn <span className="text-orange-400 font-semibold">BỎ BÀI</span> (không
              khuyến khích)
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {GAMES.map((game, index) => {
                const unlocked = isGameUnlocked(index)
                const status = getGameStatus(game.type)
                // Show skip button for UNLOCKED games that aren't completed (skip current challenge)
                // Don't show for last game (nothing to unlock after it)
                if (!unlocked || status.completed || status.skipped || index === GAMES.length - 1)
                  return null

                return (
                  <button
                    key={game.type}
                    onClick={(e) => {
                      e.stopPropagation()
                      if (
                        confirm(
                          `Bạn có chắc muốn bỏ qua "${game.labelVi}"?\n\nBạn sẽ chỉ nhận được 50% điểm và không có XP thưởng.`
                        )
                      ) {
                        handleSkipGame(game.type)
                      }
                    }}
                    className="text-xs px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors border border-orange-500/30 cursor-pointer"
                  >
                    Bỏ {game.labelVi} (-50%)
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Module13GameQuiz
