#!/bin/bash
# Quick test script for deployed application

echo "🧪 Testing School Pathfinder Deployment"
echo "========================================"
echo ""

# Test 1: Health Check
echo "1️⃣  Testing Health Endpoint..."
HEALTH=$(curl -s https://schoolpathfinder.vercel.app/api/health)
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
fi
echo ""

# Test 2: Frontend
echo "2️⃣  Testing Frontend..."
FRONTEND=$(curl -s https://schoolpathfinder.vercel.app/)
if echo "$FRONTEND" | grep -q "School Pathfinder"; then
    echo "✅ Frontend is live"
else
    echo "❌ Frontend failed to load"
fi
echo ""

# Test 3: Access Code Validation
echo "3️⃣  Testing Access Code Validation..."
CODE_TEST=$(curl -s -X POST https://schoolpathfinder.vercel.app/api/validate-access-code \
  -H "Content-Type: application/json" \
  -d '{"code":"UF3FI11VRJJ4","email":"quicktest@example.com"}')
if echo "$CODE_TEST" | grep -q '"valid":true'; then
    echo "✅ Access code validation working"
else
    echo "⚠️  Access code may already be used or invalid"
fi
echo ""

echo "========================================"
echo "🎉 Deployment Test Complete!"
echo ""
echo "Live URL: https://schoolpathfinder.vercel.app"
echo "API Docs: See DEPLOYMENT_SUCCESS.md"
