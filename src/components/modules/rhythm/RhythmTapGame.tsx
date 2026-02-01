import React, { useState, useCallback, useMemo, useEffect, useRef, lazy, Suspense } from 'react'
import { useAudioStore } from '../../../stores/useAudioStore'

const AbcNoteSymbol = lazy(() => import('./AbcNoteSymbol'))

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
  abcNotation: string
}

const PATTERNS: RhythmPattern[] = [
  // Level 1: Quarter notes only
  {
    id: 'quarters-4',
    name: 'Four Quarters',
    nameVi: '4 nốt đen',
    beats: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    bpm: 80,
    description: 'Tap on every beat: 1-2-3-4 (4 measures)',
    abcNotation: 'L:1/4\nM:4/4\nK:C\nCCCC|CCCC|CCCC|CCCC|]',
  },
  {
    id: 'quarters-3',
    name: 'Waltz',
    nameVi: 'Nhịp Waltz',
    beats: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    bpm: 80,
    description: 'Tap on every beat: 1-2-3 (4 measures)',
    abcNotation: 'L:1/4\nM:3/4\nK:C\nCCC|CCC|CCC|CCC|]',
  },

  // Level 2: Half and quarter mix
  {
    id: 'half-quarters',
    name: 'Half + Quarters',
    nameVi: 'Trắng + Đen',
    beats: [0, 2, 3, 4, 6, 7, 8, 10, 11, 12, 14, 15],
    bpm: 80,
    description: 'Hold beat 1 for 2 beats, then tap 3-4',
    abcNotation: 'L:1/4\nM:4/4\nK:C\nC2CC|C2CC|C2CC|C2CC|]',
  },
  {
    id: 'quarters-half',
    name: 'Quarters + Half',
    nameVi: 'Đen + Trắng',
    beats: [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14],
    bpm: 80,
    description: 'Tap 1-2, hold beat 3 for 2 beats',
    abcNotation: 'L:1/4\nM:4/4\nK:C\nCCC2|CCC2|CCC2|CCC2|]',
  },

  // Level 3: Eighth notes
  {
    id: 'eighths',
    name: 'All Eighths',
    nameVi: 'Toàn móc đơn',
    beats: [
      0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11,
      11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5,
    ],
    bpm: 70,
    description: 'Tap on every half-beat: 1-and-2-and-3-and-4-and',
    abcNotation: 'L:1/8\nM:4/4\nK:C\nCCCCCCCC|CCCCCCCC|CCCCCCCC|CCCCCCCC|]',
  },
  {
    id: 'mixed-eighths',
    name: 'Quarter + Eighths',
    nameVi: 'Đen + Móc đơn',
    beats: [
      0, 1, 1.5, 2, 3, 3.5, 4, 5, 5.5, 6, 7, 7.5, 8, 9, 9.5, 10, 11, 11.5, 12, 13, 13.5, 14, 15,
      15.5,
    ],
    bpm: 70,
    description: 'Mix of quarter and eighth notes',
    abcNotation: 'L:1/8\nM:4/4\nK:C\nC2CCCC CC|C2CCCC CC|C2CCCC CC|C2CCCC CC|]',
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
// Type for note results (matches AbcNoteSymbol)
type NoteResult = 'perfect' | 'good' | 'ok' | 'miss' | 'pending'

const RhythmTapGame: React.FC<RhythmTapGameProps> = ({ submoduleId: _submoduleId, onComplete }) => {
  const [currentLevel, setCurrentLevel] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [timingTolerance, setTimingTolerance] = useState<TimingTolerance>(100)

  const [phase, setPhase] = useState<'ready' | 'listen' | 'play' | 'result'>('ready')
  const [currentBeat, setCurrentBeat] = useState(-1)
  const [tapResults, setTapResults] = useState<NoteResult[]>([])

  // New UX states
  const [lastTimingOffset, setLastTimingOffset] = useState<number | null>(null)
  const [attemptNumber, setAttemptNumber] = useState(1)
  const [bestAccuracy, setBestAccuracy] = useState(0)
  const [averageOffset, setAverageOffset] = useState<number | null>(null)

  const { playNote } = useAudioStore()
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const expectedTimesRef = useRef<number[]>([])
  const tappedRef = useRef<Set<number>>(new Set())
  const tapResultsRef = useRef<NoteResult[]>([])
  const timingOffsetsRef = useRef<number[]>([])

  const totalQuestions = 4
  const currentLevelConfig = LEVELS[currentLevel]
  const timingConfig = TIMING_CONFIGS[timingTolerance]

  // Generate questions
  const questions = useMemo(() => {
    const available = PATTERNS.filter((p) => currentLevelConfig.patterns.includes(p.id))
    const result: RhythmPattern[] = []
    for (let i = 0; i < totalQuestions; i++) {
      result.push(available[i % available.length])
    }
    return result
  }, [currentLevel, currentLevelConfig.patterns])

  const currentPattern = questions[questionIndex]
  const beatDuration = 60000 / currentPattern.bpm

  // Calculate active note index for highlighting
  // Map currentBeat (e.g., 0, 0.5, 1) to the index in the beats array
  const activeNoteIndex = useMemo(() => {
    if (phase !== 'listen' && phase !== 'play') return -1
    return currentPattern.beats.findIndex((b) => Math.abs(b - currentBeat) < 0.1)
  }, [currentBeat, currentPattern.beats, phase])

  // Cleanup helper
  const stopAll = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => stopAll()
  }, [stopAll])

  // Start play phase - user needs to tap
  const startPlay = useCallback(() => {
    stopAll() // Ensure no previous intervals/timeouts are running
    setPhase('play')
    setCurrentBeat(-1)
    tappedRef.current = new Set()

    // Calculate expected tap times in milliseconds
    startTimeRef.current = performance.now()
    expectedTimesRef.current = currentPattern.beats.map((beat) => beat * beatDuration)

    let beatCount = -1
    const maxBeats = Math.ceil(Math.max(...currentPattern.beats)) + 2

    const id = window.setInterval(() => {
      beatCount += 0.5

      if (beatCount >= maxBeats) {
        if (intervalRef.current) clearInterval(intervalRef.current)

        // Calculate final score using ref (not stale closure)
        const results = [...tapResultsRef.current]
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

        // Calculate average timing offset for display
        const offsets = timingOffsetsRef.current
        if (offsets.length > 0) {
          setAverageOffset(Math.round(offsets.reduce((a, b) => a + b, 0) / offsets.length))
        }

        setPhase('result')
        return
      }

      setCurrentBeat(Math.floor(beatCount * 2) / 2) // Keep 0.5 precision

      // Metronome on whole beats
      if (Number.isInteger(beatCount)) {
        playNote('G3')
      }
    }, beatDuration / 2)

    intervalRef.current = id
  }, [currentPattern, beatDuration, playNote, stopAll])

  // Start listening phase - play the pattern for user to hear
  const startListen = useCallback(() => {
    stopAll() // Ensure no previous intervals/timeouts are running
    setPhase('listen')
    setCurrentBeat(-1)
    setTapResults(new Array(currentPattern.beats.length).fill(null))
    tapResultsRef.current = new Array(currentPattern.beats.length).fill(null)
    tappedRef.current = new Set()

    let beatCount = -1
    const maxBeats = Math.ceil(Math.max(...currentPattern.beats)) + 1

    // Calculate expected tap times relative to beats
    const patternBeatSet = new Set(currentPattern.beats)

    const id = window.setInterval(() => {
      beatCount += 0.5 // Check every half beat for eighths support

      if (beatCount >= maxBeats) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        // Short delay then start play phase
        const tid = window.setTimeout(() => startPlay(), 500)
        timeoutRef.current = tid
        return
      }

      setCurrentBeat(Math.floor(beatCount * 2) / 2) // Keep 0.5 precision

      // Play sound if this is a tap point
      if (patternBeatSet.has(beatCount)) {
        playNote('C4')
      } else if (Number.isInteger(beatCount)) {
        // Metronome tick on whole beats
        playNote('G3')
      }
    }, beatDuration / 2) // Half beat interval for eighth note precision

    intervalRef.current = id
  }, [currentPattern, beatDuration, playNote, stopAll, startPlay])

  // Handle drum tap
  const handleTap = useCallback(() => {
    if (phase !== 'play') return

    const tapTime = performance.now() - startTimeRef.current

    // Find the closest expected beat
    let closestIndex = -1
    let closestDiff = Infinity
    let signedOffset = 0

    expectedTimesRef.current.forEach((expected, index) => {
      if (tappedRef.current.has(index)) return // Already tapped this beat

      const diff = Math.abs(tapTime - expected)
      if (diff < closestDiff) {
        closestDiff = diff
        closestIndex = index
        signedOffset = tapTime - expected // Negative = early, positive = late
      }
    })

    if (closestIndex === -1) return

    // Update timing meter with signed offset
    setLastTimingOffset(signedOffset)
    timingOffsetsRef.current.push(signedOffset)

    // Mark as tapped
    tappedRef.current.add(closestIndex)

    // Determine accuracy
    let accuracy: NoteResult = 'miss'
    if (closestDiff <= timingConfig.perfect) {
      accuracy = 'perfect'
    } else if (closestDiff <= timingConfig.good) {
      accuracy = 'good'
    } else if (closestDiff <= timingConfig.ok) {
      accuracy = 'ok'
    }

    // Update results (both state and ref)
    setTapResults((prev) => {
      const newResults = [...prev]
      newResults[closestIndex] = accuracy
      tapResultsRef.current = newResults
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

  // Keyboard handler for SPACE key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && phase === 'play') {
        e.preventDefault()
        handleTap()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [phase, handleTap])

  // Retry same pattern
  const handleRetry = useCallback(() => {
    if (attemptNumber < 3) {
      setAttemptNumber((prev) => prev + 1)
      setPhase('ready')
      setTapResults([])
      setLastTimingOffset(null)
      timingOffsetsRef.current = []
    }
  }, [attemptNumber])

  // Next question
  const handleNext = useCallback(() => {
    // Update best accuracy before moving on
    const results = tapResultsRef.current
    let hits = 0
    results.forEach((r) => {
      if (r === 'perfect') hits += 1
      else if (r === 'good') hits += 0.75
      else if (r === 'ok') hits += 0.5
    })
    const currentAccuracy = hits / currentPattern.beats.length
    if (currentAccuracy > bestAccuracy) {
      setBestAccuracy(currentAccuracy)
    }

    if (questionIndex < totalQuestions - 1) {
      stopAll()
      setQuestionIndex((prev) => prev + 1)
      setPhase('ready')
      setTapResults([])
      setAttemptNumber(1)
      setBestAccuracy(0)
      setLastTimingOffset(null)
      timingOffsetsRef.current = []
    } else {
      if (onComplete) {
        onComplete(score, totalQuestions)
      }
    }
  }, [
    questionIndex,
    score,
    onComplete,
    totalQuestions,
    currentPattern.beats.length,
    bestAccuracy,
    stopAll,
  ])

  // Level change
  const handleLevelChange = useCallback(
    (levelIndex: number) => {
      setCurrentLevel(levelIndex)
      setQuestionIndex(0)
      setScore(0)
      setPhase('ready')
      setTapResults([])
      setAttemptNumber(1)
      setBestAccuracy(0)
      setLastTimingOffset(null)
      timingOffsetsRef.current = []
      stopAll()
    },
    [stopAll]
  )

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

      {/* Pattern Info with ABC Notation */}
      <div className="text-center">
        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{currentPattern.name}</h3>
        <div className="flex justify-center my-2">
          <Suspense fallback={<div className="text-2xl">Loading...</div>}>
            <AbcNoteSymbol
              noteAbc={currentPattern.abcNotation}
              width={600}
              height={100}
              highlightIndex={activeNoteIndex}
              noteResults={tapResults}
            />
          </Suspense>
        </div>

        {/* Playback Progress Bar - time-based playhead */}
        {(phase === 'listen' || phase === 'play') && (
          <div className="flex flex-col items-center gap-1 mt-2">
            {/* Progress bar with smooth playhead */}
            <div className="relative w-[600px] h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              {/* Filled portion based on beat progress */}
              <div
                className="absolute left-0 top-0 bottom-0 bg-teal-500 transition-all duration-100"
                style={{
                  width: `${((activeNoteIndex + 1) / currentPattern.beats.length) * 100}%`,
                }}
              />
              {/* Playhead marker */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-teal-600 shadow-lg transition-all duration-100"
                style={{
                  left: `${((activeNoteIndex + 1) / currentPattern.beats.length) * 100}%`,
                  transform: 'translateX(-50%)',
                }}
              />
            </div>

            {/* Beat accuracy dots - compact visual of results */}
            <div className="flex gap-1">
              {currentPattern.beats.map((_, index) => {
                const result = tapResults[index]
                let bgColor = 'bg-slate-300 dark:bg-slate-500'
                if (result === 'perfect') bgColor = 'bg-emerald-500'
                else if (result === 'good') bgColor = 'bg-lime-500'
                else if (result === 'ok') bgColor = 'bg-amber-500'
                else if (result === 'miss') bgColor = 'bg-rose-500'

                return (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${bgColor} ${
                      index === activeNoteIndex ? 'ring-1 ring-teal-500 scale-125' : ''
                    }`}
                  />
                )
              })}
            </div>

            {/* Timing Deviation Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Timing:</span>
              <div className="relative w-32 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500 z-10" />
                {lastTimingOffset !== null && phase === 'play' && (
                  <div
                    className="absolute top-0 bottom-0 w-1.5 bg-teal-500 rounded-full transition-all duration-75"
                    style={{
                      left: `calc(50% + ${Math.max(-50, Math.min(50, lastTimingOffset / 2))}px)`,
                      transform: 'translateX(-50%)',
                    }}
                  />
                )}
              </div>
              <div className="flex gap-2 text-[9px] text-slate-400">
                <span>Early</span>
                <span className="text-emerald-500">•</span>
                <span>Late</span>
              </div>
            </div>
          </div>
        )}

        <p className="text-sm text-slate-500">{currentPattern.description}</p>
        <p className="text-xs text-slate-400 mt-1">
          BPM: {currentPattern.bpm} • {currentPattern.beats.length} taps
        </p>
      </div>

      {/* Attempt Info */}
      <div className="text-center text-xs text-slate-500">
        Attempt {attemptNumber} of 3 • Best:{' '}
        {bestAccuracy > 0 ? `${Math.round(bestAccuracy * 100)}%` : '--'}
      </div>

      {/* Drum Pad */}
      <div className="flex justify-center">
        <button
          onClick={handleTap}
          disabled={phase !== 'play'}
          className={`w-40 h-40 rounded-full text-2xl font-bold transition-all shadow-lg ${
            phase === 'play'
              ? 'bg-gradient-to-br from-teal-500 to-cyan-600 text-white hover:scale-105 active:scale-95 cursor-pointer'
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
          <div className="text-primary font-medium animate-pulse">🎵 Listen to the pattern...</div>
        )}

        {phase === 'play' && (
          <div className="text-lg font-bold text-primary">🥁 Now TAP the rhythm!</div>
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
                ❌ Miss: {tapResults.filter((r) => r === 'miss' || r === 'pending').length}
              </span>
            </div>

            {/* Average Timing */}
            {averageOffset !== null && (
              <div className="text-center text-sm text-slate-500">
                Average offset: {averageOffset}ms {averageOffset < 0 ? '(early)' : '(late)'}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              {attemptNumber < 3 && (
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 border-2 border-teal-500 text-teal-500 rounded-lg font-medium hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
                >
                  Try Again ({attemptNumber}/3)
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-colors"
              >
                {questionIndex < totalQuestions - 1 ? 'Next Pattern →' : 'Finish 🎉'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Timing Legend */}
      <div className="text-center text-xs text-slate-400">
        <p>
          Tolerance: {timingConfig.label} • Perfect ≤{timingConfig.perfect}ms • Good ≤
          {timingConfig.good}ms • OK ≤{timingConfig.ok}ms
        </p>
      </div>
    </div>
  )
}

export default RhythmTapGame
