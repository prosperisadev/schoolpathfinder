const { neon } = require("@neondatabase/serverless");
require("dotenv").config();

async function checkSchema() {
  const sql = neon(process.env.DATABASE_URL);
  
  console.log("Checking assessment_sessions table schema...\n");
  
  const columns = await sql`
    SELECT column_name, data_type, is_nullable
    FROM information_schema.columns
    WHERE table_name = 'assessment_sessions'
    ORDER BY ordinal_position;
  `;
  
  console.log("Columns in assessment_sessions:");
  columns.forEach(col => {
    console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
  });
}

checkSchema();
