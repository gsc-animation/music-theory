import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import PianoKey from './PianoKey';
import { useSettingsStore } from '../../../stores/useSettingsStore';

describe('PianoKey', () => {
  const onStartNote = vi.fn();
  const onStopNote = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    useSettingsStore.setState({ notationSystem: 'latin' });
    cleanup();
  });

  it('renders white key correctly', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });
    expect(key).toBeInTheDocument();
    expect(key).toHaveClass('bg-rice-paper');
  });

  it('renders black key correctly', () => {
    render(
      <PianoKey
        note="C#4"
        type="black"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    const key = screen.getByRole('button', { name: /C#4/i });
    expect(key).toBeInTheDocument();
    expect(key).toHaveClass('bg-warm-wood');
  });

  it('triggers note on pointer down', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });
    fireEvent.pointerDown(key);
    expect(onStartNote).toHaveBeenCalledWith('C4');
  });

  it('stops note on pointer up', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });
    fireEvent.pointerDown(key);
    fireEvent.pointerUp(key);
    expect(onStopNote).toHaveBeenCalledWith('C4');
  });

  it('stops note on pointer leave', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });
    fireEvent.pointerDown(key);
    fireEvent.pointerLeave(key);
    expect(onStopNote).toHaveBeenCalledWith('C4');
  });

  it('renders localized label based on store', () => {
    useSettingsStore.setState({ notationSystem: 'latin' });
    const { rerender } = render(
      <PianoKey
        note="C4"
        type="white"
        label="C" // Pass label to enable rendering
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    // Should show C (default behavior for C4)
    expect(screen.getByText('C')).toBeInTheDocument();

    useSettingsStore.setState({ notationSystem: 'solfege' });
    // Force rerender with new store state
    rerender(
      <PianoKey
        note="C4"
        type="white"
        label="C"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    expect(screen.getByText('Do')).toBeInTheDocument();
  });
});
