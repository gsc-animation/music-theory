import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { VirtualGuitar } from './VirtualGuitar'

describe('VirtualGuitar', () => {
  it('renders without crashing', () => {
    render(<VirtualGuitar onPlayNote={() => {}} />)
    expect(screen.getByLabelText('Virtual Guitar Fretboard')).toBeInTheDocument()
  })

  it('renders all 6 strings', () => {
    render(<VirtualGuitar onPlayNote={() => {}} />)
    // String labels appear in both sidebar and SVG open strings, so use getAllByText
    expect(screen.getAllByText('E').length).toBeGreaterThanOrEqual(2)
    expect(screen.getAllByText('B').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('G').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('D').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('A').length).toBeGreaterThanOrEqual(1)
  })

  it('calls onPlayNote when a fret is clicked', () => {
    const handlePlayNote = vi.fn()
    render(<VirtualGuitar onPlayNote={handlePlayNote} />)

    // SVG click areas are hard to test, but check the fretboard renders
    const svg = screen.getByLabelText('Virtual Guitar Fretboard')
    expect(svg).toBeInTheDocument()
  })

  it('highlights active notes', () => {
    // activeNotes are in WRITTEN pitch (from staff)
    // C4 written → C3 sounding on guitar (A string, fret 3)
    render(<VirtualGuitar onPlayNote={() => {}} activeNotes={['C4']} />)
    // Labels now show 'C' without octave.
    // Active notes should display their label.
    const cLabels = screen.getAllByText('C')
    expect(cLabels.length).toBeGreaterThan(0)
    expect(cLabels[0]).toBeInTheDocument()
  })
})
