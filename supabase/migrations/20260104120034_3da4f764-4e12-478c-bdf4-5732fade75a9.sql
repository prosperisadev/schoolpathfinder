-- Create access_codes table for the new unlock system
CREATE TABLE public.access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT false,
  used_by_email TEXT,
  used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can check if a code exists (for validation)
CREATE POLICY "Anyone can validate access codes"
ON public.access_codes
FOR SELECT
USING (true);

-- Policy: Anyone can update codes (mark as used)
CREATE POLICY "Anyone can use access codes"
ON public.access_codes
FOR UPDATE
USING (true);

-- Add columns to assessment_sessions for access code tracking
ALTER TABLE public.assessment_sessions 
ADD COLUMN IF NOT EXISTS full_name TEXT,
ADD COLUMN IF NOT EXISTS access_code TEXT,
ADD COLUMN IF NOT EXISTS share_token TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS academic_track TEXT,
ADD COLUMN IF NOT EXISTS waec_estimate TEXT,
ADD COLUMN IF NOT EXISTS jamb_estimate TEXT,
ADD COLUMN IF NOT EXISTS learning_style TEXT;

-- Insert some sample access codes for testing
INSERT INTO public.access_codes (code) VALUES 
  ('PATHFINDER2024'),
  ('LAUNCH2024'),
  ('CAREER2024'),
  ('FUTURE2024'),
  ('TESTCODE123');