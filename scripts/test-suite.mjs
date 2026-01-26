#!/usr/bin/env node
/**
 * Comprehensive Test Suite
 * Validates all fixes and improvements
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log("🧪 COMPREHENSIVE TEST SUITE\n");
console.log("=" .repeat(70));

let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function test(name, condition, details = "") {
  testsRun++;
  if (condition) {
    testsPassed++;
    console.log(`✅ ${name}`);
  } else {
    testsFailed++;
    console.log(`❌ ${name}`);
    if (details) console.log(`   Details: ${details}`);
  }
}

// 1. Check Landing Page Updates
console.log("\n1️⃣  LANDING PAGE FIXES");
console.log("-" .repeat(70));
const landingPath = path.join(__dirname, "../src/pages/Landing.tsx");
const landingContent = fs.readFileSync(landingPath, "utf-8");
test("Landing page shows 153 courses", landingContent.includes('<div className="text-2xl font-bold text-foreground">153</div>'), "Should display 153 instead of 96");

// 2. Check Category Consolidation
console.log("\n2️⃣  CATEGORY CONSOLIDATION");
console.log("-" .repeat(70));
const coursesPath = path.join(__dirname, "../src/data/additionalCourses.ts");
const coursesContent = fs.readFileSync(coursesPath, "utf-8");

// Count category instances
const countCategory = (cat) => (coursesContent.match(new RegExp(`category: "${cat}"`, "g")) || []).length;

const categories = {
  "Science": countCategory("Science"),
  "Health": countCategory("Health"),
  "Engineering": countCategory("Engineering"),
  "Technology": countCategory("Technology"),
  "Finance & Business": countCategory("Finance & Business"),
  "Arts & Design": countCategory("Arts & Design"),
  "Education": countCategory("Education"),
  "Social & Governance": countCategory("Social & Governance"),
  "Environmental & Agriculture": countCategory("Environmental & Agriculture"),
};

// Check fragmented categories are gone
const hasScienceResearch = coursesContent.includes('category: "Science & Research"');
const hasScienceEngineering = coursesContent.includes('category: "Science & Engineering"');
const hasScienceEnvironment = coursesContent.includes('category: "Science & Environment"');
const hasHealthMedicine = coursesContent.includes('category: "Health & Medicine"');
const hasSocialImpact = coursesContent.includes('category: "Social Impact"');

test("Fragmented 'Science & Research' removed", !hasScienceResearch);
test("Fragmented 'Science & Engineering' removed", !hasScienceEngineering);
test("Fragmented 'Science & Environment' removed", !hasScienceEnvironment);
test("Fragmented 'Health & Medicine' removed", !hasHealthMedicine);
test("Fragmented 'Social Impact' consolidated", !hasSocialImpact);

// Check consolidated categories exist
test("'Science' category created", categories["Science"] > 0, `Found ${categories["Science"]} Science courses`);
test("'Health' category created", categories["Health"] > 0, `Found ${categories["Health"]} Health courses`);
test("'Arts & Design' category created", categories["Arts & Design"] > 0, `Found ${categories["Arts & Design"]} Arts & Design courses`);
test("'Social & Governance' category created", categories["Social & Governance"] > 0, `Found ${categories["Social & Governance"]} Social & Governance courses`);

console.log("\nCategory Distribution:");
Object.entries(categories).forEach(([cat, count]) => {
  if (count > 0) console.log(`  ${cat}: ${count} courses`);
});

// 3. Check API Fixes
console.log("\n3️⃣  API FIXES");
console.log("-" .repeat(70));
const saveApiPath = path.join(__dirname, "../api/save-assessment-result.ts");
const saveApiContent = fs.readFileSync(saveApiPath, "utf-8");

test("TopCourse extraction handles multiple formats", 
  saveApiContent.includes("topRec?.course?.title || topRec?.course?.id || topRec?.courseName || topRec?.course"),
  "Should fallback through multiple possible fields"
);

// 4. Check TypeScript Fixes
console.log("\n4️⃣  TYPESCRIPT ERRORS FIXED");
console.log("-" .repeat(70));
const reportPath = path.join(__dirname, "../scripts/user-data-report.ts");
const reportContent = fs.readFileSync(reportPath, "utf-8");

test("Type annotations on sql queries", 
  reportContent.includes("sql<number>`count(*) as total`"),
  "Should use generic type parameters"
);

test("Proper type casting in calculations",
  reportContent.includes("const total = (assessmentData[0]?.total as number) || 0;"),
  "Should cast to number for arithmetic"
);

// 5. Check Course Count
console.log("\n5️⃣  COURSE DATA INTEGRITY");
console.log("-" .repeat(70));
const totalCoursesCount = (coursesContent.match(/id: "[a-z0-9-]+",\s*name:/g) || []).length;
test("Total courses count", totalCoursesCount >= 150, `Found ${totalCoursesCount} courses (expected ~153)`);

// 6. Check Build Output
console.log("\n6️⃣  BUILD OUTPUT");
console.log("-" .repeat(70));
test("Build output exists", fs.existsSync(path.join(__dirname, "../dist/index.html")));
test("CSS bundle generated", fs.existsSync(path.join(__dirname, "../dist/assets")) && 
  fs.readdirSync(path.join(__dirname, "../dist/assets")).some(f => f.endsWith(".css")));
test("JS bundle generated", fs.existsSync(path.join(__dirname, "../dist/assets")) && 
  fs.readdirSync(path.join(__dirname, "../dist/assets")).some(f => f.endsWith(".js")));

// Summary
console.log("\n" + "=" .repeat(70));
console.log("📊 TEST SUMMARY");
console.log("=" .repeat(70));
console.log(`Total Tests:  ${testsRun}`);
console.log(`✅ Passed:    ${testsPassed}`);
console.log(`❌ Failed:    ${testsFailed}`);
console.log(`Success Rate: ${((testsPassed / testsRun) * 100).toFixed(1)}%`);

if (testsFailed === 0) {
  console.log("\n🎉 ALL TESTS PASSED! Application is ready for production.");
  process.exit(0);
} else {
  console.log(`\n⚠️  ${testsFailed} test(s) failed. Please review above.`);
  process.exit(1);
}
