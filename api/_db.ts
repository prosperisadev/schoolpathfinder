import { drizzle } from "drizzle-orm/neon-http";
import { neon, NeonQueryFunction } from "@neondatabase/serverless";
import * as schema from "../src/db/schema.js";

/**
 * OPTIMIZED DATABASE CLIENT FOR SERVERLESS
 * 
 * Problem: Creating new connection per request causes connection churn
 * Solution: Cache SQL client in global scope for connection reuse
 * 
 * Benefits:
 * - Reduces connection overhead (critical for free tier limits)
 * - Faster response times (no reconnection delay)
 * - Works with Vercel serverless (globalThis persists across invocations)
 * 
 * Free Tier Safe:
 * - Neon free: 100 concurrent connections
 * - This approach reuses connections efficiently
 */

// Cache SQL client globally for connection reuse
let cachedSql: NeonQueryFunction<false, false> | null = null;

// Create database connection for Vercel serverless
export function getDatabase() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("DATABASE_URL is not set");
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    // Reuse cached connection if available
    if (!cachedSql) {
      cachedSql = neon(connectionString);
    }
    return drizzle(cachedSql, { schema });
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
}
