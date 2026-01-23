import React, { useEffect, useRef, useState, useMemo } from 'react'
import ABCJS from 'abcjs'
import type { AbcDemo } from '../../data/course-data'
import { useSettingsStore } from '../../stores/useSettingsStore'
import { getNoteLabel } from '../../utils/note-labels'

interface AbcDemoSectionProps {
  demos: AbcDemo[]
}

/**
 * AbcDemoSection - Renders multiple ABC notation demos with playback
 * Each demo has its own rendering canvas and optional play button
 */
export const AbcDemoSection: React.FC<AbcDemoSectionProps> = ({ demos }) => {
  return (
    <div className="space-y-6">
      {demos.map((demo) => (
        <AbcDemoCard key={demo.id} demo={demo} />
      ))}
    </div>
  )
}

interface AbcDemoCardProps {
  demo: AbcDemo
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

const AbcDemoCard: React.FC<AbcDemoCardProps> = ({ demo }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const synthRef = useRef<InstanceType<typeof ABCJS.synth.CreateSynth> | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const notationSystem = useSettingsStore((s) => s.notationSystem)

  // Generate ABC with or without note annotations
  const processedAbc = useMemo(() => {
    if (showNotes) {
      return injectNoteAnnotations(demo.abc, notationSystem)
    }
    return demo.abc
  }, [demo.abc, showNotes, notationSystem])

  // Render ABC notation
  useEffect(() => {
    if (containerRef.current) {
      ABCJS.renderAbc(containerRef.current, processedAbc, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: 500,
        paddingleft: 10,
        paddingright: 10,
        paddingtop: 10,
        paddingbottom: 10,
      })
    }
  }, [processedAbc])

  // Cleanup synth on unmount
  useEffect(() => {
    return () => {
      if (synthRef.current) {
        synthRef.current.stop()
      }
    }
  }, [])

  const handlePlay = async () => {
    if (!containerRef.current) return

    if (isPlaying && synthRef.current) {
      synthRef.current.stop()
      setIsPlaying(false)
      return
    }

    setIsLoading(true)

    try {
      // Render to get visualObj
      const visualObj = ABCJS.renderAbc(containerRef.current, demo.abc, {
        responsive: 'resize',
        add_classes: true,
        staffwidth: 500,
      })[0]

      // Create synth
      const synth = new ABCJS.synth.CreateSynth()
      synthRef.current = synth

      // Initialize audio context (requires user gesture)
      const AudioContextClass = window.AudioContext || 
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

      // Set up timing callbacks for highlighting
      const timingCallbacks = new ABCJS.TimingCallbacks(visualObj, {
        eventCallback: (ev) => {
          if (!ev) {
            setIsPlaying(false)
            return 'continue' as const
          }
          // Highlight current notes
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

      synth.start()
      timingCallbacks.start()
      setIsPlaying(true)
    } catch (error) {
      console.error('Error playing ABC:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
      {/* Demo Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-100">{demo.title}</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400">{demo.description}</p>
        </div>
        {/* Controls: Notes checkbox + Play button */}
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

          {demo.playable && (
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
                ${isPlaying
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300'
                  : 'bg-[#30e8e8] text-[#111818] hover:bg-[#26d4d4]'
                }
                ${isLoading ? 'opacity-50 cursor-wait' : ''}
              `}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isLoading ? 'hourglass_empty' : isPlaying ? 'stop' : 'play_arrow'}
              </span>
              {isLoading ? 'Loading...' : isPlaying ? 'Stop' : 'Play'}
            </button>
          )}
        </div>
      </div>

      {/* ABC Notation Render */}
      <div 
        ref={containerRef}
        className="abc-demo-container bg-white dark:bg-slate-900 rounded-lg p-2 min-h-[80px]
          [&_.abcjs-note.highlight]:fill-[#30e8e8]
          [&_.abcjs-note.highlight]:stroke-[#30e8e8]
        "
      />
      
      {/* Annotation styling */}
      <style>{`
        .abc-demo-container text.abcjs-annotation {
          fill: #30e8e8;
          font-size: 7px;
          font-weight: bold;
        }
      `}</style>

      {/* Optional: Show ABC source for learning */}
      {demo.interactive && (
        <details className="mt-3">
          <summary className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700 dark:hover:text-slate-300">
            View ABC Notation
          </summary>
          <pre className="mt-2 p-3 bg-slate-100 dark:bg-slate-900 rounded text-xs font-mono text-slate-700 dark:text-slate-300 overflow-x-auto">
            {demo.abc}
          </pre>
        </details>
      )}
    </div>
  )
}

export default AbcDemoSection
