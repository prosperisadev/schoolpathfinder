import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDatabase } from "./_db.js";
import { eq, and } from "drizzle-orm";
import { accessCodesBank } from "../src/db/schema.js";

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
    return res.status(405).json({ valid: false, error: "Method not allowed" });
  }

  try {
    const { code, email } = req.body;

    if (!code || !email) {
      return res.status(400).json({ valid: false, error: "Missing code or email" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ valid: false, error: "Invalid email format" });
    }

    const sanitizedCode = code.toUpperCase().trim();
    const db = getDatabase();

    // Find the code
    const [codeData] = await db
      .select()
      .from(accessCodesBank)
      .where(eq(accessCodesBank.code, sanitizedCode))
      .limit(1);

    if (!codeData) {
      return res.json({ valid: false, error: "Invalid access code" });
    }

    const now = new Date();

    // Check if code is already used
    if (codeData.isUsed) {
      // If used, check if it's within 24 hours and by same email
      if (codeData.usedByEmail === email && codeData.expiresAt) {
        const expiresAt = new Date(codeData.expiresAt);
        if (expiresAt > now) {
          return res.json({
            valid: true,
            expiresAt: codeData.expiresAt,
            message: "Access code still valid",
          });
        }
      }
      return res.json({ valid: false, error: "Access code already used or expired" });
    }

    // Mark code as used (24 hour expiration)
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const [updated] = await db
      .update(accessCodesBank)
      .set({
        isUsed: true,
        usedByEmail: email,
        usedAt: now,
        expiresAt: expiresAt,
      })
      .where(
        and(
          eq(accessCodesBank.id, codeData.id),
          eq(accessCodesBank.isUsed, false)
        )
      )
      .returning();

    if (!updated) {
      return res.json({ valid: false, error: "Access code no longer available" });
    }

    return res.json({
      valid: true,
      expiresAt: expiresAt.toISOString(),
      message: "Access code validated successfully",
    });
  } catch (error: unknown) {
    console.error("Error validating access code:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ 
      valid: false, 
      error: "Server error", 
      details: process.env.NODE_ENV === "development" ? errorMessage : undefined 
    });
  }
}
