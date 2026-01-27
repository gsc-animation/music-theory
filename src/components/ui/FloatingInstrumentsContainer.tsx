import React, { Suspense, useCallback } from 'react'
import { useFloatingInstrumentsStore } from '../../stores/useFloatingInstrumentsStore'
import { useAudioStore } from '../../stores/useAudioStore'
import { FloatingInstrumentPanel } from './FloatingInstrumentPanel'
import { FloatingInstrumentsToolbar } from './FloatingInstrumentsToolbar'

// Lazy load instrument components
const VirtualPiano = React.lazy(() => import('../VirtualPiano/VirtualPiano'))
const VirtualGuitar = React.lazy(() =>
  import('../VirtualGuitar/VirtualGuitar').then((m) => ({ default: m.VirtualGuitar }))
)
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)

const LoadingFallback = () => (
  <div className="w-full h-24 flex items-center justify-center text-slate-400 text-sm">
    Loading...
  </div>
)

/**
 * FloatingInstrumentsContainer - Renders floating instrument panels and toolbar
 * Should be placed at the app root level to be always available
 */
export const FloatingInstrumentsContainer: React.FC = () => {
  const { instruments } = useFloatingInstrumentsStore()
  const { activeNotes, startNote, stopNote, playNote, releaseNote } = useAudioStore()

  // Handler for Piano (uses start/stop)
  const handleStartNote = useCallback(
    (note: string) => {
      startNote(note)
    },
    [startNote]
  )

  const handleStopNote = useCallback(
    (note: string) => {
      stopNote(note)
    },
    [stopNote]
  )

  // Handler for Guitar (uses playNote)
  const handlePlayNote = useCallback(
    (note: string) => {
      playNote(note)
      setTimeout(() => releaseNote(note), 200)
    },
    [playNote, releaseNote]
  )

  return (
    <>
      {/* Piano Panel - 3 octaves on all devices */}
      {instruments.piano.isVisible && (
        <FloatingInstrumentPanel type="piano" title="Piano" icon="piano">
          <Suspense fallback={<LoadingFallback />}>
            <VirtualPiano
              startOctave={3}
              octaves={3}
              activeNotes={activeNotes}
              onStartNote={handleStartNote}
              onStopNote={handleStopNote}
            />
          </Suspense>
        </FloatingInstrumentPanel>
      )}

      {/* Guitar Panel */}
      {instruments.guitar.isVisible && (
        <FloatingInstrumentPanel type="guitar" title="Guitar" icon="music_note">
          <Suspense fallback={<LoadingFallback />}>
            <VirtualGuitar activeNotes={activeNotes} onPlayNote={handlePlayNote} />
          </Suspense>
        </FloatingInstrumentPanel>
      )}

      {/* Flute Panel - uses internal stores, no props needed */}
      {instruments.flute.isVisible && (
        <FloatingInstrumentPanel type="flute" title="Sáo Trúc" icon="flute">
          <Suspense fallback={<LoadingFallback />}>
            <HorizontalSaoTrucVisualizer />
          </Suspense>
        </FloatingInstrumentPanel>
      )}

      {/* Toolbar */}
      <FloatingInstrumentsToolbar />
    </>
  )
}

export default FloatingInstrumentsContainer
