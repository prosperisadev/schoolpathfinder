import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  decimal,
  jsonb,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Access Codes Bank - stores 100 one-time use codes
export const accessCodesBank = pgTable(
  "access_codes_bank",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: text("code").notNull().unique(),
    isUsed: boolean("is_used").notNull().default(false),
    usedByEmail: text("used_by_email"),
    usedAt: timestamp("used_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_access_codes_bank_code").on(table.code),
    index("idx_access_codes_bank_is_used").on(table.isUsed),
  ]
);

// Assessment Sessions - stores user assessment data
export const assessmentSessions = pgTable(
  "assessment_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    fullName: text("full_name"),
    assessmentData: jsonb("assessment_data"),
    paymentStatus: text("payment_status").notNull().default("pending"),
    transactionReference: text("transaction_reference"),
    paidAt: timestamp("paid_at", { withTimezone: true }),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    accessCode: text("access_code"),
    shareToken: text("share_token").unique(),
    academicTrack: text("academic_track"),
    department: text("department"),
    waecEstimate: text("waec_estimate"),
    jambEstimate: text("jamb_estimate"),
    learningStyle: text("learning_style"),
    isShared: boolean("is_shared").notNull().default(false),
    shareCreatedAt: timestamp("share_created_at", { withTimezone: true }),
    recommendations: jsonb("recommendations"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_assessment_sessions_email").on(table.email),
    index("idx_assessment_sessions_share_token").on(table.shareToken),
    index("idx_assessment_sessions_department").on(table.department),
  ]
);

// Universities Comprehensive - stores university data with rankings
export const universitiesComprehensive = pgTable(
  "universities_comprehensive",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    country: text("country").notNull(),
    region: text("region").notNull(),
    globalRank: integer("global_rank"),
    regionalRank: integer("regional_rank"),
    countryRank: integer("country_rank"),
    rankingScore: decimal("ranking_score", { precision: 5, scale: 2 }).notNull().default("50"),
    description: text("description"),
    website: text("website"),
    establishedYear: integer("established_year"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("idx_universities_name").on(table.name),
    index("idx_universities_country").on(table.country),
    index("idx_universities_ranking_score").on(table.rankingScore),
  ]
);

// University Course Offerings - links universities to courses they offer
export const universityCourseOfferings = pgTable(
  "university_course_offerings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    universityId: uuid("university_id")
      .notNull()
      .references(() => universitiesComprehensive.id, { onDelete: "cascade" }),
    courseId: text("course_id").notNull(),
    isAvailable: boolean("is_available").notNull().default(true),
    courseRankingScore: decimal("course_ranking_score", { precision: 5, scale: 2 })
      .notNull()
      .default("50"),
    programStrength: text("program_strength"),
    yearEstablished: integer("year_established"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("idx_uni_course_unique").on(table.universityId, table.courseId),
    index("idx_uni_course_offerings_university").on(table.universityId),
    index("idx_uni_course_offerings_course").on(table.courseId),
    index("idx_uni_course_offerings_available").on(table.isAvailable),
  ]
);

// Relations
export const universitiesComprehensiveRelations = relations(
  universitiesComprehensive,
  ({ many }) => ({
    courseOfferings: many(universityCourseOfferings),
  })
);

export const universityCourseOfferingsRelations = relations(
  universityCourseOfferings,
  ({ one }) => ({
    university: one(universitiesComprehensive, {
      fields: [universityCourseOfferings.universityId],
      references: [universitiesComprehensive.id],
    }),
  })
);

// Type exports
export type AccessCodeBank = typeof accessCodesBank.$inferSelect;
export type NewAccessCodeBank = typeof accessCodesBank.$inferInsert;
export type AssessmentSession = typeof assessmentSessions.$inferSelect;
export type NewAssessmentSession = typeof assessmentSessions.$inferInsert;
export type UniversityComprehensive = typeof universitiesComprehensive.$inferSelect;
export type NewUniversityComprehensive = typeof universitiesComprehensive.$inferInsert;
export type UniversityCourseOffering = typeof universityCourseOfferings.$inferSelect;
export type NewUniversityCourseOffering = typeof universityCourseOfferings.$inferInsert;
