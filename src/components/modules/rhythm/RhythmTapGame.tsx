import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react'
import { useAudioStore } from '../../../stores/useAudioStore'

interface RhythmTapGameProps {
  submoduleId: string
  onComplete?: (score: number, total: number) => void
}

/**
 * Timing tolerance levels (configurable for UX)
 */
type TimingTolerance = 50 | 100 | 150

interface TimingConfig {
  perfect: number
  good: number
  ok: number
  label: string
}

const TIMING_CONFIGS: Record<TimingTolerance, TimingConfig> = {
  50: { perfect: 50, good: 100, ok: 150, label: 'Hard (±50ms)' },
  100: { perfect: 100, good: 150, ok: 200, label: 'Normal (±100ms)' },
  150: { perfect: 150, good: 200, ok: 250, label: 'Easy (±150ms)' },
}

/**
 * Rhythm patterns
 */
interface RhythmPattern {
  id: string
  name: string
  nameVi: string
  beats: number[] // Beat timings relative to bar start (0-based in beats)
  bpm: number
  description: string
}

const PATTERNS: RhythmPattern[] = [
  // Level 1: Quarter notes only
  {
    id: 'quarters-4',
    name: 'Four Quarters',
    nameVi: '4 nốt đen',
    beats: [0, 1, 2, 3],
    bpm: 80,
    description: 'Tap on every beat: 1-2-3-4',
  },
  {
    id: 'quarters-3',
    name: 'Waltz',
    nameVi: 'Nhịp Waltz',
    beats: [0, 1, 2],
    bpm: 80,
    description: 'Tap on every beat: 1-2-3',
  },

  // Level 2: Half and quarter mix
  {
    id: 'half-quarters',
    name: 'Half + Quarters',
    nameVi: 'Trắng + Đen',
    beats: [0, 2, 3],
    bpm: 80,
    description: 'Hold beat 1 for 2 beats, then tap 3-4',
  },
  {
    id: 'quarters-half',
    name: 'Quarters + Half',
    nameVi: 'Đen + Trắng',
    beats: [0, 1, 2],
    bpm: 80,
    description: 'Tap 1-2, hold beat 3 for 2 beats',
  },

  // Level 3: Eighth notes
  {
    id: 'eighths',
    name: 'All Eighths',
    nameVi: 'Toàn móc đơn',
    beats: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
    bpm: 70,
    description: 'Tap on every half-beat: 1-and-2-and-3-and-4-and',
  },
  {
    id: 'mixed-eighths',
    name: 'Quarter + Eighths',
    nameVi: 'Đen + Móc đơn',
    beats: [0, 1, 1.5, 2, 3, 3.5],
    bpm: 70,
    description: 'Mix of quarter and eighth notes',
  },
]

/**
 * Difficulty levels
 */
const LEVELS = [
  { id: 1, name: 'Level 1', patterns: ['quarters-4', 'quarters-3'] },
  { id: 2, name: 'Level 2', patterns: ['half-quarters', 'quarters-half'] },
  { id: 3, name: 'Level 3', patterns: ['eighths', 'mixed-eighths'] },
]

/**
 * RhythmTapGame - Tap rhythm patterns in time
 *
 * Proof-of-concept for Module 2.1-2.5
 * Mechanic: See/hear pattern → Tap drum pad in time with metronome
 *
 * Features:
 * - Configurable timing tolerance (50/100/150ms)
 * - Visual beat indicator with metronome
 * - Accuracy feedback per tap
 */
