/**
 * Module 4, Submodule 4.5: Circle of Fifths
 */
import type { Submodule } from '../types'

export const SUBMODULE_4_5: Submodule = {
  id: '4.5',
  title: 'Circle of Fifths',
  description: 'Visualizing key relationships and accidentals',
  sections: ['theory'],
  theoryContent: `
## The Circle of Fifths

A visual diagram showing relationships between all 12 major (and minor) keys.

### Moving Clockwise
Each step adds one sharp:
C → G → D → A → E → B → F# → C#

### Moving Counter-clockwise
Each step adds one flat:
C → F → Bb → Eb → Ab → Db → Gb → Cb

### Uses
- Find key signatures quickly
- Identify closely related keys
- Plan modulations
- Understand chord progressions (V-I movement)
  `
}
