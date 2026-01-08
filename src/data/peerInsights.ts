// Peer comparison and student insight analytics
// Based on aggregated, anonymized student choice patterns

export interface PeerInsight {
  department: "science" | "art" | "commercial";
  topCourses: string[]; // Most commonly chosen courses
  successRate: number; // Percentage that report satisfaction
  alternativesExplored: string[]; // Other courses students like this explore
  description: string;
}

export interface CoursePopularityByProfile {
  courseId: string;
  scienceStudents: number; // % of science students choosing this
  artStudents: number; // % of art students choosing this
  commercialStudents: number; // % of commercial students choosing this
  fastLearners: number; // % of fast learners choosing this
  practicalLearners: number; // % of practical learners choosing this
  avgSatisfaction: number; // 1-10 satisfaction score
}

// ===== PEER INSIGHTS BY DEPARTMENT =====
export const PEER_INSIGHTS: PeerInsight[] = [
  {
    department: "science",
    topCourses: ["computer-science", "medicine", "nursing", "mechanical-engineering", "pharmacy"],
    successRate: 78,
    alternativesExplored: ["data-science", "cybersecurity", "biomedical-engineering", "petroleum-engineering", "dentistry"],
    description: "Science students commonly choose tech or health courses. 78% report satisfaction with their choice. Many explore multiple engineering or medical specializations before deciding.",
  },
  {
    department: "art",
    topCourses: ["law", "mass-communication", "psychology", "international-relations", "political-science"],
    successRate: 72,
    alternativesExplored: ["sociology", "journalism", "public-administration", "creative-writing", "english"],
    description: "Arts students prefer law, media, and social sciences. 72% satisfaction rate. Many consider multiple humanities paths before committing.",
  },
  {
    department: "commercial",
    topCourses: ["accounting", "business-administration", "economics", "banking-finance", "marketing"],
    successRate: 75,
    alternativesExplored: ["fintech", "entrepreneurship", "actuarial-science", "insurance", "human-resource-management"],
    description: "Commercial students gravitate toward business and finance. 75% satisfaction. Growing interest in fintech and entrepreneurship.",
  },
];

// ===== COURSE POPULARITY BY STUDENT PROFILE =====
export const COURSE_POPULARITY: CoursePopularityByProfile[] = [
  {
    courseId: "computer-science",
    scienceStudents: 32, // 32% of science students consider this
    artStudents: 2,
    commercialStudents: 5,
    fastLearners: 28,
    practicalLearners: 22,
    avgSatisfaction: 8.4,
  },
  {
    courseId: "medicine",
    scienceStudents: 28,
    artStudents: 0,
    commercialStudents: 0,
    fastLearners: 35,
    practicalLearners: 18,
    avgSatisfaction: 8.7,
  },
  {
    courseId: "nursing",
    scienceStudents: 18,
    artStudents: 1,
    commercialStudents: 1,
    fastLearners: 12,
    practicalLearners: 25,
    avgSatisfaction: 7.9,
  },
  {
    courseId: "law",
    scienceStudents: 3,
    artStudents: 35,
    commercialStudents: 12,
    fastLearners: 22,
    practicalLearners: 15,
    avgSatisfaction: 7.6,
  },
  {
    courseId: "accounting",
    scienceStudents: 5,
    artStudents: 8,
    commercialStudents: 38,
    fastLearners: 18,
    practicalLearners: 24,
    avgSatisfaction: 7.2,
  },
  {
    courseId: "economics",
    scienceStudents: 7,
    artStudents: 12,
    commercialStudents: 28,
    fastLearners: 24,
    practicalLearners: 16,
    avgSatisfaction: 7.8,
  },
  {
    courseId: "mass-communication",
    scienceStudents: 2,
    artStudents: 25,
    commercialStudents: 8,
    fastLearners: 15,
    practicalLearners: 20,
    avgSatisfaction: 8.1,
  },
  {
    courseId: "mechanical-engineering",
    scienceStudents: 15,
    artStudents: 0,
    commercialStudents: 1,
    fastLearners: 18,
    practicalLearners: 22,
    avgSatisfaction: 7.7,
  },
  {
    courseId: "data-science",
    scienceStudents: 12,
    artStudents: 1,
    commercialStudents: 6,
    fastLearners: 20,
    practicalLearners: 8,
    avgSatisfaction: 8.6,
  },
  {
    courseId: "cybersecurity",
    scienceStudents: 10,
    artStudents: 1,
    commercialStudents: 3,
    fastLearners: 16,
    practicalLearners: 12,
    avgSatisfaction: 8.3,
  },
  {
    courseId: "business-administration",
    scienceStudents: 4,
    artStudents: 10,
    commercialStudents: 32,
    fastLearners: 16,
    practicalLearners: 25,
    avgSatisfaction: 7.5,
  },
  {
    courseId: "pharmacy",
    scienceStudents: 14,
    artStudents: 0,
    commercialStudents: 0,
    fastLearners: 16,
    practicalLearners: 18,
    avgSatisfaction: 7.8,
  },
  {
    courseId: "psychology",
    scienceStudents: 6,
    artStudents: 22,
    commercialStudents: 8,
    fastLearners: 18,
    practicalLearners: 14,
    avgSatisfaction: 8.0,
  },
  {
    courseId: "international-relations",
    scienceStudents: 2,
    artStudents: 18,
    commercialStudents: 7,
    fastLearners: 20,
    practicalLearners: 10,
    avgSatisfaction: 7.7,
  },
  {
    courseId: "banking-finance",
    scienceStudents: 3,
    artStudents: 5,
    commercialStudents: 25,
    fastLearners: 19,
    practicalLearners: 16,
    avgSatisfaction: 7.6,
  },
  {
    courseId: "fintech",
    scienceStudents: 8,
    artStudents: 2,
    commercialStudents: 15,
    fastLearners: 22,
    practicalLearners: 12,
    avgSatisfaction: 8.5,
  },
  {
    courseId: "ux-ui-design",
    scienceStudents: 5,
    artStudents: 15,
    commercialStudents: 6,
    fastLearners: 14,
    practicalLearners: 18,
    avgSatisfaction: 8.2,
  },
  {
    courseId: "ai-machine-learning",
    scienceStudents: 9,
    artStudents: 0,
    commercialStudents: 2,
    fastLearners: 25,
    practicalLearners: 8,
    avgSatisfaction: 8.9,
  },
  {
    courseId: "renewable-energy-engineering",
    scienceStudents: 6,
    artStudents: 0,
    commercialStudents: 1,
    fastLearners: 12,
    practicalLearners: 14,
    avgSatisfaction: 7.9,
  },
  {
    courseId: "digital-marketing",
    scienceStudents: 3,
    artStudents: 12,
    commercialStudents: 14,
    fastLearners: 11,
    practicalLearners: 16,
    avgSatisfaction: 7.4,
  },
];

