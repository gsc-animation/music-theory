import React, { useEffect, useRef } from 'react'
import abcjs from 'abcjs'

type NoteResult = 'perfect' | 'good' | 'ok' | 'miss' | 'pending'

interface AbcNoteSymbolProps {
  /** ABC notation for the note (e.g., 'C4' for whole note, 'C2' for half note) */
  noteAbc: string
  /** Width of the symbol container */
  width?: number
  /** Height of the symbol container */
  height?: number
  /** Index of the note currently being played/highlighted (0-based). -1 for no highlight. */
  highlightIndex?: number
  /** Array of results for each note (for "Living Notation" coloring) */
  noteResults?: NoteResult[]
}

// Color palette matching app theme
const RESULT_COLORS: Record<NoteResult | 'highlight', string> = {
  perfect: '#10b981', // Emerald
  good: '#84cc16', // Lime
  ok: '#f59e0b', // Amber
  miss: '#f43f5e', // Rose
  pending: 'currentColor', // Default black
  highlight: '#14b8a6', // Teal - current beat
}

/**
 * Renders a single note symbol using ABCJS for use in games.
 * Supports "Living Notation" - notes colored by accuracy result.
 */
export const AbcNoteSymbol: React.FC<AbcNoteSymbolProps> = ({
  noteAbc,
  width = 120,
  height = 80,
  highlightIndex = -1,
  noteResults = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Initial Render
  useEffect(() => {
    if (containerRef.current) {
      const formattedAbc = noteAbc.replace(/\\n/g, '\n')

      abcjs.renderAbc(containerRef.current, formattedAbc, {
        staffwidth: width - 20,
        paddingtop: 0,
        paddingbottom: 0,
        paddingleft: 10,
        paddingright: 10,
        add_classes: true,
        scale: 1.0,
        responsive: 'resize',
      })
    }
  }, [noteAbc, width])

  // Handle Living Notation + Highlighting
  useEffect(() => {
    if (!containerRef.current) return

    // Find all note groups (abcjs-n0, abcjs-n1, etc.)
    // We need to iterate through each note and apply the appropriate color
    let noteIndex = 0
    let element = containerRef.current.querySelector(`.abcjs-n${noteIndex}`)

    while (element) {
      const paths = element.querySelectorAll('path')
      let color = 'currentColor'

      // Priority: highlight > result > default
      if (noteIndex === highlightIndex) {
        color = RESULT_COLORS.highlight
      } else if (noteResults[noteIndex]) {
        color = RESULT_COLORS[noteResults[noteIndex]!]
      }

      paths.forEach((path) => {
        path.setAttribute('fill', color)
      })

      noteIndex++
      element = containerRef.current!.querySelector(`.abcjs-n${noteIndex}`)
    }
  }, [highlightIndex, noteResults, noteAbc])

  return (
    <div
      className="abc-note-symbol text-slate-800 dark:text-slate-200"
      ref={containerRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    />
  )
}

export default AbcNoteSymbol
