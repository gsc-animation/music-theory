import React, { useMemo } from 'react';
import { getNoteAtPosition, getPositionsForNote, GUITAR_TUNING } from '../../utils/guitar-logic';

interface VirtualGuitarProps {
  /** Notes currently active/playing (e.g., ['C4', 'E4', 'G4']) */
  activeNotes?: string[];
  /** Callback when a note is clicked */
  onPlayNote: (note: string) => void;
  /** Whether to show note labels on the fretboard */
  showLabels?: boolean;
}

const TOTAL_FRETS = 15;
// SVG Dimensions
const WIDTH = 800;
const HEIGHT = 300;
const PADDING_X = 40;
const PADDING_Y = 30;
const FRETBOARD_WIDTH = WIDTH - PADDING_X * 2;
const FRETBOARD_HEIGHT = HEIGHT - PADDING_Y * 2;
const STRING_SPACING = FRETBOARD_HEIGHT / 5;
const FRET_SPACING = FRETBOARD_WIDTH / TOTAL_FRETS;

export const VirtualGuitar: React.FC<VirtualGuitarProps> = ({
  activeNotes = [],
  onPlayNote,
  showLabels = true,
}) => {
  // Pre-calculate active positions for fast lookup
  const activePositions = useMemo(() => {
    const map = new Map<string, boolean>();
    activeNotes.forEach(note => {
      const positions = getPositionsForNote(note);
      positions.forEach(pos => {
        map.set(`${pos.stringIndex}-${pos.fret}`, true);
      });
    });
    return map;
  }, [activeNotes]);

  const handleFretClick = (stringIndex: number, fret: number) => {
    const note = getNoteAtPosition(stringIndex, fret);
    if (note) {
      onPlayNote(note);
    }
  };

  // Generate fret markers (3, 5, 7, 9, 12, 15)
  // Single dots
  const singleDots = [3, 5, 7, 9, 15];
  // Double dot at 12
  const doubleDots = [12];

  return (
    <div className="w-full overflow-x-auto bg-gray-900 rounded-lg p-4 shadow-xl">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full h-auto cursor-pointer select-none"
        aria-label="Virtual Guitar Fretboard"
      >
        {/* Fretboard Background */}
        <rect
          x={PADDING_X}
          y={PADDING_Y}
          width={FRETBOARD_WIDTH}
          height={FRETBOARD_HEIGHT}
          fill="#3e2723" // Dark wood color
          stroke="#1a1a1a"
          strokeWidth="2"
          rx="4"
        />

        {/* Frets (Vertical Lines) */}
        {Array.from({ length: TOTAL_FRETS + 1 }).map((_, i) => (
          <line
            key={`fret-${i}`}
            x1={PADDING_X + i * FRET_SPACING}
            y1={PADDING_Y}
            x2={PADDING_X + i * FRET_SPACING}
            y2={HEIGHT - PADDING_Y}
            stroke="#d7ccc8" // Silver/Nickel color
            strokeWidth={i === 0 ? 6 : 2} // Nut is thicker
          />
        ))}

        {/* Fret Markers (Dots) */}
        {singleDots.map(fret => (
          <circle
            key={`dot-${fret}`}
            cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
            cy={HEIGHT / 2}
            r={6}
            fill="#a1887f"
            opacity={0.8}
          />
        ))}
        {doubleDots.map(fret => (
          <React.Fragment key={`ddot-${fret}`}>
            <circle
              cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
              cy={HEIGHT / 2 - STRING_SPACING}
              r={6}
              fill="#a1887f"
              opacity={0.8}
            />
            <circle
              cx={PADDING_X + (fret - 0.5) * FRET_SPACING}
              cy={HEIGHT / 2 + STRING_SPACING}
              r={6}
              fill="#a1887f"
              opacity={0.8}
            />
          </React.Fragment>
        ))}

        {/* Strings (Horizontal Lines) */}
        {GUITAR_TUNING.map((_, stringIndex) => (
          <line
            key={`string-${stringIndex}`}
            x1={PADDING_X}
            y1={PADDING_Y + stringIndex * STRING_SPACING}
            x2={WIDTH - PADDING_X}
            y2={PADDING_Y + stringIndex * STRING_SPACING}
            stroke="#e0e0e0" // String color
            strokeWidth={1 + (stringIndex * 0.5)} // Thicker for lower strings
          />
        ))}

        {/* Click Areas & Active Notes */}
        {GUITAR_TUNING.map((_, stringIndex) => (
          Array.from({ length: TOTAL_FRETS + 1 }).map((_, fret) => {
            const isActive = activePositions.has(`${stringIndex}-${fret}`);
            // Adjust X for open string specifically to be left of nut
            const renderX = fret === 0 ? PADDING_X - 15 : PADDING_X + (fret - 0.5) * FRET_SPACING;
            const note = getNoteAtPosition(stringIndex, fret);
            const y = PADDING_Y + stringIndex * STRING_SPACING;

            return (
              <g
                key={`pos-${stringIndex}-${fret}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFretClick(stringIndex, fret);
                }}
              >
                {/* Invisible Click Target */}
                <rect
                  x={renderX - 15}
                  y={y - STRING_SPACING / 2}
                  width={fret === 0 ? 30 : FRET_SPACING}
                  height={STRING_SPACING}
                  fill="transparent"
                  className="hover:fill-white/10"
                />

                {/* Active Note Indicator */}
                {isActive && (
                  <circle
                    cx={renderX}
                    cy={y}
                    r={10}
                    fill="#4ade80" // Green-400
                    stroke="#166534"
                    strokeWidth={2}
                  />
                )}

                {/* Note Label (if active or labels on) */}
                {(isActive || showLabels) && (isActive || fret === 0) && (
                  <text
                    x={renderX}
                    y={y}
                    dy={4}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isActive ? "#000" : "#9ca3af"}
                    pointerEvents="none"
                    fontWeight="bold"
                  >
                    {note}
                  </text>
                )}
              </g>
            );
          })
        ))}
      </svg>

      {/* Fret Numbers Helper */}
      <div className="flex justify-between px-10 text-gray-400 text-xs mt-1 pl-[40px] pr-[40px]">
         {/* Simple visualization of fret numbers if needed, but the SVG has dots */}
      </div>
    </div>
  );
};
