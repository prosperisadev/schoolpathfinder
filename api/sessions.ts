import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Pool } from "@neondatabase/serverless";

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

  let client;
  try {
    const sessionData = req.body;

    if (!sessionData.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      return res.status(500).json({ error: "Database not configured" });
    }

    const pool = new Pool({ connectionString });
    client = await pool.connect();

    // Build update data - don't include share_token to avoid unique constraint issues
    const updateParams = [
      sessionData.fullName || null,
      sessionData.assessmentData ? JSON.stringify(sessionData.assessmentData) : null,
      sessionData.paymentStatus || 'pending',
      sessionData.transactionReference || null,
      sessionData.paidAt || null,
      sessionData.expiresAt || null,
      sessionData.accessCode || null,
      sessionData.academicTrack || null,
      sessionData.department || null,
      sessionData.waecEstimate || null,
      sessionData.jambEstimate || null,
      sessionData.learningStyle || null,
      sessionData.isShared || false,
      sessionData.shareCreatedAt || null,
      sessionData.recommendations ? JSON.stringify(sessionData.recommendations) : null,
      sessionData.email,
    ];

    // Try update first - don't touch share_token to avoid unique constraint conflicts
    const updateResult = await client.query(
      `UPDATE assessment_sessions SET
        full_name = $1,
        assessment_data = $2,
        payment_status = $3,
        transaction_reference = $4,
        paid_at = $5,
        expires_at = $6,
        access_code = $7,
        academic_track = $8,
        department = $9,
        waec_estimate = $10,
        jamb_estimate = $11,
        learning_style = $12,
        is_shared = $13,
        share_created_at = $14,
        recommendations = $15,
        updated_at = NOW()
      WHERE email = $16
      RETURNING *;`,
      updateParams
    );

    if (updateResult.rows && updateResult.rows.length > 0) {
      // Update succeeded - now try to set share_token if provided and not already set
      if (sessionData.shareToken && !updateResult.rows[0].share_token) {
        try {
          const tokenUpdateResult = await client.query(
            `UPDATE assessment_sessions SET share_token = $1 WHERE email = $2 RETURNING *;`,
            [sessionData.shareToken, sessionData.email]
          );
          client.release();
          return res.json(tokenUpdateResult.rows[0] || updateResult.rows[0]);
        } catch (tokenError) {
          // Token might already exist - just return the existing record
          client.release();
          return res.json(updateResult.rows[0]);
        }
      }
      client.release();
      return res.json(updateResult.rows[0]);
    }

    // If no rows updated, insert new session
    const insertParams = [
      sessionData.email,
      sessionData.fullName || null,
      sessionData.assessmentData ? JSON.stringify(sessionData.assessmentData) : null,
      sessionData.paymentStatus || 'pending',
      sessionData.transactionReference || null,
      sessionData.paidAt || null,
      sessionData.expiresAt || null,
      sessionData.accessCode || null,
      sessionData.shareToken || null,
      sessionData.academicTrack || null,
      sessionData.department || null,
      sessionData.waecEstimate || null,
      sessionData.jambEstimate || null,
      sessionData.learningStyle || null,
      sessionData.isShared || false,
      sessionData.shareCreatedAt || null,
      sessionData.recommendations ? JSON.stringify(sessionData.recommendations) : null,
    ];

    const insertResult = await client.query(
      `INSERT INTO assessment_sessions (
        email, 
        full_name, 
        assessment_data, 
        payment_status, 
        transaction_reference, 
        paid_at, 
        expires_at, 
        access_code, 
        share_token, 
        academic_track, 
        department, 
        waec_estimate, 
        jamb_estimate, 
        learning_style, 
        is_shared, 
        share_created_at, 
        recommendations
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
      )
      RETURNING *;`,
      insertParams
    );

    client.release();

    if (insertResult.rows && insertResult.rows.length > 0) {
      return res.json(insertResult.rows[0]);
    } else {
      return res.status(400).json({ error: "Failed to save session" });
    }
  } catch (error) {
    if (client) client.release();
    console.error("Error saving session:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
