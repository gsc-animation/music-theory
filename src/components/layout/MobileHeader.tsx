import React from 'react'
import { useProgressStore } from '../../stores/useProgressStore'
import { COURSE_MODULES } from '../../data/course-data'
import { useSettingsStore } from '../../stores/useSettingsStore'

interface MobileHeaderProps {
  onSettings?: () => void
  onProfile?: () => void
  className?: string
}

/**
 * MobileHeader - Mobile-optimized header with integrated progress
 * Displays course title, module progress, VN mode toggle, and action buttons
 */
export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onSettings,
  onProfile,
  className = '',
}) => {
  const { currentModuleId } = useProgressStore()
  const { vnMode, setVnMode } = useSettingsStore()

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
        bg-white dark:bg-slate-900
        border-b border-slate-200 dark:border-slate-700
        ${className}
      `}
    >
      {/* Top bar: Title and icons */}
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Course title */}
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Music Theory Course</h1>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Settings button */}
          <button
            onClick={onSettings}
            className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors touch-target-sm"
            aria-label="Settings"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-300 text-[24px]">
              settings
            </span>
          </button>

          {/* Profile button */}
          <button
            onClick={onProfile}
            className="w-10 h-10 rounded-full bg-[#30e8e8] flex items-center justify-center hover:bg-[#26d4d4] transition-colors touch-target-sm"
            aria-label="Profile"
          >
            <span className="material-symbols-outlined text-white text-[24px]">person</span>
          </button>
        </div>
      </div>

      {/* Progress section */}
      <div className="px-4 pb-3">
        {/* Module info and VN toggle */}
        <div className="flex items-center justify-between mb-2">
          {/* Module progress text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
              {currentModule.name} - {progressPercent}%
            </p>
          </div>

          {/* VN Mode toggle */}
          <button
            onClick={() => setVnMode(!vnMode)}
            className={`
              ml-3 px-4 py-1.5 rounded-full text-xs font-bold transition-all touch-target-sm
              ${
                vnMode
                  ? 'bg-[#30e8e8] text-slate-900'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }
            `}
            aria-label="Toggle Vietnamese mode"
            aria-pressed={vnMode}
          >
            VN MODE
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#30e8e8] to-[#26d4d4] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </header>
  )
}

export default MobileHeader
