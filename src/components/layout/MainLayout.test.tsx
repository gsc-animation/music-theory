import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MainLayout } from './MainLayout'

// Mock AudioUnlocker
vi.mock('../../features/audio/components/AudioUnlocker', () => ({
  default: () => <div data-testid="audio-unlocker">Unlocker</div>,
}))

describe('MainLayout', () => {
  it('should render children', () => {
    render(
      <MainLayout>
        <div data-testid="child">Child Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('child')).toBeInTheDocument()
  })

  it.skip('should render AudioUnlocker', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    )

    expect(screen.getByTestId('audio-unlocker')).toBeInTheDocument()
  })
})
