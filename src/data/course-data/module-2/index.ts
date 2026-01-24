/**
 * Module 2: Rhythm & Meter
 */
import type { Module } from '../types'
import { SUBMODULE_2_1 } from './2.1-note-values'
import { SUBMODULE_2_2 } from './2.2-rests'
import { SUBMODULE_2_3 } from './2.3-dotted-notes'
import { SUBMODULE_2_4 } from './2.4-time-signatures'
import { SUBMODULE_2_5 } from './2.5-compound-meter'
import { SUBMODULE_2_6 } from './2.6-tempo-bpm'

export const MODULE_2: Module = {
  id: 2,
  name: 'Rhythm & Meter',
  subtitle: 'Time & Pulse',
  icon: 'timer',
  submodules: [
    SUBMODULE_2_1,
    SUBMODULE_2_2,
    SUBMODULE_2_3,
    SUBMODULE_2_4,
    SUBMODULE_2_5,
    SUBMODULE_2_6,
  ],
}

// Re-export submodules for direct access if needed
export { SUBMODULE_2_1, SUBMODULE_2_2, SUBMODULE_2_3, SUBMODULE_2_4, SUBMODULE_2_5, SUBMODULE_2_6 }
