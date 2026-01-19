import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { HomePage } from '../../src/pages/HomePage';
import { useSettingsStore } from '../../src/stores/useSettingsStore';

// Mock AudioStore to avoid audio engine initialization errors
import { useAudioStore } from '../../src/stores/useAudioStore';

describe('Notation System Integration', () => {
  beforeEach(() => {
    cleanup();
    localStorage.clear();
    useSettingsStore.setState({ notationSystem: 'latin' });
    useAudioStore.setState({ activeNotes: [] });
  });

  it('toggles notation system across the application', () => {
    render(<HomePage />)

    // Initial State: Latin (C, D, E)
    // Find keys by text or label. PianoKeyboard renders keys C4, D4...
    // PianoKey logic: displayLabel = "C".
    // Expect to find "C" on the screen (white key C4)
    expect(screen.getAllByText('C').length).toBeGreaterThan(0)
    // Should NOT find "Do"
    expect(screen.queryByText('Do')).not.toBeInTheDocument()

    // Find Toggle Button - the new ControlsBar has buttons with text
    const toggleBtn = screen.getByRole('button', { name: /Do-Re-Mi-Fa-Sol-La-Si/i })
    expect(toggleBtn).toBeInTheDocument()

    // Switch to Solfège
    fireEvent.click(toggleBtn)

    // Expect "Do" to be visible
    expect(screen.getAllByText('Do').length).toBeGreaterThan(0)
    // Piano Key C4 -> "Do".
    const keyC4 = screen.getByRole('button', { name: /Piano key C4/i })
    expect(keyC4).toHaveTextContent('Do')

    // Switch back - click the CDEFGAB button
    const latinBtn = screen.getByRole('button', { name: /Notes: CDEFGAB/i })
    fireEvent.click(latinBtn)
    expect(keyC4).toHaveTextContent('C')
  })

  it('persists preference to localStorage', () => {
    render(<HomePage />)
    const toggleBtn = screen.getByRole('button', { name: /Do-Re-Mi-Fa-Sol-La-Si/i })

    fireEvent.click(toggleBtn)

    // Check localStorage
    const stored = localStorage.getItem('music-theory-settings')
    expect(stored).toContain('solfege')
  })
})
