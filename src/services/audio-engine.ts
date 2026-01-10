import * as Tone from 'tone';

class AudioEngine {
  private static instance: AudioEngine;
  private isInitialized: boolean = false;

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
    this.isInitialized = true;
    console.log('Audio Engine Initialized');
  }

  public getContext(): Tone.BaseContext {
    return Tone.getContext();
  }
}

export const audioEngine = AudioEngine.getInstance();
