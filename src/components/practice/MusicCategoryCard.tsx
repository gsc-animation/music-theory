import React from 'react'
import type { PracticeCategory } from '../../data/practiceLibrary'

interface MusicCategoryCardProps {
  category: PracticeCategory
  songCount: number
  onClick: () => void
  isActive?: boolean
}

/**
 * MusicCategoryCard - Display a music category with module info
 */
export const MusicCategoryCard: React.FC<MusicCategoryCardProps> = ({
  category,
  songCount,
  onClick,
  isActive = false,
}) => {
  const difficultyLabels: Record<string, { label: string; labelVi: string }> = {
    beginner: { label: 'Beginner', labelVi: 'Cơ bản' },
    easy: { label: 'Easy', labelVi: 'Dễ' },
    intermediate: { label: 'Intermediate', labelVi: 'Trung bình' },
    advanced: { label: 'Advanced', labelVi: 'Nâng cao' },
    expert: { label: 'Expert', labelVi: 'Chuyên sâu' },
  }

  const difficultyInfo = difficultyLabels[category.difficulty] || difficultyLabels.intermediate

  return (
    <button
      onClick={onClick}
      className={`
        relative w-full p-4 rounded-xl text-left transition-all duration-200
        bg-gradient-to-br ${category.color}
        hover:scale-[1.02] hover:shadow-lg
        active:scale-[0.98]
        ${isActive ? 'ring-2 ring-white/50 shadow-xl' : 'shadow-md'}
      `}
    >
      {/* Module badge */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <span className="text-white font-bold text-sm">{category.id}</span>
      </div>

      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
        <span className="material-symbols-outlined text-white text-xl">{category.icon}</span>
      </div>

      {/* Title */}
      <h3 className="text-white font-bold text-base mb-1 pr-8">{category.nameVi}</h3>
      <p className="text-white/70 text-xs mb-3 line-clamp-2">{category.descriptionVi}</p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <span className="text-white/80 text-xs bg-white/10 px-2 py-0.5 rounded-full">
          {difficultyInfo.labelVi}
        </span>
        <span className="text-white/90 text-xs font-medium">{songCount} bài</span>
      </div>
    </button>
  )
}

export default MusicCategoryCard
