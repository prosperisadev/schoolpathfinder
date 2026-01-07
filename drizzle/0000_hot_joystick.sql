CREATE TABLE "access_codes_bank" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" text NOT NULL,
	"is_used" boolean DEFAULT false NOT NULL,
	"used_by_email" text,
	"used_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "access_codes_bank_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "assessment_sessions" (
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
--> statement-breakpoint
CREATE TABLE "universities_comprehensive" (
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
--> statement-breakpoint
CREATE TABLE "university_course_offerings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"university_id" uuid NOT NULL,
	"course_id" text NOT NULL,
	"is_available" boolean DEFAULT true NOT NULL,
	"course_ranking_score" numeric(5, 2) DEFAULT '50' NOT NULL,
	"program_strength" text,
	"year_established" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "university_course_offerings" ADD CONSTRAINT "university_course_offerings_university_id_universities_comprehensive_id_fk" FOREIGN KEY ("university_id") REFERENCES "public"."universities_comprehensive"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_access_codes_bank_code" ON "access_codes_bank" USING btree ("code");--> statement-breakpoint
CREATE INDEX "idx_access_codes_bank_is_used" ON "access_codes_bank" USING btree ("is_used");--> statement-breakpoint
CREATE INDEX "idx_assessment_sessions_email" ON "assessment_sessions" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_assessment_sessions_share_token" ON "assessment_sessions" USING btree ("share_token");--> statement-breakpoint
CREATE INDEX "idx_assessment_sessions_department" ON "assessment_sessions" USING btree ("department");--> statement-breakpoint
CREATE INDEX "idx_universities_name" ON "universities_comprehensive" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_universities_country" ON "universities_comprehensive" USING btree ("country");--> statement-breakpoint
CREATE INDEX "idx_universities_ranking_score" ON "universities_comprehensive" USING btree ("ranking_score");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_uni_course_unique" ON "university_course_offerings" USING btree ("university_id","course_id");--> statement-breakpoint
CREATE INDEX "idx_uni_course_offerings_university" ON "university_course_offerings" USING btree ("university_id");--> statement-breakpoint
CREATE INDEX "idx_uni_course_offerings_course" ON "university_course_offerings" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "idx_uni_course_offerings_available" ON "university_course_offerings" USING btree ("is_available");