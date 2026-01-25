import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import abcjs from 'abcjs'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { comparePitch } from '../../data/module-12-games'

interface HighLowBattleGameProps {
  submoduleId: string
  notes: string[] // Notes with octaves (e.g., ['C3', 'C4', 'C5'])
  questionCount?: number
  timerSeconds?: number | null
  onComplete?: (score: number, total: number) => void
}

// Auto-advance delay in seconds
const AUTO_ADVANCE_DELAY = 2

type QuestionMode = 'binary' | 'sort'

interface Question {
  mode: QuestionMode
  notes: string[]
  askHigher: boolean // For binary mode: true = "which is HIGHER", false = "which is LOWER"
}

/**
 * Convert note format to ABC notation
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
 * HighLowBattleGame - Compare pitches and sort notes
 * ⭐⭐⭐ Tier 3 Game for Module 1.2
 */
export const HighLowBattleGame: React.FC<HighLowBattleGameProps> = ({
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

  const staffRef1 = useRef<HTMLDivElement | null>(null)
  const staffRef2 = useRef<HTMLDivElement | null>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [countdown, setCountdown] = useState(AUTO_ADVANCE_DELAY)
  const [timer, setTimer] = useState<number | null>(timerSeconds || null)

  // For sorting mode
  const [sortOrder, setSortOrder] = useState<string[]>([])
  const [draggedNote, setDraggedNote] = useState<string | null>(null)

  // Generate questions
  const questions = useMemo(() => {
    const seed = submoduleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const questionList: Question[] = []

    for (let i = 0; i < questionCount; i++) {
      // Mix of binary and sort questions (more binary early on, more sort later)
      const useSortMode = i >= Math.floor(questionCount * 0.6) && notes.length >= 3

      if (useSortMode) {
        // Sort 3-4 notes
        const numNotes = Math.min(3 + Math.floor(i / 5), 4, notes.length)
        const shuffled = [...notes].sort(() => ((seed * (i + 1)) % 17) / 17 - 0.5)
        const selectedNotes = shuffled.slice(0, numNotes)
        questionList.push({
          mode: 'sort',
          notes: selectedNotes,
          askHigher: true, // Not used for sort
        })
      } else {
        // Binary comparison
        const shuffled = [...notes].sort(() => ((seed * (i + 1)) % 13) / 13 - 0.5)
        const note1 = shuffled[0]
        const note2 = shuffled[1] || shuffled[0]
        const askHigher = (seed * i) % 2 === 0
        questionList.push({
          mode: 'binary',
          notes: [note1, note2],
          askHigher,
        })
      }
    }

    return questionList
  }, [notes, questionCount, submoduleId])

  const currentQ = questions[currentQuestion]
  const isSortMode = currentQ?.mode === 'sort'

  // Initialize sort order when entering sort question
  useEffect(() => {
    if (currentQ?.mode === 'sort') {
      // Scramble the correct order for the player to sort
      const scrambled = [...currentQ.notes].sort(() => Math.random() - 0.5)
      setSortOrder(scrambled)
    }
  }, [currentQuestion, currentQ])

  // Timer countdown
  useEffect(() => {
    if (timer === null || showResult || isComplete) return
    if (timer <= 0) {
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
            addXP(30)
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
      setSortOrder([])
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

  // Play note
  const handlePlayNote = useCallback(
    (note: string) => {
      playNote(note)
      setTimeout(() => releaseNote(note), 500)
    },
    [playNote, releaseNote]
  )

  // Render notes on staff for binary mode
  useEffect(() => {
    if (!currentQ || currentQ.mode !== 'binary') return

    const renderStaff = (ref: React.RefObject<HTMLDivElement | null>, note: string) => {
      if (!ref.current) return
      const octave = parseInt(note.match(/\d/)?.[0] || '4')
      const clef = octave < 4 ? 'bass' : 'treble'
      const abc = `X:1\nL:1\nK:C clef=${clef}\n${noteToAbc(note)}|]`
      abcjs.renderAbc(ref.current, abc, {
        responsive: 'resize',
        staffwidth: 120,
        paddingtop: 5,
        paddingbottom: 5,
        paddingleft: 5,
        paddingright: 5,
        add_classes: true,
      })
    }

    renderStaff(staffRef1, currentQ.notes[0])
    renderStaff(staffRef2, currentQ.notes[1])
  }, [currentQ])

  // Submit answer for binary mode
  const submitBinaryAnswer = useCallback(
    (chosenNote: string) => {
      if (showResult || !currentQ) return

      setSelectedAnswer(chosenNote)

      const [note1, note2] = currentQ.notes
      const comparison = comparePitch(note1, note2)
      let correctAnswer: string

      if (currentQ.askHigher) {
        correctAnswer = comparison >= 0 ? note1 : note2
      } else {
        correctAnswer = comparison <= 0 ? note1 : note2
      }

      if (chosenNote === correctAnswer) {
        setScore((prev) => prev + 1)
        setStreak((prev) => prev + 1)
      } else {
        setStreak(0)
      }

      setShowResult(true)
      setCountdown(AUTO_ADVANCE_DELAY)
    },
    [showResult, currentQ]
  )

  // Submit sort answer
  const submitSortAnswer = useCallback(() => {
    if (showResult || !currentQ) return

    // Check if sorted correctly (low to high)
    const correctOrder = [...currentQ.notes].sort((a, b) => comparePitch(a, b))
    const isCorrect = JSON.stringify(sortOrder) === JSON.stringify(correctOrder)

    if (isCorrect) {
      setScore((prev) => prev + 1)
      setStreak((prev) => prev + 1)
      setSelectedAnswer('correct')
    } else {
      setStreak(0)
      setSelectedAnswer('wrong')
    }

    setShowResult(true)
    setCountdown(AUTO_ADVANCE_DELAY)
  }, [showResult, currentQ, sortOrder])

  // Drag and drop handlers for sorting
  const handleDragStart = (note: string) => {
    setDraggedNote(note)
  }

  const handleDragOver = (e: React.DragEvent, targetNote: string) => {
    e.preventDefault()
    if (!draggedNote || draggedNote === targetNote) return

    const newOrder = [...sortOrder]
    const draggedIdx = newOrder.indexOf(draggedNote)
    const targetIdx = newOrder.indexOf(targetNote)

    newOrder.splice(draggedIdx, 1)
    newOrder.splice(targetIdx, 0, draggedNote)

    setSortOrder(newOrder)
  }

  const handleDragEnd = () => {
    setDraggedNote(null)
  }

  // Click to swap (simpler interaction)
  const [firstClickedNote, setFirstClickedNote] = useState<string | null>(null)

  const handleNoteClick = (note: string) => {
    if (showResult) return

    if (!firstClickedNote) {
      setFirstClickedNote(note)
    } else {
      // Swap the two notes
      const newOrder = [...sortOrder]
      const idx1 = newOrder.indexOf(firstClickedNote)
      const idx2 = newOrder.indexOf(note)
      newOrder[idx1] = note
      newOrder[idx2] = firstClickedNote
      setSortOrder(newOrder)
      setFirstClickedNote(null)
    }
  }

  // Streak label
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
          High/Low Battle Complete!
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
          {percentage >= 80
            ? 'Master of pitch!'
            : percentage >= 60
              ? 'Good job!'
              : 'Keep practicing!'}
        </p>
      </div>
    )
  }

  const streakInfo = getStreakLabel()
  const correctSortOrder = currentQ ? [...currentQ.notes].sort((a, b) => comparePitch(a, b)) : []

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚔️</span>
          <span className="text-sm font-bold text-[#30e8e8]">High/Low Battle</span>
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

      {/* Binary Mode */}
      {!isSortMode && currentQ && (
        <>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Nốt nào {currentQ.askHigher ? 'CAO' : 'THẤP'} hơn?
            </h3>
            <p className="text-xs text-slate-400">
              Which note is {currentQ.askHigher ? 'HIGHER' : 'LOWER'}?
            </p>
          </div>

          <div className="flex justify-center gap-8 mb-6">
            {[0, 1].map((idx) => {
              const note = currentQ.notes[idx]
              const isSelected = selectedAnswer === note
              const comparison = comparePitch(currentQ.notes[0], currentQ.notes[1])
              const correctAnswer = currentQ.askHigher
                ? comparison >= 0
                  ? currentQ.notes[0]
                  : currentQ.notes[1]
                : comparison <= 0
                  ? currentQ.notes[0]
                  : currentQ.notes[1]
              const isCorrect = note === correctAnswer
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <div
                  key={idx}
                  onClick={() => !showResult && submitBinaryAnswer(note)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    showCorrect
                      ? 'bg-emerald-100 border-emerald-500 dark:bg-emerald-900/30 scale-105'
                      : showWrong
                        ? 'bg-rose-100 border-rose-500 dark:bg-rose-900/30'
                        : isSelected
                          ? 'bg-[#30e8e8]/20 border-[#30e8e8]'
                          : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[#30e8e8] hover:scale-105'
                  } ${showResult ? 'cursor-default' : ''}`}
                >
                  <div
                    ref={idx === 0 ? staffRef1 : staffRef2}
                    className="min-h-[80px] min-w-[130px]"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayNote(note)
                    }}
                    className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500"
                  >
                    🔊 Nghe
                  </button>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{note}</span>
                </div>
              )
            })}
          </div>
        </>
      )}

      {/* Sort Mode */}
      {isSortMode && currentQ && (
        <>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
              Sắp xếp từ THẤP → CAO
            </h3>
            <p className="text-xs text-slate-400">
              Arrange notes from LOW to HIGH. Click two notes to swap.
            </p>
          </div>

          {/* Sorting area */}
          <div className="flex justify-center gap-2 mb-4">
            <div className="text-sm text-slate-400 self-center mr-2">THẤP</div>
            {sortOrder.map((note) => {
              const isFirstClicked = firstClickedNote === note
              const isInCorrectPosition =
                showResult && correctSortOrder.indexOf(note) === sortOrder.indexOf(note)

              return (
                <div
                  key={note}
                  draggable={!showResult}
                  onDragStart={() => handleDragStart(note)}
                  onDragOver={(e) => handleDragOver(e, note)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleNoteClick(note)}
                  className={`px-4 py-3 rounded-lg font-bold cursor-pointer transition-all border-2 ${
                    showResult
                      ? isInCorrectPosition
                        ? 'bg-emerald-100 border-emerald-500 dark:bg-emerald-900/30'
                        : 'bg-rose-100 border-rose-500 dark:bg-rose-900/30'
                      : isFirstClicked
                        ? 'bg-[#30e8e8]/30 border-[#30e8e8] scale-110'
                        : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:border-[#30e8e8]'
                  }`}
                >
                  <div className="text-center">
                    <span className="text-lg">{note}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handlePlayNote(note)
                    }}
                    className="text-xs mt-1 text-slate-400 hover:text-[#30e8e8]"
                  >
                    🔊
                  </button>
                </div>
              )
            })}
            <div className="text-sm text-slate-400 self-center ml-2">CAO</div>
          </div>

          {/* Submit button for sort mode */}
          {!showResult && (
            <div className="flex justify-center">
              <button
                onClick={submitSortAnswer}
                className="px-6 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors"
              >
                ✅ Submit Order
              </button>
            </div>
          )}

          {/* Show correct order on result */}
          {showResult && (
            <div className="text-center mb-2">
              <p className="text-sm text-slate-500">
                Correct order: {correctSortOrder.join(' → ')}
              </p>
            </div>
          )}
        </>
      )}

      {/* Auto-advance countdown */}
      {showResult && (
        <div className="flex justify-center my-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Next question in {countdown}s...
          </span>
        </div>
      )}

      {/* Feedback */}
      {showResult && (
        <div
          className={`p-4 rounded-xl text-center font-bold mt-4 ${
            (isSortMode && selectedAnswer === 'correct') ||
            (!isSortMode &&
              selectedAnswer ===
                (currentQ?.askHigher
                  ? comparePitch(currentQ.notes[0], currentQ.notes[1]) >= 0
                    ? currentQ.notes[0]
                    : currentQ.notes[1]
                  : comparePitch(currentQ.notes[0], currentQ.notes[1]) <= 0
                    ? currentQ.notes[0]
                    : currentQ.notes[1]))
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
          }`}
        >
          {isSortMode
            ? selectedAnswer === 'correct'
              ? '✓ Perfect sorting!'
              : '✗ Not quite right!'
            : selectedAnswer
              ? selectedAnswer ===
                (currentQ?.askHigher
                  ? comparePitch(currentQ!.notes[0], currentQ!.notes[1]) >= 0
                    ? currentQ!.notes[0]
                    : currentQ!.notes[1]
                  : comparePitch(currentQ!.notes[0], currentQ!.notes[1]) <= 0
                    ? currentQ!.notes[0]
                    : currentQ!.notes[1])
                ? `✓ Correct! ${selectedAnswer} is ${currentQ?.askHigher ? 'higher' : 'lower'}`
                : `✗ Wrong! The answer was ${
                    currentQ?.askHigher
                      ? comparePitch(currentQ!.notes[0], currentQ!.notes[1]) >= 0
                        ? currentQ!.notes[0]
                        : currentQ!.notes[1]
                      : comparePitch(currentQ!.notes[0], currentQ!.notes[1]) <= 0
                        ? currentQ!.notes[0]
                        : currentQ!.notes[1]
                  }`
              : "⏱️ Time's up!"}
        </div>
      )}
    </div>
  )
}

export default HighLowBattleGame
