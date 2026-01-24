import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'
import VirtualPiano from '../VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../VirtualGuitar/VirtualGuitar'

interface BlackKeyNinjaGameProps {
  submoduleId: string
  onComplete?: (score: number, total: number) => void
}

interface Level {
  id: number
  name: string
  instruction: string
  accidentals: string[] // e.g., ['C#', 'F#']
  timerSeconds: number | null
  celebration: string
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Khởi động',
    instruction: 'Tìm và bấm nốt trên Piano hoặc Guitar!',
    accidentals: ['C#', 'F#'],
    timerSeconds: null,
    celebration: '🎉 Tuyệt vời! Bạn đã tìm được C# và F#!',
  },
  {
    id: 2,
    name: 'Mở rộng',
    instruction: 'Thêm D# và G#!',
    accidentals: ['C#', 'D#', 'F#', 'G#'],
    timerSeconds: null,
    celebration: '⭐ Xuất sắc! 4 dấu thăng đã được chinh phục!',
  },
  {
    id: 3,
    name: 'Thử thách Thời gian',
    instruction: 'Nhanh lên! Có giới hạn thời gian!',
    accidentals: ['C#', 'D#', 'F#', 'G#', 'A#'],
    timerSeconds: 5,
    celebration: '🌟 Tốc độ tuyệt vời!',
  },
  {
    id: 4,
    name: 'Flats',
    instruction: 'Giờ là dấu giáng!',
    accidentals: ['Db', 'Eb', 'Gb', 'Ab', 'Bb'],
    timerSeconds: 4,
    celebration: '💪 Siêu đỉnh! Dấu giáng đã bị đánh bại!',
  },
  {
    id: 5,
    name: 'Kết hợp',
    instruction: 'Sharp VÀ Flat!',
    accidentals: ['C#', 'D#', 'F#', 'G#', 'A#', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'],
    timerSeconds: 3,
    celebration: '🔥 Cháy! Bạn là Ninja thực thụ!',
  },
  {
    id: 6,
    name: 'Bậc Thầy',
    instruction: 'Tốc độ tối đa!',
    accidentals: ['C#', 'D#', 'F#', 'G#', 'A#', 'Db', 'Eb', 'Gb', 'Ab', 'Bb'],
    timerSeconds: 2.5,
    celebration: '🏆 HOÀN HẢO! Bạn là Ninja Phím Đen Huyền Thoại!',
  },
]

// Get display name for accidental
const getAccidentalDisplay = (acc: string): string => {
  const note = acc.charAt(0)
  const modifier = acc.slice(1)
  if (modifier === '#') return `${note}♯`
  if (modifier === 'b') return `${note}♭`
  return note
}

// Normalize note name to handle enharmonic equivalents
const normalizeNote = (note: string): string => {
  const noteMap: Record<string, string> = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#',
  }
  const noteName = note.replace(/[0-9]/g, '')
  return noteMap[noteName] || noteName
}

// Check if played note matches target (handles enharmonic equivalents)
const isCorrectNote = (playedNote: string, targetAcc: string): boolean => {
  const playedName = playedNote.replace(/[0-9]/g, '')
  const targetNormalized = normalizeNote(targetAcc)
  const playedNormalized = normalizeNote(playedName)
  return playedNormalized === targetNormalized
}

/**
 * BlackKeyNinjaGame - Speed game for playing accidentals on Piano or Guitar
 * ⭐⭐ Tier 2 Game for Module 1.3
 * 
 * Features DUAL INSTRUMENT mode: Piano (above) + Guitar (below)
 * Player can click either instrument to answer correctly
 * 
 * Embeddable: Can be used standalone or within Module13GameQuiz orchestrator
 */
