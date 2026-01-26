import React from 'react'
import { useSettingsStore } from '../../stores/useSettingsStore'

const SubmoduleProgressDots = React.lazy(() => import('../modules/SubmoduleProgressDots'))

interface SubmoduleHeaderProps {
  className?: string
  // Module info
  moduleId: number
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
        h-10 px-3 md:px-6 flex items-center justify-between
        bg-white/80 dark:bg-[#22252a]/80 backdrop-blur-md
        sticky top-0 z-20
        border-b border-slate-200 dark:border-slate-700 shadow-sm
        ${className}
      `}
    >
      {/* Left: Compact breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs font-medium min-w-0">
        <span className="material-symbols-outlined text-[16px] text-[#30e8e8]">folder</span>
        <span className="text-[#1f9d9d] dark:text-[#30e8e8] whitespace-nowrap">
          M{moduleId}
        </span>
        <span className="text-slate-300 dark:text-slate-600">›</span>
        <span className="text-slate-700 dark:text-slate-200 font-semibold whitespace-nowrap">
          {submoduleId}
        </span>

        {/* Progress Dots - hidden on mobile, show on tablet+ */}
        {totalSections > 1 && (
          <div className="hidden md:flex">
            <React.Suspense fallback={null}>
              <SubmoduleProgressDots
                totalSections={totalSections}
                visibleCount={isCompleted ? totalSections : visibleCount}
                currentSection={isCompleted ? totalSections - 1 : currentSection}
                onDotClick={onDotClick}
              />
            </React.Suspense>
          </div>
        )}
      </div>

      {/* Right: Compact controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Theme: ${theme}`}
        >
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[18px]">
            {theme === 'system' ? 'brightness_auto' : theme === 'dark' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>

        {/* VN Mode Toggle - icon button */}
        <button
          onClick={toggleNotationSystem}
          className={`
            w-7 h-7 rounded-lg transition-colors flex items-center justify-center text-[10px] font-bold
            ${
              notationSystem === 'solfege'
                ? 'bg-[#30e8e8] text-slate-900'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
            }
          `}
          title={notationSystem === 'solfege' ? 'Vietnamese notation' : 'Switch to VN'}
        >
          VN
        </button>
      </div>
    </header>
  )
}

export default SubmoduleHeader
