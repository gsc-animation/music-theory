/**
 * Module 3, Submodule 3.2: Key Signatures
 */
import type { Submodule } from '../types'

export const SUBMODULE_3_2: Submodule = {
  id: '3.2',
  title: 'Key Signatures',
  description: 'Order of Sharps and Flats; identifying keys on the staff',
  sections: ['theory', 'grandStaff', 'abcDemo'],
  theoryContent: `
## Key Signatures

A **key signature** tells us which notes are sharp or flat throughout a piece.

### Order of Sharps
**F - C - G - D - A - E - B** ("Father Charles Goes Down And Ends Battle")

| Sharps | Key |
|--------|-----|
| 0 | C Major |
| 1 (F#) | G Major |
| 2 (F#, C#) | D Major |
| 3 | A Major |
| 4 | E Major |
| 5 | B Major |

### Order of Flats
**B - E - A - D - G - C - F** (reverse of sharps)

| Flats | Key |
|-------|-----|
| 1 (Bb) | F Major |
| 2 (Bb, Eb) | Bb Major |
| 3 | Eb Major |
| 4 | Ab Major |
  `
}
