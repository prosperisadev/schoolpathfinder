// Script to add nigerianAvailable flag to all courses
// This will be used to mark which courses are actually offered in Nigerian universities

export const NIGERIAN_AVAILABLE_COURSES = {
  // ===== VERIFIED NIGERIAN COURSES (from ulearngo.com) =====
  
  // Agriculture
  "agriculture": true,
  "agricultural-science": true,
  "agricultural-economics": true,
  "agricultural-extension": true,
  "agronomy": true,
  "animal-science": true,
  "crop-science": true,
  "food-science": true,
  "fisheries": true,
  "forestry": true,
  "nutrition-dietetics": true,
  "soil-science": true,
  
  // Arts
  "archeology-tourism": true,
  "arabic-islamic-studies": true,
  "christian-religious-studies": true,
  "english": true,
  "fine-arts": true,
  "foreign-languages": true,
  "history": true,
  "international-studies": true,
  "international-relations": true,
  "linguistics": true,
  "mass-communication": true,
  "music": true,
  "theatre-arts": true,
  "film-television": true,
  "fashion-design": true, // Textile and Fashion exists
  
  // Biological Sciences
  "biochemistry": true,
  "botany": true,
  "microbiology": true,
  "marine-biology": true,
  "cell-biology": true,
  "genetics": true,
  "zoology": true,
  
  // Administration/Commercial
  "accounting": true,
  "actuarial-science": true,
  "business-administration": true,
  "business-management": true,
  "banking-finance": true,
  "hospitality-tourism": true,
  "tourism-hospitality": true,
  "marketing": true,
  "insurance": true,
  "industrial-relations": true,
  "human-resource-management": true,
  "finance": true,
  
  // Dentistry
  "dentistry": true,
  "dental-health": true,
  
  // Education
  "education": true,
  "adult-education": true,
  "library-science": true,
  
  // Engineering
  "agricultural-engineering": true,
  "civil-engineering": true,
  "chemical-engineering": true,
  "computer-engineering": true,
  "electrical-engineering": true,
  "electronic-engineering": true,
  "marine-engineering": true,
  "mechanical-engineering": true,
  "metallurgical-engineering": true,
  "petroleum-engineering": true,
  "systems-engineering": true,
  "structural-engineering": true,
  "production-engineering": true,
  "industrial-engineering": true,
  "electrical-electronics-engineering": true,
  
  // Environmental Sciences
  "architecture": true,
  "estate-management": true,
  "quantity-surveying": true,
  "building": true,
  "geoinformatics": true,
  "surveying": true,
  "urban-planning": true,
  "regional-planning": true,
  
  // Health Sciences
  "health-administration": true,
  "medical-laboratory": true,
  "medical-radiography": true,
  "medical-rehabilitation": true,
  "nursing": true,
  "physiotherapy": true,
  
  // Law
  "law": true,
  
  // Medical Sciences
  "anatomy": true,
  "medicine": true,
  "surgery": true,
  "medicine-surgery": true,
  "obstetrics": true,
  "gynecology": true,
  "pediatrics": true,
  "ophthalmology": true,
  "public-health": true,
  
  // Pharmaceutical Sciences
  "pharmacy": true,
  "pharmacology": true,
  
  // Physical Sciences
  "computer-science": true,
  "geology": true,
  "mathematics": true,
  "physics": true,
  "geophysics": true,
  "chemistry": true,
  "statistics": true,
  
  // Social Sciences
  "economics": true,
  "geography": true,
  "philosophy": true,
  "political-science": true,
  "psychology": true,
  "public-administration": true,
  "religion": true,
  "social-work": true,
  "sociology": true,
  "anthropology": true,
  "development-studies": true,
  
  // Veterinary Medicine
  "veterinary-medicine": true,
  
  // Environmental
  "environmental-science": true,
  
  // ===== GLOBAL-ONLY COURSES (NOT offered in Nigerian universities) =====
  "data-science": false,
  "cybersecurity": false,
  "software-engineering": false,
  "artificial-intelligence": false,
  "information-technology": false,
  "biomedical-engineering": false,
  "entrepreneurship": false,
  "graphic-design": false,
  "ai-machine-learning": false,
  "cloud-computing": false,
  "blockchain-web3": false,
  "ux-ui-design": false,
  "product-management": false,
  "game-development": false,
  "health-informatics": false,
  "fintech": false,
  "supply-chain-logistics": false,
  "investment-banking": false,
  "digital-marketing": false,
  "music-production": false,
  "renewable-energy-engineering": false,
  "climate-sustainability": false,
} as const;

console.log("✅ Course availability mapping created");
console.log(`Nigerian-available courses: ${Object.values(NIGERIAN_AVAILABLE_COURSES).filter(v => v === true).length}`);
console.log(`Global-only courses: ${Object.values(NIGERIAN_AVAILABLE_COURSES).filter(v => v === false).length}`);
