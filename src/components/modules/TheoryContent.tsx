import React, { useMemo } from 'react'
import { AbcRenderer } from '../abc/AbcRenderer'
import { InlineGuitar } from '../VirtualGuitar/InlineGuitar'
import { InlinePiano } from '../VirtualPiano/InlinePiano'
import { InlineFlute } from '../../features/sao-truc/components/InlineFlute'

interface TheoryContentProps {
  content: string
}

interface ContentBlock {
  type: 'html' | 'abc' | 'guitar' | 'piano' | 'flute'
  content: string
  title?: string
  notes?: string[] // For guitar/piano/flute blocks: notes to highlight
}

/**
 * Parse theory content and split into HTML blocks, ABC notation, guitar, piano, and flute blocks
 *
 * Supported syntaxes:
 * - {{abc:Title|ABC notation}} - Music staff notation
 * - {{guitar:Title|E4,B3,G3}} - Guitar fretboard with highlighted notes
 * - {{piano:Title|C4,E4,G4}} - Piano keyboard with highlighted notes
 * - {{flute:Title|C4,D4,E4}} - Flute fingering chart
 */
function parseTheoryContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []

  // Combined pattern to match all block types
  const combinedPattern = /\{\{(abc|guitar|piano|flute):([^|]+)\|([^}]+)\}\}/g

  let lastIndex = 0
  let match

  while ((match = combinedPattern.exec(content)) !== null) {
    // Add HTML content before this block
    if (match.index > lastIndex) {
      const htmlContent = content.slice(lastIndex, match.index)
      if (htmlContent.trim()) {
        blocks.push({
          type: 'html',
          content: formatHtmlContent(htmlContent),
        })
      }
    }

    const blockType = match[1] as 'abc' | 'guitar' | 'piano' | 'flute'
    const title = match[2].trim()
    const blockContent = match[3].trim()

    if (blockType === 'guitar' || blockType === 'piano' || blockType === 'flute') {
      // Parse comma-separated notes
      const notes = blockContent.split(',').map((n) => n.trim())
      blocks.push({
        type: blockType,
        title,
        content: blockContent,
        notes,
      })
    } else {
      // ABC block
      blocks.push({
        type: 'abc',
        title,
        content: blockContent,
      })
    }

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
 * TheoryContent component - renders theory text with inline demos
 * Supports: {{abc:}}, {{guitar:}}, {{piano:}}, {{flute:}}
 */
export const TheoryContent: React.FC<TheoryContentProps> = ({ content }) => {
  const blocks = useMemo(() => parseTheoryContent(content), [content])

  return (
    <div className="theory-content">
      {blocks.map((block, index) => {
        if (block.type === 'abc') {
          return (
            <div key={`abc-${index}`} className="abc-renderer-wrapper">
              <AbcRenderer abc={block.content} title={block.title} />
            </div>
          )
        }

        if (block.type === 'guitar') {
          return (
            <div key={`guitar-${index}`} className="guitar-renderer-wrapper">
              <InlineGuitar title={block.title} highlightNotes={block.notes} />
            </div>
          )
        }

        if (block.type === 'piano') {
          return (
            <div key={`piano-${index}`} className="piano-renderer-wrapper">
              <InlinePiano title={block.title} highlightNotes={block.notes} />
            </div>
          )
        }

        if (block.type === 'flute') {
          return (
            <div key={`flute-${index}`} className="flute-renderer-wrapper">
              <InlineFlute title={block.title} highlightNotes={block.notes} />
            </div>
          )
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
