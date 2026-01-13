const fs = require('fs');
const path = require('path');

// Missing rankings for UCT
const uctMissing = ["computer-science", "law", "medicine"];

// Missing rankings for Wits  
const witsMissing = [
  "computer-science", "estate-management", "fashion-design", "film-television", "graphic-design",
  "human-resource-management", "law", "marketing", "mathematics", "medical-laboratory",
  "medicine", "music", "music-production", "nutrition-dietetics", "physics",
  "physiotherapy", "public-administration", "social-work", "statistics", "supply-chain-logistics",
  "theatre-arts"
];

// All 66 courses (for global completions)
const allCourses = [
  "accounting", "agricultural-science", "ai-machine-learning", "architecture", "banking-finance",
  "biochemistry", "biomedical-engineering", "blockchain-web3", "business-administration", "chemical-engineering",
  "civil-engineering", "climate-sustainability", "cloud-computing", "computer-science", "cybersecurity",
  "data-science", "dentistry", "digital-marketing", "economics", "education",
  "electrical-engineering", "entrepreneurship", "environmental-science", "estate-management", "fashion-design",
  "film-television", "finance", "fintech", "game-development", "graphic-design",
  "health-informatics", "human-resource-management", "information-technology", "international-relations", "investment-banking",
  "law", "marketing", "mass-communication", "mathematics", "mechanical-engineering",
  "medical-laboratory", "medicine", "microbiology", "music", "music-production",
  "nursing", "nutrition-dietetics", "petroleum-engineering", "pharmacy", "physics",
  "physiotherapy", "political-science", "product-management", "psychology", "public-administration",
  "public-health", "renewable-energy-engineering", "social-work", "sociology", "software-engineering",
  "statistics", "supply-chain-logistics", "theatre-arts", "tourism-hospitality", "ux-ui-design",
  "veterinary-medicine"
];

// Global universities that need completion (with current counts and needed courses)
const globalCompletions = {
  "cambridge": { current: 14, ranking: 99, pros: ["World-class academics", "College system", "Research excellence", "Gates Cambridge"], cons: ["Highly competitive", "Very expensive", "Intense workload", "Weather"] },
  "stanford": { current: 37, ranking: 99, pros: ["Silicon Valley location", "Innovation culture", "Top programs", "Entrepreneurship"], cons: ["Extremely competitive", "Very expensive", "Intense environment", "Cost of living"] },
  "mit": { current: 32, ranking: 100, pros: ["Best STEM globally", "Innovation hub", "Research excellence", "Career opportunities"], cons: ["Extremely competitive", "Very expensive", "Intense pressure", "Difficult admission"] },
  "oxford": { current: 24, ranking: 99, pros: ["Historic excellence", "Tutorial system", "Global network", "Rhodes Scholarship"], cons: ["Extremely competitive", "Very expensive", "Cultural adjustment", "Cold weather"] },
  "harvard": { current: 20, ranking: 100, pros: ["World's most prestigious", "Unmatched network", "Need-blind", "Diverse opportunities"], cons: ["4% acceptance rate", "Very expensive", "Intense competition", "High pressure"] },
  "toronto": { current: 20, ranking: 96, pros: ["Top Canadian university", "Post-study work visa", "Diverse city", "Research excellence"], cons: ["Cold weather", "High tuition", "Large classes", "Expensive living"] },
  "melbourne": { current: 6, ranking: 97, pros: ["Top Australian university", "Post-study work visa", "Great quality of life", "Research focus"], cons: ["Far from home", "Very expensive", "High cost of living", "Distance"] },
  "eth": { current: 3, ranking: 98, pros: ["Top European tech", "Very affordable tuition", "High quality of life", "Strong STEM"], cons: ["German language", "High cost of living", "Entrance exam", "Cultural adjustment"] },
  "nus": { current: 3, ranking: 97, pros: ["Top Asian university", "Industry links", "Safe environment", "Gateway to Asia"], cons: ["Competitive", "Strict regulations", "Hot climate", "High pressure"] }
};

let output = '\n\n  // ===== COMPLETING UCT AND WITS =====\n';

// Add UCT missing
uctMissing.forEach(course => {
  output += `  { universityId: "uct", courseId: "${course}", ranking: 98, region: "africa", pros: ["Top-ranked in Africa", "World-class research", "Strong partnerships", "High employability"], cons: ["Very expensive", "Competitive admission", "High cost of living", "Visa requirements"] },\n`;
});

// Add Wits missing
witsMissing.forEach(course => {
  output += `  { universityId: "wits", courseId: "${course}", ranking: 96, region: "africa", pros: ["Excellent research", "Industry links", "Modern facilities", "Urban location"], cons: ["High tuition", "Safety concerns", "Competitive entry", "Expensive living"] },\n`;
});

output += '\n\n  // ===== COMPLETING GLOBAL UNIVERSITIES =====\n';

// For each global university, find missing courses and add them
Object.entries(globalCompletions).forEach(([uniId, data]) => {
  output += `\n  // ${uniId.toUpperCase()} Completions\n`;
  
  allCourses.forEach(course => {
    output += `  { universityId: "${uniId}", courseId: "${course}", ranking: ${data.ranking}, region: "global", pros: ${JSON.stringify(data.pros)}, cons: ${JSON.stringify(data.cons)} },\n`;
  });
});

const totalNew = uctMissing.length + witsMissing.length + (Object.keys(globalCompletions).length * 66);
console.log('Generated completions:');
console.log(`- UCT: ${uctMissing.length} rankings`);
console.log(`- Wits: ${witsMissing.length} rankings`);
console.log(`- 9 Global universities × 66 courses = ${9 * 66} rankings`);
console.log(`Total: ${totalNew} new ranking entries`);
console.log('\nNote: This will create duplicates that need to be deduplicated');
console.log('Output saved to: completion-rankings-output.txt');

fs.writeFileSync(path.join(__dirname, 'completion-rankings-output.txt'), output);
console.log('\nDone!');
