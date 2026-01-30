import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COURSE_MODULES } from '../../data/course-data'
import { useProgressStore } from '../../stores/useProgressStore'

interface ModuleNavigationMenuProps {
  currentModuleId: number
  currentSubmoduleId: string
  onClose: () => void
}

/**
 * ModuleNavigationMenu - Dropdown showing all modules and submodules
 * Triggered by clicking M1/M2/M3 badge in header
 */
export const ModuleNavigationMenu: React.FC<ModuleNavigationMenuProps> = ({
  currentModuleId,
  currentSubmoduleId,
  onClose,
}) => {
  const navigate = useNavigate()
  const [expandedModules, setExpandedModules] = useState<number[]>([currentModuleId])
  const completedSubmodules = useProgressStore((state) => state.completedSubmodules)

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    )
  }

  const handleNavigate = (moduleId: number, submoduleId: string) => {
    navigate(`/module/${moduleId}/${submoduleId}`)
    onClose()
  }

  return (
    <div
      className="absolute top-full left-0 mt-1 w-96 max-w-[90vw] max-h-[70vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {COURSE_MODULES.map((module) => {
        const isExpanded = expandedModules.includes(module.id)
        const moduleProgress = module.submodules.filter((s) =>
          completedSubmodules.includes(s.id)
        ).length
        const totalSubmodules = module.submodules.length
        const progressPercent = (moduleProgress / totalSubmodules) * 100

        return (
          <div
            key={module.id}
            className="border-b border-slate-200 dark:border-slate-700 last:border-0"
          >
            {/* Module Header - Clickable to expand/collapse */}
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Module Number Badge */}
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    {module.id}
                  </span>
                </div>

                {/* Module Info */}
                <div className="flex-1 text-left">
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {module.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {module.subtitle}
                  </div>
                </div>

                {/* Progress */}
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {moduleProgress}/{totalSubmodules}
                </div>
              </div>

              {/* Expand/Collapse Icon */}
              <span className="material-symbols-outlined text-slate-400 ml-2">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {/* Submodules List */}
            {isExpanded && (
              <div className="bg-slate-50 dark:bg-slate-900/50">
                {module.submodules.map((submodule) => {
                  const isCompleted = completedSubmodules.includes(submodule.id)
                  const isCurrent = submodule.id === currentSubmoduleId

                  return (
                    <button
                      key={submodule.id}
                      onClick={() => handleNavigate(module.id, submodule.id)}
                      className={`
                        w-full px-4 py-2.5 pl-16 flex items-center gap-3
                        hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors
                        ${isCurrent ? 'bg-[#30e8e8]/10 dark:bg-[#30e8e8]/10' : ''}
                      `}
                    >
                      {/* Radio/Check indicator */}
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0">
                        {isCurrent ? (
                          <div className="w-3 h-3 rounded-full bg-[#30e8e8]" />
                        ) : isCompleted ? (
                          <span className="material-symbols-outlined text-emerald-500 text-base">
                            check_circle
                          </span>
                        ) : (
                          <div className="border-slate-300 dark:border-slate-600" />
                        )}
                      </div>

                      {/* Submodule Title */}
                      <span
                        className={`
                          text-sm flex-1 text-left
                          ${isCurrent ? 'font-semibold text-[#30e8e8]' : 'text-slate-700 dark:text-slate-200'}
                        `}
                      >
                        {submodule.title}
                      </span>

                      {/* Completion checkmark */}
                      {isCompleted && !isCurrent && (
                        <span className="material-symbols-outlined text-emerald-500 text-base">
                          check
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            )}

            {/* Module Progress Bar */}
            {!isExpanded && progressPercent > 0 && (
              <div className="h-1 bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-[#30e8e8] to-[#26d4d4] transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ModuleNavigationMenu
