import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/db/schema";

// Create a new connection for each request in serverless environment
export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("DATABASE_URL is not set");
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    const client = postgres(connectionString, {
      prepare: false,
      ssl: "require",
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    
    return drizzle(client, { schema });
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
