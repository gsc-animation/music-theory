import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAudioStore } from './useAudioStore'
import { audioEngine } from '../services/audio-engine'

// Mock audio engine
vi.mock('../services/audio-engine', () => ({
  audioEngine: {
    initialize: vi.fn(),
    playNote: vi.fn(),
    startNote: vi.fn(),
    stopNote: vi.fn(),
    getState: vi.fn().mockReturnValue('suspended'),
  },
}))

describe('useAudioStore', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset store state
    useAudioStore.setState({
      isReady: false,
      isPlaying: false,
      activeNotes: [],
      recordedNotes: [],
    })
  })

  it('should have initial state', () => {
    const { result } = renderHook(() => useAudioStore())
    expect(result.current.isReady).toBe(false)
    expect(result.current.isPlaying).toBe(false)
    expect(result.current.activeNotes).toEqual([])
  })

  it('should initialize audio', async () => {
    const { result } = renderHook(() => useAudioStore())

    await act(async () => {
      await result.current.initializeAudio()
    })

    expect(audioEngine.initialize).toHaveBeenCalled()
    expect(result.current.isReady).toBe(true)
  })

  it('should start and track a note', async () => {
    const { result } = renderHook(() => useAudioStore())

    await act(async () => {
      await result.current.startNote('F4')
    })

    expect(audioEngine.startNote).toHaveBeenCalledWith('F4')
    expect(result.current.activeNotes).toContain('F4')
    expect(result.current.isPlaying).toBe(true)
  })

  it('should stop and untrack a note', async () => {
    const { result } = renderHook(() => useAudioStore())

    await act(async () => {
      await result.current.startNote('G4')
    })
    expect(result.current.activeNotes).toContain('G4')

    act(() => {
      result.current.stopNote('G4')
    })

    expect(audioEngine.stopNote).toHaveBeenCalledWith('G4')
    expect(result.current.activeNotes).not.toContain('G4')
  })

  it('should record notes history', async () => {
    const { result } = renderHook(() => useAudioStore())

    await act(async () => {
      await result.current.startNote('C4')
      await result.current.startNote('E4')
    })

    expect(result.current.recordedNotes).toEqual(['C4', 'E4'])

    act(() => {
      result.current.clearRecordedNotes()
    })

    expect(result.current.recordedNotes).toEqual([])
  })

  it('should manage time signature', () => {
    const { result } = renderHook(() => useAudioStore())
    expect(result.current.timeSignature).toBe('4/4')

    act(() => {
      result.current.setTimeSignature('3/4')
    })

    expect(result.current.timeSignature).toBe('3/4')
  })
})
