import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sql } from "drizzle-orm";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { getDatabase } = await import("./_db.js");
    const { assessmentSessions } = await import("./_schema.js");
    
    const db = getDatabase();
    
    // Count total assessment sessions
    const totalCount = await db.select({
      total: sql<number>`count(*)`,
      withRecommendations: sql<number>`count(*) filter (where recommendations is not null)`,
      withEmail: sql<number>`count(*) filter (where email is not null and email != '')`,
    }).from(assessmentSessions);
    
    // Get recent assessments
    const recentAssessments = await db.select({
      createdAt: assessmentSessions.createdAt,
      email: assessmentSessions.email,
      fullName: assessmentSessions.fullName,
      hasRecommendations: sql<boolean>`recommendations is not null`,
    })
    .from(assessmentSessions)
    .orderBy(sql`created_at desc`)
    .limit(10);

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      counts: totalCount[0],
      recentAssessments,
      message: "Assessment data from PostgreSQL"
    });
  } catch (error) {
    console.error('[count-assessments] Error:', error);
    res.status(500).json({
      status: "error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}
