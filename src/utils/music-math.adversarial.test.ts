import { describe, it, expect } from 'vitest'
import { distributeNotesToMeasures } from './music-math'

describe('distributeNotesToMeasures Adversarial', () => {
  // Attack 1: "The Overflower" - verifying measure splitting logic
  it('handles transition from 4/4 to 3/4 with overflow notes', () => {
    const notes = ['c4/q', 'd4/q', 'e4/q', 'f4/q', 'g4/q'] // 5 notes
    // In 4/4, this is [4, 1]
    const measures44 = distributeNotesToMeasures(notes, '4/4')
    expect(measures44).toHaveLength(2)
    expect(measures44[0]).toHaveLength(4)
    expect(measures44[1]).toHaveLength(1)

    // In 3/4, this is [3, 2]
    const measures34 = distributeNotesToMeasures(notes, '3/4')
    expect(measures34).toHaveLength(2)
    expect(measures34[0]).toHaveLength(3)
    expect(measures34[1]).toHaveLength(2)
  })

  // Attack 2: "The Ghost Note" - empty/malformed inputs
  it('returns empty array for empty input', () => {
    expect(distributeNotesToMeasures([], '4/4')).toEqual([])
  })

  it('handles notes longer than measure capacity', () => {
    // Technically this function is string-agnostic, so it just slices arrays.
    // It doesn't actually parse the duration.
    // This confirms the "assumption" risk in the plan.
    const notes = ['c4/w', 'd4/w'] // 2 whole notes
    // In 4/4, 2 whole notes should take 2 measures if we parsed durations.
    // But our current logic is simple counting (beatsPerMeasure = 4 items).
    // So it will put 4 items in a measure.
    // Since we only have 2 items, it puts them in 1 measure.
    // THIS IS A FINDING if the story implied duration support.
    // Story says: "Currently assuming all played notes are Quarter notes... unless duration logic is already present."
    // So this behavior is EXPECTED but risky if future requirements change.
    const measures = distributeNotesToMeasures(notes, '4/4')
    expect(measures).toHaveLength(1)
    expect(measures[0]).toHaveLength(2)
  })

  // Attack 3: Boundary conditions
  it('handles single note', () => {
    expect(distributeNotesToMeasures(['c4/q'], '4/4')).toHaveLength(1)
  })

  it('handles exactly one measure worth of notes', () => {
    expect(distributeNotesToMeasures(['1', '2', '3', '4'], '4/4')).toHaveLength(1)
    expect(distributeNotesToMeasures(['1', '2', '3'], '3/4')).toHaveLength(1)
  })

  it('handles exactly one measure + 1 note', () => {
    expect(distributeNotesToMeasures(['1', '2', '3', '4', '5'], '4/4')).toHaveLength(2)
    expect(distributeNotesToMeasures(['1', '2', '3', '4'], '3/4')).toHaveLength(2)
  })
})
