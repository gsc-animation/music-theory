import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'

interface ListenMatchGameProps {
  submoduleId: string
  onComplete?: (score: number, total: number) => void
}

interface Level {
  id: number
  name: string
  noteName: string
  octaves: number[]
  questionCount: number
  celebration: string
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Nốt C - 2 quãng tám',
    noteName: 'C',
    octaves: [3, 4],
    questionCount: 5,
    celebration: '🎧 Tai bạn bắt đầu nhạy rồi đó!',
  },
  {
    id: 2,
    name: 'Nốt C - 3 quãng tám',
    noteName: 'C',
    octaves: [3, 4, 5],
    questionCount: 6,
    celebration: '🎵 Xuất sắc! Bạn phân biệt được 3 quãng tám!',
  },
  {
    id: 3,
    name: 'Nốt F - 2 quãng tám',
    noteName: 'F',
    octaves: [3, 4],
    questionCount: 5,
    celebration: '🌟 Tuyệt! Bạn đang tiến bộ nhanh!',
  },
  {
    id: 4,
    name: 'Nốt F - 3 quãng tám',
    noteName: 'F',
    octaves: [3, 4, 5],
    questionCount: 6,
    celebration: '🔥 Cháy! Tai bạn ngày càng thính!',
  },
  {
    id: 5,
    name: 'Bậc Thầy - C và F',
    noteName: 'random',
    octaves: [3, 4, 5],
    questionCount: 8,
    celebration: '🏆 HOÀN HẢO! Bạn là Bậc Thầy Nghe Quãng Tám!',
  },
]

// Timing constants
const CORRECT_DELAY = 1500 // 1.5s for correct answer
const WRONG_DELAY = 3500 // 3.5s for wrong answer to allow memorization

/**
 * ListenMatchGame - Listen to a note and identify its OCTAVE
 * ⭐⭐ Tier 2 Game for Module 1.2
 *
 * UX: Auto-advance after answer (1.5s correct, 3.5s wrong)
 */
