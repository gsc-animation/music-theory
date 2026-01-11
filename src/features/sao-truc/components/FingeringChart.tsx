import React from 'react';
import type { FluteType, HoleState } from '../types';

interface FingeringChartProps {
  holes: HoleState[];
  type?: FluteType;
  className?: string;
}

const FingeringChart: React.FC<FingeringChartProps> = ({
  holes,
  className
}) => {
  const renderHole = (state: HoleState, index: number) => {
      const cx = 50;
      const cy = 100 + (index * 40); // Start below blow hole
      const r = 12;

      if (state === 'X') {
          // Closed - Filled Circle
          return <circle key={index} cx={cx} cy={cy} r={r} className="fill-stone-grey stroke-warm-wood stroke-2" />;
      } else if (state === 'O') {
          // Open - Ring
          return <circle key={index} cx={cx} cy={cy} r={r} className="fill-rice-paper stroke-warm-wood stroke-2" />;
      } else {
          // Half - Half filled
          return (
              <g key={index}>
                  <circle cx={cx} cy={cy} r={r} className="fill-rice-paper stroke-warm-wood stroke-2" />
                  <path d={`M ${cx} ${cy-r} A ${r} ${r} 0 0 1 ${cx} ${cy+r} Z`} className="fill-stone-grey" />
              </g>
          );
      }
  };

  // Calculate dynamic height based on number of holes
  // Base height (top padding + blow hole) = 100
  // Hole area = holes.length * 40
  // Bottom padding = 20
  const totalHeight = 100 + (holes.length * 40) + 20;
  // Ensure minimum height for 6-hole (approx 360-400)
  const height = Math.max(400, totalHeight);

  return (
    <div className={`relative w-24 ${className}`} style={{ height: `${height/4}px` }}> {/* Scale down for display if needed, or keep px */}
       {/* Actually, let's keep the aspect ratio via standard CSS sizing, but update viewBox */}
      <svg viewBox={`0 0 100 ${height}`} className="w-full h-full drop-shadow-md">
        {/* Flute Body */}
        <rect x="35" y="10" width="30" height={height - 20} rx="5" className="fill-warm-wood/90" />

        {/* Blow Hole (Decorative) */}
        <ellipse cx="50" cy="40" rx="10" ry="8" className="fill-black/40" />

        {/* Finger Holes */}
        {/* Input 'holes' is ordered Bottom -> Top (0 -> 5).
            Visual rendering Top -> Bottom.
            So we reverse the array for display.
        */}
        {[...holes].reverse().map((state, i) => {
            return renderHole(state, i);
        })}
      </svg>
    </div>
  );
};

export default FingeringChart;
