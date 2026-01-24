import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'

interface SameOrDifferentGameProps {
  submoduleId: string
  onComplete?: (score: number, total: number) => void
}

interface Question {
  note1: string
  note2: string
  isSame: boolean
}

interface Level {
  id: number
  name: string
  notes: string[]
  questionCount: number
  celebration: string
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Nốt C',
    notes: ['C3', 'C4', 'C5', 'D4', 'E4'],
    questionCount: 5,
    celebration: '🎵 Bạn đã hiểu khái niệm quãng tám cơ bản!',
  },
  {
    id: 2,
    name: 'C và F',
    notes: ['C3', 'C4', 'C5', 'F3', 'F4', 'F5'],
    questionCount: 6,
    celebration: '🌟 Xuất sắc! Tai bạn ngày càng nhạy!',
  },
  {
    id: 3,
    name: 'C, D, E, F',
    notes: ['C3', 'C4', 'D3', 'D4', 'E3', 'E4', 'F3', 'F4'],
    questionCount: 8,
    celebration: '🔥 Cháy! Bạn phân biệt rất tốt!',
  },
  {
    id: 4,
    name: 'Tất cả nốt',
    notes: ['C3', 'C4', 'D3', 'D4', 'E3', 'E4', 'F3', 'F4', 'G3', 'G4', 'A3', 'A4', 'B3', 'B4'],
    questionCount: 10,
    celebration: '🏆 HOÀN HẢO! Bạn là Bậc Thầy So Sánh Nốt!',
  },
]

// Timing constants
const CORRECT_DELAY = 1500
const WRONG_DELAY = 3500

/**
 * SameOrDifferentGame - Compare two notes and determine if they have the same name
 * ⭐⭐⭐ Tier 3 Game for Module 1.2
 *
 * UX: Auto-advance after answer (1.5s correct, 3.5s wrong)
 */
