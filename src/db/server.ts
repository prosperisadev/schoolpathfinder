import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Server-side database connection for Node.js scripts
// This is used for migrations, seeding, and server-side operations

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const client = postgres(connectionString, {
  prepare: false,
  ssl: { rejectUnauthorized: false }, // Required for Supabase
});

export const db = drizzle(client, { schema });
export { schema };
export { client };

// Helper to close connection
export async function closeConnection() {
  await client.end();
}
