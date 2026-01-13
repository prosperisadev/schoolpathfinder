import { School } from "@/types";

// === DEPARTMENT DEFINITIONS ===
export type Department = "science" | "art" | "commercial";

// Master course-to-department mapping
// This is the STRICT mapping that determines which academic track can take which courses
export const COURSE_DEPARTMENT_MAP: Record<string, Department> = {
  // === SCIENCE DEPARTMENT COURSES ===
  "computer-science": "science",
  "medicine": "science",
  "mechanical-engineering": "science",
  "nursing": "science",
  "data-science": "science",
  "cybersecurity": "science",
  "software-engineering": "science",
  "artificial-intelligence": "science",
  "ai-machine-learning": "science",
  "biomedical-engineering": "science",
  "pharmacy": "science",
  "public-health": "science",
  "health-informatics": "science",
  "nutrition-dietetics": "science",
  "renewable-energy-engineering": "science",
  "civil-engineering": "science",
  "petroleum-engineering": "science",
  "electrical-electronics-engineering": "science",
  "electrical-engineering": "science",
  "chemical-engineering": "science",
  "mathematics": "science",
  "physics": "science",
  "chemistry": "science",
  "biology": "science",
  "biochemistry": "science",
  "microbiology": "science",
  "geology": "science",
  "agricultural-science": "science",
  "veterinary-medicine": "science",
  "dentistry": "science",
  "physiotherapy": "science",
  "medical-lab-science": "science",
  "radiography": "science",
  "optometry": "science",
  "architecture": "science",
  "quantity-surveying": "science",
  "estate-management": "science",
  "surveying-geoinformatics": "science",
  "environmental-science": "science",
  "climate-sustainability": "science",
  "cloud-computing": "science",
  "game-development": "science",
  "blockchain-web3": "science",
  "food-science": "science",
  "statistics": "science",
  "industrial-chemistry": "science",
  
  // === ART DEPARTMENT COURSES ===
  "law": "art",
  "mass-communication": "art",
  "english": "art",
  "history": "art",
  "philosophy": "art",
  "religious-studies": "art",
  "linguistics": "art",
  "theatre-arts": "art",
  "music": "art",
  "fine-arts": "art",
  "french": "art",
  "arabic": "art",
  "yoruba": "art",
  "igbo": "art",
  "hausa": "art",
  "creative-writing": "art",
  "film-studies": "art",
  "journalism": "art",
  "international-relations": "art",
  "political-science": "art",
  "public-administration": "art",
  "sociology": "art",
  "psychology": "art",
  "social-work": "art",
  "criminology": "art",
  "diplomacy-strategic-studies": "art",
  "peace-conflict-studies": "art",
  "media-communication": "art",
  "ux-ui-design": "art",
  "digital-marketing": "art",
  "content-creation": "art",
  "animation-motion-graphics": "art",
  "graphic-design": "art",
  "education": "art",
  "library-science": "art",
  "urban-planning": "art",
  
  // === COMMERCIAL DEPARTMENT COURSES ===
  "economics": "commercial",
  "accounting": "commercial",
  "banking-finance": "commercial",
  "business-administration": "commercial",
  "marketing": "commercial",
  "insurance": "commercial",
  "actuarial-science": "commercial",
  "entrepreneurship": "commercial",
  "human-resource-management": "commercial",
  "supply-chain-logistics": "commercial",
  "project-management": "commercial",
  "fintech": "commercial",
  "investment-banking": "commercial",
  "real-estate-finance": "commercial",
  "international-business": "commercial",
  "management-information-systems": "commercial",
  "office-management": "commercial",
  "taxation": "commercial",
  "auditing": "commercial",
  "product-management": "commercial",
  "secretarial-studies": "commercial",
  "hospitality-management": "commercial",
  "tourism-management": "commercial",
  "public-finance": "commercial",
};

// Function to get department for a course
export function getCourseDepartment(courseId: string): Department | null {
  return COURSE_DEPARTMENT_MAP[courseId] || null;
}

// Function to check if a student can take a course based on their track
export function canStudentTakeCourse(studentTrack: Department, courseId: string): boolean {
  const courseDepartment = getCourseDepartment(courseId);
  if (!courseDepartment) return false;
  // Students can ONLY take courses from their department
  return studentTrack === courseDepartment;
}

// === UNIVERSITY COURSE OFFERINGS ===
// Maps which courses each Nigerian university offers
export interface UniversityCourseOffering {
  courseId: string;
  available: boolean;
  rankingScore: number; // 1-100, specific to this course at this university
}

