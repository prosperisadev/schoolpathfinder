import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ValidateCodeRequest {
  code: string;
  email: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code, email }: ValidateCodeRequest = await req.json();
    console.log("Validating access code for email:", email);

    // Input validation
    if (!code || !email) {
      return new Response(
        JSON.stringify({ valid: false, error: "Missing code or email" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize code - uppercase and trim
    const sanitizedCode = code.toUpperCase().trim();
    if (sanitizedCode.length < 3 || sanitizedCode.length > 50) {
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid code format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Initialize Supabase client with service role key for privileged access
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if code exists (try the new table first, fallback to old)
    let { data: codeData, error: codeError } = await supabase
      .from("access_codes_bank")
      .select("*")
      .eq("code", sanitizedCode)
      .single();

    // Fallback to old table if new one doesn't exist
    if (codeError && codeError.code === "PGRST116") {
      const { data: oldCode, error: oldError } = await supabase
        .from("access_codes")
        .select("*")
        .eq("code", sanitizedCode)
        .single();
      codeData = oldCode;
      codeError = oldError;
    }

    if (codeError || !codeData) {
      console.log("Code not found:", sanitizedCode);
      return new Response(
        JSON.stringify({ valid: false, error: "Invalid access code" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = new Date();

    // Check if code is already used
    if (codeData.is_used) {
      // If used, check if it's within 24 hours and by same email
      if (codeData.used_by_email === email && codeData.expires_at) {
        const expiresAt = new Date(codeData.expires_at);
        if (expiresAt > now) {
          console.log("Code still valid for user:", email);
          return new Response(
            JSON.stringify({ 
              valid: true, 
              expiresAt: codeData.expires_at,
              message: "Access code still valid"
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
      }
      // Code is used by someone else or expired
      console.log("Code already used or expired:", sanitizedCode);
      return new Response(
        JSON.stringify({ valid: false, error: "Access code already used or expired" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Mark code as used (atomic operation with is_used check to prevent race conditions)
    const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

    // Try updating the new table first
    let updateError = null;
    let updatedCode = null;

    ({ error: updateError, data: updatedCode } = await supabase
      .from("access_codes_bank")
      .update({
        is_used: true,
        used_by_email: email,
        used_at: now.toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .eq("id", codeData.id)
      .eq("is_used", false)
      .select()
      .single());

    // Fallback to old table if new one doesn't exist
    if (updateError && updateError.code === "PGRST116") {
      ({ error: updateError, data: updatedCode } = await supabase
        .from("access_codes")
        .update({
          is_used: true,
          used_by_email: email,
          used_at: now.toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .eq("id", codeData.id)
        .eq("is_used", false)
        .select()
        .single());
    }

    if (updateError || !updatedCode) {
      console.error("Failed to mark code as used (possible race condition):", updateError);
      return new Response(
        JSON.stringify({ valid: false, error: "Access code no longer available" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Access code validated successfully:", { code: sanitizedCode, email });

    return new Response(
      JSON.stringify({ 
        valid: true, 
        expiresAt: expiresAt.toISOString(),
        message: "Access code validated successfully"
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in validate-access-code function:", error);
    return new Response(
      JSON.stringify({ valid: false, error: "Server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
