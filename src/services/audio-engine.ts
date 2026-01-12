import * as Tone from 'tone';

class AudioEngine {
  private static instance: AudioEngine;
  private isInitialized: boolean = false;
  private synth: Tone.PolySynth | null = null;
  private sfxSynth: Tone.PolySynth | null = null;

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

    // Initialize SFX synth (reused for all sound effects)
    this.sfxSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 },
      volume: -5
    }).toDestination();

    // Initialize SFX Players
    // Since we don't have actual files yet, we'll setup simple synths for fallback or just keep placeholders
    // For real implementation, we'd load URLs.
    // Creating simple synths for SFX as placeholders if files missing, or we can use Tone.Player
    // But since we created the directory, we assume files might exist or we handle errors.
    // Let's use simple synths for SFX for now as we don't have assets.
    // Actually, let's use a separate synth for SFX to ensure polyphony

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
    if (!this.isInitialized || !this.sfxSynth) return;
    // Simple cheerful arpeggio or chime
    const now = Tone.now();
    this.sfxSynth.triggerAttackRelease("C5", "32n", now);
    this.sfxSynth.triggerAttackRelease("E5", "32n", now + 0.05);
    this.sfxSynth.triggerAttackRelease("G5", "16n", now + 0.1);
  }

  public playFailure(): void {
    if (!this.isInitialized || !this.sfxSynth) return;
    // Discordant sound
    const now = Tone.now();
    this.sfxSynth.triggerAttackRelease(["C3", "F#3"], "8n", now);
  }

  public getState(): Tone.BaseContext['state'] {
    return Tone.getContext().state;
  }
}

export const audioEngine = AudioEngine.getInstance();
