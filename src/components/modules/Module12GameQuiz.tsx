import React, { useState, useMemo } from 'react'
import { NoteHuntGame } from './NoteHuntGame'
import { ListenMatchGame } from './ListenMatchGame'
import { SameOrDifferentGame } from './SameOrDifferentGame'
import { useProgressStore } from '../../stores/useProgressStore'

interface Module12GameQuizProps {
  submoduleId: string
}

type GameType = 'note-hunt' | 'listen-match' | 'same-different'

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
    type: 'note-hunt',
    label: 'Note Hunt',
    labelVi: 'Săn Nốt',
    icon: '🎯',
    description: 'Tìm tất cả nốt C/F trên Piano',
    stars: 1,
    unlockMessage: 'Bắt đầu hành trình!',
  },
  {
    type: 'listen-match',
    label: 'Listen & Match',
    labelVi: 'Nghe Quãng Tám',
    icon: '👂',
    description: 'Nghe nốt và chọn đúng quãng tám',
    stars: 2,
    unlockMessage: 'Rèn luyện tai nghe!',
  },
  {
    type: 'same-different',
    label: 'Same or Different',
    labelVi: 'Giống hay Khác',
    icon: '⚖️',
    description: 'So sánh tên của 2 nốt nhạc',
    stars: 3,
    unlockMessage: 'Thử thách cuối cùng!',
  },
]

/**
 * Module12GameQuiz - Orchestrates the 3-tier game journey for Module 1.2
 * Using Journey Map design similar to Module 1.1
 */
