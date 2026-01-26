import React from 'react'
import { useSettingsStore } from '../../stores/useSettingsStore'

interface SubmoduleHeaderProps {
  className?: string
  // Module info
  moduleId: number
  // Submodule info - SHORT NAME instead of ID
  shortName: string
  // Section progress (for progress bar)
  totalSections: number
  currentSection: number
}

/**
 * SubmoduleHeader - Compact single-line header with breadcrumb and section progress bar
 * Shows: M1 › Staff & Clefs [theme][VN]
 * Progress bar shows reading progress through sections
 */
export const SubmoduleHeader: React.FC<SubmoduleHeaderProps> = ({
  className,
  moduleId,
  shortName,
  totalSections,
  currentSection,
}) => {
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const toggleNotationSystem = useSettingsStore((state) => state.toggleNotationSystem)
  const theme = useSettingsStore((state) => state.theme)
  const toggleTheme = useSettingsStore((state) => state.toggleTheme)

  // Calculate section progress percentage
  const sectionProgress = totalSections > 0 ? (currentSection / totalSections) * 100 : 0

  return (
    <header
      className={`
        relative h-10 px-3 md:px-6 flex items-center justify-between
        bg-white/80 dark:bg-[#22252a]/80 backdrop-blur-md
        sticky top-0 z-20
        border-b border-slate-200 dark:border-slate-700 shadow-sm
        ${className || ''}
      `}
    >
      {/* Left: Compact breadcrumb with short name */}
      <div className="flex items-center gap-1.5 text-xs font-medium min-w-0">
        <span className="material-symbols-outlined text-[16px] text-[#30e8e8]">folder</span>
        <span className="text-[#1f9d9d] dark:text-[#30e8e8] whitespace-nowrap">M{moduleId}</span>
        <span className="text-slate-300 dark:text-slate-600">›</span>
        <span className="text-slate-700 dark:text-slate-200 font-semibold truncate">
          {shortName}
        </span>
      </div>

      {/* Right: Compact controls */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-7 h-7 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={`Theme: ${theme}`}
          aria-label="Toggle theme"
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
          aria-label="Toggle notation system"
        >
          VN
        </button>
      </div>

      {/* Thin section progress bar */}
      <div className="absolute bottom-0 inset-x-0 h-0.5 bg-slate-200 dark:bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-[#30e8e8] to-[#26d4d4] transition-all duration-500 ease-out"
          style={{ width: `${sectionProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(sectionProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Section progress: ${currentSection} of ${totalSections}`}
        />
      </div>
    </header>
  )
}

export default SubmoduleHeader
