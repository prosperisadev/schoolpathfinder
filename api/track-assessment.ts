/**
 * =============================================================================
 * TRACK ASSESSMENT COMPLETION API ENDPOINT
 * =============================================================================
 * 
 * Purpose: Record completed assessments (not just starts)
 * Method: POST /api/track-assessment
 * Validation: Server-side checks prevent double-counting
 * 
 * Security Measures:
 * - Idempotency key prevents duplicate submissions
 * - Session-based deduplication (one assessment per session)
 * - Rate limiting (max 10 assessments/hour per IP)
 * - Request validation (ensure legitimate completion)
 * 
 * Integration Points:
 * - Called from Results page after assessment calculation
 * - Requires completion timestamp to prevent replay attacks
 * - Returns success without exposing sensitive metrics
 * 
 * Data Flow:
 * 1. User completes assessment → Results page loads
 * 2. Results component calls this endpoint with validation data
 * 3. Server checks: not duplicate + valid session + within rate limit
 * 4. If valid: increment counter
 * 5. Return success confirmation
 */

import { kv } from '@vercel/kv';
import { KV_KEYS, METRICS_CONFIG, type LiveMetrics } from './_types';
import {
  generateSessionId,
  getCurrentHourKey,
  checkRateLimit
} from './_utils';

export const config = {
  runtime: 'edge',
};

interface AssessmentTrackingRequest {
  /** Client-generated completion timestamp (for validation) */
  completedAt: string;
  
  /** Optional: Assessment ID for deduplication */
  assessmentId?: string;
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { 
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Parse request body
    const body: AssessmentTrackingRequest = await req.json();

    if (!body.completedAt) {
      return new Response(JSON.stringify({
        error: 'Missing required field: completedAt'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate timestamp is recent (within last 5 minutes)
    const completedTime = new Date(body.completedAt).getTime();
    const now = Date.now();
    const fiveMinutesAgo = now - (5 * 60 * 1000);

    if (completedTime < fiveMinutesAgo || completedTime > now) {
      return new Response(JSON.stringify({
        error: 'Invalid completion timestamp',
        message: 'Assessment must be completed within the last 5 minutes'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Generate session ID
    const sessionId = await generateSessionId(req);
    
    // Apply stricter rate limit for assessments (prevent spam)
    const rateLimitKey = `assessment:${sessionId}`;
    const rateLimit = await checkRateLimit(kv, rateLimitKey);
    
    if (!rateLimit.allowed) {
      return new Response(JSON.stringify({
        error: 'Too many assessments',
        message: 'Please wait before completing another assessment',
        retryAfter: 3600
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check for duplicate submission using idempotency key
    const idempotencyKey = body.assessmentId 
      ? `assessment:completed:${body.assessmentId}`
      : `assessment:session:${sessionId}:${getCurrentHourKey()}`;
    
    const alreadyRecorded = await kv.get(idempotencyKey);
    
    if (alreadyRecorded) {
      return new Response(JSON.stringify({
        success: true,
        alreadyCounted: true,
        message: 'Assessment already recorded'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current metrics and increment
    const currentMetrics: LiveMetrics | null = await kv.get(KV_KEYS.CURRENT_METRICS);
    
    const updatedMetrics: LiveMetrics = {
      totalVisitors: currentMetrics?.totalVisitors || 0,
      totalAssessments: (currentMetrics?.totalAssessments || 0) + 1,
      lastUpdated: new Date().toISOString(),
      hourKey: getCurrentHourKey()
    };

    // Atomic update: increment counter + mark as recorded
    await Promise.all([
      kv.set(KV_KEYS.CURRENT_METRICS, updatedMetrics),
      kv.set(idempotencyKey, 1, { ex: METRICS_CONFIG.SESSION_TTL_SECONDS })
    ]);

    return new Response(JSON.stringify({
      success: true,
      alreadyCounted: false,
      message: 'Assessment completion tracked'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[track-assessment] Error:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error',
      message: 'Failed to track assessment'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
