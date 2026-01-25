import React from 'react'
import { useNavigate } from 'react-router-dom'
import { COURSE_MODULES } from '../../data/course-data'
import { useProgressStore } from '../../stores/useProgressStore'

interface JourneyMapProps {
  className?: string
}

// Module themes for the adventure map
const MODULE_THEMES: Record<number, { icon: string; color: string; gradient: string; label: string }> = {
  1: { icon: 'castle', color: '#30e8e8', gradient: 'from-cyan-500 to-teal-600', label: 'Khởi Đầu' },
  2: { icon: 'sailing', color: '#f59e0b', gradient: 'from-amber-500 to-orange-600', label: 'Khám Phá' },
  3: { icon: 'landscape', color: '#10b981', gradient: 'from-emerald-500 to-green-600', label: 'Chinh Phục' },
  4: { icon: 'temple_hindu', color: '#8b5cf6', gradient: 'from-violet-500 to-purple-600', label: 'Nâng Cao' },
  5: { icon: 'auto_awesome', color: '#ec4899', gradient: 'from-pink-500 to-rose-600', label: 'Thành Thạo' },
}

/**
 * JourneyMap - Vertical snake-path adventure map visualization
 * Displays modules as milestones with submodules as checkpoints along the path
 */
export const JourneyMap: React.FC<JourneyMapProps> = ({ className = '' }) => {
  const navigate = useNavigate()
  const { completedSubmodules, currentSubmoduleId } = useProgressStore()

  const isCompleted = (submoduleId: string) => completedSubmodules.includes(submoduleId)
  const isCurrent = (submoduleId: string) => currentSubmoduleId === submoduleId
  
  const isUnlocked = (submoduleId: string, moduleIndex: number, subIndex: number) => {
    // First submodule of first module is always unlocked
    if (moduleIndex === 0 && subIndex === 0) return true
    
    // Check if previous submodule is completed
    const allSubmodules = COURSE_MODULES.flatMap(m => m.submodules)
    const currentIdx = allSubmodules.findIndex(s => s.id === submoduleId)
    if (currentIdx <= 0) return true
    
    return completedSubmodules.includes(allSubmodules[currentIdx - 1].id)
  }

  const handleSubmoduleClick = (moduleId: number, submoduleId: string, unlocked: boolean) => {
    if (unlocked) {
      navigate(`/module/${moduleId}/${submoduleId}`)
    }
  }

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
    <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-4 md:p-6 shadow-2xl border border-slate-700/50 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
            <span className="material-symbols-outlined text-white text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              route
            </span>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Hành Trình Học Nhạc Lý
            </h2>
            <p className="text-xs md:text-sm text-slate-400">
              {completedCount}/{totalSubmodules} bài học • {progressPercent}% hoàn thành
            </p>
          </div>
        </div>
        
        {/* Next Lesson CTA */}
        {nextAdventure && (
          <button
            onClick={() => navigate(`/module/${nextAdventure.moduleId}/${nextAdventure.id}`)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            Tiếp tục học
          </button>
        )}
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 rounded-full transition-all duration-700"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Vertical Journey Path */}
      <div className="space-y-4">
        {COURSE_MODULES.map((module, moduleIndex) => {
          const theme = MODULE_THEMES[module.id] || MODULE_THEMES[1]
          const moduleCompleted = module.submodules.every(s => completedSubmodules.includes(s.id))
          const moduleStarted = module.submodules.some(s => completedSubmodules.includes(s.id))
          const isLastModule = moduleIndex === COURSE_MODULES.length - 1
          
          return (
            <div key={module.id} className="relative">
              {/* Module Header - Milestone */}
              <div className={`
                relative flex items-center gap-3 p-3 rounded-xl border-2 transition-all
                ${moduleCompleted 
                  ? 'bg-emerald-900/30 border-emerald-500/50' 
                  : moduleStarted 
                    ? 'bg-slate-800/60 border-cyan-500/40' 
                    : 'bg-slate-800/30 border-slate-600/30'
                }
              `}>
                {/* Module Icon */}
                <div 
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0
                    ${moduleCompleted 
                      ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' 
                      : `bg-gradient-to-br ${theme.gradient}`
                    }
                  `}
                  style={{ boxShadow: `0 4px 20px ${moduleCompleted ? '#10b98140' : theme.color + '40'}` }}
                >
                  <span 
                    className="material-symbols-outlined text-white text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {moduleCompleted ? 'emoji_events' : theme.icon}
                  </span>
                </div>

                {/* Module Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-bold ${moduleCompleted ? 'text-emerald-300' : 'text-white'}`}>
                      Module {module.id}: {module.name}
                    </h3>
                    {moduleCompleted && (
                      <span className="material-symbols-outlined text-amber-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{module.subtitle} • {theme.label}</p>
                </div>

                {/* Module Progress Badge */}
                <div className={`
                  px-2 py-1 rounded-lg text-xs font-bold
                  ${moduleCompleted 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : 'bg-slate-700/50 text-slate-400'
                  }
                `}>
                  {module.submodules.filter(s => completedSubmodules.includes(s.id)).length}/{module.submodules.length}
                </div>
              </div>

              {/* Submodule Checkpoints - Grid Layout */}
              <div className="mt-3 ml-6 pl-6 border-l-2 border-dashed border-slate-600/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {module.submodules.map((submodule, subIndex) => {
                    const completed = isCompleted(submodule.id)
                    const current = isCurrent(submodule.id)
                    const unlocked = isUnlocked(submodule.id, moduleIndex, subIndex)

                    return (
                      <button
                        key={submodule.id}
                        onClick={() => handleSubmoduleClick(module.id, submodule.id, unlocked)}
                        disabled={!unlocked}
                        className={`
                          flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-all
                          ${completed 
                            ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/30' 
                            : current 
                              ? 'bg-cyan-500/20 text-cyan-300 border-2 border-cyan-400/50 shadow-lg shadow-cyan-500/20' 
                              : unlocked
                                ? 'bg-slate-700/40 text-slate-300 hover:bg-slate-600/50 border border-slate-600/50 hover:border-cyan-500/30' 
                                : 'bg-slate-800/30 text-slate-600 cursor-not-allowed border border-slate-700/30'
                          }
                        `}
                      >
                        {/* Status Icon */}
                        <span 
                          className={`material-symbols-outlined text-base flex-shrink-0 ${
                            completed ? 'text-emerald-400' : current ? 'text-cyan-400' : unlocked ? 'text-slate-400' : 'text-slate-600'
                          }`}
                          style={(completed || current) ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                          {completed ? 'check_circle' : current ? 'play_circle' : unlocked ? 'circle' : 'lock'}
                        </span>
                        
                        {/* Submodule Info */}
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium block truncate">
                            {submodule.id}
                          </span>
                          <span className="text-[10px] opacity-70 block truncate">
                            {submodule.title}
                          </span>
                        </div>

                        {/* Current indicator */}
                        {current && (
                          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse flex-shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Path Connector to Next Module */}
              {!isLastModule && (
                <div className="ml-6 pl-6 py-2 border-l-2 border-dashed border-slate-600/50">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="material-symbols-outlined text-lg">arrow_downward</span>
                    <span className="text-xs">tiếp theo</span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Completion Badge */}
      {progressPercent === 100 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 rounded-xl border border-amber-500/30 text-center">
          <span className="material-symbols-outlined text-amber-400 text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
            workspace_premium
          </span>
          <h3 className="text-lg font-bold text-amber-300">🎉 Chúc mừng! Bạn đã hoàn thành toàn bộ khóa học!</h3>
          <p className="text-sm text-slate-400 mt-1">Bạn đã chinh phục tất cả {totalSubmodules} bài học về Nhạc Lý</p>
        </div>
      )}
    </div>
  )
}

export default JourneyMap
