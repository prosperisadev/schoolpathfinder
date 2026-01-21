import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db.js";
import { accessCodesBank } from "../src/db/schema.js";
import { sql } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const hasDbUrl = !!process.env.DATABASE_URL;
  
  // Test database connection
  let dbConnected = false;
  let codeCount = 0;
  let dbError = null;
  
  if (hasDbUrl) {
    try {
      const db = getDatabase();
      const result = await db.select({ count: sql<number>`count(*)` }).from(accessCodesBank);
      codeCount = Number(result[0]?.count || 0);
      dbConnected = true;
    } catch (error) {
      dbError = error instanceof Error ? error.message : "Unknown error";
    }
  }
  
  res.json({ 
    status: dbConnected ? "ok" : "error",
    timestamp: new Date().toISOString(),
    message: "PathFinder API is running on Vercel",
    database: {
      urlConfigured: hasDbUrl,
      connected: dbConnected,
      accessCodesCount: codeCount,
      error: dbError
    }
  });
}
