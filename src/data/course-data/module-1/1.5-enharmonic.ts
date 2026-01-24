/**
 * Module 1, Submodule 1.5: Enharmonic Equivalents
 */
import type { Submodule } from '../types'

export const SUBMODULE_1_5: Submodule = {
  id: '1.5',
  title: 'Enharmonic Equivalents',
  description: 'Notes that sound the same but are spelled differently (e.g., C# and Db)',
  sections: ['theory', 'grandStaff', 'piano', 'abcDemo'],
  theoryContent: `
## Enharmonic Equivalents

**Enharmonic** notes are notes that sound identical but have different names.

### Common Enharmonic Pairs
| Sharp | Flat |
|-------|------|
| C♯ | D♭ |
| D♯ | E♭ |
| F♯ | G♭ |
| G♯ | A♭ |
| A♯ | B♭ |

### Natural Enharmonics
| Note | Enharmonic |
|------|------------|
| E | F♭ |
| F | E♯ |
| B | C♭ |
| C | B♯ |

### Why Different Names?
The choice depends on musical context:
- Key signature (G♯ in A major, A♭ in F minor)
- Direction of melody (ascending often uses sharps)
- Harmonic function
  `,
  abcDemos: [
    {
      id: '1.5.1',
      title: 'Enharmonic Pairs',
      description: 'Same sound, different spelling',
      abc: `X:1
M:4/4
L:1/2
K:C
^C _D | ^D _E | ^F _G | ^G _A |]`,
      playable: true,
    },
  ],
}
