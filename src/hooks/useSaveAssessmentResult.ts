/**
 * Custom hook to save assessment results to database
 * 
 * Usage: Call this from Results page to persist complete assessment data
 * - Saves email, profile, recommendations, scores
 * - Non-blocking (doesn't affect UI)
 * - Graceful error handling
 */

import { useState, useCallback } from 'react';
import { UserProfile, CourseRecommendation } from '@/types';

export function useSaveAssessmentResult() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveResult = useCallback(async (
    profile: UserProfile,
    recommendations: CourseRecommendation[],
    options?: {
      sessionId?: string;
      durationSeconds?: number;
      accessCode?: string;
      hasUnlocked?: boolean;
    }
  ) => {
    try {
      setSaving(true);
      setError(null);

      const response = await fetch('/api/save-assessment-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: profile.email,
          fullName: profile.fullName,
          academicTrack: profile.academicTrack,
          waecEstimate: profile.waecEstimate,
          jambEstimate: profile.jambEstimate,
          learningStyle: profile.learningStyle,
          interests: profile.interests,
          personality: profile.personality,
          preferences: {
            location: profile.preferredLocation,
            budget: profile.budgetRange,
          },
          recommendations,
          sessionId: options?.sessionId,
          durationSeconds: options?.durationSeconds,
          accessCode: options?.accessCode,
          hasUnlocked: options?.hasUnlocked,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        console.warn('[useSaveAssessmentResult] Save failed (non-critical):', result.error);
        setError(result.error);
        return { success: false, error: result.error };
      }

      console.log('[useSaveAssessmentResult] Assessment result saved:', result.id);
      return { success: true, id: result.id };

    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.warn('[useSaveAssessmentResult] Exception (non-critical):', message);
      setError(message);
      return { success: false, error: message };
    } finally {
      setSaving(false);
    }
  }, []);

  return { saveResult, saving, error };
}
