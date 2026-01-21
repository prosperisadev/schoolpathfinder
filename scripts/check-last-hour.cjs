const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkLastHour() {
  const sql = neon(process.env.DATABASE_URL);
  
  const lastHour = await sql`
    SELECT email, full_name, created_at, updated_at, share_token, is_shared, payment_status
    FROM assessment_sessions
    WHERE created_at >= NOW() - INTERVAL '2 hours'
    ORDER BY created_at DESC
  `;
  
  console.log(`\nSessions from last 2 hours: ${lastHour.length}\n`);
  lastHour.forEach((s, i) => {
    console.log(`${i+1}. ${s.full_name || 'N/A'} (${s.email})`);
    console.log(`   Created: ${new Date(s.created_at).toLocaleString()}`);
    console.log(`   Updated: ${new Date(s.updated_at).toLocaleString()}`);
    console.log(`   Status: ${s.payment_status}`);
    console.log(`   Share Token: ${s.share_token || 'N/A'}`);
    console.log(`   Shared: ${s.is_shared ? 'Yes' : 'No'}`);
    console.log('');
  });
}

checkLastHour();
