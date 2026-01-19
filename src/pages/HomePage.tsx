import React from 'react'
import { useAudioStore } from '../stores/useAudioStore'
import { useGameStore } from '../stores/useGameStore'
import { useNotationStore } from '../stores/useNotationStore'
import { GameOverlay } from '../features/game/components/GameOverlay'
import { FeedbackOverlay } from '../components/GameLoop/FeedbackOverlay'
import { ConfettiExplosion } from '../components/ui/ConfettiExplosion'
import { Sidebar } from '../components/layout/Sidebar'
import { MainHeader } from '../components/layout/MainHeader'
import { CollapsiblePanel } from '../components/ui/CollapsiblePanel'
import { requestPersistentStorage, getStorageEstimate } from '../services/storage-manager'
import VirtualPiano from '../components/VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../components/VirtualGuitar/VirtualGuitar'

const GrandStaffView = React.lazy(() => import('../components/MusicStaff/GrandStaffView'))
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)
const ModuleContent = React.lazy(() => import('../components/modules/ModuleContent'))

export const HomePage: React.FC = () => {
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)
  const activeNotes = useAudioStore((state) => state.activeNotes)

  const isPlaying = useGameStore((state) => state.isPlaying)
  const streak = useGameStore((state) => state.streak)

  const appendNote = useNotationStore((state) => state.appendNote)

  const [showConfetti, setShowConfetti] = React.useState(false)

  React.useEffect(() => {
    const initStorage = async () => {
      await requestPersistentStorage()
      if (import.meta.env.DEV) {
        const stats = await getStorageEstimate()
        if (stats) {
          console.log(
            `Storage: ${(stats.usage / 1024 / 1024).toFixed(2)} / ${(stats.quota / 1024 / 1024).toFixed(2)} MB`
          )
        }
      }
    }
    initStorage()
  }, [])

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
      {/* Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        <MainHeader />

        <GameOverlay />
        <FeedbackOverlay />
        <ConfettiExplosion run={showConfetti} onComplete={() => setShowConfetti(false)} />

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scroll-smooth no-scrollbar">
          {/* Music Staff */}
          <CollapsiblePanel title="Grand Staff View" icon="music_note" defaultOpen>
            <React.Suspense
              fallback={
                <div className="w-full h-[150px] flex items-center justify-center text-slate-400">
                  Loading staff...
                </div>
              }
            >
              <GrandStaffView />
            </React.Suspense>
          </CollapsiblePanel>

          {/* Guitar Fretboard */}
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

          {/* Module-specific content (Topics, Theory Panel) */}
          <React.Suspense
            fallback={
              <div className="w-full h-32 flex items-center justify-center text-slate-400">
                Loading module content...
              </div>
            }
          >
            <ModuleContent />
          </React.Suspense>
        </div>
      </main>
    </div>
  )
}

export default HomePage
