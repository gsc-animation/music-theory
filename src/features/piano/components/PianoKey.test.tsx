import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PianoKey from './PianoKey';

describe('PianoKey', () => {
  const onTriggerNote = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders white key correctly', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        onTriggerNote={onTriggerNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });
    expect(key).toBeInTheDocument();
    expect(key).toHaveClass('bg-ricePaper');
  });

  it('renders black key correctly', () => {
    render(
      <PianoKey
        note="C#4"
        type="black"
        onTriggerNote={onTriggerNote}
      />
    );
    const key = screen.getByRole('button', { name: /C#4/i });
    expect(key).toBeInTheDocument();
    expect(key).toHaveClass('bg-warmWood');
  });

  it('triggers note on pointer down', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        onTriggerNote={onTriggerNote}
      />
    );
    const key = screen.getByRole('button', { name: /C4/i });
    fireEvent.pointerDown(key);
    expect(onTriggerNote).toHaveBeenCalledWith('C4');
  });

  it('renders optional label', () => {
    render(
      <PianoKey
        note="C4"
        type="white"
        label="Do"
        onTriggerNote={onTriggerNote}
      />
    );
    expect(screen.getByText('Do')).toBeInTheDocument();
  });
});
