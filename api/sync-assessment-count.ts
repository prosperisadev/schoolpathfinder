import { kv } from '@vercel/kv';
import { KV_KEYS, type LiveMetrics } from './_types';
import { getCurrentHourKey } from './_utils';
import { sql } from "drizzle-orm";

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { getDatabase } = await import("./_db.js");
    const { assessmentSessions } = await import("./_schema.js");
    
    const db = getDatabase();
    
    // Count total completed assessments from PostgreSQL
    const totalCount = await db.select({
      total: sql<number>`count(*)`,
      withRecommendations: sql<number>`count(*) filter (where recommendations is not null)`,
    }).from(assessmentSessions);
    
    const assessmentCount = parseInt(totalCount[0].total);
    
    // Get current metrics from KV
    const currentMetrics: LiveMetrics | null = await kv.get(KV_KEYS.CURRENT_METRICS);
    
    // Update with corrected count
    const updatedMetrics: LiveMetrics = {
      totalVisitors: currentMetrics?.totalVisitors || 0,
      totalAssessments: assessmentCount,
      lastUpdated: new Date().toISOString(),
      hourKey: getCurrentHourKey()
    };
    
    await kv.set(KV_KEYS.CURRENT_METRICS, updatedMetrics);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Assessment count synced from PostgreSQL',
      previousCount: currentMetrics?.totalAssessments || 0,
      newCount: assessmentCount,
      difference: assessmentCount - (currentMetrics?.totalAssessments || 0)
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('[sync-assessment-count] Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
