import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { findSubmodule, findModule, getNextSubmodule, getPreviousSubmodule } from '../data/course-data'
import { useProgressStore } from '../stores/useProgressStore'
import { useAudioStore } from '../stores/useAudioStore'
import { useNotationStore } from '../stores/useNotationStore'
import { CollapsiblePanel } from '../components/ui/CollapsiblePanel'
import { MainHeader } from '../components/layout/MainHeader'
import { Sidebar } from '../components/layout/Sidebar'
import VirtualPiano from '../components/VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../components/VirtualGuitar/VirtualGuitar'

// Lazy load heavy components
const AbcGrandStaff = React.lazy(() => import('../components/MusicStaff/AbcGrandStaff'))
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)
const AbcDemoSection = React.lazy(() => import('../components/modules/AbcDemoSection'))
const NoteIdentificationQuiz = React.lazy(() => import('../components/modules/NoteIdentificationQuiz'))

/**
 * SubmodulePage - Dynamic lesson page that shows/hides sections based on submodule config
 */
export const SubmodulePage: React.FC = () => {
  const { moduleId, submoduleId } = useParams<{ moduleId: string; submoduleId: string }>()
  const navigate = useNavigate()
  
  const { setCurrentPosition, completeSubmodule, isSubmoduleCompleted } = useProgressStore()
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const appendNote = useNotationStore((state) => state.appendNote)

  const [showNoteNames, setShowNoteNames] = React.useState(false)

  // Get current submodule data
  const submodule = submoduleId ? findSubmodule(submoduleId) : undefined
  const module = moduleId ? findModule(parseInt(moduleId)) : undefined
  const nextSubmodule = submoduleId ? getNextSubmodule(submoduleId) : undefined
  const prevSubmodule = submoduleId ? getPreviousSubmodule(submoduleId) : undefined
  const isCompleted = submoduleId ? isSubmoduleCompleted(submoduleId) : false

  // Update current position when page loads
  React.useEffect(() => {
    if (moduleId && submoduleId) {
      setCurrentPosition(parseInt(moduleId), submoduleId)
    }
  }, [moduleId, submoduleId, setCurrentPosition])

  const handleStopNote = (note: string) => {
    stopNote(note)
    appendNote(note)
  }

  const handleComplete = () => {
    if (submoduleId) {
      completeSubmodule(submoduleId)
      // Navigate to next submodule if available
      if (nextSubmodule) {
        const nextModuleId = parseInt(nextSubmodule.id.split('.')[0])
        navigate(`/module/${nextModuleId}/${nextSubmodule.id}`)
      }
    }
  }

  const hasSection = (section: string) => submodule?.sections.includes(section as never)

  if (!submodule || !module) {
    return (
      <div className="flex h-screen bg-[#F5F7FA] dark:bg-[#121212]">
        <Sidebar className="hidden md:flex" />
        <main className="flex-1 flex flex-col h-full min-w-0">
          <MainHeader />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600">
                error_outline
              </span>
              <h2 className="text-xl font-bold mt-4 text-slate-700 dark:text-slate-200">
                Submodule not found
              </h2>
              <button
                onClick={() => navigate('/')}
                className="mt-4 px-4 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-medium hover:bg-[#26d4d4] transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F5F7FA] dark:bg-[#121212] overflow-hidden">
      <Sidebar className="hidden md:flex" />

      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        <MainHeader />

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth no-scrollbar">
          {/* Submodule Header */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-1">
                  <span>Module {module.id}: {module.name}</span>
                  <span>•</span>
                  <span>Lesson {submodule.id}</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  {submodule.title}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                  {submodule.description}
                </p>
              </div>
              {isCompleted && (
                <span className="flex items-center gap-1 text-emerald-500 text-sm font-medium">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* Theory Section */}
          {hasSection('theory') && submodule.theoryContent && (
            <CollapsiblePanel title="Theory" icon="menu_book" defaultOpen>
              <div className="prose prose-sm dark:prose-invert max-w-none
                prose-headings:text-slate-800 dark:prose-headings:text-slate-100
                prose-p:text-slate-600 dark:prose-p:text-slate-300
                prose-strong:text-slate-800 dark:prose-strong:text-slate-100
                prose-table:text-sm
                prose-th:bg-slate-100 dark:prose-th:bg-slate-700
                prose-td:border-slate-200 dark:prose-td:border-slate-600
              ">
                <div dangerouslySetInnerHTML={{ 
                  __html: formatTheoryContent(submodule.theoryContent) 
                }} />
              </div>
            </CollapsiblePanel>
          )}

          {/* Grand Staff Section */}
          {hasSection('grandStaff') && (
            <CollapsiblePanel
              title="Grand Staff View"
              icon="music_note"
              defaultOpen
              headerExtra={
                <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                  <input
                    type="checkbox"
                    checked={showNoteNames}
                    onChange={(e) => setShowNoteNames(e.target.checked)}
                    className="w-3 h-3 accent-[#30e8e8]"
                  />
                  <span>Notes</span>
                </label>
              }
            >
              <React.Suspense
                fallback={
                  <div className="w-full h-[150px] flex items-center justify-center text-slate-400">
                    Loading staff...
                  </div>
                }
              >
                <AbcGrandStaff 
                  showNoteNames={showNoteNames}
                  overrideAbc={submodule.staffAbc}
                />
              </React.Suspense>
            </CollapsiblePanel>
          )}

          {/* ABC Demos Section */}
          {hasSection('abcDemo') && submodule.abcDemos && submodule.abcDemos.length > 0 && (
            <CollapsiblePanel title="Interactive Examples" icon="play_circle" defaultOpen>
              <React.Suspense
                fallback={
                  <div className="w-full h-32 flex items-center justify-center text-slate-400">
                    Loading demos...
                  </div>
                }
              >
                <AbcDemoSection demos={submodule.abcDemos} />
              </React.Suspense>
            </CollapsiblePanel>
          )}

          {/* Guitar Fretboard */}
          {hasSection('guitar') && (
            <CollapsiblePanel title="Guitar Fretboard" icon="music_note" defaultOpen>
              <VirtualGuitar
                activeNotes={activeNotes}
                onPlayNote={(note) => {
                  startNote(note)
                  setTimeout(() => handleStopNote(note), 200)
                }}
              />
            </CollapsiblePanel>
          )}

          {/* Flute */}
          {hasSection('flute') && (
            <CollapsiblePanel title="Flute" icon="graphic_eq" defaultOpen>
              <React.Suspense
                fallback={
                  <div className="w-full h-16 flex items-center justify-center text-slate-400">
                    Loading...
                  </div>
                }
              >
                <HorizontalSaoTrucVisualizer />
              </React.Suspense>
            </CollapsiblePanel>
          )}

          {/* Piano */}
          {hasSection('piano') && (
            <CollapsiblePanel title="Piano Visualization" icon="piano" defaultOpen>
              <div className="flex justify-end mb-2">
                <span className="text-[9px] text-slate-400 uppercase font-medium tracking-wide">
                  3 Octave Interactive Range
                </span>
              </div>
              <VirtualPiano
                startOctave={3}
                octaves={3}
                onStartNote={startNote}
                onStopNote={handleStopNote}
                activeNotes={activeNotes}
              />
            </CollapsiblePanel>
          )}

          {/* Practice Quiz Section */}
          {submodule.exercises && submodule.exercises.length > 0 && (
            <CollapsiblePanel title="Practice Quiz" icon="quiz" defaultOpen>
              <React.Suspense
                fallback={
                  <div className="w-full h-32 flex items-center justify-center text-slate-400">
                    Loading quiz...
                  </div>
                }
              >
                {submodule.exercises.map((exercise, idx) => {
                  if (exercise.type === 'note-id' && exercise.notes) {
                    return (
                      <NoteIdentificationQuiz
                        key={`${submodule.id}-quiz-${idx}`}
                        submoduleId={submodule.id}
                        notes={exercise.notes}
                        questionCount={exercise.questionCount || 5}
                      />
                    )
                  }
                  return null
                })}
              </React.Suspense>
            </CollapsiblePanel>
          )}

          {/* Navigation and Complete Button */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between">
              {/* Previous Button */}
              <button
                onClick={() => {
                  if (prevSubmodule) {
                    const prevModuleId = parseInt(prevSubmodule.id.split('.')[0])
                    navigate(`/module/${prevModuleId}/${prevSubmodule.id}`)
                  }
                }}
                disabled={!prevSubmodule}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                  ${prevSubmodule
                    ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  }
                `}
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Previous
              </button>

              {/* Complete / Next Button */}
              {!isCompleted ? (
                <button
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-6 py-2 bg-emerald-500 text-white rounded-lg font-bold hover:bg-emerald-600 transition-colors"
                >
                  <span className="material-symbols-outlined">check</span>
                  Mark Complete
                </button>
              ) : nextSubmodule ? (
                <button
                  onClick={() => {
                    const nextModuleId = parseInt(nextSubmodule.id.split('.')[0])
                    navigate(`/module/${nextModuleId}/${nextSubmodule.id}`)
                  }}
                  className="flex items-center gap-2 px-6 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors"
                >
                  Next Lesson
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              ) : (
                <span className="text-emerald-500 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">celebration</span>
                  Course Complete!
                </span>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

/**
 * Simple markdown-like formatting for theory content
 */
function formatTheoryContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Tables (simple support)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim())
      const isHeader = cells.some(c => c.includes('---'))
      if (isHeader) return ''
      const tag = 'td'
      const cellHtml = cells.map(c => `<${tag} class="px-3 py-2 border border-slate-200 dark:border-slate-600">${c.trim()}</${tag}>`).join('')
      return `<tr>${cellHtml}</tr>`
    })
    // Wrap tables
    .replace(/(<tr>[\s\S]*?<\/tr>)+/g, '<table class="w-full border-collapse my-4"><tbody>$&</tbody></table>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br>')
    // Wrap in paragraph
    .replace(/^/, '<p class="mb-3">')
    .replace(/$/, '</p>')
}

export default SubmodulePage
