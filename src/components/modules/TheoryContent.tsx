import React, { useMemo } from 'react'
import { AbcRenderer } from '../abc/AbcRenderer'

interface TheoryContentProps {
  content: string
}

interface ContentBlock {
  type: 'html' | 'abc'
  content: string
  title?: string
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
 * Uses the unified AbcRenderer component for all ABC notation rendering
 */
export const TheoryContent: React.FC<TheoryContentProps> = ({ content }) => {
  const blocks = useMemo(() => parseTheoryContent(content), [content])

  return (
    <div className="theory-content">
      {blocks.map((block, index) => {
        if (block.type === 'abc') {
          return (
            <AbcRenderer
              key={`abc-${index}`}
              abc={block.content}
              title={block.title}
            />
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
