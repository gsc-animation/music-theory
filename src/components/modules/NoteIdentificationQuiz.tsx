import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import abcjs from 'abcjs'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getNoteLabel } from '../../utils/note-labels'
import VirtualPiano from '../VirtualPiano/VirtualPiano'
import { VirtualGuitar } from '../VirtualGuitar/VirtualGuitar'

interface NoteIdentificationQuizProps {
  /** Submodule ID for scoring */
  submoduleId: string
  /** Notes to quiz on (e.g., ['C4', 'D4', 'E4', 'F4', 'G4']) */
  notes: string[]
  /** Number of questions in the quiz */
  questionCount?: number
  /** Initial game type - if set, locks to this type (no selector shown) */
  initialGameType?: 'note-id' | 'instrument-match' | 'staff-placement'
  /** Callback when quiz completes */
  onComplete?: (score: number, total: number) => void
}

// Note name to solfège mapping
const NOTE_OPTIONS = [
  { note: 'C', label: 'C (Do)' },
  { note: 'D', label: 'D (Re)' },
  { note: 'E', label: 'E (Mi)' },
  { note: 'F', label: 'F (Fa)' },
  { note: 'G', label: 'G (Sol)' },
  { note: 'A', label: 'A (La)' },
  { note: 'B', label: 'B (Si)' },
]

// Auto-advance delay in seconds
const AUTO_ADVANCE_DELAY = 2

type GameType = 'note-id' | 'instrument-match' | 'staff-placement'
type InstrumentType = 'piano' | 'guitar'

/**
 * Convert note format (e.g., "C4", "F#5") to ABC notation
 */
