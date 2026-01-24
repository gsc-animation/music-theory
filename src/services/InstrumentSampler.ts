import * as Tone from 'tone'

/**
 * Service to manage the Tone.js Sampler for realistic instrument playback.
 * Currently configured for a Piano.
 */
class InstrumentSampler {
  private static instance: InstrumentSampler
  private sampler: Tone.Sampler | null = null
  private isLoaded: boolean = false
  private isLoading: boolean = false

  private constructor() {}

  public static getInstance(): InstrumentSampler {
    if (!InstrumentSampler.instance) {
      InstrumentSampler.instance = new InstrumentSampler()
    }
    return InstrumentSampler.instance
  }

  /**
   * Loads the instrument samples.
   * Uses Salamander Piano samples hosted by Tone.js examples.
   */
  public async load(): Promise<void> {
    if (this.isLoaded || this.isLoading) return

    this.isLoading = true

    return new Promise((resolve, reject) => {
      try {
        this.sampler = new Tone.Sampler({
          urls: {
            A0: 'A0.mp3',
            C1: 'C1.mp3',
            'D#1': 'Ds1.mp3',
            'F#1': 'Fs1.mp3',
            A1: 'A1.mp3',
            C2: 'C2.mp3',
            'D#2': 'Ds2.mp3',
            'F#2': 'Fs2.mp3',
            A2: 'A2.mp3',
            C3: 'C3.mp3',
            'D#3': 'Ds3.mp3',
            'F#3': 'Fs3.mp3',
            A3: 'A3.mp3',
            C4: 'C4.mp3',
            'D#4': 'Ds4.mp3',
            'F#4': 'Fs4.mp3',
            A4: 'A4.mp3',
            C5: 'C5.mp3',
            'D#5': 'Ds5.mp3',
            'F#5': 'Fs5.mp3',
            A5: 'A5.mp3',
            C6: 'C6.mp3',
            'D#6': 'Ds6.mp3',
            'F#6': 'Fs6.mp3',
            A6: 'A6.mp3',
            C7: 'C7.mp3',
            'D#7': 'Ds7.mp3',
            'F#7': 'Fs7.mp3',
            A7: 'A7.mp3',
            C8: 'C8.mp3',
          },
          release: 1,
          baseUrl: 'https://tonejs.github.io/audio/salamander/',
          onload: () => {
            console.log('Instrument samples loaded successfully')
            this.isLoaded = true
            this.isLoading = false
            resolve()
          },
          onerror: (err) => {
            console.error('Failed to load instrument samples:', err)
            this.isLoading = false
            reject(err)
          },
        }).toDestination()
      } catch (e) {
        this.isLoading = false
        reject(e)
      }
    })
  }

  public playNote(
    note: string,
    duration: string | number = '8n',
    time?: number,
    velocity?: number
  ): void {
    if (!this.isLoaded || !this.sampler) {
      console.warn(`InstrumentSampler: Cannot play ${note}, samples not loaded.`)
      return
    }
    this.sampler.triggerAttackRelease(note, duration, time, velocity)
  }

  public startNote(note: string, time?: number, velocity?: number): void {
    if (!this.isLoaded || !this.sampler) return
    this.sampler.triggerAttack(note, time, velocity)
  }

  public stopNote(note: string, time?: number): void {
    if (!this.isLoaded || !this.sampler) return
    this.sampler.triggerRelease(note, time)
  }

  public get loaded(): boolean {
    return this.isLoaded
  }
}

export const instrumentSampler = InstrumentSampler.getInstance()
