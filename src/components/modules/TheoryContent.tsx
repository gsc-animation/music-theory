import React, { useMemo } from 'react'
import { AbcRenderer } from '../abc/AbcRenderer'
import { InlineGuitar } from '../VirtualGuitar/InlineGuitar'
import { InlinePiano } from '../VirtualPiano/InlinePiano'
import { InlineFlute } from '../../features/sao-truc/components/InlineFlute'
import { InlineGrandStaff } from '../MusicStaff/InlineGrandStaff'
import { InlineQuiz } from './InlineQuiz'

interface TheoryContentProps {
  content: string
}

interface ContentBlock {
  type: 'html' | 'abc' | 'grandStaff' | 'guitar' | 'piano' | 'flute' | 'quiz'
  content: string
  title?: string
  notes?: string[] // For guitar/piano/flute blocks: notes to highlight
  // Quiz-specific fields
  question?: string
  options?: string[]
  correctIndex?: number
  explanation?: string
}

/**
 * Parse theory content and split into HTML blocks, ABC notation, guitar, piano, flute, and quiz blocks
 *
 * Supported syntaxes:
 * - {{abc:Title|ABC notation}} - Music staff notation
 * - {{guitar:Title|E4,B3,G3}} - Guitar fretboard with highlighted notes
 * - {{piano:Title|C4,E4,G4}} - Piano keyboard with highlighted notes
 * - {{flute:Title|C4,D4,E4}} - Flute fingering chart
 * - {{quiz:Question|opt1;opt2;*correct|Explanation}} - Inline quiz (correct option prefixed with *)
 */
function parseTheoryContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []

  // Combined pattern to match all block types (abc, grandStaff, guitar, piano, flute)
  const combinedPattern = /\{\{(abc|grandStaff|guitar|piano|flute):([^|]+)\|([^}]+)\}\}/g
  
  // Quiz pattern: {{quiz:Question|opt1;opt2;*correct|explanation}}
  const quizPattern = /\{\{quiz:([^|]+)\|([^|]+)(?:\|([^}]+))?\}\}/g

  // Collect all matches with their positions
  interface MatchInfo {
    index: number
    length: number
    block: ContentBlock
  }
  const allMatches: MatchInfo[] = []
  
  let match

  // Collect abc/guitar/piano/flute matches
  while ((match = combinedPattern.exec(content)) !== null) {
    const blockType = match[1] as 'abc' | 'grandStaff' | 'guitar' | 'piano' | 'flute'
    const title = match[2].trim()
    const blockContent = match[3].trim()

    let block: ContentBlock
    if (blockType === 'guitar' || blockType === 'piano' || blockType === 'flute') {
      const notes = blockContent.split(',').map((n) => n.trim())
      block = { type: blockType, title, content: blockContent, notes }
    } else if (blockType === 'grandStaff') {
      block = { type: 'grandStaff', title, content: blockContent }
    } else {
      block = { type: 'abc', title, content: blockContent }
    }
    
    allMatches.push({ index: match.index, length: match[0].length, block })
  }
  
  // Collect quiz matches
  while ((match = quizPattern.exec(content)) !== null) {
    const question = match[1].trim()
    const optionsStr = match[2].trim()
    const explanation = match[3]?.trim()
    
    // Parse options, find correct one (prefixed with *)
    const rawOptions = optionsStr.split(';').map((o) => o.trim())
    let correctIndex = 0
    const options = rawOptions.map((opt, idx) => {
      if (opt.startsWith('*')) {
        correctIndex = idx
        return opt.slice(1)
      }
      return opt
    })
    
    allMatches.push({
      index: match.index,
      length: match[0].length,
      block: {
        type: 'quiz',
        content: '',
        question,
        options,
        correctIndex,
        explanation,
      },
    })
  }
  
  // Sort all matches by position
  allMatches.sort((a, b) => a.index - b.index)
  
  // Build blocks array with HTML content between matches
  let lastIndex = 0
  for (const matchInfo of allMatches) {
    // Add HTML content before this block
    if (matchInfo.index > lastIndex) {
      const htmlContent = content.slice(lastIndex, matchInfo.index)
      if (htmlContent.trim()) {
        blocks.push({
          type: 'html',
          content: formatHtmlContent(htmlContent),
        })
      }
    }
    
    blocks.push(matchInfo.block)
    lastIndex = matchInfo.index + matchInfo.length
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
 * Parse markdown table to proper HTML with thead/th and tbody/td
 */
function parseMarkdownTable(tableText: string): string {
  const lines = tableText.trim().split('\n')
  if (lines.length < 2) return tableText

  const headerLine = lines[0]
  const separatorLine = lines[1]
  const dataLines = lines.slice(2)

  // Check if this is a valid markdown table (has separator with dashes)
  if (!separatorLine.includes('---')) return tableText

  // Parse header cells
  const headerCells = headerLine
    .split('|')
    .filter((c) => c.trim())
    .map((c) => c.trim())

  // Parse separator to detect alignment (for future use)
  const separatorCells = separatorLine
    .split('|')
    .filter((c) => c.trim())
    .map((c) => {
      const cell = c.trim()
      if (cell.startsWith(':') && cell.endsWith(':')) return 'center'
      if (cell.endsWith(':')) return 'right'
      return 'left'
    })

  // Build header row with proper th elements
  const theadHtml = `<thead><tr>${headerCells
    .map((c, i) => {
      const align = separatorCells[i] || 'left'
      return `<th style="text-align: ${align}">${c}</th>`
    })
    .join('')}</tr></thead>`

  // Build body rows with td elements
  const tbodyRows = dataLines
    .map((line) => {
      const cells = line
        .split('|')
        .filter((c) => c.trim())
        .map((c, i) => {
          const align = separatorCells[i] || 'left'
          return `<td style="text-align: ${align}">${c.trim()}</td>`
        })
      return `<tr>${cells.join('')}</tr>`
    })
    .join('')

  const tbodyHtml = `<tbody>${tbodyRows}</tbody>`

  return `<table>${theadHtml}${tbodyHtml}</table>`
}

/**
 * Format HTML content (markdown-like to HTML)
 */
function formatHtmlContent(content: string): string {
  // First, handle markdown tables specially
  // Match markdown tables (consecutive lines with | that include a separator line with ---)
  const tablePattern = /((?:^\|.+\|\s*$\n?)+)/gm
  let result = content.replace(tablePattern, (match) => {
    // Check if this block has a separator line (valid table)
    if (match.includes('---')) {
      return parseMarkdownTable(match)
    }
    return match
  })

  // Then handle other markdown elements
  result = result
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
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

        if (block.type === 'grandStaff') {
          return (
            <div key={`grandStaff-${index}`} className="grandstaff-renderer-wrapper">
              <InlineGrandStaff abc={block.content} title={block.title} />
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

        if (block.type === 'quiz' && block.question && block.options) {
          return (
            <div key={`quiz-${index}`} className="quiz-renderer-wrapper">
              <InlineQuiz
                question={block.question}
                options={block.options}
                correctIndex={block.correctIndex ?? 0}
                explanation={block.explanation}
              />
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
