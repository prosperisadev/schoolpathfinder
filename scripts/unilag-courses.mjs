import { allCourses } from "../src/data/courses.js";

// List from UNILAG website
const unilagCourses = [
  "Accountancy / Accounting",
  "Actuarial Science",
  "Adult Education",
  "Architecture",
  "Banking and Finance",
  "Biochemistry",
  "Biology",
  "Biomedical Engineering",
  "Botany",
  "Building",
  "Business Administration",
  "Business Education",
  "Cell Biology and Genetics",
  "Chemical Engineering",
  "Chemistry",
  "Chinese Studies",
  "Christian Religious Knowledge / Studies",
  "Civil Engineering",
  "Computer Engineering",
  "Computer Science",
  "Creative Arts",
  "Dentistry And Dental Surgery",
  "Early Childhood Education",
  "Economics",
  "Education and Biology",
  "Education and Chemistry",
  "Education and Christian Religious Studies",
  "Education and Economics",
  "Education and English Language",
  "Education and French",
  "Education and Geography",
  "Education and History",
  "Education and Igbo",
  "Education and Integrated Science",
  "Education and Islamic Studies",
  "Education and Mathematics",
  "Education and Physics",
  "Education and Yoruba",
  "Educational Administration",
  "Electrical / Electronics Engineering",
  "English Language",
  "Estate Management",
  "Finance",
  "Fisheries",
  "Fisheries Management",
  "French",
  "Geography",
  "Geology",
  "Geophysics",
  "Guidance and Counseling",
  "Health Education",
  "History and Strategic Studies",
  "Home Economics and Education",
  "Human Kinetics",
  "Igbo",
  "Industrial Chemistry",
  "Industrial Mathematics",
  "Industrial Relations and Personnel Management",
  "Insurance",
  "Islamic Studies",
  "Law",
  "Linguistics, Igbo and other African Languages",
  "Marine Biology",
  "Mass Communication",
  "Mathematics",
  "Mechanical Engineering",
  "Medical Laboratory Science",
  "Medicine and Surgery",
  "Metallurgical and Material Engineering",
  "Microbiology",
  "Nursing / Nursing Science",
  "Petroleum and Gas Engineering",
  "Pharmacology",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Physiology",
  "Physiotherapy",
  "Political Science",
  "Psychology",
  "Quantity Surveying",
  "Radiography",
  "Russian with French / German",
  "Russian",
  "Social Works",
  "Sociology",
  "Statistics",
  "Surveying And Geoinformatics",
  "Systems Engineering",
  "Teacher Education Science",
  "Technical Education",
  "Urban and Regional Planning",
  "Yoruba",
  "Zoology",
  "Christian Religious Studies (CRS)",
  "Meteorology and Climate Change",
];

// Normalize course names for comparison
function normalizeName(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[/&]/g, "-")
    .replace(/-+/g, "-");
}

// Get existing course IDs
const existingCourseIds = new Set(allCourses.map(c => c.id));

// Normalize UNILAG courses
const normalizedUnilag = unilagCourses.map((c) => ({
  original: c,
  normalized: normalizeName(c),
}));

// Find new courses
const newCourses = normalizedUnilag.filter(c => !existingCourseIds.has(c.normalized));

console.log("==========================================");
console.log("📊 UNILAG COURSE ANALYSIS");
console.log("==========================================\n");
console.log(`Total UNILAG courses: ${unilagCourses.length}`);
console.log(`Existing Pathfinder courses: ${allCourses.length}`);
console.log(`\n✅ NEW COURSES TO ADD: ${newCourses.length}\n`);

if (newCourses.length > 0) {
  console.log("New courses found:\n");
  newCourses.forEach((c, idx) => {
    console.log(`${idx + 1}. "${c.normalized}" (from: "${c.original}")`);
  });
} else {
  console.log("No new courses - all UNILAG courses already exist in Pathfinder!");
}

console.log("\n==========================================");
console.log("Courses already in system:");
console.log("==========================================\n");
const existing = normalizedUnilag.filter(c => existingCourseIds.has(c.normalized));
console.log(`${existing.length} courses match:\n`);
existing.forEach((c) => {
  console.log(`  ✓ ${c.normalized}`);
});
