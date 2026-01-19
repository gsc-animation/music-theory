import React from 'react'

interface CircleOfFifthsProps {
  selectedKey?: string
  onKeySelect?: (key: string) => void
  className?: string
}

const KEYS = [
  { name: 'C', sharps: 0, position: 0 },
  { name: 'G', sharps: 1, position: 1 },
  { name: 'D', sharps: 2, position: 2 },
  { name: 'A', sharps: 3, position: 3 },
  { name: 'E', sharps: 4, position: 4 },
  { name: 'B', sharps: 5, position: 5 },
  { name: 'F#', sharps: 6, position: 6 },
  { name: 'Db', flats: 5, position: 7 },
  { name: 'Ab', flats: 4, position: 8 },
  { name: 'Eb', flats: 3, position: 9 },
  { name: 'Bb', flats: 2, position: 10 },
  { name: 'F', flats: 1, position: 11 },
]

const RELATIVE_MINORS = [
  { name: 'Am', position: 0 },
  { name: 'Em', position: 1 },
  { name: 'Bm', position: 2 },
  { name: 'F#m', position: 3 },
  { name: 'C#m', position: 4 },
  { name: 'G#m', position: 5 },
  { name: 'D#m', position: 6 },
  { name: 'Bbm', position: 7 },
  { name: 'Fm', position: 8 },
  { name: 'Cm', position: 9 },
  { name: 'Gm', position: 10 },
  { name: 'Dm', position: 11 },
]

/**
 * Interactive Circle of Fifths visualization
 */
export const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({
  selectedKey = 'C',
  onKeySelect,
  className = '',
}) => {
  const size = 200
  const center = size / 2
  const outerRadius = 85
  const innerRadius = 55

  const getPosition = (position: number, radius: number) => {
    const angle = (position * 30 - 90) * (Math.PI / 180)
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    }
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[200px]">
        {/* Outer ring background */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="30"
          className="text-slate-100 dark:text-slate-800"
        />

        {/* Major keys (outer) */}
        {KEYS.map((key) => {
          const pos = getPosition(key.position, outerRadius)
          const isSelected = key.name === selectedKey
          return (
            <g key={key.name} className="cursor-pointer" onClick={() => onKeySelect?.(key.name)}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={12}
                className={`transition-all ${
                  isSelected
                    ? 'fill-[#30e8e8] stroke-[#136363]'
                    : 'fill-white dark:fill-slate-700 stroke-slate-300 dark:stroke-slate-600 hover:fill-[#30e8e8]/20'
                }`}
                strokeWidth={isSelected ? 2 : 1}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[10px] font-bold pointer-events-none ${
                  isSelected ? 'fill-[#111818]' : 'fill-slate-700 dark:fill-slate-300'
                }`}
              >
                {key.name}
              </text>
            </g>
          )
        })}

        {/* Minor keys (inner) */}
        {RELATIVE_MINORS.map((key) => {
          const pos = getPosition(key.position, innerRadius)
          return (
            <g key={key.name} className="cursor-pointer" onClick={() => onKeySelect?.(key.name)}>
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[8px] font-medium fill-slate-500 dark:fill-slate-400 hover:fill-[#30e8e8]"
              >
                {key.name}
              </text>
            </g>
          )
        })}

        {/* Center label */}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-[8px] font-bold fill-slate-400"
        >
          Key
        </text>
      </svg>
      <p className="text-[10px] text-slate-500 mt-2">
        Selected: <span className="font-bold text-[#30e8e8]">{selectedKey}</span>
      </p>
    </div>
  )
}

export default CircleOfFifths
