import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "crypto";
import { getDatabase } from "../_db.js";
import { eq, and } from "drizzle-orm";
import { assessmentSessions } from "../_schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.query;
    
    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "Email is required" });
    }

    const db = getDatabase();
      const shareToken = randomUUID();

    const [updated] = await db
      .update(assessmentSessions)
      .set({
        shareToken,
        isShared: true,
        shareCreatedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(assessmentSessions.email, email))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json({ shareToken });
  } catch (error) {
    console.error("Error updating share token:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