export const UNIVERSITY_COURSE_OFFERINGS: Record<string, UniversityCourseOffering[]> = {
  "atbu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "abu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "aefunai": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "buk": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "funaab": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "agricultural-science",
      "rankingScore": 91,
      "available": true
    },
    {
      "courseId": "food-science",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 77,
      "available": true
    }
  ],
  "fuask": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    }
  ],
  "fubk": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "fud": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "fudm": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "fugashua": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "fugus": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "fuk": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "ful": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "fulafia": [
    {
      "courseId": "economics",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "fupre": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "futa": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 88,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 82,
      "available": true
    }
  ],
  "futmin": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 81,
      "available": true
    }
  ],
  "futo": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 81,
      "available": true
    }
  ],
  "fuo": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "fuoye": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "fuw": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "mouau": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "agricultural-science",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "food-science",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    }
  ],
  "mau": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "noun": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "unizik": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "oau": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "uniabuja": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "uam": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 88,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "agricultural-science",
      "rankingScore": 88,
      "available": true
    },
    {
      "courseId": "food-science",
      "rankingScore": 92,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    }
  ],
  "uniben": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "unical": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "ui": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "unilorin": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "unijos": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "unilag": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "unimaid": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "unn": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "uniport": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "uniuyo": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "udus": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "afit": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "nmu": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 88,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "polac": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "nuab": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "nda": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "akum": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "absu": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "adsu": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "aaua": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "aksu": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "adustech": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 88,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 76,
      "available": true
    }
  ],
  "aau": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "basug": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "bmu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    }
  ],
  "bsu": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "bosu": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "ysu": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "ansu": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "unicross": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "delsu": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "dspz": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 80,
      "available": true
    }
  ],
  "dou": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "ebsu": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "edsu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "eksu": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 80,
      "available": true
    }
  ],
  "esut": [
    {
      "courseId": "economics",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 75,
      "available": true
    }
  ],
  "gsu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "gsust": [
    {
      "courseId": "economics",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 73,
      "available": true
    }
  ],
  "ibbul": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "iaue": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "imsu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "kasu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "ksusta": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 82,
      "available": true
    }
  ],
  "paau": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "kwasu": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "lautech": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 80,
      "available": true
    }
  ],
  "lasu": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "lasued": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "lasust": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 76,
      "available": true
    }
  ],
  "nsuk": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "ndu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "oou": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "oaust": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 73,
      "available": true
    }
  ],
  "uniosun": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "plasu": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "rivsu": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "slu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "tasued": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "tsu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "umyu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 80,
      "available": true
    }
  ],
  "ssu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 89,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "unidel": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 88,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "yumsuk": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 85,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "zsu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "ac": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "aue": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "abuad": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "aust": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 86,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 73,
      "available": true
    }
  ],
  "apu": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "acu": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 80,
      "available": true
    }
  ],
  "aum": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "ahu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "auk": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "aun": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "anchor-university": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "aju": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "amu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "bu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "baze": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "but": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 73,
      "available": true
    }
  ],
  "biu": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "bhu": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "cul": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "caritas-university": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 80,
      "available": true
    }
  ],
  "cetep-city-university": [
    {
      "courseId": "economics",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "clu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "christopher-university": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "ccu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "cu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "crawford-university": [
    {
      "courseId": "economics",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "crescent-university": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "dui": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "ecu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "eu": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 80,
      "available": true
    }
  ],
  "eua": [
    {
      "courseId": "economics",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "gou": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "gfu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "guu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "hallmark-university": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "hezekiah-university": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "iuo": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "jabu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "kum": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "ku": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "kwararafa-university": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "lu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 86,
      "available": true
    }
  ],
  "lcu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "madonna-university": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 80,
      "available": true
    }
  ],
  "mcu": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "mewar-university": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "mciu": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "mtu": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "mudiame-university": [
    {
      "courseId": "economics",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "nun": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "nuk": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "novena-university": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "obong-university": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "oui": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "pamo-university-of-medical-sciences": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "computer-science",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "mechanical-engineering",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "electrical-engineering",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "civil-engineering",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "biochemistry",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "microbiology",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "architecture",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "medicine",
      "rankingScore": 87,
      "available": true
    },
    {
      "courseId": "pharmacy",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "nursing",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "medical-lab-science",
      "rankingScore": 76,
      "available": true
    }
  ],
  "pau": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "paul-university": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "pue": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "pcu": [
    {
      "courseId": "economics",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "run": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "renaissance-university": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "rhema-university": [
    {
      "courseId": "economics",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "ritman-university": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 84,
      "available": true
    }
  ],
  "salem-university": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 80,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 88,
      "available": true
    }
  ],
  "smu": [
    {
      "courseId": "economics",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 83,
      "available": true
    }
  ],
  "sau": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 71,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "sun": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "summit-university": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 89,
      "available": true
    }
  ],
  "vuna": [
    {
      "courseId": "economics",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 73,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 70,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "wuo": [
    {
      "courseId": "economics",
      "rankingScore": 78,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ],
  "wdu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 83,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 72,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 81,
      "available": true
    }
  ],
  "wui": [
    {
      "courseId": "economics",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 76,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 87,
      "available": true
    }
  ],
  "university-of-mkar": [
    {
      "courseId": "economics",
      "rankingScore": 81,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 74,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 75,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 85,
      "available": true
    }
  ],
  "jhu": [
    {
      "courseId": "economics",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "accounting",
      "rankingScore": 84,
      "available": true
    },
    {
      "courseId": "business-administration",
      "rankingScore": 82,
      "available": true
    },
    {
      "courseId": "political-science",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "sociology",
      "rankingScore": 79,
      "available": true
    },
    {
      "courseId": "mass-communication",
      "rankingScore": 77,
      "available": true
    },
    {
      "courseId": "law",
      "rankingScore": 82,
      "available": true
    }
  ]
};

