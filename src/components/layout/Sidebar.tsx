import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { COURSE_MODULES } from '../../data/course-data'
import { useProgressStore } from '../../stores/useProgressStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { ProgressRing } from '../ui/ProgressRing'
import { useGameStore } from '../../stores/useGameStore'
import { APP_STRINGS } from '../../constants/app-strings'

interface SidebarProps {
  className?: string
}

/**
 * Navigation items for the sidebar
 */
const NAV_ITEMS = [
  { icon: 'menu_book', label: 'Syllabus', path: '/' },
  { icon: 'piano', label: 'Practice', path: '/practice' },
  { icon: 'person', label: 'Profile', path: '/profile' },
]

/**
 * Redesigned Sidebar with Course Learning Path
 * Shows expandable modules with submodule navigation
 */
export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const { 
    currentModuleId, 
    currentSubmoduleId,
    setCurrentPosition,
    completedSubmodules,
    getModuleProgress,
    totalXP 
  } = useProgressStore()
  
  const startGame = useGameStore((state) => state.startGame)
  const stopGame = useGameStore((state) => state.stopGame)
  const isPlaying = useGameStore((state) => state.isPlaying)

  const { theme, toggleTheme } = useSettingsStore()

  // Track which modules are expanded
  const [expandedModules, setExpandedModules] = React.useState<number[]>([currentModuleId])

  // Calculate theme icon
  const getThemeIcon = () => {
    if (theme === 'system') return 'brightness_auto'
    return theme === 'dark' ? 'dark_mode' : 'light_mode'
  }

  const toggleModuleExpansion = (moduleId: number) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const handleSubmoduleClick = (moduleId: number, submoduleId: string) => {
    setCurrentPosition(moduleId, submoduleId)
    navigate(`/module/${moduleId}/${submoduleId}`)
  }

  const isSubmoduleActive = (submoduleId: string) => {
    return currentSubmoduleId === submoduleId && 
           location.pathname.includes(`/module/`)
  }

  const isSubmoduleCompleted = (submoduleId: string) => {
    return completedSubmodules.includes(submoduleId)
  }

  const isNavItemActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname.startsWith('/module/')
    }
    return location.pathname === path
  }

  return (
    <aside
      className={`
        w-[280px] flex-shrink-0 bg-white dark:bg-[#1a1d21]
        border-r border-slate-200 dark:border-slate-700
        flex flex-col h-full shadow-[2px_0_20px_rgba(0,0,0,0.02)] z-30
        ${className}
      `}
    >
      {/* Header */}
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#30e8e8] rounded-lg flex items-center justify-center text-[#111818]">
            <span className="material-symbols-outlined text-[20px]">music_note</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Music Theory Course
          </h1>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                ${isNavItemActive(item.path)
                  ? 'bg-[#30e8e8]/10 text-[#111818] dark:text-white'
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400'
                }
              `}
            >
              <span
                className="material-symbols-outlined"
                style={isNavItemActive(item.path) ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <p className={`text-sm ${isNavItemActive(item.path) ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Game Control Button */}
        <div className="mt-4">
          <button
            onClick={isPlaying ? stopGame : startGame}
            className={`
              w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-sm
              ${isPlaying 
                ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 border border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 dark:border-rose-800' 
                : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50 dark:border-emerald-800'
              }
            `}
          >
            <span className="material-symbols-outlined">
              {isPlaying ? 'stop_circle' : 'play_circle'}
            </span>
            {isPlaying ? APP_STRINGS.GAME.STOP : APP_STRINGS.GAME.START}
          </button>
        </div>
      </div>

      {/* Learning Path - Module List with Submodules */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-none">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
          Learning Path
        </p>

        <div className="space-y-2">
          {COURSE_MODULES.map((module) => {
            const isExpanded = expandedModules.includes(module.id)
            const moduleProgress = getModuleProgress(module.id)
            const isCurrentModule = module.id === currentModuleId
            
            return (
              <div
                key={module.id}
                className={`
                  rounded-xl border transition-all duration-200
                  ${isCurrentModule
                    ? 'border-[#30e8e8]/30 bg-[#30e8e8]/5 dark:bg-[#30e8e8]/10'
                    : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }
                `}
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModuleExpansion(module.id)}
                  className="w-full flex items-center justify-between gap-3 p-3"
                >
                  <div className="flex items-center gap-3">
                    <ProgressRing progress={moduleProgress} size={28}>
                      <span
                        className={`text-[9px] font-bold ${
                          isCurrentModule ? 'text-[#136363] dark:text-[#30e8e8]' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {module.id}
                      </span>
                    </ProgressRing>
                    <div className="text-left">
                      <span
                        className={`text-sm block ${
                          isCurrentModule ? 'font-bold text-[#136363] dark:text-[#30e8e8]' : 'font-medium text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {module.name}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        {module.subtitle}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`
                      material-symbols-outlined text-lg transition-transform
                      ${isExpanded ? 'rotate-180' : ''}
                      ${isCurrentModule ? 'text-[#136363] dark:text-[#30e8e8]' : 'text-slate-400'}
                    `}
                  >
                    expand_more
                  </span>
                </button>

                {/* Submodule List (Expandable) */}
                {isExpanded && (
                  <div className="px-3 pb-3 space-y-1">
                    {module.submodules.map((submodule) => {
                      const isActive = isSubmoduleActive(submodule.id)
                      const isCompleted = isSubmoduleCompleted(submodule.id)
                      
                      return (
                        <button
                          key={submodule.id}
                          onClick={() => handleSubmoduleClick(module.id, submodule.id)}
                          className={`
                            w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors
                            ${isActive
                              ? 'bg-[#30e8e8]/20 text-[#136363] dark:text-[#30e8e8]'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-300'
                            }
                          `}
                        >
                          {/* Status Icon */}
                          <span className={`
                            material-symbols-outlined text-[16px]
                            ${isCompleted 
                              ? 'text-emerald-500' 
                              : isActive 
                                ? 'text-[#30e8e8]' 
                                : 'text-slate-300 dark:text-slate-600'
                            }
                          `}
                            style={isCompleted ? { fontVariationSettings: "'FILL' 1" } : {}}
                          >
                            {isCompleted ? 'check_circle' : isActive ? 'radio_button_checked' : 'radio_button_unchecked'}
                          </span>
                          
                          {/* Submodule Title */}
                          <div className="flex-1 min-w-0">
                            <span className={`
                              text-xs block truncate
                              ${isActive ? 'font-semibold' : 'font-medium'}
                            `}>
                              {submodule.id} {submodule.title}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-500 text-[18px]">
              star
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
              {totalXP} XP
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button 
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => toggleTheme()}
              title={`Theme: ${theme}`}
            >
              <span className="material-symbols-outlined text-slate-400 text-[20px]">
                {getThemeIcon()}
              </span>
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">
                help
              </span>
            </button>
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#30e8e8] to-[#1f9d9d] rounded-full transition-all duration-300"
            style={{ width: `${Math.min((totalXP % 1000) / 10, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-1.5">
          {1000 - (totalXP % 1000)} XP to next level
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
