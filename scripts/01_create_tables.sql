-- PathFinder Database Setup Script
-- Run this in Supabase SQL Editor to create all tables

-- 1. Access Codes Bank Table
CREATE TABLE IF NOT EXISTS "access_codes_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"used_by_email" text,
	"used_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "access_codes_bank_code_unique" UNIQUE("code")
);

-- 2. Assessment Sessions Table
CREATE TABLE IF NOT EXISTS "assessment_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"assessment_data" jsonb,
	"payment_status" text DEFAULT 'pending' NOT NULL,
	"transaction_reference" text,
	"paid_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"access_code" text,
	"share_token" text,
	"academic_track" text,
	"department" text,
	"waec_estimate" text,
	"jamb_estimate" text,
	"learning_style" text,
	"is_shared" boolean DEFAULT false NOT NULL,
	"share_created_at" timestamp with time zone,
	"recommendations" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assessment_sessions_share_token_unique" UNIQUE("share_token")
);

-- 3. Universities Comprehensive Table
CREATE TABLE IF NOT EXISTS "universities_comprehensive" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"country" text NOT NULL,
	"region" text NOT NULL,
	"global_rank" integer,
	"regional_rank" integer,
	"country_rank" integer,
	"ranking_score" numeric(5, 2) DEFAULT '50' NOT NULL,
	"description" text,
	"website" text,
	"established_year" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);

-- 4. University Course Offerings Table
CREATE TABLE IF NOT EXISTS "university_course_offerings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"university_id" uuid NOT NULL,
	"course_id" text NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"course_ranking_score" numeric(5, 2) DEFAULT '50' NOT NULL,
	"program_strength" text,
	"year_established" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "university_course_offerings_university_id_universities_comprehensive_id_fk" 
	  FOREIGN KEY ("university_id") REFERENCES "universities_comprehensive"("id") ON DELETE cascade
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS "idx_access_codes_bank_code" ON "access_codes_bank" ("code");
CREATE INDEX IF NOT EXISTS "idx_access_codes_bank_is_used" ON "access_codes_bank" ("is_used");
CREATE INDEX IF NOT EXISTS "idx_assessment_sessions_email" ON "assessment_sessions" ("email");
CREATE INDEX IF NOT EXISTS "idx_assessment_sessions_share_token" ON "assessment_sessions" ("share_token");
CREATE INDEX IF NOT EXISTS "idx_assessment_sessions_department" ON "assessment_sessions" ("department");
CREATE INDEX IF NOT EXISTS "idx_universities_name" ON "universities_comprehensive" ("name");
CREATE INDEX IF NOT EXISTS "idx_universities_country" ON "universities_comprehensive" ("country");
CREATE INDEX IF NOT EXISTS "idx_universities_ranking_score" ON "universities_comprehensive" ("ranking_score");
CREATE UNIQUE INDEX IF NOT EXISTS "idx_uni_course_unique" ON "university_course_offerings" ("university_id", "course_id");
CREATE INDEX IF NOT EXISTS "idx_uni_course_offerings_university" ON "university_course_offerings" ("university_id");
CREATE INDEX IF NOT EXISTS "idx_uni_course_offerings_course" ON "university_course_offerings" ("course_id");
CREATE INDEX IF NOT EXISTS "idx_uni_course_offerings_available" ON "university_course_offerings" ("is_available");

-- Enable RLS (Row Level Security) - Optional but recommended
ALTER TABLE "access_codes_bank" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "assessment_sessions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "universities_comprehensive" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "university_course_offerings" ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for public access
DROP POLICY IF EXISTS "Allow public read" ON "access_codes_bank";
CREATE POLICY "Allow public read" ON "access_codes_bank" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public update" ON "access_codes_bank";
CREATE POLICY "Allow public update" ON "access_codes_bank" FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow all" ON "assessment_sessions";
CREATE POLICY "Allow all" ON "assessment_sessions" FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read" ON "universities_comprehensive";
CREATE POLICY "Allow public read" ON "universities_comprehensive" FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read" ON "university_course_offerings";
CREATE POLICY "Allow public read" ON "university_course_offerings" FOR SELECT USING (true);