// Helper function to get universities that offer a specific course
export function getUniversitiesForCourse(courseId: string, allUniversities: School[]): School[] {
  return allUniversities
    .filter(uni => {
      const offerings = UNIVERSITY_COURSE_OFFERINGS[uni.id];
      if (!offerings) return false;
      return offerings.some(o => o.courseId === courseId && o.available);
    })
    .sort((a, b) => {
      const aScore = UNIVERSITY_COURSE_OFFERINGS[a.id]?.find(o => o.courseId === courseId)?.rankingScore || 0;
      const bScore = UNIVERSITY_COURSE_OFFERINGS[b.id]?.find(o => o.courseId === courseId)?.rankingScore || 0;
      return bScore - aScore;
    });
}

// Helper function to get course-specific ranking for a university
export function getCourseRankingForUniversity(universityId: string, courseId: string): number | null {
  const offerings = UNIVERSITY_COURSE_OFFERINGS[universityId];
  if (!offerings) return null;
  const offering = offerings.find(o => o.courseId === courseId);
  return offering?.rankingScore || null;
}

// 20 Nigerian Universities with WAEC/JAMB requirements
export const nigerianUniversities: School[] = [
  {
    "id": "atbu",
    "name": "Abubakar Tafawa Balewa University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 1,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "abu",
    "name": "Ahmadu Bello University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 2,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "aefunai",
    "name": "Alex Ekwueme Federal University Ndufu Alike Ikwo",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 3,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "buk",
    "name": "Bayero University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 4,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "funaab",
    "name": "Federal University of Agriculture, Abeokuta",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 5,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fuask",
    "name": "Federal University of Applied Sciences Kachia",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 6,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fubk",
    "name": "Federal University Birnin Kebbi",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 7,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fud",
    "name": "Federal University Dutse",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 8,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fudm",
    "name": "Federal University Dutsin-Ma",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 9,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fugashua",
    "name": "Federal University Gashua",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 10,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fugus",
    "name": "Federal University Gusau",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 11,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fuk",
    "name": "Federal University Kashere",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 12,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ful",
    "name": "Federal University Lokoja",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 13,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fulafia",
    "name": "Federal University of Lafia",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 14,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fupre",
    "name": "Federal University of Petroleum Resources Effurun",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 15,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "futa",
    "name": "Federal University of Technology Akure",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 16,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "futmin",
    "name": "Federal University of Technology Minna",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 17,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "futo",
    "name": "Federal University of Technology Owerri",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 18,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fuo",
    "name": "Federal University Otuoke",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 19,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fuoye",
    "name": "Federal University Oye-Ekiti",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 20,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "fuw",
    "name": "Federal University Wukari",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 21,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "mouau",
    "name": "Michael Okpara University of Agriculture, Umudike",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 22,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "mau",
    "name": "Modibbo Adama University, Yola",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 23,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "noun",
    "name": "National Open University of Nigeria",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 24,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unizik",
    "name": "Nnamdi Azikiwe University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 25,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "oau",
    "name": "Obafemi Awolowo University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 26,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "uniabuja",
    "name": "University of Abuja",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 27,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "uam",
    "name": "University of Agriculture, Makurdi",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 28,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "uniben",
    "name": "University of Benin",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 29,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unical",
    "name": "University of Calabar",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 30,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ui",
    "name": "University of Ibadan",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 31,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unilorin",
    "name": "University of Ilorin",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 32,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unijos",
    "name": "University of Jos",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 33,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unilag",
    "name": "University of Lagos",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 34,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unimaid",
    "name": "University of Maiduguri",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 35,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unn",
    "name": "University of Nigeria, Nsukka",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 36,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "uniport",
    "name": "University of Port Harcourt",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 37,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "uniuyo",
    "name": "University of Uyo",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 38,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "udus",
    "name": "Usmanu Danfodiyo University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 39,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "afit",
    "name": "Nigeria Airforce University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 40,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "nmu",
    "name": "Nigeria Maritime University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 41,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "polac",
    "name": "Nigeria Police Academy Wudil",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 42,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "nuab",
    "name": "Nigerian Army University Biu",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 43,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "nda",
    "name": "Nigerian Defence Academy",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 44,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "akum",
    "name": "Abdulkadir Kure University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 45,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "absu",
    "name": "Abia State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 46,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "adsu",
    "name": "Adamawa State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 47,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "aaua",
    "name": "Adekunle Ajasin University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 48,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "aksu",
    "name": "Akwa Ibom State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 49,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "adustech",
    "name": "Aliko Dangote University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 50,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "aau",
    "name": "Ambrose Alli University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 51,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "basug",
    "name": "Bauchi State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 52,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "bmu",
    "name": "Bayelsa Medical University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 53,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "bsu",
    "name": "Benue State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 54,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "bosu",
    "name": "Borno State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 55,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ysu",
    "name": "Bukar Abba Ibrahim University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 56,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ansu",
    "name": "Chukwuemeka Odumegwu Ojukwu University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 57,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unicross",
    "name": "University of Cross River State",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 58,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "delsu",
    "name": "Delta State University, Abraka",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 59,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "dspz",
    "name": "Delta State University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 60,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "dou",
    "name": "Dennis Osadebay University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 61,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ebsu",
    "name": "Ebonyi State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 62,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "edsu",
    "name": "Edo State University, Uzairue",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 63,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "eksu",
    "name": "Ekiti State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 64,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "esut",
    "name": "Enugu State University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 65,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "gsu",
    "name": "Gombe State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 66,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "gsust",
    "name": "Gombe State University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 67,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ibbul",
    "name": "Ibrahim Badamasi Babangida University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 68,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "iaue",
    "name": "Ignatius Ajuru University of Education",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 69,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "imsu",
    "name": "Imo State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 70,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "kasu",
    "name": "Kaduna State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 71,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ksusta",
    "name": "Kebbi State University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 72,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "paau",
    "name": "Prince Abubakar Audu University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 73,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "kwasu",
    "name": "Kwara State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 74,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "lautech",
    "name": "Ladoke Akintola University of Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 75,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "lasu",
    "name": "Lagos State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 76,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "lasued",
    "name": "Lagos State University of Education",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 77,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "lasust",
    "name": "Lagos State University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 78,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "nsuk",
    "name": "Nasarawa State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 79,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ndu",
    "name": "Niger Delta University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 80,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "oou",
    "name": "Olabisi Onabanjo University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 81,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "oaust",
    "name": "Olusegun Agagu University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 82,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "uniosun",
    "name": "Osun State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 83,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "plasu",
    "name": "Plateau State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 84,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "rivsu",
    "name": "Rivers State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 85,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "slu",
    "name": "Sule Lamido University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 86,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "tasued",
    "name": "Tai Solarin University of Education",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 87,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "tsu",
    "name": "Taraba State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 88,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "umyu",
    "name": "Umaru Musa Yar'adua University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 89,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ssu",
    "name": "Sokoto State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 90,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "unidel",
    "name": "University of Delta",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 91,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "yumsuk",
    "name": "Yusuf Maitama Sule University Kano",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 92,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "zsu",
    "name": "Zamfara State University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 50000,
      "max": 150000,
      "currency": "NGN"
    },
    "scholarshipAvailable": false,
    "pros": [
      "Affordable tuition",
      "Established reputation",
      "Diverse student body"
    ],
    "cons": [
      "Potential strikes",
      "Infrastructure challenges",
      "Large class sizes"
    ],
    "ranking": 93,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 180,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": true
    }
  },
  {
    "id": "ac",
    "name": "Achievers University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 94,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "aue",
    "name": "Adeleke University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 95,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "abuad",
    "name": "Afe Babalola University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 96,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "aust",
    "name": "African University of Science and Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 97,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "apu",
    "name": "Ahman Pategi University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 98,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "acu",
    "name": "Ajayi Crowther University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 99,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "aum",
    "name": "Al-Ansar University Maiduguri",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 100,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "ahu",
    "name": "Al-Hikmah University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 101,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "auk",
    "name": "Al-Qalam University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 102,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "aun",
    "name": "American University of Nigeria",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 103,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "anchor-university",
    "name": "Anchor University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 104,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "aju",
    "name": "Arthur Jarvis University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 105,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "amu",
    "name": "Ave Maria University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 106,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "bu",
    "name": "Babcock University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 107,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "baze",
    "name": "Baze University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 108,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "but",
    "name": "Bells University of Technology",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 109,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "biu",
    "name": "Benson Idahosa University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 110,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "bu",
    "name": "Bowen University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 111,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "bhu",
    "name": "Bingham University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 112,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "cul",
    "name": "Caleb University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 113,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "caritas-university",
    "name": "Caritas University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 114,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "cetep-city-university",
    "name": "CETEP City University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 115,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "clu",
    "name": "Chrisland University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 116,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "christopher-university",
    "name": "Christopher University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 117,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "clu",
    "name": "Clifford University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 118,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "ccu",
    "name": "Coal City University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 119,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "cu",
    "name": "Covenant University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 120,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "crawford-university",
    "name": "Crawford University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 121,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "crescent-university",
    "name": "Crescent University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 122,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "dui",
    "name": "Dominican University Ibadan",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 123,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "ecu",
    "name": "Edwin Clark University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 124,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "eu",
    "name": "Elizade University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 125,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "eua",
    "name": "Evangel University, Akaeze",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 126,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "fuo",
    "name": "Fountain University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 127,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "gou",
    "name": "Godfrey Okoye University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 128,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "gfu",
    "name": "Greenfield University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 129,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "guu",
    "name": "Gregory University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 130,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "hallmark-university",
    "name": "Hallmark University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 131,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "hezekiah-university",
    "name": "Hezekiah University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 132,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "iuo",
    "name": "Igbinedion University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 133,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "jabu",
    "name": "Joseph Ayo Babalola University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 134,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "kum",
    "name": "Khadija University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 135,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "ku",
    "name": "Kings University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 136,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "ku",
    "name": "Koladaisi University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 137,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "kwararafa-university",
    "name": "Kwararafa University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 138,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "lu",
    "name": "Landmark University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 139,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "lcu",
    "name": "Lead City University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 140,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "madonna-university",
    "name": "Madonna University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 141,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "mcu",
    "name": "McPherson University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 142,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "mewar-university",
    "name": "Mewar University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 143,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "mciu",
    "name": "Michael and Cecilia Ibru University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 144,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "mtu",
    "name": "Mountain Top University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 145,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "mudiame-university",
    "name": "Mudiame University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 146,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "nun",
    "name": "Nile University of Nigeria",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 147,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "nuk",
    "name": "Nok University Kachia",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 148,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "novena-university",
    "name": "Novena University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 149,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "obong-university",
    "name": "Obong University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 150,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "oui",
    "name": "Oduduwa University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 151,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "pamo-university-of-medical-sciences",
    "name": "PAMO University of Medical Sciences",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 152,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "pau",
    "name": "Pan-Atlantic University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 153,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "paul-university",
    "name": "Paul University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 154,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "pue",
    "name": "Peaceland University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 155,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "pcu",
    "name": "Precious Cornerstone University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 156,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "run",
    "name": "Redeemer's University Nigeria",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 157,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "renaissance-university",
    "name": "Renaissance University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 158,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "rhema-university",
    "name": "Rhema University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 159,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "ritman-university",
    "name": "Ritman University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 160,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "salem-university",
    "name": "Salem University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 161,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "smu",
    "name": "Sam Maris University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 162,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "sau",
    "name": "Samuel Adegboyega University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 163,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "sun",
    "name": "Skyline University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 164,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "summit-university",
    "name": "Summit University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 165,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "vuna",
    "name": "Veritas University (Catholic University of Nigeria) Abuja",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 166,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "wuo",
    "name": "Wesley University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 167,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "wdu",
    "name": "Western Delta University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 168,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "wui",
    "name": "Westland University",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 169,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "university-of-mkar",
    "name": "University of Mkar",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 170,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  },
  {
    "id": "jhu",
    "name": "James Hope University, Lagos",
    "location": "nigeria",
    "country": "Nigeria",
    "tuitionRange": {
      "min": 300000,
      "max": 2500000,
      "currency": "NGN"
    },
    "scholarshipAvailable": true,
    "pros": [
      "Modern facilities",
      "No strikes",
      "Faster academic calendar"
    ],
    "cons": [
      "Expensive tuition",
      "Strict rules"
    ],
    "ranking": 171,
    "admissionRequirements": {
      "waecSubjects": [
        "English Language",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology"
      ],
      "minimumWaecGrade": "5 credits including English and Mathematics",
      "jambScore": 160,
      "jambSubjects": [
        "Use of English",
        "3 relevant subjects"
      ],
      "postUtme": false
    }
  }
];

