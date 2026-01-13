/**
 * =============================================================================
 * METRICS UTILITY FUNCTIONS
 * =============================================================================
 * 
 * Purpose: Core helper functions for metrics tracking
 * Security: All session IDs are SHA-256 hashed (never store raw IPs)
 * Privacy: Sessions expire after 24h, no PII stored
 * 
 * Why SHA-256 hashing?
 * - One-way function (cannot reverse to get IP)
 * - Deterministic (same input = same output for deduplication)
 * - Compliant with privacy regulations
 */

import { KV_KEYS, METRICS_CONFIG } from './_types';

/**
 * Generate a privacy-safe session identifier
 * 
 * Strategy: Hash IP + User-Agent to create unique but anonymous ID
 * - Same user = same hash (enables deduplication)
 * - No raw IP stored (privacy compliant)
 * - User-Agent included (distinguishes multiple users behind same IP)
 */
export async function generateSessionId(request: Request): Promise<string> {
  const ip = request.headers.get('x-forwarded-for') 
    || request.headers.get('x-real-ip') 
    || 'anonymous';
  
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Combine IP + UA for uniqueness
  const rawIdentifier = `${ip}:${userAgent}`;
  
  // Hash using Web Crypto API (available in Edge Runtime)
  const encoder = new TextEncoder();
  const data = encoder.encode(rawIdentifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Convert to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Get current hour key for aggregation
 * Format: YYYY-MM-DD-HH (e.g., "2026-01-12-14")
 */
export function getCurrentHourKey(): string {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hour = String(now.getUTCHours()).padStart(2, '0');
  
  return `${year}-${month}-${day}-${hour}`;
}

/**
 * Build KV key for session tracking
 */
export function getSessionKey(sessionId: string): string {
  return `${KV_KEYS.SESSION_PREFIX}${sessionId}`;
}

/**
 * Build KV key for rate limiting
 */
export function getRateLimitKey(identifier: string): string {
  const hourKey = getCurrentHourKey();
  return `${KV_KEYS.RATE_LIMIT_PREFIX}${identifier}:${hourKey}`;
}

/**
 * Build KV key for hourly snapshot
 */
export function getSnapshotKey(hourKey: string): string {
  return `${KV_KEYS.SNAPSHOT_PREFIX}${hourKey}`;
}

/**
 * Validate request to prevent spam/abuse
 * 
 * Returns: { allowed: boolean, remaining: number }
 */
export async function checkRateLimit(
  kv: any,
  identifier: string
): Promise<{ allowed: boolean; remaining: number }> {
  const key = getRateLimitKey(identifier);
  const current = await kv.get(key) || 0;
  
  if (current >= METRICS_CONFIG.RATE_LIMIT_PER_HOUR) {
    return { allowed: false, remaining: 0 };
  }
  
  // Increment with 1-hour TTL
  await kv.set(key, current + 1, { ex: 3600 });
  
  return {
    allowed: true,
    remaining: METRICS_CONFIG.RATE_LIMIT_PER_HOUR - current - 1
  };
}

/**
 * Format number for display (e.g., 1234 → "1,234")
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

/**
 * Calculate time until next hour (for cache headers)
 */
export function getSecondsUntilNextHour(): number {
  const now = new Date();
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  
  return Math.floor((nextHour.getTime() - now.getTime()) / 1000);
}
