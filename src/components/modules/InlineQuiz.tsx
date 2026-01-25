import React, { useState } from 'react'
import './InlineQuiz.css'

interface InlineQuizProps {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
  onComplete?: () => void // Called when quiz answered (correct or wrong)
}

/**
 * InlineQuiz - Một component quiz đơn giản không tính điểm
 * Dùng để củng cố kiến thức ngay sau mỗi phần nội dung
 */
export const InlineQuiz: React.FC<InlineQuizProps> = ({
  question,
  options,
  correctIndex,
  explanation,
  onComplete,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedIndex(index)
    setShowResult(true)

    // Call onComplete after delay to allow feedback display
    if (onComplete) {
      setTimeout(onComplete, 1200)
    }
  }

  const handleRetry = () => {
    setSelectedIndex(null)
    setShowResult(false)
  }

  const isCorrect = selectedIndex === correctIndex

  return (
    <div
      data-testid="inline-quiz"
      className={`inline-quiz ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
    >
      <p className="quiz-question">{question}</p>

      <div className="quiz-options">
        {options.map((option, index) => {
          let optionClass = 'quiz-option'

          if (showResult) {
            if (index === correctIndex) {
              optionClass += ' correct'
            } else if (index === selectedIndex) {
              optionClass += ' incorrect shake'
            }
          }

          return (
            <button
              key={index}
              data-testid={`quiz-option-${index}`}
              className={optionClass}
              onClick={() => handleSelect(index)}
              disabled={showResult}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {showResult && index === correctIndex && <span className="option-icon">✓</span>}
              {showResult && index === selectedIndex && index !== correctIndex && (
                <span className="option-icon">✗</span>
              )}
            </button>
          )
        })}
      </div>

      {showResult && (
        <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          <div className="feedback-header">
            {isCorrect ? (
              <>
                <span className="feedback-icon">✓</span>
                <span>Chính xác!</span>
              </>
            ) : (
              <>
                <span className="feedback-icon">💡</span>
                <span>Xem giải thích</span>
              </>
            )}
          </div>

          {explanation && <p className="quiz-explanation">{explanation}</p>}

          <button className="retry-button" onClick={handleRetry}>
            ↻ Thử lại
          </button>
        </div>
      )}
    </div>
  )
}

export default InlineQuiz
