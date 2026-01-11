import * as Tone from 'tone';

class AudioEngine {
  private static instance: AudioEngine;
  private isInitialized: boolean = false;
  private synth: Tone.PolySynth | null = null;

  private constructor() {}

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    await Tone.start();
    // Use PolySynth for multiple notes (chords, rapid playing)
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    this.isInitialized = true;
  }

  public playNote(note: string, duration: string = '8n'): void {
    if (!this.isInitialized || !this.synth) {
      console.warn('AudioEngine not initialized');
      return;
    }

    // Trigger attack and release
    this.synth.triggerAttackRelease(note, duration);
  }

  public getState(): Tone.ToneContext['state'] {
    return Tone.getContext().state;
  }
}

export const audioEngine = AudioEngine.getInstance();
