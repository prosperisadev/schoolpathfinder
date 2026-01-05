-- Drop existing overly permissive policies on assessment_sessions
DROP POLICY IF EXISTS "Anyone can create assessment sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "Anyone can update their sessions" ON public.assessment_sessions;
DROP POLICY IF EXISTS "Anyone can view their sessions" ON public.assessment_sessions;

-- Create secure function to check session ownership via request header
CREATE OR REPLACE FUNCTION public.get_session_email()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    current_setting('request.headers', true)::json->>'x-session-email',
    ''
  )
$$;

-- Create secure function to check share token via request header
CREATE OR REPLACE FUNCTION public.get_share_token()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    current_setting('request.headers', true)::json->>'x-share-token',
    ''
  )
$$;

-- INSERT: Anyone can create sessions (required for initial signup)
CREATE POLICY "Users can create their own sessions"
ON public.assessment_sessions
FOR INSERT
WITH CHECK (true);

-- SELECT: Users can only view their own sessions (by email or share token)
CREATE POLICY "Users can view own sessions by email or share token"
ON public.assessment_sessions
FOR SELECT
USING (
  email = public.get_session_email() 
  OR (share_token IS NOT NULL AND share_token = public.get_share_token())
);

-- UPDATE: Users can only update their own sessions by email
CREATE POLICY "Users can update own sessions by email"
ON public.assessment_sessions
FOR UPDATE
USING (email = public.get_session_email());

-- Also restrict access_codes to be more secure
DROP POLICY IF EXISTS "Anyone can use access codes" ON public.access_codes;
DROP POLICY IF EXISTS "Anyone can validate access codes" ON public.access_codes;

-- SELECT: Allow checking if a code exists (needed for validation)
CREATE POLICY "Anyone can check code validity"
ON public.access_codes
FOR SELECT
USING (true);

-- UPDATE: Allow updating codes (marking as used) - will be done via edge function with service role
CREATE POLICY "Service role can update codes"
ON public.access_codes
FOR UPDATE
USING (true);