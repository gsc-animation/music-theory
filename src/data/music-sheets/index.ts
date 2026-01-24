/**
 * Music Sheets Data - ABC Notation files for Grand Staff demos
 *
 * These raw ABC strings are imported from .abc files and can be
 * loaded dynamically by the AbcGrandStaff component.
 */

// ============================================
// MODULE 1: Staff & Notes, Clefs, Accidentals
// ============================================
import grandStaffOverview from './module-1/grand-staff-overview.abc?raw'
import trebleNotes from './module-1/treble-notes.abc?raw'
import bassNotes from './module-1/bass-notes.abc?raw'
import twinkleTwinkle from './module-1/twinkle-twinkle.abc?raw'
import maryHadLittleLamb from './module-1/mary-had-little-lamb.abc?raw'
import odeToJoy from './module-1/ode-to-joy.abc?raw'
import hotCrossBuns from './module-1/hot-cross-buns.abc?raw'
import frereJacques from './module-1/frere-jacques.abc?raw'
import furEliseTheme from './module-1/fur-elise-theme.abc?raw'

// ============================================
// MODULE 2: Rhythm, Duration, Time Signatures
// ============================================
import jingleBells from './module-2/jingle-bells.abc?raw'
import whenTheSaints from './module-2/when-the-saints.abc?raw'
import amazingGrace from './module-2/amazing-grace.abc?raw'
import auldLangSyne from './module-2/auld-lang-syne.abc?raw'
import greensleeves from './module-2/greensleeves.abc?raw'
import theEntertainer from './module-2/the-entertainer.abc?raw'

// ============================================
// MODULE 3: Scales, Key Signatures, Intervals
// ============================================
import doReMi from './module-3/do-re-mi.abc?raw'
import joyToTheWorld from './module-3/joy-to-the-world.abc?raw'
import happyBirthday from './module-3/happy-birthday.abc?raw'
import myBonnie from './module-3/my-bonnie.abc?raw'
import scarboroughFair from './module-3/scarborough-fair.abc?raw'
import amazingGracePentatonic from './module-3/amazing-grace-pentatonic.abc?raw'

// ============================================
// MODULE 4: Chords, Progressions, Harmony
// ============================================
import pachelbelCanon from './module-4/pachelbel-canon.abc?raw'
import heartAndSoul from './module-4/heart-and-soul.abc?raw'
import blueMoon from './module-4/blue-moon.abc?raw'
import houseRisingSun from './module-4/house-rising-sun.abc?raw'
import odeToJoyInversions from './module-4/ode-to-joy-inversions.abc?raw'
import autumnLeaves from './module-4/autumn-leaves.abc?raw'

// ============================================
// MODULE 5: Form, Cadences, Dynamics, Modulation
// ============================================
import laBamba from './module-5/la-bamba.abc?raw'
import minuetInG from './module-5/minuet-in-g.abc?raw'
import ohSusanna from './module-5/oh-susanna.abc?raw'
import twinkleForm from './module-5/twinkle-form.abc?raw'
import brahmsLullaby from './module-5/brahms-lullaby.abc?raw'
import godSaveKingModulation from './module-5/god-save-king-modulation.abc?raw'

export interface MusicSheet {
  id: string
  title: string
  description: string
  abc: string
  module: number
  submodule?: string // Which submodule this relates to
}

/**
 * Music sheets registry - all available ABC notation files
 */
