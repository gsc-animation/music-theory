import React from 'react'
import VirtualPiano from '../components/VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../components/VirtualGuitar/VirtualGuitar'
import { useAudioStore } from '../stores/useAudioStore'
import { useGameStore } from '../stores/useGameStore'
import { GameOverlay } from '../features/game/components/GameOverlay'
import { FeedbackEffects } from '../components/ui/FeedbackEffects'
import { FeedbackOverlay } from '../components/GameLoop/FeedbackOverlay'
import { ConfettiExplosion } from '../components/ui/ConfettiExplosion'
import { Sidebar } from '../components/layout/Sidebar'
import { ControlsBar } from '../components/ui/ControlsBar'
import { requestPersistentStorage, getStorageEstimate } from '../services/storage-manager'

const MusicStaff = React.lazy(() => import('../components/MusicStaff/MusicStaff').then(module => ({ default: module.MusicStaff })))
const HorizontalSaoTrucVisualizer = React.lazy(() => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer'))

export const HomePage: React.FC = () => {
  const recordedNotes = useAudioStore((state) => state.recordedNotes)
  const startNote = useAudioStore((state) => state.startNote)
  const stopNote = useAudioStore((state) => state.stopNote)
  const timeSignature = useAudioStore((state) => state.timeSignature)
  const playSuccess = useAudioStore((state) => state.playSuccess)
  const playFailure = useAudioStore((state) => state.playFailure)

  // Game Store
  const isPlaying = useGameStore((state) => state.isPlaying)
  const targetNote = useGameStore((state) => state.targetNote)
  const checkAnswer = useGameStore((state) => state.checkAnswer)
  const streak = useGameStore((state) => state.streak)

  const [lastResult, setLastResult] = React.useState<'success' | 'failure' | null>(null)
  const [resultTimestamp, setResultTimestamp] = React.useState(0)
  const [showConfetti, setShowConfetti] = React.useState(false)

  // Initialize storage durability and log stats in dev
  React.useEffect(() => {
    const initStorage = async () => {
      await requestPersistentStorage()
      if (import.meta.env.DEV) {
        const stats = await getStorageEstimate()
        if (stats) {
          console.log(`Storage Usage: ${(stats.usage / 1024 / 1024).toFixed(2)} MB`)
          console.log(`Storage Quota: ${(stats.quota / 1024 / 1024).toFixed(2)} MB`)
        }
      }
    }
    initStorage()
  }, [])

  // Wrap stopNote to check answer in game mode
  const handleStopNote = (note: string) => {
    stopNote(note)
    if (isPlaying) {
      const isCorrect = checkAnswer(note, Date.now())
      setLastResult(isCorrect ? 'success' : 'failure')
      setResultTimestamp(Date.now())

      if (isCorrect) {
        playSuccess()
      } else {
        playFailure()
      }
    }
  }

  React.useEffect(() => {
    if (isPlaying && streak > 0 && streak % 10 === 0) {
      setShowConfetti(true)
    }
  }, [streak, isPlaying])

  // Calculate note limit based on 4 measures (queue behavior)
  const beatsPerMeasure = timeSignature === '3/4' ? 3 : 4
  const maxMeasures = 4
  const noteLimit = beatsPerMeasure * maxMeasures

  // Calculate dropping based on measure alignment (Shift by full measures when full)
  const overflow = Math.max(0, recordedNotes.length - noteLimit)
  const notesToDrop = Math.ceil(overflow / beatsPerMeasure) * beatsPerMeasure

  const staffNotes = recordedNotes.slice(notesToDrop).length > 0
    ? recordedNotes.slice(notesToDrop).map(n => n.toLowerCase() + '/q')
    : ['b4/w/r']

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#e0f5f5] to-[#c5e8e8] overflow-hidden">
      {/* Sidebar */}
      <Sidebar className="hidden md:flex flex-shrink-0" />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto p-4 gap-4">
        <GameOverlay />
        <FeedbackOverlay />
        <FeedbackEffects lastResult={lastResult} timestamp={resultTimestamp} />
        <ConfettiExplosion run={showConfetti} onComplete={() => setShowConfetti(false)} />

        {/* Music Staff */}
        <section className="w-full">
          <React.Suspense fallback={<div className="w-full h-[200px] flex items-center justify-center text-gray-500 bg-white rounded-xl shadow-sm">Loading staff...</div>}>
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200/50">
              <MusicStaff
                notes={staffNotes}
                clef="treble"
                timeSignature={timeSignature}
                highlightNote={isPlaying ? targetNote : null}
              />
            </div>
          </React.Suspense>
        </section>

        {/* Piano */}
        <section className="w-full">
          <div className="bg-white rounded-xl shadow-sm p-3 border border-gray-200/50">
            <VirtualPiano
              startOctave={3}
              octaves={3}
              onStartNote={startNote}
              onStopNote={handleStopNote}
            />
          </div>
        </section>

        {/* Controls Bar */}
        <section className="w-full">
          <ControlsBar />
        </section>

        {/* Sáo Trúc (Horizontal) */}
        <section className="w-full">
          <React.Suspense fallback={<div className="w-full h-16 flex items-center justify-center text-gray-500">Loading...</div>}>
            <HorizontalSaoTrucVisualizer />
          </React.Suspense>
        </section>

        {/* Guitar */}
        <section className="w-full">
          <VirtualGuitar
            activeNotes={Array.from(useAudioStore.getState().activeNotes)}
            onPlayNote={(note) => {
              startNote(note)
              setTimeout(() => handleStopNote(note), 200)
            }}
          />
        </section>
      </main>
    </div>
  )
}
