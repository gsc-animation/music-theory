import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Factory } from 'vexflow';
import { distributeNotesToMeasures } from '../../utils/music-math';

export interface MusicStaffProps {
  notes: string[];
  clef?: string;
  timeSignature?: string;
  width?: number;
  className?: string;
  highlightNote?: string | null; // New prop for game mode
  cursorPosition?: number; // 0 to 1 progress for playback cursor
}

export const MusicStaff: React.FC<MusicStaffProps> = React.memo(({
  notes,
  clef = 'treble',
  timeSignature = '4/4',
  width,
  className,
  highlightNote,
  cursorPosition,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vexFlowRef = useRef<HTMLDivElement>(null);
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
    if (!vexFlowRef.current) return;

    // Clear previous SVG
    vexFlowRef.current.innerHTML = '';

    const vf = new Factory({
      // @ts-expect-error VexFlow types incorrectly require string ID, but accepts HTMLElement
      renderer: { elementId: vexFlowRef.current, width: currentWidth, height: 150 }
    });

    const score = vf.EasyScore();
    const context = vf.getContext();

    const measures = distributeNotesToMeasures(notes, timeSignature);

    // If highlightNote is present (Game Mode), override standard measures to show single target note
    if (highlightNote) {
      // Create a full measure with just the target note as a whole note (or quarter)
      // Note: highlightNote format is usually "C4", VexFlow needs "c4/w" or similar
      const formatted = highlightNote.toLowerCase() + '/w';
      // Clear existing measures and replace with single target note
      // We'll put it in the first measure for clarity
      measures.length = 0;
      measures.push([formatted]);

      // If we want to center it or make it look special, we can handle that below
      // But replacing 'notes' content effectively switches the view
    } else if (measures.length === 0) {
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
        // Use more space for better note distribution
        const availableWidth = measureWidth - (index === 0 ? 60 : 10);

        vf.Formatter()
          .joinVoices([voice])
          .format([voice], availableWidth, { alignRests: true });

        voice.draw(context, stave);
      });

    } catch (e) {
      console.error("VexFlow Render Error:", e);
    }

  }, [notes, clef, timeSignature, currentWidth, highlightNote]);

  return (
    <div
      ref={containerRef}
      data-testid="music-staff-container"
      className={clsx(
        'relative w-full h-auto flex justify-center bg-ricePaper rounded-xl shadow-sm border border-warmWood/20',
        className
      )}
    >
      {/* VexFlow Container */}
      <div ref={vexFlowRef} />

      {/* Playback Cursor */}
      {cursorPosition !== undefined && (
        <div
          data-testid="playback-cursor"
          className="absolute top-8 bottom-8 w-1 bg-red-500 opacity-60 pointer-events-none z-10 will-change-transform"
          style={{
            left: 0,
            transform: `translateX(${cursorPosition * currentWidth}px)`
          }}
        />
      )}
    </div>
  );
});
