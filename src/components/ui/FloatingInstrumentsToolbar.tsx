import React from 'react'
import type { InstrumentType } from '../../stores/useFloatingInstrumentsStore'
import { useFloatingInstrumentsStore } from '../../stores/useFloatingInstrumentsStore'

const instrumentConfig: Array<{ type: InstrumentType; icon: string; label: string }> = [
  { type: 'piano', icon: 'piano', label: 'Piano' },
  { type: 'guitar', icon: 'music_note', label: 'Guitar' },
  { type: 'flute', icon: 'air', label: 'Sáo Trúc' },
]

export const FloatingInstrumentsToolbar: React.FC = () => {
  const { instruments, toggleInstrument } = useFloatingInstrumentsStore()

  return (
    <div className="fixed bottom-4 right-4 z-[1100] flex flex-col gap-2">
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
              ${isVisible 
                ? 'bg-[#30e8e8] text-slate-900' 
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
              }
            `}
            title={`${isVisible ? 'Hide' : 'Show'} ${label}`}
          >
            <span className="material-symbols-outlined text-xl">{icon}</span>
            
            {/* Tooltip */}
            <span className="
              absolute right-14 px-2 py-1 
              bg-slate-900 text-white text-xs rounded
              opacity-0 group-hover:opacity-100
              transition-opacity pointer-events-none whitespace-nowrap
            ">
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
