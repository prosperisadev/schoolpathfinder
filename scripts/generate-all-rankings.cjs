const fs = require('fs');
const path = require('path');

// Read universities data
const universitiesPath = path.join(__dirname, '..', 'src', 'data', 'universities.ts');
const universitiesContent = fs.readFileSync(universitiesPath, 'utf-8');

// Read existing rankings to avoid duplicates
const rankingsPath = path.join(__dirname, '..', 'src', 'data', 'universityRankings.ts');
const existingRankings = fs.readFileSync(rankingsPath, 'utf-8');

// Extract existing university-course combinations
const existingCombos = new Set();
const existingMatches = existingRankings.matchAll(/universityId: "([^"]+)",\s*courseId: "([^"]+)"/g);
for (const match of existingMatches) {
  existingCombos.add(`${match[1]}-${match[2]}`);
}

// Extract Nigerian universities from universities.ts
const nigerianUniversities = [];
const universityMatches = universitiesContent.matchAll(/"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)",\s*"location":\s*"nigeria"/g);
for (const match of universityMatches) {
  nigerianUniversities.push({ id: match[1], name: match[2] });
}

console.log(`Found ${nigerianUniversities.length} Nigerian universities`);
console.log(`Existing combinations: ${existingCombos.size}`);

// Common courses offered by most Nigerian universities
const commonCourses = {
  // Science & Engineering (Federal & State universities typically offer these)
  federal: [
    "computer-science", "mathematics", "physics", "chemistry", "biochemistry", 
    "microbiology", "electrical-engineering", "mechanical-engineering", "civil-engineering",
    "chemical-engineering", "medicine", "nursing", "pharmacy", "medical-laboratory"
  ],
  
  // Arts & Social Sciences (Most universities)
  social: [
    "economics", "accounting", "business-administration", "law", "mass-communication",
    "political-science", "sociology", "psychology", "education", "english", "history"
  ],
  
  // Private universities (broader offerings)
  private: [
    "computer-science", "business-administration", "accounting", "economics", "law",
    "mass-communication", "international-relations", "finance", "marketing",
    "information-technology"
  ],
  
  // Tech-focused universities
  tech: [
    "computer-science", "information-technology", "software-engineering", "data-science",
    "cybersecurity", "electrical-engineering", "mechanical-engineering", "civil-engineering",
    "petroleum-engineering", "chemical-engineering", "mathematics", "physics"
  ],
  
  // Agriculture universities
  agriculture: [
    "agricultural-science", "environmental-science", "veterinary-medicine", 
    "biochemistry", "microbiology", "chemistry"
  ]
};

// Determine university type and courses
function getUniversityType(id, name) {
  const nameLower = name.toLowerCase();
  
  if (nameLower.includes('technology')) return 'tech';
  if (nameLower.includes('agriculture')) return 'agriculture';
  if (id.startsWith('fu') && !id.includes('agriculture')) return 'federal';
  if (['cu', 'pau', 'aun', 'abuad', 'aust', 'baze'].includes(id)) return 'private';
  
  return 'federal'; // Default
}

function getCoursesForUniversity(type) {
  switch(type) {
    case 'tech':
      return [...commonCourses.tech, ...commonCourses.social.slice(0, 5)];
    case 'agriculture':
      return [...commonCourses.agriculture, ...commonCourses.social.slice(0, 4)];
    case 'private':
      return [...commonCourses.private, 'architecture', 'human-resource-management'];
    default:
      return [...commonCourses.federal, ...commonCourses.social];
  }
}

// Pros/cons templates based on university type
const templates = {
  federal: {
    pros: [
      "Affordable tuition",
      "Federal government backing", 
      "Established programs",
      "Wide course offerings"
    ],
    cons: [
      "Potential strikes",
      "Large class sizes",
      "Infrastructure challenges",
      "Occasional funding issues"
    ]
  },
  
  state: {
    pros: [
      "Affordable tuition",
      "State government support",
      "Growing programs",
      "Local community ties"
    ],
    cons: [
      "Limited funding",
      "Occasional strikes",
      "Smaller facilities",
      "Newer institution"
    ]
  },
  
  private: {
    pros: [
      "Modern facilities",
      "No strikes",
      "Smaller class sizes",
      "Industry partnerships"
    ],
    cons: [
      "High tuition fees",
      "Limited scholarships",
      "Strict rules",
      "Newer programs"
    ]
  },
  
  tech: {
    pros: [
      "Specialized tech labs",
      "Strong engineering focus",
      "Technical expertise",
      "Industry connections"
    ],
    cons: [
      "Limited arts programs",
      "Competitive admissions",
      "Focused curriculum",
      "Limited campus life"
    ]
  }
};

// Specific universities that need special handling
const specialUniversities = {
  'pau': {
    courses: ['computer-science', 'mechatronics-engineering', 'digital-media', 'economics', 'law', 
              'accounting', 'business-administration', 'mass-communication', 'international-relations'],
    ranking: 88,
    pros: ["Modern facilities", "No strikes", "Strong industry links (Lagos)", "Premium education quality"],
    cons: ["Very high tuition", "Strict rules", "Limited scholarships", "Small campus"]
  },
  'aun': {
    courses: ['computer-science', 'business-administration', 'international-relations', 'petroleum-engineering',
              'architecture', 'economics', 'law', 'mass-communication'],
    ranking: 90,
    pros: ["American curriculum", "Modern facilities", "International exposure", "No strikes"],
    cons: ["Extremely high tuition", "Yola location", "Limited programs", "Expensive living"]
  },
  'cu': {
    ranking: 96
  },
  'futo': {
    courses: [...commonCourses.tech],
    ranking: 87,
    pros: ["Strong engineering", "Tech-focused labs", "SIWES programs", "Industry partnerships"],
    cons: ["Rural location (Owerri)", "Limited arts courses", "Occasional strikes", "Infrastructure needs"]
  }
};

// Generate rankings
let output = '\n\n  // ===== AUTO-GENERATED RANKINGS FOR ALL NIGERIAN UNIVERSITIES =====\n';
let count = 0;

for (const uni of nigerianUniversities) {
  // Skip if already has extensive rankings (>10 courses)
  const existingCount = Array.from(existingCombos).filter(c => c.startsWith(`${uni.id}-`)).length;
  if (existingCount > 10) {
    console.log(`Skipping ${uni.id} (already has ${existingCount} courses)`);
    continue;
  }
  
  const type = getUniversityType(uni.id, uni.name);
  const special = specialUniversities[uni.id];
  
  const courses = special?.courses || getCoursesForUniversity(type);
  const baseRanking = special?.ranking || (type === 'private' ? 85 : type === 'tech' ? 83 : 80);
  const template = special || templates[type] || templates.federal;
  
  output += `\n  // ${uni.name.toUpperCase()}\n`;
  
  for (const courseId of courses) {
    const combo = `${uni.id}-${courseId}`;
    if (existingCombos.has(combo)) continue;
    
    // Add some variation to rankings
    const ranking = baseRanking + Math.floor(Math.random() * 8) - 4;
    
    output += `  { universityId: "${uni.id}", courseId: "${courseId}", ranking: ${ranking}, region: "nigeria", pros: ${JSON.stringify(template.pros)}, cons: ${JSON.stringify(template.cons)} },\n`;
    count++;
  }
}

output += `\n  // ===== END AUTO-GENERATED (${count} new entries) =====\n`;

console.log(`\n✅ Generated ${count} new ranking entries`);
console.log('\nTo add these to universityRankings.ts:');
console.log('1. Open src/data/universityRankings.ts');
console.log('2. Find the end of UNIVERSITY_COURSE_RANKINGS array (before the closing ];)');
console.log('3. Paste the generated rankings\n');

// Write to output file
const outputPath = path.join(__dirname, 'generated-rankings-output.ts');
fs.writeFileSync(outputPath, output);
console.log(`Output written to: ${outputPath}\n`);
