/**
 * Module 4, Submodule 4.1: Triads (Chords)
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_1: Submodule = {
  id: '4.1',
  title: 'Triads (Chords)',
  description: 'Building 3-note chords (Root, 3rd, 5th)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Triads: Three-Note Chords

A **triad** is built by stacking two intervals of a third.

### Structure
- **Root**: The chord's foundation
- **Third**: 3rd note above the root
- **Fifth**: 5th note above the root

### Building a C Major Triad
C (root) + E (3rd) + G (5th) = C Major chord

### Chord Spelling
All triads are spelled using "every other" letter:
- C-E-G, D-F-A, E-G-B, etc.
  `
}