export const Module12GameQuiz: React.FC<Module12GameQuizProps> = ({ submoduleId }) => {
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null)
  const [completedGames, setCompletedGames] = useState<Set<GameType>>(new Set())
  const [showGameComplete, setShowGameComplete] = useState(false)
  const [lastCompletedGame, setLastCompletedGame] = useState<GameType | null>(null)

  const completeSubmodule = useProgressStore((s) => s.completeSubmodule)

  const isGameUnlocked = (gameIndex: number) => {
    if (gameIndex === 0) return true
    return completedGames.has(GAMES[gameIndex - 1].type)
  }

  const handleGameComplete = (gameType: GameType) => {
    setCompletedGames((prev) => new Set([...prev, gameType]))
    setLastCompletedGame(gameType)
    setShowGameComplete(true)

    if (completedGames.size + 1 >= GAMES.length) {
      completeSubmodule(submoduleId)
    }
  }

  const handleNextGame = () => {
    if (!lastCompletedGame) return

    const currentIndex = GAMES.findIndex((g) => g.type === lastCompletedGame)
    if (currentIndex < GAMES.length - 1) {
      setSelectedGame(GAMES[currentIndex + 1].type)
      setShowGameComplete(false)
    } else {
      setSelectedGame(null)
      setShowGameComplete(false)
    }
  }

  const handleBackToSelector = () => {
    setSelectedGame(null)
    setShowGameComplete(false)
  }

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

  // Game Complete Transition Screen
  if (showGameComplete && lastCompletedGame) {
    const currentIndex = GAMES.findIndex((g) => g.type === lastCompletedGame)
    const currentGame = GAMES[currentIndex]
    const nextGame = GAMES[currentIndex + 1]
    const isAllComplete = currentIndex >= GAMES.length - 1

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
              <p className="text-emerald-400 text-lg mb-4">
                Bạn đã chinh phục cả 3 trò chơi của Module 1.2!
              </p>

              <div className="flex justify-center gap-4 mb-6">
                {GAMES.map((game) => (
                  <div key={game.type} className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{game.icon}</span>
                    <span className="text-yellow-400 text-lg">★★★</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleBackToSelector}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#30e8e8] text-[#111818] rounded-xl font-bold hover:bg-[#26d4d4] transition-all hover:scale-105 shadow-lg"
              >
                <span className="material-symbols-outlined">home</span>
                Quay lại Journey Map
              </button>
            </>
          ) : (
            <>
              <div className="text-5xl mb-4 animate-pulse">{currentGame.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">
                {currentGame.labelVi} - Hoàn thành!
              </h3>

              <div className="flex justify-center gap-4 my-6">
                {GAMES.map((game, i) => {
                  const isCompleted =
                    completedGames.has(game.type) || game.type === lastCompletedGame
                  const isNext = i === currentIndex + 1

                  return (
                    <div key={game.type} className="flex flex-col items-center gap-1">
                      <span className={`text-2xl ${isCompleted ? '' : 'opacity-30'}`}>
                        {game.icon}
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

              {nextGame && (
                <div className="bg-slate-800/50 rounded-xl p-4 mb-6 border border-[#30e8e8]/30 max-w-xs mx-auto">
                  <p className="text-slate-400 text-sm mb-2">Thử thách tiếp theo:</p>
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-3xl">{nextGame.icon}</span>
                    <div>
                      <h4 className="font-bold text-white">{nextGame.labelVi}</h4>
                      <p className="text-xs text-[#30e8e8]">{nextGame.unlockMessage}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-3">
                <button
                  onClick={handleBackToSelector}
                  className="px-4 py-3 bg-slate-700 text-white rounded-xl font-medium hover:bg-slate-600 transition-all"
                >
                  Journey Map
                </button>
                <button
                  onClick={handleNextGame}
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

  // Journey Map Selector (similar to Module 1.1)
  if (!selectedGame) {
    const allComplete = completedGames.size >= GAMES.length

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
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            Journey Map
          </h2>
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
            {GAMES.map((game, index) => {
              const isUnlocked = isGameUnlocked(index)
              const isCompleted = completedGames.has(game.type)
              const isLeft = index % 2 === 0

              return (
                <div key={game.type} className="relative">
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
                      onClick={() => isUnlocked && setSelectedGame(game.type)}
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
                          {isCompleted ? '✓' : isUnlocked ? game.icon : '🔒'}
                          {/* Glow effect for unlocked but not completed */}
                          {isUnlocked && !isCompleted && (
                            <div className="absolute inset-0 rounded-full bg-[#30e8e8]/30 animate-ping" />
                          )}
                        </div>

                        {/* Game Info */}
                        <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
                          <h4 className="font-bold text-white text-sm">{game.labelVi}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{game.description}</p>

                          {/* 3-Star Rating */}
                          <div
                            className={`flex gap-1 mt-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}
                          >
                            {[1, 2, 3].map((s) => (
                              <span
                                key={s}
                                className={`text-lg transition-transform ${
                                  isCompleted && s <= game.stars
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

  // Active Game View
  const gameInfo = GAMES.find((g) => g.type === selectedGame)

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-xl p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={handleBackToSelector}
          className="flex items-center gap-1 text-slate-400 hover:text-white text-sm transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Journey Map
        </button>
        <div className="text-right">
          <span className="text-xs text-[#30e8e8]">{gameInfo?.labelVi}</span>
          <div className="flex gap-0.5 justify-end">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`text-xs ${s <= (gameInfo?.stars || 0) ? 'text-yellow-400' : 'text-slate-600'}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Render selected game */}
      {selectedGame === 'note-hunt' && (
        <NoteHuntGame
          submoduleId={`${submoduleId}-note-hunt`}
          onComplete={() => handleGameComplete('note-hunt')}
        />
      )}
      {selectedGame === 'listen-match' && (
        <ListenMatchGame
          submoduleId={`${submoduleId}-listen-match`}
          onComplete={() => handleGameComplete('listen-match')}
        />
      )}
      {selectedGame === 'same-different' && (
        <SameOrDifferentGame
          submoduleId={`${submoduleId}-same-different`}
          onComplete={() => handleGameComplete('same-different')}
        />
      )}
    </div>
  )
}

export default Module12GameQuiz
