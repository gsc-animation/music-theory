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
      abcjs.renderAbc(containerRef.current, abc, {
        responsive: 'resize',
        staffwidth: 400,
        paddingtop: 0,
        paddingbottom: 0,
        paddingleft: 0,
        paddingright: 0,
        add_classes: true,
      })
    }
  }, [abc])

  return (
    <div className="inline-abc-demo my-4 p-3 bg-white dark:bg-slate-900/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      {title && (
        <div className="text-xs font-medium text-[#30e8e8] uppercase tracking-wide mb-2">
          {title}
        </div>
      )}
      <div 
        ref={containerRef} 
        className="inline-abc-container [&_svg]:max-w-full [&_svg]:h-auto"
      />
    </div>
  )
}

export default InlineAbcNotation
