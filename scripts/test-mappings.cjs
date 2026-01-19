const fs = require('fs');
const path = require('path');

console.log('=== UNIVERSITY-COURSE MAPPING TEST ===\n');

// Read the rankings file
const rankingsPath = path.join(__dirname, '..', 'src', 'data', 'universityRankings.ts');
const rankingsContent = fs.readFileSync(rankingsPath, 'utf-8');

// Test universities
const testUniversities = [
  { id: 'pau', name: 'Pan-Atlantic University', expectedCourses: ['computer-science', 'mechatronics-engineering', 'digital-media'] },
  { id: 'futo', name: 'Federal University of Technology Owerri', expectedCourses: ['computer-science', 'electrical-engineering'] },
  { id: 'aun', name: 'American University of Nigeria', expectedCourses: ['computer-science', 'law'] },
  { id: 'cu', name: 'Covenant University', expectedCourses: ['computer-science', 'software-engineering'] },
  { id: 'unilag', name: 'University of Lagos', expectedCourses: ['computer-science', 'law', 'medicine'] }
];

console.log('Testing course mappings for key universities:\n');

for (const uni of testUniversities) {
  const regex = new RegExp(`universityId: "${uni.id}", courseId: "([^"]+)"`, 'g');
  const matches = [...rankingsContent.matchAll(regex)];
  const courses = matches.map(m => m[1]);
  
  console.log(`${uni.name} (${uni.id}):`);
  console.log(`  - Total courses mapped: ${courses.length}`);
  console.log(`  - Sample courses: ${courses.slice(0, 5).join(', ')}`);
  
  // Check if expected courses are present
  const missing = uni.expectedCourses.filter(c => !courses.includes(c));
  if (missing.length > 0) {
    console.log(`  ❌ MISSING: ${missing.join(', ')}`);
  } else {
    console.log(`  ✅ All expected courses mapped`);
  }
  console.log('');
}

// Count total mappings per region
const nigerianMappings = (rankingsContent.match(/region: "nigeria"/g) || []).length;
const africanMappings = (rankingsContent.match(/region: "africa"/g) || []).length;
const globalMappings = (rankingsContent.match(/region: "global"/g) || []).length;

console.log('=== OVERALL STATISTICS ===');
console.log(`Nigerian university-course mappings: ${nigerianMappings}`);
console.log(`African university-course mappings: ${africanMappings}`);
console.log(`Global university-course mappings: ${globalMappings}`);
console.log(`Total mappings: ${nigerianMappings + africanMappings + globalMappings}`);

// Test course mappings file
const mappingsPath = path.join(__dirname, '..', 'src', 'data', 'courseUniversityMapping.ts');
const mappingsContent = fs.readFileSync(mappingsPath, 'utf-8');

console.log('\n=== COURSE MAPPING FILE TEST ===');
const testCourses = ['computer-science', 'mechatronics-engineering', 'digital-media'];

for (const course of testCourses) {
  const regex = new RegExp(`courseId: "${course}",[\\s\\S]*?nigerianUniversityIds: \\[([^\\]]+)\\]`, 'm');
  const match = mappingsContent.match(regex);
  
  if (match) {
    const universities = match[1].split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s);
    console.log(`\n${course}:`);
    console.log(`  - Nigerian universities: ${universities.length}`);
    console.log(`  - Sample: ${universities.slice(0, 10).join(', ')}`);
    
    if (course === 'mechatronics-engineering' && universities.includes('pau')) {
      console.log('  ✅ PAU correctly mapped to mechatronics-engineering');
    }
    if (course === 'digital-media' && universities.includes('pau')) {
      console.log('  ✅ PAU correctly mapped to digital-media');
    }
    if (course === 'computer-science' && universities.includes('pau')) {
      console.log('  ✅ PAU correctly mapped to computer-science');
    }
  } else {
    console.log(`\n${course}: ❌ NOT FOUND IN MAPPINGS`);
  }
}

console.log('\n=== TEST COMPLETE ===');