const noteToAbc = (note: string): string => {
  const match = note.match(/^([A-G])([#b]?)(\d)$/)
  if (!match) return ''

  const [, letter, accidental, octaveStr] = match
  const octave = parseInt(octaveStr, 10)

  let abcAccidental = ''
  if (accidental === '#') abcAccidental = '^'
  else if (accidental === 'b') abcAccidental = '_'

  let abcNote = ''
  if (octave <= 3) {
    abcNote = letter
    const commas = 4 - octave
    abcNote += ','.repeat(commas)
  } else if (octave === 4) {
    abcNote = letter
  } else if (octave === 5) {
    abcNote = letter.toLowerCase()
  } else {
    abcNote = letter.toLowerCase()
    const apostrophes = octave - 5
    abcNote += "'".repeat(apostrophes)
  }

  return abcAccidental + abcNote
}

/**
 * NoteIdentificationQuiz - Interactive quiz with multiple game types
 */
export const NoteIdentificationQuiz: React.FC<NoteIdentificationQuizProps> = ({
  submoduleId,
  notes,
  questionCount = 5,
  initialGameType,
  onComplete,
}) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)
  const notationSystem = useSettingsStore((state) => state.notationSystem)

  const staffRef = useRef<HTMLDivElement>(null)

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [countdown, setCountdown] = useState(AUTO_ADVANCE_DELAY)
  
  // Game type states - lock if initialGameType provided
  const [gameType, setGameType] = useState<GameType>(initialGameType || 'note-id')
  const [instrument, setInstrument] = useState<InstrumentType>('piano')
  const isGameTypeLocked = !!initialGameType

  // Generate random questions from available notes
  const questions = useMemo(() => {
    const shuffled = [...notes].sort(() => Math.random() - 0.5)
    const selected: string[] = []
    for (let i = 0; i < questionCount; i++) {
      selected.push(shuffled[i % shuffled.length])
    }
    return selected
  }, [notes, questionCount])

  const currentNote = questions[currentQuestion]
  const correctAnswer = currentNote?.replace(/\d/, '')

  // Move to next question - use ref to prevent infinite loops
  const hasCompletedRef = React.useRef(false)
  
  const handleNext = useCallback(() => {
    if (currentQuestion >= questionCount - 1) {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true
        const finalScore = score
        const percentage = Math.round((finalScore / questionCount) * 100)
        // Use setTimeout to avoid setState during render
        setTimeout(() => {
          setSubmoduleScore(submoduleId, percentage)
          if (percentage >= 80) {
            addXP(20)
          }
        }, 0)
        setIsComplete(true)
        onComplete?.(finalScore, questionCount)
      }
    } else {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
      setCountdown(AUTO_ADVANCE_DELAY)
    }
  }, [currentQuestion, questionCount, score, submoduleId, addXP, onComplete])

  // Auto-advance countdown
  useEffect(() => {
    if (!showResult) return
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [showResult])

  useEffect(() => {
    if (showResult && countdown === 0) {
      handleNext()
    }
  }, [countdown, showResult, handleNext])

  // Play the current note
  const handlePlayNote = useCallback(() => {
    if (!currentNote) return
    playNote(currentNote)
    setTimeout(() => releaseNote(currentNote), 500)
  }, [currentNote, playNote, releaseNote])

  // Render the current note on a mini staff (for note-id and instrument-match)
  useEffect(() => {
    if (!staffRef.current || !currentNote || gameType === 'staff-placement') return
    const octave = parseInt(currentNote.match(/\d/)?.[0] || '4')
    const clef = octave < 4 ? 'bass' : 'treble'
    const abc = `X:1\nL:1\nK:C clef=${clef}\n${noteToAbc(currentNote)}|]`
    abcjs.renderAbc(staffRef.current, abc, {
      responsive: 'resize',
      staffwidth: 150,
      paddingtop: 5,
      paddingbottom: 5,
      paddingleft: 5,
      paddingright: 5,
      add_classes: true,
    })
  }, [currentNote, gameType])

  // Submit answer and show result
  const submitAnswer = useCallback(
    (noteName: string) => {
      if (showResult) return
      setSelectedAnswer(noteName)
      if (noteName === correctAnswer) {
        setScore((prev) => prev + 1)
      }
      setShowResult(true)
      setCountdown(AUTO_ADVANCE_DELAY)
    },
    [showResult, correctAnswer]
  )

  // Keyboard handler for note-id game
  useEffect(() => {
    if (gameType !== 'note-id' || showResult || isComplete) return
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      if (['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(key)) {
        event.preventDefault()
        submitAnswer(key)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameType, showResult, isComplete, submitAnswer])

  // Handle instrument answer (piano/guitar)
  const handleInstrumentAnswer = useCallback(
    (note: string) => {
      if (showResult) return
      const noteLetter = note.replace(/\d/, '')
      submitAnswer(noteLetter)
    },
    [showResult, submitAnswer]
  )

  // Handle staff click for staff-placement game
  const handleStaffClick = useCallback(
    (clickedNote: string) => {
      if (showResult || gameType !== 'staff-placement') return
      submitAnswer(clickedNote)
    },
    [showResult, gameType, submitAnswer]
  )

  // Restart quiz
  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setIsComplete(false)
    setCountdown(AUTO_ADVANCE_DELAY)
  }

  // Get display label for current note (VN mode support)
  const getNoteDisplayLabel = (noteLetter: string) => {
    return getNoteLabel(noteLetter, notationSystem)
  }

  if (isComplete) {
    const percentage = Math.round((score / questionCount) * 100)
    return (
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 text-center">
        <span className="material-symbols-outlined text-5xl text-amber-500 mb-3">
          {percentage >= 80 ? 'emoji_events' : percentage >= 60 ? 'thumb_up' : 'refresh'}
        </span>
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Quiz Complete!</h3>
        <p className="text-4xl font-bold mb-2">
          <span
            className={
              percentage >= 80
                ? 'text-emerald-500'
                : percentage >= 60
                  ? 'text-amber-500'
                  : 'text-rose-500'
            }
          >
            {percentage}%
          </span>
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : 'Keep practicing!'}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Question {currentQuestion + 1} of {questionCount}
        </span>
        <span className="text-sm font-bold text-emerald-500">Score: {score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[#30e8e8] transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questionCount) * 100}%` }}
        />
      </div>

      {/* Game Type Selector - only show if not locked */}
      {!isGameTypeLocked && (
        <div className="flex justify-center gap-1 mb-4 p-1 bg-slate-200 dark:bg-slate-700 rounded-lg">
          <button
            onClick={() => setGameType('note-id')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              gameType === 'note-id' ? 'bg-[#30e8e8] text-[#111818]' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            🎵 Name the Note
          </button>
          <button
            onClick={() => setGameType('instrument-match')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              gameType === 'instrument-match' ? 'bg-[#30e8e8] text-[#111818]' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            🎹 Play the Note
          </button>
          <button
            onClick={() => setGameType('staff-placement')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              gameType === 'staff-placement' ? 'bg-[#30e8e8] text-[#111818]' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            📍 Place on Staff
          </button>
        </div>
      )}

      {/* Question Display */}
      <div className="text-center mb-4">
        {gameType === 'staff-placement' ? (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
              Where is <span className="text-[#30e8e8] text-2xl font-bold">{getNoteDisplayLabel(correctAnswer)}</span> on the staff?
            </h3>
            <p className="text-xs text-slate-400 mb-4">Click the correct line or space</p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">
              {gameType === 'note-id' ? 'What note is this?' : 'Play this note on the instrument'}
            </h3>
            <div className="flex justify-center mb-4">
              <div
                ref={staffRef}
                className="bg-white dark:bg-slate-900 rounded-lg p-2 border border-slate-200 dark:border-slate-700 min-h-[80px] min-w-[180px]"
              />
            </div>
            <button
              onClick={handlePlayNote}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#30e8e8] text-[#111818] rounded-lg font-bold hover:bg-[#26d4d4] transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-base">play_arrow</span>
              Play Note
            </button>
          </>
        )}
      </div>

      {/* Game Type Specific Content */}
      
      {/* GAME TYPE 1: Note Identification */}
      {gameType === 'note-id' && (
        <div className="mb-4">
          <p className="text-xs text-slate-400 text-center mb-3">
            Press A-G keys or click a button
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {NOTE_OPTIONS.map((option) => {
              const isSelected = selectedAnswer === option.note
              const isCorrect = option.note === correctAnswer
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <button
                  key={option.note}
                  onClick={() => submitAnswer(option.note)}
                  disabled={showResult}
                  className={`py-2 px-3 rounded-lg font-bold transition-all border-2 min-w-[70px] text-sm ${
                    showCorrect
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : showWrong
                        ? 'bg-rose-100 border-rose-500 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300'
                        : isSelected
                          ? 'bg-[#30e8e8]/20 border-[#30e8e8] text-[#111818] dark:text-white'
                          : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:border-[#30e8e8]'
                  } ${showResult ? 'cursor-default' : 'cursor-pointer'}`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* GAME TYPE 2: Instrument Match */}
      {gameType === 'instrument-match' && (
        <div className="mb-4">
          {/* Instrument Toggle */}
          <div className="flex justify-center gap-2 mb-3">
            <button
              onClick={() => setInstrument('piano')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                instrument === 'piano' ? 'bg-[#30e8e8] text-[#111818]' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              🎹 Piano
            </button>
            <button
              onClick={() => setInstrument('guitar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                instrument === 'guitar' ? 'bg-[#30e8e8] text-[#111818]' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              🎸 Guitar
            </button>
          </div>

          {/* Piano */}
          {instrument === 'piano' && (
            <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <VirtualPiano
                startOctave={4}
                octaves={1}
                onStartNote={handleInstrumentAnswer}
                onStopNote={() => {}}
                activeNotes={selectedAnswer ? [`${selectedAnswer}4`] : []}
              />
            </div>
          )}

          {/* Guitar */}
          {instrument === 'guitar' && (
            <VirtualGuitar
              onPlayNote={handleInstrumentAnswer}
              activeNotes={selectedAnswer ? [`${selectedAnswer}4`] : []}
            />
          )}
        </div>
      )}

      {/* GAME TYPE 3: Staff Placement */}
      {gameType === 'staff-placement' && (
        <div className="mb-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <svg viewBox="0 0 220 100" className="w-full max-w-md mx-auto" style={{ height: '140px' }}>
              {/* Treble Clef Symbol */}
              <text x="12" y="58" fontSize="42" fill="#64748b">𝄞</text>
              
              {/* Staff Lines - y positions: 20, 35, 50, 65, 80 (spacing of 15) */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`line-${i}`}
                  x1="50"
                  y1={20 + i * 15}
                  x2="210"
                  y2={20 + i * 15}
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
              ))}

              {/* Clickable Regions - each staff position maps to a note */}
              {/* Line notes: F5(y=20), D5(y=35), B4(y=50), G4(y=65), E4(y=80) */}
              {/* Space notes: E5(y=27.5), C5(y=42.5), A4(y=57.5), F4(y=72.5) */}
              {[
                { note: 'F', y: 20, type: 'line' },     // Top line (F5)
                { note: 'E', y: 27.5, type: 'space' },  // Space below top (E5)
                { note: 'D', y: 35, type: 'line' },    // 4th line (D5)
                { note: 'C', y: 42.5, type: 'space' }, // Space (C5)
                { note: 'B', y: 50, type: 'line' },    // 3rd line (B4)
                { note: 'A', y: 57.5, type: 'space' }, // Space (A4)
                { note: 'G', y: 65, type: 'line' },    // 2nd line (G4)
                { note: 'F', y: 72.5, type: 'space' }, // Space (F4) - different octave
                { note: 'E', y: 80, type: 'line' },    // 1st line (E4)
              ].map((pos, idx) => {
                const isSelected = selectedAnswer === pos.note
                const isCorrect = pos.note === correctAnswer
                const showCorrect = showResult && isCorrect
                const showWrong = showResult && isSelected && !isCorrect

                return (
                  <g key={`pos-${idx}`}>
                    {/* Clickable area - covers the line or space region */}
                    <rect
                      x="50"
                      y={pos.y - 4}
                      width="160"
                      height="8"
                      fill={
                        showCorrect
                          ? 'rgba(16, 185, 129, 0.3)'
                          : showWrong
                            ? 'rgba(244, 63, 94, 0.3)'
                            : 'transparent'
                      }
                      className={showResult ? '' : 'hover:fill-[rgba(48,232,232,0.25)] cursor-pointer'}
                      onClick={() => !showResult && handleStaffClick(pos.note)}
                    />
                    
                    {/* Note head ellipse - placed exactly on line/space */}
                    {(showCorrect || isSelected) && (
                      <ellipse
                        cx="130"
                        cy={pos.y}
                        rx="7"
                        ry="5"
                        fill={showCorrect ? '#10b981' : showWrong ? '#f43f5e' : '#30e8e8'}
                        stroke={showCorrect ? '#047857' : showWrong ? '#be123c' : '#111818'}
                        strokeWidth="1"
                        style={{ 
                          filter: showCorrect 
                            ? 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.6))' 
                            : showWrong 
                              ? 'drop-shadow(0 0 4px rgba(244, 63, 94, 0.6))'
                              : 'drop-shadow(0 0 4px rgba(48, 232, 232, 0.6))'
                        }}
                      />
                    )}
                    
                    {/* Show ledger line if needed for notes outside staff */}
                    {(showCorrect || isSelected) && pos.y > 80 && (
                      <line x1="118" y1={pos.y} x2="142" y2={pos.y} stroke="#64748b" strokeWidth="1" />
                    )}
                  </g>
                )
              })}
            </svg>
          </div>
        </div>
      )}

      {/* Auto-advance countdown */}
      {showResult && (
        <div className="flex justify-center mb-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Next question in {countdown}s...
          </span>
        </div>
      )}

      {/* Feedback */}
      {showResult && (
        <div
          className={`p-3 rounded-lg text-center ${
            selectedAnswer === correctAnswer
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
          }`}
        >
          {selectedAnswer === correctAnswer
            ? '✓ Correct!'
            : `✗ The correct answer was ${getNoteDisplayLabel(correctAnswer)}`}
        </div>
      )}
    </div>
  )
}

export default NoteIdentificationQuiz
