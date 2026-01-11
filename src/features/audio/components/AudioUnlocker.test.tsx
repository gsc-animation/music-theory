import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AudioUnlocker from './AudioUnlocker';
import { useAudioStore } from '../../../stores/useAudioStore';
import { AUDIO_STRINGS } from '../../constants';

// Mock store
vi.mock('../../../stores/useAudioStore', () => ({
  useAudioStore: vi.fn(),
}));

describe('AudioUnlocker', () => {
  const initializeAudio = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setupMockStore = (state: any) => {
    (useAudioStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      return selector(state);
    });
  };

  it('should not render when audio is ready', () => {
    setupMockStore({
      isReady: true,
      initializeAudio,
    });

    render(<AudioUnlocker />);
    expect(screen.queryByText(AUDIO_STRINGS.UNLOCK.BUTTON)).not.toBeInTheDocument();
  });

  it('should render overlay when audio is not ready', () => {
    setupMockStore({
      isReady: false,
      initializeAudio,
    });

    render(<AudioUnlocker />);
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('should call initializeAudio on click', () => {
    setupMockStore({
      isReady: false,
      initializeAudio,
    });

    render(<AudioUnlocker />);

    const button = screen.getByRole('button', { name: /start/i });
    fireEvent.click(button);

    expect(initializeAudio).toHaveBeenCalled();
  });
});
