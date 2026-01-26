import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { sql, gte } from "drizzle-orm";
import * as schema from "../src/db/schema.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL environment variable is not set");
  process.exit(1);
}

try {
  const sqlClient = neon(connectionString);
  const db = drizzle(sqlClient, { schema, casing: 'snake_case' });
  
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

  console.log("\n📊 USER DATA SUMMARY - PAST 2 DAYS");
  console.log("=" .repeat(70));
  console.log(`Report generated: ${new Date().toLocaleString()}`);
  console.log(`Data window: ${twoDaysAgo.toLocaleString()} to Present\n`);

  // 1. Assessment Results summary
  console.log("📋 ASSESSMENT RESULTS");
  console.log("-" .repeat(70));
  const { assessmentResults, assessmentSessions } = schema;
  
  const assessmentData = await db
    .select({
      total: sql`count(*) as total`,
      completedCount: sql`count(*) filter (where completed_at is not null) as completed_count`,
      avgDuration: sql`avg(duration_seconds) as avg_duration`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo));

  const total = assessmentData[0]?.total || 0;
  const completed = assessmentData[0]?.completedCount || 0;
  const avgDur = assessmentData[0]?.avgDuration 
    ? Math.round(assessmentData[0].avgDuration / 60) 
    : 0;

  console.log(`   Total assessment submissions:     ${total}`);
  console.log(`   Completed assessments:            ${completed}`);
  console.log(`   Completion rate:                  ${total > 0 ? ((completed/total)*100).toFixed(1) : 0}%`);
  console.log(`   Average duration:                 ${avgDur} minutes\n`);

  // 2. Top courses recommended
  console.log("🎯 TOP 10 RECOMMENDED COURSES");
  console.log("-" .repeat(70));
  const topCourses = await db
    .select({
      course: assessmentResults.topCourse,
      count: sql`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.topCourse)
    .orderBy(sql`count desc`)
    .limit(10);

  if (topCourses && topCourses.length > 0) {
    topCourses.forEach((row, idx) => {
      const courseLabel = row.course ? row.course.replace(/-/g, ' ') : 'Not specified';
      console.log(`   ${idx + 1}. ${courseLabel}: ${row.count} recommendations`);
    });
  } else {
    console.log("   No course recommendations recorded");
  }
  console.log();

  // 3. Academic Tracks distribution
  console.log("📚 ACADEMIC TRACK DISTRIBUTION");
  console.log("-" .repeat(70));
  const trackData = await db
    .select({
      track: assessmentResults.academicTrack,
      count: sql`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.academicTrack);

  if (trackData && trackData.length > 0) {
    trackData.forEach(row => {
      const percentage = total > 0 ? ((row.count / total) * 100).toFixed(1) : 0;
      const trackLabel = row.track ? row.track.charAt(0).toUpperCase() + row.track.slice(1) : 'Not specified';
      console.log(`   ${trackLabel}: ${row.count} (${percentage}%)`);
    });
  } else {
    console.log("   No track data recorded");
  }
  console.log();

  // 4. Completion Status
  console.log("✅ COMPLETION STATUS");
  console.log("-" .repeat(70));
  const completionStatus = await db
    .select({
      completed: sql`completed_at is not null as completed`,
      count: sql`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(sql`completed_at is not null`);

  if (completionStatus && completionStatus.length > 0) {
    completionStatus.forEach(row => {
      const status = row.completed ? '✅ Completed' : '⏳ In Progress/Not Completed';
      console.log(`   ${status}: ${row.count}`);
    });
  } else {
    console.log("   No data recorded");
  }
  console.log();

  // 5. WAEC Performance
  console.log("📊 WAEC PERFORMANCE DISTRIBUTION");
  console.log("-" .repeat(70));
  const waecData = await db
    .select({
      performance: assessmentResults.waecEstimate,
      count: sql`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.waecEstimate);

  if (waecData && waecData.length > 0) {
    waecData.forEach(row => {
      const label = row.performance === 'mostly_distinctions' ? 'Mostly Distinctions'
        : row.performance === 'mix_distinctions_credits' ? 'Mix of Distinctions & Credits'
        : row.performance === 'mostly_credits' ? 'Mostly Credits'
        : row.performance || 'Not specified';
      console.log(`   ${label}: ${row.count}`);
    });
  } else {
    console.log("   No WAEC data recorded");
  }
  console.log();

  // 6. Unique users
  console.log("👥 USER INSIGHTS");
  console.log("-" .repeat(70));
  const uniqueEmails = await db
    .select({
      uniqueCount: sql`count(distinct email) as unique_count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo));

  const uniqueUsers = uniqueEmails[0]?.uniqueCount || 0;
  console.log(`   Unique email addresses:           ${uniqueUsers}`);
  console.log(`   Average assessments per user:     ${uniqueUsers > 0 ? (total / uniqueUsers).toFixed(1) : 0}\n`);

  // 7. Unique countries
  console.log("🌍 GEOGRAPHIC INSIGHTS");
  console.log("-" .repeat(70));
  try {
    const countryCounts = await db
      .select({
        country: assessmentResults.country,
        count: sql`count(*) as count`,
      })
      .from(assessmentResults)
      .where(gte(assessmentResults.createdAt, twoDaysAgo))
      .groupBy(assessmentResults.country)
      .orderBy(sql`count desc`)
      .limit(10);

    if (countryCounts && countryCounts.length > 0) {
      console.log("   Top 10 countries by assessments:");
      countryCounts.forEach((row, idx) => {
        const percentage = total > 0 ? ((row.count / total) * 100).toFixed(1) : 0;
        const countryLabel = row.country || 'Not specified';
        console.log(`   ${idx + 1}. ${countryLabel}: ${row.count} (${percentage}%)`);
      });
    } else {
      console.log("   No country data recorded");
    }
  } catch (err) {
    console.log("   Country data unavailable");
  }
  console.log();

  console.log("=" .repeat(70));
  console.log("✅ Report complete!\n");

  process.exit(0);

} catch (error) {
  console.error("❌ Error querying database:");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