export const ListenMatchGame: React.FC<ListenMatchGameProps> = ({ submoduleId, onComplete }) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [targetNote, setTargetNote] = useState<string | null>(null)
  const [currentNoteName, setCurrentNoteName] = useState<string>('C')
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [hasPlayedNote, setHasPlayedNote] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)

  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const level = LEVELS[currentLevel]

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  // Generate question
  const generateQuestion = useCallback(() => {
    if (!level) return

    const noteName =
      level.noteName === 'random' ? (Math.random() > 0.5 ? 'C' : 'F') : level.noteName
    const randomOctave = level.octaves[Math.floor(Math.random() * level.octaves.length)]
    const note = `${noteName}${randomOctave}`

    setCurrentNoteName(noteName)
    setTargetNote(note)
    setSelectedAnswer(null)
    setShowResult(false)
    setHasPlayedNote(false)
    setCountdown(null)
  }, [level])

  useEffect(() => {
    if (!showLevelComplete && !isGameComplete && !showResult) {
      generateQuestion()
    }
  }, [
    currentLevel,
    currentQuestion,
    showLevelComplete,
    isGameComplete,
    showResult,
    generateQuestion,
  ])

  const playTargetNote = useCallback(() => {
    if (!targetNote) return
    playNote(targetNote)
    setTimeout(() => releaseNote(targetNote), 600)
    setHasPlayedNote(true)
  }, [targetNote, playNote, releaseNote])

  useEffect(() => {
    if (targetNote && !hasPlayedNote && !showLevelComplete && !showResult) {
      const timer = setTimeout(playTargetNote, 500)
      return () => clearTimeout(timer)
    }
  }, [targetNote, hasPlayedNote, showLevelComplete, showResult, playTargetNote])

  const advanceToNext = useCallback(() => {
    if (currentQuestion >= level.questionCount - 1) {
      setShowLevelComplete(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setShowResult(false)
    }
    setCountdown(null)
  }, [currentQuestion, level])

  const handleAnswer = useCallback(
    (octave: number) => {
      if (showResult || !targetNote) return

      setSelectedAnswer(octave)
      const targetOctave = parseInt(targetNote.slice(-1))
      const isCorrect = octave === targetOctave

      if (isCorrect) {
        setScore((prev) => prev + 1)
      }

      setShowResult(true)

      // Set up auto-advance with countdown
      const delay = isCorrect ? CORRECT_DELAY : WRONG_DELAY
      const seconds = Math.ceil(delay / 1000)
      setCountdown(seconds)

      // Countdown timer
      let remaining = seconds
      countdownRef.current = setInterval(() => {
        remaining -= 1
        if (remaining > 0) {
          setCountdown(remaining)
        } else {
          if (countdownRef.current) clearInterval(countdownRef.current)
        }
      }, 1000)

      // Auto advance
      autoAdvanceRef.current = setTimeout(() => {
        advanceToNext()
      }, delay)
    },
    [showResult, targetNote, advanceToNext]
  )

  const handleNextLevel = useCallback(() => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel((prev) => prev + 1)
      setCurrentQuestion(0)
      setScore(0)
      setShowLevelComplete(false)
    } else {
      const percentage = Math.round((score / level.questionCount) * 100)
      setSubmoduleScore(submoduleId, percentage)
      addXP(25)
      setIsGameComplete(true)
      onComplete?.(score, level.questionCount)
    }
  }, [currentLevel, score, level, submoduleId, setSubmoduleScore, addXP, onComplete])

  // Game Complete Screen
  if (isGameComplete) {
    return (
      <div className="bg-gradient-to-b from-emerald-500/20 to-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">🎧</div>
        <h3 className="text-2xl font-bold text-white mb-2">Nghe Quãng Tám Hoàn Thành!</h3>
        <p className="text-emerald-400 text-lg mb-4">
          Bạn đã chinh phục tất cả {LEVELS.length} thử thách!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-3xl text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm">+25 XP đã được cộng vào tài khoản của bạn!</p>
      </div>
    )
  }

  // Level Complete Screen
  if (showLevelComplete && level) {
    const isLastLevel = currentLevel === LEVELS.length - 1
    const percentage = Math.round((score / level.questionCount) * 100)
    return (
      <div className="bg-gradient-to-b from-[#30e8e8]/20 to-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👂</span>
            <span className="text-sm font-bold text-[#30e8e8]">Nghe Quãng Tám</span>
          </div>
          <span className="text-sm text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
        </div>

        <div className="text-center py-8">
          <div className="text-5xl mb-4 animate-pulse">
            {percentage >= 80 ? '🌟' : percentage >= 60 ? '👍' : '💪'}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{level.name} - Hoàn thành!</h3>
          <p className="text-3xl font-bold mb-2">
            <span
              className={
                percentage >= 80
                  ? 'text-emerald-400'
                  : percentage >= 60
                    ? 'text-amber-400'
                    : 'text-rose-400'
              }
            >
              {score}/{level.questionCount}
            </span>
          </p>
          <p className="text-[#30e8e8] text-base mb-6">{level.celebration}</p>

          <div className="flex justify-center gap-1 mb-6">
            {LEVELS.map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${i <= currentLevel ? 'text-yellow-400' : 'text-slate-600'}`}
              >
                {i <= currentLevel ? '★' : '☆'}
              </span>
            ))}
          </div>

          <button
            onClick={handleNextLevel}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#30e8e8] text-[#111818] rounded-xl font-bold text-lg hover:bg-[#26d4d4] transition-all hover:scale-105 shadow-lg shadow-[#30e8e8]/30"
          >
            {isLastLevel ? (
              <>
                <span className="material-symbols-outlined">emoji_events</span>
                Hoàn Thành Game!
              </>
            ) : (
              <>
                Tiếp tục Level {currentLevel + 2}
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  if (!level || !targetNote) return null

  const targetOctave = parseInt(targetNote.slice(-1))
  const isCorrect = selectedAnswer === targetOctave

  // Active Gameplay
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👂</span>
          <span className="text-sm font-bold text-[#30e8e8]">Nghe Quãng Tám</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Q{currentQuestion + 1}/{level.questionCount}
          </span>
          <span className="text-sm font-bold text-emerald-500">Điểm: {score}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#30e8e8] transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / level.questionCount) * 100}%` }}
        />
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
          Level {currentLevel + 1}: {level.name}
        </h3>
        <p className="text-base text-slate-600 dark:text-slate-300 mb-4">
          Nghe nốt <span className="font-bold text-[#30e8e8] text-xl">{currentNoteName}</span> và
          chọn đúng quãng tám!
        </p>

        <button
          onClick={playTargetNote}
          disabled={showResult}
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
            showResult
              ? 'bg-slate-400 cursor-not-allowed'
              : 'bg-[#30e8e8] text-[#111818] hover:bg-[#26d4d4] hover:scale-105'
          }`}
        >
          <span className="material-symbols-outlined text-xl">volume_up</span>
          {hasPlayedNote ? 'Nghe Lại' : 'Nghe Nốt'} {currentNoteName}
        </button>
      </div>

      {/* Octave choice buttons */}
      <div className="flex justify-center gap-4 mb-4">
        {level.octaves.map((octave) => {
          const isTarget = showResult && octave === targetOctave
          const isSelected = octave === selectedAnswer
          const isWrongSelection = showResult && isSelected && !isCorrect

          return (
            <button
              key={octave}
              onClick={() => handleAnswer(octave)}
              disabled={showResult}
              className={`flex flex-col items-center gap-2 px-6 py-4 rounded-xl border-2 transition-all ${
                showResult
                  ? isTarget
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-500 scale-105'
                    : isWrongSelection
                      ? 'bg-rose-100 dark:bg-rose-900/30 border-rose-500'
                      : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 opacity-50'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[#30e8e8] hover:scale-105 cursor-pointer'
              }`}
            >
              <span
                className={`text-3xl font-bold ${
                  isTarget
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : isWrongSelection
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-slate-800 dark:text-white'
                }`}
              >
                {currentNoteName}
                {octave}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Quãng {octave}</span>
              {isTarget && <span className="text-emerald-500 text-lg">✓</span>}
              {isWrongSelection && <span className="text-rose-500 text-lg">✗</span>}
            </button>
          )
        })}
      </div>

      {/* Result feedback with countdown */}
      {showResult && (
        <div
          className={`p-4 rounded-xl text-center font-bold ${
            isCorrect
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
          }`}
        >
          <p className="text-lg mb-1">
            {isCorrect
              ? `✓ Đúng rồi! Đây là nốt ${targetNote}`
              : `✗ Sai! Đáp án đúng là ${targetNote}`}
          </p>
          {countdown && (
            <p className="text-sm opacity-70">
              {isCorrect ? 'Câu tiếp...' : 'Hãy ghi nhớ...'} ({countdown}s)
            </p>
          )}
        </div>
      )}

      {/* Hint */}
      {!showResult && (
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            💡 Mẹo: Quãng tám càng cao, âm thanh càng sáng và nhọn. Quãng tám thấp nghe trầm và ấm
            hơn.
          </p>
        </div>
      )}
    </div>
  )
}

export default ListenMatchGame
