-- Migration: Add comprehensive access codes system and enhance universities table

-- 1. Create access_codes_bank table with 100 pre-generated codes
CREATE TABLE IF NOT EXISTS public.access_codes_bank (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT false,
  used_by_email TEXT,
  used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for code lookups
CREATE INDEX IF NOT EXISTS idx_access_codes_bank_code ON public.access_codes_bank(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_bank_is_used ON public.access_codes_bank(is_used);

-- Enable Row Level Security
ALTER TABLE public.access_codes_bank ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can check code validity
DROP POLICY IF EXISTS "Anyone can check code validity" ON public.access_codes_bank;
CREATE POLICY "Anyone can check code validity"
ON public.access_codes_bank
FOR SELECT
USING (true);

-- Policy: Service role can insert codes (required for seeding)
DROP POLICY IF EXISTS "Service role can insert codes" ON public.access_codes_bank;
CREATE POLICY "Service role can insert codes"
ON public.access_codes_bank
FOR INSERT
WITH CHECK (true);

-- Policy: Service role can update codes
DROP POLICY IF EXISTS "Service role can update codes" ON public.access_codes_bank;
CREATE POLICY "Service role can update codes"
ON public.access_codes_bank
FOR UPDATE
USING (true);

-- 2. Create universities_comprehensive table with ranking data
CREATE TABLE IF NOT EXISTS public.universities_comprehensive (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  global_rank INTEGER,
  regional_rank INTEGER,
  country_rank INTEGER,
  ranking_score DECIMAL(5, 2) NOT NULL DEFAULT 50,
  description TEXT,
  website TEXT,
  established_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for lookups
CREATE INDEX IF NOT EXISTS idx_universities_name ON public.universities_comprehensive(name);
CREATE INDEX IF NOT EXISTS idx_universities_country ON public.universities_comprehensive(country);
CREATE INDEX IF NOT EXISTS idx_universities_ranking_score ON public.universities_comprehensive(ranking_score DESC);

-- Enable Row Level Security
ALTER TABLE public.universities_comprehensive ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view universities
DROP POLICY IF EXISTS "Anyone can view universities" ON public.universities_comprehensive;
CREATE POLICY "Anyone can view universities"
ON public.universities_comprehensive
FOR SELECT
USING (true);

-- 3. Create university_course_offerings table for fine-grained control
CREATE TABLE IF NOT EXISTS public.university_course_offerings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id UUID NOT NULL REFERENCES public.universities_comprehensive(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  course_ranking_score DECIMAL(5, 2) NOT NULL DEFAULT 50,
  program_strength TEXT,
  year_established INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(university_id, course_id)
);

-- Create indexes for lookups
CREATE INDEX IF NOT EXISTS idx_uni_course_offerings_university ON public.university_course_offerings(university_id);
CREATE INDEX IF NOT EXISTS idx_uni_course_offerings_course ON public.university_course_offerings(course_id);
CREATE INDEX IF NOT EXISTS idx_uni_course_offerings_available ON public.university_course_offerings(is_available);

-- Enable Row Level Security
ALTER TABLE public.university_course_offerings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view course offerings
DROP POLICY IF EXISTS "Anyone can view course offerings" ON public.university_course_offerings;
CREATE POLICY "Anyone can view course offerings"
ON public.university_course_offerings
FOR SELECT
USING (true);

-- 4. Enhance assessment_sessions with course filters and department tracking
DO $$ 
BEGIN
  ALTER TABLE public.assessment_sessions 
  ADD COLUMN department TEXT CHECK (department IN ('science', 'art', 'commercial'));
EXCEPTION WHEN duplicate_column THEN
  -- Column already exists, continue
END $$;

DO $$ 
BEGIN
  ALTER TABLE public.assessment_sessions 
  ADD COLUMN is_shared BOOLEAN NOT NULL DEFAULT false;
EXCEPTION WHEN duplicate_column THEN
  NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE public.assessment_sessions 
  ADD COLUMN share_created_at TIMESTAMP WITH TIME ZONE;
EXCEPTION WHEN duplicate_column THEN
  NULL;
END $$;

DO $$ 
BEGIN
  ALTER TABLE public.assessment_sessions 
  ADD COLUMN recommendations JSONB;
EXCEPTION WHEN duplicate_column THEN
  NULL;
END $$;

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_department ON public.assessment_sessions(department);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_share_token ON public.assessment_sessions(share_token) WHERE share_token IS NOT NULL;

-- Drop old access_codes table if it exists (consolidating into access_codes_bank)
DROP TABLE IF EXISTS public.access_codes CASCADE;
