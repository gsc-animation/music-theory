import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MusicStaff } from './MusicStaff';

describe('MusicStaff', () => {
  it('renders the container', () => {
    // Provide a single note (C4) which should work with strict=false
    render(<MusicStaff notes={['C4']} />);
    const container = screen.getByTestId('music-staff-container');
    expect(container).toBeInTheDocument();
  });

  it('renders an SVG via VexFlow', () => {
    // Provide a single note (C4) which should work with strict=false
    render(<MusicStaff notes={['C4']} />);
    const container = screen.getByTestId('music-staff-container');
    // VexFlow should append an SVG
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('observes resize events', () => {
    render(<MusicStaff notes={['C4']} />);
    // Since we mocked ResizeObserver, we can check if it was instantiated
    expect(global.ResizeObserver).toHaveBeenCalled();
  });

  it('cleans up previous render on update', () => {
    const { rerender } = render(<MusicStaff notes={['C4']} />);
    const container = screen.getByTestId('music-staff-container');

    // Rerender with new notes
    rerender(<MusicStaff notes={['D4']} />);

    // Should still have one SVG
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(1);
  });

  it('renders cursor when cursorPosition is provided', () => {
    render(<MusicStaff notes={['C4']} cursorPosition={0.5} width={400} />);
    const cursor = screen.getByTestId('playback-cursor');
    expect(cursor).toBeInTheDocument();
    expect(cursor).toHaveStyle({ transform: 'translateX(200px)' });
  });
});
