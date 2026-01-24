import { useState, useEffect, useCallback } from 'react'
import { instrumentSampler } from '../services/InstrumentSampler'

/**
 * Hook to use the InstrumentSampler.
 * Automatically attempts to load samples on mount if not already loaded.
 * Provides playback functions.
 */
export const useInstrument = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(instrumentSampler.loaded)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!instrumentSampler.loaded) {
      instrumentSampler
        .load()
        .then(() => setIsLoaded(true))
        .catch((err) => {
          console.error('Error loading instrument in hook:', err)
          setError(err)
        })
    } else {
      setIsLoaded(true)
    }
  }, [])

  const playNote = useCallback(
    (note: string, duration?: string | number, time?: number, velocity?: number) => {
      instrumentSampler.playNote(note, duration, time, velocity)
    },
    []
  )

  const startNote = useCallback((note: string, time?: number, velocity?: number) => {
    instrumentSampler.startNote(note, time, velocity)
  }, [])

  const stopNote = useCallback((note: string, time?: number) => {
    instrumentSampler.stopNote(note, time)
  }, [])

  return {
    isLoaded,
    error,
    playNote,
    startNote,
    stopNote,
  }
}
