import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import abcjs from 'abcjs'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { useAudioStore } from '../../stores/useAudioStore'
import { getNoteLabel } from '../../utils/note-labels'
import { useIsMobile, useIsTablet } from '../../hooks/useResponsive'

/**
 * Convert MIDI pitch number to standard note name (e.g., "C4")
 * Used during playback to sync with virtual instruments
 */
const midiPitchToNoteName = (midiPitch: number): string => {
  if (midiPitch < 12 || midiPitch > 127) return ''
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const octave = Math.floor(midiPitch / 12) - 1
  const noteIndex = midiPitch % 12
  return `${noteNames[noteIndex]}${octave}`
}

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
 * Handles accidentals: ^ = sharp, ^^ = double sharp, _ = flat, __ = double flat
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

  // Extract accidentals from ABC notation
  let accidental = ''
  let cleanPitch = abcPitch

  // Handle double accidentals first, then single
  if (abcPitch.startsWith('^^')) {
    accidental = '##'
    cleanPitch = abcPitch.slice(2)
  } else if (abcPitch.startsWith('^')) {
    accidental = '#'
    cleanPitch = abcPitch.slice(1)
  } else if (abcPitch.startsWith('__')) {
    accidental = 'bb'
    cleanPitch = abcPitch.slice(2)
  } else if (abcPitch.startsWith('_')) {
    accidental = 'b'
    cleanPitch = abcPitch.slice(1)
  } else if (abcPitch.startsWith('=')) {
    // Natural sign - no accidental
    cleanPitch = abcPitch.slice(1)
  }

  // Remove octave markers for lookup
  const base = cleanPitch.replace(/[',]/g, '')
  const baseNote = baseNotes[base]

  if (!baseNote) {
    // Fallback: return a safe default note if unrecognized
    console.warn(`Unrecognized ABC pitch: ${abcPitch}`)
    return 'C4'
  }

  // Parse the base note to insert accidental
  const match = baseNote.match(/([A-G])(\d)/)
  if (!match) {
    return baseNote
  }

  let note = match[1] + accidental + match[2]

  // Handle octave modifiers
  if (cleanPitch.includes(',')) {
    const octaveMatch = note.match(/([A-G]#?b?b?)(\d)/)
    if (octaveMatch) {
      note = octaveMatch[1] + (parseInt(octaveMatch[2]) - 1)
    }
  }
  if (cleanPitch.includes("'")) {
    const octaveMatch = note.match(/([A-G]#?b?b?)(\d)/)
    if (octaveMatch) {
      note = octaveMatch[1] + (parseInt(octaveMatch[2]) + 1)
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

// Mobile-first responsive staffwidth helper
const getResponsiveStaffWidth = (isMobile: boolean, isTablet: boolean): number => {
  if (isMobile) {
    // Mobile: use viewport width minus padding, max 600px for comfortable scroll
    return Math.min(typeof window !== 'undefined' ? window.innerWidth - 40 : 600, 600)
  }
  if (isTablet) return 680
  return 700 // Desktop
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
  const { playNoteWithRelease, highlightNote, unhighlightNote, clearHighlights } = useAudioStore()

  // Responsive layout hooks
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  // Calculate responsive staffwidth based on viewport
  const staffWidth = useMemo(
    () => getResponsiveStaffWidth(isMobile, isTablet),
    [isMobile, isTablet]
  )

  // Render options with responsive staffwidth
  const RENDER_OPTIONS = useMemo(
    () => ({
      responsive: 'resize' as const,
      staffwidth: staffWidth,
      paddingtop: 0,
      paddingbottom: 5,
      paddingleft: 0,
      paddingright: 0,
      add_classes: true,
    }),
    [staffWidth]
  )

  // Track currently highlighted notes during playback for proper cleanup
  const currentNotesRef = useRef<string[]>([])

  // Generate ABC with or without note annotations
  const processedAbc = useMemo(() => {
    if (showNotes) {
      return injectNoteAnnotations(abc, notationSystem)
    }
    return abc
  }, [abc, showNotes, notationSystem])

  // Handle note click - supports chords (multiple notes)
  // Uses playNoteWithRelease for both audio auto-release and visual feedback
  const handleNoteClick = useCallback(
    (abcNotes: string | string[]) => {
      console.log('🎹 [AbcRenderer] handleNoteClick() - Note clicked!', abcNotes)
      const notes = Array.isArray(abcNotes) ? abcNotes : [abcNotes]
      const playableNotes = notes.map((n) => abcToNoteName(n))

      console.log('🎹 [AbcRenderer] Playing notes:', playableNotes)
      // Play all notes simultaneously with auto-release (audio + visual)
      playableNotes.forEach((note) => {
        playNoteWithRelease(note)
      })
    },
    [playNoteWithRelease]
  )

  // Unified render function with clickListener
  // This ensures notes remain clickable after playback
  const renderWithClickListener = useCallback(
    (container: HTMLDivElement, abcContent: string) => {
      console.log('📝 [AbcRenderer] Rendering with clickListener')
      const result = abcjs.renderAbc(container, abcContent, {
        ...RENDER_OPTIONS,
        clickListener: (abcelem: unknown) => {
          const elem = abcelem as { pitches?: Array<{ name: string }> }
          if (elem.pitches && elem.pitches.length > 0) {
            const noteNames = elem.pitches.map((p) => p.name)
            handleNoteClick(noteNames)
          }
        },
      })
      console.log('✅ [AbcRenderer] Render complete with clickListener')
      return result
    },
    [handleNoteClick, RENDER_OPTIONS]
  )

  // Stop function for this instance
  const stopPlayback = useCallback(() => {
    console.log('🛑 [AbcRenderer] Stopping playback and re-rendering with clickListener')
    if (synthRef.current) {
      synthRef.current.stop()
      synthRef.current = null
    }
    if (timingRef.current) {
      timingRef.current.stop()
      timingRef.current = null
    }
    // Clear instrument highlights
    currentNotesRef.current.forEach((note) => unhighlightNote(note))
    currentNotesRef.current = []
    clearHighlights()

    setIsPlaying(false)
    // Re-render with clickListener to restore interactivity
    if (containerRef.current) {
      renderWithClickListener(containerRef.current, processedAbc)
    }
  }, [processedAbc, unhighlightNote, clearHighlights, renderWithClickListener])

  // Register with global manager
  useEffect(() => {
    const unregister = abcPlaybackManager.register(stopPlayback)
    return () => {
      unregister()
      stopPlayback()
    }
  }, [stopPlayback])

  // Initial render
  useEffect(() => {
    if (containerRef.current) {
      renderWithClickListener(containerRef.current, processedAbc)
    }
  }, [processedAbc, renderWithClickListener])

  // Handle play button click
  const handlePlay = async () => {
    console.log('🎵 [AbcRenderer] Play button clicked! isPlaying:', isPlaying)
    if (!containerRef.current || isLoading) return

    if (isPlaying) {
      console.log('🛑 [AbcRenderer] Stopping playback')
      stopPlayback()
      return
    }

    console.log('▶️ [AbcRenderer] Starting playback...')
    // Stop all other players first
    abcPlaybackManager.stopAll()
    setIsLoading(true)

    try {
      // Render with clickListener to maintain interactivity during and after playback
      const visualObj = renderWithClickListener(containerRef.current, processedAbc)[0]

      const synth = new abcjs.synth.CreateSynth()
      synthRef.current = synth

      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const audioContext = new AudioContextClass()
      console.log('🔊 [AbcRenderer] AudioContext created, state:', audioContext.state)

      // Resume AudioContext if suspended (browser policy)
      if (audioContext.state === 'suspended') {
        console.log('▶️ [AbcRenderer] Resuming suspended AudioContext...')
        await audioContext.resume()
        console.log('✅ [AbcRenderer] AudioContext resumed, state:', audioContext.state)
      }

      console.log('⏳ [AbcRenderer] Initializing synth...')
      await synth.init({
        visualObj,
        audioContext,
        millisecondsPerMeasure: visualObj.millisecondsPerMeasure(),
        options: {
          soundFontUrl: 'https://paulrosen.github.io/midi-js-soundfonts/abcjs/',
        },
      })
      console.log('✅ [AbcRenderer] Synth init complete')

      console.log('⏳ [AbcRenderer] Priming synth (loading soundfont)...')
      await synth.prime()
      console.log('✅ [AbcRenderer] Synth initialized and primed')

      const timingCallbacks = new abcjs.TimingCallbacks(visualObj, {
        eventCallback: (ev) => {
          if (!ev) {
            stopPlayback()
            return 'continue' as const
          }

          // Clear previous note highlights on instruments
          currentNotesRef.current.forEach((note) => unhighlightNote(note))
          currentNotesRef.current = []

          // Highlight notes on staff SVG
          if (containerRef.current) {
            containerRef.current.querySelectorAll('.abcjs-note.highlight').forEach((el) => {
              el.classList.remove('highlight')
            })
            ev.elements?.forEach((group) => {
              group.forEach((el) => el.classList.add('highlight'))
            })
          }

          // Sync with virtual instruments (Piano, Guitar, Flute)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const evWithMidi = ev as any
          if (evWithMidi.midiPitches && evWithMidi.midiPitches.length > 0) {
            const notes = evWithMidi.midiPitches
              .map((p: { pitch: number }) => midiPitchToNoteName(p.pitch))
              .filter((note: string) => note !== '')
            if (notes.length > 0) {
              console.log('🎵 [AbcRenderer] Playback event - highlighting notes:', notes)
              currentNotesRef.current = notes
              notes.forEach((note: string) => highlightNote(note))
            }
          }

          return undefined
        },
      })

      timingRef.current = timingCallbacks
      console.log('🎼 [AbcRenderer] Starting synth playback...')
      synth.start()
      console.log('🎼 [AbcRenderer] Synth.start() called')
      timingCallbacks.start()
      console.log('⏰ [AbcRenderer] Timing callbacks started')
      setIsPlaying(true)
      console.log('🎵 [AbcRenderer] Playback started!')
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
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 text-left">
              {description}
            </p>
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

      {/* ABC notation container with mobile horizontal scroll */}
      <div className="overflow-x-auto md:overflow-visible">
        <div
          ref={containerRef}
          className="p-3 min-w-min
            [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:mx-auto
            [&_.abcjs-note]:cursor-pointer [&_.abcjs-note:hover]:opacity-70
            [&_.abcjs-note.highlight]:fill-[#30e8e8]
            [&_.abcjs-note.highlight]:stroke-[#30e8e8]"
        />
      </div>

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

      {/* Theme-adaptive styling for Light and Dark modes */}
      <style>{`
        /* ===== LIGHT MODE (Default - WCAG AA Compliant) ===== */
        .abc-renderer path.abcjs-notehead,
        .abc-renderer path.abcjs-stem,
        .abc-renderer path.abcjs-beam {
          fill: #1e293b;
          stroke: #1e293b;
        }
        .abc-renderer path.abcjs-staff,
        .abc-renderer path.abcjs-bar {
          stroke: #64748b;
        }
        .abc-renderer text {
          fill: #334155;
        }
        .abc-renderer text.abcjs-annotation {
          fill: #0d9488;
          font-size: 7px;
          font-weight: bold;
        }
        .abc-renderer .abcjs-note.highlight path {
          fill: #0d9488 !important;
          stroke: #0d9488 !important;
        }
        
        /* ===== DARK MODE - Comprehensive SVG targeting ===== */
        :root.dark .abc-renderer svg path,
        :root.dark .abc-renderer svg line,
        :root.dark .abc-renderer svg rect {
          fill: #cbd5e1 !important;
          stroke: #cbd5e1 !important;
        }
        
        /* Maintain highlight colors for playback */
        :root.dark .abc-renderer .abcjs-note.highlight path {
          fill: #30e8e8 !important;
          stroke: #30e8e8 !important;
        }
        
        /* Annotation text */
        :root.dark .abc-renderer text.abcjs-annotation {
          fill: #30e8e8 !important;
        }
      `}</style>
    </div>
  )
}

export default AbcRenderer
