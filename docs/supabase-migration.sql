-- Supabase SQL Migration: User Progress Table
-- Run this in your Supabase SQL Editor to create the user_progress table

-- Create user_progress table for storing student progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  browser_id TEXT UNIQUE NOT NULL,
  completed_submodules JSONB DEFAULT '[]'::jsonb,
  completed_levels JSONB DEFAULT '{}'::jsonb,
  submodule_scores JSONB DEFAULT '{}'::jsonb,
  total_xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_active_date TEXT DEFAULT '',
  practice_sessions_completed INTEGER DEFAULT 0,
  total_practice_minutes INTEGER DEFAULT 0,
  current_module_id INTEGER DEFAULT 1,
  current_submodule_id TEXT DEFAULT '1.1',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on browser_id for fast lookups
CREATE INDEX IF NOT EXISTS idx_user_progress_browser_id ON user_progress(browser_id);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (using anon key from client)
-- This allows all operations for users with the anon key
CREATE POLICY "Allow anonymous access" ON user_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Update trigger to automatically set updated_at on changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists and recreate
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Verify the table was created
SELECT 'user_progress table created successfully!' AS status;
