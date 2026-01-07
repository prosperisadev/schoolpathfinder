import "dotenv/config";
import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { eq, and, sql } from "drizzle-orm";
import * as schema from "../db/schema";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const client = postgres(connectionString, {
  prepare: false,
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(client, { schema });

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ==================== ACCESS CODE ROUTES ====================

// Validate access code
app.post("/api/validate-access-code", async (req, res) => {
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

    // Find the code
    const [codeData] = await db
      .select()
      .from(schema.accessCodesBank)
      .where(eq(schema.accessCodesBank.code, sanitizedCode))
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
      .update(schema.accessCodesBank)
      .set({
        isUsed: true,
        usedByEmail: email,
        usedAt: now,
        expiresAt: expiresAt,
      })
      .where(
        and(
          eq(schema.accessCodesBank.id, codeData.id),
          eq(schema.accessCodesBank.isUsed, false)
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
  } catch (error) {
    console.error("Error validating access code:", error);
    return res.status(500).json({ valid: false, error: "Server error" });
  }
});

// ==================== SESSION ROUTES ====================

// Get session by share token
app.get("/api/sessions/share/:token", async (req, res) => {
  try {
    const { token } = req.params;

    const [session] = await db
      .select()
      .from(schema.assessmentSessions)
      .where(eq(schema.assessmentSessions.shareToken, token))
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
});

// Create or update session
app.post("/api/sessions", async (req, res) => {
  try {
    const sessionData = req.body;

    if (!sessionData.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if session exists
    const [existing] = await db
      .select()
      .from(schema.assessmentSessions)
      .where(eq(schema.assessmentSessions.email, sessionData.email))
      .limit(1);

    if (existing) {
      // Update existing session
      const [updated] = await db
        .update(schema.assessmentSessions)
        .set({
          ...sessionData,
          updatedAt: new Date(),
        })
        .where(eq(schema.assessmentSessions.email, sessionData.email))
        .returning();

      return res.json(updated);
    } else {
      // Create new session
      const [created] = await db
        .insert(schema.assessmentSessions)
        .values(sessionData)
        .returning();

      return res.json(created);
    }
  } catch (error) {
    console.error("Error saving session:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Update session share token
app.patch("/api/sessions/:email/share", async (req, res) => {
  try {
    const { email } = req.params;
    const shareToken = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const [updated] = await db
      .update(schema.assessmentSessions)
      .set({
        shareToken,
        isShared: true,
        shareCreatedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.assessmentSessions.email, email))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.json({ shareToken });
  } catch (error) {
    console.error("Error updating share token:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// ==================== UNIVERSITY ROUTES ====================

// Get universities for a course
app.get("/api/universities/course/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const location = (req.query.location as string) || "nigeria";

    // Build the query based on location
    let countryFilter = "Nigeria";
    if (location === "africa") {
      countryFilter = ""; // Will filter for African countries
    } else if (location === "global") {
      countryFilter = ""; // No filter
    }

    const results = await db
      .select({
        university: schema.universitiesComprehensive,
        offering: schema.universityCourseOfferings,
      })
      .from(schema.universityCourseOfferings)
      .innerJoin(
        schema.universitiesComprehensive,
        eq(schema.universityCourseOfferings.universityId, schema.universitiesComprehensive.id)
      )
      .where(
        and(
          eq(schema.universityCourseOfferings.courseId, courseId),
          eq(schema.universityCourseOfferings.isAvailable, true),
          location === "nigeria"
            ? eq(schema.universitiesComprehensive.country, "Nigeria")
            : sql`true`
        )
      )
      .orderBy(sql`${schema.universityCourseOfferings.courseRankingScore} DESC`)
      .limit(10);

    const universities = results.map((r) => ({
      id: r.university.id,
      name: r.university.name,
      country: r.university.country,
      region: r.university.region,
      globalRank: r.university.globalRank,
      countryRank: r.university.countryRank,
      rankingScore: r.university.rankingScore,
      website: r.university.website,
      courseRankingScore: r.offering.courseRankingScore,
      programStrength: r.offering.programStrength,
    }));

    return res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Get all universities
app.get("/api/universities", async (req, res) => {
  try {
    const universities = await db
      .select()
      .from(schema.universitiesComprehensive)
      .orderBy(sql`${schema.universitiesComprehensive.rankingScore} DESC`);

    return res.json(universities);
  } catch (error) {
    console.error("Error fetching universities:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
