import { describe, it, expect } from 'vitest'
import { distributeNotesToMeasures } from './music-math'

describe('distributeNotesToMeasures', () => {
  it('splits notes into 4/4 measures', () => {
    const notes = ['c4/q', 'd4/q', 'e4/q', 'f4/q', 'g4/q']
    const measures = distributeNotesToMeasures(notes, '4/4')

    expect(measures).toHaveLength(2)
    expect(measures[0]).toEqual(['c4/q', 'd4/q', 'e4/q', 'f4/q'])
    expect(measures[1]).toEqual(['g4/q'])
  })

  it('splits notes into 3/4 measures', () => {
    const notes = ['c4/q', 'd4/q', 'e4/q', 'f4/q']
    const measures = distributeNotesToMeasures(notes, '3/4')

    expect(measures).toHaveLength(2)
    expect(measures[0]).toEqual(['c4/q', 'd4/q', 'e4/q'])
    expect(measures[1]).toEqual(['f4/q'])
  })

  it('handles empty notes', () => {
    expect(distributeNotesToMeasures([], '4/4')).toEqual([])
  })

  it('handles exact measure fit', () => {
    const notes = ['c4/q', 'd4/q', 'e4/q', 'f4/q']
    const measures = distributeNotesToMeasures(notes, '4/4')
    expect(measures).toHaveLength(1)
    expect(measures[0]).toEqual(['c4/q', 'd4/q', 'e4/q', 'f4/q'])
  })

  it('handles invalid time signature by defaulting to 4/4', () => {
    const notes = ['c4/q', 'd4/q', 'e4/q', 'f4/q', 'g4/q']
    const measures = distributeNotesToMeasures(notes, 'invalid')
    expect(measures).toHaveLength(2)
    expect(measures[0]).toHaveLength(4)
  })
})
