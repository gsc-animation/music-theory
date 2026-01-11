import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SaoTrucVisualizer from './SaoTrucVisualizer';
import { useAudioStore } from '../../../stores/useAudioStore';

// Mock the FingeringChart component to simplify testing (shallow render equivalent)
vi.mock('./FingeringChart', () => ({
  default: ({ holes, type }: any) => (
    <div data-testid="fingering-chart">
      Chart Type: {type}, Holes Count: {holes.length}, First Hole: {holes[0]}
    </div>
  ),
}));

// Mock useAudioStore
vi.mock('../../../stores/useAudioStore', () => ({
  useAudioStore: vi.fn(),
}));

describe('SaoTrucVisualizer', () => {
  beforeEach(() => {
    // Default mock implementation with stable state reference to avoid infinite loops
    const defaultState = { activeNotes: [] };
    (useAudioStore as any).mockImplementation((selector: (state: any) => any) => {
      return selector(defaultState);
    });
  });

  it('renders correctly', () => {
    render(<SaoTrucVisualizer />);
    expect(screen.getByText(/Sáo Trúc/i)).toBeInTheDocument();
    expect(screen.getByTestId('fingering-chart')).toBeInTheDocument();
  });

  it('toggles flute type', () => {
    render(<SaoTrucVisualizer />);

    // Default is 6-hole
    expect(screen.getByText(/Chart Type: 6-hole/)).toBeInTheDocument();

    // Find toggle button (assuming there's one)
    const toggleBtn = screen.getByRole('button', { name: /10-hole/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByText(/Chart Type: 10-hole/)).toBeInTheDocument();
  });

  it('updates based on active notes', () => {
    // Mock active notes to be ['C4']
    const state = { activeNotes: ['C4'] };
    (useAudioStore as any).mockImplementation((selector: (state: any) => any) => {
      return selector(state);
    });

    render(<SaoTrucVisualizer />);

    // C4 on 6-hole usually means all closed (X) or similar.
    expect(screen.getByTestId('fingering-chart')).toHaveTextContent('Holes Count: 6');
  });

  it('handles empty active notes (default state)', () => {
    const state = { activeNotes: [] };
    (useAudioStore as any).mockImplementation((selector: (state: any) => any) => {
      return selector(state);
    });

    render(<SaoTrucVisualizer />);
    // Should render a default state (e.g., all open or closed, or whatever logic decides)
    expect(screen.getByTestId('fingering-chart')).toBeInTheDocument();
  });

  it('displays out of range message for invalid notes', async () => {
    const state = { activeNotes: ['A0'] };
    (useAudioStore as any).mockImplementation((selector: (state: any) => any) => {
      return selector(state);
    });

    render(<SaoTrucVisualizer />);

    expect(await screen.findByText(/Note: A0 \(Out of Range\)/i)).toBeInTheDocument();
    // Should pass empty array to chart (holes count 0)
    expect(screen.getByTestId('fingering-chart')).toHaveTextContent('Holes Count: 0');
  });
});
