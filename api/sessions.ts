import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db.js";
import { eq } from "drizzle-orm";
import { assessmentSessions } from "../src/db/schema.js";

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
    const sessionData = req.body;

    if (!sessionData.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Build clean data object with only defined fields
    const cleanData: any = {
      email: sessionData.email,
    };

    // Add optional fields only if they're provided
    if (sessionData.fullName !== undefined) cleanData.fullName = sessionData.fullName;
    if (sessionData.assessmentData !== undefined) cleanData.assessmentData = sessionData.assessmentData;
    if (sessionData.paymentStatus !== undefined) cleanData.paymentStatus = sessionData.paymentStatus;
    if (sessionData.transactionReference !== undefined) cleanData.transactionReference = sessionData.transactionReference;
    if (sessionData.accessCode !== undefined) cleanData.accessCode = sessionData.accessCode;
    if (sessionData.shareToken !== undefined) cleanData.shareToken = sessionData.shareToken;
    if (sessionData.academicTrack !== undefined) cleanData.academicTrack = sessionData.academicTrack;
    if (sessionData.department !== undefined) cleanData.department = sessionData.department;
    if (sessionData.waecEstimate !== undefined) cleanData.waecEstimate = sessionData.waecEstimate;
    if (sessionData.jambEstimate !== undefined) cleanData.jambEstimate = sessionData.jambEstimate;
    if (sessionData.learningStyle !== undefined) cleanData.learningStyle = sessionData.learningStyle;
    if (sessionData.isShared !== undefined) cleanData.isShared = sessionData.isShared;
    if (sessionData.recommendations !== undefined) cleanData.recommendations = sessionData.recommendations;
    
    // Convert date strings to Date objects
    if (sessionData.shareCreatedAt) cleanData.shareCreatedAt = new Date(sessionData.shareCreatedAt);
    if (sessionData.paidAt) cleanData.paidAt = new Date(sessionData.paidAt);
    if (sessionData.expiresAt) cleanData.expiresAt = new Date(sessionData.expiresAt);

    const db = getDatabase();

    // Check if session exists
    const [existing] = await db
      .select()
      .from(assessmentSessions)
      .where(eq(assessmentSessions.email, sessionData.email))
      .limit(1);

    if (existing) {
      // Update existing session - add updatedAt
      cleanData.updatedAt = new Date();
      
      const [updated] = await db
        .update(assessmentSessions)
        .set(cleanData)
        .where(eq(assessmentSessions.email, sessionData.email))
        .returning();

      return res.json(updated);
    } else {
      // Create new session
      const [created] = await db
        .insert(assessmentSessions)
        .values(cleanData)
        .returning();

      return res.json(created);
    }
  } catch (error) {
    console.error("Error saving session:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    const message = error instanceof Error ? error.message : "Unknown error";
    const stack = error instanceof Error ? error.stack : "";
    // Check for unique constraint violation
    if (message.includes("unique") || message.includes("duplicate")) {
      return res.status(409).json({ error: "Session already exists", details: message });
    }
    return res.status(500).json({ error: message, stack: stack });
  }
}
