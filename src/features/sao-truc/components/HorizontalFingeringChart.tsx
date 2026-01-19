import React from 'react'
import type { FluteType, HoleState } from '../types'

interface HorizontalFingeringChartProps {
  holes: HoleState[]
  type?: FluteType
  className?: string
}

const HorizontalFingeringChart: React.FC<HorizontalFingeringChartProps> = ({
  holes,
  className
}) => {
  const renderHole = (state: HoleState, index: number, totalHoles: number) => {
    // Horizontal orientation: holes go left to right
    const cy = 30
    const cx = 80 + (index * 40) // Spacing for horizontal
    const r = 12

    // Hole Number (1 is leftmost)
    const holeNumber = totalHoles - index

    let holeGraphic
    if (state === 'X') {
      // Closed - Filled
      holeGraphic = <circle key={`c-${index}`} cx={cx} cy={cy} r={r} className="fill-stone-700 stroke-stone-800 stroke-1" />
    } else if (state === 'O') {
      // Open - Ring
      holeGraphic = <circle key={`c-${index}`} cx={cx} cy={cy} r={r} className="fill-[#fdf6e3] stroke-stone-800 stroke-1" />
    } else {
      // Half - Half filled
      holeGraphic = (
        <g key={`g-${index}`}>
          <circle cx={cx} cy={cy} r={r} className="fill-[#fdf6e3] stroke-stone-800 stroke-1" />
          {/* Left half filled */}
          <path d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`} className="fill-stone-700" />
        </g>
      )
    }

    return (
      <g key={index}>
        {holeGraphic}
        {/* Hole number below */}
        <text x={cx} y={cy + 22} className="text-[9px] fill-stone-400 font-mono text-center" textAnchor="middle">{holeNumber}</text>
      </g>
    )
  }

  // Calculate dynamic width
  const totalWidth = 100 + (holes.length * 40) + 20

  return (
    <div className={`relative ${className}`} style={{ margin: '0 auto' }}>
      <svg viewBox={`0 0 ${totalWidth} 60`} className="w-full h-16 drop-shadow-xl overflow-visible">
        <defs>
          <linearGradient id="fluteGradientH" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#cfa572" />
            <stop offset="20%" stopColor="#e0c097" />
            <stop offset="50%" stopColor="#f3deb0" />
            <stop offset="80%" stopColor="#e8cf9c" />
            <stop offset="100%" stopColor="#cfa572" />
          </linearGradient>
        </defs>

        {/* Flute Body - Horizontal */}
        <rect x="10" y="15" width={totalWidth - 20} height="30" rx="15" fill="url(#fluteGradientH)" className="stroke-stone-400 stroke-1" />

        {/* Blow Hole (Left end) */}
        <ellipse cx="35" cy="30" rx="8" ry="6" className="fill-stone-800" />

        {/* Finger Holes */}
        {[...holes].reverse().map((state, i) => {
          return renderHole(state, i, holes.length)
        })}

        {/* End cap decoration */}
        <line x1="55" y1="15" x2="55" y2="45" className="stroke-stone-400/50 stroke-1" />
      </svg>
    </div>
  )
}

export default HorizontalFingeringChart
