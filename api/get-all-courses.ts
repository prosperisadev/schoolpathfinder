import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db.js";
import { sql } from "drizzle-orm";
import { universityCourseOfferings } from "../src/db/schema.js";

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
    const db = getDatabase();

    // Get all unique available courses with their ranking info
    const courses = await db
      .select({
        courseId: universityCourseOfferings.courseId,
        avgScore: sql<number>`CAST(AVG(CAST(${universityCourseOfferings.courseRankingScore} as FLOAT)) AS DECIMAL(5,2))`,
        universityCount: sql<number>`COUNT(DISTINCT ${universityCourseOfferings.universityId})`,
        programStrength: sql<string>`STRING_AGG(DISTINCT ${universityCourseOfferings.programStrength}, ', ')`,
      })
      .from(universityCourseOfferings)
      .where(sql`${universityCourseOfferings.isAvailable} = true`)
      .groupBy(universityCourseOfferings.courseId)
      .orderBy(sql`AVG(CAST(${universityCourseOfferings.courseRankingScore} as FLOAT)) DESC`);

    // Categorize courses based on naming patterns
    const categorizedCourses = courses.map((course) => {
      let category = "Other";

      if (
        course.courseId.includes("computer") ||
        course.courseId.includes("software") ||
        course.courseId.includes("data") ||
        course.courseId.includes("ai") ||
        course.courseId.includes("cybersecurity") ||
        course.courseId.includes("web") ||
        course.courseId.includes("technology") ||
        course.courseId.includes("engineering")
      ) {
        category = "Technology";
      } else if (
        course.courseId.includes("medicine") ||
        course.courseId.includes("pharmacy") ||
        course.courseId.includes("nursing") ||
        course.courseId.includes("health") ||
        course.courseId.includes("psychology")
      ) {
        category = "Health";
      } else if (
        course.courseId.includes("business") ||
        course.courseId.includes("accounting") ||
        course.courseId.includes("finance") ||
        course.courseId.includes("economics") ||
        course.courseId.includes("marketing")
      ) {
        category = "Finance & Business";
      } else if (
        course.courseId.includes("law") ||
        course.courseId.includes("political") ||
        course.courseId.includes("administration") ||
        course.courseId.includes("governance")
      ) {
        category = "Governance & Policy";
      } else if (
        course.courseId.includes("design") ||
        course.courseId.includes("media") ||
        course.courseId.includes("graphic") ||
        course.courseId.includes("creative") ||
        course.courseId.includes("art")
      ) {
        category = "Media & Creative";
      } else if (
        course.courseId.includes("agriculture") ||
        course.courseId.includes("environment") ||
        course.courseId.includes("sustainability")
      ) {
        category = "Environmental & Agriculture";
      }

      return {
        courseId: course.courseId,
        category,
        averageScore: course.avgScore,
        offeredByUniversities: course.universityCount,
        programStrengths: course.programStrength,
      };
    });

    // Group by category
    const groupedByCategory: Record<string, typeof categorizedCourses> = {};
    categorizedCourses.forEach((course) => {
      if (!groupedByCategory[course.category]) {
        groupedByCategory[course.category] = [];
      }
      groupedByCategory[course.category].push(course);
    });

    return res.json({
      totalCourses: courses.length,
      coursesByCategory: groupedByCategory,
      allCourses: categorizedCourses,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Server error", details: String(error) });
  }
}
