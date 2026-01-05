import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface VerifyPaymentRequest {
  reference: string;
  sessionId: string;
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { reference, sessionId, email }: VerifyPaymentRequest = await req.json();
    console.log("Verifying payment:", { reference, sessionId, email });

    if (!reference || !sessionId || !email) {
      return new Response(
        JSON.stringify({ error: "Missing reference, sessionId, or email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role for privileged access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // SECURITY: Verify the session belongs to this email BEFORE processing payment
    const { data: existingSession, error: sessionError } = await supabase
      .from("assessment_sessions")
      .select("id, email")
      .eq("id", sessionId)
      .single();

    if (sessionError || !existingSession) {
      console.error("Session not found:", sessionId);
      return new Response(
        JSON.stringify({ error: "Session not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (existingSession.email !== email) {
      console.error("Email mismatch - attempted unauthorized access:", { 
        sessionEmail: existingSession.email, 
        providedEmail: email 
      });
      return new Response(
        JSON.stringify({ error: "Unauthorized - session does not belong to this email" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      console.error("PAYSTACK_SECRET_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Payment verification not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify transaction with Paystack
    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await paystackResponse.json();
    console.log("Paystack verification response:", paystackData);

    if (!paystackData.status || paystackData.data?.status !== "success") {
      return new Response(
        JSON.stringify({ 
          error: "Payment verification failed", 
          details: paystackData.message 
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify amount (₦999 = 99900 kobo)
    if (paystackData.data.amount !== 99900) {
      console.error("Amount mismatch:", paystackData.data.amount);
      return new Response(
        JSON.stringify({ error: "Payment amount mismatch" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Calculate expiry time (24 hours from now)
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    // Update session with payment info
    const { data: session, error: updateError } = await supabase
      .from("assessment_sessions")
      .update({
        payment_status: "paid",
        transaction_reference: reference,
        paid_at: new Date().toISOString(),
        expires_at: expiresAt,
      })
      .eq("id", sessionId)
      .eq("email", email) // Double-check ownership during update
      .select()
      .single();

    if (updateError) {
      console.error("Error updating session:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update session" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Payment verified successfully:", session);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment verified successfully",
        expiresAt,
        email: session.email
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in verify-payment function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
