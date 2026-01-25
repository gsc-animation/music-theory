import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { InstrumentType } from '../../stores/useFloatingInstrumentsStore'
import { useFloatingInstrumentsStore } from '../../stores/useFloatingInstrumentsStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { COURSE_MODULES } from '../../data/course-data'

const instrumentConfig: Array<{ type: InstrumentType; icon: string; label: string }> = [
  { type: 'piano', icon: 'piano', label: 'Piano' },
  { type: 'guitar', icon: 'music_note', label: 'Guitar' },
  { type: 'flute', icon: 'air', label: 'Sáo Trúc' },
]

export const FloatingInstrumentsToolbar: React.FC = () => {
  const navigate = useNavigate()
  const { instruments, toggleInstrument } = useFloatingInstrumentsStore()
  const totalXP = useProgressStore((state) => state.totalXP)
  const completedSubmodules = useProgressStore((state) => state.completedSubmodules)
  const xpToNextLevel = 1000 - (totalXP % 1000)

  // Find next lesson to learn
  const allSubmodules = COURSE_MODULES.flatMap((m) =>
    m.submodules.map((s) => ({ ...s, moduleId: m.id }))
  )
  const nextLesson = allSubmodules.find((s, idx) => {
    if (completedSubmodules.includes(s.id)) return false
    if (idx === 0) return true
    return completedSubmodules.includes(allSubmodules[idx - 1].id)
  })

  const handleXPClick = () => {
    if (nextLesson) {
      navigate(`/module/${nextLesson.moduleId}/${nextLesson.id}`)
    } else {
      navigate('/compose')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[1100] flex flex-col gap-2">
      {/* XP Display - clickable to go to next lesson */}
      <button
        onClick={handleXPClick}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-slate-800 border border-slate-600 hover:bg-slate-700 hover:scale-110 transition-all cursor-pointer"
        title={nextLesson ? `Tiếp tục học: ${nextLesson.id}` : 'Xem bài học'}
      >
        <span
          className="material-symbols-outlined text-amber-500 text-xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>

        {/* XP Value Badge */}
        <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-amber-500 text-slate-900 text-[10px] font-bold rounded-full min-w-[24px] text-center">
          {totalXP}
        </span>

        {/* Tooltip */}
        <span className="absolute right-14 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {xpToNextLevel} XP để lên level tiếp theo
        </span>
      </button>

      {/* Instrument Buttons */}
      {instrumentConfig.map(({ type, icon, label }) => {
        const isVisible = instruments[type].isVisible

        return (
          <button
            key={type}
            onClick={() => toggleInstrument(type)}
            className={`
              group relative flex items-center justify-center
              w-12 h-12 rounded-full shadow-lg
              transition-all duration-200 hover:scale-110
              ${
                isVisible
                  ? 'bg-[#30e8e8] text-slate-900'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
              }
            `}
            title={`${isVisible ? 'Hide' : 'Show'} ${label}`}
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>

            {/* Tooltip */}
            <span className="absolute right-14 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {label}
            </span>

            {/* Active indicator */}
            {isVisible && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
            )}
          </button>
        )
      })}
    </div>
  )
}

export default FloatingInstrumentsToolbar
