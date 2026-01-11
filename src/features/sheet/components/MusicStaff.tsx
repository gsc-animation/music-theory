import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Factory } from 'vexflow';
import { distributeNotesToMeasures } from '../../../utils/music-math';

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

    let timeoutId: ReturnType<typeof setTimeout>;
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
      renderer: { elementId: containerRef.current as unknown as string, width: currentWidth, height: 150 }
    });

    const score = vf.EasyScore();
    const context = vf.getContext();

    const measures = distributeNotesToMeasures(notes, timeSignature);

    // If no notes, show a default rest in one measure
    if (measures.length === 0) {
       measures.push(['b4/w/r']);
    }

    // Always divide width by 4 to represent the "4 measure capacity" visual
    const measureWidth = currentWidth / 4;

    try {
      measures.forEach((measureNotes, index) => {
        // Stop rendering if we exceed 4 measures (safety check, though HomePage limits this)
        if (index >= 4) return;

        const x = index * measureWidth;
        const y = 0;

        // Create Stave manually
        const stave = vf.Stave({ x, y, width: measureWidth });

        // Add Clef and Time Signature only to the first measure
        if (index === 0) {
          stave.addClef(clef).addTimeSignature(timeSignature);
        }

        // Draw the stave lines
        stave.draw();

        // Prepare notes
        const notesString = measureNotes.join(', ');

        // Create voice
        const voice = score.voice(score.notes(notesString, { stem: 'up' }));

        // Set strict to false to handle incomplete measures
        voice.setStrict(false);

        // Format and draw notes
        // Adjust available width for notes (subtract padding for clef/key sig in first measure)
        const availableWidth = measureWidth - (index === 0 ? 80 : 20);

        vf.Formatter()
          .joinVoices([voice])
          .format([voice], availableWidth);

        voice.draw(context, stave);
      });

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
