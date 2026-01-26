import React from 'react'

interface LessonHeaderProps {
  lessonNumber: string // e.g., "1.2"
  lessonTitle: string // e.g., "Tên nốt & Cao độ"
  className?: string
}

/**
 * LessonHeader - Displays lesson breadcrumb with folder icon
 * Matches the design mockup format
 */
export const LessonHeader: React.FC<LessonHeaderProps> = ({
  lessonNumber,
  lessonTitle,
  className = '',
}) => {
  return (
    <div
      className={`
        flex items-center gap-2 px-4 py-3
        bg-slate-50 dark:bg-slate-800/50
        border-b border-slate-200 dark:border-slate-700
        ${className}
      `}
    >
      {/* Folder icon */}
      <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
        folder
      </span>

      {/* Lesson info */}
      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
        Lesson {lessonNumber}: {lessonTitle}
      </span>
    </div>
  )
}

export default LessonHeader
