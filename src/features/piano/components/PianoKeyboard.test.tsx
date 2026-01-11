import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PianoKeyboard from './PianoKeyboard';

describe('PianoKeyboard', () => {
  const onStartNote = vi.fn();
  const onStopNote = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders one octave of keys correctly', () => {
    render(<PianoKeyboard startOctave={4} octaves={1} onStartNote={onStartNote} onStopNote={onStopNote} />);

    // Check for C4 to B4 (12 semitones: 7 white, 5 black)
    // White keys: C, D, E, F, G, A, B
    expect(screen.getByRole('button', { name: /C4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /D4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /E4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /F4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /G4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /A4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /B4/i })).toBeInTheDocument();

    // Black keys: C#, D#, F#, G#, A#
    expect(screen.getByRole('button', { name: /C#4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /D#4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /F#4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /G#4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /A#4/i })).toBeInTheDocument();
  });

  it('renders keys in correct order', () => {
     render(<PianoKeyboard startOctave={4} octaves={1} onStartNote={onStartNote} onStopNote={onStopNote} />);
     const keys = screen.getAllByRole('button');
     // Just checking we have keys, specific order is visual but accessibility order should be logical
     // We expect 12 keys
     expect(keys).toHaveLength(12);
    });

    it('calls onStartNote when a key is pressed', () => {
    render(<PianoKeyboard startOctave={4} octaves={1} onStartNote={onStartNote} onStopNote={onStopNote} />);
    const c4Key = screen.getByRole('button', { name: /C4/i });
    fireEvent.pointerDown(c4Key);
    expect(onStartNote).toHaveBeenCalledWith('C4');
    });

    it('positions black keys with high precision', () => {
      render(<PianoKeyboard startOctave={4} octaves={1} onStartNote={onStartNote} onStopNote={onStopNote} />);

      const getLeftStyle = (note: string) => {
        const key = screen.getByRole('button', { name: new RegExp(note, 'i') });
        return key.parentElement?.style.left;
      };

      expect(getLeftStyle('C#4')).toBe('9.2857%');
      expect(getLeftStyle('D#4')).toBe('23.5714%');
      expect(getLeftStyle('F#4')).toBe('52.1429%');
      expect(getLeftStyle('G#4')).toBe('66.4286%');
      expect(getLeftStyle('A#4')).toBe('80.7143%');
    });
});
