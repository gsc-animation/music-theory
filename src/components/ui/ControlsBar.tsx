import React from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useSettingsStore } from '../../stores/useSettingsStore'

interface ControlsBarProps {
  className?: string
}

export const ControlsBar: React.FC<ControlsBarProps> = ({ className }) => {
  const timeSignature = useAudioStore((state) => state.timeSignature)
  const setTimeSignature = useAudioStore((state) => state.setTimeSignature)
  const notationSystem = useSettingsStore((state) => state.notationSystem)
  const setNotationSystem = useSettingsStore((state) => state.setNotationSystem)

  return (
    <div
      className={`flex items-center justify-center gap-4 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm ${className}`}
    >
      {/* Note Notation Toggle */}
      <div className="flex items-center bg-white rounded-full shadow-inner border border-gray-200 overflow-hidden">
        <button
          onClick={() => setNotationSystem('latin')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            notationSystem === 'latin'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Notes: CDEFGAB
        </button>
        <div className="w-px h-6 bg-gray-200" />
        <button
          onClick={() => setNotationSystem('solfege')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            notationSystem === 'solfege'
              ? 'bg-emerald-500 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Do-Re-Mi-Fa-Sol-La-Si (Tiếng Việt)
        </button>
      </div>

      {/* Metronome */}
      <button
        className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
        aria-label="Metronome"
      >
        <svg
          className="w-6 h-6 text-gray-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3L4 21h16L12 3z"
          />
          <line x1="12" y1="8" x2="8" y2="18" strokeWidth={1.5} />
        </svg>
      </button>

      {/* Time Signature Dropdown */}
      <div className="relative">
        <select
          value={timeSignature}
          onChange={(e) => setTimeSignature(e.target.value as '3/4' | '4/4')}
          className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
        >
          <option value="3/4">3/4</option>
          <option value="4/4">4/4</option>
          <option value="6/8">6/8</option>
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <span className="absolute -top-6 left-0 text-xs text-gray-500">Time Signature</span>
      </div>
    </div>
  )
}

export default ControlsBar
