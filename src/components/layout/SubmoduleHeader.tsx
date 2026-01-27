import React, { useState, useRef, useEffect } from 'react'
import { ModuleNavigationMenu } from '../navigation/ModuleNavigationMenu'

interface SubmoduleHeaderProps {
  className?: string
  // Module info
  moduleId: number
  // Submodule ID for menu state
  submoduleId: string
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
  submoduleId,
  shortName,
  totalSections,
  currentSection,
}) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

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
      {/* Left: Clickable breadcrumb - entire section opens menu */}
      <div ref={menuRef} className="relative flex items-center gap-1.5 text-xs font-medium min-w-0">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-1.5 hover:bg-[#30e8e8]/10 dark:hover:bg-[#30e8e8]/10 px-2 py-1 -mx-2 rounded transition-colors min-w-0"
          title="Open module navigation"
        >
          <span className="material-symbols-outlined text-[16px] text-[#30e8e8] flex-shrink-0">
            folder
          </span>
          <span className="text-[#1f9d9d] dark:text-[#30e8e8] whitespace-nowrap">M{moduleId}</span>
          <span className="text-slate-300 dark:text-slate-600">›</span>
          <span className="text-slate-700 dark:text-slate-200 font-semibold truncate">
            {shortName}
          </span>
        </button>

        {/* Module Navigation Menu */}
        {showMenu && (
          <ModuleNavigationMenu
            currentModuleId={moduleId}
            currentSubmoduleId={submoduleId}
            onClose={() => setShowMenu(false)}
          />
        )}
      </div>

      {/* Thin section progress bar - constrained to header width */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#30e8e8] to-[#26d4d4] transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, sectionProgress)}%` }}
          role="progressbar"
          aria-valuenow={Math.round(Math.min(100, sectionProgress))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Section progress: ${currentSection} of ${totalSections}`}
        />
      </div>
    </header>
  )
}

export default SubmoduleHeader
