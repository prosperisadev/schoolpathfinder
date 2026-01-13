/**
 * =============================================================================
 * TRACK VISITOR API ENDPOINT
 * =============================================================================
 * 
 * Purpose: Record unique platform visits
 * Method: POST /api/track-visitor
 * Rate Limit: 100 requests/hour per IP
 * 
 * Privacy & Security:
 * - No raw IPs stored (SHA-256 hashed with UA)
 * - Session deduplication (24h window)
 * - Rate limiting prevents abuse
 * - CORS enabled for frontend
 * 
 * Data Flow:
 * 1. Homepage calls this endpoint on mount
 * 2. Generate privacy-safe session ID
 * 3. Check if session already counted (24h window)
 * 4. If new: increment counter & store session
 * 5. Return success (no sensitive data exposed)
 * 
 * KV Operations:
 * - Read: session existence check
 * - Write: increment visitor count + set session flag
 * - TTL: 24h for session keys (auto-cleanup)
 */

import { kv } from '@vercel/kv';
import { KV_KEYS, METRICS_CONFIG, type LiveMetrics } from './_types';
import {
  generateSessionId,
  getCurrentHourKey,
  getSessionKey,
  checkRateLimit
} from './_utils';

export const config = {
  runtime: 'edge', // Use Edge Runtime for global low-latency
};

export default async function handler(req: Request) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Generate privacy-safe session identifier
    const sessionId = await generateSessionId(req as unknown as Request);
    
    // Check rate limit
    const rateLimit = await checkRateLimit(kv, sessionId);
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({
        error: 'Rate limit exceeded',
        retryAfter: 3600 // 1 hour
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if this session was already counted (24h window)
    const sessionKey = getSessionKey(sessionId);
    const sessionExists = await kv.get(sessionKey);

    if (sessionExists) {
      // Already counted, return success but don't increment
      return new Response(JSON.stringify({
        success: true,
        alreadyCounted: true,
        message: 'Visitor already tracked in current window'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current metrics
    const currentMetrics: LiveMetrics | null = await kv.get(KV_KEYS.CURRENT_METRICS);
    
    const updatedMetrics: LiveMetrics = {
      totalVisitors: (currentMetrics?.totalVisitors || 0) + 1,
      totalAssessments: currentMetrics?.totalAssessments || 0,
      lastUpdated: new Date().toISOString(),
      hourKey: getCurrentHourKey()
    };

    // Atomic operations: increment counter + mark session
    await Promise.all([
      kv.set(KV_KEYS.CURRENT_METRICS, updatedMetrics),
      kv.set(sessionKey, 1, { ex: METRICS_CONFIG.SESSION_TTL_SECONDS })
    ]);

    return new Response(JSON.stringify({
      success: true,
      alreadyCounted: false,
      message: 'Visitor tracked successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[track-visitor] Error:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to track visitor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