export const MUSIC_SHEETS: Record<string, MusicSheet> = {
  // MODULE 1
  'grand-staff-overview': {
    id: 'grand-staff-overview',
    title: 'Grand Staff Overview',
    description: 'Introduction to reading notes on the grand staff',
    abc: grandStaffOverview,
    module: 1,
    submodule: '1.1',
  },
  'treble-notes': {
    id: 'treble-notes',
    title: 'Treble Clef Notes',
    description: 'Notes from E4 to F5 on the treble clef',
    abc: trebleNotes,
    module: 1,
    submodule: '1.1',
  },
  'bass-notes': {
    id: 'bass-notes',
    title: 'Bass Clef Notes',
    description: 'Notes from G2 to A3 on the bass clef',
    abc: bassNotes,
    module: 1,
    submodule: '1.1',
  },
  'twinkle-twinkle': {
    id: 'twinkle-twinkle',
    title: 'Twinkle Twinkle Little Star',
    description: 'Simple melody arranged for grand staff',
    abc: twinkleTwinkle,
    module: 1,
    submodule: '1.2',
  },
  'mary-had-little-lamb': {
    id: 'mary-had-little-lamb',
    title: 'Mary Had a Little Lamb',
    description: 'Simple 3-note melody for learning staff basics',
    abc: maryHadLittleLamb,
    module: 1,
    submodule: '1.2',
  },
  'ode-to-joy': {
    id: 'ode-to-joy',
    title: 'Ode to Joy',
    description: 'Uses full C major scale for note name practice',
    abc: odeToJoy,
    module: 1,
    submodule: '1.2',
  },
  'hot-cross-buns': {
    id: 'hot-cross-buns',
    title: 'Hot Cross Buns',
    description: 'Simplest beginner melody with 3 notes',
    abc: hotCrossBuns,
    module: 1,
    submodule: '1.2',
  },
  'frere-jacques': {
    id: 'frere-jacques',
    title: 'Frere Jacques',
    description: 'Traditional round for note reading',
    abc: frereJacques,
    module: 1,
    submodule: '1.2',
  },
  'fur-elise-theme': {
    id: 'fur-elise-theme',
    title: 'Fur Elise (Theme)',
    description: 'Demonstrates accidentals (D# to E)',
    abc: furEliseTheme,
    module: 1,
    submodule: '1.3',
  },

  // MODULE 2
  'jingle-bells': {
    id: 'jingle-bells',
    title: 'Jingle Bells',
    description: 'Demonstrates different note values (quarters, halves, wholes)',
    abc: jingleBells,
    module: 2,
    submodule: '2.1',
  },
  'when-the-saints': {
    id: 'when-the-saints',
    title: 'When The Saints Go Marching In',
    description: 'Uses rests effectively for rhythm practice',
    abc: whenTheSaints,
    module: 2,
    submodule: '2.2',
  },
  'amazing-grace': {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    description: 'Demonstrates dotted notes in 3/4 time',
    abc: amazingGrace,
    module: 2,
    submodule: '2.3',
  },
  'auld-lang-syne': {
    id: 'auld-lang-syne',
    title: 'Auld Lang Syne',
    description: 'Demonstrates 4/4 time signature',
    abc: auldLangSyne,
    module: 2,
    submodule: '2.4',
  },
  greensleeves: {
    id: 'greensleeves',
    title: 'Greensleeves',
    description: 'Excellent example of compound meter 6/8',
    abc: greensleeves,
    module: 2,
    submodule: '2.5',
  },
  'the-entertainer': {
    id: 'the-entertainer',
    title: 'The Entertainer',
    description: 'Ragtime demonstrating tempo and syncopation',
    abc: theEntertainer,
    module: 2,
    submodule: '2.6',
  },

  // MODULE 3
  'do-re-mi': {
    id: 'do-re-mi',
    title: 'Do Re Mi (Sound of Music)',
    description: 'Teaches major scale with solfege names',
    abc: doReMi,
    module: 3,
    submodule: '3.1',
  },
  'joy-to-the-world': {
    id: 'joy-to-the-world',
    title: 'Joy to the World',
    description: 'Descending major scale',
    abc: joyToTheWorld,
    module: 3,
    submodule: '3.1',
  },
  'happy-birthday': {
    id: 'happy-birthday',
    title: 'Happy Birthday',
    description: 'Demonstrates G major key signature',
    abc: happyBirthday,
    module: 3,
    submodule: '3.2',
  },
  'my-bonnie': {
    id: 'my-bonnie',
    title: 'My Bonnie Lies Over the Ocean',
    description: 'Demonstrates clear interval jumps',
    abc: myBonnie,
    module: 3,
    submodule: '3.3',
  },
  'scarborough-fair': {
    id: 'scarborough-fair',
    title: 'Scarborough Fair',
    description: 'Demonstrates Dorian mode (minor variation)',
    abc: scarboroughFair,
    module: 3,
    submodule: '3.5',
  },
  'amazing-grace-pentatonic': {
    id: 'amazing-grace-pentatonic',
    title: 'Amazing Grace (Pentatonic)',
    description: 'Uses only 5-note pentatonic scale',
    abc: amazingGracePentatonic,
    module: 3,
    submodule: '3.6',
  },

  // MODULE 4
  'pachelbel-canon': {
    id: 'pachelbel-canon',
    title: "Pachelbel's Canon",
    description: 'Shows triads and chord progression',
    abc: pachelbelCanon,
    module: 4,
    submodule: '4.1',
  },
  'heart-and-soul': {
    id: 'heart-and-soul',
    title: 'Heart and Soul',
    description: 'Classic I-vi-IV-V pop progression',
    abc: heartAndSoul,
    module: 4,
    submodule: '4.3',
  },
  'blue-moon': {
    id: 'blue-moon',
    title: 'Blue Moon',
    description: 'Demonstrates doo-wop chord changes with Roman numerals',
    abc: blueMoon,
    module: 4,
    submodule: '4.4',
  },
  'house-rising-sun': {
    id: 'house-rising-sun',
    title: 'House of the Rising Sun',
    description: 'Demonstrates circle of fifths movement',
    abc: houseRisingSun,
    module: 4,
    submodule: '4.5',
  },
  'ode-to-joy-inversions': {
    id: 'ode-to-joy-inversions',
    title: 'Ode to Joy (With Inversions)',
    description: 'Shows root position and inversions',
    abc: odeToJoyInversions,
    module: 4,
    submodule: '4.6',
  },
  'autumn-leaves': {
    id: 'autumn-leaves',
    title: 'Autumn Leaves',
    description: 'Demonstrates seventh chords in jazz context',
    abc: autumnLeaves,
    module: 4,
    submodule: '4.7',
  },

  // MODULE 5
  'la-bamba': {
    id: 'la-bamba',
    title: 'La Bamba',
    description: 'Demonstrates I-IV-V progression in rock style',
    abc: laBamba,
    module: 5,
    submodule: '5.1',
  },
  'minuet-in-g': {
    id: 'minuet-in-g',
    title: 'Minuet in G',
    description: 'Demonstrates cadences (perfect, authentic, half)',
    abc: minuetInG,
    module: 5,
    submodule: '5.2',
  },
  'oh-susanna': {
    id: 'oh-susanna',
    title: 'Oh Susanna',
    description: 'Demonstrates melodic contour with arch shapes',
    abc: ohSusanna,
    module: 5,
    submodule: '5.3',
  },
  'twinkle-form': {
    id: 'twinkle-form',
    title: 'Twinkle (Theme and Variations)',
    description: 'A-A-B-A song structure',
    abc: twinkleForm,
    module: 5,
    submodule: '5.4',
  },
  'brahms-lullaby': {
    id: 'brahms-lullaby',
    title: "Brahms' Lullaby",
    description: 'Demonstrates dynamics (pp, p, mp, mf)',
    abc: brahmsLullaby,
    module: 5,
    submodule: '5.5',
  },
  'god-save-king-modulation': {
    id: 'god-save-king-modulation',
    title: 'God Save the King (Modulation)',
    description: 'Demonstrates modulation from G to D major',
    abc: godSaveKingModulation,
    module: 5,
    submodule: '5.6',
  },
}

/**
 * Get a music sheet by ID
 */
export function getMusicSheet(id: string): MusicSheet | undefined {
  return MUSIC_SHEETS[id]
}

/**
 * Get all music sheets for a specific module
 */
export function getModuleSheets(moduleNumber: number): MusicSheet[] {
  return Object.values(MUSIC_SHEETS).filter((sheet) => sheet.module === moduleNumber)
}

/**
 * Get all music sheets for a specific submodule
 */
export function getSubmoduleSheets(submoduleId: string): MusicSheet[] {
  return Object.values(MUSIC_SHEETS).filter((sheet) => sheet.submodule === submoduleId)
}

/**
 * Get ABC notation content by sheet ID
 */
export function getSheetAbc(id: string): string | undefined {
  return MUSIC_SHEETS[id]?.abc
}

export default MUSIC_SHEETS
