import React, { useState, useCallback, useMemo } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { SimpleHeader } from '../components/layout/SimpleHeader'
import { useGameStore } from '../stores/useGameStore'
import { CollapsiblePanel } from '../components/ui/CollapsiblePanel'
import { GameOverlay } from '../features/game/components/GameOverlay'
import { FeedbackOverlay } from '../components/GameLoop/FeedbackOverlay'
import { ConfettiExplosion } from '../components/ui/ConfettiExplosion'
import { MusicCategoryCard, SheetSelectorModal, NowPlayingBanner } from '../components/practice'
import PRACTICE_CATEGORIES, {
  createButterworthCategory,
  type PracticeSheet,
  type PracticeCategory,
  type ButterworthEntry,
} from '../data/practiceLibrary'

const AbcGrandStaff = React.lazy(() => import('../components/MusicStaff/AbcGrandStaff'))
const HorizontalSaoTrucVisualizer = React.lazy(
  () => import('../features/sao-truc/components/HorizontalSaoTrucVisualizer')
)

/**
 * PracticePage - Music Library with dynamic sheet loading
 */
export const PracticePage: React.FC = () => {
  const isPlaying = useGameStore((state) => state.isPlaying)
  const streak = useGameStore((state) => state.streak)

  const [showConfetti, setShowConfetti] = React.useState(false)
  const [showNoteNames, setShowNoteNames] = React.useState(true)

  // Music library state
  const [selectedCategory, setSelectedCategory] = useState<PracticeCategory | null>(null)
  const [selectedSheet, setSelectedSheet] = useState<PracticeSheet | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [isButterworthModal, setIsButterworthModal] = useState(false)

  // Butterworth category (lazy)
  const butterworthCategory = useMemo(() => createButterworthCategory(), [])
  const [butterworthEntries, setButterworthEntries] = useState<ButterworthEntry[]>([])

  React.useEffect(() => {
    if (isPlaying && streak > 0 && streak % 10 === 0) {
      setShowConfetti(true)
    }
  }, [streak, isPlaying])

  // Handle category click
  const handleCategoryClick = useCallback(
    (category: PracticeCategory) => {
      setSelectedCategory(category)
      setIsButterworthModal(false)
      setModalOpen(true)
    },
    []
  )

  // Handle Butterworth category click
  const handleButterworthClick = useCallback(() => {
    // Load Butterworth entries if not already loaded
    if (butterworthEntries.length === 0) {
      setButterworthEntries(butterworthCategory.getSheets())
    }
    setSelectedCategory({
      id: butterworthCategory.id,
      name: butterworthCategory.name,
      nameVi: butterworthCategory.nameVi,
      description: butterworthCategory.description,
      descriptionVi: butterworthCategory.descriptionVi,
      icon: butterworthCategory.icon,
      color: butterworthCategory.color,
      difficulty: butterworthCategory.difficulty,
      sheets: [], // Empty - using butterworthEntries instead
    })
    setIsButterworthModal(true)
    setModalOpen(true)
  }, [butterworthCategory, butterworthEntries.length])

  // Handle sheet selection
  const handleSelectSheet = useCallback((sheet: PracticeSheet) => {
    setSelectedSheet(sheet)
  }, [])

  // Clear selected sheet
  const handleClearSheet = useCallback(() => {
    setSelectedSheet(null)
  }, [])

  // Get category color for now playing banner
  const nowPlayingColor = useMemo(() => {
    if (!selectedSheet) return 'from-cyan-500 to-teal-600'
    if (selectedSheet.source === 'butterworth') return butterworthCategory.color
    const category = PRACTICE_CATEGORIES.find((c) =>
      c.sheets.some((s) => s.id === selectedSheet.id)
    )
    return category?.color || 'from-cyan-500 to-teal-600'
  }, [selectedSheet, butterworthCategory.color])

  return (
    <AppLayout>
      <SimpleHeader />

      <GameOverlay />
      <FeedbackOverlay />
      <ConfettiExplosion run={showConfetti} onComplete={() => setShowConfetti(false)} />

      <div className="flex-1 py-4 md:p-4 space-y-4">
        {/* Music Library Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#30e8e8]">library_music</span>
                Thư Viện Bản Nhạc
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Chọn bài để luyện tập đọc nhạc trên khuông nhạc
              </p>
            </div>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PRACTICE_CATEGORIES.map((category) => (
              <MusicCategoryCard
                key={category.id}
                category={category}
                songCount={category.sheets.length}
                onClick={() => handleCategoryClick(category)}
                isActive={selectedCategory?.id === category.id && !isButterworthModal}
              />
            ))}

            {/* Butterworth Collection */}
            <MusicCategoryCard
              category={{
                id: butterworthCategory.id,
                name: butterworthCategory.name,
                nameVi: butterworthCategory.nameVi,
                description: butterworthCategory.description,
                descriptionVi: butterworthCategory.descriptionVi,
                icon: butterworthCategory.icon,
                color: butterworthCategory.color,
                difficulty: butterworthCategory.difficulty,
                sheets: [],
              }}
              songCount={268}
              onClick={handleButterworthClick}
              isActive={selectedCategory?.id === butterworthCategory.id && isButterworthModal}
            />
          </div>
        </div>

        {/* Now Playing Banner */}
        {selectedSheet && (
          <NowPlayingBanner
            sheet={selectedSheet}
            onClear={handleClearSheet}
            categoryColor={nowPlayingColor}
          />
        )}

        {/* Grand Staff */}
        <CollapsiblePanel
          title="Grand Staff View"
          icon="music_note"
          defaultOpen
          headerExtra={
            <label className="flex items-center gap-1 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
              <input
                type="checkbox"
                checked={showNoteNames}
                onChange={(e) => setShowNoteNames(e.target.checked)}
                className="w-3 h-3 accent-[#30e8e8]"
              />
              <span>Notes</span>
            </label>
          }
        >
          <React.Suspense
            fallback={
              <div className="w-full h-[150px] flex items-center justify-center text-slate-400">
                Loading staff...
              </div>
            }
          >
            <AbcGrandStaff
              showNoteNames={showNoteNames}
              overrideAbc={selectedSheet?.abc}
            />
          </React.Suspense>
        </CollapsiblePanel>

        {/* Flute */}
        <CollapsiblePanel title="Flute" icon="graphic_eq" defaultOpen>
          <React.Suspense
            fallback={
              <div className="w-full h-16 flex items-center justify-center text-slate-400">
                Loading...
              </div>
            }
          >
            <HorizontalSaoTrucVisualizer />
          </React.Suspense>
        </CollapsiblePanel>
      </div>

      {/* Sheet Selector Modal */}
      <SheetSelectorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        category={selectedCategory}
        onSelectSheet={handleSelectSheet}
        butterworthEntries={isButterworthModal ? butterworthEntries : undefined}
        onLoadButterworth={isButterworthModal ? butterworthCategory.loadSheet : undefined}
      />
    </AppLayout>
  )
}

export default PracticePage
