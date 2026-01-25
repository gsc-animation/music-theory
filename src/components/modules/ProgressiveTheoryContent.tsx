import React, { useState, useRef, useEffect, useMemo } from 'react'
import { AbcRenderer } from '../abc/AbcRenderer'
import { InlineGuitar } from '../VirtualGuitar/InlineGuitar'
import { InlinePiano } from '../VirtualPiano/InlinePiano'
import { InlineFlute } from '../../features/sao-truc/components/InlineFlute'
import { InlineGrandStaff } from '../MusicStaff/InlineGrandStaff'
import { InlineQuiz } from './InlineQuiz'

interface ProgressiveTheoryContentProps {
  content: string
  onAllSectionsComplete?: () => void // Called when all sections are revealed
}

interface ContentBlock {
  type: 'html' | 'abc' | 'grandStaff' | 'guitar' | 'piano' | 'flute' | 'quiz'
  content: string
  title?: string
  notes?: string[]
  question?: string
  options?: string[]
  correctIndex?: number
  explanation?: string
}

/**
 * Split content into sections by "---" separator
 * Each section contains content blocks (html, abc, piano, guitar, flute, quiz)
 */
function splitIntoSections(content: string): string[] {
  return content
    .split(/\n---\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
}

/**
 * Parse a section's content into blocks
 */
function parseSectionContent(content: string): ContentBlock[] {
  const blocks: ContentBlock[] = []

  // Combined pattern for abc, grandStaff, guitar, piano, flute
  // Use [\s\S]+? to match multi-line content (for grandStaff with ABC notation)
  const combinedPattern = /\{\{(abc|grandStaff|guitar|piano|flute):([^|]+)\|([\s\S]+?)\}\}/g
  // Quiz pattern
  const quizPattern = /\{\{quiz:([^|]+)\|([^|]+)(?:\|([^}]+))?\}\}/g

  interface MatchInfo {
    index: number
    length: number
    block: ContentBlock
  }
  const allMatches: MatchInfo[] = []

  let match
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

  while ((match = quizPattern.exec(content)) !== null) {
    const question = match[1].trim()
    const optionsStr = match[2].trim()
    const explanation = match[3]?.trim()

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

  allMatches.sort((a, b) => a.index - b.index)

  let lastIndex = 0
  for (const matchInfo of allMatches) {
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
 * Parse markdown table to HTML
 */
function parseMarkdownTable(tableText: string): string {
  const lines = tableText.trim().split('\n')
  if (lines.length < 2) return tableText

  const headerLine = lines[0]
  const separatorLine = lines[1]
  const dataLines = lines.slice(2)

  if (!separatorLine.includes('---')) return tableText

  const headerCells = headerLine
    .split('|')
    .filter((c) => c.trim())
    .map((c) => c.trim())

  const separatorCells = separatorLine
    .split('|')
    .filter((c) => c.trim())
    .map((c) => {
      const cell = c.trim()
      if (cell.startsWith(':') && cell.endsWith(':')) return 'center'
      if (cell.endsWith(':')) return 'right'
      return 'left'
    })

  const theadHtml = `<thead><tr>${headerCells
    .map((c, i) => {
      const align = separatorCells[i] || 'left'
      return `<th style="text-align: ${align}">${c}</th>`
    })
    .join('')}</tr></thead>`

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

  return `<table><thead>${theadHtml}</thead><tbody>${tbodyRows}</tbody></table>`
}

/**
 * Format markdown to HTML
 */
function formatHtmlContent(content: string): string {
  const tablePattern = /((?:^\|.+\|\s*$\n?)+)/gm
  let result = content.replace(tablePattern, (match) => {
    if (match.includes('---')) {
      return parseMarkdownTable(match)
    }
    return match
  })

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
 * Check if a section contains a quiz block
 */
function sectionHasQuiz(blocks: ContentBlock[]): boolean {
  return blocks.some((b) => b.type === 'quiz')
}

/**
 * ProgressiveTheoryContent - Reveals content sections one-by-one
 * Next section unlocks after answering the current section's quiz
 */
export const ProgressiveTheoryContent: React.FC<ProgressiveTheoryContentProps> = ({
  content,
  onAllSectionsComplete,
}) => {
  const sections = useMemo(() => splitIntoSections(content), [content])
  const parsedSections = useMemo(() => sections.map(parseSectionContent), [sections])

  // Track which sections are visible
  const [visibleCount, setVisibleCount] = useState(1)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // Track which quizzes have been completed (by section index)
  const [completedQuizzes, setCompletedQuizzes] = useState<Set<number>>(new Set())
  
  // Track if user wants to bypass all quizzes and see all content
  const [bypassQuiz, setBypassQuiz] = useState(false)
  
  // Track if completion callback has been called
  const completionCalledRef = useRef(false)

  // Check if last section has a quiz
  const lastSectionHasQuiz = useMemo(() => {
    if (parsedSections.length === 0) return false
    return sectionHasQuiz(parsedSections[parsedSections.length - 1])
  }, [parsedSections])

  const handleQuizComplete = (sectionIndex: number) => {
    // Mark this quiz as completed
    setCompletedQuizzes((prev) => new Set([...prev, sectionIndex]))

    // Reveal next section
    if (sectionIndex === visibleCount - 1 && visibleCount < sections.length) {
      setVisibleCount((prev) => prev + 1)
    }

    // If this was the last section's quiz, trigger completion
    if (sectionIndex === sections.length - 1 && onAllSectionsComplete && !completionCalledRef.current) {
      completionCalledRef.current = true
      setTimeout(onAllSectionsComplete, 500)
    }
  }

  // Check for completion when all sections are visible AND last section has no quiz
  useEffect(() => {
    if (
      visibleCount === sections.length &&
      !lastSectionHasQuiz &&
      onAllSectionsComplete &&
      !completionCalledRef.current
    ) {
      completionCalledRef.current = true
      setTimeout(onAllSectionsComplete, 500)
    }
  }, [visibleCount, sections.length, lastSectionHasQuiz, onAllSectionsComplete])

  // Auto-scroll to newly revealed section
  useEffect(() => {
    if (visibleCount > 1) {
      const newSectionRef = sectionRefs.current[visibleCount - 1]
      if (newSectionRef) {
        setTimeout(() => {
          newSectionRef.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [visibleCount])

  const renderBlock = (block: ContentBlock, blockIndex: number, sectionIndex: number) => {
    if (block.type === 'abc') {
      return (
        <div key={`abc-${blockIndex}`} className="abc-renderer-wrapper">
          <AbcRenderer abc={block.content} title={block.title} />
        </div>
      )
    }

    if (block.type === 'guitar') {
      return (
        <div key={`guitar-${blockIndex}`} className="guitar-renderer-wrapper">
          <InlineGuitar title={block.title} highlightNotes={block.notes} />
        </div>
      )
    }

    if (block.type === 'piano') {
      return (
        <div key={`piano-${blockIndex}`} className="piano-renderer-wrapper">
          <InlinePiano title={block.title} highlightNotes={block.notes} />
        </div>
      )
    }

    if (block.type === 'flute') {
      return (
        <div key={`flute-${blockIndex}`} className="flute-renderer-wrapper">
          <InlineFlute title={block.title} highlightNotes={block.notes} />
        </div>
      )
    }

    if (block.type === 'grandStaff') {
      return (
        <div key={`grandstaff-${blockIndex}`} className="grandstaff-renderer-wrapper">
          <InlineGrandStaff title={block.title} abc={block.content} />
        </div>
      )
    }

    if (block.type === 'quiz' && block.question && block.options) {
      return (
        <div key={`quiz-${blockIndex}`} className="quiz-renderer-wrapper">
          <InlineQuiz
            question={block.question}
            options={block.options}
            correctIndex={block.correctIndex ?? 0}
            explanation={block.explanation}
            onComplete={() => handleQuizComplete(sectionIndex)}
          />
        </div>
      )
    }

    return (
      <div
        key={`html-${blockIndex}`}
        className="theory-formatted"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    )
  }

  // Handle bypass - show all content at once
  const handleBypassQuiz = () => {
    setBypassQuiz(true)
    setVisibleCount(sections.length)
    // Mark all sections as completed for bypass mode
    const allIndices = new Set(parsedSections.map((_, i) => i))
    setCompletedQuizzes(allIndices)
    // Trigger completion callback
    if (onAllSectionsComplete && !completionCalledRef.current) {
      completionCalledRef.current = true
      setTimeout(onAllSectionsComplete, 500)
    }
  }

  // Determine how many sections to show
  const effectiveVisibleCount = bypassQuiz ? sections.length : visibleCount

  return (
    <div className="progressive-theory-content">
      {parsedSections.slice(0, effectiveVisibleCount).map((blocks, sectionIndex) => {
        const isLast = sectionIndex === effectiveVisibleCount - 1
        const hasQuiz = sectionHasQuiz(blocks)
        const isQuizCompleted = completedQuizzes.has(sectionIndex) || bypassQuiz
        const showLockedIndicator = isLast && hasQuiz && !isQuizCompleted && effectiveVisibleCount < sections.length

        return (
          <div
            key={`section-${sectionIndex}`}
            ref={(el) => {
              sectionRefs.current[sectionIndex] = el
            }}
            className="theory-section"
            style={{
              animation: sectionIndex > 0 ? 'fadeIn 0.5s ease-out' : undefined,
            }}
          >
            {blocks.map((block, blockIndex) => renderBlock(block, blockIndex, sectionIndex))}

            {/* Show "more content locked" hint with bypass option */}
            {showLockedIndicator && (
              <div className="locked-hint-container">
                <div className="locked-hint">
                  <span className="locked-icon">🔒</span>
                  <span>Trả lời câu hỏi để tiếp tục...</span>
                </div>
                <button 
                  className="bypass-quiz-btn"
                  onClick={handleBypassQuiz}
                  title="Bỏ qua tất cả câu hỏi và xem toàn bộ nội dung"
                >
                  👁️ XEM TẤT CẢ NỘI DUNG
                </button>
              </div>
            )}
          </div>
        )
      })}

      <style>{`
        .progressive-theory-content .theory-section {
          margin-bottom: 1.5rem;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .locked-hint-container {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        
        .locked-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: rgba(100, 116, 139, 0.1);
          border: 1px dashed rgba(100, 116, 139, 0.3);
          border-radius: 8px;
          color: #94a3b8;
          font-size: 0.9rem;
        }
        
        .locked-hint .locked-icon {
          font-size: 1.1rem;
        }
        
        .bypass-quiz-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }
        
        .bypass-quiz-btn:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }
        
        .bypass-quiz-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.3);
        }
      `}</style>
    </div>
  )
}

export default ProgressiveTheoryContent
