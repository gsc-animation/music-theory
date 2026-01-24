/**
 * Music Theory Course Data
 * Complete curriculum definition with 5 modules and 26 submodules
 *
 * This is the main entry point that re-exports all types, modules, and helpers.
 */

// Re-export all types
export type { SectionType, AbcDemo, Exercise, Submodule, Module } from './types'

// Import modules
import { MODULE_1 } from './module-1'
import { MODULE_2 } from './module-2'
import { MODULE_3 } from './module-3'
import { MODULE_4 } from './module-4'
import { MODULE_5 } from './module-5'

import type { Module, Submodule } from './types'

// Complete curriculum
export const COURSE_MODULES: Module[] = [MODULE_1, MODULE_2, MODULE_3, MODULE_4, MODULE_5]

// Helper to get total submodules count
export const getTotalSubmodules = (): number => {
  return COURSE_MODULES.reduce((acc, module) => acc + module.submodules.length, 0)
}

// Helper to find a submodule by ID
export const findSubmodule = (submoduleId: string): Submodule | undefined => {
  for (const module of COURSE_MODULES) {
    const found = module.submodules.find((s) => s.id === submoduleId)
    if (found) return found
  }
  return undefined
}

// Helper to find a module by ID
export const findModule = (moduleId: number): Module | undefined => {
  return COURSE_MODULES.find((m) => m.id === moduleId)
}

// Helper to get next submodule
export const getNextSubmodule = (currentId: string): Submodule | undefined => {
  const allSubmodules = COURSE_MODULES.flatMap((m) => m.submodules)
  const currentIndex = allSubmodules.findIndex((s) => s.id === currentId)
  return allSubmodules[currentIndex + 1]
}

// Helper to get previous submodule
export const getPreviousSubmodule = (currentId: string): Submodule | undefined => {
  const allSubmodules = COURSE_MODULES.flatMap((m) => m.submodules)
  const currentIndex = allSubmodules.findIndex((s) => s.id === currentId)
  return currentIndex > 0 ? allSubmodules[currentIndex - 1] : undefined
}

// Re-export individual modules for direct access
export { MODULE_1, MODULE_2, MODULE_3, MODULE_4, MODULE_5 }