const RhythmTapGame: React.FC<RhythmTapGameProps> = ({
  submoduleId: _submoduleId,
  onComplete,
}) => {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timingTolerance, setTimingTolerance] = useState<TimingTolerance>(100)

  const [phase, setPhase] = useState<
    'ready' | 'listen' | 'play' | 'result'
  >('ready')
  const [_currentBeat, setCurrentBeat] = useState(-1)
  const [tapResults, setTapResults] = useState<
    Array<'perfect' | 'good' | 'ok' | 'miss' | null>
  >([])

  const { playNote } = useAudioStore()
  const intervalRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const expectedTimesRef = useRef<number[]>([])
  const tappedRef = useRef<Set<number>>(new Set())

  const totalQuestions = 4
  const currentLevelConfig = LEVELS[currentLevel]
  const timingConfig = TIMING_CONFIGS[timingTolerance]

  // Generate questions
  const questions = useMemo(() => {
    const available = PATTERNS.filter((p) =>
      currentLevelConfig.patterns.includes(p.id)
    )
    const result: RhythmPattern[] = []
    for (let i = 0; i < totalQuestions; i++) {
      result.push(available[i % available.length])
    }
    return result
  }, [currentLevel, currentLevelConfig.patterns])

  const currentPattern = questions[questionIndex]
  const beatDuration = 60000 / currentPattern.bpm

  // Cleanup
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  // Start listening phase - play the pattern for user to hear
  const startListen = useCallback(() => {
    setPhase('listen')
    setCurrentBeat(-1)
    setTapResults(new Array(currentPattern.beats.length).fill(null))
    tappedRef.current = new Set()

    let beatCount = -1
    const maxBeats = Math.ceil(Math.max(...currentPattern.beats)) + 1

    // Calculate expected tap times relative to beats
    const patternBeatSet = new Set(currentPattern.beats)

    intervalRef.current = window.setInterval(() => {
      beatCount += 0.5 // Check every half beat for eighths support

      if (beatCount >= maxBeats) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        // Short delay then start play phase
        setTimeout(() => startPlay(), 500)
        return
      }

      setCurrentBeat(Math.floor(beatCount))

      // Play sound if this is a tap point
      if (patternBeatSet.has(beatCount)) {
        playNote('C4')
      } else if (Number.isInteger(beatCount)) {
        // Metronome tick on whole beats
        playNote('G3')
      }
    }, beatDuration / 2) // Half beat interval for eighth note precision
  }, [currentPattern, beatDuration, playNote])

  // Start play phase - user needs to tap
  const startPlay = useCallback(() => {
    setPhase('play')
    setCurrentBeat(-1)
    tappedRef.current = new Set()

    // Calculate expected tap times in milliseconds
    startTimeRef.current = performance.now()
    expectedTimesRef.current = currentPattern.beats.map(
      (beat) => beat * beatDuration
    )

    let beatCount = -1
    const maxBeats = Math.ceil(Math.max(...currentPattern.beats)) + 2

    intervalRef.current = window.setInterval(() => {
      beatCount += 0.5

      if (beatCount >= maxBeats) {
        if (intervalRef.current) clearInterval(intervalRef.current)

        // Calculate final score
        const results = [...tapResults]
        let hits = 0
        results.forEach((r) => {
          if (r === 'perfect') hits += 1
          else if (r === 'good') hits += 0.75
          else if (r === 'ok') hits += 0.5
        })

        const accuracy = hits / currentPattern.beats.length
        if (accuracy >= 0.6) {
          setScore((s) => s + 1)
        }

        setPhase('result')
        return
      }

      setCurrentBeat(Math.floor(beatCount))

      // Metronome on whole beats
      if (Number.isInteger(beatCount)) {
        playNote('G3')
      }
    }, beatDuration / 2)
  }, [currentPattern, beatDuration, playNote, tapResults])

  // Handle drum tap
  const handleTap = useCallback(() => {
    if (phase !== 'play') return

    const tapTime = performance.now() - startTimeRef.current

    // Find the closest expected beat
    let closestIndex = -1
    let closestDiff = Infinity

    expectedTimesRef.current.forEach((expected, index) => {
      if (tappedRef.current.has(index)) return // Already tapped this beat

      const diff = Math.abs(tapTime - expected)
      if (diff < closestDiff) {
        closestDiff = diff
        closestIndex = index
      }
    })

    if (closestIndex === -1) return

    // Mark as tapped
    tappedRef.current.add(closestIndex)

    // Determine accuracy
    let accuracy: 'perfect' | 'good' | 'ok' | 'miss' = 'miss'
    if (closestDiff <= timingConfig.perfect) {
      accuracy = 'perfect'
    } else if (closestDiff <= timingConfig.good) {
      accuracy = 'good'
    } else if (closestDiff <= timingConfig.ok) {
      accuracy = 'ok'
    }

    // Update results
    setTapResults((prev) => {
      const newResults = [...prev]
      newResults[closestIndex] = accuracy
      return newResults
    })

    // Play feedback sound
    if (accuracy === 'perfect') {
      playNote('C5')
    } else if (accuracy === 'good') {
      playNote('G4')
    } else if (accuracy === 'ok') {
      playNote('E4')
    }
  }, [phase, timingConfig, playNote])

  // Next question
  const handleNext = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((prev) => prev + 1)
      setPhase('ready')
      setTapResults([])
    } else {
      if (onComplete) {
        onComplete(score, totalQuestions)
      }
    }
  }, [questionIndex, score, onComplete])

  // Level change
  const handleLevelChange = useCallback((levelIndex: number) => {
    setCurrentLevel(levelIndex)
    setQuestionIndex(0)
    setScore(0)
    setPhase('ready')
    setTapResults([])
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Level Selector */}
      <div className="flex gap-2 justify-center flex-wrap">
        {LEVELS.map((level, index) => (
          <button
            key={level.id}
            onClick={() => handleLevelChange(index)}
            disabled={phase !== 'ready' && phase !== 'result'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              currentLevel === index
                ? 'bg-primary text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>

      {/* Timing Tolerance Selector */}
      <div className="flex justify-center gap-2">
        <span className="text-xs text-slate-500 self-center">Timing:</span>
        {([50, 100, 150] as TimingTolerance[]).map((t) => (
          <button
            key={t}
            onClick={() => setTimingTolerance(t)}
            disabled={phase === 'listen' || phase === 'play'}
            className={`px-3 py-1 rounded text-xs transition-all ${
              timingTolerance === t
                ? 'bg-amber-500 text-white'
                : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            ±{t}ms
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="text-center text-sm text-slate-500 dark:text-slate-400">
        Pattern {questionIndex + 1} of {totalQuestions} • Score: {score}
      </div>

      {/* Pattern Info */}
      <div className="text-center">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white">
          {currentPattern.name}
        </h3>
        <p className="text-sm text-slate-500">{currentPattern.description}</p>
        <p className="text-xs text-slate-400 mt-1">
          BPM: {currentPattern.bpm} • {currentPattern.beats.length} taps
        </p>
      </div>

      {/* Beat Visualization */}
      <div className="flex justify-center gap-2">
        {currentPattern.beats.map((_, index) => {
          const result = tapResults[index]

          return (
            <div
              key={index}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                result === 'perfect'
                  ? 'bg-emerald-500 text-white scale-110'
                  : result === 'good'
                    ? 'bg-lime-500 text-white'
                    : result === 'ok'
                      ? 'bg-amber-500 text-white'
                      : result === 'miss'
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300'
              }`}
            >
              {index + 1}
            </div>
          )
        })}
      </div>

      {/* Drum Pad */}
      <div className="flex justify-center">
        <button
          onClick={handleTap}
          disabled={phase !== 'play'}
          className={`w-40 h-40 rounded-full text-2xl font-bold transition-all shadow-lg ${
            phase === 'play'
              ? 'bg-gradient-to-br from-red-500 to-orange-600 text-white hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-300 dark:bg-slate-600 text-slate-500 cursor-not-allowed'
          }`}
        >
          {phase === 'play' ? '🥁 TAP!' : '🥁'}
        </button>
      </div>

      {/* Controls */}
      <div className="text-center">
        {phase === 'ready' && (
          <button
            onClick={startListen}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            👂 Listen First
          </button>
        )}

        {phase === 'listen' && (
          <div className="text-primary font-medium animate-pulse">
            🎵 Listen to the pattern...
          </div>
        )}

        {phase === 'play' && (
          <div className="text-lg font-bold text-primary">
            🥁 Now TAP the rhythm!
          </div>
        )}

        {phase === 'result' && (
          <div className="space-y-4">
            {/* Result Summary */}
            <div className="flex justify-center gap-3 text-sm">
              <span className="text-emerald-500">
                ✨ Perfect: {tapResults.filter((r) => r === 'perfect').length}
              </span>
              <span className="text-lime-500">
                👍 Good: {tapResults.filter((r) => r === 'good').length}
              </span>
              <span className="text-amber-500">
                👌 OK: {tapResults.filter((r) => r === 'ok').length}
              </span>
              <span className="text-red-500">
                ❌ Miss: {tapResults.filter((r) => r === null || r === 'miss').length}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
            >
              {questionIndex < totalQuestions - 1 ? 'Next Pattern →' : 'Finish 🎉'}
            </button>
          </div>
        )}
      </div>

      {/* Timing Legend */}
      <div className="text-center text-xs text-slate-400">
        <p>
          Tolerance: {timingConfig.label} • Perfect ≤{timingConfig.perfect}ms •
          Good ≤{timingConfig.good}ms • OK ≤{timingConfig.ok}ms
        </p>
      </div>
    </div>
  )
}

export default RhythmTapGame
