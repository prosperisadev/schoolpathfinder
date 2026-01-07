import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";

// Singleton pattern for database connection in serverless environment
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDatabase() {
  if (db) return db;
  
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const client = postgres(connectionString, {
    prepare: false,
    ssl: { rejectUnauthorized: false },
    max: 1, // Single connection for serverless
  });
  
  db = drizzle(client, { schema });
  return db;
}
