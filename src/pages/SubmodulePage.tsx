import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  findSubmodule,
  findModule,
  getNextSubmodule,
  getPreviousSubmodule,
} from '../data/course-data'
import { useProgressStore } from '../stores/useProgressStore'
import { CollapsiblePanel } from '../components/ui/CollapsiblePanel'
import { MainHeader } from '../components/layout/MainHeader'
import { SubmoduleHeader } from '../components/layout/SubmoduleHeader'
import { AppLayout } from '../components/layout/AppLayout'

// Lazy load heavy components
const AbcGrandStaff = React.lazy(() => import('../components/MusicStaff/AbcGrandStaff'))
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)
const AbcDemoSection = React.lazy(() => import('../components/modules/AbcDemoSection'))
const ProgressiveTheoryContent = React.lazy(
  () => import('../components/modules/ProgressiveTheoryContent')
)

/**
 * SubmodulePage - Dynamic lesson page that shows/hides sections based on submodule config
 */
export const SubmodulePage: React.FC = () => {
  const { moduleId, submoduleId } = useParams<{ moduleId: string; submoduleId: string }>()
  const navigate = useNavigate()

  const { setCurrentPosition, completeSubmodule, isSubmoduleCompleted } = useProgressStore()

  const [showNoteNames, setShowNoteNames] = React.useState(false)
  const [theoryComplete, setTheoryComplete] = React.useState(false)
  const interactiveRef = React.useRef<HTMLDivElement>(null)

  // Progress dots state
  const [totalSections, setTotalSections] = React.useState(0)
  const [visibleCount, setVisibleCount] = React.useState(0)
  const [currentSection, setCurrentSection] = React.useState(0)
  const [scrollToSection, setScrollToSection] = React.useState<number | undefined>(undefined)
  const [revealUpToSection, setRevealUpToSection] = React.useState<number | undefined>(undefined)

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
      <AppLayout>
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
      </AppLayout>
    )
  }

  return (
    <AppLayout showMobileNav={true}>
      <SubmoduleHeader
        moduleId={module.id}
        submoduleId={submodule.id}
        isCompleted={isSubmoduleCompleted}
        totalSections={submodule.sections.length}
        visibleCount={visibleCount} // Assuming visibleSectionCount is meant to be visibleCount
        currentSection={currentSection} // Assuming currentSectionIndex is meant to be currentSection
        onDotClick={(index) => { // Assuming handleDotClick is meant to be this inline function
          if (isCompleted) {
            // For completed submodules, reveal all sections up to clicked index
            setRevealUpToSection(index)
            setTimeout(() => setRevealUpToSection(undefined), 100)
          } else {
            // For incomplete submodules, just scroll to the section (if unlocked)
            setScrollToSection(index)
            setTimeout(() => setScrollToSection(undefined), 100)
          }
        }}
      />

      {/* Container - full width on mobile with padding only on desktop */}
      <div className="md:p-4 space-y-4">
        {/* Lesson Content Card - edge-to-edge on mobile */}
        <div className="relative bg-white dark:bg-slate-800/95 md:rounded-2xl overflow-hidden md:shadow-lg shadow-slate-900/5 dark:shadow-black/20 md:border border-slate-200/80 dark:border-slate-700/80">
          {/* Gradient accent */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#30e8e8] via-[#26d4d4] to-[#1f9d9d]" />

          <div className="p-5 pb-6">
            {/* Submodule Title and Description */}
            <div className="mb-6">
              <h1
                data-testid="submodule-title"
                className="text-2xl font-bold text-slate-900 dark:text-white mb-2"
              >
                {submodule.title}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {submodule.description}
              </p>
            </div>

            {/* Theory Content with Inline Demos - Progressive Reveal */}
            {hasSection('theory') && submodule.theoryContent && (
              <React.Suspense fallback={<div className="text-slate-400">Loading content...</div>}>
                <ProgressiveTheoryContent
                  key={submodule.id} // Force remount on submodule change to reset state
                  submoduleId={submodule.id}
                  content={submodule.theoryContent}
                  onAllSectionsComplete={() => {
                    setTheoryComplete(true)
                    // Auto-scroll to interactive section after delay
                    setTimeout(() => {
                      interactiveRef.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }, 300)
                  }}
                  onVisibleCountChange={(visible, total) => {
                    setVisibleCount(visible)
                    setTotalSections(total)
                  }}
                  onCurrentSectionChange={setCurrentSection}
                  externalScrollToSection={scrollToSection}
                  externalRevealUpToSection={revealUpToSection}
                />

                {/* Inline Grand Staff - embedded within theory card */}
                {hasSection('grandStaff') && (
                  <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[#30e8e8]">
                            music_note
                          </span>
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                            Grand Staff View
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-7">
                          🎵 Ứng dụng trong một bản nhạc thực tế
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

                {/* Inline ABC Demos - revealed after theory complete */}
                {theoryComplete &&
                  hasSection('abcDemo') &&
                  submodule.abcDemos &&
                  submodule.abcDemos.length > 0 && (
                    <div
                      ref={interactiveRef}
                      className="mt-6"
                      style={{ animation: 'fadeIn 0.5s ease-out' }}
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <span className="material-symbols-outlined text-[#30e8e8]">
                          play_circle
                        </span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wide">
                          Interactive Examples
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                          🎉 Mở khóa!
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

            {/* Sáo Trúc Visualizer */}
            {hasSection('saoTruc') && (
              <div className="mt-6">
                <CollapsiblePanel
                  title="Sáo Trúc (Vietnamese Bamboo Flute)"
                  icon="graphic_eq"
                  defaultOpen={false}
                >
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
              </div>
            )}

            {/* Completion Badge */}
            {isCompleted && (
              <div className="mt-8 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-3xl">
                    check_circle
                  </span>
                  <div>
                    <h4 className="font-bold text-emerald-900 dark:text-emerald-100">
                      Lesson Completed! 🎉
                    </h4>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                      Great job! Continue to the next lesson.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex gap-4">
              {prevSubmodule && (
                <button
                  onClick={() => {
                    const prevModuleId = parseInt(prevSubmodule.id.split('.')[0])
                    navigate(`/module/${prevModuleId}/${prevSubmodule.id}`)
                  }}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  ← Previous
                </button>
              )}
              {nextSubmodule && (
                <button
                  onClick={handleComplete}
                  className="flex-1 px-4 py-3 bg-[#30e8e8] text-[#111818] rounded-lg font-medium hover:bg-[#26d4d4] transition-colors"
                >
                  {isCompleted ? 'Next Lesson →' : 'Complete & Continue →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default SubmodulePage
