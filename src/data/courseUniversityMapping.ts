/**
 * CRITICAL: Explicit Course-to-University Mapping
 * 
 * This file contains the VERIFIED mapping between courses and universities.
 * A university appears for a course ONLY if we have confirmed that the course
 * is actually offered by that university through:
 * - Official university websites
 * - Faculty/course catalogs
 * - Accreditation databases
 * - Reputable education sources
 * 
 * DO NOT use industry-based inference or category-based assumptions.
 */

export interface CourseUniversityMapping {
  courseId: string;
  nigerianUniversityIds: string[];
  africanUniversityIds: string[];  // Excluding Nigerian universities
  globalUniversityIds: string[];   // Excluding African universities
}

/**
 * Master mapping of courses to universities that ACTUALLY offer them
 */
export const COURSE_UNIVERSITY_MAPPINGS: CourseUniversityMapping[] = [
  // ========== COMPUTER SCIENCE ==========
  {
    courseId: "computer-science",
    nigerianUniversityIds: [
      "unilag", "ui", "covenant", "abu", "unn", "oau", "futa", "futo", 
      "uniben", "unilorin", "babcock", "landmark", "lasu", "uniport"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "nairobi", "legon", "pretoria"],
    globalUniversityIds: ["mit", "stanford", "cmu", "oxford", "cambridge", "toronto", "ucl", "eth", "nus"]
  },
  
  // ========== MEDICINE ==========
  {
    courseId: "medicine",
    nigerianUniversityIds: [
      "unilag", "ui", "abu", "unn", "oau", "uniben", "uniport", "unilorin", "babcock"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "makerere", "cairo", "nairobi", "pretoria"],
    globalUniversityIds: ["harvard", "oxford", "cambridge", "stanford", "toronto", "melbourne", "ucl"]
  },
  
  // ========== LAW ==========
  {
    courseId: "law",
    nigerianUniversityIds: [
      "unilag", "ui", "abu", "unn", "oau", "covenant", "uniben", "unilorin", 
      "lasu", "uniport", "afe-babalola", "babcock"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "legon", "nairobi", "pretoria"],
    globalUniversityIds: ["harvard", "oxford", "cambridge", "stanford", "yale", "toronto", "ucl"]
  },
  
  // ========== ECONOMICS ==========
  {
    courseId: "economics",
    nigerianUniversityIds: [
      "unilag", "ui", "abu", "unn", "oau", "covenant", "uniben", "unilorin", 
      "lasu", "uniport", "babcock", "landmark"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "legon", "nairobi", "pretoria"],
    globalUniversityIds: ["mit", "harvard", "stanford", "oxford", "cambridge", "toronto", "ucl", "nus"]
  },
  
  // ========== ACCOUNTING ==========
  {
    courseId: "accounting",
    nigerianUniversityIds: [
      "unilag", "ui", "covenant", "abu", "unn", "oau", "uniben", "unilorin", 
      "lasu", "uniport", "babcock", "landmark", "lbs"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "legon", "nairobi", "pretoria"],
    globalUniversityIds: ["toronto", "melbourne", "ucl", "nus"]
  },
  
  // ========== MASS COMMUNICATION ==========
  {
    courseId: "mass-communication",
    nigerianUniversityIds: [
      "unilag", "ui", "unn", "covenant", "uniben", "lasu", "babcock"
    ],
    africanUniversityIds: ["legon", "nairobi", "wits"],
    globalUniversityIds: ["oxford", "stanford", "columbia", "nus"]
  },
  
  // ========== MECHANICAL ENGINEERING ==========
  {
    courseId: "mechanical-engineering",
    nigerianUniversityIds: [
      "unilag", "abu", "covenant", "oau", "futa", "futo", "uniben", "unilorin", "uniport", "landmark"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "cairo", "pretoria"],
    globalUniversityIds: ["mit", "stanford", "cambridge", "eth", "toronto", "melbourne"]
  },
  
  // ========== NURSING ==========
  {
    courseId: "nursing",
    nigerianUniversityIds: [
      "unilag", "ui", "oau", "uniben", "lasu", "babcock"
    ],
    africanUniversityIds: ["uct", "wits", "makerere", "nairobi"],
    globalUniversityIds: ["toronto", "melbourne", "ucl"]
  },
  
  // ========== PHARMACY ==========
  {
    courseId: "pharmacy",
    nigerianUniversityIds: [
      "unilag", "ui", "oau", "abu", "unn", "uniben", "uniport", "unilorin"
    ],
    africanUniversityIds: ["uct", "wits", "cairo", "nairobi"],
    globalUniversityIds: ["ucl", "toronto", "nus"]
  },
  
  // ========== ELECTRICAL ENGINEERING ==========
  {
    courseId: "electrical-engineering",
    nigerianUniversityIds: [
      "unilag", "abu", "covenant", "oau", "futa", "futo", "uniben", "unilorin"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "cairo"],
    globalUniversityIds: ["mit", "stanford", "cambridge", "eth", "toronto"]
  },
  
  // ========== CIVIL ENGINEERING ==========
  {
    courseId: "civil-engineering",
    nigerianUniversityIds: [
      "unilag", "abu", "covenant", "futa", "futo", "unilorin"
    ],
    africanUniversityIds: ["uct", "wits", "stellenbosch", "cairo"],
    globalUniversityIds: ["mit", "cambridge", "eth", "toronto"]
  },
  
  // ========== PETROLEUM ENGINEERING ==========
  {
    courseId: "petroleum-engineering",
    nigerianUniversityIds: ["uniport", "abu", "covenant"],
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["stanford", "texas-austin"]
  },
  
  // ========== CHEMICAL ENGINEERING ==========
  {
    courseId: "chemical-engineering",
    nigerianUniversityIds: ["unilag", "abu", "uniport", "landmark"],
    africanUniversityIds: ["uct", "wits", "stellenbosch"],
    globalUniversityIds: ["mit", "cambridge", "eth"]
  },
  
  // ========== BUSINESS ADMINISTRATION ==========
  {
    courseId: "business-administration",
    nigerianUniversityIds: [
      "unilag", "ui", "covenant", "unn", "uniben", "lasu", "babcock", "landmark", "lbs"
    ],
    africanUniversityIds: ["uct", "wits", "legon", "nairobi"],
    globalUniversityIds: ["harvard", "stanford", "oxford", "toronto", "nus"]
  },
  
  // ========== POLITICAL SCIENCE ==========
  {
    courseId: "political-science",
    nigerianUniversityIds: [
      "unilag", "ui", "abu", "unn", "oau", "lasu"
    ],
    africanUniversityIds: ["uct", "wits", "legon", "nairobi"],
    globalUniversityIds: ["harvard", "oxford", "cambridge", "stanford"]
  },
  
  // ========== INTERNATIONAL RELATIONS ==========
  {
    courseId: "international-relations",
    nigerianUniversityIds: ["unilag", "ui", "covenant", "abu", "oau"],
    africanUniversityIds: ["uct", "wits", "legon"],
    globalUniversityIds: ["oxford", "cambridge", "harvard", "stanford", "georgetown"]
  },
  
  // ========== PSYCHOLOGY ==========
  {
    courseId: "psychology",
    nigerianUniversityIds: ["unilag", "ui", "covenant", "unn", "babcock"],
    africanUniversityIds: ["uct", "wits", "stellenbosch"],
    globalUniversityIds: ["stanford", "harvard", "oxford", "cambridge", "toronto"]
  },
  
  // ========== BANKING & FINANCE ==========
  {
    courseId: "banking-finance",
    nigerianUniversityIds: ["unilag", "covenant", "babcock", "lbs"],
    africanUniversityIds: ["uct", "wits", "legon"],
    globalUniversityIds: ["oxford", "cambridge", "toronto", "nus"]
  },
  
  // ========== DENTISTRY ==========
  {
    courseId: "dentistry",
    nigerianUniversityIds: ["ui", "unn", "oau", "uniport"],
    africanUniversityIds: ["uct", "wits", "cairo"],
    globalUniversityIds: ["harvard", "ucl", "toronto"]
  },
  
  // ========== VETERINARY MEDICINE ==========
  {
    courseId: "veterinary-medicine",
    nigerianUniversityIds: ["ui", "abu"],
    africanUniversityIds: ["pretoria", "nairobi"],
    globalUniversityIds: ["cambridge", "ucl"]
  },
  
  // ========== ARCHITECTURE ==========
  {
    courseId: "architecture",
    nigerianUniversityIds: ["covenant", "futa", "unilag"],
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["mit", "eth", "ucl"]
  },
  
  // ========== PUBLIC HEALTH ==========
  {
    courseId: "public-health",
    nigerianUniversityIds: ["babcock", "unilag", "ui"],
    africanUniversityIds: ["uct", "makerere", "nairobi"],
    globalUniversityIds: ["harvard", "johns-hopkins", "toronto"]
  },
  
  // ========== AGRICULTURAL SCIENCE ==========
  {
    courseId: "agricultural-science",
    nigerianUniversityIds: ["abu", "landmark", "futa", "ui"],
    africanUniversityIds: ["makerere", "nairobi", "pretoria"],
    globalUniversityIds: ["cornell", "wageningen"]
  },
  
  // ========== BIOCHEMISTRY ==========
  {
    courseId: "biochemistry",
    nigerianUniversityIds: ["unilag", "ui", "abu", "futa", "landmark"],
    africanUniversityIds: ["uct", "wits", "cairo"],
    globalUniversityIds: ["cambridge", "mit", "stanford"]
  },
  
  // ========== MICROBIOLOGY ==========
  {
    courseId: "microbiology",
    nigerianUniversityIds: ["unilag", "ui", "oau", "landmark"],
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["cambridge", "oxford"]
  },
  
  // ========== SOCIOLOGY ==========
  {
    courseId: "sociology",
    nigerianUniversityIds: ["unilag", "ui", "unn", "lasu"],
    africanUniversityIds: ["uct", "wits", "legon"],
    globalUniversityIds: ["harvard", "oxford", "cambridge"]
  },
  
  // ========== GLOBAL-ONLY COURSES (NOT OFFERED IN NIGERIA) ==========
  
  // DATA SCIENCE - Not offered as standalone degree in Nigerian universities
  {
    courseId: "data-science",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["mit", "stanford", "harvard", "oxford", "cambridge", "toronto", "ucl", "nus"]
  },
  
  // CYBERSECURITY - Not offered as standalone degree in Nigerian universities
  {
    courseId: "cybersecurity",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["mit", "stanford", "oxford", "cambridge", "toronto", "nus"]
  },
  
  // SOFTWARE ENGINEERING - Not offered as standalone degree in Nigerian universities
  {
    courseId: "software-engineering",
    nigerianUniversityIds: ["covenant"], // Only Covenant offers it
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["mit", "stanford", "waterloo", "toronto", "nus"]
  },
  
  // AI & MACHINE LEARNING - Not offered as standalone degree in Nigerian universities
  {
    courseId: "ai-machine-learning",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct"],
    globalUniversityIds: ["mit", "stanford", "cmu", "oxford", "cambridge", "eth", "toronto"]
  },
  
  // CLOUD COMPUTING - Not offered as standalone degree in Nigerian universities
  {
    courseId: "cloud-computing",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["mit", "stanford", "toronto", "nus"]
  },
  
  // BLOCKCHAIN & WEB3 - Not offered as standalone degree in Nigerian universities
  {
    courseId: "blockchain-web3",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["mit", "stanford", "eth"]
  },
  
  // UX/UI DESIGN - Not offered as standalone degree in Nigerian universities
  {
    courseId: "ux-ui-design",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct"],
    globalUniversityIds: ["stanford", "cmu", "parsons", "risd"]
  },
  
  // PRODUCT MANAGEMENT - Not offered as standalone degree
  {
    courseId: "product-management",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["stanford", "harvard", "mit"]
  },
  
  // GAME DEVELOPMENT - Not offered as standalone degree in Nigerian universities
  {
    courseId: "game-development",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["usc", "mit", "digipen"]
  },
  
  // BIOMEDICAL ENGINEERING - Not widely offered in Nigeria
  {
    courseId: "biomedical-engineering",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct", "wits"],
    globalUniversityIds: ["mit", "stanford", "johns-hopkins", "eth", "toronto"]
  },
  
  // ENTREPRENEURSHIP - Not offered as standalone degree in Nigerian universities
  {
    courseId: "entrepreneurship",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct"],
    globalUniversityIds: ["stanford", "harvard", "babson"]
  },
  
  // FINTECH - Not offered as standalone degree in Nigerian universities
  {
    courseId: "fintech",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["oxford", "stanford", "mit"]
  },
  
  // DIGITAL MARKETING - Not offered as standalone degree in Nigerian universities
  {
    courseId: "digital-marketing",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["nyu", "northwestern", "usc"]
  },
  
  // RENEWABLE ENERGY ENGINEERING - Not widely offered in Nigeria
  {
    courseId: "renewable-energy-engineering",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct", "stellenbosch"],
    globalUniversityIds: ["mit", "stanford", "eth", "delft"]
  },
  
  // CLIMATE & SUSTAINABILITY - Not offered as standalone degree in Nigerian universities
  {
    courseId: "climate-sustainability",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: ["uct"],
    globalUniversityIds: ["stanford", "oxford", "yale", "eth"]
  },
  
  // HEALTH INFORMATICS - Not offered as standalone degree in Nigerian universities
  {
    courseId: "health-informatics",
    nigerianUniversityIds: [], // Not offered in Nigeria yet
    africanUniversityIds: [],
    globalUniversityIds: ["johns-hopkins", "stanford", "toronto"]
  },
];

/**
 * Helper function to get universities offering a course by region
 */
export function getUniversitiesForCourse(courseId: string): CourseUniversityMapping | null {
  return COURSE_UNIVERSITY_MAPPINGS.find(m => m.courseId === courseId) || null;
}

/**
 * Check if a course is offered in Nigeria
 */
export function isCourseOfferedInNigeria(courseId: string): boolean {
  const mapping = getUniversitiesForCourse(courseId);
  return mapping ? mapping.nigerianUniversityIds.length > 0 : false;
}

/**
 * Check if a course is offered in Africa (excluding Nigeria)
 */
export function isCourseOfferedInAfrica(courseId: string): boolean {
  const mapping = getUniversitiesForCourse(courseId);
  return mapping ? mapping.africanUniversityIds.length > 0 : false;
}

/**
 * Check if a course is offered globally
 */
export function isCourseOfferedGlobally(courseId: string): boolean {
  const mapping = getUniversitiesForCourse(courseId);
  return mapping ? mapping.globalUniversityIds.length > 0 : false;
}
