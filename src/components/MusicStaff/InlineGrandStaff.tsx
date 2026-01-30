import React, { useEffect, useRef, useMemo, useCallback, useState } from 'react'
import abcjs from 'abcjs'
import 'abcjs/abcjs-audio.css'
import { useAudioStore } from '../../stores/useAudioStore'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getNoteLabel } from '../../utils/note-labels'
import { useIsMobile, useIsTablet } from '../../hooks/useResponsive'

/**
 * Convert MIDI pitch number to standard note name (e.g., "C4")
 */
const midiPitchToNoteName = (midiPitch: number): string => {
  if (midiPitch < 12 || midiPitch > 127) return ''
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const octave = Math.floor(midiPitch / 12) - 1
  const noteIndex = midiPitch % 12
  return `${noteNames[noteIndex]}${octave}`
}

/**
 * Cursor control for abcjs playback animation with instrument highlighting
 */
class CursorControl {
  private cursor: SVGLineElement | null = null
  private rootSelector: string
  private onNotePlay?: (notes: string[]) => void
  private onNoteStop?: (notes: string[]) => void
  private currentNotes: string[] = []
  private isPlaybackActive: boolean = false

  constructor(
    rootSelector: string,
    onNotePlay?: (notes: string[]) => void,
    onNoteStop?: (notes: string[]) => void
  ) {
    this.rootSelector = rootSelector
    this.onNotePlay = onNotePlay
    this.onNoteStop = onNoteStop
  }

  onStart() {
    console.log('🎵 [InlineGrandStaff] CursorControl.onStart() - Playback started!')
    this.isPlaybackActive = true
    const svg = document.querySelector(this.rootSelector + ' svg')
    if (!svg) return

    this.cursor = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    this.cursor.setAttribute('class', 'abcjs-cursor')
    this.cursor.setAttributeNS(null, 'x1', '0')
    this.cursor.setAttributeNS(null, 'y1', '0')
    this.cursor.setAttributeNS(null, 'x2', '0')
    this.cursor.setAttributeNS(null, 'y2', '0')
    svg.appendChild(this.cursor)
  }

  onEvent(ev: abcjs.synth.CursorEvent) {
    if (ev.measureStart === true && ev.left === null) return

    if (this.currentNotes.length > 0 && this.onNoteStop) {
      this.onNoteStop(this.currentNotes)
      this.currentNotes = []
    }

    console.log(
      '🎵 [InlineGrandStaff] CursorControl.onEvent() - Audio playing notes:',
      ev.midiPitches
    )

    const lastSelection = document.querySelectorAll(this.rootSelector + ' .abcjs-highlight')
    lastSelection.forEach((el) => el.classList.remove('abcjs-highlight'))

    ev.elements.forEach((noteGroup) => {
      noteGroup.forEach((note) => {
        note.classList.add('abcjs-highlight')
      })
    })

    if (this.isPlaybackActive && ev.midiPitches && ev.midiPitches.length > 0 && this.onNotePlay) {
      const notes = ev.midiPitches
        .map((p) => midiPitchToNoteName(p.pitch))
        .filter((note) => note !== '')
      if (notes.length > 0) {
        this.currentNotes = notes
        this.onNotePlay(notes)
      }
    }

    if (this.cursor && ev.left != null && ev.top != null && ev.height != null) {
      this.cursor.setAttribute('x1', String(ev.left - 2))
      this.cursor.setAttribute('x2', String(ev.left - 2))
      this.cursor.setAttribute('y1', String(ev.top))
      this.cursor.setAttribute('y2', String(ev.top + ev.height))
    }
  }

  onFinished() {
    this.isPlaybackActive = false

    if (this.currentNotes.length > 0 && this.onNoteStop) {
      this.onNoteStop(this.currentNotes)
      this.currentNotes = []
    }

    const lastSelection = document.querySelectorAll(this.rootSelector + ' .abcjs-highlight')
    lastSelection.forEach((el) => el.classList.remove('abcjs-highlight'))

    if (this.cursor) {
      this.cursor.setAttribute('x1', '0')
      this.cursor.setAttribute('x2', '0')
      this.cursor.setAttribute('y1', '0')
      this.cursor.setAttribute('y2', '0')
    }
  }
}

/**
 * Convert ABC note name to standard note format (e.g., "C4", "E5")
 */
