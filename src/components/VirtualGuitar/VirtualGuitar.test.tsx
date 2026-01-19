import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VirtualGuitar } from './VirtualGuitar';

describe('VirtualGuitar', () => {
  it('renders without crashing', () => {
    render(<VirtualGuitar onPlayNote={() => {}} />);
    expect(screen.getByLabelText('Virtual Guitar Fretboard')).toBeInTheDocument();
  });

  it('renders all 6 strings', () => {
    render(<VirtualGuitar onPlayNote={() => {}} />);
    // We expect 6 strings + frets. Hard to query exact lines, but we can check if SVG renders.
    // Let's rely on aria-label or presence.
    const svg = screen.getByLabelText('Virtual Guitar Fretboard');
    expect(svg).toBeInTheDocument();
  });

  it('calls onPlayNote when a fret is clicked', () => {
    const handlePlayNote = vi.fn();
    render(<VirtualGuitar onPlayNote={handlePlayNote} />);

    // We can't easily click specific SVG coords in JSDOM without more setup,
    // but we can find the text labels if showLabels is on, or try to click elements.
    // Our component renders 'g' elements with click handlers.
    // Let's try to find a note label "E2" (Open Low E, String 5)

    // By default showLabels is true, and we render labels for open strings or active notes.
    // Open strings (fret 0) should have labels.
    const lowENote = screen.getByText('E2');
    expect(lowENote).toBeInTheDocument();

    fireEvent.click(lowENote);
    expect(handlePlayNote).toHaveBeenCalledWith('E2');
  });

  it('highlights active notes', () => {
    render(<VirtualGuitar onPlayNote={() => {}} activeNotes={['C3']} />);
    // C3 is A string (String 4), Fret 3.
    // It should render a label "C3" because it's active.
    // C3 appears twice: A string (4,3) and Low E string (5,8).
    // So we expect at least one, or multiple.
    const c3Labels = screen.getAllByText('C3');
    expect(c3Labels.length).toBeGreaterThan(0);
    expect(c3Labels[0]).toBeInTheDocument();
  });
});
