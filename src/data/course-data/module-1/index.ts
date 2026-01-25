/**
 * Module 1: Fundamentals (Pitch & Notation)
 */
import type { Module } from '../types'
import { SUBMODULE_1_1 } from './1.1-staff-clefs'
import { SUBMODULE_1_2 } from './1.2-note-names'
import { SUBMODULE_1_3 } from './1.3-accidentals'
import { SUBMODULE_1_4 } from './1.4-tones-semitones'
import { SUBMODULE_1_5 } from './1.5-enharmonic'

export const MODULE_1: Module = {
  id: 1,
  name: 'Cơ bản',
  subtitle: 'Cao độ & Ký hiệu',
  icon: 'music_note',
  submodules: [SUBMODULE_1_1, SUBMODULE_1_2, SUBMODULE_1_3, SUBMODULE_1_4, SUBMODULE_1_5],
}

// Re-export submodules for direct access if needed
export { SUBMODULE_1_1, SUBMODULE_1_2, SUBMODULE_1_3, SUBMODULE_1_4, SUBMODULE_1_5 }
