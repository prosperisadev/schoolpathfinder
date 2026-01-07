import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "../_db";
import { eq, and, sql } from "drizzle-orm";
import { universitiesComprehensive, universityCourseOfferings } from "../_schema";

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
    const { courseId } = req.query;
    
    if (!courseId || typeof courseId !== "string") {
      return res.status(400).json({ error: "Course ID is required" });
    }

    const location = (req.query.location as string) || "nigeria";
    const db = getDatabase();

    const results = await db
      .select({
        university: universitiesComprehensive,
        offering: universityCourseOfferings,
      })
      .from(universityCourseOfferings)
      .innerJoin(
        universitiesComprehensive,
        eq(universityCourseOfferings.universityId, universitiesComprehensive.id)
      )
      .where(
        and(
          eq(universityCourseOfferings.courseId, courseId),
          eq(universityCourseOfferings.isAvailable, true),
          location === "nigeria"
            ? eq(universitiesComprehensive.country, "Nigeria")
            : sql`true`
        )
      )
      .orderBy(sql`${universityCourseOfferings.courseRankingScore} DESC`)
      .limit(10);

    const universities = results.map((r) => ({
      id: r.university.id,
      name: r.university.name,
      country: r.university.country,
      region: r.university.region,
      globalRank: r.university.globalRank,
      countryRank: r.university.countryRank,
      rankingScore: r.university.rankingScore,
      website: r.university.website,
      courseRankingScore: r.offering.courseRankingScore,
      programStrength: r.offering.programStrength,
    }));

    return res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
