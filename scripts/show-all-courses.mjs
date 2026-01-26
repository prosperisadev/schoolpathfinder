import { allCourses } from "../src/data/courses.js";

console.log("🎓 TOTAL HARDCODED COURSES: " + allCourses.length);
console.log("=====================================\n");

// Group by category
const byCategory = {};
allCourses.forEach((c) => {
  if (!byCategory[c.category]) byCategory[c.category] = [];
  byCategory[c.category].push(c);
});

// Sort categories by count
const sortedCategories = Object.entries(byCategory).sort((a, b) => b[1].length - a[1].length);

sortedCategories.forEach(([category, courses]) => {
  console.log(`\n📚 ${category.toUpperCase()} (${courses.length} courses)`);
  console.log("-".repeat(50));
  courses.forEach((c) => {
    const nigerianFlag = c.nigerianAvailable ? "🇳🇬" : "🌍";
    console.log(`  ${nigerianFlag} ${c.name}`);
  });
});

console.log("\n=====================================");
console.log(`✅ Total: ${allCourses.length} courses\n`);

// Summary
console.log("\nCATEGORY SUMMARY:");
sortedCategories.forEach(([category, courses]) => {
  console.log(`  ${category}: ${courses.length}`);
});
