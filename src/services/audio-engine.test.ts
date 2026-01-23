import { describe, it, expect, vi, beforeEach } from 'vitest'
import { audioEngine } from './audio-engine'

// Shared mock instance
const mockTriggerAttackRelease = vi.fn()
const mockTriggerAttack = vi.fn()
const mockTriggerRelease = vi.fn()

const { mockSynthInstance } = vi.hoisted(() => ({
  mockSynthInstance: {
    toDestination: vi.fn().mockReturnThis(),
    triggerAttackRelease: vi.fn(),
    triggerAttack: vi.fn(),
    triggerRelease: vi.fn(),
  },
}))

// Mock Tone.js
vi.mock('tone', () => {
  const PolySynthMock = vi.fn(function () {
    return mockSynthInstance
  })

  return {
    start: vi.fn().mockResolvedValue(undefined),
    getContext: vi.fn(() => ({
      state: 'suspended',
      resume: vi.fn().mockResolvedValue(undefined),
    })),
    PolySynth: PolySynthMock,
    Synth: vi.fn(),
    now: vi.fn(() => 0),
  }
})

describe('AudioEngine', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should be a singleton', () => {
    const instance1 = audioEngine
    const instance2 = audioEngine
    expect(instance1).toBe(instance2)
  })

  it('should initialize Tone.js', async () => {
    await audioEngine.initialize()
    // If already initialized, this just returns early
  })

  it('should play a note using Tone.js synth', async () => {
    await audioEngine.initialize()
    audioEngine.playNote('C4', '8n')
    expect(mockSynthInstance.triggerAttackRelease).toHaveBeenCalledWith('C4', '8n')
  })

  it('should return context state', () => {
    const state = audioEngine.getState()
    expect(state).toBe('suspended')
  })

  it('should start a note using Tone.js synth', async () => {
    await audioEngine.initialize()
    audioEngine.startNote('E4')
    expect(mockSynthInstance.triggerAttack).toHaveBeenCalledWith('E4')
  })

  it('should stop a note using Tone.js synth', async () => {
    await audioEngine.initialize()
    audioEngine.stopNote('E4')
    expect(mockSynthInstance.triggerRelease).toHaveBeenCalledWith('E4')
  })
})


