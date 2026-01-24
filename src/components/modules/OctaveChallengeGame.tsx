import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import abcjs from 'abcjs'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { getOctaveChoices } from '../../data/module-12-games'

interface OctaveChallengeGameProps {
  submoduleId: string
  notes: string[] // Notes with octaves (e.g., ['C3', 'C4', 'C5'])
  questionCount?: number
  timerSeconds?: number | null
  onComplete?: (score: number, total: number) => void
}

// Auto-advance delay in seconds
const AUTO_ADVANCE_DELAY = 2

/**
 * Convert note format (e.g., "C4", "F#5") to ABC notation
 */
const noteToAbc = (note: string): string => {
  const match = note.match(/^([A-G])([#b]?)(\d)$/)
  if (!match) return ''

  const [, letter, accidental, octaveStr] = match
  const octave = parseInt(octaveStr, 10)

  let abcAccidental = ''
  if (accidental === '#') abcAccidental = '^'
  else if (accidental === 'b') abcAccidental = '_'

  let abcNote = ''
  if (octave <= 3) {
    abcNote = letter
    const commas = 4 - octave
    abcNote += ','.repeat(commas)
  } else if (octave === 4) {
    abcNote = letter
  } else if (octave === 5) {
    abcNote = letter.toLowerCase()
  } else {
    abcNote = letter.toLowerCase()
    const apostrophes = octave - 5
    abcNote += "'".repeat(apostrophes)
  }

  return abcAccidental + abcNote
}

/**
 * OctaveChallengeGame - Identify the octave number of a note shown on staff
 * ⭐ Tier 1 Game for Module 1.2
 */
export const OctaveChallengeGame: React.FC<OctaveChallengeGameProps> = ({
  submoduleId,
  notes,
  questionCount = 5,
  timerSeconds,
  onComplete,
}) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const staffRef = useRef<HTMLDivElement>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [countdown, setCountdown] = useState(AUTO_ADVANCE_DELAY)
  const [timer, setTimer] = useState<number | null>(timerSeconds || null)

  // Generate questions from available notes
  const questions = useMemo(() => {
    const seed = submoduleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const shuffled = [...notes].sort((a, b) => {
      const hashA = (a.charCodeAt(0) * seed) % 100
      const hashB = (b.charCodeAt(0) * seed) % 100
      return hashA - hashB
    })
    const selected: string[] = []
    for (let i = 0; i < questionCount; i++) {
      selected.push(shuffled[i % shuffled.length])
    }
    return selected
  }, [notes, questionCount, submoduleId])

  const currentNote = questions[currentQuestion]
  const noteLetter = currentNote?.replace(/\d/, '')

  // Generate answer choices (same letter, different octaves)
  const answerChoices = useMemo(() => {
    if (!noteLetter) return []
    return getOctaveChoices(noteLetter)
  }, [noteLetter])

  // Timer countdown
  useEffect(() => {
    if (timer === null || showResult || isComplete) return
    if (timer <= 0) {
      // Time's up - count as wrong
      setShowResult(true)
      setStreak(0)
      setCountdown(AUTO_ADVANCE_DELAY)
      return
    }
    const interval = setInterval(() => {
      setTimer((prev) => (prev !== null ? prev - 1 : null))
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, showResult, isComplete])

  // Move to next question
  const hasCompletedRef = useRef(false)

  const handleNext = useCallback(() => {
    if (currentQuestion >= questionCount - 1) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true
        const finalScore = score
        const percentage = Math.round((finalScore / questionCount) * 100)
        setTimeout(() => {
          setSubmoduleScore(submoduleId, percentage)
          if (percentage >= 80) {
            addXP(20)
          }
        }, 0)
        setIsComplete(true)
        onComplete?.(finalScore, questionCount)
      }
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setCountdown(AUTO_ADVANCE_DELAY)
      setTimer(timerSeconds || null)
    }
  }, [
    currentQuestion,
    questionCount,
    score,
    submoduleId,
    setSubmoduleScore,
    addXP,
    onComplete,
    timerSeconds,
  ])

  // Auto-advance countdown
  useEffect(() => {
    if (!showResult) return
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [showResult])

  useEffect(() => {
    if (showResult && countdown === 0) {
      handleNext()
    }
  }, [countdown, showResult, handleNext])

  // Play the current note
  const handlePlayNote = useCallback(() => {
    if (!currentNote) return
    playNote(currentNote)
    setTimeout(() => releaseNote(currentNote), 500)
  }, [currentNote, playNote, releaseNote])

  // Render the current note on staff
  useEffect(() => {
    if (!staffRef.current || !currentNote) return
    const octave = parseInt(currentNote.match(/\d/)?.[0] || '4')
    const clef = octave < 4 ? 'bass' : 'treble'
    const abc = `X:1\nL:1\nK:C clef=${clef}\n${noteToAbc(currentNote)}|]`
    abcjs.renderAbc(staffRef.current, abc, {
      responsive: 'resize',
      staffwidth: 180,
      paddingtop: 10,
      paddingbottom: 10,
      paddingleft: 10,
      paddingright: 10,
      add_classes: true,
    })
  }, [currentNote])

  // Submit answer
  const submitAnswer = useCallback(
    (answer: string) => {
      if (showResult) return
      setSelectedAnswer(answer)
      const isCorrect = answer === currentNote
      if (isCorrect) {
        setScore((prev) => prev + 1)
        setStreak((prev) => prev + 1)
      } else {
        setStreak(0)
      }
      setShowResult(true)
      setCountdown(AUTO_ADVANCE_DELAY)
    },
    [showResult, currentNote]
  )

  // Calculate streak bonus
  const getStreakLabel = () => {
    if (streak >= 8) return { label: 'Unstoppable!', color: 'text-rose-400', emoji: '🔥🔥🔥' }
    if (streak >= 5) return { label: 'Hot Streak!', color: 'text-orange-400', emoji: '🔥🔥' }
    if (streak >= 3) return { label: 'On Fire!', color: 'text-amber-400', emoji: '🔥' }
    return null
  }

  if (isComplete) {
    const percentage = Math.round((score / questionCount) * 100)
    return (
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-amber-500 mb-3">
          {percentage >= 80 ? 'emoji_events' : percentage >= 60 ? 'thumb_up' : 'refresh'}
        </span>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Octave Challenge Complete!
        </h3>
        <p className="text-4xl font-bold mb-2">
          <span
            className={
              percentage >= 80
                ? 'text-emerald-500'
                : percentage >= 60
                  ? 'text-amber-500'
                  : 'text-rose-500'
            }
          >
            {percentage}%
          </span>
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
        </p>
      </div>
    )
  }

  const streakInfo = getStreakLabel()

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="text-sm font-bold text-[#30e8e8]">Octave Challenge</span>
        </div>
        <div className="flex items-center gap-4">
          {timer !== null && (
            <span
              className={`text-sm font-bold ${timer <= 3 ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`}
            >
              ⏱️ {timer}s
            </span>
          )}
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Q{currentQuestion + 1}/{questionCount}
          </span>
          <span className="text-sm font-bold text-emerald-500">Score: {score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#30e8e8] transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questionCount) * 100}%` }}
        />
      </div>

      {/* Streak indicator */}
      {streakInfo && (
        <div className={`text-center mb-3 ${streakInfo.color} font-bold animate-pulse`}>
          {streakInfo.emoji} {streakInfo.label} ({streak} in a row)
        </div>
      )}

      {/* Question */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
          Nốt này nằm ở quãng tám nào?
        </h3>
        <p className="text-xs text-slate-400 mb-3">What octave is this note?</p>

        {/* Staff display */}
        <div className="flex justify-center mb-4">
          <div
            ref={staffRef}
            className="bg-white dark:bg-slate-900 rounded-lg p-3 border-2 border-slate-200 dark:border-slate-700 min-h-[100px] min-w-[200px]"
          />
        </div>

        {/* Play button */}
        <button
          onClick={handlePlayNote}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors text-sm"
        >
          <span className="material-symbols-outlined text-base">play_arrow</span>
          Play Note
        </button>
      </div>

      {/* Answer choices */}
      <div className="mb-4">
        <p className="text-xs text-slate-400 text-center mb-3">Choose the correct octave</p>
        <div className="flex justify-center gap-3">
          {answerChoices.map((choice) => {
            const isSelected = selectedAnswer === choice
            const isCorrect = choice === currentNote
            const showCorrect = showResult && isCorrect
            const showWrong = showResult && isSelected && !isCorrect

            return (
              <button
                key={choice}
                onClick={() => submitAnswer(choice)}
                disabled={showResult}
                className={`py-3 px-6 rounded-xl font-bold text-lg transition-all border-2 min-w-[80px] ${
                  showCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 scale-110'
                    : showWrong
                      ? 'bg-rose-100 border-rose-500 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 animate-shake'
                      : isSelected
                        ? 'bg-[#30e8e8]/20 border-[#30e8e8] text-[#111818] dark:text-white'
                        : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-[#30e8e8] hover:scale-105'
                } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {choice}
              </button>
            )
          })}
        </div>
      </div>

      {/* Auto-advance countdown */}
      {showResult && (
        <div className="flex justify-center mb-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Next question in {countdown}s...
          </span>
        </div>
      )}

      {/* Feedback */}
      {showResult && (
        <div
          className={`p-4 rounded-xl text-center font-bold ${
            selectedAnswer === currentNote
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
          }`}
        >
          {selectedAnswer === currentNote ? (
            <>✓ Correct! This is {currentNote}</>
          ) : selectedAnswer ? (
            <>
              ✗ Wrong! This is {currentNote}, not {selectedAnswer}
            </>
          ) : (
            <>⏱️ Time's up! The answer was {currentNote}</>
          )}
        </div>
      )}
    </div>
  )
}

export default OctaveChallengeGame
