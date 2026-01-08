import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./_schema.js";

// Create database connection for Vercel serverless
export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("DATABASE_URL is not set");
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    const sql = neon(connectionString);
    return drizzle(sql, { schema });
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
