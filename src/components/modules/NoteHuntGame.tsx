import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useAudioStore } from '../../stores/useAudioStore'
import { useProgressStore } from '../../stores/useProgressStore'
import VirtualPiano from '../VirtualPiano/VirtualPiano'

interface NoteHuntGameProps {
  submoduleId: string
  onComplete?: (score: number, total: number) => void
}

interface Level {
  id: number
  name: string
  instruction: string
  targetNotes: string[]
  celebration: string
}

const LEVELS: Level[] = [
  {
    id: 1,
    name: 'Tìm nốt C',
    instruction: 'Tìm và click TẤT CẢ các phím C trên đàn Piano!',
    targetNotes: ['C'],
    celebration: '🎉 Tuyệt vời! Bạn đã tìm được tất cả nốt C - nốt quan trọng nhất!',
  },
  {
    id: 2,
    name: 'Tìm nốt F',
    instruction: 'Tìm và click TẤT CẢ các phím F trên đàn Piano!',
    targetNotes: ['F'],
    celebration: '🌟 Xuất sắc! Nốt F là mốc quan trọng thứ hai trên đàn!',
  },
  {
    id: 3,
    name: 'Tìm C và F',
    instruction: 'Tìm TẤT CẢ các phím C VÀ F!',
    targetNotes: ['C', 'F'],
    celebration: '💪 Siêu đỉnh! Bạn đã nắm vững 2 nốt mốc C và F!',
  },
  {
    id: 4,
    name: 'Tìm D và G',
    instruction: 'Tìm TẤT CẢ các phím D VÀ G!',
    targetNotes: ['D', 'G'],
    celebration: '🔥 Cháy! Bạn đang tiến bộ rất nhanh!',
  },
  {
    id: 5,
    name: 'Tìm E và A',
    instruction: 'Tìm TẤT CẢ các phím E VÀ A!',
    targetNotes: ['E', 'A'],
    celebration: '⚡ Tốc độ tuyệt vời! Chỉ còn 1 bước nữa thôi!',
  },
  {
    id: 6,
    name: 'Bậc thầy',
    instruction: 'Tìm TẤT CẢ các phím B - thử thách cuối cùng!',
    targetNotes: ['B'],
    celebration: '🏆 HOÀN HẢO! Bạn đã trở thành Bậc Thầy Săn Nốt!',
  },
]

const getTargetKeys = (targetNotes: string[], startOctave: number, octaves: number): string[] => {
  const keys: string[] = []
  for (let o = startOctave; o < startOctave + octaves; o++) {
    for (const noteName of targetNotes) {
      keys.push(`${noteName}${o}`)
    }
  }
  return keys
}

/**
 * NoteHuntGame - Find all instances of target notes on piano
 * ⭐ Tier 1 Game for Module 1.2
 */
