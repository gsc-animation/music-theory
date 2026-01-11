import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Factory } from 'vexflow';

export interface MusicStaffProps {
  notes: string[];
  clef?: string;
  timeSignature?: string;
  width?: number;
  className?: string;
}

export const MusicStaff: React.FC<MusicStaffProps> = ({
  notes,
  clef = 'treble',
  timeSignature = '4/4',
  width,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWidth, setCurrentWidth] = useState(width || 300);

  useEffect(() => {
    if (width) {
      setCurrentWidth(width);
      return;
    }

    if (!containerRef.current) return;

    let timeoutId: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          // Debounce resize updates
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setCurrentWidth(entry.contentRect.width);
          }, 100);
        }
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, [width]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous SVG
    containerRef.current.innerHTML = '';

    const vf = new Factory({
      renderer: { elementId: containerRef.current, width: currentWidth, height: 150 }
    });

    const score = vf.EasyScore();
    const system = vf.System();

    // Map notes to string format if needed, or join them
    // EasyScore expects "C4, D4"
    // If notes are empty, render a rest or empty voice
    const notesString = notes.length > 0 ? notes.join(', ') : 'b4/h/r'; // Default rest if empty

    try {
      const voice = score.voice(score.notes(notesString, { stem: 'up' }));
      voice.setStrict(false); // Allow partial measures (e.g., single note in 4/4)

      system.addStave({
        voices: [ voice ]
      }).addClef(clef).addTimeSignature(timeSignature);

      vf.draw();
    } catch (e) {
      console.error("VexFlow Render Error:", e);
    }

  }, [notes, clef, timeSignature, currentWidth]);

  return (
    <div
      ref={containerRef}
      data-testid="music-staff-container"
      className={clsx(
        'w-full h-auto flex justify-center bg-ricePaper rounded-xl shadow-sm border border-warmWood/20',
        className
      )}
    >
      {/* VexFlow will render SVG here */}
    </div>
  );
};
