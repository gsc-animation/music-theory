import React from 'react'
import { useModuleStore } from '../../stores/useModuleStore'
import { useAudioStore } from '../../stores/useAudioStore'

interface MainHeaderProps {
  className?: string
}

/**
 * MainHeader with module title, playback controls, and VN Mode toggle
 */
export const MainHeader: React.FC<MainHeaderProps> = ({ className }) => {
  const modules = useModuleStore((state) => state.modules)
  const currentModuleId = useModuleStore((state) => state.currentModuleId)
  const currentModule = modules.find((m) => m.id === currentModuleId)
  const replayRecordedNotes = useAudioStore((state) => state.replayRecordedNotes)

  return (
    <header
      className={`
        h-[72px] px-8 flex items-center justify-between
        bg-white/80 dark:bg-[#22252a]/80 backdrop-blur-md
        sticky top-0 z-20
        border-b border-slate-200 dark:border-slate-700 shadow-sm
        ${className}
      `}
    >
      {/* Left - Module info */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Module {currentModuleId}: {currentModule?.name || 'Loading...'}
        </h2>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-bold text-[#30e8e8]">{currentModule?.subtitle}</span>
          <span>•</span>
          <span>{currentModule?.progress}% complete</span>
        </div>
      </div>

      {/* Center - Playback controls */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 shadow-inner border border-slate-200 dark:border-slate-700">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-red-500 hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all"
          title="Record"
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            fiber_manual_record
          </span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 hover:shadow-sm transition-all"
          title="Previous"
        >
          <span className="material-symbols-outlined">skip_previous</span>
        </button>
        <button
          className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-lg transition-all"
          title="Play"
        >
          <span className="material-symbols-outlined text-[24px]">play_arrow</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 hover:shadow-sm transition-all"
          title="Next"
        >
          <span className="material-symbols-outlined">skip_next</span>
        </button>
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-slate-700 hover:shadow-sm transition-all"
          title="Replay"
          onClick={replayRecordedNotes}
        >
          <span className="material-symbols-outlined">replay</span>
        </button>
      </div>

      {/* Right - BPM & VN Mode */}
      <div className="flex items-center gap-4">
        <div className="hidden xl:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <span className="material-symbols-outlined text-slate-400 text-sm">timer</span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">120 BPM</span>
        </div>
        <label className="inline-flex items-center cursor-pointer group">
          <input className="sr-only peer" type="checkbox" />
          <div className="relative w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#30e8e8] shadow-inner" />
          <span className="ms-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-[#136363] transition-colors">
            VN Mode
          </span>
        </label>
      </div>
    </header>
  )
}

export default MainHeader
