import React from 'react'
import type { FluteType, HoleState } from '../types'

interface FingeringChartProps {
  holes: HoleState[]
  type?: FluteType
  className?: string
}

const FingeringChart: React.FC<FingeringChartProps> = ({ holes, className }) => {
  const renderHole = (state: HoleState, index: number, totalHoles: number) => {
    // Visual index (0 is top)
    const cx = 50
    const cy = 70 + index * 45 // Spacing
    const r = 14

    // Hole Number (1 is bottom)
    const holeNumber = totalHoles - index

    let holeGraphic
    if (state === 'X') {
      // Closed - Filled
      holeGraphic = (
        <circle
          key={`c-${index}`}
          cx={cx}
          cy={cy}
          r={r}
          className="fill-stone-700 stroke-stone-800 stroke-1"
        />
      )
    } else if (state === 'O') {
      // Open - Ring
      holeGraphic = (
        <circle
          key={`c-${index}`}
          cx={cx}
          cy={cy}
          r={r}
          className="fill-[#fdf6e3] stroke-stone-800 stroke-1"
        />
      )
    } else {
      // Half - Half filled
      holeGraphic = (
        <g key={`g-${index}`}>
          <circle cx={cx} cy={cy} r={r} className="fill-[#fdf6e3] stroke-stone-800 stroke-1" />
          {/* Left half filled */}
          <path
            d={`M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} Z`}
            className="fill-stone-700"
          />
        </g>
      )
    }

    return (
      <g key={index}>
        {/* Hole Label */}
        <text
          x="15"
          y={cy}
          dy="5"
          className="text-xs fill-stone-500 font-mono text-center font-bold"
          textAnchor="middle"
        >
          {holeNumber}
        </text>
        {holeGraphic}
      </g>
    )
  }

  // Calculate dynamic height
  const totalHeight = 80 + holes.length * 45 + 30

  return (
    <div className={`relative ${className}`} style={{ width: '120px', margin: '0 auto' }}>
      <svg
        viewBox={`0 0 100 ${totalHeight}`}
        className="w-full h-auto drop-shadow-xl overflow-visible"
      >
        <defs>
          <linearGradient id="fluteGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#e0c097" />
            <stop offset="40%" stopColor="#f3deb0" />
            <stop offset="60%" stopColor="#e8cf9c" />
            <stop offset="100%" stopColor="#cfa572" />
          </linearGradient>
          <filter id="woodGrain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
            <feColorMatrix type="saturate" values="0.2" />
            <feBlend mode="multiply" in="SourceGraphic" in2="noise" />
          </filter>
        </defs>

        {/* Flute Body */}
        <rect
          x="30"
          y="10"
          width="40"
          height={totalHeight - 20}
          rx="6"
          fill="url(#fluteGradient)"
          className="stroke-stone-400 stroke-1"
        />

        {/* Bamboo Joints (Decorative lines) */}
        <line x1="30" y1="55" x2="70" y2="55" className="stroke-stone-400/50 stroke-1" />
        <line
          x1="30"
          y1={totalHeight / 2}
          x2="70"
          y2={totalHeight / 2}
          className="stroke-stone-400/50 stroke-1"
        />

        {/* Blow Hole (Decorative) */}
        <ellipse cx="50" cy="35" rx="10" ry="8" className="fill-stone-800" />
        <text x="85" y="40" className="text-[9px] fill-stone-400 font-serif italic">
          Thổi
        </text>

        {/* Finger Holes */}
        {[...holes].reverse().map((state, i) => {
          return renderHole(state, i, holes.length)
        })}
      </svg>
    </div>
  )
}

export default FingeringChart
