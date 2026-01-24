import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TimeSignatureSelector } from './TimeSignatureSelector'
import { useAudioStore } from '../../stores/useAudioStore'

// Mock store
vi.mock('../../stores/useAudioStore', () => ({
  useAudioStore: vi.fn(),
}))

describe('TimeSignatureSelector', () => {
  const setTimeSignature = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    ;(useAudioStore as any).mockImplementation((selector: any) =>
      selector({
        timeSignature: '4/4',
        setTimeSignature,
      })
    )
  })

  it('renders time signature options', () => {
    render(<TimeSignatureSelector />)
    expect(screen.getByText('4/4')).toBeDefined()
    expect(screen.getByText('3/4')).toBeDefined()
  })

  it('selects time signature on click', () => {
    render(<TimeSignatureSelector />)
    const button34 = screen.getByText('3/4')
    fireEvent.click(button34)
    expect(setTimeSignature).toHaveBeenCalledWith('3/4')
  })

  it('highlights current selection', () => {
    render(<TimeSignatureSelector />)
    const button44 = screen.getByText('4/4')
    // Using simple class check for active state based on likely styling
    expect(button44.className).toContain('bg-warmWood')
    expect(button44.className).toContain('text-white')
  })
})
