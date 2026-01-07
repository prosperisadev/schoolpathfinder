import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db";
import { sql } from "drizzle-orm";
import { universitiesComprehensive } from "./_schema";

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
    const db = getDatabase();

    const universities = await db
      .select()
      .from(universitiesComprehensive)
      .orderBy(sql`${universitiesComprehensive.rankingScore} DESC`);

    return res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
