-- Migration: Add assessment_results table
-- Purpose: Store complete assessment data (most valuable for analytics)
-- Created: 2026-01-19

CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  full_name TEXT,
  
  -- Profile data
  academic_track TEXT,
  waec_estimate TEXT,
  jamb_estimate TEXT,
  learning_style TEXT,
  
  -- Complete assessment data
  interests JSONB,
  personality JSONB,
  preferences JSONB,
  
  -- Recommendations
  recommendations JSONB,
  top_course TEXT,
  top_course_score INTEGER,
  
  -- Session metadata
  session_id TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  duration_seconds INTEGER,
  
  -- Access & engagement
  access_code TEXT,
  has_unlocked BOOLEAN NOT NULL DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_assessment_results_email ON assessment_results(email);
CREATE INDEX IF NOT EXISTS idx_assessment_results_academic_track ON assessment_results(academic_track);
CREATE INDEX IF NOT EXISTS idx_assessment_results_top_course ON assessment_results(top_course);
CREATE INDEX IF NOT EXISTS idx_assessment_results_completed_at ON assessment_results(completed_at);
CREATE INDEX IF NOT EXISTS idx_assessment_results_has_unlocked ON assessment_results(has_unlocked);

-- Add comments for documentation
COMMENT ON TABLE assessment_results IS 'Complete assessment results - THE MOST VALUABLE DATA for analytics and insights';
COMMENT ON COLUMN assessment_results.email IS 'User email (primary identifier)';
COMMENT ON COLUMN assessment_results.recommendations IS 'Full recommendation array with scores';
COMMENT ON COLUMN assessment_results.top_course IS 'Top recommended course title for quick analysis';
COMMENT ON COLUMN assessment_results.interests IS 'User interests with scores (1-5)';
COMMENT ON COLUMN assessment_results.personality IS 'Personality dimensions and scores';
