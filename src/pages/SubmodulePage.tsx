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
const GameQuiz = React.lazy(() => import('../components/modules/GameQuiz'))
const TheoryContent = React.lazy(() => import('../components/modules/TheoryContent'))

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
          {/* Unified Lesson Card - Header + Theory + Inline Demos */}
          <div className="relative bg-white dark:bg-slate-800/95 rounded-2xl overflow-hidden shadow-lg shadow-slate-900/5 dark:shadow-black/20 border border-slate-200/80 dark:border-slate-700/80">
            {/* Gradient accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#30e8e8] via-[#26d4d4] to-[#1f9d9d]" />
            
            <div className="p-5 pb-6">
              {/* Header Section */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex-1">
                  {/* Breadcrumb */}
                  <div className="flex items-center gap-2 text-xs font-medium mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#30e8e8]/10 text-[#1f9d9d] dark:bg-[#30e8e8]/20 dark:text-[#30e8e8]">
                      <span className="material-symbols-outlined text-sm">folder</span>
                      Module {module.id}: {module.name}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">›</span>
                    <span className="text-slate-500 dark:text-slate-400">Lesson {submodule.id}</span>
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {submodule.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {submodule.description}
                  </p>
                </div>
                
                {/* Completion badge */}
                {isCompleted && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30">
                    <span 
                      className="material-symbols-outlined text-emerald-500 text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                      Completed
                    </span>
                  </div>
                )}
              </div>

              {/* Divider */}
              {hasSection('theory') && submodule.theoryContent && (
                <div className="border-t border-slate-200 dark:border-slate-700 mb-6" />
              )}

              {/* Theory Content with Inline Demos */}
              {hasSection('theory') && submodule.theoryContent && (
                <React.Suspense fallback={<div className="text-slate-400">Loading content...</div>}>
                  <TheoryContent content={submodule.theoryContent} />
                  
                  {/* Inline Grand Staff - embedded within theory card */}
                  {hasSection('grandStaff') && (
                    <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#30e8e8]">music_note</span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                            Grand Staff View
                          </span>
                        </div>
                        <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                          <input
                            type="checkbox"
                            checked={showNoteNames}
                            onChange={(e) => setShowNoteNames(e.target.checked)}
                            className="w-3 h-3 accent-[#30e8e8]"
                          />
                          <span>Notes</span>
                        </label>
                      </div>
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
                    </div>
                  )}

                  {/* Inline ABC Demos - embedded within theory card */}
                  {hasSection('abcDemo') && submodule.abcDemos && submodule.abcDemos.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-[#30e8e8]">play_circle</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                          Interactive Examples
                        </span>
                      </div>
                      <React.Suspense
                        fallback={
                          <div className="w-full h-32 flex items-center justify-center text-slate-400">
                            Loading demos...
                          </div>
                        }
                      >
                        <AbcDemoSection demos={submodule.abcDemos} />
                      </React.Suspense>
                    </div>
                  )}
                </React.Suspense>
              )}

              {/* If no theory content, show Grand Staff separately */}
              {!hasSection('theory') && hasSection('grandStaff') && (
                <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#30e8e8]">music_note</span>
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                        Grand Staff View
                      </span>
                    </div>
                    <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={showNoteNames}
                        onChange={(e) => setShowNoteNames(e.target.checked)}
                        className="w-3 h-3 accent-[#30e8e8]"
                      />
                      <span>Notes</span>
                    </label>
                  </div>
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
                </div>
              )}
            </div>
          </div>

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
                      <GameQuiz
                        key={`${submodule.id}-quiz-${idx}`}
                        submoduleId={submodule.id}
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

export default SubmodulePage

