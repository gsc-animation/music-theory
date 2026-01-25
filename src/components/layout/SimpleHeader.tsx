import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { COURSE_MODULES } from '../../data/course-data'

interface SimpleHeaderProps {
  className?: string
  title?: string
  showJourneyProgress?: boolean
}

/**
 * SimpleHeader - Header with global controls (Dark Mode & VN Mode)
 * Optionally shows journey progress for ProfilePage
 */
export const SimpleHeader: React.FC<SimpleHeaderProps> = ({ className, showJourneyProgress = false }) => {
  const navigate = useNavigate()
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const toggleNotationSystem = useSettingsStore((state) => state.toggleNotationSystem)
  const theme = useSettingsStore((state) => state.theme)
  const toggleTheme = useSettingsStore((state) => state.toggleTheme)
  
  const { completedSubmodules } = useProgressStore()

  // Calculate overall progress
  const totalSubmodules = COURSE_MODULES.reduce((acc, m) => acc + m.submodules.length, 0)
  const completedCount = completedSubmodules.length
  const progressPercent = Math.round((completedCount / totalSubmodules) * 100)

  // Find next adventure
  const allSubmodules = COURSE_MODULES.flatMap((m, mi) => 
    m.submodules.map((s, si) => ({ ...s, moduleId: m.id, moduleIndex: mi, subIndex: si }))
  )
  const nextAdventure = allSubmodules.find((s, idx) => {
    if (completedSubmodules.includes(s.id)) return false
    if (idx === 0) return true
    return completedSubmodules.includes(allSubmodules[idx - 1].id)
  })

  return (
    <header
      className={`
        px-4 md:px-8 py-3 flex items-center justify-between gap-4
        bg-gradient-to-r from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        sticky top-0 z-20
        border-b border-slate-200 dark:border-slate-700/50 shadow-lg
        ${className}
      `}
    >
      {/* Left - Journey Progress (when enabled) or empty */}
      {showJourneyProgress ? (
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30 flex-shrink-0">
            <span className="material-symbols-outlined text-white text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              route
            </span>
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight truncate">
              Hành Trình Học Nhạc Lý
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {completedCount}/{totalSubmodules} bài học • {progressPercent}% hoàn thành
              </p>
              {/* Inline Progress Bar */}
              <div className="hidden sm:block w-20 h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Next Lesson CTA */}
          {nextAdventure && (
            <button
              onClick={() => navigate(`/module/${nextAdventure.moduleId}/${nextAdventure.id}`)}
              className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all text-xs flex-shrink-0 ml-auto"
            >
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
              <span className="hidden sm:inline">Tiếp tục học</span>
            </button>
          )}
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Right - Dark Mode & VN Mode */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
          title={`Theme: ${theme}`}
        >
          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-[20px]">
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
          <div className="relative w-9 h-5 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#30e8e8] shadow-inner" />
          <span className="ms-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
            VN Mode
          </span>
        </label>
      </div>
    </header>
  )
}

export default SimpleHeader
