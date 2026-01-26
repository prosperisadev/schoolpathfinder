import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql } from "drizzle-orm";
import * as schema from "../src/db/schema";
import { universityCourseOfferings } from "../src/db/schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql_client = neon(connectionString);
const db = drizzle(sql_client, { schema, casing: 'snake_case' });

async function getAllCourses() {
  try {
    console.log("🔍 Fetching all available courses from the database...\n");

    // Get all unique available courses with their ranking info
    const courses = await db
      .select({
        courseId: universityCourseOfferings.courseId,
        avgScore: sql`CAST(AVG(CAST(${universityCourseOfferings.courseRankingScore} as FLOAT)) AS DECIMAL(5,2))`,
        universityCount: sql`COUNT(DISTINCT ${universityCourseOfferings.universityId})`,
        programStrength: sql`STRING_AGG(DISTINCT ${universityCourseOfferings.programStrength}, ', ')`,
      })
      .from(schema.universityCourseOfferings)
      .where(sql`${schema.universityCourseOfferings.isAvailable} = true`)
      .groupBy(schema.universityCourseOfferings.courseId)
      .orderBy(sql`AVG(CAST(${schema.universityCourseOfferings.courseRankingScore} as FLOAT)) DESC`);

    // Categorize courses
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
    const groupedByCategory = {};
    categorizedCourses.forEach((course) => {
      if (!groupedByCategory[course.category]) {
        groupedByCategory[course.category] = [];
      }
      groupedByCategory[course.category].push(course);
    });

    // Display results
    console.log(`📚 TOTAL COURSES AVAILABLE: ${courses.length}\n`);
    console.log("=" .repeat(80));

    Object.entries(groupedByCategory).forEach(([category, coursesInCategory]) => {
      console.log(`\n🏷️  ${category} (${coursesInCategory.length} courses)`);
      console.log("-".repeat(80));
      
      coursesInCategory.forEach((course) => {
        console.log(`  📖 ${course.courseId.toUpperCase()}`);
        console.log(`     ├─ Average Score: ${course.averageScore}`);
        console.log(`     ├─ Universities Offering: ${course.offeredByUniversities}`);
        if (course.programStrengths) {
          console.log(`     └─ Strengths: ${course.programStrengths}`);
        }
      });
    });

    console.log("\n" + "=".repeat(80));
    console.log("\n✅ Query complete!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error fetching courses:", error);
    process.exit(1);
  }
}

getAllCourses();
