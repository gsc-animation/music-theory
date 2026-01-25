import React from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { SimpleHeader } from '../components/layout/SimpleHeader'
import { useProgressStore } from '../stores/useProgressStore'
import { COURSE_MODULES, getTotalSubmodules } from '../data/course-data'
import { JourneyMap } from '../components/profile/JourneyMap'

/**
 * ProfilePage - Home Dashboard with Journey Map Quest
 * Redesigned as the main landing page with game-like exploration UI
 */
export const ProfilePage: React.FC = () => {
  const {
    completedSubmodules,
    totalXP,
    streakDays,
    totalPracticeMinutes,
    submoduleScores,
    resetProgress,
  } = useProgressStore()

  const totalSubmodules = getTotalSubmodules()

  const formatMinutes = (mins: number) => {
    if (mins < 60) return `${mins} phút`
    const hours = Math.floor(mins / 60)
    const remaining = mins % 60
    return remaining > 0 ? `${hours}h ${remaining}p` : `${hours} giờ`
  }

  const handleReset = () => {
    if (
      window.confirm(
        'Bạn có chắc muốn xóa toàn bộ tiến trình học? Hành động này không thể hoàn tác.'
      )
    ) {
      resetProgress()
    }
  }

  // Calculate module-level stats
  const moduleStats = COURSE_MODULES.map((module) => {
    const completed = module.submodules.filter((s) => completedSubmodules.includes(s.id)).length
    const total = module.submodules.length
    return { name: module.name, completed, total, percent: Math.round((completed / total) * 100) }
  })

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] dark:bg-[#121212]">
      <Sidebar className="hidden md:flex" />

      <main className="flex-1 flex flex-col min-w-0 relative">
        <SimpleHeader showJourneyProgress />

        <div className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto">
          {/* Section 1: Journey Map Quest */}
          <JourneyMap />

          {/* Section 2: Activity Statistics */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <span
                className="material-symbols-outlined text-amber-500 text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                analytics
              </span>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                Thành Tích Của Bạn
              </h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon="star"
                iconColor="text-amber-500"
                bgColor="bg-amber-50 dark:bg-amber-900/20"
                label="Tổng Điểm XP"
                value={totalXP.toLocaleString()}
              />
              <StatCard
                icon="local_fire_department"
                iconColor="text-orange-500"
                bgColor="bg-orange-50 dark:bg-orange-900/20"
                label="Chuỗi Ngày"
                value={streakDays}
              />
              <StatCard
                icon="check_circle"
                iconColor="text-emerald-500"
                bgColor="bg-emerald-50 dark:bg-emerald-900/20"
                label="Bài Đã Học"
                value={`${completedSubmodules.length}/${totalSubmodules}`}
              />
              <StatCard
                icon="schedule"
                iconColor="text-blue-500"
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                label="Thời Gian Học"
                value={formatMinutes(totalPracticeMinutes)}
              />
            </div>

            {/* Module Progress Bars */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                Tiến Độ Theo Module
              </h3>
              {moduleStats.map((stat) => (
                <div key={stat.name} className="group">
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-700 dark:text-slate-200 font-medium group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                      {stat.name}
                    </span>
                    <span
                      className={`font-bold ${
                        stat.percent === 100
                          ? 'text-emerald-500'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {stat.completed}/{stat.total}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        stat.percent === 100
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-500'
                          : 'bg-gradient-to-r from-cyan-400 to-teal-500'
                      }`}
                      style={{ width: `${stat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Scores */}
            {Object.keys(submoduleScores).length > 0 && (
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
                  Điểm Luyện Tập Gần Đây
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(submoduleScores)
                    .slice(-8)
                    .map(([id, score]) => (
                      <div
                        key={id}
                        className={`
                        px-3 py-1.5 rounded-lg text-sm font-medium
                        ${
                          score === 100
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                            : score >= 80
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                              : score >= 60
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                        }
                      `}
                      >
                        Bài {id}: {score}%
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Danger Zone */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-rose-100 dark:border-rose-900/30">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-rose-600 dark:text-rose-400">
                  warning
                </span>
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-1">
                  Vùng Nguy Hiểm
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Xóa toàn bộ tiến trình và bắt đầu lại từ đầu. Điều này sẽ xóa XP, các bài đã học,
                  và điểm luyện tập. Hành động này không thể hoàn tác.
                </p>
                <button
                  onClick={handleReset}
                  className="px-4 py-2.5 bg-rose-100 text-rose-700 rounded-xl font-semibold hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 transition-all active:scale-95"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">delete_forever</span>
                    Xóa Toàn Bộ Tiến Trình
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface StatCardProps {
  icon: string
  iconColor: string
  bgColor: string
  label: string
  value: string | number
}

const StatCard: React.FC<StatCardProps> = ({ icon, iconColor, bgColor, label, value }) => (
  <div className={`${bgColor} rounded-xl p-4 transition-all hover:scale-105`}>
    <span
      className={`material-symbols-outlined ${iconColor} text-2xl`}
      style={{ fontVariationSettings: "'FILL' 1" }}
    >
      {icon}
    </span>
    <div className="mt-2">
      <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </div>
)

export default ProfilePage
