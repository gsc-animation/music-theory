import React, { Suspense, lazy } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { GrandStaffView } from '../components/MusicStaff/GrandStaffView'

// Lazy load heavy components
const InlineAbcNotation = lazy(() => import('../components/modules/InlineAbcNotation'))
const VirtualPiano = lazy(() => import('../components/VirtualPiano/VirtualPiano'))
const VirtualGuitar = lazy(() =>
  import('../components/VirtualGuitar/VirtualGuitar').then((m) => ({ default: m.VirtualGuitar }))
)

/**
 * TestUIPage - Dedicated page for UI/UX testing
 *
 * This page is only for development and testing purposes.
 * It includes various UI components in isolation for easy debugging.
 *
 * Access: /test-ui
 */
const TestUIPage: React.FC = () => {
  // Placeholder handlers
  const handleStartNote = (note: string) => console.log('Start:', note)
  const handleStopNote = (note: string) => console.log('Stop:', note)
  const handlePlayNote = (note: string) => console.log('Play:', note)

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-8">
        {/* Page Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 pb-4">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            🧪 UI/UX Testing Page
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Isolated testing environment for Grand Staff, ABC notation, and instruments.
          </p>
        </div>

        {/* Section 1: Grand Staff View */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              📜 Grand Staff View
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test dark mode contrast, clefs, staff lines, and note rendering
            </p>
          </div>
          <GrandStaffView />
        </section>

        {/* Section 2: Inline ABC Notation */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              🎵 Inline ABC Notation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test ABC rendering, playback, and dark mode colors
            </p>
          </div>
          <div className="p-4 space-y-4">
            {/* Simple melody */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Simple melody (C major scale):
              </p>
              <Suspense
                fallback={
                  <div className="animate-pulse h-16 bg-slate-100 dark:bg-slate-700 rounded" />
                }
              >
                <InlineAbcNotation abc="L:1/4\nCDEF|GABC|" />
              </Suspense>
            </div>

            {/* Chord example */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Chords (C, F, G, C):
              </p>
              <Suspense
                fallback={
                  <div className="animate-pulse h-16 bg-slate-100 dark:bg-slate-700 rounded" />
                }
              >
                <InlineAbcNotation abc="L:1/2\n[CEG]2 [FAc]2 | [GBd]2 [CEG]2 |" />
              </Suspense>
            </div>

            {/* Complex example with key signature */}
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                Complex example (Jig in 6/8):
              </p>
              <Suspense
                fallback={
                  <div className="animate-pulse h-16 bg-slate-100 dark:bg-slate-700 rounded" />
                }
              >
                <InlineAbcNotation abc="T:Bonny Green\nR:jig\nM:6/8\nL:1/8\nK:G\nQ:1/4=180\nC:Traditional English Folk Song (Bucknell, England)\n|:D|GAB d2B|AGE G2E|DED GAB|AGE E2D|\nGAB d2B|AGE GAB|ded BAG|AGE G2:|" />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Section 3: Virtual Piano */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              🎹 Virtual Piano
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test key sizing, touch targets, and black key proportions
            </p>
          </div>
          <div className="p-4">
            <Suspense
              fallback={
                <div className="animate-pulse h-32 bg-slate-100 dark:bg-slate-700 rounded" />
              }
            >
              <VirtualPiano
                startOctave={3}
                octaves={3}
                onStartNote={handleStartNote}
                onStopNote={handleStopNote}
              />
            </Suspense>
          </div>
        </section>

        {/* Section 4: Virtual Guitar */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              🎸 Virtual Guitar
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test fretboard display scale, padding, and touch zones
            </p>
          </div>
          <div className="p-4">
            <Suspense
              fallback={
                <div className="animate-pulse h-24 bg-slate-100 dark:bg-slate-700 rounded" />
              }
            >
              <VirtualGuitar onPlayNote={handlePlayNote} />
            </Suspense>
          </div>
        </section>

        {/* Section 5: Theme Test Grid */}
        <section className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              🎨 Color Contrast Test
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Verify text and background contrast in light/dark modes
            </p>
          </div>
          <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded">
              <span className="text-slate-700 dark:text-slate-300 text-sm">slate-300</span>
            </div>
            <div className="p-3 bg-slate-200 dark:bg-slate-800 rounded">
              <span className="text-slate-700 dark:text-slate-200 text-sm">slate-200</span>
            </div>
            <div className="p-3 bg-primary/20 rounded">
              <span className="text-primary text-sm font-bold">Primary</span>
            </div>
            <div className="p-3 bg-emerald-500/20 rounded">
              <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">
                Success
              </span>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 dark:text-slate-500 py-4">
          💡 Use this page to test UI/UX changes before applying to production submodules.
        </div>
      </div>
    </AppLayout>
  )
}

export default TestUIPage
