/**
 * Module 3: Scales & Melody
 */
import type { Module } from '../types'
import { SUBMODULE_3_1 } from './3.1-major-scale'
import { SUBMODULE_3_2 } from './3.2-key-signatures'
import { SUBMODULE_3_3 } from './3.3-intervals-quantity'
import { SUBMODULE_3_4 } from './3.4-intervals-quality'
import { SUBMODULE_3_5 } from './3.5-minor-scales'
import { SUBMODULE_3_6 } from './3.6-pentatonic'

export const MODULE_3: Module = {
  id: 3,
  name: 'Scales & Melody',
  subtitle: 'Patterns & Motion',
  icon: 'trending_up',
  submodules: [
    SUBMODULE_3_1,
    SUBMODULE_3_2,
    SUBMODULE_3_3,
    SUBMODULE_3_4,
    SUBMODULE_3_5,
    SUBMODULE_3_6,
  ],
}

// Re-export submodules for direct access if needed
export { SUBMODULE_3_1, SUBMODULE_3_2, SUBMODULE_3_3, SUBMODULE_3_4, SUBMODULE_3_5, SUBMODULE_3_6 }
