import { Course, CourseRecommendation, UserProfile } from "@/types";
import { allCourses as courses } from "@/data/courses";

// Weights for the recommendation algorithm
const WEIGHTS = {
  interest: 0.30,
  personality: 0.15,
  financial: 0.20,
  location: 0.10,
  future: 0.10,
  academic: 0.15, // NEW: academic strength weight
};

// Academic track constraints - which tracks can access which course categories
const TRACK_COURSE_MAPPING: Record<string, string[]> = {
  science: [
    "Technology", "Health", "Engineering", "Finance & Business", 
    "Governance & Policy", "Social Impact", "Media & Creative"
  ],
  commercial: [
    "Finance & Business", "Governance & Policy", "Social Impact", 
    "Media & Creative", "Technology" // limited tech access
  ],
  art: [
    "Media & Creative", "Governance & Policy", "Social Impact", 
    "Finance & Business" // limited finance access
  ],
};

// Courses that are STRICTLY science-only (Art/Commercial students cannot access)
const SCIENCE_ONLY_COURSES = [
  "medicine", "computer-science", "mechanical-engineering", "nursing",
  "data-science", "cybersecurity", "software-engineering", "artificial-intelligence",
  "ai-machine-learning", "biomedical-engineering", "pharmacy", "public-health",
  "health-informatics", "nutrition-dietetics", "renewable-energy-engineering",
  "civil-engineering", "petroleum-engineering", "electrical-electronics-engineering",
  "mathematics", "physics", "chemistry", "chemical-engineering"
];

// Courses that Commercial students CAN access from Tech (not heavy science)
const COMMERCIAL_TECH_ALLOWED = [
  "information-technology", "ux-ui-design", "product-management", 
  "blockchain-web3", "cloud-computing", "digital-marketing", "fintech",
  "game-development"
];

export function calculateRecommendations(profile: UserProfile): CourseRecommendation[] {
  const userTrack = profile.academicTrack;
  
  // Filter courses based on academic track
  const eligibleCourses = courses.filter(course => {
    // If course has explicit track requirements, check them
    if (course.academicTrackRequired && course.academicTrackRequired.length > 0) {
      return course.academicTrackRequired.includes(userTrack);
    }
    
    // Check if course is in science-only list
    if (SCIENCE_ONLY_COURSES.includes(course.id)) {
      return userTrack === "science";
    }
    
    // For commercial students, allow specific tech courses
    if (userTrack === "commercial") {
      if (course.category === "Technology") {
        return COMMERCIAL_TECH_ALLOWED.includes(course.id);
      }
      return TRACK_COURSE_MAPPING.commercial.includes(course.category);
    }
    
    // For art students
    if (userTrack === "art") {
      if (course.category === "Technology") {
        return ["ux-ui-design", "digital-marketing", "game-development", "product-management"].includes(course.id);
      }
      return TRACK_COURSE_MAPPING.art.includes(course.category);
    }
    
    // Science students can access all
    return true;
  });
  
  const recommendations: CourseRecommendation[] = eligibleCourses.map(course => {
    const interestScore = calculateInterestScore(course, profile);
    const personalityScore = calculatePersonalityScore(course, profile);
    const financialScore = calculateFinancialScore(course, profile);
    const locationScore = calculateLocationScore(course, profile);
    const futureScore = calculateFutureScore(course);
    const academicScore = calculateAcademicScore(course, profile);

    const fitScore = 
      interestScore * WEIGHTS.interest +
      personalityScore * WEIGHTS.personality +
      financialScore * WEIGHTS.financial +
      locationScore * WEIGHTS.location +
      futureScore * WEIGHTS.future +
      academicScore * WEIGHTS.academic;

    return {
      course,
      fitScore: Math.round(fitScore),
      interestScore: Math.round(interestScore),
      personalityScore: Math.round(personalityScore),
      financialScore: Math.round(financialScore),
      locationScore: Math.round(locationScore),
      futureScore: Math.round(futureScore),
      whyFits: generateWhyFits(course, profile, { interestScore, personalityScore, financialScore, locationScore, futureScore, academicScore }),
    };
  });

  // Sort by fit score (highest first) and return top 20
  return recommendations.sort((a, b) => b.fitScore - a.fitScore).slice(0, 20);
}

function calculateInterestScore(course: Course, profile: UserProfile): number {
  let score = 0;
  let matchCount = 0;

  course.interestMatch.forEach(interest => {
    const userInterest = profile.interests[interest];
    if (userInterest !== undefined) {
      score += userInterest * 20; // Scale 0-5 to 0-100
      matchCount++;
    }
  });

  return matchCount > 0 ? score / matchCount : 50;
}

