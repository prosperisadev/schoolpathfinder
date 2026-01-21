const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");
const { desc, sql } = require("drizzle-orm");
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

async function viewSessionsDetail() {
  console.log("📊 Fetching Detailed Session Data...\n");

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL not found");
    process.exit(1);
  }

  const sql_conn = neon(DATABASE_URL);
  const db = drizzle(sql_conn);

  try {
    const sessions = await db
      .select()
      .from(assessmentSessions)
      .orderBy(desc(assessmentSessions.createdAt))
      .limit(10);

    console.log("=" .repeat(100));
    console.log("📝 DETAILED ASSESSMENT SESSIONS (Last 10)");
    console.log("=".repeat(100));

    sessions.forEach((session, idx) => {
      console.log(`\n${idx + 1}. SESSION ID: ${session.id}`);
      console.log(`   Email: ${session.email}`);
      console.log(`   Full Name: ${session.fullName || "N/A"}`);
      console.log(`   Payment Status: ${session.paymentStatus}`);
      console.log(`   Share Token: ${session.shareToken || "N/A"}`);
      console.log(`   Is Shared: ${session.isShared ? "✅ Yes" : "❌ No"}`);
      console.log(`   Created: ${session.createdAt ? new Date(session.createdAt).toLocaleString() : "N/A"}`);
      console.log(`   Updated: ${session.updatedAt ? new Date(session.updatedAt).toLocaleString() : "N/A"}`);
      
      if (session.assessmentData) {
        const data = session.assessmentData;
        console.log(`   Assessment Data:`);
        if (data.profile) {
          console.log(`      - Academic Track: ${data.profile.academicTrack || "N/A"}`);
          console.log(`      - WAEC Estimate: ${data.profile.waecEstimate || "N/A"}`);
          console.log(`      - JAMB Estimate: ${data.profile.jambEstimate || "N/A"}`);
          console.log(`      - Learning Style: ${data.profile.learningStyle || "N/A"}`);
        }
      }
      
      if (session.recommendations && Array.isArray(session.recommendations)) {
        console.log(`   Recommendations: ${session.recommendations.length} courses`);
        if (session.recommendations.length > 0) {
          const top = session.recommendations[0];
          console.log(`      Top Course: ${top.course?.name || "N/A"} (Score: ${top.fitScore || "N/A"})`);
        }
      }
      
      console.log(`   ---`);
    });

    console.log("\n" + "=".repeat(100));
    console.log("✅ Session Detail Complete!");
    console.log("=".repeat(100) + "\n");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

viewSessionsDetail();
