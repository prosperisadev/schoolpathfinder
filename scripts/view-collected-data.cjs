const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");
const { eq, desc, count, sql } = require("drizzle-orm");
require("dotenv").config();

// Simple schema definitions
const pgTable = require("drizzle-orm/pg-core").pgTable;
const uuid = require("drizzle-orm/pg-core").uuid;
const text = require("drizzle-orm/pg-core").text;
const boolean = require("drizzle-orm/pg-core").boolean;
const timestamp = require("drizzle-orm/pg-core").timestamp;
const integer = require("drizzle-orm/pg-core").integer;
const jsonb = require("drizzle-orm/pg-core").jsonb;

// Define tables
const assessmentResults = pgTable("assessment_results", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  fullName: text("full_name"),
  academicTrack: text("academic_track"),
  waecEstimate: text("waec_estimate"),
  jambEstimate: text("jamb_estimate"),
  learningStyle: text("learning_style"),
  interests: jsonb("interests"),
  personality: jsonb("personality"),
  preferences: jsonb("preferences"),
  recommendations: jsonb("recommendations"),
  topCourse: text("top_course"),
  topCourseScore: integer("top_course_score"),
  sessionId: text("session_id"),
  completedAt: timestamp("completed_at"),
  accessCode: text("access_code"),
  hasUnlocked: boolean("has_unlocked"),
  createdAt: timestamp("created_at"),
});

