import React, { useEffect, useRef } from 'react'
import abcjs from 'abcjs'

interface InlineAbcNotationProps {
  abc: string
  title?: string
}

/**
 * Renders a small inline ABC notation snippet for demonstrating concepts within theory text
 */
export const InlineAbcNotation: React.FC<InlineAbcNotationProps> = ({ abc, title }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Pre-process abc string to handle literal \n if present
      const formattedAbc = abc.replace(/\\n/g, '\n')

      abcjs.renderAbc(containerRef.current, formattedAbc, {
        responsive: 'resize',
        staffwidth: 600, // Increased for better rendering on mobile/desktop
        paddingtop: 0,
        paddingbottom: 5, // Small padding for bottom elements
        paddingleft: 0,
        paddingright: 0,
        add_classes: true,
      })
    }
  }, [abc])

  return (
    <div className="inline-abc-demo my-4 p-3 bg-white dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .inline-abc-container svg {
          max-width: 100%;
          height: auto;
        }
        
        /* ===== DARK MODE - Comprehensive SVG targeting ===== */
        :root.dark .inline-abc-container svg path,
        :root.dark .inline-abc-container svg line,
        :root.dark .inline-abc-container svg rect,
        :root.dark .inline-abc-container svg circle,
        :root.dark .inline-abc-container svg ellipse,
        :root.dark .inline-abc-container svg text,
        :root.dark .inline-abc-container svg tspan,
        :root.dark .inline-abc-container .abcjs-beam,
        :root.dark .inline-abc-container .abcjs-dot,
        :root.dark .inline-abc-container .abcjs-staff,
        :root.dark .inline-abc-container .abcjs-bar,
        :root.dark .inline-abc-container .abcjs-stem,
        :root.dark .inline-abc-container .abcjs-notehead,
        :root.dark .inline-abc-container .abcjs-title,
        :root.dark .inline-abc-container .abcjs-composer,
        :root.dark .inline-abc-container .abcjs-meta-top {
          fill: #cbd5e1 !important;
          stroke: #cbd5e1 !important;
        }
      `,
        }}
      />
      {title && (
        <div className="text-xs font-medium text-[#30e8e8] uppercase tracking-wide mb-2">
          {title}
        </div>
      )}
      <div ref={containerRef} className="inline-abc-container" />
    </div>
  )
}

export default InlineAbcNotation
