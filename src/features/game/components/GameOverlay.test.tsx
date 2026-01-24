import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GameOverlay } from './GameOverlay'
import { useGameStore } from '../../../stores/useGameStore'

// Mock the store
vi.mock('../../../stores/useGameStore')

describe('GameOverlay', () => {
  const mockStartGame = vi.fn()
  const mockStopGame = vi.fn()

  beforeEach(() => {
    vi.restoreAllMocks()
    // Default mock state
    vi.mocked(useGameStore).mockImplementation((selector) => {
      const state = {
        isPlaying: false,
        score: 0,
        streak: 0,
        bestStreak: 10,
        startGame: mockStartGame,
        stopGame: mockStopGame,
      }
      return selector(state)
    })
  })

  it('renders start button when game is not playing', () => {
    render(<GameOverlay />)
    expect(screen.getByText(/Start Game/i)).toBeInTheDocument()
    expect(screen.queryByText(/Stop Game/i)).not.toBeInTheDocument()
  })

  it('renders stop button and stats when game is playing', () => {
    // Override mock for playing state
    vi.mocked(useGameStore).mockImplementation((selector) => {
      const state = {
        isPlaying: true,
        score: 5,
        streak: 3,
        bestStreak: 10,
        startGame: mockStartGame,
        stopGame: mockStopGame,
      }
      return selector(state)
    })

    render(<GameOverlay />)
    expect(screen.getByText(/Stop Game/i)).toBeInTheDocument()

    // Check score with flexible matching because it might be split across elements
    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'span' &&
          content === '5' &&
          element.parentElement?.textContent?.includes('Score:')
        )
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'span' &&
          content === '3' &&
          element.parentElement?.textContent?.includes('Streak:')
        )
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/Best Streak:/i)).toBeInTheDocument()
    expect(screen.getByText(/10/i)).toBeInTheDocument()
  })

  it('calls startGame when start button is clicked', () => {
    render(<GameOverlay />)
    fireEvent.click(screen.getByText(/Start Game/i))
    expect(mockStartGame).toHaveBeenCalled()
  })

  it('calls stopGame when stop button is clicked', () => {
    vi.mocked(useGameStore).mockImplementation((selector) => {
      const state = {
        isPlaying: true,
        score: 0,
        streak: 0,
        bestStreak: 0,
        startGame: mockStartGame,
        stopGame: mockStopGame,
      }
      return selector(state)
    })

    render(<GameOverlay />)
    fireEvent.click(screen.getByText(/Stop Game/i))
    expect(mockStopGame).toHaveBeenCalled()
  })
})
