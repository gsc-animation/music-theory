import React from 'react'
import { Sidebar } from '../components/layout/Sidebar'
import { MainHeader } from '../components/layout/MainHeader'
import { useProgressStore } from '../stores/useProgressStore'
import { COURSE_MODULES, getTotalSubmodules } from '../data/course-data'

/**
 * ProfilePage - User statistics and progress overview
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
  const completionPercentage = Math.round((completedSubmodules.length / totalSubmodules) * 100)

  const formatMinutes = (mins: number) => {
    if (mins < 60) return `${mins}m`
    const hours = Math.floor(mins / 60)
    const remaining = mins % 60
    return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress()
    }
  }

  return (
    <div className="flex h-screen bg-[#F5F7FA] dark:bg-[#121212] overflow-hidden">
      <Sidebar className="hidden md:flex" />

      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        <MainHeader />

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth no-scrollbar">
          {/* Profile Header */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#30e8e8] to-[#1f9d9d] rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl">
                  person
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Your Profile
                </h1>
                <p className="text-slate-600 dark:text-slate-300">
                  Track your music theory learning journey
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon="star"
              iconColor="text-amber-500"
              label="Total XP"
              value={totalXP.toLocaleString()}
            />
            <StatCard
              icon="local_fire_department"
              iconColor="text-orange-500"
              label="Day Streak"
              value={streakDays}
            />
            <StatCard
              icon="check_circle"
              iconColor="text-emerald-500"
              label="Lessons Complete"
              value={`${completedSubmodules.length}/${totalSubmodules}`}
            />
            <StatCard
              icon="schedule"
              iconColor="text-blue-500"
              label="Practice Time"
              value={formatMinutes(totalPracticeMinutes)}
            />
          </div>

          {/* Overall Progress */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-4">
              Course Progress
            </h2>
            
            {/* Overall Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600 dark:text-slate-300">Overall Completion</span>
                <span className="font-bold text-[#30e8e8]">{completionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#30e8e8] to-[#1f9d9d] rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Module Progress */}
            <div className="space-y-4">
              {COURSE_MODULES.map((module) => {
                const moduleCompleted = module.submodules.filter(s => 
                  completedSubmodules.includes(s.id)
                ).length
                const moduleTotal = module.submodules.length
                const modulePercent = Math.round((moduleCompleted / moduleTotal) * 100)

                return (
                  <div key={module.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-700 dark:text-slate-200">
                        Module {module.id}: {module.name}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {moduleCompleted}/{moduleTotal}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          modulePercent === 100 
                            ? 'bg-emerald-500' 
                            : 'bg-[#30e8e8]/60'
                        }`}
                        style={{ width: `${modulePercent}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Scores */}
          {Object.keys(submoduleScores).length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-4">
                Practice Scores
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(submoduleScores).map(([id, score]) => (
                  <div 
                    key={id}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
                  >
                    <span className="text-sm text-slate-600 dark:text-slate-300">
                      Lesson {id}
                    </span>
                    <span className={`font-bold ${
                      score === 100 ? 'text-emerald-500' : 
                      score >= 80 ? 'text-blue-500' : 
                      score >= 60 ? 'text-amber-500' : 'text-slate-500'
                    }`}>
                      {score}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reset Progress */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-2">
              Danger Zone
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Reset all progress and start fresh. This action cannot be undone.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-medium hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:hover:bg-rose-900/50 transition-colors"
            >
              Reset All Progress
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

interface StatCardProps {
  icon: string
  iconColor: string
  label: string
  value: string | number
}

const StatCard: React.FC<StatCardProps> = ({ icon, iconColor, label, value }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-slate-100 dark:border-slate-700">
    <span className={`material-symbols-outlined ${iconColor} text-2xl`}>
      {icon}
    </span>
    <div className="mt-2">
      <p className="text-2xl font-bold text-slate-800 dark:text-white">{value}</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
    </div>
  </div>
)

export default ProfilePage
