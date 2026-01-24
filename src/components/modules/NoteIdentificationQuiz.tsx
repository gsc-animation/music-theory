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

// All possible note options
const ALL_NOTE_OPTIONS = [
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
 * Features progressive difficulty: only shows level-specific notes as options
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
  const abcStaffRef = useRef<HTMLDivElement>(null)

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

  // Extract unique note letters from the level's notes for progressive difficulty
  const allowedNotes = useMemo(() => {
    const noteLetters = notes.map((n) => n.replace(/\d/, ''))
    return [...new Set(noteLetters)]
  }, [notes])

  // Filter NOTE_OPTIONS to only show level's notes (progressive difficulty)
  const availableNoteOptions = useMemo(() => {
    return ALL_NOTE_OPTIONS.filter((opt) => allowedNotes.includes(opt.note))
  }, [allowedNotes])

  // Generate questions from available notes (deterministic order based on submoduleId)
  const questions = useMemo(() => {
    // Use submoduleId hash for pseudo-random but stable order
    const seed = submoduleId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    const shuffled = [...notes].sort((a, b) => {
      const hashA = (a.charCodeAt(0) * seed) % 100
      const hashB = (b.charCodeAt(0) * seed) % 100
      return hashA - hashB
    })
    const selected: string[] = []
    for (let i = 0; i < questionCount; i++) {
      selected.push(shuffled[i % shuffled.length])
    }
    return selected
  }, [notes, questionCount, submoduleId])

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
  }, [currentQuestion, questionCount, score, submoduleId, setSubmoduleScore, addXP, onComplete])

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

  // Render ABC notation for staff-placement with CLICKABLE notes
  useEffect(() => {
    if (!abcStaffRef.current || gameType !== 'staff-placement') return
    if (showResult) return // Don't re-render when showing result

    // Create ABC notation showing ONE note per unique letter (e.g., E4 and G4 only)
    const abcNotes = allowedNotes
      .map((noteLetter) => {
        // Use octave 4 for all notes (middle of staff range)
        const noteWithOctave = `${noteLetter}4`
        return noteToAbc(noteWithOctave)
      })
      .join(' ')

    const abc = `X:1\nL:1\nK:C\n${abcNotes}|]`

    abcjs.renderAbc(abcStaffRef.current, abc, {
      responsive: 'resize',
      staffwidth: 400,
      paddingtop: 15,
      paddingbottom: 15,
      paddingleft: 15,
      paddingright: 15,
      add_classes: true,
      clickListener: (abcElem: { pitches?: Array<{ name: string }> }) => {
        // Extract note name from clicked element
        if (abcElem.pitches && abcElem.pitches.length > 0) {
          const noteName = abcElem.pitches[0].name
          // Convert abcjs format (e.g., "E,", "G", "e") to simple letter
          const letter = noteName.replace(/[,']/g, '').toUpperCase()
          // Directly submit answer if game conditions met
          if (!showResult && gameType === 'staff-placement') {
            setSelectedAnswer(letter)
            if (letter === correctAnswer) {
              setScore((prev) => prev + 1)
            }
            setShowResult(true)
            setCountdown(AUTO_ADVANCE_DELAY)
          }
        }
      },
    })

    // Add hover styling to make notes look clickable (no transform to avoid jumping)
    const noteElements = abcStaffRef.current.querySelectorAll('.abcjs-note')
    noteElements.forEach((el) => {
      const element = el as HTMLElement
      element.style.cursor = 'pointer'
      element.style.transition = 'filter 0.15s ease'
      element.addEventListener('mouseenter', () => {
        element.style.filter = 'drop-shadow(0 0 10px rgba(48, 232, 232, 0.9)) brightness(1.2)'
      })
      element.addEventListener('mouseleave', () => {
        element.style.filter = 'none'
      })
    })
  }, [gameType, allowedNotes, showResult, correctAnswer])

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

  // Keyboard handler for note-id game (only for allowed notes)
  useEffect(() => {
    if (gameType !== 'note-id' || showResult || isComplete) return
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase()
      if (allowedNotes.includes(key)) {
        event.preventDefault()
        submitAnswer(key)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [gameType, showResult, isComplete, submitAnswer, allowedNotes])

  // Handle instrument answer (piano/guitar) - only accept allowed notes
  const handleInstrumentAnswer = useCallback(
    (note: string) => {
      if (showResult) return
      const noteLetter = note.replace(/\d/, '')
      // Only accept if it's an allowed note for this level
      if (allowedNotes.includes(noteLetter)) {
        submitAnswer(noteLetter)
      }
    },
    [showResult, submitAnswer, allowedNotes]
  )

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

      {/* Level notes indicator */}
      <div className="flex justify-center gap-1 mb-3">
        <span className="text-xs text-slate-400">Notes in this level:</span>
        <span className="text-xs font-bold text-[#30e8e8]">{allowedNotes.join(', ')}</span>
      </div>

      {/* Game Type Selector - only show if not locked */}
      {!isGameTypeLocked && (
        <div className="flex justify-center gap-1 mb-4 p-1 bg-slate-200 dark:bg-slate-700 rounded-lg">
          <button
            onClick={() => setGameType('note-id')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              gameType === 'note-id'
                ? 'bg-[#30e8e8] text-[#111818]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            🎵 Name the Note
          </button>
          <button
            onClick={() => setGameType('instrument-match')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              gameType === 'instrument-match'
                ? 'bg-[#30e8e8] text-[#111818]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            🎹 Play the Note
          </button>
          <button
            onClick={() => setGameType('staff-placement')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              gameType === 'staff-placement'
                ? 'bg-[#30e8e8] text-[#111818]'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
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
              Click on{' '}
              <span className="text-[#30e8e8] text-2xl font-bold">
                {getNoteDisplayLabel(correctAnswer)}
              </span>{' '}
              on the staff
            </h3>
            <p className="text-xs text-slate-400 mb-2">
              Only notes: {allowedNotes.join(', ')} are shown
            </p>
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

      {/* GAME TYPE 1: Note Identification - Only show allowed notes */}
      {gameType === 'note-id' && (
        <div className="mb-4">
          <p className="text-xs text-slate-400 text-center mb-3">
            Press {allowedNotes.join(', ')} keys or click a button
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {availableNoteOptions.map((option) => {
              const isSelected = selectedAnswer === option.note
              const isCorrect = option.note === correctAnswer
              const showCorrect = showResult && isCorrect
              const showWrong = showResult && isSelected && !isCorrect

              return (
                <button
                  key={option.note}
                  onClick={() => submitAnswer(option.note)}
                  disabled={showResult}
                  className={`py-2 px-4 rounded-lg font-bold transition-all border-2 min-w-[80px] text-sm ${
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

      {/* GAME TYPE 2: Instrument Match - Pass allowed notes to instruments */}
      {gameType === 'instrument-match' && (
        <div className="mb-4">
          {/* Instrument Toggle */}
          <div className="flex justify-center gap-2 mb-3">
            <button
              onClick={() => setInstrument('piano')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                instrument === 'piano'
                  ? 'bg-[#30e8e8] text-[#111818]'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              🎹 Piano
            </button>
            <button
              onClick={() => setInstrument('guitar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                instrument === 'guitar'
                  ? 'bg-[#30e8e8] text-[#111818]'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              🎸 Guitar
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center mb-2">
            Only notes {allowedNotes.join(', ')} are active
          </p>

          {/* Piano */}
          {instrument === 'piano' && (
            <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <VirtualPiano
                startOctave={4}
                octaves={1}
                onStartNote={handleInstrumentAnswer}
                onStopNote={() => {}}
                activeNotes={selectedAnswer ? [`${selectedAnswer}4`] : []}
                allowedNotes={allowedNotes}
              />
            </div>
          )}

          {/* Guitar */}
          {instrument === 'guitar' && (
            <VirtualGuitar
              onPlayNote={handleInstrumentAnswer}
              activeNotes={selectedAnswer ? [`${selectedAnswer}4`] : []}
              allowedNotes={allowedNotes}
            />
          )}
        </div>
      )}

      {/* GAME TYPE 3: Staff Placement - Click on ABC rendered notes */}
      {gameType === 'staff-placement' && (
        <div className="mb-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            {/* ABC rendered staff with clickable notes */}
            <div ref={abcStaffRef} className="flex justify-center [&_.abcjs-note]:cursor-pointer" />

            {/* Instructions */}
            <p className="text-xs text-center text-slate-400 mt-3">
              Click on the note to select your answer
            </p>

            {/* Feedback overlay when answer is shown */}
            {showResult && (
              <div
                className={`mt-3 p-3 rounded-lg text-center text-sm font-bold ${
                  selectedAnswer === correctAnswer
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300'
                }`}
              >
                {selectedAnswer === correctAnswer
                  ? `✓ Correct! You clicked ${selectedAnswer}`
                  : `✗ Wrong! You clicked ${selectedAnswer}, the answer was ${correctAnswer}`}
              </div>
            )}
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
