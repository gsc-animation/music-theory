import React from 'react'

interface SubmoduleProgressDotsProps {
  /** Total number of content sections in the submodule */
  totalSections: number
  /** Number of sections currently visible/unlocked */
  visibleCount: number
  /** Index of the currently active section (0-indexed) */
  currentSection: number
  /** Callback when a dot is clicked */
  onDotClick?: (sectionIndex: number) => void
}

/**
 * SubmoduleProgressDots - Displays clickable progress dots with connecting lines
 *
 * Design matches the page color scheme:
 * - Teal (#30e8e8) for unlocked sections
 * - Gray for locked sections
 * - Current dot is larger with blinking glow effect
 */
export const SubmoduleProgressDots: React.FC<SubmoduleProgressDotsProps> = ({
  totalSections,
  visibleCount,
  currentSection,
  onDotClick,
}) => {
  if (totalSections <= 1) {
    return null // Don't show if only one section
  }

  return (
    <div className="progress-dots-container">
      {Array.from({ length: totalSections }).map((_, index) => {
        const isUnlocked = index < visibleCount
        const isCurrent = index === currentSection
        const isLast = index === totalSections - 1

        return (
          <React.Fragment key={index}>
            {/* Dot */}
            <button
              className={`progress-dot ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`}
              onClick={() => isUnlocked && onDotClick?.(index)}
              disabled={!isUnlocked}
              aria-label={`Section ${index + 1}${isCurrent ? ' (current)' : ''}${!isUnlocked ? ' (locked)' : ''}`}
              title={isUnlocked ? `Go to section ${index + 1}` : `Section ${index + 1} (locked)`}
            />

            {/* Connecting line (except after last dot) */}
            {!isLast && (
              <div
                className={`progress-line ${index + 1 < visibleCount ? 'unlocked' : 'locked'}`}
              />
            )}
          </React.Fragment>
        )
      })}

      <style>{`
        .progress-dots-container {
          display: flex;
          align-items: center;
          margin-left: 12px;
          padding: 4px 0;
        }

        .progress-dot {
          width: 10px;
          height: 10px;
          min-width: 10px;
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          flex-shrink: 0;
        }

        .progress-dot.locked {
          background: #94a3b8;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .progress-dot.unlocked {
          background: #30e8e8;
          box-shadow: 0 0 6px rgba(48, 232, 232, 0.4);
        }

        .progress-dot.unlocked:hover:not(.current) {
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(48, 232, 232, 0.6);
        }

        /* Current dot - larger with glow and blinking */
        .progress-dot.current {
          width: 16px;
          height: 16px;
          min-width: 16px;
          background: linear-gradient(135deg, #30e8e8 0%, #26d4d4 100%);
          box-shadow: 0 0 16px rgba(48, 232, 232, 0.7), 0 0 32px rgba(48, 232, 232, 0.4);
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% {
            box-shadow: 0 0 16px rgba(48, 232, 232, 0.7), 0 0 32px rgba(48, 232, 232, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 24px rgba(48, 232, 232, 0.9), 0 0 48px rgba(48, 232, 232, 0.6);
            transform: scale(1.1);
          }
        }

        /* Connecting line */
        .progress-line {
          width: 16px;
          height: 3px;
          transition: background 0.3s ease;
          flex-shrink: 0;
        }

        .progress-line.unlocked {
          background: linear-gradient(90deg, #30e8e8, #26d4d4);
        }

        .progress-line.locked {
          background: #94a3b8;
          opacity: 0.4;
        }

        /* Dark mode adjustments */
        .dark .progress-dot.locked {
          background: #64748b;
          opacity: 0.5;
        }

        .dark .progress-line.locked {
          background: #64748b;
          opacity: 0.3;
        }

        /* Responsive: slightly smaller on mobile */
        @media (max-width: 640px) {
          .progress-dots-container {
            margin-left: 8px;
          }
          .progress-dot {
            width: 8px;
            height: 8px;
            min-width: 8px;
          }
          .progress-dot.current {
            width: 12px;
            height: 12px;
            min-width: 12px;
          }
          .progress-line {
            width: 10px;
            height: 2px;
          }
        }
      `}</style>
    </div>
  )
}

export default SubmoduleProgressDots
