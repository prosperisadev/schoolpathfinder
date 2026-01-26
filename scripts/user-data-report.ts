import { db } from "../src/db/index.js";
import { assessmentResults, assessmentSessions } from "../src/db/schema.js";
import { sql } from "drizzle-orm";
import { gte } from "drizzle-orm";

const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);

console.log("📊 USER DATA SUMMARY - PAST 2 DAYS");
console.log("=" .repeat(60));
console.log(`Querying data from: ${twoDaysAgo.toISOString()}\n`);

try {
  // 1. Assessment Results summary
  console.log("📋 ASSESSMENT RESULTS");
  const assessmentData = await db
    .select({
      total: sql<number>`count(*) as total`,
      completedAssessments: sql<number>`count(distinct email) as completed_assessments`,
      avgDuration: sql<number>`avg(duration_seconds) as avg_duration`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo));

  const total = (assessmentData[0]?.total as number) || 0;
  const uniqueUsers = (assessmentData[0]?.completedAssessments as number) || 0;
  console.log(`   Total assessment submissions: ${total}`);
  console.log(`   Unique users: ${uniqueUsers}`);
  const avgDuration = assessmentData[0]?.avgDuration 
    ? Math.round((assessmentData[0].avgDuration as number) / 60) 
    : 0;
  console.log(`   Average duration: ${avgDuration} minutes\n`);

  // 2. Top courses recommended
  console.log("🎯 TOP RECOMMENDED COURSES");
  const topCourses = await db
    .select({
      course: assessmentResults.topCourse,
      count: sql<number>`count(*) as count`,
      avgScore: sql<number>`avg(top_course_score) as avg_score`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.topCourse)
    .orderBy(sql`count desc`)
    .limit(10);

  if (topCourses && topCourses.length > 0) {
    topCourses.forEach((row, idx) => {
      console.log(`   ${idx + 1}. ${row.course || 'Not specified'}: ${row.count} recommendations (avg score: ${row.avgScore})`);
    });
  } else {
    console.log("   No course recommendations recorded");
  }
  console.log();

  // 3. Academic Tracks distribution
  console.log("📚 ACADEMIC TRACK DISTRIBUTION");
  const trackData = await db
    .select({
      track: assessmentResults.academicTrack,
      count: sql<number>`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.academicTrack);

  if (trackData && trackData.length > 0) {
    trackData.forEach(row => {
      const rowCount = row.count as number;
      const percentage = total > 0 
        ? ((rowCount / total) * 100).toFixed(1)
        : 0;
      console.log(`   ${row.track || 'Not specified'}: ${rowCount} (${percentage}%)`);
    });
  } else {
    console.log("   No track data recorded");
  }
  console.log();

  // 4. Access code unlock rate
  console.log("🔓 ACCESS CODE UNLOCK RATE");
  const unlockData = await db
    .select({
      unlocked: assessmentResults.hasUnlocked,
      count: sql<number>`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.hasUnlocked);

  let totalWithAccessCodes = 0;
  let unlockedCount = 0;
  if (unlockData && unlockData.length > 0) {
    unlockData.forEach(row => {
      const rowCount = row.count as number;
      totalWithAccessCodes += rowCount;
      if (row.unlocked) unlockedCount = rowCount;
      console.log(`   ${row.unlocked ? '✅ Unlocked' : '🔒 Locked'}: ${rowCount}`);
    });
  } else {
    console.log("   No unlock data recorded");
  }
  
  if (totalWithAccessCodes > 0) {
    const unlockRate = ((unlockedCount / totalWithAccessCodes) * 100).toFixed(1);
    console.log(`   Unlock rate: ${unlockRate}%\n`);
  } else {
    console.log();
  }

  // 5. WAEC Performance
  console.log("📊 WAEC PERFORMANCE DISTRIBUTION");
  const waecData = await db
    .select({
      performance: assessmentResults.waecEstimate,
      count: sql<number>`count(*) as count`,
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

  // 6. JAMB Confidence
  console.log("🎯 JAMB CONFIDENCE LEVEL");
  const jambData = await db
    .select({
      confidence: assessmentResults.jambEstimate,
      count: sql<number>`count(*) as count`,
    })
    .from(assessmentResults)
    .where(gte(assessmentResults.createdAt, twoDaysAgo))
    .groupBy(assessmentResults.jambEstimate);

  if (jambData && jambData.length > 0) {
    jambData.forEach(row => {
      const label = row.confidence === 'very_confident' ? '🚀 Very Confident'
        : row.confidence === 'fairly_confident' ? '👍 Fairly Confident'
        : row.confidence === 'not_confident' ? '😅 Not Very Confident'
        : row.confidence || 'Not specified';
      console.log(`   ${label}: ${row.count}`);
    });
  } else {
    console.log("   No JAMB data recorded");
  }
  console.log();

  // 7. Sessions
  console.log("🔐 ASSESSMENT SESSIONS");
  const sessionData = await db
    .select({
      total: sql<number>`count(*) as total`,
    })
    .from(assessmentSessions)
    .where(gte(assessmentSessions.createdAt, twoDaysAgo));

  const sessionTotal = (sessionData[0]?.total as number) || 0;
  console.log(`   Total sessions initiated: ${sessionTotal}`);
  if (total > 0 && sessionTotal > 0) {
    const conversionRate = ((total / sessionTotal) * 100).toFixed(1);
    console.log(`   Session to completion rate: ${conversionRate}%\n`);
  } else {
    console.log();
  }

  console.log("=" .repeat(60));
  console.log("✅ Report complete!");

} catch (error) {
  console.error("❌ Error querying database:", error);
  process.exit(1);
}
