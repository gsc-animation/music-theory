import * as Tone from 'tone'
import { YIN } from 'pitchfinder'
import { audioContextManager } from './AudioContextManager'

export interface PitchDetectionResult {
  frequency: number | null
  note: string | null
  cents: number | null
  clarity: number // Placeholder, YIN in pitchfinder just returns freq usually
}

export type PitchCallback = (data: PitchDetectionResult) => void

class PitchDetector {
  private static instance: PitchDetector
  private mic: Tone.UserMedia
  private analyser: Tone.Analyser
  private detect: (signal: Float32Array) => number | null
  private isListening: boolean = false
  private animationFrameId: number | null = null
  private listeners: Set<PitchCallback> = new Set()
  private lastProcessedTime: number = 0
  private processInterval: number = 1000 / 30 // ~30 fps to reduce load

  // Configuration
  private readonly bufferSize: number = 2048 // Power of 2
  private readonly yinThreshold: number = 0.1

  private constructor() {
    this.mic = new Tone.UserMedia()
    this.analyser = new Tone.Analyser('waveform', this.bufferSize)
    this.mic.connect(this.analyser)

    // Initialize YIN detector
    // Note: We'll update sampleRate when starting if context is available
    this.detect = YIN({
      threshold: this.yinThreshold,
      bufferSize: this.bufferSize,
    })
  }

  public static getInstance(): PitchDetector {
    if (!PitchDetector.instance) {
      PitchDetector.instance = new PitchDetector()
    }
    return PitchDetector.instance
  }

  /**
   * Initialize microphone access.
   * Must be called after user interaction due to AudioContext policies.
   */
  public async initialize(): Promise<void> {
    if (this.mic.state === 'started') return

    // Ensure AudioContext is ready
    await audioContextManager.initialize()

    try {
      await this.mic.open()
      console.log('Microphone initialized')

      // Re-initialize detector with correct sample rate
      if (Tone.context.sampleRate) {
        this.detect = YIN({
          sampleRate: Tone.context.sampleRate,
          threshold: this.yinThreshold,
          bufferSize: this.bufferSize,
        })
      }
    } catch (error) {
      console.error('Failed to access microphone:', error)
      throw error
    }
  }

  /**
   * Start pitch detection loop
   */
  public start(): void {
    if (this.isListening) return

    if (this.mic.state !== 'started') {
      console.warn('Microphone not started. Call initialize() first.')
      return
    }

    this.isListening = true
    this.loop()
  }

  /**
   * Stop pitch detection loop
   */
  public stop(): void {
    this.isListening = false
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  /**
   * Close microphone resource
   */
  public close(): void {
    this.stop()
    this.mic.close()
  }

  public addListener(callback: PitchCallback): void {
    this.listeners.add(callback)
    // If we have listeners and valid mic, ensure we are running
    if (this.listeners.size > 0 && this.mic.state === 'started' && !this.isListening) {
      this.start()
    }
  }

  public removeListener(callback: PitchCallback): void {
    this.listeners.delete(callback)
    if (this.listeners.size === 0) {
      this.stop()
    }
  }

  private loop = (time: number = 0) => {
    if (!this.isListening) return

    this.animationFrameId = requestAnimationFrame(this.loop)

    // Throttle processing
    if (time - this.lastProcessedTime < this.processInterval) {
      return
    }
    this.lastProcessedTime = time

    try {
      const waveform = this.analyser.getValue()

      // Ensure we have data
      if (waveform instanceof Float32Array) {
        const frequency = this.detect(waveform)

        let result: PitchDetectionResult

        if (frequency && frequency > 0) {
          const note = Tone.Frequency(frequency).toNote()
          const midi = Tone.Frequency(frequency).toMidi()
          // Calculate cents deviation: (midi - round(midi)) * 100
          const cents = (midi - Math.round(midi)) * 100

          result = {
            frequency,
            note,
            cents: Math.round(cents),
            clarity: 1, // YIN (js version) doesn't expose probability easily in this signature
          }
        } else {
          result = {
            frequency: null,
            note: null,
            cents: null,
            clarity: 0,
          }
        }

        this.notifyListeners(result)
      }
    } catch (err) {
      console.error('Error in pitch detection loop:', err)
    }
  }

  private notifyListeners(data: PitchDetectionResult): void {
    this.listeners.forEach((cb) => cb(data))
  }
}

export const pitchDetector = PitchDetector.getInstance()
