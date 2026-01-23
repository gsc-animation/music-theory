import React, { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import abcjs from 'abcjs'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useAudioStore } from '../../stores/useAudioStore'
import { getNoteLabel } from '../../utils/note-labels'

interface TheoryContentProps {
  content: string
}

interface ContentBlock {
  type: 'html' | 'abc'
  content: string
  title?: string
}

// Map ABC notation to standard note names
function abcToNoteName(abcPitch: string): string {
  // ABC uses: C D E F G A B c d e f g a b c' d' etc.
  // Lowercase = octave 5, uppercase = octave 4, comma = lower, apostrophe = higher
  const baseNotes: Record<string, string> = {
    C: 'C4',
    D: 'D4',
    E: 'E4',
    F: 'F4',
    G: 'G4',
    A: 'A4',
    B: 'B4',
    c: 'C5',
    d: 'D5',
    e: 'E5',
    f: 'F5',
    g: 'G5',
    a: 'A5',
    b: 'B5',
  }

  // Handle commas (lower octave) and apostrophes (higher octave)
  const base = abcPitch.replace(/[',]/g, '')
  let note = baseNotes[base] || base

  if (abcPitch.includes(',')) {
    const match = note.match(/([A-G]#?b?)(\d)/)
    if (match) {
      note = match[1] + (parseInt(match[2]) - 1)
    }
  }
  if (abcPitch.includes("'")) {
    const match = note.match(/([A-G]#?b?)(\d)/)
    if (match) {
      note = match[1] + (parseInt(match[2]) + 1)
    }
  }

  return note
}

/**
 * Inject note name annotations into ABC notation
 * Adds "^NoteName" annotations above each note when enabled
 */
function injectNoteAnnotations(abc: string, notationSystem: 'latin' | 'solfege'): string {
  // Split into lines and process each
  const lines = abc.split('\n')
  const processedLines = lines.map((line) => {
    // Skip header lines (X:, T:, M:, L:, Q:, K:, %%, V:, [V:])
    if (/^[A-Z]:/.test(line) || /^%%/.test(line) || /^\[V:/.test(line)) {
      return line
    }

    // Process music content - match ABC notes
    // ABC note pattern: optional accidental (^ _ =), note letter (A-Ga-g), optional octave modifiers (, ')
    return line.replace(
      /(\^{1,2}|_{1,2}|=)?([A-Ga-g])([,']*)/g,
      (match, accidental = '', letter) => {
        // Skip if it's a rest
        if (letter.toLowerCase() === 'z' || letter.toLowerCase() === 'x') {
          return match
        }

        // Convert ABC note to standard format for label lookup
        const upperLetter = letter.toUpperCase()
        let accidentalDisplay = ''
        if (accidental === '^') accidentalDisplay = '#'
        else if (accidental === '^^') accidentalDisplay = '##'
        else if (accidental === '_') accidentalDisplay = 'b'
        else if (accidental === '__') accidentalDisplay = 'bb'

        const latinName = upperLetter + accidentalDisplay
        const displayName = getNoteLabel(latinName, notationSystem)

        // Return with annotation prefix
        return `"^${displayName}"${match}`
      }
    )
  })

  return processedLines.join('\n')
}

/**
 * Renders a small inline ABC notation snippet with click-to-play and note labels
 */
const InlineAbc: React.FC<{ abc: string; title?: string }> = ({ abc, title }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showNotes, setShowNotes] = useState(false)
  const notationSystem = useSettingsStore((s) => s.notationSystem)
  const { playNote, releaseNote } = useAudioStore()

  // Handle note click
  const handleNoteClick = useCallback(
    (abcNote: string) => {
      const note = abcToNoteName(abcNote)
      playNote(note)
      setTimeout(() => releaseNote(note), 200)
    },
    [playNote, releaseNote]
  )

  // Generate ABC with or without note annotations
  const processedAbc = useMemo(() => {
    if (showNotes) {
      return injectNoteAnnotations(abc, notationSystem)
    }
    return abc
  }, [abc, showNotes, notationSystem])

  useEffect(() => {
    if (containerRef.current) {
      // Render ABC with clickable notes
      abcjs.renderAbc(containerRef.current, processedAbc, {
        responsive: 'resize',
        staffwidth: 350,
        paddingtop: 0,
        paddingbottom: 5,
        paddingleft: 0,
        paddingright: 0,
        add_classes: true,
        clickListener: (abcelem: unknown) => {
          const elem = abcelem as { pitches?: Array<{ name: string }> }
          if (elem.pitches && elem.pitches[0]) {
            handleNoteClick(elem.pitches[0].name)
          }
        },
      })
    }
  }, [processedAbc, handleNoteClick])

  return (
    <div className="inline-abc-demo my-4 mx-auto max-w-md bg-white dark:bg-slate-900/80 rounded-xl border border-[#30e8e8]/30 shadow-sm overflow-hidden">
      {/* Header with title and notes toggle */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        {title && (
          <div className="text-xs font-semibold text-[#30e8e8] uppercase tracking-wider">
            ♪ {title}
          </div>
        )}
        <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-500 hover:text-slate-300">
          <input
            type="checkbox"
            checked={showNotes}
            onChange={(e) => setShowNotes(e.target.checked)}
            className="w-3 h-3 accent-[#30e8e8] rounded"
          />
          <span>Notes</span>
        </label>
      </div>

      {/* ABC notation container */}
      <div
        ref={containerRef}
        className="p-3 [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto [&_.abcjs-note]:cursor-pointer [&_.abcjs-note:hover]:opacity-70"
      />

      {/* Click hint */}
      <div className="text-center text-xs text-slate-400 pb-2">Click any note to hear it</div>

      {/* Annotation styling */}
      <style>{`
        .inline-abc-demo text.abcjs-annotation {
          fill: #30e8e8;
          font-size: 7px;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

/**
 * Parse theory content and split into HTML blocks and ABC notation blocks
 */
function parseTheoryContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []

  // Pattern to match {{abc:Title|ABC content}}
  const abcPattern = /\{\{abc:([^|]+)\|([^}]+)\}\}/g

  let lastIndex = 0
  let match

  while ((match = abcPattern.exec(content)) !== null) {
    // Add HTML content before this ABC block
    if (match.index > lastIndex) {
      const htmlContent = content.slice(lastIndex, match.index)
      if (htmlContent.trim()) {
        blocks.push({
          type: 'html',
          content: formatHtmlContent(htmlContent),
        })
      }
    }

    // Add ABC block
    blocks.push({
      type: 'abc',
      title: match[1].trim(),
      content: match[2].trim(),
    })

    lastIndex = match.index + match[0].length
  }

  // Add remaining HTML content
  if (lastIndex < content.length) {
    const htmlContent = content.slice(lastIndex)
    if (htmlContent.trim()) {
      blocks.push({
        type: 'html',
        content: formatHtmlContent(htmlContent),
      })
    }
  }

  return blocks
}

/**
 * Format HTML content (markdown-like to HTML)
 */
function formatHtmlContent(content: string): string {
  let result = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter((c) => c.trim())
      const isHeader = cells.some((c) => c.includes('---'))
      if (isHeader) return ''
      const cellHtml = cells.map((c) => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cellHtml}</tr>`
    })
    .replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table><tbody>$&</tbody></table>')
    .replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>')

  const blocks = result.split(/\n\n+/)
  result = blocks
    .map((block) => {
      block = block.trim()
      if (
        block.startsWith('<h2>') ||
        block.startsWith('<h3>') ||
        block.startsWith('<table>') ||
        block.startsWith('<ul>') ||
        block.startsWith('<ol>')
      ) {
        return block
      }
      block = block.replace(/\n/g, '<br>')
      return block ? `<p>${block}</p>` : ''
    })
    .filter(Boolean)
    .join('\n')

  return result
}

/**
 * TheoryContent component - renders theory text with inline ABC notation demos
 */
export const TheoryContent: React.FC<TheoryContentProps> = ({ content }) => {
  const blocks = useMemo(() => parseTheoryContent(content), [content])

  return (
    <div className="theory-content">
      {blocks.map((block, index) => {
        if (block.type === 'abc') {
          return <InlineAbc key={`abc-${index}`} abc={block.content} title={block.title} />
        }
        return (
          <div
            key={`html-${index}`}
            className="theory-formatted"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        )
      })}
    </div>
  )
}

export default TheoryContent
