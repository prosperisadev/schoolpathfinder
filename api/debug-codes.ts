import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { getDatabase } = await import("./_db.js");
    const { accessCodesBank } = await import("./_schema.js");
    const { sql } = await import("drizzle-orm");
    
    const db = getDatabase();
    
    // Get stats
    const stats = await db.select({
      total: sql<number>`count(*)`,
      unused: sql<number>`count(*) filter (where is_used = false)`,
      used: sql<number>`count(*) filter (where is_used = true)`
    }).from(accessCodesBank);
    
    // Get sample unused codes
    const sampleCodes = await db.select({
      code: accessCodesBank.code
    })
    .from(accessCodesBank)
    .where(sql`is_used = false`)
    .limit(5);

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        stats: stats[0],
        sampleUnusedCodes: sampleCodes.map(c => c.code)
      },
      message: "Use these codes for testing on the frontend"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
