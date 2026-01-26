import React, { useState } from 'react'

interface MobileQuizOption {
  id: string
  label: string
  text: string
}

interface MobileQuizProps {
  question: string
  options: MobileQuizOption[]
  correctAnswer: string
  onAnswer?: (selectedId: string, isCorrect: boolean) => void
  className?: string
}

/**
 * MobileQuiz - Touch-friendly quiz component for mobile
 * Large buttons with full-width layout
 */
export const MobileQuiz: React.FC<MobileQuizProps> = ({
  question,
  options,
  correctAnswer,
  onAnswer,
  className = '',
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleOptionClick = (optionId: string) => {
    setSelectedId(optionId)
    const isCorrect = optionId === correctAnswer
    setShowFeedback(true)

    if (onAnswer) {
      onAnswer(optionId, isCorrect)
    }

    // Auto-hide feedback after 2 seconds
    setTimeout(() => {
      setShowFeedback(false)
    }, 2000)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Question */}
      <p className="text-base font-medium text-slate-800 dark:text-slate-100">{question}</p>

      {/* Options */}
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          const isCorrect = option.id === correctAnswer
          const showCorrect = showFeedback && isCorrect
          const showWrong = showFeedback && isSelected && !isCorrect

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={showFeedback}
              className={`
                w-full min-h-[56px] px-4 py-3
                rounded-xl border-2 
                text-left font-medium text-base
                transition-all duration-200
                touch-target
                ${
                  showCorrect
                    ? 'bg-emerald-500 border-emerald-500 text-white'
                    : showWrong
                      ? 'bg-rose-500 border-rose-500 text-white'
                      : isSelected
                        ? 'bg-[#1e40af] border-[#1e40af] text-white'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-[#1e40af] dark:hover:border-[#60a5fa]'
                }
                ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer active:scale-98'}
              `}
            >
              <span className="flex items-center gap-3">
                {/* Option label (A, B, C) */}
                <span
                  className={`
                  w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                  ${
                    showCorrect || showWrong || isSelected
                      ? 'bg-white/20'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }
                `}
                >
                  {option.label}
                </span>

                {/* Option text */}
                <span>{option.text}</span>

                {/* Feedback icon */}
                {showCorrect && (
                  <span className="material-symbols-outlined ml-auto text-white">check_circle</span>
                )}
                {showWrong && (
                  <span className="material-symbols-outlined ml-auto text-white">cancel</span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileQuiz
