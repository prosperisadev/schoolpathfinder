const fs = require('fs');
const path = require('path');

// Read universityRankings.ts to extract all course-university mappings
const rankingsPath = path.join(__dirname, '..', 'src', 'data', 'universityRankings.ts');
const rankingsContent = fs.readFileSync(rankingsPath, 'utf-8');

// Extract all ranking entries
const courseUniversityMap = new Map();

const regex = /\{\s*universityId:\s*"([^"]+)",\s*courseId:\s*"([^"]+)",\s*ranking:\s*\d+,\s*region:\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(rankingsContent)) !== null) {
  const [_, universityId, courseId, region] = match;
  
  if (!courseUniversityMap.has(courseId)) {
    courseUniversityMap.set(courseId, {
      nigerianUniversityIds: [],
      africanUniversityIds: [],
      globalUniversityIds: []
    });
  }
  
  const mapping = courseUniversityMap.get(courseId);
  
  if (region === 'nigeria' && !mapping.nigerianUniversityIds.includes(universityId)) {
    mapping.nigerianUniversityIds.push(universityId);
  } else if (region === 'africa' && !mapping.africanUniversityIds.includes(universityId)) {
    mapping.africanUniversityIds.push(universityId);
  } else if (region === 'global' && !mapping.globalUniversityIds.includes(universityId)) {
    mapping.globalUniversityIds.push(universityId);
  }
}

console.log(`Found ${courseUniversityMap.size} unique courses`);

// Generate the courseUniversityMapping structure
let output = `// Auto-generated from universityRankings.ts
import { CourseUniversityMapping } from "./courseUniversityMapping.types";

export const courseUniversityMappings: CourseUniversityMapping[] = [
`;

// Sort courses alphabetically
const sortedCourses = Array.from(courseUniversityMap.keys()).sort();

for (const courseId of sortedCourses) {
  const mapping = courseUniversityMap.get(courseId);
  
  output += `  {\n`;
  output += `    courseId: "${courseId}",\n`;
  output += `    nigerianUniversityIds: [${mapping.nigerianUniversityIds.map(id => `"${id}"`).join(', ')}],\n`;
  output += `    africanUniversityIds: [${mapping.africanUniversityIds.map(id => `"${id}"`).join(', ')}],\n`;
  output += `    globalUniversityIds: [${mapping.globalUniversityIds.map(id => `"${id}"`).join(', ')}]\n`;
  output += `  },\n`;
  
  console.log(`${courseId}: ${mapping.nigerianUniversityIds.length} Nigerian, ${mapping.africanUniversityIds.length} African, ${mapping.globalUniversityIds.length} Global`);
}

output += `];\n`;

// Write output
const outputPath = path.join(__dirname, 'generated-course-mappings.ts');
fs.writeFileSync(outputPath, output);

console.log(`\n✅ Generated mappings for ${courseUniversityMap.size} courses`);
console.log(`Output: ${outputPath}\n`);

// Also show stats for PAU
const courses = sortedCourses.filter(c => {
  const mapping = courseUniversityMap.get(c);
  return mapping.nigerianUniversityIds.includes('pau');
});

console.log(`PAU is mapped to ${courses.length} courses:`);
console.log(courses.join(', '));
