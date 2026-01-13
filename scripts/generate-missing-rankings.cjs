const fs = require('fs');
const path = require('path');

// All 66 courses
const courses = [
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

// Missing African universities with their characteristics
const africanUniversities = [
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    ranking: 94,
    pros: ["Strong research programs", "Wine country location", "Top engineering school", "Bilingual advantage"],
    cons: ["Primarily Afrikaans", "Expensive for internationals", "Rural location", "Language barrier"]
  },
  {
    id: "legon",
    name: "University of Ghana, Legon",
    ranking: 91,
    pros: ["Cultural proximity to Nigeria", "English-speaking", "Affordable tuition", "Growing programs"],
    cons: ["Limited facilities", "Infrastructure challenges", "Fewer resources", "Political instability"]
  },
  {
    id: "makerere",
    name: "Makerere University",
    ranking: 90,
    pros: ["East Africa's top university", "Affordable", "Strong medicine programs", "English-speaking"],
    cons: ["Infrastructure gaps", "Limited resources", "Political challenges", "Basic facilities"]
  },
  {
    id: "cairo",
    name: "Cairo University",
    ranking: 92,
    pros: ["Largest African university", "Rich history", "Strong medicine", "Affordable"],
    cons: ["Language barrier (Arabic)", "Political instability", "Bureaucracy", "Safety concerns"]
  },
  {
    id: "nairobi",
    name: "University of Nairobi",
    ranking: 89,
    pros: ["Leading East African university", "Nairobi tech hub", "Affordable", "Regional network"],
    cons: ["Infrastructure gaps", "Political instability", "Limited resources", "High competition"]
  },
  {
    id: "pretoria",
    name: "University of Pretoria",
    ranking: 93,
    pros: ["Top South African university", "Strong programs", "Research excellence", "Modern facilities"],
    cons: ["Expensive", "Visa challenges", "Safety concerns", "Afrikaans heritage"]
  },
  {
    id: "mauritius",
    name: "University of Mauritius",
    ranking: 87,
    pros: ["Island paradise location", "Safe environment", "English medium", "Growing programs"],
    cons: ["Limited resources", "Small institution", "Expensive living", "Island isolation"]
  },
  {
    id: "addis-ababa",
    name: "Addis Ababa University",
    ranking: 88,
    pros: ["Ethiopia's premier university", "Affordable", "Growing programs", "AU headquarters access"],
    cons: ["Language barriers", "Political instability", "Limited facilities", "Infrastructure challenges"]
  }
];

// Global university - UCL needs completion
const globalUniversity = {
  id: "ucl",
  name: "University College London",
  ranking: 96,
  pros: ["Central London location", "Russell Group excellence", "Global connections", "Diverse programs"],
  cons: ["Very expensive", "High cost of living in London", "Competitive admission", "Weather"]
};

// Generate rankings
let output = '\n\n  // ===== ADDITIONAL AFRICAN UNIVERSITIES =====\n';

courses.forEach(course => {
  output += `\n  // ${course.toUpperCase().replace(/-/g, ' ')} - Additional African Unis\n`;
  
  africanUniversities.forEach(uni => {
    output += `  { universityId: "${uni.id}", courseId: "${course}", ranking: ${uni.ranking}, region: "africa", pros: ${JSON.stringify(uni.pros)}, cons: ${JSON.stringify(uni.cons)} },\n`;
  });
});

output += '\n\n  // ===== UCL GLOBAL UNIVERSITY COMPLETION =====\n';
courses.forEach(course => {
  output += `  { universityId: "${globalUniversity.id}", courseId: "${course}", ranking: ${globalUniversity.ranking}, region: "global", pros: ${JSON.stringify(globalUniversity.pros)}, cons: ${JSON.stringify(globalUniversity.cons)} },\n`;
});

console.log('Generated rankings for:');
console.log(`- 8 African universities × 66 courses = ${8 * 66} rankings`);
console.log(`- 1 Global university × 66 courses = ${66} rankings`);
console.log(`Total: ${(8 * 66) + 66} new ranking entries`);
console.log('\nOutput saved to: missing-rankings-output.txt');

fs.writeFileSync(path.join(__dirname, 'missing-rankings-output.txt'), output);
console.log('\nDone!');
