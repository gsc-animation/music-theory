import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'
import abcjs from 'abcjs'

interface AccidentalSpotterGameProps {
  submoduleId: string
  onComplete?: (score: number, total: number) => void
}

interface Level {
  id: number
  name: string
  instruction: string
  accidentals: string[] // e.g., ['C#', 'D#', 'F#']
  showFlats: boolean
  choices: number // Number of answer choices
  celebration: string
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Sharps Cơ bản',
    instruction: 'Đây là nốt gì? (Dấu thăng)',
    accidentals: ['C#', 'D#', 'F#'],
    showFlats: false,
    choices: 2,
    celebration: '🎉 Tuyệt vời! Bạn đã nhận biết được dấu thăng cơ bản!',
  },
  {
    id: 2,
    name: 'Thêm Sharps',
    instruction: 'Đây là nốt gì?',
    accidentals: ['G#', 'A#', 'C#', 'D#', 'F#'],
    showFlats: false,
    choices: 3,
    celebration: '⭐ Xuất sắc! Bạn đã nắm vững tất cả dấu thăng!',
  },
  {
    id: 3,
    name: 'Flats Cơ bản',
    instruction: 'Đây là nốt gì? (Dấu giáng)',
    accidentals: ['Db', 'Eb', 'Bb'],
    showFlats: true,
    choices: 2,
    celebration: '🌟 Tuyệt vời! Bạn đã nhận biết được dấu giáng!',
  },
  {
    id: 4,
    name: 'Thêm Flats',
    instruction: 'Đây là nốt gì?',
    accidentals: ['Gb', 'Ab', 'Bb', 'Db', 'Eb'],
    showFlats: true,
    choices: 3,
    celebration: '💪 Siêu đỉnh! Tất cả dấu giáng đã được chinh phục!',
  },
  {
    id: 5,
    name: 'Kết hợp',
    instruction: 'Sharp hay Flat?',
    accidentals: ['C#', 'D#', 'F#', 'G#', 'A#', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'],
    showFlats: true,
    choices: 4,
    celebration: '🔥 Cháy! Bạn phân biệt được Sharp và Flat!',
  },
  {
    id: 6,
    name: 'Bậc Thầy',
    instruction: 'Thử thách cuối cùng!',
    accidentals: ['C#', 'D#', 'F#', 'G#', 'A#', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'],
    showFlats: true,
    choices: 5,
    celebration: '🏆 HOÀN HẢO! Bạn là Bậc Thầy Soi Dấu Hóa!',
  },
]

// Convert accidental name to ABC notation
const accidentalToAbc = (acc: string): string => {
  const note = acc.charAt(0)
  const modifier = acc.slice(1)
  if (modifier === '#') return `^${note}`
  if (modifier === 'b') return `_${note}`
  return note
}

// Get display name for accidental
const getAccidentalDisplay = (acc: string): string => {
  const note = acc.charAt(0)
  const modifier = acc.slice(1)
  if (modifier === '#') return `${note}♯`
  if (modifier === 'b') return `${note}♭`
  return note
}

/**
 * AccidentalSpotterGame - Identify accidentals on staff
 * ⭐ Tier 1 Game for Module 1.3
 *
 * Embeddable: Can be used standalone or within Module13GameQuiz orchestrator
 */
export const AccidentalSpotterGame: React.FC<AccidentalSpotterGameProps> = ({
  submoduleId,
  onComplete,
}) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const abcRef = useRef<HTMLDivElement>(null)

  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [correctNote, setCorrectNote] = useState<string>('')
  const [choices, setChoices] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)

  const level = LEVELS[currentLevel]
  const QUESTIONS_PER_LEVEL = 5

  // Generate a new question
  const generateQuestion = useCallback(() => {
    if (!level) return

    // Pick random accidental from level
    const randomAcc = level.accidentals[Math.floor(Math.random() * level.accidentals.length)]
    setCorrectNote(randomAcc)

    // Generate choices
    const allOptions = level.showFlats
      ? ['C#', 'D#', 'F#', 'G#', 'A#', 'Db', 'Eb', 'Gb', 'Ab', 'Bb']
      : ['C#', 'D#', 'F#', 'G#', 'A#']

    const shuffled = allOptions.filter((o) => o !== randomAcc).sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, level.choices - 1)
    const finalChoices = [...selected, randomAcc].sort(() => Math.random() - 0.5)
    setChoices(finalChoices)
  }, [level])

  // Render ABC notation when question changes
  useEffect(() => {
    if (abcRef.current && correctNote) {
      const abcNotation = accidentalToAbc(correctNote)
      const abc = `X:1\nL:1/2\nK:C clef=treble\n${abcNotation}4|]`
      abcjs.renderAbc(abcRef.current, abc, {
        staffwidth: 200,
        responsive: 'resize',
        paddingtop: 0,
        paddingbottom: 0,
      })

      // Play the note
      const noteWithOctave = `${correctNote.charAt(0)}${correctNote.includes('b') ? 'b' : '#'}4`
      setTimeout(() => {
        playNote(noteWithOctave)
        setTimeout(() => releaseNote(noteWithOctave), 500)
      }, 300)
    }
  }, [correctNote, playNote, releaseNote])

  // Initialize first question
  useEffect(() => {
    generateQuestion()
  }, [generateQuestion])

  const handleAnswer = useCallback(
    (answer: string) => {
      if (showFeedback) return

      if (answer === correctNote) {
        setShowFeedback('correct')
        setScore((s) => s + 10 + streak * 2)
        setStreak((s) => s + 1)
      } else {
        setShowFeedback('wrong')
        setStreak(0)
      }

      setTimeout(() => {
        setShowFeedback(null)

        if (currentQuestion + 1 >= QUESTIONS_PER_LEVEL) {
          // Level complete
          if (currentLevel + 1 >= LEVELS.length) {
            // Game complete - calculate final score with current answer
            const finalScore = score + 10 + streak * 2
            setSubmoduleScore(submoduleId, 100)
            addXP(30)
            setIsGameComplete(true)
            // Total = 6 levels * 5 questions = 30 total questions
            onComplete?.(finalScore, LEVELS.length * QUESTIONS_PER_LEVEL)
          } else {
            setShowLevelComplete(true)
          }
        } else {
          setCurrentQuestion((q) => q + 1)
          generateQuestion()
        }
      }, 800)
    },
    [
      showFeedback,
      correctNote,
      streak,
      currentQuestion,
      currentLevel,
      submoduleId,
      setSubmoduleScore,
      addXP,
      score,
      onComplete,
      generateQuestion,
    ]
  )

  const handleNextLevel = useCallback(() => {
    setCurrentLevel((l) => l + 1)
    setCurrentQuestion(0)
    setShowLevelComplete(false)
    generateQuestion()
  }, [generateQuestion])

  // Game Complete Screen
  if (isGameComplete) {
    return (
      <div className="bg-gradient-to-b from-amber-500/20 to-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h3 className="text-2xl font-bold text-white mb-2">Soi Dấu Hóa Hoàn Thành!</h3>
        <p className="text-amber-400 text-lg mb-4">
          Bạn đã chinh phục tất cả {LEVELS.length} cấp độ!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-3xl text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm">Điểm: {score} • +30 XP</p>
      </div>
    )
  }

  // Level Complete Screen
  if (showLevelComplete && level) {
    return (
      <div className="bg-gradient-to-b from-amber-500/20 to-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">👁️</span>
            <span className="text-sm font-bold text-amber-400">Soi Dấu Hóa</span>
          </div>
          <span className="text-sm text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
        </div>

        <div className="text-center py-8">
          <div className="text-5xl mb-4 animate-pulse">{currentLevel >= 4 ? '🔥' : '⭐'}</div>
          <h3 className="text-xl font-bold text-white mb-2">{level.name} - Hoàn thành!</h3>
          <p className="text-amber-400 text-base mb-6">{level.celebration}</p>

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
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-slate-900 rounded-xl font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-lg shadow-amber-500/30"
          >
            Tiếp tục Level {currentLevel + 2}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    )
  }

  if (!level) return null

  // Active Gameplay Screen
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👁️</span>
          <span className="text-sm font-bold text-amber-500">Soi Dấu Hóa</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
          {streak >= 3 && (
            <span className="text-sm">{streak >= 8 ? '🔥🔥🔥' : streak >= 5 ? '🔥🔥' : '🔥'}</span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-1 mb-4">
        {[...Array(QUESTIONS_PER_LEVEL)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < currentQuestion
                ? 'text-yellow-400'
                : i === currentQuestion
                  ? 'text-amber-500'
                  : 'text-slate-600'
            }`}
          >
            {i < currentQuestion ? '★' : i === currentQuestion ? '●' : '○'}
          </span>
        ))}
      </div>

      {/* Instruction */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{level.name}</h3>
        <p className="text-base text-amber-500 font-medium">{level.instruction}</p>
      </div>

      {/* ABC Staff Display */}
      <div
        className={`bg-white dark:bg-slate-900 rounded-lg p-4 border-2 transition-all ${
          showFeedback === 'correct'
            ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
            : showFeedback === 'wrong'
              ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
              : 'border-slate-200 dark:border-slate-700'
        }`}
      >
        <div ref={abcRef} className="flex justify-center" />
      </div>

      {/* Answer Choices */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        {choices.map((choice) => {
          const isSharp = choice.includes('#')
          return (
            <button
              key={choice}
              onClick={() => handleAnswer(choice)}
              disabled={showFeedback !== null}
              className={`py-4 px-6 rounded-xl font-bold text-lg transition-all ${
                showFeedback && choice === correctNote
                  ? 'bg-emerald-500 text-white scale-105'
                  : showFeedback && choice !== correctNote
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 opacity-50'
                    : isSharp
                      ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/30 border-2 border-amber-500/50'
                      : 'bg-sky-500/20 text-sky-600 dark:text-sky-400 hover:bg-sky-500/30 border-2 border-sky-500/50'
              }`}
            >
              {getAccidentalDisplay(choice)}
            </button>
          )
        })}
      </div>

      {/* Score */}
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-400">Điểm: {score}</p>
      </div>
    </div>
  )
}

export default AccidentalSpotterGame