function calculatePersonalityScore(course: Course, profile: UserProfile): number {
  const coursePersonality = course.personalityMatch;
  const userPersonality = profile.personality;

  // Calculate similarity (lower difference = higher score)
  const traits = ['analyticalVsCreative', 'structuredVsFlexible', 'peopleVsTask', 'riskVsStability'] as const;
  
  let totalDifference = 0;
  traits.forEach(trait => {
    const diff = Math.abs(coursePersonality[trait] - userPersonality[trait]);
    totalDifference += diff;
  });

  // Max difference is 16 (4 traits * 4 max diff each)
  // Convert to score where 0 diff = 100, max diff = 0
  const score = Math.max(0, 100 - (totalDifference / 16) * 100);
  return score;
}

function calculateFinancialScore(course: Course, profile: UserProfile): number {
  // Filter schools based on preferred location
  const relevantSchools = course.schools.filter(s => 
    s.location === profile.preferredLocation || profile.preferredLocation === 'global'
  );
  
  if (relevantSchools.length === 0) return 50;

  // Find cheapest option
  const cheapestSchool = relevantSchools.reduce((min, school) => {
    const tuition = school.tuitionRange.min;
    const minTuition = min.tuitionRange.min;
    
    // Convert to same currency for comparison (USD baseline)
    const normalizedTuition = school.tuitionRange.currency === 'NGN' ? tuition / 1500 : tuition;
    const normalizedMin = min.tuitionRange.currency === 'NGN' ? minTuition / 1500 : minTuition;
    
    return normalizedTuition < normalizedMin ? school : min;
  });

  const tuition = cheapestSchool.tuitionRange.min;
  const currency = cheapestSchool.tuitionRange.currency;
  
  // Normalize user budget to USD
  const userBudget = profile.budgetRange.currency === 'NGN' 
    ? profile.budgetRange.max / 1500 
    : profile.budgetRange.max;
  
  const normalizedTuition = currency === 'NGN' ? tuition / 1500 : tuition;

  // Score based on affordability
  if (normalizedTuition <= userBudget) {
    return 100;
  } else if (normalizedTuition <= userBudget * 1.5) {
    return 70;
  } else if (normalizedTuition <= userBudget * 2) {
    return 50;
  } else {
    return 30;
  }
}

function calculateLocationScore(course: Course, profile: UserProfile): number {
  const schoolsInPreferredLocation = course.schools.filter(
    school => school.location === profile.preferredLocation
  );

  if (schoolsInPreferredLocation.length >= 3) return 100;
  if (schoolsInPreferredLocation.length >= 2) return 80;
  if (schoolsInPreferredLocation.length >= 1) return 60;
  return 40;
}

function calculateFutureScore(course: Course): number {
  const outlook = course.futureOutlook;
  // Average of current relevance and future relevance, scaled to 100
  return ((outlook.relevanceToday + outlook.relevanceIn5Years) / 2) * 10;
}

// NEW: Calculate academic strength score
function calculateAcademicScore(course: Course, profile: UserProfile): number {
  let score = 50; // Base score
  
  // WAEC estimate impact
  const waecMultiplier = {
    'mostly_distinctions': 1.0,
    'mix_distinctions_credits': 0.8,
    'mostly_credits': 0.6,
  };
  
  // JAMB confidence impact
  const jambMultiplier = {
    'very_confident': 1.0,
    'fairly_confident': 0.8,
    'not_confident': 0.6,
  };
  
  // Learning style impact
  const learningMultiplier = {
    'fast_learner': 1.0,
    'moderate_learner': 0.85,
    'practical_learner': 0.7,
  };
  
  const waecScore = waecMultiplier[profile.waecEstimate] || 0.7;
  const jambScore = jambMultiplier[profile.jambEstimate] || 0.7;
  const learningScore = learningMultiplier[profile.learningStyle] || 0.7;
  
  // Course difficulty level (if specified)
  const courseDifficulty = course.difficultyLevel || 'medium';
  
  // Calculate base academic score
  const academicStrength = (waecScore + jambScore + learningScore) / 3;
  
  // Adjust score based on course difficulty and academic strength
  if (courseDifficulty === 'high') {
    // High difficulty courses favor stronger academics
    score = academicStrength >= 0.9 ? 100 : academicStrength >= 0.7 ? 80 : 60;
  } else if (courseDifficulty === 'medium') {
    score = academicStrength >= 0.7 ? 90 : academicStrength >= 0.5 ? 75 : 60;
  } else {
    // Low difficulty courses are accessible to all
    score = 85;
  }
  
  return score;
}