const abcNoteToStandardNote = (abcName: string): string => {
  if (!abcName) return ''

  let letter = ''
  let accidental = ''
  let octave = 4

  let i = 0

  if (abcName[i] === '^') {
    accidental = '#'
    i++
    if (abcName[i] === '^') i++
  } else if (abcName[i] === '_') {
    accidental = 'b'
    i++
    if (abcName[i] === '_') i++
  } else if (abcName[i] === '=') {
    i++
  }

  if (i < abcName.length) {
    letter = abcName[i].toUpperCase()
    if (abcName[i] === abcName[i].toLowerCase() && abcName[i] !== abcName[i].toUpperCase()) {
      octave = 5
    }
    i++
  }

  while (i < abcName.length) {
    if (abcName[i] === ',') {
      octave--
      i++
    } else if (abcName[i] === "'") {
      octave++
      i++
    } else {
      break
    }
  }

  if (!letter || !/[A-G]/.test(letter)) return ''

  return `${letter}${accidental}${octave}`
}

interface InlineGrandStaffProps {
  /** Title displayed in header */
  title?: string
  /** ABC notation to render */
  abc: string
  /** Optional CSS class */
  className?: string
}

/**
 * InlineGrandStaff - Inline Grand Staff renderer with full abcjs playback
 * Used within theoryContent via {{grandStaff:Title|ABC_NOTATION}} syntax
 */
