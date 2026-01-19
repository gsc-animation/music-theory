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
    // 6 finger holes (circles) + decorative blow hole + maybe others
    // Let's count circles that look like finger holes (fill-stone-700 or fill-[#fdf6e3])
    // Or just count total circles and subtract blow hole if needed.
    // My implementation has:
    // 1 circle per hole (graphic)
    // + 1 circle per half hole (graphic background)
    // + 1 decorative blow hole (ellipse, but rendered as ellipse tag)
    // But 'circle' tag is used for holes.

    // Closed holes use circle.
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBe(6);
  });

  it('renders open and closed states', () => {
    const holes: HoleState[] = ['O', 'X', 'O', 'X', 'O', 'X'];
    const { container } = render(<FingeringChart holes={holes} />);

    // Open holes use fill-[#fdf6e3]
    // Note: CSS class selector with brackets might need escaping or check class list
    // querySelectorAll('.fill-\\[\\#fdf6e3\\]') might work or just check attribute
    const openHoles = container.querySelectorAll('.fill-\\[\\#fdf6e3\\]');
    expect(openHoles.length).toBe(3);

    // Closed holes use fill-stone-700
    const closedHoles = container.querySelectorAll('.fill-stone-700');
    expect(closedHoles.length).toBe(3);
  });

  it('renders half-hole state', () => {
    const holes: HoleState[] = ['H'];
    const { container } = render(<FingeringChart holes={holes} />);

    // Half hole should contain a path with fill-stone-700
    const halfHolePart = container.querySelector('path.fill-stone-700');
    expect(halfHolePart).toBeInTheDocument();
  });

  it('renders 10 holes correctly without crashing', () => {
    const holes: HoleState[] = Array(10).fill('X');
    const { container } = render(<FingeringChart holes={holes} type="10-hole" />);

    // 10 finger holes
    const closedHoles = container.querySelectorAll('circle.fill-stone-700');
    expect(closedHoles.length).toBe(10);
  });
});
