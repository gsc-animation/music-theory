/**
 * Supabase Client Configuration
 * Connects to Supabase using environment variables for cloud progress storage.
 */

import { createClient } from '@supabase/supabase-js'

// Supabase configuration from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_TOKEN as string

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[Supabase] Missing environment variables. Cloud sync disabled.',
    '\nRequired: VITE_SUPABASE_URL, VITE_SUPABASE_TOKEN'
  )
}

// Create Supabase client (or null if not configured)
export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

/**
 * Check if Supabase is configured and available
 */
export function isSupabaseConfigured(): boolean {
  return supabase !== null
}

/**
 * Database types for user_progress table
 */
export interface UserProgressRow {
  id: string
  browser_id: string
  completed_submodules: string[]
  completed_levels: Record<
    string,
    { percentage: number; stars: number; passed: boolean; bestTime?: number }
  >
  submodule_scores: Record<string, number>
  section_progress: Record<string, { visibleCount: number; totalSections: number }>
  total_xp: number
  streak_days: number
  last_active_date: string
  practice_sessions_completed: number
  total_practice_minutes: number
  current_module_id: number
  current_submodule_id: string
  created_at: string
  updated_at: string
}

export default supabase
