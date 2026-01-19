import { useState, useEffect, useCallback } from 'react';
import * as Tone from 'tone';
import { audioContextManager } from '../services/AudioContextManager';

/**
 * Hook to interact with the AudioContextManager.
 * Provides the current state of the audio context and a function to unlock it.
 */
export const useAudioContext = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [state, setState] = useState<Tone.BaseContext['state']>('suspended');

  useEffect(() => {
    // Set initial state
    setState(audioContextManager.state);
    setIsReady(audioContextManager.state === 'running');

    // Access the raw AudioContext to listen for state changes
    // Tone.context.rawContext is the native AudioContext
    const rawContext = audioContextManager.context.rawContext as AudioContext;

    const handleStateChange = () => {
      const newState = audioContextManager.state;
      setState(newState);
      setIsReady(newState === 'running');
    };

    // Attach event listener for state changes
    if (rawContext) {
        rawContext.addEventListener('statechange', handleStateChange);
    }

    return () => {
      if (rawContext) {
          rawContext.removeEventListener('statechange', handleStateChange);
      }
    };
  }, []);

  /**
   * Unlocks the audio context. Should be bound to a user interaction event.
   */
  const unlock = useCallback(async () => {
    try {
      await audioContextManager.initialize();
      await audioContextManager.resume();

      // Force update state in case the event listener hasn't fired yet
      if (audioContextManager.state === 'running') {
        setIsReady(true);
        setState('running');
      }
    } catch (err) {
      console.error("Failed to unlock audio context:", err);
    }
  }, []);

  return { isReady, state, unlock };
};
