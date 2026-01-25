/**
 * Module 5: Composition & Form
 */
import type { Module } from '../types'
import { SUBMODULE_5_1 } from './5.1-chord-progressions'
import { SUBMODULE_5_2 } from './5.2-cadences'
import { SUBMODULE_5_3 } from './5.3-melodic-contour'
import { SUBMODULE_5_4 } from './5.4-song-structure'
import { SUBMODULE_5_5 } from './5.5-dynamics'
import { SUBMODULE_5_6 } from './5.6-modulation'

export const MODULE_5: Module = {
  id: 5,
  name: 'Sáng tác',
  subtitle: 'Cấu trúc & Phong cách',
  icon: 'edit_note',
  submodules: [
    SUBMODULE_5_1,
    SUBMODULE_5_2,
    SUBMODULE_5_3,
    SUBMODULE_5_4,
    SUBMODULE_5_5,
    SUBMODULE_5_6,
  ],
}

// Re-export submodules for direct access if needed
export { SUBMODULE_5_1, SUBMODULE_5_2, SUBMODULE_5_3, SUBMODULE_5_4, SUBMODULE_5_5, SUBMODULE_5_6 }