export const BlackKeyNinjaGame: React.FC<BlackKeyNinjaGameProps> = ({
  submoduleId,
  onComplete,
}) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const [currentLevel, setCurrentLevel] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [targetAccidental, setTargetAccidental] = useState<string>('')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | 'timeout' | null>(null)
  const [successNote, setSuccessNote] = useState<string | null>(null)
  const [errorNote, setErrorNote] = useState<string | null>(null)
  const [showLevelComplete, setShowLevelComplete] = useState(false)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [usedPiano, setUsedPiano] = useState(false)
  const [usedGuitar, setUsedGuitar] = useState(false)

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const level = LEVELS[currentLevel]
  const QUESTIONS_PER_LEVEL = 6

  // Generate new question
  const generateQuestion = useCallback(() => {
    if (!level) return
    const randomAcc = level.accidentals[Math.floor(Math.random() * level.accidentals.length)]
    setTargetAccidental(randomAcc)
    setTimeLeft(level.timerSeconds)
    setSuccessNote(null)
    setErrorNote(null)
  }, [level])

  // Advance to next question - defined BEFORE effects that use it
  const advanceQuestion = useCallback(() => {
    if (currentQuestion + 1 >= QUESTIONS_PER_LEVEL) {
      // Level complete
      if (currentLevel + 1 >= LEVELS.length) {
        // Game complete
        const varietyBonus = usedPiano && usedGuitar ? 25 : 0
        const finalScore = score + varietyBonus
        setSubmoduleScore(submoduleId, 100)
        addXP(40)
        setScore(finalScore)
        setIsGameComplete(true)
        onComplete?.(finalScore, LEVELS.length * QUESTIONS_PER_LEVEL)
      } else {
        setShowLevelComplete(true)
      }
    } else {
      setCurrentQuestion((q) => q + 1)
      generateQuestion()
    }
  }, [
    currentQuestion,
    currentLevel,
    usedPiano,
    usedGuitar,
    score,
    submoduleId,
    setSubmoduleScore,
    addXP,
    onComplete,
    generateQuestion,
  ])

  // Timer effect
  useEffect(() => {
    if (timeLeft === null || timeLeft <= 0 || showFeedback) return

    timerRef.current = setTimeout(() => {
      setTimeLeft((t) => (t !== null ? t - 0.1 : null))
    }, 100)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [timeLeft, showFeedback])

  // Handle timeout
  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 0 && !showFeedback) {
      setShowFeedback('timeout')
      setStreak(0)
      setTimeout(() => {
        setShowFeedback(null)
        advanceQuestion()
      }, 1000)
    }
  }, [timeLeft, showFeedback, advanceQuestion])

  // Initialize first question
  useEffect(() => {
    generateQuestion()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleNotePress = useCallback(
    (note: string, fromInstrument: 'piano' | 'guitar') => {
      if (showFeedback) return

      // Track instrument usage for variety bonus
      if (fromInstrument === 'piano') setUsedPiano(true)
      if (fromInstrument === 'guitar') setUsedGuitar(true)

      playNote(note)
      setTimeout(() => releaseNote(note), 200)

      if (isCorrectNote(note, targetAccidental)) {
        setShowFeedback('correct')
        setSuccessNote(note)
        const speedBonus = timeLeft !== null && timeLeft > (level?.timerSeconds || 0) - 1 ? 50 : 0
        setScore((s) => s + 10 + streak * 2 + speedBonus)
        setStreak((s) => s + 1)

        setTimeout(() => {
          setShowFeedback(null)
          advanceQuestion()
        }, 500)
      } else {
        setShowFeedback('wrong')
        setErrorNote(note)
        setStreak(0)

        setTimeout(() => {
          setShowFeedback(null)
          setErrorNote(null)
        }, 500)
      }
    },
    [showFeedback, targetAccidental, timeLeft, level, streak, playNote, releaseNote, advanceQuestion]
  )

  const handleNextLevel = useCallback(() => {
    setCurrentLevel((l) => l + 1)
    setCurrentQuestion(0)
    setShowLevelComplete(false)
    generateQuestion()
  }, [generateQuestion])

  // Game Complete Screen
  if (isGameComplete) {
    const varietyBonus = usedPiano && usedGuitar
    return (
      <div className="bg-gradient-to-b from-violet-500/20 to-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">🥷</div>
        <h3 className="text-2xl font-bold text-white mb-2">Ninja Phím Đen Hoàn Thành!</h3>
        <p className="text-violet-400 text-lg mb-4">
          Bạn đã chinh phục tất cả {LEVELS.length} cấp độ!
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-3xl text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm">
          Điểm: {score} • +40 XP
          {varietyBonus && <span className="text-emerald-400"> • +25 Đa nhạc cụ!</span>}
        </p>
      </div>
    )
  }

  // Level Complete Screen
  if (showLevelComplete && level) {
    return (
      <div className="bg-gradient-to-b from-violet-500/20 to-slate-800/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥷</span>
            <span className="text-sm font-bold text-violet-400">Ninja Phím Đen</span>
          </div>
          <span className="text-sm text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
        </div>

        <div className="text-center py-8">
          <div className="text-5xl mb-4 animate-pulse">
            {currentLevel >= 4 ? '🔥' : '⚡'}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{level.name} - Hoàn thành!</h3>
          <p className="text-violet-400 text-base mb-6">{level.celebration}</p>

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
            className="inline-flex items-center gap-2 px-8 py-4 bg-violet-500 text-white rounded-xl font-bold text-lg hover:bg-violet-400 transition-all hover:scale-105 shadow-lg shadow-violet-500/30"
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
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🥷</span>
          <span className="text-sm font-bold text-violet-500">Ninja Phím Đen</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
          {streak >= 3 && (
            <span className="text-sm">
              {streak >= 8 ? '🔥🔥🔥' : streak >= 5 ? '🔥🔥' : '🔥'}
            </span>
          )}
        </div>
      </div>

      {/* Progress */}
      <div className="flex justify-center gap-1 mb-3">
        {[...Array(QUESTIONS_PER_LEVEL)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < currentQuestion
                ? 'text-yellow-400'
                : i === currentQuestion
                  ? 'text-violet-500'
                  : 'text-slate-600'
            }`}
          >
            {i < currentQuestion ? '★' : i === currentQuestion ? '●' : '○'}
          </span>
        ))}
      </div>

      {/* Command Display */}
      <div
        className={`text-center py-4 mb-4 rounded-xl transition-all ${
          showFeedback === 'correct'
            ? 'bg-emerald-500/20'
            : showFeedback === 'wrong'
              ? 'bg-red-500/20'
              : showFeedback === 'timeout'
                ? 'bg-orange-500/20'
                : 'bg-violet-500/10'
        }`}
      >
        <p className="text-3xl md:text-4xl font-bold text-violet-600 dark:text-violet-400 mb-1">
          Chơi nốt {getAccidentalDisplay(targetAccidental)}!
        </p>
        <p className="text-sm text-slate-500">
          {showFeedback === 'correct'
            ? '✅ Chính xác!'
            : showFeedback === 'wrong'
              ? '❌ Sai rồi!'
              : showFeedback === 'timeout'
                ? '⏰ Hết giờ!'
                : 'Bấm vào Piano hoặc Guitar bên dưới'}
        </p>
      </div>

      {/* Timer */}
      {level.timerSeconds && (
        <div className="flex justify-center mb-4">
          <div
            className={`px-4 py-2 rounded-lg font-mono text-lg ${
              timeLeft !== null && timeLeft < 1
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            ⏱️ {timeLeft !== null ? timeLeft.toFixed(1) : level.timerSeconds}s
          </div>
        </div>
      )}

      {/* DUAL INSTRUMENT: Piano (top) */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎹</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Piano
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700">
          <VirtualPiano
            startOctave={3}
            octaves={3}
            onStartNote={(note) => handleNotePress(note, 'piano')}
            onStopNote={() => {}}
            activeNotes={[]}
            successNotes={successNote ? [successNote] : []}
            errorNotes={errorNote ? [errorNote] : []}
          />
        </div>
      </div>

      {/* DUAL INSTRUMENT: Guitar (bottom) */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🎸</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
            Guitar Fretboard
          </span>
        </div>
        <VirtualGuitar
          activeNotes={successNote ? [successNote] : []}
          onPlayNote={(note) => handleNotePress(note, 'guitar')}
          showLabels={false}
        />
      </div>

      {/* Hint */}
      <div className="text-center">
        <p className="text-xs text-slate-400">
          ✅ Bấm vào nhạc cụ bất kỳ! • Điểm: {score}
        </p>
      </div>
    </div>
  )
}

export default BlackKeyNinjaGame
