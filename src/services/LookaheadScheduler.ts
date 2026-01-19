import * as Tone from 'tone';
import { audioContextManager } from './AudioContextManager';

type TickCallback = (progress: number, beat: number) => void;

/**
 * Service to manage high-precision audio/visual synchronization.
 * Uses the "Lookahead" pattern where audio is scheduled in advance on the AudioContext,
 * while visuals are updated in real-time via requestAnimationFrame tracking Tone.Transport.seconds.
 */
class LookaheadScheduler {
  private static instance: LookaheadScheduler;
  private isRunning: boolean = false;
  private tickCallback: TickCallback | null = null;
  private animationFrameId: number | null = null;

  // Total duration of the loop (measures * beatsPerMeasure)
  private totalBeats: number = 4 * 4; // Default 4 measures of 4/4

  private constructor() {
    // Set default BPM
    Tone.Transport.bpm.value = 120;
  }

  public static getInstance(): LookaheadScheduler {
    if (!LookaheadScheduler.instance) {
      LookaheadScheduler.instance = new LookaheadScheduler();
    }
    return LookaheadScheduler.instance;
  }

  /**
   * Sets the loop configuration.
   * @param measures Number of measures in the loop
   * @param timeSignature Time signature string (e.g. "4/4")
   * @param bpm Beats per minute
   */
  public configure(measures: number = 4, timeSignature: string = '4/4', bpm: number = 120) {
    const [beatsPerMeasure, beatUnit] = timeSignature.split('/').map(Number);
    this.totalBeats = measures * beatsPerMeasure;
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.timeSignature = [beatsPerMeasure, beatUnit];

    // Set loop points
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = `${measures}m`;
  }

  /**
   * Starts the transport and the visual loop.
   * @param onTick Callback for visual updates, receives (progress 0-1, currentBeat)
   */
  public async start(onTick: TickCallback) {
    if (this.isRunning) return;

    await audioContextManager.initialize();

    this.tickCallback = onTick;
    this.isRunning = true;

    Tone.Transport.start();
    this.startVisualLoop();
  }

  /**
   * Stops the transport and visual loop.
   */
  public stop() {
    if (!this.isRunning) return;

    this.isRunning = false;
    Tone.Transport.stop();

    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public get running(): boolean {
    return this.isRunning;
  }

  private startVisualLoop() {
    const loop = () => {
      if (!this.isRunning) return;

      // Get current position in beats from Tone.Transport
      // Tone.Transport.position returns "Bars:Beats:Sixteenths" string or Seconds if we use seconds
      // Ideally we use ticks or seconds and convert.
      // Tone.Transport.seconds gives strict AudioContext time of transport.

      // Calculate current beat (0 to totalBeats)
      // We can use Tone.Transport.progress (0-1 of the loop) if loop is set correctly
      const progress = Tone.Transport.progress;
      const currentBeat = progress * this.totalBeats;

      if (this.tickCallback) {
        this.tickCallback(progress, currentBeat);
      }

      this.animationFrameId = requestAnimationFrame(loop);
    };

    this.animationFrameId = requestAnimationFrame(loop);
  }

  /**
   * Schedules an audio event using Tone.Transport.schedule
   * This is for the "Audio" part of the Lookahead.
   */
  public schedule(callback: (time: number) => void, time: string | number) {
     Tone.Transport.schedule(callback, time);
  }

  /**
   * Clears all scheduled events
   */
  public clear() {
    Tone.Transport.cancel();
  }
}

export const lookaheadScheduler = LookaheadScheduler.getInstance();
