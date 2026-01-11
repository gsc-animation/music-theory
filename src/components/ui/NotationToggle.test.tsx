import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { NotationToggle } from './NotationToggle';
import { useSettingsStore } from '../../stores/useSettingsStore';

describe('NotationToggle', () => {
  beforeEach(() => {
    useSettingsStore.setState({ notationSystem: 'latin' });
  });

  afterEach(() => {
    cleanup();
  });

  it('should render correctly', () => {
    render(<NotationToggle />);
    // Should show current state or label
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('should display current notation system', () => {
    useSettingsStore.setState({ notationSystem: 'latin' });
    render(<NotationToggle />);
    // Assuming the toggle shows "C-D-E" or "Do-Re-Mi" or similar
    expect(screen.getByText(/C-D-E/i)).toBeDefined();

    cleanup();
    useSettingsStore.setState({ notationSystem: 'solfege' });
    render(<NotationToggle />);
    expect(screen.getByText(/Do-Re-Mi/i)).toBeDefined();
  });

  it('should toggle system on click', () => {
    render(<NotationToggle />);
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(useSettingsStore.getState().notationSystem).toBe('solfege');

    fireEvent.click(button);
    expect(useSettingsStore.getState().notationSystem).toBe('latin');
  });

  it('should meet minimum touch target size', () => {
    render(<NotationToggle />);
    const button = screen.getByRole('button');
    // Using style check or just verifying implementation details in review
    // For unit test, we can check class names if we use tailwind classes
    expect(button.className).toContain('min-w-[48px]');
    expect(button.className).toContain('min-h-[48px]');
  });
});
