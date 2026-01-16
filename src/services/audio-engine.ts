import type * as Tone from 'tone';

class AudioEngine {
  private static instance: AudioEngine;
  private isInitialized: boolean = false;
  private synth: Tone.PolySynth | null = null;
  private sfxSynth: Tone.PolySynth | null = null;
  private ToneLib: typeof Tone | null = null;

  private constructor() {}

  public static getInstance(): AudioEngine {
    if (!AudioEngine.instance) {
      AudioEngine.instance = new AudioEngine();
    }
    return AudioEngine.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.ToneLib = await import('tone');

      await this.ToneLib.start();
      // Use PolySynth for multiple notes (chords, rapid playing)
      this.synth = new this.ToneLib.PolySynth(this.ToneLib.Synth).toDestination();

      // Initialize SFX synth (reused for all sound effects)
      this.sfxSynth = new this.ToneLib.PolySynth(this.ToneLib.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 },
        volume: -5
      }).toDestination();

      this.isInitialized = true;
    } catch (e) {
      console.error("Failed to initialize audio engine", e);
    }
  }

  public playNote(note: string, duration: string = '8n'): void {
    if (!this.isInitialized || !this.synth) {
      console.warn('AudioEngine not initialized');
      return;
    }

    // Trigger attack and release
    this.synth.triggerAttackRelease(note, duration);
  }

  public startNote(note: string): void {
    if (!this.isInitialized || !this.synth) {
      console.warn('AudioEngine not initialized');
      return;
    }
    this.synth.triggerAttack(note);
  }

  public stopNote(note: string): void {
    if (!this.isInitialized || !this.synth) {
      return;
    }
    this.synth.triggerRelease(note);
  }

  public playSuccess(): void {
    if (!this.isInitialized || !this.sfxSynth || !this.ToneLib) return;
    // Simple cheerful arpeggio or chime
    const now = this.ToneLib.now();
    this.sfxSynth.triggerAttackRelease("C5", "32n", now);
    this.sfxSynth.triggerAttackRelease("E5", "32n", now + 0.05);
    this.sfxSynth.triggerAttackRelease("G5", "16n", now + 0.1);
  }

  public playFailure(): void {
    if (!this.isInitialized || !this.sfxSynth || !this.ToneLib) return;
    // Discordant sound
    const now = this.ToneLib.now();
    this.sfxSynth.triggerAttackRelease(["C3", "F#3"], "8n", now);
  }

  public getState(): Tone.BaseContext['state'] {
    if (!this.ToneLib) return 'suspended';
    return this.ToneLib.getContext().state;
  }
}

export const audioEngine = AudioEngine.getInstance();
