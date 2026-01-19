import * as Tone from 'tone';

/**
 * Service to manage the Tone.js AudioContext.
 * Handles initialization and "unlocking" the audio context on user interaction.
 */
class AudioContextManager {
  private static instance: AudioContextManager;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): AudioContextManager {
    if (!AudioContextManager.instance) {
      AudioContextManager.instance = new AudioContextManager();
    }
    return AudioContextManager.instance;
  }

  /**
   * Initializes the Audio Context.
   * This MUST be called in response to a user interaction (click, touch)
   * to comply with browser autoplay policies.
   */
  public async initialize(): Promise<void> {
    // If already running, no need to do anything
    if (this.isInitialized && Tone.context.state === 'running') {
      return;
    }

    try {
      await Tone.start();
      console.log('Audio Context started via AudioContextManager');
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to start Audio Context:', error);
      throw error;
    }
  }

  /**
   * Resumes the Audio Context if it is suspended.
   */
  public async resume(): Promise<void> {
    if (Tone.context.state === 'suspended') {
      await Tone.context.resume();
    }
  }

  public get state(): Tone.BaseContext['state'] {
    return Tone.context.state;
  }

  public get context(): Tone.BaseContext {
    return Tone.context;
  }
}

export const audioContextManager = AudioContextManager.getInstance();
