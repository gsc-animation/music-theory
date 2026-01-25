import React from 'react'
import { useGameStore } from '../stores/useGameStore'
import { GameOverlay } from '../features/game/components/GameOverlay'
import { FeedbackOverlay } from '../components/GameLoop/FeedbackOverlay'
import { ConfettiExplosion } from '../components/ui/ConfettiExplosion'
import { Sidebar } from '../components/layout/Sidebar'
import { MainHeader } from '../components/layout/MainHeader'
import { CollapsiblePanel } from '../components/ui/CollapsiblePanel'
import { requestPersistentStorage, getStorageEstimate } from '../services/storage-manager'

const AbcGrandStaff = React.lazy(() => import('../components/MusicStaff/AbcGrandStaff'))
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)
const ModuleContent = React.lazy(() => import('../components/modules/ModuleContent'))
const StaffRangeVisualTest = React.lazy(
  () => import('../components/MusicStaff/StaffRangeVisualTest')
)

export const HomePage: React.FC = () => {
  const isPlaying = useGameStore((state) => state.isPlaying)
  const streak = useGameStore((state) => state.streak)

  const [showConfetti, setShowConfetti] = React.useState(false)
  const [showNoteNames, setShowNoteNames] = React.useState(false)

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

  React.useEffect(() => {
    if (isPlaying && streak > 0 && streak % 10 === 0) {
      setShowConfetti(true)
    }
  }, [streak, isPlaying])

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] dark:bg-[#121212]">
      {/* Sidebar */}
      <Sidebar className="hidden md:flex" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <MainHeader />

        <GameOverlay />
        <FeedbackOverlay />
        <ConfettiExplosion run={showConfetti} onComplete={() => setShowConfetti(false)} />

        <div className="flex-1 p-4 space-y-3">
          {/* Music Staff */}
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

          {/* Staff Range Test - Piano & Guitar */}
          <CollapsiblePanel title="Staff Range Test (ABC)" icon="music_note" defaultOpen={false}>
            <React.Suspense
              fallback={
                <div className="w-full h-32 flex items-center justify-center text-slate-400">
                  Loading staff range test...
                </div>
              }
            >
              <StaffRangeVisualTest />
            </React.Suspense>
          </CollapsiblePanel>
        </div>
      </main>
    </div>
  )
}

export default HomePage
