import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "../_db.js";
import { eq } from "drizzle-orm";
import { assessmentSessions } from "../_schema.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { token } = req.query;
    
    if (!token || typeof token !== "string") {
      return res.status(400).json({ error: "Token is required" });
    }

    const db = getDatabase();

    const [session] = await db
      .select()
      .from(assessmentSessions)
      .where(eq(assessmentSessions.shareToken, token))
      .limit(1);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Check expiration
    if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
      return res.status(410).json({ error: "Session expired" });
    }

    return res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
