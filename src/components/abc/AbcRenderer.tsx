import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import abcjs from 'abcjs'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useAudioStore } from '../../stores/useAudioStore'
import { getNoteLabel } from '../../utils/note-labels'

/**
 * Props for the AbcRenderer component
 */
interface AbcRendererProps {
  abc: string
  title?: string
  description?: string
  showPlayButton?: boolean
}

/**
 * Global playback coordinator - ensures only one ABC demo plays at a time
 */
const abcPlaybackManager = {
  listeners: new Set<() => void>(),

  register(stopFn: () => void) {
    this.listeners.add(stopFn)
    return () => this.listeners.delete(stopFn)
  },

  stopAll() {
    this.listeners.forEach((stop) => stop())
  },
}

/**
 * Map ABC notation to standard note names
 */
function abcToNoteName(abcPitch: string): string {
  const baseNotes: Record<string, string> = {
    C: 'C4',
    D: 'D4',
    E: 'E4',
    F: 'F4',
    G: 'G4',
    A: 'A4',
    B: 'B4',
    c: 'C5',
    d: 'D5',
    e: 'E5',
    f: 'F5',
    g: 'G5',
    a: 'A5',
    b: 'B5',
  }

  const base = abcPitch.replace(/[',]/g, '')
  let note = baseNotes[base] || base

  if (abcPitch.includes(',')) {
    const match = note.match(/([A-G]#?b?)(\d)/)
    if (match) {
      note = match[1] + (parseInt(match[2]) - 1)
    }
  }
  if (abcPitch.includes("'")) {
    const match = note.match(/([A-G]#?b?)(\d)/)
    if (match) {
      note = match[1] + (parseInt(match[2]) + 1)
    }
  }

  return note
}

/**
 * Inject note name annotations into ABC notation
 */
function injectNoteAnnotations(abc: string, notationSystem: 'latin' | 'solfege'): string {
  const lines = abc.split('\n')
  const processedLines = lines.map((line) => {
    if (/^[A-Z]:/.test(line) || /^%%/.test(line) || /^\[V:/.test(line)) {
      return line
    }
    return line.replace(
      /(\^{1,2}|_{1,2}|=)?([A-Ga-g])([,']*)/g,
      (match, accidental = '', letter) => {
        if (letter.toLowerCase() === 'z' || letter.toLowerCase() === 'x') {
          return match
        }
        const upperLetter = letter.toUpperCase()
        let accidentalDisplay = ''
        if (accidental === '^') accidentalDisplay = '#'
        else if (accidental === '^^') accidentalDisplay = '##'
        else if (accidental === '_') accidentalDisplay = 'b'
        else if (accidental === '__') accidentalDisplay = 'bb'
        const latinName = upperLetter + accidentalDisplay
        const displayName = getNoteLabel(latinName, notationSystem)
        return `"^${displayName}"${match}`
      }
    )
  })
  return processedLines.join('\n')
}

// Consistent render options for all ABC notation
// Staff width set to fill content area
const RENDER_OPTIONS = {
  responsive: 'resize' as const,
  staffwidth: 700,
  paddingtop: 0,
  paddingbottom: 5,
  paddingleft: 0,
  paddingright: 0,
  add_classes: true,
}

/**
 * AbcRenderer - Unified component for rendering ABC notation
 * ONE consistent design for all ABC notation throughout the app
 */
export const AbcRenderer: React.FC<AbcRendererProps> = ({
  abc,
  title,
  description,
  showPlayButton = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const synthRef = useRef<InstanceType<typeof abcjs.synth.CreateSynth> | null>(null)
  const timingRef = useRef<InstanceType<typeof abcjs.TimingCallbacks> | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [showNotation, setShowNotation] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const notationSystem = useSettingsStore((s) => s.notationSystem)
  const { playNote, releaseNote } = useAudioStore()

  // Generate ABC with or without note annotations
  const processedAbc = useMemo(() => {
    if (showNotes) {
      return injectNoteAnnotations(abc, notationSystem)
    }
    return abc
  }, [abc, showNotes, notationSystem])

  // Stop function for this instance
  const stopPlayback = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.stop()
      synthRef.current = null
    }
    if (timingRef.current) {
      timingRef.current.stop()
      timingRef.current = null
    }
    setIsPlaying(false)
    // Re-render with current options
    if (containerRef.current) {
      abcjs.renderAbc(containerRef.current, processedAbc, RENDER_OPTIONS)
    }
  }, [processedAbc])

  // Register with global manager
  useEffect(() => {
    const unregister = abcPlaybackManager.register(stopPlayback)
    return () => {
      unregister()
      stopPlayback()
    }
  }, [stopPlayback])

  // Handle note click
  const handleNoteClick = useCallback(
    (abcNote: string) => {
      const note = abcToNoteName(abcNote)
      playNote(note)
      setTimeout(() => releaseNote(note), 200)
    },
    [playNote, releaseNote]
  )

  // Initial render
  useEffect(() => {
    if (containerRef.current) {
      abcjs.renderAbc(containerRef.current, processedAbc, {
        ...RENDER_OPTIONS,
        clickListener: (abcelem: unknown) => {
          const elem = abcelem as { pitches?: Array<{ name: string }> }
          if (elem.pitches && elem.pitches[0]) {
            handleNoteClick(elem.pitches[0].name)
          }
        },
      })
    }
  }, [processedAbc, handleNoteClick])

  // Handle play button click
  const handlePlay = async () => {
    if (!containerRef.current || isLoading) return

    if (isPlaying) {
      stopPlayback()
      return
    }

    // Stop all other players first
    abcPlaybackManager.stopAll()
    setIsLoading(true)

    try {
      const visualObj = abcjs.renderAbc(containerRef.current, processedAbc, RENDER_OPTIONS)[0]

      const synth = new abcjs.synth.CreateSynth()
      synthRef.current = synth

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const audioContext = new AudioContextClass()

      await synth.init({
        visualObj,
        audioContext,
        millisecondsPerMeasure: visualObj.millisecondsPerMeasure(),
        options: {
          soundFontUrl: 'https://paulrosen.github.io/midi-js-soundfonts/abcjs/',
        },
      })

      await synth.prime()

      const timingCallbacks = new abcjs.TimingCallbacks(visualObj, {
        eventCallback: (ev) => {
          if (!ev) {
            stopPlayback()
            return 'continue' as const
          }
          if (containerRef.current) {
            containerRef.current.querySelectorAll('.abcjs-note.highlight').forEach((el) => {
              el.classList.remove('highlight')
            })
            ev.elements?.forEach((group) => {
              group.forEach((el) => el.classList.add('highlight'))
            })
          }
          return undefined
        },
      })

      timingRef.current = timingCallbacks
      synth.start()
      timingCallbacks.start()
      setIsPlaying(true)
    } catch (error) {
      console.error('Error playing ABC:', error)
      stopPlayback()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="abc-renderer my-4 bg-white dark:bg-slate-900/80 rounded-xl border border-[#30e8e8]/30 shadow-sm overflow-hidden">
      {/* Header - unified design */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
        <div>
          {title && (
            <div className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider text-left">
              ♪ {title}
            </div>
          )}
          {description && (
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 text-left">{description}</p>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer text-xs text-slate-500 hover:text-slate-300">
            <input
              type="checkbox"
              checked={showNotes}
              onChange={(e) => setShowNotes(e.target.checked)}
              className="w-3 h-3 accent-[#30e8e8] rounded"
            />
            <span>Notes</span>
          </label>

          {showPlayButton && (
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className={`
                flex items-center justify-center w-8 h-8 rounded-lg transition-all
                ${
                  isPlaying
                    ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300'
                    : 'bg-[#30e8e8] text-[#111818] hover:bg-[#26d4d4]'
                }
                ${isLoading ? 'opacity-50 cursor-wait' : ''}
              `}
              title={isPlaying ? 'Stop' : 'Play'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isLoading ? 'hourglass_empty' : isPlaying ? 'stop' : 'play_arrow'}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* ABC notation container */}
      <div
        ref={containerRef}
        className="p-3
          [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto
          [&_.abcjs-note]:cursor-pointer [&_.abcjs-note:hover]:opacity-70
          [&_.abcjs-note.highlight]:fill-[#30e8e8]
          [&_.abcjs-note.highlight]:stroke-[#30e8e8]"
      />

      {/* Footer - unified design */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-slate-200 dark:border-slate-700">
        <span className="text-xs text-slate-400">Click any note to hear it</span>
        <button
          onClick={() => setShowNotation(!showNotation)}
          className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
        >
          <span className="text-[10px]">{showNotation ? '▼' : '▸'}</span>
          View ABC Notation
        </button>
      </div>

      {/* ABC Notation content (collapsible) */}
      {showNotation && (
        <pre className="mx-4 mb-3 p-3 bg-slate-100 dark:bg-slate-900 rounded text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto">
          {abc}
        </pre>
      )}

      {/* Annotation styling */}
      <style>{`
        .abc-renderer text.abcjs-annotation {
          fill: #30e8e8;
          font-size: 7px;
          font-weight: bold;
        }
      `}</style>
    </div>
  )
}

export default AbcRenderer
