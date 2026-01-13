-- ================================================
-- METRICS SYSTEM DATABASE TABLES
-- ================================================
-- Run this in your Neon/Postgres database console

-- Table for tracking unique visitor sessions
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id SERIAL PRIMARY KEY,
  session_id VARCHAR(64) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast session lookups
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_session_id ON visitor_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_sessions_created_at ON visitor_sessions(created_at);

-- Table for tracking assessment completions
CREATE TABLE IF NOT EXISTS assessment_completions (
  id SERIAL PRIMARY KEY,
  assessment_id VARCHAR(255),
  completed_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast assessment lookups
CREATE INDEX IF NOT EXISTS idx_assessment_completions_assessment_id ON assessment_completions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_completions_completed_at ON assessment_completions(completed_at);

-- View for quick metrics retrieval
CREATE OR REPLACE VIEW metrics_summary AS
SELECT 
  (SELECT COUNT(DISTINCT session_id) FROM visitor_sessions) as total_visitors,
  (SELECT COUNT(*) FROM assessment_completions) as total_assessments,
  NOW() as last_updated;

-- Cleanup old sessions (keep last 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_sessions() 
RETURNS void AS $$
BEGIN
  DELETE FROM visitor_sessions 
  WHERE created_at < NOW() - INTERVAL '30 days';
  
  DELETE FROM assessment_completions 
  WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql;
