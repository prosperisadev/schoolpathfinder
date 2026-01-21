const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function getTotalCounts() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log("📊 Getting Total Counts...\n");
  
  const sessionCount = await sql`SELECT COUNT(*) as count FROM assessment_sessions`;
  const jan20Count = await sql`
    SELECT COUNT(*) as count 
    FROM assessment_sessions 
    WHERE created_at >= '2026-01-20 00:00:00' 
      AND created_at < '2026-01-21 00:00:00'
  `;
  const jan21Count = await sql`
    SELECT COUNT(*) as count 
    FROM assessment_sessions 
    WHERE created_at >= '2026-01-21 00:00:00'
  `;
  
  console.log(`Total Assessment Sessions: ${sessionCount[0].count}`);
  console.log(`Sessions on Jan 20, 2026: ${jan20Count[0].count}`);
  console.log(`Sessions on Jan 21, 2026: ${jan21Count[0].count}`);
  
  // Get date range
  const dateRange = await sql`
    SELECT 
      MIN(created_at) as first_session,
      MAX(created_at) as last_session
    FROM assessment_sessions
  `;
  
  console.log(`\nFirst session: ${new Date(dateRange[0].first_session).toLocaleString()}`);
  console.log(`Last session: ${new Date(dateRange[0].last_session).toLocaleString()}`);
}

getTotalCounts();
