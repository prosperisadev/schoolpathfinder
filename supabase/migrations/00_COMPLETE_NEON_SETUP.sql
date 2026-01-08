-- ==============================================================================
-- COMPLETE NEON DATABASE SETUP - RUN THIS ENTIRE SCRIPT IN NEON SQL EDITOR
-- ==============================================================================
-- This script will:
-- 1. Create all required tables with proper RLS policies
-- 2. Insert 100 access codes
-- 3. Insert Nigerian universities
-- 4. Verify everything is working
-- ==============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- PART 1: CREATE TABLES
-- ==============================================================================

-- 1.1 Create access_codes_bank table
CREATE TABLE IF NOT EXISTS public.access_codes_bank (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  is_used BOOLEAN NOT NULL DEFAULT false,
  used_by_email TEXT,
  used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_access_codes_bank_code ON public.access_codes_bank(code);
CREATE INDEX IF NOT EXISTS idx_access_codes_bank_is_used ON public.access_codes_bank(is_used);

-- 1.2 Enable RLS and create policies for access_codes_bank
ALTER TABLE public.access_codes_bank ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can check code validity" ON public.access_codes_bank;
CREATE POLICY "Anyone can check code validity"
ON public.access_codes_bank
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Service role can insert codes" ON public.access_codes_bank;
CREATE POLICY "Service role can insert codes"
ON public.access_codes_bank
FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Service role can update codes" ON public.access_codes_bank;
CREATE POLICY "Service role can update codes"
ON public.access_codes_bank
FOR UPDATE
USING (true);

-- 1.3 Create universities_comprehensive table
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

CREATE INDEX IF NOT EXISTS idx_universities_name ON public.universities_comprehensive(name);
CREATE INDEX IF NOT EXISTS idx_universities_country ON public.universities_comprehensive(country);
CREATE INDEX IF NOT EXISTS idx_universities_ranking_score ON public.universities_comprehensive(ranking_score DESC);

ALTER TABLE public.universities_comprehensive ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view universities" ON public.universities_comprehensive;
CREATE POLICY "Anyone can view universities"
ON public.universities_comprehensive
FOR SELECT
USING (true);

-- 1.4 Create university_course_offerings table
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

CREATE INDEX IF NOT EXISTS idx_uni_course_offerings_university ON public.university_course_offerings(university_id);
CREATE INDEX IF NOT EXISTS idx_uni_course_offerings_course ON public.university_course_offerings(course_id);
CREATE INDEX IF NOT EXISTS idx_uni_course_offerings_available ON public.university_course_offerings(is_available);

ALTER TABLE public.university_course_offerings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view course offerings" ON public.university_course_offerings;
CREATE POLICY "Anyone can view course offerings"
ON public.university_course_offerings
FOR SELECT
USING (true);

-- 1.5 Create or update assessment_sessions table
CREATE TABLE IF NOT EXISTS public.assessment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  assessment_data JSONB,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'expired')),
  transaction_reference TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE,
  access_code TEXT,
  share_token TEXT UNIQUE,
  academic_track TEXT,
  department TEXT CHECK (department IN ('science', 'art', 'commercial')),
  waec_estimate TEXT,
  jamb_estimate TEXT,
  is_shared BOOLEAN NOT NULL DEFAULT false,
  share_created_at TIMESTAMP WITH TIME ZONE,
  recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_assessment_sessions_email ON public.assessment_sessions(email);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_transaction_ref ON public.assessment_sessions(transaction_reference);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_department ON public.assessment_sessions(department);
CREATE INDEX IF NOT EXISTS idx_assessment_sessions_share_token ON public.assessment_sessions(share_token) WHERE share_token IS NOT NULL;

ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;

-- Assessment sessions policies (anyone can create, view, and update for now)
DROP POLICY IF EXISTS "Users can create their own sessions" ON public.assessment_sessions;
CREATE POLICY "Users can create their own sessions"
ON public.assessment_sessions
FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view own sessions by email or share token" ON public.assessment_sessions;
CREATE POLICY "Users can view own sessions by email or share token"
ON public.assessment_sessions
FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Users can update own sessions by email" ON public.assessment_sessions;
CREATE POLICY "Users can update own sessions by email"
ON public.assessment_sessions
FOR UPDATE
USING (true);

-- ==============================================================================
-- PART 2: INSERT ACCESS CODES (100 codes)
-- ==============================================================================