export const NoteHuntGame: React.FC<NoteHuntGameProps> = ({ submoduleId, onComplete }) => {
  const playNote = useAudioStore((state) => state.playNote)
  const releaseNote = useAudioStore((state) => state.releaseNote)
  const setSubmoduleScore = useProgressStore((state) => state.setSubmoduleScore)
  const addXP = useProgressStore((state) => state.addXP)

  const START_OCTAVE = 3
  const OCTAVES = 3

  const [currentLevel, setCurrentLevel] = useState(0)
  const [foundNotes, setFoundNotes] = useState<Set<string>>(new Set())
  const [wrongNote, setWrongNote] = useState<string | null>(null)
  const [isGameComplete, setIsGameComplete] = useState(false)
  const [showLevelComplete, setShowLevelComplete] = useState(false)

  const level = LEVELS[currentLevel]

  const targetKeys = useMemo(() => {
    if (!level) return []
    return getTargetKeys(level.targetNotes, START_OCTAVE, OCTAVES)
  }, [level])

  // Check if all targets found for current level
  useEffect(() => {
    if (targetKeys.length > 0 && foundNotes.size === targetKeys.length && !showLevelComplete) {
      setShowLevelComplete(true)
    }
  }, [foundNotes, targetKeys, showLevelComplete])

  const handleNextLevel = useCallback(() => {
    if (currentLevel < LEVELS.length - 1) {
      setCurrentLevel((prev) => prev + 1)
      setFoundNotes(new Set())
      setWrongNote(null)
      setShowLevelComplete(false)
    } else {
      // All levels complete!
      setSubmoduleScore(submoduleId, 100)
      addXP(30)
      setIsGameComplete(true)
      onComplete?.(LEVELS.length, LEVELS.length)
    }
  }, [currentLevel, submoduleId, setSubmoduleScore, addXP, onComplete])

  const handlePianoPress = useCallback(
    (note: string) => {
      if (showLevelComplete) return

      playNote(note)
      setTimeout(() => releaseNote(note), 300)

      const noteName = note.replace(/\d/, '')

      if (level?.targetNotes.includes(noteName)) {
        setFoundNotes((prev) => new Set([...prev, note]))
        setWrongNote(null)
      } else {
        setWrongNote(note)
        setTimeout(() => setWrongNote(null), 500)
      }
    },
    [level, playNote, releaseNote, showLevelComplete]
  )

  // Game Complete Screen
  if (isGameComplete) {
    return (
      <div className="bg-gradient-to-b from-emerald-500/20 to-slate-800/50 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h3 className="text-2xl font-bold text-white mb-2">Săn Nốt Hoàn Thành!</h3>
        <p className="text-emerald-400 text-lg mb-4">
          Bạn đã chinh phục tất cả {LEVELS.length} thử thách!
        </p>
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="text-3xl text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <p className="text-slate-300 text-sm">+30 XP đã được cộng vào tài khoản của bạn!</p>
      </div>
    )
  }

  // Level Complete Screen (with Next Level button)
  if (showLevelComplete && level) {
    const isLastLevel = currentLevel === LEVELS.length - 1
    return (
      <div className="bg-gradient-to-b from-[#30e8e8]/20 to-slate-800/50 rounded-xl p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            <span className="text-sm font-bold text-[#30e8e8]">Săn Nốt (Note Hunt)</span>
          </div>
          <span className="text-sm text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
        </div>

        {/* Celebration */}
        <div className="text-center py-8">
          <div className="text-5xl mb-4 animate-pulse">
            {isLastLevel ? '🏆' : currentLevel >= 3 ? '🔥' : '⭐'}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{level.name} - Hoàn thành!</h3>
          <p className="text-[#30e8e8] text-base mb-6">{level.celebration}</p>

          {/* Progress Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {LEVELS.map((_, i) => (
              <span
                key={i}
                className={`text-2xl ${i <= currentLevel ? 'text-yellow-400' : 'text-slate-600'}`}
              >
                {i <= currentLevel ? '★' : '☆'}
              </span>
            ))}
          </div>

          {/* Next Level Button */}
          <button
            onClick={handleNextLevel}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#30e8e8] text-[#111818] rounded-xl font-bold text-lg hover:bg-[#26d4d4] transition-all hover:scale-105 shadow-lg shadow-[#30e8e8]/30"
          >
            {isLastLevel ? (
              <>
                <span className="material-symbols-outlined">emoji_events</span>
                Hoàn Thành Game!
              </>
            ) : (
              <>
                Tiếp tục Level {currentLevel + 2}
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  if (!level) return null

  // Active Gameplay Screen
  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          <span className="text-sm font-bold text-[#30e8e8]">Săn Nốt (Note Hunt)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Level {currentLevel + 1}/{LEVELS.length}
          </span>
        </div>
      </div>

      {/* Progress Stars */}
      <div className="flex justify-center gap-1 mb-4">
        {LEVELS.map((_, i) => (
          <span
            key={i}
            className={`text-lg ${i < currentLevel ? 'text-yellow-400' : i === currentLevel ? 'text-[#30e8e8]' : 'text-slate-600'}`}
          >
            {i < currentLevel ? '★' : i === currentLevel ? '●' : '○'}
          </span>
        ))}
      </div>

      {/* Instruction */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">{level.name}</h3>
        <p className="text-base text-[#30e8e8] font-medium">{level.instruction}</p>
        <p className="text-sm text-slate-400 mt-2">
          Tìm được: {foundNotes.size}/{targetKeys.length}
        </p>
      </div>

      {/* Piano */}
      <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
        <VirtualPiano
          startOctave={START_OCTAVE}
          octaves={OCTAVES}
          onStartNote={handlePianoPress}
          onStopNote={() => {}}
          activeNotes={[]}
          successNotes={[...foundNotes]}
          errorNotes={wrongNote ? [wrongNote] : []}
        />
      </div>

      {/* Hint */}
      <div className="mt-4 text-center">
        <p className="text-xs text-slate-400">
          💡 Mẹo: Nốt C nằm ngay bên trái nhóm 2 phím đen, nốt F nằm ngay bên trái nhóm 3 phím đen
        </p>
      </div>
    </div>
  )
}

export default NoteHuntGame