const assessmentSessions = pgTable("assessment_sessions", {
  id: uuid("id").primaryKey(),
  email: text("email"),
  fullName: text("full_name"),
  assessmentData: jsonb("assessment_data"),
  paymentStatus: text("payment_status"),
  shareToken: text("share_token"),
  isShared: boolean("is_shared"),
  shareCreatedAt: timestamp("share_created_at"),
  recommendations: jsonb("recommendations"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

const accessCodesBank = pgTable("access_codes_bank", {
  id: uuid("id").primaryKey(),
  code: text("code"),
  isUsed: boolean("is_used"),
  usedByEmail: text("used_by_email"),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at"),
});

async function viewCollectedData() {
  console.log("📊 Fetching Collected Data from School Pathfinder Database...\n");

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL not found in environment variables");
    process.exit(1);
  }

  const sql_conn = neon(DATABASE_URL);
  const db = drizzle(sql_conn);

  try {
    // 1. Total counts
    console.log("=" .repeat(80));
    console.log("📈 OVERVIEW STATISTICS");
    console.log("=".repeat(80));

    const [resultsCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(assessmentResults);

    const [sessionsCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(assessmentSessions);

    const [codesUsedCount] = await db
      .select({ count: sql`count(*)::int` })
      .from(accessCodesBank)
      .where(eq(accessCodesBank.isUsed, true));

    const [codesTotal] = await db
      .select({ count: sql`count(*)::int` })
      .from(accessCodesBank);

    console.log(`\n✅ Total Assessment Results: ${resultsCount.count}`);
    console.log(`✅ Total Assessment Sessions: ${sessionsCount.count}`);
    console.log(`✅ Access Codes Used: ${codesUsedCount.count} / ${codesTotal.count}`);

    // 2. Recent Assessment Results (last 20)
    console.log("\n" + "=".repeat(80));
    console.log("🎓 RECENT ASSESSMENT RESULTS (Last 20)");
    console.log("=".repeat(80));

    const recentResults = await db
      .select({
        email: assessmentResults.email,
        fullName: assessmentResults.fullName,
        academicTrack: assessmentResults.academicTrack,
        topCourse: assessmentResults.topCourse,
        topCourseScore: assessmentResults.topCourseScore,
        hasUnlocked: assessmentResults.hasUnlocked,
        completedAt: assessmentResults.completedAt,
        accessCode: assessmentResults.accessCode,
      })
      .from(assessmentResults)
      .orderBy(desc(assessmentResults.completedAt))
      .limit(20);

    if (recentResults.length === 0) {
      console.log("\n⚠️  No assessment results found yet.");
    } else {
      recentResults.forEach((result, idx) => {
        console.log(`\n${idx + 1}. ${result.fullName || "Anonymous"} (${result.email})`);
        console.log(`   Track: ${result.academicTrack || "N/A"}`);
        console.log(`   Top Course: ${result.topCourse || "N/A"} (Score: ${result.topCourseScore || "N/A"})`);
        console.log(`   Unlocked: ${result.hasUnlocked ? "✅ Yes" : "❌ No"}`);
        console.log(`   Code: ${result.accessCode || "N/A"}`);
        console.log(`   Date: ${result.completedAt ? new Date(result.completedAt).toLocaleString() : "N/A"}`);
      });
    }

    // 3. Popular Academic Tracks
    console.log("\n" + "=".repeat(80));
    console.log("📚 ACADEMIC TRACK DISTRIBUTION");
    console.log("=".repeat(80));

    const trackStats = await db
      .select({
        track: assessmentResults.academicTrack,
        count: sql`count(*)::int`,
      })
      .from(assessmentResults)
      .groupBy(assessmentResults.academicTrack)
      .orderBy(desc(sql`count(*)`));

    if (trackStats.length === 0) {
      console.log("\n⚠️  No track data available yet.");
    } else {
      trackStats.forEach((stat, idx) => {
        const track = stat.track || "Unknown";
        console.log(`${idx + 1}. ${track}: ${stat.count} students`);
      });
    }

    // 4. Popular Courses
    console.log("\n" + "=".repeat(80));
    console.log("🎯 TOP COURSES RECOMMENDED");
    console.log("=".repeat(80));

    const courseStats = await db
      .select({
        course: assessmentResults.topCourse,
        count: sql`count(*)::int`,
        avgScore: sql`avg(${assessmentResults.topCourseScore})::int`,
      })
      .from(assessmentResults)
      .groupBy(assessmentResults.topCourse)
      .orderBy(desc(sql`count(*)`))
      .limit(15);

    if (courseStats.length === 0) {
      console.log("\n⚠️  No course data available yet.");
    } else {
      courseStats.forEach((stat, idx) => {
        const course = stat.course || "Unknown";
        console.log(`${idx + 1}. ${course}: ${stat.count} times (Avg Score: ${stat.avgScore || "N/A"})`);
      });
    }

    // 5. Share Statistics
    console.log("\n" + "=".repeat(80));
    console.log("🔗 SHARE STATISTICS");
    console.log("=".repeat(80));

    const [shareStats] = await db
      .select({
        totalShared: sql`count(*) filter (where ${assessmentSessions.isShared} = true)::int`,
        totalSessions: sql`count(*)::int`,
      })
      .from(assessmentSessions);

    console.log(`\n📊 Sessions with Sharing Enabled: ${shareStats.totalShared} / ${shareStats.totalSessions}`);
    const shareRate = shareStats.totalSessions > 0 
      ? ((shareStats.totalShared / shareStats.totalSessions) * 100).toFixed(1) 
      : "0";
    console.log(`📈 Share Rate: ${shareRate}%`);

    // 6. Recent Access Code Usage
    console.log("\n" + "=".repeat(80));
    console.log("🔑 RECENT ACCESS CODE USAGE (Last 10)");
    console.log("=".repeat(80));

    const recentCodes = await db
      .select({
        code: accessCodesBank.code,
        usedByEmail: accessCodesBank.usedByEmail,
        usedAt: accessCodesBank.usedAt,
      })
      .from(accessCodesBank)
      .where(eq(accessCodesBank.isUsed, true))
      .orderBy(desc(accessCodesBank.usedAt))
      .limit(10);

    if (recentCodes.length === 0) {
      console.log("\n⚠️  No access codes used yet.");
    } else {
      recentCodes.forEach((code, idx) => {
        console.log(`\n${idx + 1}. Code: ${code.code}`);
        console.log(`   User: ${code.usedByEmail || "Unknown"}`);
        console.log(`   Used: ${code.usedAt ? new Date(code.usedAt).toLocaleString() : "N/A"}`);
      });
    }

    // 7. Unlock Rate
    console.log("\n" + "=".repeat(80));
    console.log("🔓 UNLOCK STATISTICS");
    console.log("=".repeat(80));

    const [unlockStats] = await db
      .select({
        unlocked: sql`count(*) filter (where ${assessmentResults.hasUnlocked} = true)::int`,
        total: sql`count(*)::int`,
      })
      .from(assessmentResults);

    const unlockRate = unlockStats.total > 0 
      ? ((unlockStats.unlocked / unlockStats.total) * 100).toFixed(1) 
      : "0";
    console.log(`\n📊 Results Unlocked: ${unlockStats.unlocked} / ${unlockStats.total}`);
    console.log(`📈 Unlock Rate: ${unlockRate}%`);

    console.log("\n" + "=".repeat(80));
    console.log("✅ Data Collection Complete!");
    console.log("=".repeat(80) + "\n");

  } catch (error) {
    console.error("\n❌ Error fetching data:", error.message);
    console.error(error);
    process.exit(1);
  }
}

viewCollectedData();