// 10 African Universities (outside Nigeria)
export const africanUniversities: School[] = [
  {
    id: "uct",
    name: "University of Cape Town",
    location: "africa",
    country: "South Africa",
    tuitionRange: { min: 3000, max: 8000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Top-ranked in Africa", "International exposure", "Research opportunities", "Beautiful campus"],
    cons: ["Cost of living", "Visa requirements", "Safety concerns"],
    ranking: 1,
    admissionRequirements: {
      aLevels: "ABB or equivalent",
      ibScore: 30,
      ieltsScore: 6.5,
      toeflScore: 80,
      otherRequirements: ["National Senior Certificate with Bachelor's Pass", "Subject-specific requirements"],
    },
  },
  {
    id: "wits",
    name: "University of the Witwatersrand",
    location: "africa",
    country: "South Africa",
    tuitionRange: { min: 2500, max: 7000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Strong research", "Industry connections", "Urban location"],
    cons: ["Cost of living", "Safety concerns"],
    ranking: 2,
    admissionRequirements: {
      aLevels: "BBB or equivalent",
      ibScore: 28,
      ieltsScore: 6.0,
      toeflScore: 75,
      otherRequirements: ["National Senior Certificate", "Minimum APS score required"],
    },
  },
  {
    id: "stellenbosch",
    name: "Stellenbosch University",
    location: "africa",
    country: "South Africa",
    tuitionRange: { min: 2800, max: 7500, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Wine country location", "Strong engineering", "Research excellence"],
    cons: ["Primarily Afrikaans", "Cost of living"],
    ranking: 3,
    admissionRequirements: {
      aLevels: "BBB or equivalent",
      ibScore: 29,
      ieltsScore: 6.0,
      toeflScore: 79,
      otherRequirements: ["National Senior Certificate", "Language proficiency in English or Afrikaans"],
    },
  },
  {
    id: "legon",
    name: "University of Ghana, Legon",
    location: "africa",
    country: "Ghana",
    tuitionRange: { min: 2000, max: 5000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Cultural proximity to Nigeria", "English-speaking", "Strong humanities"],
    cons: ["Limited programs", "Infrastructure challenges"],
    ranking: 4,
    admissionRequirements: {
      aLevels: "CCC or equivalent",
      ibScore: 24,
      ieltsScore: 5.5,
      toeflScore: 70,
      otherRequirements: ["WASSCE with credits in 6 subjects", "Mature students entry available"],
    },
  },
  {
    id: "makerere",
    name: "Makerere University",
    location: "africa",
    country: "Uganda",
    tuitionRange: { min: 1500, max: 4000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["East Africa's leading university", "Affordable", "Strong medicine"],
    cons: ["Infrastructure needs", "Limited facilities"],
    ranking: 5,
    admissionRequirements: {
      aLevels: "CCD or equivalent",
      ibScore: 24,
      ieltsScore: 5.5,
      toeflScore: 65,
      otherRequirements: ["Uganda Advanced Certificate of Education", "At least 2 principal passes"],
    },
  },
  {
    id: "cairo",
    name: "Cairo University",
    location: "africa",
    country: "Egypt",
    tuitionRange: { min: 1000, max: 3000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Historic institution", "Very affordable", "Strong medicine and engineering"],
    cons: ["Language barrier (Arabic)", "Political instability"],
    ranking: 6,
    admissionRequirements: {
      aLevels: "CCC or equivalent",
      ibScore: 24,
      ieltsScore: 5.5,
      toeflScore: 65,
      otherRequirements: ["Thanaweya Amma or equivalent", "Arabic proficiency may be required"],
    },
  },
  {
    id: "nairobi",
    name: "University of Nairobi",
    location: "africa",
    country: "Kenya",
    tuitionRange: { min: 2000, max: 5000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["East Africa hub", "English-speaking", "Strong tech ecosystem"],
    cons: ["Security concerns", "Infrastructure"],
    ranking: 7,
    admissionRequirements: {
      aLevels: "CCC or equivalent",
      ibScore: 24,
      ieltsScore: 5.5,
      toeflScore: 65,
      otherRequirements: ["Kenya Certificate of Secondary Education (KCSE)", "Minimum grade C+ overall"],
    },
  },
  {
    id: "pretoria",
    name: "University of Pretoria",
    location: "africa",
    country: "South Africa",
    tuitionRange: { min: 2500, max: 6500, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Comprehensive programs", "Strong research", "Good facilities"],
    cons: ["Cost of living", "Visa challenges"],
    ranking: 8,
    admissionRequirements: {
      aLevels: "BBB or equivalent",
      ibScore: 28,
      ieltsScore: 6.0,
      toeflScore: 75,
      otherRequirements: ["National Senior Certificate", "Minimum APS score per faculty"],
    },
  },
  {
    id: "mauritius",
    name: "University of Mauritius",
    location: "africa",
    country: "Mauritius",
    tuitionRange: { min: 2000, max: 4500, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Island paradise", "Safe", "English and French speaking"],
    cons: ["Limited programs", "Small job market"],
    ranking: 9,
    admissionRequirements: {
      aLevels: "CCC or equivalent",
      ibScore: 24,
      ieltsScore: 5.5,
      toeflScore: 65,
      otherRequirements: ["Cambridge HSC or equivalent", "Subject-specific requirements"],
    },
  },
  {
    id: "addis-ababa",
    name: "Addis Ababa University",
    location: "africa",
    country: "Ethiopia",
    tuitionRange: { min: 800, max: 2500, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Very affordable", "Historic university", "Strong humanities"],
    cons: ["Language barrier (Amharic)", "Political situation"],
    ranking: 10,
    admissionRequirements: {
      aLevels: "DDD or equivalent",
      ibScore: 22,
      ieltsScore: 5.0,
      toeflScore: 60,
      otherRequirements: ["Ethiopian Higher Education Entrance Certificate", "National exam results"],
    },
  },
];

// 10 Global Universities
export const globalUniversities: School[] = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    location: "global",
    country: "USA",
    tuitionRange: { min: 55000, max: 60000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["World's best for STEM", "Innovation hub", "Career opportunities", "Need-blind admission"],
    cons: ["Extremely competitive", "High cost", "Far from home"],
    ranking: 1,
    admissionRequirements: {
      satScore: { min: 1500, max: 1600 },
      actScore: { min: 34, max: 36 },
      toeflScore: 100,
      ieltsScore: 7.5,
      gpa: 3.9,
      otherRequirements: ["Strong extracurriculars", "Research experience preferred", "Teacher recommendations", "Essays"],
    },
  },
  {
    id: "oxford",
    name: "University of Oxford",
    location: "global",
    country: "UK",
    tuitionRange: { min: 30000, max: 45000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Historic excellence", "Global network", "Tutorial system", "Rhodes Scholarship"],
    cons: ["Extremely competitive", "Cultural adjustment", "Cold weather"],
    ranking: 2,
    admissionRequirements: {
      aLevels: "A*A*A to AAA depending on course",
      ibScore: 38,
      ieltsScore: 7.0,
      toeflScore: 100,
      otherRequirements: ["Admissions test (course-specific)", "Interview", "Personal statement", "Academic references"],
    },
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    location: "global",
    country: "UK",
    tuitionRange: { min: 32000, max: 48000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["World-class academics", "College system", "Research excellence", "Gates Cambridge Scholarship"],
    cons: ["Highly competitive", "Intense workload", "Traditional environment"],
    ranking: 3,
    admissionRequirements: {
      aLevels: "A*A*A to A*AA depending on course",
      ibScore: 40,
      ieltsScore: 7.5,
      toeflScore: 110,
      otherRequirements: ["Admissions assessment", "Interview", "Written work (some courses)", "Personal statement"],
    },
  },
  {
    id: "harvard",
    name: "Harvard University",
    location: "global",
    country: "USA",
    tuitionRange: { min: 52000, max: 58000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["World's most prestigious", "Unmatched network", "Need-blind for internationals", "Diverse opportunities"],
    cons: ["4% acceptance rate", "Intense competition", "High pressure"],
    ranking: 4,
    admissionRequirements: {
      satScore: { min: 1480, max: 1580 },
      actScore: { min: 33, max: 36 },
      toeflScore: 100,
      ieltsScore: 7.5,
      gpa: 3.9,
      otherRequirements: ["Holistic review", "Extracurriculars", "Leadership", "Essays", "Recommendations"],
    },
  },
  {
    id: "stanford",
    name: "Stanford University",
    location: "global",
    country: "USA",
    tuitionRange: { min: 55000, max: 60000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Silicon Valley location", "Entrepreneurship culture", "Need-blind", "Innovation focus"],
    cons: ["Extremely competitive", "High cost of living", "Intense environment"],
    ranking: 5,
    admissionRequirements: {
      satScore: { min: 1470, max: 1570 },
      actScore: { min: 33, max: 35 },
      toeflScore: 100,
      ieltsScore: 7.5,
      gpa: 3.9,
      otherRequirements: ["Intellectual vitality", "Innovation", "Leadership", "Essays", "Recommendations"],
    },
  },
  {
    id: "toronto",
    name: "University of Toronto",
    location: "global",
    country: "Canada",
    tuitionRange: { min: 40000, max: 55000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Top Canadian university", "Post-study work visa", "Diverse city", "Research excellence"],
    cons: ["Cold weather", "High tuition for internationals", "Large class sizes"],
    ranking: 6,
    admissionRequirements: {
      aLevels: "AAA or equivalent",
      ibScore: 32,
      ieltsScore: 6.5,
      toeflScore: 89,
      gpa: 3.5,
      otherRequirements: ["Supplementary application", "Video essays (some programs)", "High school transcript"],
    },
  },
  {
    id: "ucl",
    name: "University College London",
    location: "global",
    country: "UK",
    tuitionRange: { min: 25000, max: 40000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Central London location", "Global outlook", "Strong research", "Diverse community"],
    cons: ["High cost of living", "Competitive admission"],
    ranking: 7,
    admissionRequirements: {
      aLevels: "A*AA to ABB depending on course",
      ibScore: 34,
      ieltsScore: 6.5,
      toeflScore: 92,
      otherRequirements: ["Personal statement", "Academic references", "Interview (some courses)"],
    },
  },
  {
    id: "melbourne",
    name: "University of Melbourne",
    location: "global",
    country: "Australia",
    tuitionRange: { min: 35000, max: 50000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Top Australian university", "Post-study work visa", "Great quality of life", "Research focus"],
    cons: ["Far from home", "High cost of living"],
    ranking: 8,
    admissionRequirements: {
      aLevels: "BBB or equivalent",
      ibScore: 31,
      ieltsScore: 6.5,
      toeflScore: 79,
      gpa: 3.3,
      otherRequirements: ["Academic transcript", "English proficiency", "Statement of purpose (some programs)"],
    },
  },
  {
    id: "eth",
    name: "ETH Zurich",
    location: "global",
    country: "Switzerland",
    tuitionRange: { min: 1500, max: 3000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Top European tech university", "Very affordable", "High quality of life", "Strong STEM"],
    cons: ["German language for some courses", "High cost of living", "Entrance exam"],
    ranking: 9,
    admissionRequirements: {
      aLevels: "AAA or equivalent",
      ibScore: 35,
      ieltsScore: 7.0,
      toeflScore: 100,
      gpa: 3.7,
      otherRequirements: ["ETH entrance examination", "German proficiency for bachelor's", "Strong math and science background"],
    },
  },
  {
    id: "nus",
    name: "National University of Singapore",
    location: "global",
    country: "Singapore",
    tuitionRange: { min: 15000, max: 25000, currency: "USD" },
    scholarshipAvailable: true,
    pros: ["Top Asian university", "Strong industry links", "Safe", "Gateway to Asia"],
    cons: ["Competitive", "Strict regulations", "Hot climate"],
    ranking: 10,
    admissionRequirements: {
      aLevels: "AAA or equivalent",
      ibScore: 37,
      ieltsScore: 6.5,
      toeflScore: 85,
      gpa: 3.6,
      otherRequirements: ["SAT/ACT recommended", "Interview (some courses)", "Portfolio (some courses)"],
    },
  },
];

// Combined export
export const allUniversities = [...nigerianUniversities, ...africanUniversities, ...globalUniversities];
