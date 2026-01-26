import React from 'react'
import { useModuleStore } from '../../stores/useModuleStore'
import { useSettingsStore } from '../../stores/useSettingsStore'

interface MainHeaderProps {
  className?: string
}

/**
 * MainHeader with module title, BPM control, and VN Mode toggle
 */
export const MainHeader: React.FC<MainHeaderProps> = ({ className }) => {
  const modules = useModuleStore((state) => state.modules)
  const currentModuleId = useModuleStore((state) => state.currentModuleId)
  const currentModule = modules.find((m) => m.id === currentModuleId)
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const toggleNotationSystem = useSettingsStore((state) => state.toggleNotationSystem)
  const bpm = useSettingsStore((state) => state.bpm)
  const adjustBpm = useSettingsStore((state) => state.adjustBpm)
  const theme = useSettingsStore((state) => state.theme)
  const toggleTheme = useSettingsStore((state) => state.toggleTheme)

  return (
    <header
      data-testid="main-header"
      className={`
        h-[72px] px-8 flex items-center justify-between
        bg-white/80 dark:bg-[#22252a]/80 backdrop-blur-md
        sticky top-0 z-20
        border-b border-slate-200 dark:border-slate-700 shadow-sm
        md:h-[72px] h-[56px] md:px-8 px-4
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

      {/* Right - BPM, Dark Mode & VN Mode */}
      <div className="flex items-center gap-4">
        {/* BPM Control with +/- buttons */}
        <div className="hidden xl:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => adjustBpm(-5)}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:text-slate-700 hover:bg-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            title="Decrease BPM by 5"
          >
            <span className="material-symbols-outlined text-[16px]">remove</span>
          </button>
          <div className="flex items-center gap-1 px-1">
            <span className="material-symbols-outlined text-slate-400 text-sm">timer</span>
            <span
              className="text-xs font-bold text-slate-700 dark:text-slate-300 min-w-[50px] text-center"
              data-testid="bpm-display"
            >
              {bpm} BPM
            </span>
          </div>
          <button
            onClick={() => adjustBpm(5)}
            className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:text-slate-700 hover:bg-slate-200 dark:hover:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            title="Increase BPM by 5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
