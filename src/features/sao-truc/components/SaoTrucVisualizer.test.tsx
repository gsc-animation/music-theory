import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import SaoTrucVisualizer from './SaoTrucVisualizer'
import { useAudioStore } from '../../../stores/useAudioStore'

// Mock the FingeringChart component to simplify testing (shallow render equivalent)
vi.mock('./FingeringChart', () => ({
  default: ({ holes, type }: { holes: unknown[]; type: string }) => (
    <div data-testid="fingering-chart">
      Chart Type: {type}, Holes Count: {holes.length}, First Hole: {String(holes[0] || '')}
    </div>
  ),
}))

// Mock useAudioStore - Simple and direct
vi.mock('../../../stores/useAudioStore', () => {
  return {
    useAudioStore: vi.fn(),
  }
})

describe('SaoTrucVisualizer', () => {
  // Stable default state to prevent infinite loops in effects
  const defaultState = { activeNotes: [] as string[] }

  beforeEach(() => {
    vi.restoreAllMocks()

    // Default mock implementation
    ;(useAudioStore as unknown as Mock).mockImplementation(
      (selector: (state: { activeNotes: string[] }) => unknown) => {
        return selector(defaultState)
      }
    )
  })

  it('renders correctly', () => {
    render(<SaoTrucVisualizer />)
    expect(screen.getByText(/Sáo Trúc/i)).toBeInTheDocument()
    expect(screen.getByTestId('fingering-chart')).toBeInTheDocument()
  })

  it('toggles flute type', () => {
    render(<SaoTrucVisualizer />)

    // Default is 6-hole
    expect(screen.getByText(/Chart Type: 6-hole/)).toBeInTheDocument()

    // Find toggle button (assuming there's one)
    const toggleBtn = screen.getByRole('button', { name: /10-hole/i })
    fireEvent.click(toggleBtn)

    expect(screen.getByText(/Chart Type: 10-hole/)).toBeInTheDocument()
  })

  it('updates based on active notes', () => {
    // Override mock for this test with stable state
    const activeState = { activeNotes: ['C4'] }
    ;(useAudioStore as unknown as Mock).mockImplementation(
      (selector: (state: { activeNotes: string[] }) => unknown) => {
        return selector(activeState)
      }
    )

    render(<SaoTrucVisualizer />)

    // C4 on 6-hole usually means all closed (X) or similar.
    expect(screen.getByTestId('fingering-chart')).toHaveTextContent('Holes Count: 6')
  })

  it('handles empty active notes (default state)', () => {
    // Explicit empty with stable state
    const emptyState = { activeNotes: [] }
    ;(useAudioStore as unknown as Mock).mockImplementation(
      (selector: (state: { activeNotes: string[] }) => unknown) => {
        return selector(emptyState)
      }
    )

    render(<SaoTrucVisualizer />)
    // Should render a default state (e.g., all open or closed, or whatever logic decides)
    expect(screen.getByTestId('fingering-chart')).toBeInTheDocument()
  })

  it('displays out of range message for invalid notes', async () => {
    const invalidState = { activeNotes: ['A0'] }
    ;(useAudioStore as unknown as Mock).mockImplementation(
      (selector: (state: { activeNotes: string[] }) => unknown) => {
        return selector(invalidState)
      }
    )

    render(<SaoTrucVisualizer />)

    expect(await screen.findByText(/Note: A0 \(Out of Range\)/i)).toBeInTheDocument()
    // Should pass empty array to chart (holes count 0)
    expect(screen.getByTestId('fingering-chart')).toHaveTextContent('Holes Count: 0')
  })
})
