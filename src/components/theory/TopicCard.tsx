import React from 'react'

interface TopicCardProps {
  number: number
  title: string
  description: string
  completed?: boolean
  active?: boolean
  onClick?: () => void
}

/**
 * Topic card for module lessons with step-by-step progression
 */
export const TopicCard: React.FC<TopicCardProps> = ({
  number,
  title,
  description,
  completed = false,
  active = false,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex items-start gap-4 p-4 w-full text-left rounded-xl
        border transition-all duration-200
        ${
          active
            ? 'bg-[#30e8e8]/10 border-[#30e8e8]/30 shadow-sm'
            : completed
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-[#30e8e8]/50'
        }
      `}
    >
      {/* Number badge */}
      <div
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
          ${
            completed
              ? 'bg-green-500 text-white'
              : active
                ? 'bg-[#30e8e8] text-[#111818]'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }
        `}
      >
        {completed ? <span className="material-symbols-outlined text-sm">check</span> : number}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4
          className={`
            text-sm font-bold
            ${active ? 'text-[#136363] dark:text-[#30e8e8]' : 'text-slate-700 dark:text-slate-200'}
          `}
        >
          {title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
          {description}
        </p>
      </div>

      {/* Arrow */}
      <span
        className={`
          material-symbols-outlined text-lg
          ${active ? 'text-[#30e8e8]' : 'text-slate-300 dark:text-slate-600'}
        `}
      >
        chevron_right
      </span>
    </button>
  )
}

export default TopicCard
