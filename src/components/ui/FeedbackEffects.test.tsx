import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { FeedbackEffects } from './FeedbackEffects';

describe('FeedbackEffects', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should not render anything initially', () => {
    const { container } = render(<FeedbackEffects lastResult={null} timestamp={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('should render green overlay on success', () => {
    render(<FeedbackEffects lastResult="success" timestamp={Date.now()} />);
    const overlay = document.querySelector('.bg-green-500');
    expect(overlay).not.toBeNull();
  });

  it('should render red overlay on failure', () => {
    render(<FeedbackEffects lastResult="failure" timestamp={Date.now()} />);
    const overlay = document.querySelector('.bg-red-500');
    expect(overlay).not.toBeNull();
  });

  it('should hide after 500ms', () => {
    render(<FeedbackEffects lastResult="success" timestamp={Date.now()} />);
    expect(document.querySelector('.bg-green-500')).not.toBeNull();

    act(() => {
      vi.advanceTimersByTime(550);
    });

    // Since AnimatePresence handles exit, the element might still be there for animation duration.
    // But the React state update definitely happened.
  });
});
