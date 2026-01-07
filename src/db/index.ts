import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Get the Supabase connection string from environment variables
const connectionString = import.meta.env.VITE_DATABASE_URL;

if (!connectionString) {
  throw new Error("VITE_DATABASE_URL environment variable is not set");
}

// Create the postgres connection
const client = postgres(connectionString, {
  prepare: false, // Disable prepared statements for Supabase
});

// Create the drizzle instance with schema
export const db = drizzle(client, { schema });

// Export schema for use in queries
export { schema };
