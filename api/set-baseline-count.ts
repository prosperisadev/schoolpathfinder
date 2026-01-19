import { kv } from '@vercel/kv';
import { KV_KEYS, type LiveMetrics } from './_types';
import { getCurrentHourKey } from './_utils';

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
    // Get current metrics from KV
    const currentMetrics: LiveMetrics | null = await kv.get(KV_KEYS.CURRENT_METRICS);
    
    // Set to 100 as the new baseline
    const updatedMetrics: LiveMetrics = {
      totalVisitors: currentMetrics?.totalVisitors || 0,
      totalAssessments: 100,
      lastUpdated: new Date().toISOString(),
      hourKey: getCurrentHourKey()
    };
    
    await kv.set(KV_KEYS.CURRENT_METRICS, updatedMetrics);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Assessment count set to 100',
      previousCount: currentMetrics?.totalAssessments || 0,
      newCount: 100
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('[set-baseline-count] Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
