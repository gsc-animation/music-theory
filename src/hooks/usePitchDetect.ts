import { useState, useEffect, useCallback } from 'react'
import type { PitchDetectionResult } from '../services/PitchDetector'
import { pitchDetector } from '../services/PitchDetector'

interface UsePitchDetectReturn extends PitchDetectionResult {
  isListening: boolean
  error: Error | null
  startListening: () => Promise<void>
  stopListening: () => void
}

export function usePitchDetect(): UsePitchDetectReturn {
  const [data, setData] = useState<PitchDetectionResult>({
    frequency: null,
    note: null,
    cents: null,
    clarity: 0,
  })
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // Register callback
    const handlePitch = (result: PitchDetectionResult) => {
      // Only update if we have a valid detection to avoid flickering nulls too much
      // or implement a basic gate/smoothing here.
      // For now, raw update.
      setData(result)
    }

    if (isListening) {
      pitchDetector.addListener(handlePitch)
    }

    return () => {
      pitchDetector.removeListener(handlePitch)
    }
  }, [isListening])

  const startListening = useCallback(async () => {
    try {
      setError(null)
      await pitchDetector.initialize()
      pitchDetector.start()
      setIsListening(true)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to start pitch detection'))
      setIsListening(false)
    }
  }, [])

  const stopListening = useCallback(() => {
    pitchDetector.stop()
    setIsListening(false)
  }, [])

  return {
    ...data,
    isListening,
    error,
    startListening,
    stopListening,
  }
}
