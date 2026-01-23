import React from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { MainHeader } from '../components/layout/MainHeader'
import { useGameStore } from '../stores/useGameStore'
import { useAudioStore } from '../stores/useAudioStore'
import { useNotationStore } from '../stores/useNotationStore'
import { CollapsiblePanel } from '../components/ui/CollapsiblePanel'
import VirtualPiano from '../components/VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../components/VirtualGuitar/VirtualGuitar'
import { GameOverlay } from '../features/game/components/GameOverlay'
import { FeedbackOverlay } from '../components/GameLoop/FeedbackOverlay'
import { ConfettiExplosion } from '../components/ui/ConfettiExplosion'

const AbcGrandStaff = React.lazy(() => import('../components/MusicStaff/AbcGrandStaff'))
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)

/**
 * PracticePage - Free practice mode with all instruments
 */
export const PracticePage: React.FC = () => {
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)
  const activeNotes = useAudioStore((state) => state.activeNotes)
  const appendNote = useNotationStore((state) => state.appendNote)
  
  const isPlaying = useGameStore((state) => state.isPlaying)
  const streak = useGameStore((state) => state.streak)

  const [showConfetti, setShowConfetti] = React.useState(false)
  const [showNoteNames, setShowNoteNames] = React.useState(true)

  const handleStopNote = (note: string) => {
    stopNote(note)
    appendNote(note)
  }

  React.useEffect(() => {
    if (isPlaying && streak > 0 && streak % 10 === 0) {
      setShowConfetti(true)
    }
  }, [streak, isPlaying])

  return (
    <div className="flex h-screen bg-[#F5F7FA] dark:bg-[#121212] overflow-hidden">
      <Sidebar className="hidden md:flex" />

      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        <MainHeader />

        <GameOverlay />
        <FeedbackOverlay />
        <ConfettiExplosion run={showConfetti} onComplete={() => setShowConfetti(false)} />

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth no-scrollbar">
          {/* Practice Header */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[#30e8e8]">piano</span>
              Free Practice Mode
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
              Practice freely with all instruments. Use the "Start Practice" button in the sidebar for guided exercises.
            </p>
          </div>

          {/* Grand Staff */}
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
              <AbcGrandStaff showNoteNames={showNoteNames} />
            </React.Suspense>
          </CollapsiblePanel>

          {/* Guitar */}
          <CollapsiblePanel title="Guitar Fretboard" icon="music_note" defaultOpen>
            <VirtualGuitar
              activeNotes={activeNotes}
              onPlayNote={(note) => {
                startNote(note)
                setTimeout(() => handleStopNote(note), 200)
              }}
            />
          </CollapsiblePanel>

          {/* Flute */}
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

          {/* Piano */}
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
        </div>
      </main>
    </div>
  )
}

export default PracticePage