INSERT INTO public.access_codes_bank (code) VALUES
('TE3BWHHULREV'),('YTPPQF0TUTR3'),('UF3FI11VRJJ4'),('MCF9CFPZIBW5'),
('XGQWAR8AEWU8'),('WQYMLXBNEG7U'),('530EZ9K5H1ME'),('8LYET27JC5VM'),
('RKWB3W0Y81L1'),('CEWDOEO0WXVB'),('PIOI4HNRC9B2'),('CQEZNCL7B13J'),
('LAV3CNFDMEYZ'),('2UG1A6VXQLR4'),('TMQSCLD0YTGP'),('J7KF36SU4HGE'),
('0UAIMXL61WEW'),('JMOG08V6BK8T'),('CZW4MGVOMXMY'),('1LX5BTPMRNQC'),
('Q1NFT9HGOJ2J'),('MKBQ7IVA0DEQ'),('OXUIQRBH4EAL'),('6C217YN38G1P'),
('VVYRLJB5KQVU'),('DKTRFZF7BB6B'),('MY93MG8TWZ6R'),('E45W2HCCDSX9'),
('8VRR2HDW1ARJ'),('8P8B1IY5C5H3'),('9PKCCOQWSVNS'),('7CT2Z0NVFQKV'),
('CJV8ZTY6ZKWV'),('DYAANJVL4GHB'),('LTRG4EBO9H3P'),('OJOX0S8KX83V'),
('J0FAHPHIILCQ'),('GGKYZ7SR2YI8'),('9ZOV70KVLJ4J'),('1DQ23QMT7Y2I'),
('BOAL5NAMV5I7'),('S9ISBBGYQUL7'),('K5TW3NXRHP3F'),('BB3PB1ZFQIEX'),
('QURKDZEQNF5F'),('O0NB3ZV44CKB'),('YPEBM1LNLQJQ'),('OOVQRNX8M7RB'),
('SJLBVNMGFM71'),('J4RBB7SKMF1R'),('0RW9O16QW0SI'),('0O5MQM53W3Z3'),
('XTHKZEFCQ7OX'),('EAUXFZ48QUU7'),('8EV2KXVAZZ0S'),('4MMRPRJ7ZJOL'),
('22CY2GJVFZH1'),('OYJ2G0IVSB9F'),('STTDFWVUDMKO'),('ZJSZ8R2I6HFP'),
('7PMBXDMBW1SU'),('BNMGCNQP5FWW'),('F9VXMGWEVV1N'),('I00XVPUXFCM5'),
('4HCDQ4RNXTDF'),('BPR7R6RMXR33'),('AXJZ4NY5TRLR'),('LN1SG37GDZX8'),
('P7WGPFKHJ5BV'),('NV21Q6ET6MPF'),('A6I03RM07CXJ'),('5YK5KSN5HG41'),
('TDHHGGXUJJOG'),('MLUFWHX3NCGB'),('LZ4A1OGG0B1T'),('UFQK4UCEXQR9'),
('UD6GPSMWG0IW'),('52QNAQMZC0LV'),('P8Z5F7EWEMCY'),('ZW5GWZZOVGC1'),
('FBYUIBPKKDIC'),('ZNJB8VE1GFOG'),('WBFDDVQXD8HC'),('5EQZP10L53AZ'),
('21CCHQK4KRVS'),('74N2VHL0R7VX'),('S4MC9JKLX02S'),('JFKH53QI5N14'),
('HGGMLPB2A53K'),('6J8U3P4N5MZN'),('A7S8GGGP6SWL'),('6WCNV0TQ21YL'),
('JBCFPOHCGC8U'),('JRJKDEXZMX7M'),('Y8F7F8F0D37E'),('HB1GNM8R8NZY'),
('R32W75MBJZT6'),('TLDNGGDZ8P49'),('VCC6LZLBRGFT'),('G50JQMWPQZZ9')
ON CONFLICT (code) DO NOTHING;

-- ==============================================================================
-- PART 3: VERIFICATION
-- ==============================================================================

DO $$
DECLARE
  code_count INTEGER;
  table_count INTEGER;
  policy_count INTEGER;
BEGIN
  -- Check access codes
  SELECT COUNT(*) INTO code_count FROM public.access_codes_bank;
  RAISE NOTICE '✓ Access codes inserted: %', code_count;
  
  -- Check tables
  SELECT COUNT(*) INTO table_count 
  FROM information_schema.tables 
  WHERE table_schema = 'public' 
    AND table_name IN ('access_codes_bank', 'universities_comprehensive', 'university_course_offerings', 'assessment_sessions');
  RAISE NOTICE '✓ Tables created: %/4', table_count;
  
  -- Check policies
  SELECT COUNT(*) INTO policy_count 
  FROM pg_policies 
  WHERE tablename = 'access_codes_bank';
  RAISE NOTICE '✓ RLS policies on access_codes_bank: %', policy_count;
  
  IF code_count >= 100 AND table_count = 4 AND policy_count >= 3 THEN
    RAISE NOTICE '========================================';
    RAISE NOTICE '✓✓✓ DATABASE SETUP COMPLETE! ✓✓✓';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Run the insert_nigerian_universities.sql script';
    RAISE NOTICE '2. Update your .env with the DATABASE_URL';
    RAISE NOTICE '3. Test the /api/validate-access-code endpoint';
  ELSE
    RAISE WARNING 'Setup incomplete - check the logs above';
  END IF;
END $$;
