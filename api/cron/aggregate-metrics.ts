/**
 * =============================================================================
 * HOURLY METRICS AGGREGATION CRON JOB
 * =============================================================================
 * 
 * Purpose: Create hourly snapshots & cleanup old data
 * Schedule: Runs at :00 of every hour (via Vercel Cron)
 * Duration: ~100-500ms (lightweight operation)
 * 
 * What This Does:
 * 1. Captures current metrics as immutable snapshot
 * 2. Stores snapshot with hour-based key
 * 3. Calculates delta (new visitors/assessments this hour)
 * 4. Cleans up snapshots older than 30 days
 * 5. Logs execution for monitoring
 * 
 * Why Hourly?
 * - Balance between freshness and cost
 * - Prevents excessive KV operations
 * - Aligns with "updated hourly" UI messaging
 * - Allows historical trend analysis
 * 
 * Data Retention:
 * - Snapshots: 30 days (for analytics export)
 * - Sessions: 24 hours (auto-expire)
 * - Rate limits: 1 hour (auto-expire)
 * 
 * Future Enhancements:
 * - Export to analytics warehouse (for ML)
 * - Cohort analysis (user segments)
 * - Geographic breakdown (by continent)
 * - Peak hour identification
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';
import { 
  KV_KEYS, 
  METRICS_CONFIG,
  type LiveMetrics, 
  type HourlySnapshot 
} from '../_types';
import { getCurrentHourKey, getSnapshotKey } from '../_utils';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Security: Verify request is from Vercel Cron
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const startTime = Date.now();
  const currentHour = getCurrentHourKey();

  try {
    // Get current metrics
    const currentMetrics: LiveMetrics | null = await kv.get(KV_KEYS.CURRENT_METRICS);

    if (!currentMetrics) {
      // Initialize metrics if they don't exist
      const initialMetrics: LiveMetrics = {
        totalVisitors: 0,
        totalAssessments: 0,
        lastUpdated: new Date().toISOString(),
        hourKey: currentHour
      };

      await kv.set(KV_KEYS.CURRENT_METRICS, initialMetrics);

      return res.status(200).json({
        success: true,
        message: 'Metrics initialized',
        duration: Date.now() - startTime
      });
    }

    // Get previous hour's snapshot to calculate delta
    const previousHourDate = new Date();
    previousHourDate.setHours(previousHourDate.getHours() - 1);
    const previousHourKey = getCurrentHourKey.call({ 
      getUTCFullYear: () => previousHourDate.getUTCFullYear(),
      getUTCMonth: () => previousHourDate.getUTCMonth(),
      getUTCDate: () => previousHourDate.getUTCDate(),
      getUTCHours: () => previousHourDate.getUTCHours()
    });
    
    const previousSnapshot: HourlySnapshot | null = await kv.get(
      getSnapshotKey(previousHourKey)
    );

    // Calculate new visitors/assessments this hour
    const newVisitors = previousSnapshot 
      ? currentMetrics.totalVisitors - previousSnapshot.totalVisitors 
      : currentMetrics.totalVisitors;
    
    const newAssessments = previousSnapshot
      ? currentMetrics.totalAssessments - previousSnapshot.totalAssessments
      : currentMetrics.totalAssessments;

    // Create snapshot
    const snapshot: HourlySnapshot = {
      ...currentMetrics,
      id: `snapshot-${currentHour}`,
      newVisitors,
      newAssessments
    };

    // Store snapshot with 30-day TTL
    const snapshotKey = getSnapshotKey(currentHour);
    const ttlSeconds = METRICS_CONFIG.SNAPSHOT_RETENTION_DAYS * 24 * 60 * 60;
    
    await kv.set(snapshotKey, snapshot, { ex: ttlSeconds });

    // Optional: Cleanup very old snapshots (belt-and-suspenders approach)
    // KV will auto-delete based on TTL, but we can manually clean up if needed
    const thirtyOneDaysAgo = new Date();
    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);
    // Note: Actual cleanup would require scanning keys (expensive)
    // Relying on TTL is more efficient

    const duration = Date.now() - startTime;

    // Log for monitoring
    console.log('[cron-aggregate] Snapshot created:', {
      hour: currentHour,
      totalVisitors: currentMetrics.totalVisitors,
      totalAssessments: currentMetrics.totalAssessments,
      newVisitors,
      newAssessments,
      duration
    });

    return res.status(200).json({
      success: true,
      message: 'Hourly snapshot created',
      snapshot: {
        hour: currentHour,
        newVisitors,
        newAssessments
      },
      duration
    });

  } catch (error) {
    console.error('[cron-aggregate] Error:', error);
    
    return res.status(500).json({
      error: 'Aggregation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
      duration: Date.now() - startTime
    });
  }
}
