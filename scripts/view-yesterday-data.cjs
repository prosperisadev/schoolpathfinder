const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");
const { desc, sql, gte, lte, and } = require("drizzle-orm");
require("dotenv").config();

const pgTable = require("drizzle-orm/pg-core").pgTable;
const uuid = require("drizzle-orm/pg-core").uuid;
const text = require("drizzle-orm/pg-core").text;
const boolean = require("drizzle-orm/pg-core").boolean;
const timestamp = require("drizzle-orm/pg-core").timestamp;
const jsonb = require("drizzle-orm/pg-core").jsonb;

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

async function viewYesterdayData() {
  console.log("📊 Fetching Yesterday's Assessment Data (January 20, 2026)...\n");

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL not found");
    process.exit(1);
  }

  const sql_conn = neon(DATABASE_URL);
  const db = drizzle(sql_conn);

  try {
    // Get yesterday's data (Jan 20, 2026)
    const startOfYesterday = new Date("2026-01-20T00:00:00Z");
    const endOfYesterday = new Date("2026-01-20T23:59:59Z");

    console.log(`Searching for assessments between:`);
    console.log(`Start: ${startOfYesterday.toISOString()}`);
    console.log(`End: ${endOfYesterday.toISOString()}\n`);

    const yesterdayCount = await db
      .select({ count: sql`count(*)::int` })
      .from(assessmentSessions)
      .where(
        and(
          gte(assessmentSessions.createdAt, startOfYesterday),
          lte(assessmentSessions.createdAt, endOfYesterday)
        )
      );

    console.log("=" .repeat(100));
    console.log(`📈 TOTAL ASSESSMENTS ON JANUARY 20, 2026: ${yesterdayCount[0]?.count || 0}`);
    console.log("=".repeat(100));

    const yesterdaySessions = await db
      .select()
      .from(assessmentSessions)
      .where(
        and(
          gte(assessmentSessions.createdAt, startOfYesterday),
          lte(assessmentSessions.createdAt, endOfYesterday)
        )
      )
      .orderBy(desc(assessmentSessions.createdAt));

    if (yesterdaySessions.length === 0) {
      console.log("\n⚠️  No assessments found for January 20, 2026.");
      console.log("\nLet me check the most recent assessments instead...\n");
      
      // Get most recent 50 assessments
      const recentSessions = await db
        .select()
        .from(assessmentSessions)
        .orderBy(desc(assessmentSessions.createdAt))
        .limit(50);

      console.log("=" .repeat(100));
      console.log(`📊 MOST RECENT ${recentSessions.length} ASSESSMENTS`);
      console.log("=".repeat(100));

      const trackDistribution = {};
      const courseDistribution = {};
      
      recentSessions.forEach((session, idx) => {
        console.log(`\n${idx + 1}. ${session.fullName || "Anonymous"} (${session.email})`);
        console.log(`   Created: ${session.createdAt ? new Date(session.createdAt).toLocaleString() : "N/A"}`);
        console.log(`   Share Token: ${session.shareToken || "N/A"}`);
        console.log(`   Shared: ${session.isShared ? "✅" : "❌"}`);
        
        if (session.assessmentData?.profile) {
          const profile = session.assessmentData.profile;
          const track = profile.academicTrack || "Unknown";
          trackDistribution[track] = (trackDistribution[track] || 0) + 1;
          
          console.log(`   Track: ${track}`);
          console.log(`   WAEC: ${profile.waecEstimate || "N/A"}`);
          console.log(`   JAMB: ${profile.jambEstimate || "N/A"}`);
          console.log(`   Learning Style: ${profile.learningStyle || "N/A"}`);
        }
        
        if (session.recommendations && Array.isArray(session.recommendations) && session.recommendations.length > 0) {
          const topCourse = session.recommendations[0];
          const courseName = topCourse.course?.name || "Unknown";
          courseDistribution[courseName] = (courseDistribution[courseName] || 0) + 1;
          
          console.log(`   Top Course: ${courseName} (Score: ${topCourse.fitScore || "N/A"})`);
          console.log(`   Total Recommendations: ${session.recommendations.length}`);
        }
      });

      // Analytics
      console.log("\n" + "=".repeat(100));
      console.log("📊 ANALYTICS - ACADEMIC TRACK DISTRIBUTION");
      console.log("=".repeat(100));
      Object.entries(trackDistribution)
        .sort((a, b) => b[1] - a[1])
        .forEach(([track, count]) => {
          const percentage = ((count / recentSessions.length) * 100).toFixed(1);
          console.log(`${track}: ${count} (${percentage}%)`);
        });

      console.log("\n" + "=".repeat(100));
      console.log("📊 TOP 15 RECOMMENDED COURSES");
      console.log("=".repeat(100));
      Object.entries(courseDistribution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 15)
        .forEach(([course, count], idx) => {
          console.log(`${idx + 1}. ${course}: ${count} times`);
        });

    } else {
      // Show yesterday's data
      const trackDistribution = {};
      const courseDistribution = {};
      
      yesterdaySessions.forEach((session, idx) => {
        console.log(`\n${idx + 1}. ${session.fullName || "Anonymous"} (${session.email})`);
        console.log(`   Created: ${session.createdAt ? new Date(session.createdAt).toLocaleString() : "N/A"}`);
        
        if (session.assessmentData?.profile) {
          const profile = session.assessmentData.profile;
          const track = profile.academicTrack || "Unknown";
          trackDistribution[track] = (trackDistribution[track] || 0) + 1;
          
          console.log(`   Track: ${track}`);
          console.log(`   WAEC: ${profile.waecEstimate || "N/A"}`);
          console.log(`   JAMB: ${profile.jambEstimate || "N/A"}`);
        }
        
        if (session.recommendations && Array.isArray(session.recommendations) && session.recommendations.length > 0) {
          const topCourse = session.recommendations[0];
          const courseName = topCourse.course?.name || "Unknown";
          courseDistribution[courseName] = (courseDistribution[courseName] || 0) + 1;
          
          console.log(`   Top Course: ${courseName} (Score: ${topCourse.fitScore || "N/A"})`);
        }
      });

      console.log("\n" + "=".repeat(100));
      console.log("📊 JANUARY 20 ANALYTICS");
      console.log("=".repeat(100));
      
      console.log("\nAcademic Track Distribution:");
      Object.entries(trackDistribution)
        .sort((a, b) => b[1] - a[1])
        .forEach(([track, count]) => {
          console.log(`  ${track}: ${count}`);
        });

      console.log("\nTop Courses:");
      Object.entries(courseDistribution)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .forEach(([course, count]) => {
          console.log(`  ${course}: ${count}`);
        });
    }

    console.log("\n" + "=".repeat(100));
    console.log("✅ Query Complete!");
    console.log("=".repeat(100) + "\n");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

viewYesterdayData();