export const SameOrDifferentGame: React.FC<SameOrDifferentGameProps> = ({
  submoduleId,
  onComplete,
}) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [playingNote, setPlayingNote] = useState<1 | 2 | null>(null)
  const [countdown, setCountdown] = useState<number | null>(null)

  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  const level = LEVELS[currentLevel]

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [])

  const generateQuestion = useCallback(() => {
    if (!level) return

    const shouldBeSame = Math.random() > 0.5
    let note1: string, note2: string

    if (shouldBeSame) {
      const noteLetter = ['C', 'D', 'E', 'F', 'G', 'A', 'B'][Math.floor(Math.random() * 7)]
      const octaves = level.notes
        .filter((n) => n.startsWith(noteLetter))
        .map((n) => parseInt(n.slice(-1)))

      if (octaves.length >= 2) {
        const shuffled = [...octaves].sort(() => Math.random() - 0.5)
        note1 = `${noteLetter}${shuffled[0]}`
        note2 = `${noteLetter}${shuffled[1]}`
      } else {
        note1 = level.notes[Math.floor(Math.random() * level.notes.length)]
        note2 = level.notes[Math.floor(Math.random() * level.notes.length)]
      }
    } else {
      const noteLetters = [...new Set(level.notes.map((n) => n.slice(0, -1)))]
      if (noteLetters.length >= 2) {
        const shuffled = [...noteLetters].sort(() => Math.random() - 0.5)
        const notesFor1 = level.notes.filter((n) => n.startsWith(shuffled[0]))
        const notesFor2 = level.notes.filter((n) => n.startsWith(shuffled[1]))
        note1 = notesFor1[Math.floor(Math.random() * notesFor1.length)]
        note2 = notesFor2[Math.floor(Math.random() * notesFor2.length)]
      } else {
        note1 = level.notes[0]
        note2 = level.notes[1] || level.notes[0]
      }
    }

    const actualIsSame = note1.slice(0, -1) === note2.slice(0, -1)
    setQuestion({ note1, note2, isSame: actualIsSame })
    setSelectedAnswer(null)
    setShowResult(false)
    setPlayingNote(null)
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

  const playNoteSound = useCallback(
    (noteNum: 1 | 2) => {
      if (!question) return
      const note = noteNum === 1 ? question.note1 : question.note2
      setPlayingNote(noteNum)
      playNote(note)
      setTimeout(() => {
        releaseNote(note)
        setPlayingNote(null)
      }, 600)
    },
    [question, playNote, releaseNote]
  )

  const playBoth = useCallback(() => {
    if (!question) return
    playNoteSound(1)
    setTimeout(() => playNoteSound(2), 800)
  }, [question, playNoteSound])

  useEffect(() => {
    if (question && !showResult && !showLevelComplete) {
      const timer = setTimeout(playBoth, 500)
      return () => clearTimeout(timer)
    }
  }, [question, showResult, showLevelComplete, playBoth])

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
    (answer: boolean) => {
      if (showResult || !question) return

      setSelectedAnswer(answer)
      const isCorrect = answer === question.isSame

      if (isCorrect) {
        setScore((prev) => prev + 1)
      }

      setShowResult(true)

      // Auto-advance with countdown
      const delay = isCorrect ? CORRECT_DELAY : WRONG_DELAY
      const seconds = Math.ceil(delay / 1000)
      setCountdown(seconds)

      let remaining = seconds
      countdownRef.current = setInterval(() => {
        remaining -= 1
        if (remaining > 0) {
          setCountdown(remaining)
        } else {
          if (countdownRef.current) clearInterval(countdownRef.current)
        }
      }, 1000)

      autoAdvanceRef.current = setTimeout(() => {
        advanceToNext()
      }, delay)
    },
    [showResult, question, advanceToNext]
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
      addXP(30)
      setIsGameComplete(true)
      onComplete?.(score, level.questionCount)
    }
  }, [currentLevel, score, level, submoduleId, setSubmoduleScore, addXP, onComplete])

  const getExplanation = () => {
    if (!question) return null
    const note1Letter = question.note1.slice(0, -1)
    const note2Letter = question.note2.slice(0, -1)
    const isCorrect = selectedAnswer === question.isSame

    if (question.isSame) {
      return {
        isCorrect,
        message: isCorrect
          ? `✓ Đúng! Cả hai đều là nốt ${note1Letter}, chỉ khác QUÃNG TÁM.`
          : `✗ Sai! Cả hai đều là nốt ${note1Letter} - chỉ khác quãng tám.`,
      }
    } else {
      return {
        isCorrect,
        message: isCorrect
          ? `✓ Đúng! ${question.note1} là ${note1Letter}, ${question.note2} là ${note2Letter}.`
          : `✗ Sai! ${question.note1} là ${note1Letter}, ${question.note2} là ${note2Letter}.`,
      }
    }
  }

  // Game Complete
  if (isGameComplete) {
    return (
      <div className="bg-gradient-to-b from-emerald-500/20 to-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">⚖️</div>
        <h3 className="text-2xl font-bold text-white mb-2">Giống hay Khác Hoàn Thành!</h3>
        <p className="text-emerald-400 text-lg mb-4">
          Bạn đã hiểu rõ về quãng tám và khác biệt giữa các nốt!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-3xl text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm">+30 XP đã được cộng vào tài khoản của bạn!</p>
      </div>
    )
  }

  // Level Complete
  if (showLevelComplete && level) {
    const isLastLevel = currentLevel === LEVELS.length - 1
    const percentage = Math.round((score / level.questionCount) * 100)
    return (
      <div className="bg-gradient-to-b from-[#30e8e8]/20 to-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <span className="text-sm font-bold text-[#30e8e8]">Giống hay Khác</span>
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

  if (!level || !question) return null

  const explanation = showResult ? getExplanation() : null

  // Active Gameplay
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚖️</span>
          <span className="text-sm font-bold text-[#30e8e8]">Giống hay Khác</span>
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
        <p className="text-base text-slate-600 dark:text-slate-300">
          Nghe 2 nốt. Chúng CÙNG tên hay KHÁC tên?
        </p>
      </div>

      {/* Note players */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => !showResult && playNoteSound(1)}
          disabled={showResult}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 ${
            playingNote === 1
              ? 'bg-[#30e8e8]/20 border-[#30e8e8] scale-105'
              : showResult
                ? 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 cursor-not-allowed'
                : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[#30e8e8] cursor-pointer'
          }`}
        >
          <span className="text-3xl">{playingNote === 1 ? '🔊' : '🎵'}</span>
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Nốt 1</span>
          {showResult && (
            <span className="text-xs text-[#30e8e8] font-medium">{question.note1}</span>
          )}
        </button>

        <button
          onClick={() => !showResult && playNoteSound(2)}
          disabled={showResult}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all border-2 ${
            playingNote === 2
              ? 'bg-[#30e8e8]/20 border-[#30e8e8] scale-105'
              : showResult
                ? 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 cursor-not-allowed'
                : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[#30e8e8] cursor-pointer'
          }`}
        >
          <span className="text-3xl">{playingNote === 2 ? '🔊' : '🎶'}</span>
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Nốt 2</span>
          {showResult && (
            <span className="text-xs text-[#30e8e8] font-medium">{question.note2}</span>
          )}
        </button>
      </div>

      {!showResult && (
        <div className="flex justify-center mb-6">
          <button
            onClick={playBoth}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-lg">replay</span>
            Nghe lại cả hai
          </button>
        </div>
      )}

      {/* Answer buttons */}
      {!showResult && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="flex-1 max-w-[180px] py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            🎵 CÙNG
            <span className="block text-xs font-normal opacity-80 mt-1">Tên nốt giống nhau</span>
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="flex-1 max-w-[180px] py-4 px-6 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            🎶 KHÁC
            <span className="block text-xs font-normal opacity-80 mt-1">Tên nốt khác nhau</span>
          </button>
        </div>
      )}

      {/* Result with countdown */}
      {explanation && (
        <div
          className={`p-4 rounded-xl text-center font-medium ${
            explanation.isCorrect
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
          }`}
        >
          <p className="text-lg mb-1">{explanation.message}</p>
          {countdown && (
            <p className="text-sm opacity-70">
              {explanation.isCorrect ? 'Câu tiếp...' : 'Hãy ghi nhớ...'} ({countdown}s)
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default SameOrDifferentGame
