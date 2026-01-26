#!/bin/bash

echo "��� FINAL VERIFICATION CHECKLIST"
echo "=============================="
echo ""

# 1. Check file syntax
echo "1️⃣  TypeScript Syntax Check..."
if npx tsx -e "import { additionalCourses } from './src/data/additionalCourses'" 2>/dev/null; then
  echo "   ✅ additionalCourses.ts - Valid syntax"
else
  echo "   ❌ additionalCourses.ts - Syntax error"
fi

# 2. Check landing page
echo ""
echo "2️⃣  Landing Page Updates..."
if grep -q '153' src/pages/Landing.tsx; then
  echo "   ✅ Course count updated to 153"
else
  echo "   ❌ Course count not updated"
fi

# 3. Check API fixes
echo ""
echo "3️⃣  API TopCourse Extraction..."
if grep -q "topRec?.course?.title || topRec?.course?.id" api/save-assessment-result.ts; then
  echo "   ✅ Multiple fallback formats supported"
else
  echo "   ❌ API fix not applied"
fi

# 4. Check category consolidation
echo ""
echo "4️⃣  Category Consolidation..."
SCIENCE=$(grep -c 'category: "Science"' src/data/additionalCourses.ts)
HEALTH=$(grep -c 'category: "Health"' src/data/additionalCourses.ts)
GOVERNANCE=$(grep -c 'category: "Social & Governance"' src/data/additionalCourses.ts)

if [ $SCIENCE -gt 0 ] && [ $HEALTH -gt 0 ] && [ $GOVERNANCE -gt 0 ]; then
  echo "   ✅ Science: $SCIENCE, Health: $HEALTH, Social & Governance: $GOVERNANCE"
else
  echo "   ❌ Categories not properly consolidated"
fi

# 5. Check for fragmented categories
echo ""
echo "5️⃣  Fragmented Categories Removed..."
FRAGMENTED=0
grep -q 'category: "Science & Research"' src/data/additionalCourses.ts && ((FRAGMENTED++))
grep -q 'category: "Health & Medicine"' src/data/additionalCourses.ts && ((FRAGMENTED++))
grep -q 'category: "Media & Creative"' src/data/additionalCourses.ts && ((FRAGMENTED++))

if [ $FRAGMENTED -eq 0 ]; then
  echo "   ✅ All fragmented categories consolidated"
else
  echo "   ❌ Found $FRAGMENTED fragmented categories"
fi

# 6. Check build output
echo ""
echo "6️⃣  Build Output..."
if [ -f "dist/index.html" ]; then
  SIZE=$(du -h dist/index.html | cut -f1)
  echo "   ✅ dist/index.html ($SIZE)"
fi

if ls dist/assets/*.css &> /dev/null; then
  echo "   ✅ CSS bundle generated"
fi

if ls dist/assets/*.js &> /dev/null; then
  echo "   ✅ JS bundle generated"
fi

# 7. Check deployment
echo ""
echo "7️⃣  Deployment Status..."
if grep -q "schoolpathfinder.*vercel.app" <<< "$(vercel --help 2>&1 || echo 'deployed')"; then
  echo "   ✅ Deployed to Vercel"
else
  echo "   ℹ️  Check Vercel dashboard for deployment status"
fi

echo ""
echo "=============================="
echo "✅ VERIFICATION COMPLETE"
echo "=============================="
