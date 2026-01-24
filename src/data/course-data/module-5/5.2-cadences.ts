/**
 * Module 5, Submodule 5.2: Cadences
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_2: Submodule = {
  id: '5.2',
  title: 'Cadences',
  description: 'Musical punctuation (Perfect, Plagal, Half, Deceptive)',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Cadences: Musical Punctuation

A **cadence** is a harmonic arrival point - like punctuation in a sentence.

### Four Main Cadences

| Cadence | Progression | Effect |
|---------|-------------|--------|
| **Perfect (Authentic)** | V → I | Complete, final |
| **Plagal ("Amen")** | IV → I | Softer ending |
| **Half** | ? → V | Incomplete, pause |
| **Deceptive** | V → vi | Surprise, continues |

### Examples in C Major
- Perfect: G → C
- Plagal: F → C  
- Half: Am → G
- Deceptive: G → Am
  `,
}
