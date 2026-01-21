const { drizzle } = require("drizzle-orm/neon-http");
const { neon } = require("@neondatabase/serverless");
const { sql } = require("drizzle-orm");
require("dotenv").config();

async function queryAllTables() {
  console.log("🔍 Querying Neon Database for ALL tables and data...\n");

  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("❌ DATABASE_URL not found");
    process.exit(1);
  }

  const sql_conn = neon(DATABASE_URL);
  const db = drizzle(sql_conn);

  try {
    // First, let's see what tables exist
    console.log("=" .repeat(100));
    console.log("📋 LISTING ALL TABLES IN DATABASE");
    console.log("=".repeat(100));
    
    const tables = await sql_conn`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    console.log("\nTables found:");
    tables.forEach((table, idx) => {
      console.log(`${idx + 1}. ${table.table_name}`);
    });

    // Now let's count rows in each table
    console.log("\n" + "=".repeat(100));
    console.log("📊 ROW COUNTS FOR EACH TABLE");
    console.log("=".repeat(100));
    
    for (const table of tables) {
      const tableName = table.table_name;
      try {
        const count = await sql_conn`SELECT COUNT(*) as count FROM ${sql.raw(tableName)}`;
        console.log(`${tableName}: ${count[0].count} rows`);
      } catch (e) {
        console.log(`${tableName}: Error counting - ${e.message}`);
      }
    }

    // Get data from January 20, 2026 from assessment_sessions
    console.log("\n" + "=".repeat(100));
    console.log("📅 DATA FROM JANUARY 20, 2026 (assessment_sessions)");
    console.log("=".repeat(100));
    
    const jan20Data = await sql_conn`
      SELECT *
      FROM assessment_sessions
      WHERE created_at >= '2026-01-20 00:00:00'
        AND created_at < '2026-01-21 00:00:00'
      ORDER BY created_at DESC;
    `;
    
    console.log(`\nFound ${jan20Data.length} assessments on January 20, 2026\n`);
    
    jan20Data.forEach((session, idx) => {
      console.log(`${idx + 1}. ${session.full_name || "Anonymous"} (${session.email})`);
      console.log(`   Created: ${new Date(session.created_at).toLocaleString()}`);
      console.log(`   Share Token: ${session.share_token || "N/A"}`);
      console.log(`   Shared: ${session.is_shared ? "✅" : "❌"}`);
      if (session.assessment_data?.profile) {
        console.log(`   Track: ${session.assessment_data.profile.academicTrack || "N/A"}`);
      }
      console.log("");
    });

    // Get most recent 10 from all tables
    console.log("=".repeat(100));
    console.log("🕐 MOST RECENT DATA FROM EACH TABLE");
    console.log("=".repeat(100));
    
    // assessment_sessions
    console.log("\n📝 Latest assessment_sessions (last 10):");
    const recentSessions = await sql_conn`
      SELECT id, email, full_name, created_at, share_token, is_shared
      FROM assessment_sessions
      ORDER BY created_at DESC
      LIMIT 10;
    `;
    recentSessions.forEach((s, i) => {
      console.log(`  ${i+1}. ${s.full_name || "Anonymous"} - ${new Date(s.created_at).toLocaleString()}`);
    });

    // assessment_results if it exists
    try {
      console.log("\n📊 Latest assessment_results (last 10):");
      const recentResults = await sql_conn`
        SELECT id, email, full_name, completed_at, top_course
        FROM assessment_results
        ORDER BY completed_at DESC
        LIMIT 10;
      `;
      recentResults.forEach((r, i) => {
        console.log(`  ${i+1}. ${r.full_name || "Anonymous"} - ${new Date(r.completed_at).toLocaleString()} - ${r.top_course || "N/A"}`);
      });
    } catch (e) {
      console.log(`  No data or table doesn't exist`);
    }

    // access_codes_bank
    console.log("\n🔑 Latest access code usage (last 10):");
    const recentCodes = await sql_conn`
      SELECT code, used_by_email, used_at, is_used
      FROM access_codes_bank
      WHERE is_used = true
      ORDER BY used_at DESC
      LIMIT 10;
    `;
    recentCodes.forEach((c, i) => {
      console.log(`  ${i+1}. ${c.code} - ${c.used_by_email} - ${new Date(c.used_at).toLocaleString()}`);
    });

    console.log("\n" + "=".repeat(100));
    console.log("✅ Database Query Complete!");
    console.log("=".repeat(100) + "\n");

  } catch (error) {
    console.error("\n❌ Error:", error.message);
    console.error(error);
    process.exit(1);
  }
}

queryAllTables();
