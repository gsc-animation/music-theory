import React, { useState, useCallback, useMemo } from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'

interface NoteOption {
  note: string
  label: string
}

interface NoteIdentificationQuizProps {
  /** Submodule ID for scoring */
  submoduleId: string
  /** Notes to quiz on (e.g., ['C4', 'D4', 'E4', 'F4', 'G4']) */
  notes: string[]
  /** Number of questions in the quiz */
  questionCount?: number
  /** Callback when quiz completes */
  onComplete?: (score: number, total: number) => void
}

// Note name to solfège mapping
const NOTE_OPTIONS: NoteOption[] = [
  { note: 'C', label: 'C (Do)' },
  { note: 'D', label: 'D (Re)' },
  { note: 'E', label: 'E (Mi)' },
  { note: 'F', label: 'F (Fa)' },
  { note: 'G', label: 'G (Sol)' },
  { note: 'A', label: 'A (La)' },
  { note: 'B', label: 'B (Si)' },
]

/**
 * NoteIdentificationQuiz - Interactive quiz to identify notes by ear
 * Plays a note and asks the user to identify it
 */
export const NoteIdentificationQuiz: React.FC<NoteIdentificationQuizProps> = ({
  submoduleId,
  notes,
  questionCount = 5,
  onComplete,
}) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Generate random questions from available notes
  const questions = useMemo(() => {
    const shuffled = [...notes].sort(() => Math.random() - 0.5)
    const selected: string[] = []
    for (let i = 0; i < questionCount; i++) {
      selected.push(shuffled[i % shuffled.length])
    }
    return selected
  }, [notes, questionCount])

  const currentNote = questions[currentQuestion]

  // Play the current note
  const handlePlayNote = useCallback(() => {
    if (!currentNote) return
    playNote(currentNote)
    setTimeout(() => releaseNote(currentNote), 500)
  }, [currentNote, playNote, releaseNote])

  // Handle answer selection
  const handleSelectAnswer = (noteName: string) => {
    if (showResult) return
    setSelectedAnswer(noteName)
  }

  // Submit answer
  const handleSubmit = () => {
    if (!selectedAnswer || showResult) return

    const correctNote = currentNote.replace(/\d/, '') // Remove octave
    const isCorrect = selectedAnswer === correctNote

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }

    setShowResult(true)
  }

  // Move to next question
  const handleNext = () => {
    if (currentQuestion >= questionCount - 1) {
      // Quiz complete
      const finalScore = score
      const percentage = Math.round((finalScore / questionCount) * 100)
      
      // Save score and award XP
      setSubmoduleScore(submoduleId, percentage)
      if (percentage >= 80) {
        addXP(20) // Bonus XP for good score
      }
      
      setIsComplete(true)
      onComplete?.(finalScore, questionCount)
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsComplete(false)
  }

  // Get correct answer for display
  const correctAnswer = currentNote?.replace(/\d/, '')

  if (isComplete) {
    const percentage = Math.round((score / questionCount) * 100)
    return (
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-amber-500 mb-3">
          {percentage >= 80 ? 'emoji_events' : percentage >= 60 ? 'thumb_up' : 'refresh'}
        </span>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
          Quiz Complete!
        </h3>
        <p className="text-3xl font-bold mb-2">
          <span className={percentage >= 80 ? 'text-emerald-500' : percentage >= 60 ? 'text-amber-500' : 'text-rose-500'}>
            {score}/{questionCount}
          </span>
        </p>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          {percentage >= 80
            ? 'Excellent! You really know your notes!'
            : percentage >= 60
              ? 'Good job! Keep practicing!'
              : 'Keep practicing, you\'ll get it!'}
        </p>
        <button
          onClick={handleRestart}
          className="px-6 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Question {currentQuestion + 1} of {questionCount}
        </span>
        <span className="text-sm font-bold text-emerald-500">
          Score: {score}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-[#30e8e8] transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questionCount) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
          What note is this?
        </h3>
        <button
          onClick={handlePlayNote}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#30e8e8] text-[#111818] rounded-xl font-bold hover:bg-[#26d4d4] transition-colors"
        >
          <span className="material-symbols-outlined">play_arrow</span>
          Play Note
        </button>
      </div>

      {/* Answer options */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {NOTE_OPTIONS.filter((opt) =>
          notes.some((n) => n.startsWith(opt.note))
        ).map((option) => {
          const isSelected = selectedAnswer === option.note
          const isCorrect = option.note === correctAnswer
          const showCorrect = showResult && isCorrect
          const showWrong = showResult && isSelected && !isCorrect

          return (
            <button
              key={option.note}
              onClick={() => handleSelectAnswer(option.note)}
              disabled={showResult}
              className={`
                py-3 px-4 rounded-lg font-bold transition-all border-2
                ${showCorrect
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : showWrong
                    ? 'bg-rose-100 border-rose-500 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                    : isSelected
                      ? 'bg-[#30e8e8]/20 border-[#30e8e8] text-[#111818] dark:text-white'
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-[#30e8e8]'
                }
                ${showResult ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3">
        {!showResult ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`
              px-6 py-2 rounded-lg font-bold transition-colors
              ${selectedAnswer
                ? 'bg-[#30e8e8] text-[#111818] hover:bg-[#26d4d4]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700'
              }
            `}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors"
          >
            {currentQuestion >= questionCount - 1 ? 'See Results' : 'Next Question'}
          </button>
        )}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className={`mt-4 p-3 rounded-lg text-center ${
          selectedAnswer === correctAnswer
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
            : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
        }`}>
          {selectedAnswer === correctAnswer
            ? '✓ Correct!'
            : `✗ The correct answer was ${correctAnswer}`}
        </div>
      )}
    </div>
  )
}

export default NoteIdentificationQuiz
