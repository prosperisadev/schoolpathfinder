/**
 * =============================================================================
 * LIVE METRICS SCHEMA & TYPES
 * =============================================================================
 * 
 * Purpose: Defines data structures for tracking platform usage metrics
 * Storage: Vercel KV (Redis-compatible key-value store)
 * Update Frequency: Hourly via cron job
 * 
 * Architecture Decision:
 * - Using Vercel KV over Postgres for:
 *   1. Sub-millisecond read latency (critical for homepage)
 *   2. Automatic scaling under traffic spikes
 *   3. Simple atomic increment operations
 *   4. No cold starts (always warm)
 * 
 * Data Flow:
 * 1. Client visits → API tracks with hashed session ID
 * 2. Assessment complete → API validates & increments counter
 * 3. Hourly cron → Aggregates data, creates snapshot
 * 4. Homepage → Reads latest snapshot (cached at edge)
 */

export interface LiveMetrics {
  /** Total unique visitors (deduplicated by session) */
  totalVisitors: number;
  
  /** Total completed assessments (server-validated) */
  totalAssessments: number;
  
  /** ISO timestamp of last update */
  lastUpdated: string;
  
  /** Hour identifier (YYYY-MM-DD-HH) for deduplication */
  hourKey: string;
}

export interface HourlySnapshot extends LiveMetrics {
  /** Unique identifier for this snapshot */
  id: string;
  
  /** Visitors added in this hour */
  newVisitors: number;
  
  /** Assessments completed in this hour */
  newAssessments: number;
}

/**
 * Platform statistics (static values, updated manually)
 */
export interface PlatformStats {
  universities: number;
  courses: number;
  continents: number;
}

export const PLATFORM_STATS: PlatformStats = {
  universities: 191, // 171 Nigerian + 10 African + 10 Global
  courses: 153,      // 23 global + 100+ additional + core courses
  continents: 3      // Nigeria, Africa, Global
};

/**
 * KV Store Keys (namespaced for organization)
 */
export const KV_KEYS = {
  // Current metrics (always latest)
  CURRENT_METRICS: 'metrics:current',
  
  // Hourly snapshots (timestamped)
  SNAPSHOT_PREFIX: 'snapshot:',
  
  // Session tracking (short TTL for privacy)
  SESSION_PREFIX: 'session:',
  
  // Rate limiting (prevent abuse)
  RATE_LIMIT_PREFIX: 'ratelimit:',
} as const;

/**
 * Configuration Constants
 */
export const METRICS_CONFIG = {
  // How long to cache session IDs (24 hours)
  SESSION_TTL_SECONDS: 86400,
  
  // Rate limit: max events per IP per hour
  RATE_LIMIT_PER_HOUR: 100,
  
  // How many snapshots to retain (30 days)
  SNAPSHOT_RETENTION_DAYS: 30,
  
  // Cache duration for homepage metrics (5 minutes)
  EDGE_CACHE_SECONDS: 300,
} as const;
