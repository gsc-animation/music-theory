import React from 'react'

export interface TheorySection {
  id: string
  title?: string
  content: string
  highlighted?: string[] // Keywords to highlight
}

interface LessonCardProps {
  lessonId: string
  title: string
  subtitle?: string
  sections: TheorySection[]
  className?: string
  children?: React.ReactNode // For additional content like quizzes, staff
}

/**
 * LessonCard - Mobile-optimized lesson content card
 * Displays theory content with highlighted keywords
 */
export const LessonCard: React.FC<LessonCardProps> = ({
  title,
  subtitle,
  sections,
  className = '',
  children,
}) => {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        mobile-square md:rounded-2xl md:shadow-lg
        md:border md:border-slate-200 md:dark:border-slate-700
        ${className}
      `}
    >
      {/* Card content */}
      <div className="px-4 md:px-8 py-6 md:py-8 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e40af] dark:text-[#60a5fa]">
            {title}
          </h2>
          {subtitle && <p className="text-base text-slate-600 dark:text-slate-400">{subtitle}</p>}
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <section key={section.id} className="space-y-3">
              {/* Section title (if present) */}
              {section.title && (
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  {index + 1}. {section.title}
                </h3>
              )}

              {/* Section content */}
              <div className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {section.highlighted && section.highlighted.length > 0 ? (
                  <HighlightedText text={section.content} highlights={section.highlighted} />
                ) : (
                  <p>{section.content}</p>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Additional content (staff, quizzes, etc.) */}
        {children && <div className="mt-8 space-y-6">{children}</div>}
      </div>
    </div>
  )
}

/**
 * HighlightedText - Renders text with highlighted keywords
 * Keywords are styled with cyan background
 */
interface HighlightedTextProps {
  text: string
  highlights: string[]
  onHighlightClick?: (keyword: string) => void
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  highlights,
  onHighlightClick,
}) => {
  if (!highlights || highlights.length === 0) {
    return <p>{text}</p>
  }

  // Create a regex pattern that matches any of the highlight keywords
  const pattern = highlights
    .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // Escape special regex chars
    .join('|')
  const regex = new RegExp(`(${pattern})`, 'gi')

  // Split text by highlights
  const parts = text.split(regex)

  return (
    <p>
      {parts.map((part, index) => {
        // Check if this part is a highlighted keyword
        const isHighlight = highlights.some((h) => h.toLowerCase() === part.toLowerCase())

        if (isHighlight) {
          return (
            <span
              key={index}
              onClick={() => onHighlightClick?.(part)}
              className={`
                bg-cyan-100 dark:bg-cyan-900/30
                text-cyan-700 dark:text-cyan-300
                font-semibold px-2 py-0.5 rounded
                ${onHighlightClick ? 'cursor-pointer hover:bg-cyan-200 dark:hover:bg-cyan-900/50' : ''}
              `}
            >
              {part}
            </span>
          )
        }

        return <span key={index}>{part}</span>
      })}
    </p>
  )
}

export default LessonCard
