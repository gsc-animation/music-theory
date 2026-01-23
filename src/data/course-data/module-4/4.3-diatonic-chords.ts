/**
 * Module 4, Submodule 4.3: Diatonic Chords
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_3: Submodule = {
  id: '4.3',
  title: 'Diatonic Chords',
  description: 'Chords built strictly from the notes of a specific key',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Diatonic Chords

**Diatonic** chords use only the notes from a specific key.

### Chords in C Major
Building triads on each scale degree:

| Degree | Chord | Quality |
|--------|-------|---------|
| I | C-E-G | Major |
| ii | D-F-A | minor |
| iii | E-G-B | minor |
| IV | F-A-C | Major |
| V | G-B-D | Major |
| vi | A-C-E | minor |
| vii° | B-D-F | diminished |

### The Pattern
In any major key: **I - ii - iii - IV - V - vi - vii°**

Major chords: I, IV, V
Minor chords: ii, iii, vi
Diminished: vii°
  `
}
