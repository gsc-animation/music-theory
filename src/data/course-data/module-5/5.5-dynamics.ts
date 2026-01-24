/**
 * Module 5, Submodule 5.5: Dynamics & Articulation
 */
import type { Submodule } from '../types'

export const SUBMODULE_5_5: Submodule = {
  id: '5.5',
  title: 'Dynamics & Articulation',
  description: 'Markings for volume (p, f, mf) and touch (staccato, legato)',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Dynamics

**Dynamic markings** indicate volume.

| Marking | Name | Meaning |
|---------|------|---------|
| ppp | Pianississimo | Very very soft |
| pp | Pianissimo | Very soft |
| p | Piano | Soft |
| mp | Mezzo-piano | Medium soft |
| mf | Mezzo-forte | Medium loud |
| f | Forte | Loud |
| ff | Fortissimo | Very loud |
| fff | Fortississimo | Very very loud |

### Changes
- **Crescendo (<)**: Gradually louder
- **Decrescendo (>)**: Gradually softer

## Articulation

| Symbol | Name | Effect |
|--------|------|--------|
| · | Staccato | Short, detached |
| – | Tenuto | Hold full value |
| > | Accent | Emphasis |
| ∧ | Marcato | Strong accent |
| ⌢ | Slur | Smooth, connected |
  `,
}
