/**
 * Final verification that all mappings are correct
 */

const fs = require('fs');
const path = require('path');

// Read the mapping file
const mappingPath = path.join(__dirname, '..', 'src', 'data', 'courseUniversityMapping.ts');
const mappingContent = fs.readFileSync(mappingPath, 'utf8');

// Key verifications
const tests = [
  {
    name: 'PAU in Computer Science',
    course: 'computer-science',
    university: 'pau',
    shouldExist: true
  },
  {
    name: 'CU in Computer Science',
    course: 'computer-science',
    university: 'cu',
    shouldExist: true
  },
  {
    name: 'UNILAG in Law',
    course: 'law',
    university: 'unilag',
    shouldExist: true
  },
  {
    name: 'UNILAG in Medicine',
    course: 'medicine',
    university: 'unilag',
    shouldExist: true
  },
  {
    name: 'PAU in Mechatronics',
    course: 'mechatronics-engineering',
    university: 'pau',
    shouldExist: true
  },
  {
    name: 'PAU in Digital Media',
    course: 'digital-media',
    university: 'pau',
    shouldExist: true
  }
];

console.log('=== FINAL MAPPING VERIFICATION ===\n');

let allPassed = true;

tests.forEach(test => {
  // Extract the specific course mapping
  const courseRegex = new RegExp(`courseId: "${test.course}",[\\s\\S]*?nigerianUniversityIds: \\[([^\\]]+)\\]`, 'm');
  const match = mappingContent.match(courseRegex);
  
  if (!match) {
    console.log(`❌ ${test.name}: Course '${test.course}' not found in mappings`);
    allPassed = false;
    return;
  }
  
  const universities = match[1];
  const exists = universities.includes(`"${test.university}"`);
  
  if (exists === test.shouldExist) {
    console.log(`✅ ${test.name}: PASSED`);
  } else {
    console.log(`❌ ${test.name}: FAILED (expected ${test.shouldExist ? 'to exist' : 'not to exist'})`);
    allPassed = false;
  }
});

console.log('\n=== STATISTICS ===');

// Count total mappings
const mappingMatches = mappingContent.match(/courseId: "/g);
console.log(`Total course mappings: ${mappingMatches ? mappingMatches.length : 0}`);

// Count computer science universities
const csMatch = mappingContent.match(/courseId: "computer-science",[\s\S]*?nigerianUniversityIds: \[([^\]]+)\]/m);
if (csMatch) {
  const csUniversities = csMatch[1].split(',').filter(u => u.trim().startsWith('"'));
  console.log(`Computer Science: ${csUniversities.length} Nigerian universities`);
}

// Count law universities  
const lawMatch = mappingContent.match(/courseId: "law",[\s\S]*?nigerianUniversityIds: \[([^\]]+)\]/m);
if (lawMatch) {
  const lawUniversities = lawMatch[1].split(',').filter(u => u.trim().startsWith('"'));
  console.log(`Law: ${lawUniversities.length} Nigerian universities`);
}

console.log('\n=== RESULT ===');
if (allPassed) {
  console.log('✅ ALL TESTS PASSED - Mappings are correct!');
  process.exit(0);
} else {
  console.log('❌ SOME TESTS FAILED - Check mappings');
  process.exit(1);
}
