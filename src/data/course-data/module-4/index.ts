/**
 * Module 4: Harmony (The Core)
 */
import type { Module } from '../types'
import { SUBMODULE_4_1 } from './4.1-triads'
import { SUBMODULE_4_2 } from './4.2-chord-qualities'
import { SUBMODULE_4_3 } from './4.3-diatonic-chords'
import { SUBMODULE_4_4 } from './4.4-roman-numerals'
import { SUBMODULE_4_5 } from './4.5-circle-of-fifths'
import { SUBMODULE_4_6 } from './4.6-inversions'
import { SUBMODULE_4_7 } from './4.7-seventh-chords'

export const MODULE_4: Module = {
  id: 4,
  name: 'Harmony',
  subtitle: 'Chords & Progressions',
  icon: 'auto_awesome',
  submodules: [
    SUBMODULE_4_1,
    SUBMODULE_4_2,
    SUBMODULE_4_3,
    SUBMODULE_4_4,
    SUBMODULE_4_5,
    SUBMODULE_4_6,
    SUBMODULE_4_7,
  ],
}

// Re-export submodules for direct access if needed
export {
  SUBMODULE_4_1,
  SUBMODULE_4_2,
  SUBMODULE_4_3,
  SUBMODULE_4_4,
  SUBMODULE_4_5,
  SUBMODULE_4_6,
  SUBMODULE_4_7,
}
