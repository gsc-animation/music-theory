/**
 * Practice Library - Categorized music sheets for the Practice page
 * Organizes curriculum songs + Butterworth collection by difficulty modules
 */

import MUSIC_SHEETS, { type MusicSheet } from './music-sheets'

// Dynamic imports for Butterworth collection (loaded on demand)
const butterworthModules = import.meta.glob('./music-sheets/butterworth/*.abc', {
  query: '?raw',
  import: 'default',
})

export interface PracticeSheet {
  id: string
  title: string
  titleVi?: string
  description: string
  abc: string
  difficulty: 'beginner' | 'easy' | 'intermediate' | 'advanced' | 'expert'
  source: 'curriculum' | 'butterworth'
  submodule?: string
}

export interface PracticeCategory {
  id: number
  name: string
  nameVi: string
  description: string
  descriptionVi: string
  icon: string
  color: string // Tailwind color class
  difficulty: PracticeSheet['difficulty']
  sheets: PracticeSheet[]
}

/**
 * Convert curriculum MusicSheet to PracticeSheet
 */
function toPracticeSheet(
  sheet: MusicSheet,
  difficulty: PracticeSheet['difficulty']
): PracticeSheet {
  return {
    id: sheet.id,
    title: sheet.title,
    description: sheet.description,
    abc: sheet.abc,
    difficulty,
    source: 'curriculum',
    submodule: sheet.submodule,
  }
}

/**
 * Get all sheets for a specific module
 */
function getModuleSheets(moduleNum: number): MusicSheet[] {
  return Object.values(MUSIC_SHEETS).filter((s) => s.module === moduleNum)
}

/**
 * Practice categories organized from easiest to hardest
 */
export const PRACTICE_CATEGORIES: PracticeCategory[] = [
  {
    id: 1,
    name: 'Staff & Notes',
    nameVi: 'Khuông Nhạc & Nốt',
    description: 'Learn to read notes on the grand staff',
    descriptionVi: 'Học đọc nốt trên khuông nhạc',
    icon: 'music_note',
    color: 'from-emerald-500 to-teal-600',
    difficulty: 'beginner',
    sheets: getModuleSheets(1).map((s) => toPracticeSheet(s, 'beginner')),
  },
  {
    id: 2,
    name: 'Rhythm & Time',
    nameVi: 'Nhịp & Trường Độ',
    description: 'Master note values and time signatures',
    descriptionVi: 'Làm chủ trường độ nốt và nhịp',
    icon: 'timer',
    color: 'from-blue-500 to-indigo-600',
    difficulty: 'easy',
    sheets: getModuleSheets(2).map((s) => toPracticeSheet(s, 'easy')),
  },
  {
    id: 3,
    name: 'Scales & Melody',
    nameVi: 'Gam & Giai Điệu',
    description: 'Explore major, minor, and pentatonic scales',
    descriptionVi: 'Khám phá gam trưởng, thứ và ngũ cung',
    icon: 'trending_up',
    color: 'from-violet-500 to-purple-600',
    difficulty: 'intermediate',
    sheets: getModuleSheets(3).map((s) => toPracticeSheet(s, 'intermediate')),
  },
  {
    id: 4,
    name: 'Chords & Harmony',
    nameVi: 'Hợp Âm & Hòa Thanh',
    description: 'Build triads, seventh chords, and progressions',
    descriptionVi: 'Xây dựng hợp âm ba, bảy và tiến trình',
    icon: 'layers',
    color: 'from-orange-500 to-red-600',
    difficulty: 'advanced',
    sheets: getModuleSheets(4).map((s) => toPracticeSheet(s, 'advanced')),
  },
  {
    id: 5,
    name: 'Form & Composition',
    nameVi: 'Cấu Trúc & Sáng Tác',
    description: 'Understand song structure and modulation',
    descriptionVi: 'Hiểu cấu trúc bài hát và chuyển điệu',
    icon: 'architecture',
    color: 'from-pink-500 to-rose-600',
    difficulty: 'expert',
    sheets: getModuleSheets(5).map((s) => toPracticeSheet(s, 'expert')),
  },
]

/**
 * Butterworth Folk Collection metadata
 * Actual ABC content is loaded dynamically
 */
export interface ButterworthEntry {
  filename: string
  title: string
  key: string
}

/**
 * Parse Butterworth filename to extract title and key
 * Format: {Title}-in-{Key}.abc
 * Example: "Bonny-Green-in-C.abc" -> { title: "Bonny Green", key: "C" }
 */
export function parseButterworthFilename(filename: string): ButterworthEntry {
  // Remove path and extension
  const basename = filename.split('/').pop()?.replace('.abc', '') || ''

  // Split by "-in-" to get title and key
  const parts = basename.split('-in-')
  const key = parts.length > 1 ? parts.pop() || 'C' : 'C'
  const titlePart = parts.join('-in-')

  // Convert kebab-case to Title Case
  const title = titlePart
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  return { filename, title, key }
}

/**
 * Get list of all Butterworth song filenames
 */
export function getButterworthList(): ButterworthEntry[] {
  return Object.keys(butterworthModules).map((path) => parseButterworthFilename(path))
}

/**
 * Load a Butterworth song by filename
 */
export async function loadButterworthSong(filename: string): Promise<string> {
  const loader = butterworthModules[filename]
  if (!loader) {
    throw new Error(`Butterworth song not found: ${filename}`)
  }
  return (await loader()) as string
}

/**
 * Create Butterworth category (lazy loaded)
 */
export function createButterworthCategory(): Omit<PracticeCategory, 'sheets'> & {
  isLazy: true
  getSheets: () => ButterworthEntry[]
  loadSheet: (filename: string) => Promise<string>
} {
  return {
    id: 6,
    name: 'Folk Collection',
    nameVi: 'Bộ Sưu Tập Dân Ca',
    description: '268 traditional folk songs from Butterworth collection',
    descriptionVi: '268 bài dân ca truyền thống từ bộ sưu tập Butterworth',
    icon: 'library_music',
    color: 'from-amber-500 to-yellow-600',
    difficulty: 'intermediate',
    isLazy: true,
    getSheets: getButterworthList,
    loadSheet: loadButterworthSong,
  }
}

/**
 * Get all practice categories including Butterworth
 */
export function getAllCategories() {
  return {
    curriculum: PRACTICE_CATEGORIES,
    butterworth: createButterworthCategory(),
  }
}

/**
 * Get a specific category by ID
 */
export function getCategoryById(id: number): PracticeCategory | undefined {
  return PRACTICE_CATEGORIES.find((c) => c.id === id)
}

/**
 * Get total song count across all curriculum categories
 */
export function getTotalCurriculumSongs(): number {
  return PRACTICE_CATEGORIES.reduce((sum, cat) => sum + cat.sheets.length, 0)
}

export default PRACTICE_CATEGORIES
