import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db";
import { eq } from "drizzle-orm";
import { assessmentSessions } from "../src/db/schema";

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
          ...sessionData,
          updatedAt: new Date(),
        })
        .where(eq(assessmentSessions.email, sessionData.email))
        .returning();

      return res.json(updated);
    } else {
      // Create new session
      const [created] = await db
        .insert(assessmentSessions)
        .values(sessionData)
        .returning();

      return res.json(created);
    }
  } catch (error) {
    console.error("Error saving session:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
