import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db.js";
import { eq } from "drizzle-orm";
import { assessmentSessions } from "./_schema.js";

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

    // Convert date strings to Date objects for Drizzle
    const processedData = {
      ...sessionData,
      shareCreatedAt: sessionData.shareCreatedAt ? new Date(sessionData.shareCreatedAt) : undefined,
      paidAt: sessionData.paidAt ? new Date(sessionData.paidAt) : undefined,
      expiresAt: sessionData.expiresAt ? new Date(sessionData.expiresAt) : undefined,
    };

    const db = getDatabase();

    // Check if session exists
    const [existing] = await db
      .select()
      .from(assessmentSessions)
      .where(eq(assessmentSessions.email, sessionData.email))
      .limit(1);

    if (existing) {
      // Update existing session
      const [updated] = await db
        .update(assessmentSessions)
        .set({
          ...processedData,
          updatedAt: new Date(),
        })
        .where(eq(assessmentSessions.email, sessionData.email))
        .returning();

      return res.json(updated);
    } else {
      // Create new session
      const [created] = await db
        .insert(assessmentSessions)
        .values(processedData)
        .returning();

      return res.json(created);
    }
  } catch (error) {
    console.error("Error saving session:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    // Check for unique constraint violation
    if (message.includes("unique") || message.includes("duplicate")) {
      return res.status(409).json({ error: "Session already exists" });
    }
    return res.status(500).json({ error: message });
  }
}
