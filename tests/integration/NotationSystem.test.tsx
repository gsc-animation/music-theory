import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { HomePage } from '../../src/pages/HomePage'
import { useSettingsStore } from '../../src/stores/useSettingsStore'
import { useAudioStore } from '../../src/stores/useAudioStore'
import { useModuleStore } from '../../src/stores/useModuleStore'

// Mock AbcScore to avoid abcjs initialization
vi.mock('../../src/components/MusicStaff/AbcScore', () => ({
  default: () => <div data-testid="abc-score-mock">AbcScore</div>,
}))

// Mock storage manager
vi.mock('../../src/services/storage-manager', () => ({
  requestPersistentStorage: vi.fn().mockResolvedValue(true),
  getStorageEstimate: vi.fn().mockResolvedValue({ usage: 0, quota: 0 }),
}))

describe('Notation System Integration', () => {
  beforeEach(() => {
    cleanup()
    localStorage.clear()
    useSettingsStore.setState({ notationSystem: 'latin' })
    useAudioStore.setState({ activeNotes: [], recordedNotes: [] })
    useModuleStore.setState({
      modules: [
        { id: 1, name: 'Fundamentals', subtitle: 'Pitch & Notation', progress: 100, locked: false },
        { id: 2, name: 'Rhythm', subtitle: 'Time', progress: 0, locked: false },
        { id: 3, name: 'Scales', subtitle: 'Patterns', progress: 0, locked: false },
        { id: 4, name: 'Harmony', subtitle: 'Chords', progress: 0, locked: true },
        { id: 5, name: 'Composition', subtitle: 'Form', progress: 0, locked: true },
      ],
      currentModuleId: 1,
      totalXP: 100,
    })
  })

  it.skip('displays piano keys with Latin notation by default', () => {
    render(<HomePage />)

    // Initial State: Latin (C, D, E)
    expect(screen.getAllByText('C').length).toBeGreaterThan(0)
    // Should NOT find "Do" by default
    expect(screen.queryByText('Do')).not.toBeInTheDocument()
  })

  it.skip('switches to Solfège when settings store is updated', () => {
    render(<HomePage />)

    // Initially Latin
    expect(screen.getAllByText('C').length).toBeGreaterThan(0)

    // Update store directly (simulating a toggle)
    useSettingsStore.setState({ notationSystem: 'solfege' })

    // Re-render to reflect state change
    cleanup()
    render(<HomePage />)

    // Expect "Do" to be visible now
    expect(screen.getAllByText('Do').length).toBeGreaterThan(0)
  })

  it('persists notation preference to localStorage', () => {
    // Set preference directly
    useSettingsStore.setState({ notationSystem: 'solfege' })

    // Check localStorage
    const stored = localStorage.getItem('music-theory-settings')
    expect(stored).toContain('solfege')
  })
})
