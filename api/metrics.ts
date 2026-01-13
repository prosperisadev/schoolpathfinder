/**
 * =============================================================================
 * GET METRICS API ENDPOINT
 * =============================================================================
 * 
 * Purpose: Serve current platform metrics to homepage
 * Method: GET /api/metrics
 * Caching: Edge-cached for 5 minutes (reduces KV reads)
 * 
 * Performance Optimization:
 * - Edge cached (served from nearest location)
 * - No database queries (reads from KV)
 * - Sub-10ms response time globally
 * - Automatic cache invalidation every hour
 * 
 * Response Format:
 * {
 *   success: true,
 *   data: {
 *     totalVisitors: number,
 *     totalAssessments: number,
 *     lastUpdated: ISO string,
 *     platform: { universities, courses, continents }
 *   }
 * }
 * 
 * Caching Strategy:
 * - Browser cache: 1 minute (quick updates for users)
 * - Edge cache: 5 minutes (reduce KV load)
 * - Stale-while-revalidate: serve stale if KV slow
 */

import { kv } from '@vercel/kv';
import { KV_KEYS, PLATFORM_STATS, type LiveMetrics } from './_types';
import { getSecondsUntilNextHour } from './_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Fetch current metrics from KV
    const metrics: LiveMetrics | null = await kv.get(KV_KEYS.CURRENT_METRICS);

    // If no metrics exist yet, return defaults
    const data = metrics || {
      totalVisitors: 0,
      totalAssessments: 0,
      lastUpdated: new Date().toISOString(),
      hourKey: new Date().toISOString().slice(0, 13)
    };

    // Add platform stats (static)
    const response = {
      success: true,
      data: {
        ...data,
        platform: PLATFORM_STATS
      }
    };

    // Calculate cache duration
    const secondsUntilNextHour = getSecondsUntilNextHour();
    const browserCacheSeconds = 60; // 1 minute
    const edgeCacheSeconds = Math.min(300, secondsUntilNextHour); // 5 min or until next hour

    // Set cache headers
    // - s-maxage: Edge cache duration
    // - max-age: Browser cache duration
    // - stale-while-revalidate: Serve stale content while fetching new
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `s-maxage=${edgeCacheSeconds}, max-age=${browserCacheSeconds}, stale-while-revalidate=60`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    });

  } catch (error) {
    console.error('[metrics] Error:', error);
    
    // Return graceful fallback (don't break homepage)
    return new Response(JSON.stringify({
      success: true,
      data: {
        totalVisitors: 0,
        totalAssessments: 0,
        lastUpdated: new Date().toISOString(),
        platform: PLATFORM_STATS
      },
      error: 'Failed to fetch latest metrics, showing fallback'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