function generateWhyFits(
  course: Course, 
  profile: UserProfile,
  scores: { 
    interestScore: number; 
    personalityScore: number; 
    financialScore: number; 
    locationScore: number; 
    futureScore: number;
    academicScore: number;
  }
): string {
  const reasons: string[] = [];

  // Interest match
  if (scores.interestScore >= 80) {
    const matchedInterests = course.interestMatch
      .filter(i => (profile.interests[i] || 0) >= 4)
      .map(i => i.replace('-', ' & '));
    if (matchedInterests.length > 0) {
      reasons.push(`strongly aligns with your interest in ${matchedInterests.join(' and ')}`);
    }
  } else if (scores.interestScore >= 60) {
    reasons.push(`matches your interests well`);
  }

  // Personality match
  if (scores.personalityScore >= 80) {
    reasons.push(`suits your personality type`);
  }

  // Financial feasibility
  if (scores.financialScore >= 80) {
    reasons.push(`fits within your budget`);
  }

  // Future relevance
  if (scores.futureScore >= 90) {
    reasons.push(`has excellent career prospects for the next 5+ years`);
  }

  // Location
  if (scores.locationScore >= 80) {
    reasons.push(`has great options in your preferred study location`);
  }

  // Academic fit
  if (scores.academicScore >= 85) {
    reasons.push(`matches your academic strengths`);
  }

  if (reasons.length === 0) {
    return `This course offers a balanced fit across your interests, personality, and goals.`;
  }

  return `This course ${reasons.slice(0, 3).join(', ')}.`;
}

// Helper function to generate personalized assessment summary
export function generatePersonalizedSummary(profile: UserProfile, recommendations: CourseRecommendation[]): string {
  const firstName = profile.fullName?.split(' ')[0] || 'there';
  
  // Determine learner type
  const learnerType = getLearnerType(profile);
  
  // Get top industries
  const topIndustries = Object.entries(profile.interests || {})
    .filter(([_, score]) => (score as number) >= 4)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 2)
    .map(([id]) => formatIndustryName(id));
  
  // Get work style preference
  const workStyle = getWorkStylePreference(profile.personality);
  
  // Get potential challenges
  const challenges = getChallenges(profile.personality);
  
  // Get top course categories
  const topCourseCategories = [...new Set(recommendations.slice(0, 5).map(r => r.course.category))].slice(0, 2);
  
  return `Hi ${firstName}, based on your interests, personality, academic strengths, and financial capacity, you are a ${learnerType} kind of learner. You tend to thrive in ${topIndustries.length > 0 ? topIndustries.join(' and ') : 'various industries'}, enjoy ${workStyle}, and may find ${challenges} more challenging. This is why courses in ${topCourseCategories.join(' and ')} suit you best.`;
}

function getLearnerType(profile: UserProfile): string {
  const { personality, waecEstimate, learningStyle } = profile;
  
  const analytical = personality?.analyticalVsCreative <= 0;
  const structured = personality?.structuredVsFlexible <= 0;
  const fastLearner = learningStyle === 'fast_learner';
  const strongAcademics = waecEstimate === 'mostly_distinctions';
  
  if (analytical && structured && strongAcademics) {
    return "methodical and academically strong";
  } else if (!analytical && !structured) {
    return "creative and adaptable";
  } else if (personality?.peopleVsTask <= -1) {
    return "people-oriented and collaborative";
  } else if (fastLearner && strongAcademics) {
    return "quick-learning and high-achieving";
  } else if (personality?.riskVsStability <= -1) {
    return "innovative and entrepreneurial";
  } else {
    return "balanced and versatile";
  }
}

function getWorkStylePreference(personality: UserProfile['personality']): string {
  if (!personality) return "varied work environments";
  
  const parts = [];
  
  if (personality.analyticalVsCreative <= -1) {
    parts.push("solving complex problems with logic");
  } else if (personality.analyticalVsCreative >= 1) {
    parts.push("creative expression and innovation");
  }
  
  if (personality.peopleVsTask <= -1) {
    parts.push("working with and helping others");
  } else if (personality.peopleVsTask >= 1) {
    parts.push("focused independent work");
  }
  
  return parts.length > 0 ? parts.join(' and ') : "a balanced mix of activities";
}

function getChallenges(personality: UserProfile['personality']): string {
  if (!personality) return "certain areas";
  
  if (personality.analyticalVsCreative <= -1) {
    return "unstructured creative tasks";
  } else if (personality.analyticalVsCreative >= 1) {
    return "highly technical or mathematical work";
  } else if (personality.structuredVsFlexible <= -1) {
    return "unpredictable or constantly changing environments";
  } else if (personality.structuredVsFlexible >= 1) {
    return "rigid routines and strict procedures";
  }
  
  return "certain specialized areas";
}

function formatIndustryName(id: string): string {
  const names: Record<string, string> = {
    'technology': 'Technology',
    'media-creative': 'Media & Creative fields',
    'governance-policy': 'Governance & Policy',
    'finance-business': 'Finance & Business',
    'health': 'Healthcare',
    'engineering': 'Engineering',
    'social-impact': 'Social Impact',
  };
  return names[id] || id;
}