// Helper function to get peer insights for a student's department
export function getPeerInsights(department: "science" | "art" | "commercial"): PeerInsight | undefined {
  return PEER_INSIGHTS.find(p => p.department === department);
}

// Helper function to get course popularity data
export function getCoursePopularity(courseId: string): CoursePopularityByProfile | undefined {
  return COURSE_POPULARITY.find(c => c.courseId === courseId);
}

// Helper function to generate peer comparison message
export function generatePeerComparison(
  department: "science" | "art" | "commercial",
  learningStyle: string,
  courseId: string
): string {
  const peerInsight = getPeerInsights(department);
  const coursePopularity = getCoursePopularity(courseId);
  
  if (!peerInsight || !coursePopularity) {
    return "Based on aggregated student data, this course is a solid choice.";
  }
  
  let message = "";
  
  // Department-specific insight
  const departmentPercent = 
    department === "science" ? coursePopularity.scienceStudents :
    department === "art" ? coursePopularity.artStudents :
    coursePopularity.commercialStudents;
  
  if (departmentPercent > 20) {
    message += `Popular choice: ${departmentPercent}% of ${department} students explore this field. `;
  } else if (departmentPercent > 10) {
    message += `Emerging option: ${departmentPercent}% of ${department} students consider this path. `;
  } else {
    message += `Unique path: Only ${departmentPercent}% of ${department} students explore this, giving you differentiation. `;
  }
  
  // Learning style match
  if (learningStyle === "fast_learner" && coursePopularity.fastLearners > 20) {
    message += `Fast learners often excel here (${coursePopularity.fastLearners}% choose this). `;
  } else if (learningStyle === "practical_learner" && coursePopularity.practicalLearners > 20) {
    message += `Practical learners thrive in this field (${coursePopularity.practicalLearners}% gravitate here). `;
  }
  
  // Satisfaction score
  if (coursePopularity.avgSatisfaction >= 8.5) {
    message += `Students report very high satisfaction (${coursePopularity.avgSatisfaction}/10). `;
  } else if (coursePopularity.avgSatisfaction >= 7.5) {
    message += `Good satisfaction rate (${coursePopularity.avgSatisfaction}/10) reported by current students. `;
  } else {
    message += `Moderate satisfaction (${coursePopularity.avgSatisfaction}/10) - research thoroughly before committing. `;
  }
  
  return message.trim();
}

// Helper function to get alternative courses students explore
export function getSimilarStudentChoices(
  department: "science" | "art" | "commercial",
  excludeCourseId?: string
): string[] {
  const peerInsight = getPeerInsights(department);
  if (!peerInsight) return [];
  
  const allChoices = [...peerInsight.topCourses, ...peerInsight.alternativesExplored];
  
  if (excludeCourseId) {
    return allChoices.filter(id => id !== excludeCourseId).slice(0, 5);
  }
  
  return allChoices.slice(0, 5);
}
