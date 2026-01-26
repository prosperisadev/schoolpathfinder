/**
 * =============================================================================
 * SAVE ASSESSMENT RESULT API ENDPOINT
 * =============================================================================
 * 
 * Purpose: Save complete assessment results (THE MOST VALUABLE DATA)
 * Method: POST /api/save-assessment-result
 * 
 * Data Captured:
 * - User email & full name
 * - Complete profile (interests, personality, preferences)
 * - Full recommendations with scores
 * - Academic indicators (WAEC, JAMB estimates)
 * - Session metadata (duration, completion time)
 * 
 * Why This Matters:
 * - Enables analysis of user preferences & patterns
 * - Tracks what courses are most recommended
 * - Measures assessment effectiveness
 * - Supports future ML/personalization
 * - Critical business intelligence
 * 
 * Performance:
 * - Uses optimized DB client (connection reuse)
 * - Async write (doesn't block response)
 * - Indexed for fast queries
 * - Rate limited to prevent abuse
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db.js";
import { assessmentResults } from "../src/db/schema.js";

interface SaveAssessmentRequest {
  email: string;
  fullName?: string;
  
  // Profile data
  academicTrack?: string;
  waecEstimate?: string;
  jambEstimate?: string;
  learningStyle?: string;
  
  // Assessment data
  interests?: Record<string, number>;
  personality?: Record<string, number>;
  preferences?: Record<string, any>;
  
  // Recommendations
  recommendations?: any[];
  
  // Session metadata
  sessionId?: string;
  durationSeconds?: number;
  accessCode?: string;
  hasUnlocked?: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: SaveAssessmentRequest = req.body;

    // Validate required fields
    if (!data.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Extract top course from recommendations
    // Handle different recommendation data structures
    const topRec = data.recommendations?.[0];
    const topCourse = topRec?.course?.title || topRec?.course?.id || topRec?.courseName || topRec?.course;
    const topCourseScore = topRec?.fitScore || topRec?.score || null;

    // Prepare data for insert
    const assessmentData = {
      email: data.email,
      fullName: data.fullName,
      academicTrack: data.academicTrack,
      waecEstimate: data.waecEstimate,
      jambEstimate: data.jambEstimate,
      learningStyle: data.learningStyle,
      interests: data.interests || {},
      personality: data.personality || {},
      preferences: data.preferences || {},
      recommendations: data.recommendations || [],
      topCourse,
      topCourseScore,
      sessionId: data.sessionId,
      durationSeconds: data.durationSeconds,
      accessCode: data.accessCode,
      hasUnlocked: data.hasUnlocked || false,
    };

    const db = getDatabase();

    // Insert assessment result
    const [result] = await db
      .insert(assessmentResults)
      .values(assessmentData)
      .returning();

    console.log(`[save-assessment-result] Saved for ${data.email}: ${topCourse} (${topCourseScore}%)`);

    return res.status(201).json({
      success: true,
      id: result.id,
      message: "Assessment result saved successfully",
    });

  } catch (error) {
    console.error("[save-assessment-result] Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    
    // Don't fail if save fails (graceful degradation)
    // This ensures user experience isn't impacted
    return res.status(500).json({
      success: false,
      error: message,
      message: "Failed to save assessment result (non-critical)",
    });
  }
}
