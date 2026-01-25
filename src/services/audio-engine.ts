import type * as Tone from 'tone'

/**
 * Sanitize note to ensure it's in standard format (e.g., "C#4" not "^C")
 * Handles ABC notation accidentals that might slip through from various callers
 */
function sanitizeNote(note: string): string {
  if (!note || typeof note !== 'string') return 'C4'

  // If it already looks like a standard note (e.g., "C4", "C#4", "Bb3"), return as-is
  if (/^[A-G][#b]?\d$/.test(note)) {
    return note
  }

  // Handle ABC notation accidentals
  let accidental = ''
  let cleanNote = note

  if (note.startsWith('^^')) {
    accidental = '##'
    cleanNote = note.slice(2)
  } else if (note.startsWith('^')) {
    accidental = '#'
    cleanNote = note.slice(1)
  } else if (note.startsWith('__')) {
    accidental = 'bb'
    cleanNote = note.slice(2)
  } else if (note.startsWith('_')) {
    accidental = 'b'
    cleanNote = note.slice(1)
  } else if (note.startsWith('=')) {
    cleanNote = note.slice(1)
  }

  // ABC notation: uppercase = octave 4, lowercase = octave 5
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

  // Remove octave markers for lookup
  const baseLetter = cleanNote.replace(/[',]/g, '')
  const baseResult = baseNotes[baseLetter]

  if (!baseResult) {
    // Already in standard format or unknown - return as-is
    console.warn(`[AudioEngine] Unknown note format: "${note}", passing through`)
    return note
  }

  // Parse base note and insert accidental
  const match = baseResult.match(/([A-G])(\d)/)
  if (!match) return baseResult

  let octave = parseInt(match[2])

  // Handle octave modifiers
  const commas = (cleanNote.match(/,/g) || []).length
  const apostrophes = (cleanNote.match(/'/g) || []).length
  octave = octave - commas + apostrophes

  return `${match[1]}${accidental}${octave}`
}

class AudioEngine {
  private static instance: AudioEngine
  private isInitialized: boolean = false
  private synth: Tone.PolySynth | null = null
  private sfxSynth: Tone.PolySynth | null = null
  private ToneLib: typeof Tone | null = null

  private constructor() {}

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine()
    }
    return AudioEngine.instance
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      this.ToneLib = await import('tone')
      await this.ToneLib.start()

      // Use PolySynth with piano-like settings for instrument playback
      this.synth = new this.ToneLib.PolySynth(this.ToneLib.Synth, {
        oscillator: { type: 'triangle' },
        envelope: {
          attack: 0.005,
          decay: 0.3,
          sustain: 0.4,
          release: 0.8,
        },
        volume: -8,
      }).toDestination()

      // Initialize SFX synth (reused for all sound effects)
      this.sfxSynth = new this.ToneLib.PolySynth(this.ToneLib.Synth, {
        oscillator: { type: 'sine' },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 },
        volume: -5,
      }).toDestination()

      this.isInitialized = true
      console.log('AudioEngine initialized with Tone.js')
    } catch (e) {
      console.error('Failed to initialize audio engine', e)
    }
  }

  public playNote(note: string, duration: string = '8n'): void {
    if (!this.isInitialized || !this.synth) {
      console.warn('AudioEngine not initialized')
      return
    }
    this.synth.triggerAttackRelease(sanitizeNote(note), duration)
  }

  public startNote(note: string): void {
    if (!this.isInitialized || !this.synth) {
      console.warn('AudioEngine not initialized')
      return
    }
    this.synth.triggerAttack(sanitizeNote(note))
  }

  public stopNote(note: string): void {
    if (!this.isInitialized || !this.synth) {
      return
    }
    this.synth.triggerRelease(sanitizeNote(note))
  }

  public playSuccess(): void {
    if (!this.isInitialized || !this.sfxSynth || !this.ToneLib) return
    const now = this.ToneLib.now()
    this.sfxSynth.triggerAttackRelease('C5', '32n', now)
    this.sfxSynth.triggerAttackRelease('E5', '32n', now + 0.05)
    this.sfxSynth.triggerAttackRelease('G5', '16n', now + 0.1)
  }

  public playFailure(): void {
    if (!this.isInitialized || !this.sfxSynth || !this.ToneLib) return
    const now = this.ToneLib.now()
    this.sfxSynth.triggerAttackRelease(['C3', 'F#3'], '8n', now)
  }

  public getState(): Tone.BaseContext['state'] {
    if (!this.ToneLib) return 'suspended'
    return this.ToneLib.getContext().state
  }
}

export const audioEngine = AudioEngine.getInstance()
