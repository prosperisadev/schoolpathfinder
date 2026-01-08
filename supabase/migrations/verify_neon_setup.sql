-- Quick verification script to run in Neon SQL Editor
-- This will check if everything is set up correctly

-- 1. Check if tables exist
SELECT 
  'Tables Exist' as check_name,
  COUNT(*) FILTER (WHERE table_name = 'access_codes_bank') as access_codes_bank,
  COUNT(*) FILTER (WHERE table_name = 'assessment_sessions') as assessment_sessions,
  COUNT(*) FILTER (WHERE table_name = 'universities_comprehensive') as universities_comprehensive,
  COUNT(*) FILTER (WHERE table_name = 'university_course_offerings') as university_course_offerings
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 2. Check RLS policies on access_codes_bank
SELECT 
  'access_codes_bank Policies' as table_name,
  policyname,
  cmd as policy_type,
  CASE WHEN cmd = 'INSERT' THEN '✓ CRITICAL' ELSE 'OK' END as importance
FROM pg_policies 
WHERE tablename = 'access_codes_bank'
ORDER BY cmd;

-- 3. Check if access codes are inserted
SELECT 
  'Access Codes Count' as check_name,
  COUNT(*) as total_codes,
  COUNT(*) FILTER (WHERE is_used = false) as unused_codes,
  COUNT(*) FILTER (WHERE is_used = true) as used_codes
FROM access_codes_bank;

-- 4. Sample access codes
SELECT 
  'Sample Access Codes' as info,
  code,
  is_used,
  used_by_email
FROM access_codes_bank
LIMIT 5;

-- 5. Check universities
SELECT 
  'Universities Count' as check_name,
  COUNT(*) as total_universities
FROM universities_comprehensive;

-- 6. Check assessment_sessions policies  
SELECT 
  'assessment_sessions Policies' as table_name,
  policyname,
  cmd as policy_type
FROM pg_policies 
WHERE tablename = 'assessment_sessions'
ORDER BY cmd;

-- 7. Test INSERT capability (will rollback)
DO $$
DECLARE
  test_code TEXT;
BEGIN
  -- Try to insert a test code
  BEGIN
    INSERT INTO access_codes_bank (code) VALUES ('TEST_CODE_12345');
    RAISE NOTICE '✓ INSERT test passed - access_codes_bank accepts inserts';
    ROLLBACK;
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✗ INSERT test FAILED: %', SQLERRM;
  END;
END $$;

-- Expected Results:
-- 1. All 4 tables should exist (count = 1 each)
-- 2. access_codes_bank should have 3 policies: INSERT, SELECT, UPDATE
-- 3. Access codes count should be 100
-- 4. Universities count should be > 0 (Nigerian universities)
-- 5. assessment_sessions should have INSERT, SELECT, UPDATE policies
-- 6. INSERT test should pass
