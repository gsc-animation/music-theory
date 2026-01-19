import React from 'react'
import { useModuleStore } from '../../stores/useModuleStore'
import { ProgressRing } from '../ui/ProgressRing'

interface SidebarProps {
  className?: string
}

/**
 * Navigation items for the sidebar
 */
const NAV_ITEMS = [
  { icon: 'menu_book', label: 'Syllabus', active: true },
  { icon: 'piano', label: 'Practice', active: false },
  { icon: 'person', label: 'Profile', active: false },
]

/**
 * Redesigned Sidebar with Learning Path
 * Based on HTML example with 5-module structure
 */
export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const modules = useModuleStore((state) => state.modules)
  const currentModuleId = useModuleStore((state) => state.currentModuleId)
  const setCurrentModule = useModuleStore((state) => state.setCurrentModule)
  const totalXP = useModuleStore((state) => state.totalXP)

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
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#30e8e8] rounded-lg flex items-center justify-center text-[#111818]">
            <span className="material-symbols-outlined text-[20px]">music_note</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            Music Studio
          </h1>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors
                ${item.active
                  ? 'bg-[#30e8e8]/10 text-[#111818] dark:text-white'
                  : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-400'
                }
              `}
            >
              <span
                className="material-symbols-outlined"
                style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.icon}
              </span>
              <p className={`text-sm ${item.active ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="flex-1 overflow-y-auto px-6 py-2 scrollbar-none">
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Learning Path
          </p>

          {modules.map((module) => {
            const isActive = module.id === currentModuleId
            const isLocked = module.locked

            return (
              <details
                key={module.id}
                className={`
                  group rounded-xl border transition-all duration-200
                  ${isActive
                    ? 'border-[#30e8e8]/30 bg-[#30e8e8]/5 dark:bg-[#30e8e8]/10 open:shadow-sm'
                    : 'border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 open:shadow-sm'
                  }
                  ${isLocked ? 'opacity-60' : ''}
                `}
                open={isActive}
              >
                <summary
                  className="flex cursor-pointer items-center justify-between gap-3 p-3 list-none"
                  onClick={(e) => {
                    if (!isLocked) {
                      e.preventDefault()
                      setCurrentModule(module.id)
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <ProgressRing progress={module.progress} size={28}>
                      <span
                        className={`text-[9px] font-bold ${
                          isActive ? 'text-[#136363] dark:text-[#30e8e8]' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isLocked ? (
                          <span className="material-symbols-outlined text-[12px]">lock</span>
                        ) : (
                          module.id
                        )}
                      </span>
                    </ProgressRing>
                    <span
                      className={`text-sm ${
                        isActive ? 'font-bold text-[#136363] dark:text-[#30e8e8]' : 'font-medium'
                      }`}
                    >
                      {module.name}
                    </span>
                  </div>
                  <span
                    className={`
                      material-symbols-outlined text-lg transition-transform
                      group-open:rotate-180
                      ${isActive ? 'text-[#136363] dark:text-[#30e8e8]' : 'text-slate-400'}
                    `}
                  >
                    expand_more
                  </span>
                </summary>
                <div className="px-3 pb-3 pt-0 pl-[48px]">
                  <span className="text-[10px] font-medium text-slate-500">
                    {module.subtitle}
                  </span>
                </div>
              </details>
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
            <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">
                settings
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