export const InlineGrandStaff: React.FC<InlineGrandStaffProps> = ({
  title,
  abc,
  className = '',
}) => {
  const [instanceId] = useState(() => `inline-staff-${Math.random().toString(36).slice(2, 9)}`)
  const [showNoteNames, setShowNoteNames] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const audioContainerRef = useRef<HTMLDivElement>(null)

  const synthRef = useRef<InstanceType<typeof abcjs.synth.CreateSynth> | null>(null)
  const synthControlRef = useRef<InstanceType<typeof abcjs.synth.SynthController> | null>(null)
  const cursorControlRef = useRef<CursorControl | null>(null)

  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const highlightNote = useAudioStore((state) => state.highlightNote)
  const unhighlightNote = useAudioStore((state) => state.unhighlightNote)
  const clearHighlights = useAudioStore((state) => state.clearHighlights)
  const notationSystem = useSettingsStore((state) => state.notationSystem)

  // Responsive layout hooks
  const isMobile = useIsMobile()
  const isTablet = useIsTablet()

  // Calculate responsive staffwidth based on viewport
  const staffWidth = useMemo(() => {
    if (isMobile) return Math.min(typeof window !== 'undefined' ? window.innerWidth - 40 : 600, 600)
    if (isTablet) return 680
    return 740 // Desktop (slightly wider for grand staff)
  }, [isMobile, isTablet])

  const paperId = useMemo(() => `paper-${instanceId}`, [instanceId])
  const audioId = useMemo(() => `audio-${instanceId}`, [instanceId])

  /**
   * Inject note name annotations into ABC notation
   */
  const injectNoteAnnotations = useCallback(
    (abcStr: string): string => {
      if (!showNoteNames) return abcStr

      const lines = abcStr.split('\n')
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
    },
    [showNoteNames, notationSystem]
  )

  const processedAbc = useMemo(() => {
    const formattedAbc = abc.replace(/\\n/g, '\n')
    return injectNoteAnnotations(formattedAbc)
  }, [abc, injectNoteAnnotations])

  const [isControllerReady, setControllerReady] = useState(false)

  const handlePlaybackNotePlay = useCallback(
    (notes: string[]) => {
      notes.forEach((note) => highlightNote(note))
    },
    [highlightNote]
  )

  const handlePlaybackNoteStop = useCallback(
    (notes: string[]) => {
      notes.forEach((note) => unhighlightNote(note))
    },
    [unhighlightNote]
  )

  useEffect(() => {
    clearHighlights()
  }, [clearHighlights])

  // Initialize synth objects and load controller UI
  useEffect(() => {
    synthRef.current = new abcjs.synth.CreateSynth()
    synthControlRef.current = new abcjs.synth.SynthController()

    cursorControlRef.current = new CursorControl(
      `#${paperId}`,
      handlePlaybackNotePlay,
      handlePlaybackNoteStop
    )

    const timer = setTimeout(() => {
      if (!synthControlRef.current || !cursorControlRef.current) return

      synthControlRef.current.load(
        `#${audioId}`,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cursorControlRef.current as any,
        {
          displayLoop: true,
          displayRestart: true,
          displayPlay: true,
          displayProgress: true,
          displayWarp: true,
        }
      )
      setControllerReady(true)
    }, 100)

    return () => {
      clearTimeout(timer)
      synthRef.current = null
      synthControlRef.current = null
      cursorControlRef.current = null
      setControllerReady(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paperId, audioId])

  // Click listener for individual notes
  const handleNoteClick = useCallback(
    (abcelem: abcjs.AbcElem) => {
      console.log('🎹 [InlineGrandStaff] handleNoteClick() - Note clicked!', abcelem)
      if (abcelem.el_type === 'note' && abcelem.pitches && abcelem.pitches.length > 0) {
        abcelem.pitches.forEach((pitch) => {
          const noteName = abcNoteToStandardNote(pitch.name)
          console.log('🎹 [InlineGrandStaff] Playing note:', noteName)
          if (noteName) {
            playNote(noteName)
            setTimeout(() => releaseNote(noteName), 500)
          }
        })
      }
    },
    [playNote, releaseNote]
  )

  const visualObjRef = useRef<abcjs.TuneObject | null>(null)

  // Render notation
  useEffect(() => {
    if (!containerRef.current) return

    console.log('📝 [InlineGrandStaff] Initial render - Setting up clickListener')
    try {
      const rendered = abcjs.renderAbc(paperId, processedAbc, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: staffWidth,
        paddingtop: 5,
        paddingbottom: 5,
        paddingleft: 10,
        paddingright: 10,
        clickListener: handleNoteClick,
        wrap: {
          minSpacing: 1.8,
          maxSpacing: 2.7,
          preferredMeasuresPerLine: 4,
        },
      })

      if (rendered[0]) {
        visualObjRef.current = rendered[0]
        console.log('✅ [InlineGrandStaff] Initial render complete with clickListener')
      }
    } catch (error) {
      console.warn('InlineGrandStaff: Render error:', error)
    }
  }, [processedAbc, paperId, handleNoteClick, staffWidth])

  // Setup audio after controller is loaded and notation is rendered
  useEffect(() => {
    if (!isControllerReady) return
    if (!visualObjRef.current) return
    if (!synthRef.current || !synthControlRef.current) return

    const setupAudio = async () => {
      try {
        await synthRef.current!.init({ visualObj: visualObjRef.current! })
        await synthControlRef.current!.setTune(visualObjRef.current!, false, {
          chordsOff: false,
        })

        console.log(
          '🔄 [InlineGrandStaff] Re-rendering ABC after setTune to restore click listeners'
        )
        // Re-render ABC notation after setTune to restore click listeners
        // setTune() can interfere with the click handlers set during initial render
        if (containerRef.current) {
          try {
            const rendered = abcjs.renderAbc(paperId, processedAbc, {
              responsive: 'resize',
              add_classes: true,
              staffwidth: staffWidth,
              paddingtop: 5,
              paddingbottom: 5,
              paddingleft: 10,
              paddingright: 10,
              clickListener: handleNoteClick,
              wrap: {
                minSpacing: 1.8,
                maxSpacing: 2.7,
                preferredMeasuresPerLine: 4,
              },
            })
            if (rendered[0]) {
              visualObjRef.current = rendered[0]
              console.log('✅ [InlineGrandStaff] Re-render complete - clickListener restored!')
            }
          } catch (renderErr) {
            console.warn('InlineGrandStaff: Re-render error:', renderErr)
          }
        }
      } catch (err) {
        console.warn('InlineGrandStaff: Audio setup error:', err)
      }
    }

    setupAudio()
  }, [isControllerReady, processedAbc, paperId, handleNoteClick, staffWidth])

  return (
    <div className={`inline-grand-staff my-6 ${className} rounded-2xl border border-slate-200/80 dark:border-slate-700/80 bg-white dark:bg-slate-800/95 shadow-lg shadow-slate-900/5 dark:shadow-black/20 overflow-hidden`}>
      {/* Gradient accent bar at top - matching CollapsiblePanel */}
      <div className="h-1 bg-gradient-to-r from-[#30e8e8] via-[#26d4d4] to-[#1f9d9d] opacity-80" />

      {/* Header - matching CollapsiblePanel styling */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-all duration-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#30e8e8]/10 dark:bg-[#30e8e8]/20">
            <span className="material-symbols-outlined text-[#30e8e8] text-xl">
              music_note
            </span>
          </div>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wider">
            {title || 'Grand Staff View'}
          </span>
        </div>
        <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
          <input
            type="checkbox"
            checked={showNoteNames}
            onChange={(e) => setShowNoteNames(e.target.checked)}
            className="w-3 h-3 accent-[#30e8e8]"
          />
          <span>Notes</span>
        </label>
      </div>

      {/* Staff container with mobile horizontal scroll */}
      <div className="overflow-x-auto md:overflow-visible px-4 pb-4">
        <div
          id={paperId}
          ref={containerRef}
          className="abc-paper bg-white dark:bg-slate-800/50 min-h-[150px] min-w-min overflow-hidden cursor-pointer rounded-xl border border-slate-200 dark:border-transparent"
        />
      </div>

      {/* Audio controls */}
      <div id={audioId} ref={audioContainerRef} className="abc-audio mt-2" />

      {/* Styles - Light Mode + Dark Mode */}
      <style>{`
        .inline-grand-staff .abcjs-container svg {
          width: 100%;
          max-width: 100%;
        }
        
        /* ===== LIGHT MODE (Default) ===== */
        .inline-grand-staff path.abcjs-notehead,
        .inline-grand-staff path.abcjs-stem,
        .inline-grand-staff path.abcjs-beam {
          fill: #1e293b;
          stroke: #1e293b;
        }
        .inline-grand-staff path.abcjs-staff,
        .inline-grand-staff path.abcjs-bar {
          stroke: #64748b;
        }
        .inline-grand-staff text {
          fill: #334155;
        }
        .inline-grand-staff text.abcjs-annotation {
          fill: #0d9488;
          font-size: 7px;
          font-weight: bold;
        }
        .inline-grand-staff .abcjs-note.abcjs-highlight path {
          fill: #0d9488 !important;
          stroke: #0d9488 !important;
        }
        .inline-grand-staff .abcjs-note:hover path {
          fill: #0d9488 !important;
          stroke: #0d9488 !important;
        }
        .inline-grand-staff .abcjs-cursor {
          stroke: #0d9488;
          stroke-width: 2;
          opacity: 0.8;
        }
        .inline-grand-staff .abc-audio {
          background: transparent;
        }
        .inline-grand-staff .abcjs-inline-audio {
          background-color: #f1f5f9;
          border-radius: 8px;
          padding: 8px 12px;
          border: 1px solid #e2e8f0;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-btn {
          background-color: #0d9488 !important;
          border: none !important;
          color: #ffffff !important;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-btn svg {
          fill: #ffffff !important;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-btn:hover {
          background-color: #0f766e !important;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-midi-progress-background {
          background-color: #cbd5e1;
          height: 8px;
          border-radius: 4px;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-midi-progress-indicator {
          background-color: #0d9488;
          height: 8px;
          border-radius: 4px;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-midi-clock {
          color: #334155;
          font-weight: 500;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-tempo-wrapper {
          color: #334155;
        }
        .inline-grand-staff .abcjs-inline-audio .abcjs-tempo-wrapper input {
          color: #1e293b;
          background-color: #e2e8f0;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
        }
        .inline-grand-staff text.abcjs-voice-name {
          display: none;
        }
        
        /* ===== DARK MODE - Comprehensive SVG targeting ===== */
        :root.dark .inline-grand-staff svg path,
        :root.dark .inline-grand-staff svg line,
        :root.dark .inline-grand-staff svg rect,
        :root.dark .inline-grand-staff svg circle,
        :root.dark .inline-grand-staff svg ellipse,
        :root.dark .inline-grand-staff svg text,
        :root.dark .inline-grand-staff svg tspan,
        :root.dark .inline-grand-staff .abcjs-beam,
        :root.dark .inline-grand-staff .abcjs-dot,
        :root.dark .inline-grand-staff .abcjs-staff,
        :root.dark .inline-grand-staff .abcjs-bar,
        :root.dark .inline-grand-staff .abcjs-stem,
        :root.dark .inline-grand-staff .abcjs-notehead,
        :root.dark .inline-grand-staff .abcjs-title,
        :root.dark .inline-grand-staff .abcjs-composer,
        :root.dark .inline-grand-staff .abcjs-meta-top {
          fill: #cbd5e1 !important;
          stroke: #cbd5e1 !important;
        }
        :root.dark .inline-grand-staff text.abcjs-annotation {
          fill: #30e8e8;
        }
        :root.dark .inline-grand-staff .abcjs-note.abcjs-highlight path {
          fill: #30e8e8 !important;
          stroke: #30e8e8 !important;
        }
        :root.dark .inline-grand-staff .abcjs-note:hover path {
          fill: #30e8e8 !important;
          stroke: #30e8e8 !important;
        }
        :root.dark .inline-grand-staff .abcjs-cursor {
          stroke: #30e8e8;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio {
          background-color: rgba(30, 41, 59, 0.8);
          border: none;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio .abcjs-btn {
          background-color: #30e8e8;
          color: #0f172a;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio .abcjs-btn:hover {
          background-color: #22d3ee;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio .abcjs-midi-progress-background {
          background-color: #334155;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio .abcjs-midi-progress-indicator {
          background-color: #30e8e8;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio .abcjs-midi-clock {
          color: #94a3b8;
        }
        :root.dark .inline-grand-staff .abcjs-inline-audio .abcjs-tempo-wrapper {
          color: #94a3b8;
        }
      `}</style>
    </div>
  )
}

export default InlineGrandStaff
