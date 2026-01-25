import React from 'react'
import { useSettingsStore } from '../../stores/useSettingsStore'

const SubmoduleProgressDots = React.lazy(() => import('../modules/SubmoduleProgressDots'))

interface SubmoduleHeaderProps {
  className?: string
  // Module info
  moduleId: number
  moduleName: string
  // Submodule info
  submoduleId: string
  isCompleted: boolean
  // Progress dots
  totalSections: number
  visibleCount: number
  currentSection: number
  onDotClick?: (sectionIndex: number) => void
}

/**
 * SubmoduleHeader - Compact single-line header with breadcrumb and progress dots
 * Title and description are in the content container
 */
export const SubmoduleHeader: React.FC<SubmoduleHeaderProps> = ({
  className,
  moduleId,
  moduleName,
  submoduleId,
  isCompleted,
  totalSections,
  visibleCount,
  currentSection,
  onDotClick,
}) => {
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const toggleNotationSystem = useSettingsStore((state) => state.toggleNotationSystem)
  const theme = useSettingsStore((state) => state.theme)
  const toggleTheme = useSettingsStore((state) => state.toggleTheme)

  return (
    <header
      className={`
        h-[48px] px-4 md:px-6 flex items-center justify-between
        bg-white/80 dark:bg-[#22252a]/80 backdrop-blur-md
        sticky top-0 z-20
        border-b border-slate-200 dark:border-slate-700 shadow-sm
        ${className}
      `}
    >
      {/* Left: Breadcrumb with progress dots */}
      <div className="flex items-center gap-2 text-sm font-medium min-w-0">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#30e8e8]/10 text-[#1f9d9d] dark:bg-[#30e8e8]/20 dark:text-[#30e8e8] whitespace-nowrap text-xs">
          <span className="material-symbols-outlined text-xs">folder</span>
          Module {moduleId}: {moduleName}
        </span>
        <span className="text-slate-300 dark:text-slate-600">›</span>
        <span className="text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap text-xs">
          Lesson {submoduleId}
        </span>

        {/* Progress Dots - show all unlocked if submodule is completed */}
        {totalSections > 1 && (
          <React.Suspense fallback={null}>
            <SubmoduleProgressDots
              totalSections={totalSections}
              visibleCount={isCompleted ? totalSections : visibleCount}
              currentSection={isCompleted ? totalSections - 1 : currentSection}
              onDotClick={onDotClick}
            />
          </React.Suspense>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Theme: ${theme}`}
        >
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
            {theme === 'system' ? 'brightness_auto' : theme === 'dark' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* VN Mode Toggle */}
        <label className="inline-flex items-center cursor-pointer group">
          <input
            className="sr-only peer"
            type="checkbox"
            checked={notationSystem === 'solfege'}
            onChange={toggleNotationSystem}
          />
          <div className="relative w-8 h-4 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-[#30e8e8] shadow-inner" />
          <span className="ms-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-[#136363] transition-colors">
            VN
          </span>
        </label>
      </div>
    </header>
  )
}

export default SubmoduleHeader
