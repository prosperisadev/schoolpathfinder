/**
 * =============================================================================
 * USE TRACK ASSESSMENT HOOK
 * =============================================================================
 * 
 * Purpose: Track assessment completion from Results page
 * Usage: Call once when results are calculated
 * Deduplication: Prevents double-counting on page refresh
 * 
 * Example:
 * ```tsx
 * const Results = () => {
 *   const trackAssessment = useTrackAssessment();
 *   
 *   useEffect(() => {
 *     trackAssessment();
 *   }, []);
 * }
 * ```
 */

import { useEffect, useRef } from 'react';

export function useTrackAssessment() {
  const trackedRef = useRef(false);

  return async () => {
    // Prevent double-tracking (e.g., in React StrictMode)
    if (trackedRef.current) {
      return;
    }

    try {
      const response = await fetch('/api/track-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completedAt: new Date().toISOString(),
          assessmentId: `assessment-${Date.now()}-${Math.random().toString(36).slice(2)}`
        })
      });

      if (response.ok) {
        trackedRef.current = true;
      }
    } catch (error) {
      // Silent fail - don't disrupt user experience
      console.warn('Failed to track assessment:', error);
    }
  };
}
