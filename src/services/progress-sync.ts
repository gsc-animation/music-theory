/**
 * Progress Sync Service
 * Handles synchronization of user progress between local storage and Supabase.
 */

import { supabase, isSupabaseConfigured, type UserProgressRow } from './supabase-client'
import { getBrowserId } from './browser-id'
import type { UserProgress, LevelCompletion } from '../stores/useProgressStore'

// Debounce timer for sync operations
let syncTimeout: ReturnType<typeof setTimeout> | null = null
const SYNC_DEBOUNCE_MS = 500

/**
 * Load progress from Supabase for the current browser
 */
export async function loadRemoteProgress(): Promise<UserProgress | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null
  }

  const browserId = getBrowserId()

  try {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('browser_id', browserId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // No row found - this is expected for new users
        console.log('[ProgressSync] 📝 New user - no existing cloud progress')
        return null
      }
      throw error
    }

    if (!data) {
      return null
    }

    // Convert database row to UserProgress format
    const row = data as UserProgressRow
    return {
      completedSubmodules: row.completed_submodules || [],
      completedLevels: (row.completed_levels || {}) as Record<string, LevelCompletion>,
      submoduleScores: (row.submodule_scores || {}) as Record<string, number>,
      totalXP: row.total_xp || 0,
      streakDays: row.streak_days || 0,
      lastActiveDate: row.last_active_date || '',
      practiceSessionsCompleted: row.practice_sessions_completed || 0,
      totalPracticeMinutes: row.total_practice_minutes || 0,
      currentModuleId: row.current_module_id || 1,
      currentSubmoduleId: row.current_submodule_id || '1.1',
    }
  } catch (error) {
    console.error('[ProgressSync] Failed to load remote progress:', error)
    return null
  }
}

/**
 * Save progress to Supabase (upsert)
 */
export async function saveProgressToSupabase(progress: UserProgress): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) {
    return false
  }

  const browserId = getBrowserId()

  try {
    const { error } = await supabase.from('user_progress').upsert(
      {
        browser_id: browserId,
        completed_submodules: progress.completedSubmodules,
        completed_levels: progress.completedLevels,
        submodule_scores: progress.submoduleScores,
        total_xp: progress.totalXP,
        streak_days: progress.streakDays,
        last_active_date: progress.lastActiveDate,
        practice_sessions_completed: progress.practiceSessionsCompleted,
        total_practice_minutes: progress.totalPracticeMinutes,
        current_module_id: progress.currentModuleId,
        current_submodule_id: progress.currentSubmoduleId,
      },
      {
        onConflict: 'browser_id',
      }
    )

    if (error) {
      throw error
    }

    console.log('[ProgressSync] ✅ Progress saved to Supabase')

    return true
  } catch (error) {
    console.error('[ProgressSync] Failed to save progress:', error)
    return false
  }
}

/**
 * Debounced sync - call this after any progress change
 */
export function scheduleSyncToSupabase(progress: UserProgress): void {
  if (!isSupabaseConfigured()) {
    return
  }

  // Clear any pending sync
  if (syncTimeout) {
    clearTimeout(syncTimeout)
  }

  // Schedule new sync
  syncTimeout = setTimeout(() => {
    saveProgressToSupabase(progress)
    syncTimeout = null
  }, SYNC_DEBOUNCE_MS)
}

/**
 * Merge local and remote progress, preferring the most complete data
 */
export function mergeProgress(local: UserProgress, remote: UserProgress): UserProgress {
  // Merge completed submodules (union of both arrays)
  const completedSubmodules = Array.from(
    new Set([...local.completedSubmodules, ...remote.completedSubmodules])
  )

  // Merge completed levels (take best scores)
  const completedLevels: Record<string, LevelCompletion> = { ...remote.completedLevels }
  for (const [key, localLevel] of Object.entries(local.completedLevels)) {
    const remoteLevel = completedLevels[key]
    if (!remoteLevel) {
      completedLevels[key] = localLevel
    } else {
      // Take the better result
      completedLevels[key] = {
        percentage: Math.max(localLevel.percentage, remoteLevel.percentage),
        stars: Math.max(localLevel.stars, remoteLevel.stars),
        passed: localLevel.passed || remoteLevel.passed,
        bestTime:
          localLevel.bestTime && remoteLevel.bestTime
            ? Math.min(localLevel.bestTime, remoteLevel.bestTime)
            : localLevel.bestTime || remoteLevel.bestTime,
      }
    }
  }

  // Merge submodule scores (take highest)
  const submoduleScores: Record<string, number> = { ...remote.submoduleScores }
  for (const [key, localScore] of Object.entries(local.submoduleScores)) {
    submoduleScores[key] = Math.max(localScore, submoduleScores[key] || 0)
  }

  // For other values, take the higher/more recent value
  return {
    completedSubmodules,
    completedLevels,
    submoduleScores,
    totalXP: Math.max(local.totalXP, remote.totalXP),
    streakDays: Math.max(local.streakDays, remote.streakDays),
    lastActiveDate:
      local.lastActiveDate > remote.lastActiveDate ? local.lastActiveDate : remote.lastActiveDate,
    practiceSessionsCompleted: Math.max(
      local.practiceSessionsCompleted,
      remote.practiceSessionsCompleted
    ),
    totalPracticeMinutes: Math.max(local.totalPracticeMinutes, remote.totalPracticeMinutes),
    currentModuleId: local.currentModuleId, // Prefer local for current position
    currentSubmoduleId: local.currentSubmoduleId,
  }
}

/**
 * Initialize progress sync - load remote and merge with local
 * Returns the merged progress to be applied to the store
 */
export async function initializeProgressSync(
  localProgress: UserProgress
): Promise<UserProgress | null> {
  if (!isSupabaseConfigured()) {
    console.log('[ProgressSync] ✅ Initialized - using local progress only')
    return null
  }

  try {
    const remoteProgress = await loadRemoteProgress()

    if (!remoteProgress) {
      // No remote progress, save local to cloud
      await saveProgressToSupabase(localProgress)
      return null
    }

    // Merge local and remote
    const merged = mergeProgress(localProgress, remoteProgress)

    // Save merged progress back to cloud
    await saveProgressToSupabase(merged)

    console.log('[ProgressSync] ✅ Merged local and remote progress')

    return merged
  } catch (error) {
    console.error('[ProgressSync] Failed to initialize sync:', error)
    return null
  }
}
