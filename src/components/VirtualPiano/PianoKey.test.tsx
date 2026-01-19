import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import PianoKey from './PianoKey';
import { useSettingsStore } from '../../stores/useSettingsStore';

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
    act(() => {
        useSettingsStore.setState({ notationSystem: 'latin' });
    });

    const { rerender } = render(
      <PianoKey
        note="C4"
        type="white"
        label="C"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    expect(screen.getByText('C')).toBeInTheDocument();

    act(() => {
        useSettingsStore.setState({ notationSystem: 'solfege' });
    });

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

  it('maintains active state for 300ms after pointer up', async () => {
    vi.useFakeTimers();
    render(
      <PianoKey
        note="C4"
        type="white"
        onStartNote={onStartNote}
        onStopNote={onStopNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });

    // Press down
    fireEvent.pointerDown(key);
    expect(key).toHaveClass('bg-bamboo/20');

    // Release
    fireEvent.pointerUp(key);
    expect(key).toHaveClass('bg-bamboo/20');

    // Advance 200ms
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(key).toHaveClass('bg-bamboo/20');

    // Advance past 300ms
    act(() => {
      vi.advanceTimersByTime(101);
    });
    expect(key).toHaveClass('bg-rice-paper');
    expect(key).not.toHaveClass('bg-bamboo/20');

    vi.useRealTimers();
  });
});
