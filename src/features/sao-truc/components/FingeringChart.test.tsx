import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FingeringChart from './FingeringChart';
import { HoleState } from '../types';

describe('FingeringChart', () => {
  it('renders correctly', () => {
    const holes: HoleState[] = ['X', 'X', 'X', 'X', 'X', 'X'];
    const { container } = render(<FingeringChart holes={holes} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders 6 holes', () => {
    const holes: HoleState[] = ['X', 'X', 'X', 'X', 'X', 'X'];
    const { container } = render(<FingeringChart holes={holes} />);
    // 6 finger holes (circles)
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(6);
  });

  it('renders open and closed states', () => {
    const holes: HoleState[] = ['O', 'X', 'O', 'X', 'O', 'X'];
    const { container } = render(<FingeringChart holes={holes} />);

    // Open holes use rice-paper fill
    const openHoles = container.querySelectorAll('.fill-rice-paper');
    expect(openHoles.length).toBe(3);

    // Closed holes use stone-grey fill
    const closedHoles = container.querySelectorAll('.fill-stone-grey');
    expect(closedHoles.length).toBe(3); // Note: stroke-warm-wood might be used too
  });

  it('renders half-hole state', () => {
    const holes: HoleState[] = ['H'];
    const { container } = render(<FingeringChart holes={holes} />);

    // Half hole should contain a path with fill-stone-grey
    const halfHolePart = container.querySelector('path.fill-stone-grey');
    expect(halfHolePart).toBeInTheDocument();
  });

  it('renders 10 holes correctly without crashing', () => {
    const holes: HoleState[] = Array(10).fill('X');
    const { container } = render(<FingeringChart holes={holes} type="10-hole" />);

    // 10 finger holes (circles)
    const circles = container.querySelectorAll('circle.fill-stone-grey'); // Filter for hole circles, excluding blow hole/bg if any
    // Actually the component implementation uses circle for body parts too?
    // Let's count circles that have stroke-warm-wood (which are holes)
    const holeCircles = container.querySelectorAll('circle.stroke-warm-wood');
    expect(holeCircles.length).toBe(10);
  });
});
