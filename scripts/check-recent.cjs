const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkRecent() {
  const sql = neon(process.env.DATABASE_URL);
  
  const recent = await sql`
    SELECT email, full_name, created_at, updated_at, share_token, is_shared
    FROM assessment_sessions
    ORDER BY updated_at DESC
    LIMIT 5
  `;
  
  console.log("\nMost recent sessions (by update time):\n");
  recent.forEach((s, i) => {
    console.log(`${i+1}. ${s.full_name || 'N/A'} (${s.email})`);
    console.log(`   Created: ${new Date(s.created_at).toLocaleString()}`);
    console.log(`   Updated: ${new Date(s.updated_at).toLocaleString()}`);
    console.log(`   Share Token: ${s.share_token || 'N/A'}`);
    console.log(`   Shared: ${s.is_shared ? 'Yes' : 'No'}`);
    console.log('');
  });
}

checkRecent();
