import React from 'react'
import { useProgressStore } from '../../stores/useProgressStore'
import { COURSE_MODULES } from '../../data/course-data'

interface MobileHeaderProps {
  onSettings?: () => void
  onProfile?: () => void
  className?: string
}

/**
 * MobileHeader - Compact mobile-optimized header
 * Single-row layout with inline progress (38px total height)
 */
export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onSettings,
  onProfile,
  className = '',
}) => {
  const { currentModuleId } = useProgressStore()

  // Get current module info
  const currentModule = COURSE_MODULES.find((m) => m.id === currentModuleId) || COURSE_MODULES[0]

  // Calculate module progress
  const { completedSubmodules } = useProgressStore()
  const totalSubmodules = currentModule.submodules.length
  const completedInModule = currentModule.submodules.filter((s) =>
    completedSubmodules.includes(s.id)
  ).length
  const progressPercent = Math.round((completedInModule / totalSubmodules) * 100)

  return (
    <header
      className={`
        relative
        bg-white dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-700
        ${className}
      `}
    >
      {/* Single row: Title, Progress, Icons */}
      <div className="h-9 px-3 flex items-center gap-2">
        {/* Course title */}
        <h1 className="text-base font-bold text-slate-900 dark:text-white truncate">
          Music Theory
        </h1>

        {/* Separator */}
        <span className="text-slate-400 dark:text-slate-600 text-xs">•</span>

        {/* Module progress text */}
        <span className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
          {currentModule.name} - {progressPercent}%
        </span>

        {/* Spacer */}
        <div className="flex-1 min-w-2" />

        {/* Action buttons */}
        <div className="flex items-center gap-1.5">
          {/* Settings button */}
          <button
            onClick={onSettings}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-target-sm"
            aria-label="Settings"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-[20px]">
              settings
            </span>
          </button>

          {/* Profile button */}
          <button
            onClick={onProfile}
            className="w-8 h-8 rounded-full bg-[#30e8e8] flex items-center justify-center hover:bg-[#26d4d4] transition-colors touch-target-sm"
            aria-label="Profile"
          >
            <span className="material-symbols-outlined text-white text-[20px]">person</span>
          </button>
        </div>
      </div>

      {/* Thin progress bar overlay */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-[#30e8e8] to-[#26d4d4] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Module progress: ${progressPercent}%`}
        />
      </div>
    </header>
  )
}

export default MobileHeader
