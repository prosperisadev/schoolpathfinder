#!/bin/bash
# Test Access Code Validation

echo "🔍 Access Code Validation Tester"
echo "=================================="
echo ""

# Get unused codes from database
echo "📋 Fetching unused codes from database..."
export $(grep -v '^#' .env | xargs)

UNUSED_CODES=$(node -e "
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const unused = await sql\\\`SELECT code FROM access_codes_bank WHERE is_used = false LIMIT 3\\\`;
unused.forEach(row => console.log(row.code));
")

echo "Found unused codes:"
echo "$UNUSED_CODES" | nl
echo ""

# Test first unused code
FIRST_CODE=$(echo "$UNUSED_CODES" | head -1)
echo "🧪 Testing code: $FIRST_CODE"
echo ""

RESPONSE=$(curl -s -X POST https://schoolpathfinder.vercel.app/api/validate-access-code \
  -H "Content-Type: application/json" \
  -d "{\"code\":\"$FIRST_CODE\",\"email\":\"livetest@example.com\"}")

echo "Response:"
echo "$RESPONSE"
echo ""

if echo "$RESPONSE" | grep -q '"valid":true'; then
    echo "✅ Code validation SUCCESSFUL!"
    echo ""
    echo "The code '$FIRST_CODE' has now been used."
    echo "It will expire in 24 hours from now."
else
    echo "❌ Code validation FAILED"
    echo ""
    echo "Error: $(echo "$RESPONSE" | grep -o '"error":"[^"]*"')"
fi

echo ""
echo "=================================="
echo "To test another code, use:"
echo ""
echo "curl -X POST https://schoolpathfinder.vercel.app/api/validate-access-code \\"
echo "  -H \"Content-Type: application/json\" \\"
echo "  -d '{\"code\":\"YOUR_CODE_HERE\",\"email\":\"your@email.com\"}'"
