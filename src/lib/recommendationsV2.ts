/**
 * ========================================
 * SCHOOL PATHFINDER RECOMMENDATION ENGINE V2
 * ========================================
 * 
 * TWO-STAGE ARCHITECTURE:
 * 1. ELIGIBILITY FILTERING (Hard Exclusions)
 * 2. SCORING & RANKING (Weighted Optimization)
 * 
 * Production-grade, scalable implementation
 * Built to support millions of users
 * 
 * @author School Pathfinder Team
 * @version 2.0.0
 */

import { Course, CourseRecommendation, UserProfile } from "@/types";
import { allCourses as courses } from "@/data/courses";
import { COURSE_DEPARTMENT_MAP, Department } from "@/data/universities";

// ========================================
// CONFIGURATION & CONSTANTS
// ========================================

/**
 * Scoring weights for Stage 2 optimization
 * Total must equal 100%
 */
const SCORING_WEIGHTS = {
  interestMatch: 0.35,      // 35% - Primary driver
  personalityFit: 0.20,     // 20% - Cultural fit
  academicStrength: 0.15,   // 15% - Academic viability
  futureRelevance: 0.15,    // 15% - Career sustainability
  financialFeasibility: 0.15 // 15% - Affordability
} as const;

/**
 * Output constraints
 */
const OUTPUT_CONSTRAINTS = {
  totalCourses: 20,           // Exactly 20 courses
  maxPerIndustry: 5,          // Max 5 courses per industry/category
  maxGlobalOnly: 5,           // Max 5 global-only courses
  minimumScore: 65            // Minimum score threshold
} as const;

/**
 * Filtering thresholds
 */
const FILTER_THRESHOLDS = {
  minInterestScore: 2,        // Interest scores ≤ 2 exclude entire industry
  minAcademicMatch: 0.4       // Minimum academic strength multiplier
} as const;

// ========================================
// TYPES & INTERFACES
// ========================================

/**
 * Extended recommendation with explanation metadata
 */
export interface EnhancedCourseRecommendation extends CourseRecommendation {
  // Explanation metadata
  eligibilityRules: {
    passedDepartmentGate: boolean;
    passedInterestGate: boolean;
    passedAcademicGate: boolean;
    passedGlobalConstraint: boolean;
  };
  scoringBreakdown: {
    interestMatch: number;
    personalityFit: number;
    academicStrength: number;
    futureRelevance: number;
    financialFeasibility: number;
    weightedTotal: number;
  };
  recommendationReason: string[];
}

/**
 * Internal course scoring data
 */
interface CourseScore {
  course: Course;
  rawScores: {
    interestMatch: number;
    personalityFit: number;
    academicStrength: number;
    futureRelevance: number;
    financialFeasibility: number;
  };
  weightedScore: number;
  eligibilityPassed: boolean;
  eligibilityRules: {
    passedDepartmentGate: boolean;
    passedInterestGate: boolean;
    passedAcademicGate: boolean;
    passedGlobalConstraint: boolean;
  };
}

// ========================================
// STAGE 1: ELIGIBILITY FILTERING
// ========================================

/**
 * Apply all hard exclusion rules to filter eligible courses
 * 
 * @param profile User assessment profile
 * @returns Array of courses that pass all eligibility gates
 */
function applyEligibilityFilters(profile: UserProfile): Course[] {
  const userDepartment = profile.academicTrack as Department;
  
  return courses.filter(course => {
    // Gate 1: Department Gate
    if (!passesDepartmentGate(course, userDepartment)) {
      return false;
    }
    
    // Gate 2: Interest Gate
    if (!passesInterestGate(course, profile)) {
      return false;
    }
    
    // Gate 3: Academic Viability Gate
    if (!passesAcademicGate(course, profile)) {
      return false;
    }
    
    // All gates passed
    return true;
  });
}

/**
 * GATE 1: Department Gate
 * Each course belongs to exactly one department (Science, Art, Commercial)
 * Exclude any course that does not match the student's department
 * 
 * @param course Course to evaluate
 * @param userDepartment Student's academic track/department
 * @returns true if course matches user's department
 */
function passesDepartmentGate(course: Course, userDepartment: Department): boolean {
  // Check master department mapping first (authoritative source)
  const courseDepartment = COURSE_DEPARTMENT_MAP[course.id];
  
  if (courseDepartment) {
    return courseDepartment === userDepartment;
  }
  
  // Fallback: Check course's explicit track requirements
  if (course.academicTrackRequired && course.academicTrackRequired.length > 0) {
    return course.academicTrackRequired.includes(userDepartment);
  }
  
  // Conservative: If no mapping exists, exclude the course
  return false;
}

/**
 * GATE 2: Interest Gate
 * Interest scores range from 1-5
 * If interest ≤ 2 for an industry, exclude all courses in that industry
 * CRITICAL: Match based on PRIMARY interest (first in interestMatch array)
 * 
 * @param course Course to evaluate
 * @param profile User profile with interest scores
 * @returns true if user has sufficient interest in course's PRIMARY industry
 */
function passesInterestGate(course: Course, profile: UserProfile): boolean {
  // Get all industries this course matches
  const courseIndustries = course.interestMatch || [];
  
  if (courseIndustries.length === 0) {
    // If no industry mapping, exclude to be safe
    return false;
  }
  
  // Check if user has ANY interests set at all
  const userInterests = profile.interests || {};
  const hasAnyInterests = Object.keys(userInterests).length > 0;
  
  if (!hasAnyInterests) {
    // If user hasn't set ANY interests, allow all courses (assessment incomplete)
    return true;
  }
  
  // Use PRIMARY interest (first in array) for stricter matching
  // This prevents "health" courses with secondary "social-impact" from appearing
  // when user only selected social-impact
  const primaryIndustry = courseIndustries[0];
  const userInterestScore = userInterests[primaryIndustry];
  
  const passes = userInterestScore !== undefined && 
                 userInterestScore > 0 && 
                 userInterestScore > FILTER_THRESHOLDS.minInterestScore;
  
  return passes;
}

/**
 * GATE 3: Academic Viability Gate
 * Each course has a minimum academic requirement
 * Exclude courses where student academic strength < minimum
 * 
 * @param course Course to evaluate
 * @param profile User profile with academic indicators
 * @returns true if user's academic strength meets course requirements
 */
function passesAcademicGate(course: Course, profile: UserProfile): boolean {
  // Calculate user's academic strength multiplier (0.0 to 1.0)
  const academicStrength = calculateAcademicStrength(profile);
  
  // Determine course difficulty and minimum requirements
  const courseDifficulty = course.difficultyLevel || 'medium';
  
  // Minimum academic strength thresholds by difficulty
  const minimumThresholds: Record<string, number> = {
    'low': 0.3,      // Accessible to most students
    'medium': 0.5,   // Requires moderate academic capability
    'high': 0.7      // Requires strong academic capability
  };
  
  const requiredStrength = minimumThresholds[courseDifficulty] || 0.5;
  
  return academicStrength >= requiredStrength;
}

/**
 * Calculate user's overall academic strength
 * 
 * @param profile User profile
 * @returns Academic strength multiplier (0.0 to 1.0)
 */
function calculateAcademicStrength(profile: UserProfile): number {
  // WAEC performance multiplier
  const waecMultipliers: Record<string, number> = {
    'mostly_distinctions': 1.0,
    'mix_distinctions_credits': 0.75,
    'mostly_credits': 0.5,
  };
  
  // JAMB confidence multiplier
  const jambMultipliers: Record<string, number> = {
    'very_confident': 1.0,
    'fairly_confident': 0.75,
    'not_confident': 0.5,
  };
  
  // Learning style multiplier
  const learningMultipliers: Record<string, number> = {
    'fast_learner': 1.0,
    'moderate_learner': 0.85,
    'practical_learner': 0.7,
  };
  
  const waecScore = waecMultipliers[profile.waecEstimate] || 0.6;
  const jambScore = jambMultipliers[profile.jambEstimate] || 0.6;
  const learningScore = learningMultipliers[profile.learningStyle] || 0.7;
  
  // Average the three components
  return (waecScore + jambScore + learningScore) / 3;
}

// ========================================
// STAGE 2: SCORING & RANKING
// ========================================

/**
 * Score eligible courses using weighted optimization
 * 
 * @param eligibleCourses Courses that passed Stage 1 filtering
 * @param profile User profile
 * @returns Scored courses with detailed breakdown
 */
function scoreCourses(eligibleCourses: Course[], profile: UserProfile): CourseScore[] {
  return eligibleCourses.map(course => {
    // Calculate individual component scores (0-100 scale)
    const interestMatch = scoreInterestMatch(course, profile);
    const personalityFit = scorePersonalityFit(course, profile);
    const academicStrength = scoreAcademicStrength(course, profile);
    const futureRelevance = scoreFutureRelevance(course);
    const financialFeasibility = scoreFinancialFeasibility(course, profile);
    
    // Apply weights to calculate final score
    const weightedScore = 
      (interestMatch * SCORING_WEIGHTS.interestMatch) +
      (personalityFit * SCORING_WEIGHTS.personalityFit) +
      (academicStrength * SCORING_WEIGHTS.academicStrength) +
      (futureRelevance * SCORING_WEIGHTS.futureRelevance) +
      (financialFeasibility * SCORING_WEIGHTS.financialFeasibility);
    
    return {
      course,
      rawScores: {
        interestMatch,
        personalityFit,
        academicStrength,
        futureRelevance,
        financialFeasibility
      },
      weightedScore: Math.round(weightedScore),
      eligibilityPassed: true,
      eligibilityRules: {
        passedDepartmentGate: true,
        passedInterestGate: true,
        passedAcademicGate: true,
        passedGlobalConstraint: true // Will be validated in final output stage
      }
    };
  });
}

/**
 * SCORE 1: Interest Match (35%)
 * How well the course aligns with user's industry interests
 * 
 * @param course Course to score
 * @param profile User profile
 * @returns Score 0-100
 */
function scoreInterestMatch(course: Course, profile: UserProfile): number {
  const courseIndustries = course.interestMatch || [];
  
  if (courseIndustries.length === 0) {
    return 50; // Neutral score for unclassified courses
  }
  
  let totalScore = 0;
  let matchCount = 0;
  
  courseIndustries.forEach(industry => {
    const userInterestScore = profile.interests[industry];
    
    if (userInterestScore !== undefined) {
      // Scale 1-5 interest to 0-100 score
      // 5 = 100, 4 = 80, 3 = 60, 2 = 40, 1 = 20
      totalScore += (userInterestScore * 20);
      matchCount++;
    }
  });
  
  return matchCount > 0 ? totalScore / matchCount : 50;
}

/**
 * SCORE 2: Personality Fit (20%)
 * How well the course matches user's personality traits
 * 
 * @param course Course to score
 * @param profile User profile
 * @returns Score 0-100
 */
function scorePersonalityFit(course: Course, profile: UserProfile): number {
  const coursePersonality = course.personalityMatch;
  const userPersonality = profile.personality;
  
  if (!coursePersonality || !userPersonality) {
    return 50; // Neutral score if data missing
  }
  
  // Calculate similarity across all personality dimensions
  const traits = ['analyticalVsCreative', 'structuredVsFlexible', 'peopleVsTask', 'riskVsStability'] as const;
  
  let totalDifference = 0;
  
  traits.forEach(trait => {
    const courseTrait = coursePersonality[trait] ?? 0;
    const userTrait = userPersonality[trait] ?? 0;
    
    // Calculate absolute difference (0 to 4 scale)
    const diff = Math.abs(courseTrait - userTrait);
    totalDifference += diff;
  });
  
  // Maximum possible difference: 4 traits × 4 max difference = 16
  // Convert to score: 0 difference = 100, max difference = 0
  const score = Math.max(0, 100 - (totalDifference / 16) * 100);
  
  return score;
}

/**
 * SCORE 3: Academic Strength Match (15%)
 * How well user's academic capability matches course demands
 * 
 * @param course Course to score
 * @param profile User profile
 * @returns Score 0-100
 */
function scoreAcademicStrength(course: Course, profile: UserProfile): number {
  const userStrength = calculateAcademicStrength(profile);
  const courseDifficulty = course.difficultyLevel || 'medium';
  
  // Scoring logic based on match between user strength and course difficulty
  if (courseDifficulty === 'high') {
    // High difficulty: reward strong academics heavily
    if (userStrength >= 0.9) return 100;
    if (userStrength >= 0.8) return 90;
    if (userStrength >= 0.7) return 75;
    if (userStrength >= 0.6) return 60;
    return 50;
  } else if (courseDifficulty === 'medium') {
    // Medium difficulty: balanced scoring
    if (userStrength >= 0.8) return 95;
    if (userStrength >= 0.7) return 90;
    if (userStrength >= 0.6) return 85;
    if (userStrength >= 0.5) return 75;
    return 60;
  } else {
    // Low difficulty: accessible to all, slight bonus for stronger students
    if (userStrength >= 0.7) return 90;
    return 85;
  }
}

/**
 * SCORE 4: Future Relevance (15%)
 * Career sustainability and market demand for the course
 * 
 * @param course Course to score
 * @returns Score 0-100
 */
function scoreFutureRelevance(course: Course): number {
  const outlook = course.futureOutlook;
  
  if (!outlook) {
    return 50; // Neutral score if no outlook data
  }
  
  // Average current and future relevance (1-10 scale)
  // Convert to 0-100 scale
  const currentRelevance = (outlook.relevanceToday ?? 5) * 10;
  const futureRelevance = (outlook.relevanceIn5Years ?? 5) * 10;
  
  // Weight future slightly more (40/60 split)
  const score = (currentRelevance * 0.4) + (futureRelevance * 0.6);
  
  return Math.min(100, Math.max(0, score));
}

/**
 * SCORE 5: Financial Feasibility (15%)
 * How affordable the course is based on user's budget
 * 
 * @param course Course to score
 * @param profile User profile
 * @returns Score 0-100
 */
function scoreFinancialFeasibility(course: Course, profile: UserProfile): number {
  const schools = course.schools || [];
  
  if (schools.length === 0) {
    return 50; // Neutral score if no school data
  }
  
  // Find the most affordable school option
  const cheapestSchool = schools.reduce((min, school) => {
    const tuition = school.tuitionRange?.min ?? Infinity;
    const minTuition = min.tuitionRange?.min ?? Infinity;
    
    // Normalize to USD for comparison
    const normalizedTuition = school.tuitionRange?.currency === 'NGN' ? tuition / 1500 : tuition;
    const normalizedMin = min.tuitionRange?.currency === 'NGN' ? minTuition / 1500 : minTuition;
    
    return normalizedTuition < normalizedMin ? school : min;
  });
  
  const tuition = cheapestSchool.tuitionRange?.min ?? 0;
  const currency = cheapestSchool.tuitionRange?.currency ?? 'USD';
  
  // Normalize user budget to USD
  const userBudget = profile.budgetRange.currency === 'NGN' 
    ? profile.budgetRange.max / 1500 
    : profile.budgetRange.max;
  
  const normalizedTuition = currency === 'NGN' ? tuition / 1500 : tuition;
  
  // Score based on affordability ratio
  const affordabilityRatio = userBudget / normalizedTuition;
  
  if (affordabilityRatio >= 1.5) return 100; // Very affordable
  if (affordabilityRatio >= 1.0) return 90;  // Within budget
  if (affordabilityRatio >= 0.8) return 75;  // Slightly stretch
  if (affordabilityRatio >= 0.6) return 60;  // Significant stretch
  if (affordabilityRatio >= 0.4) return 40;  // Very challenging
  return 20; // Likely unaffordable
}

// ========================================
// FINAL OUTPUT RULES
// ========================================

/**
 * Apply final output constraints and return exactly 20 courses
 * 
 * Rules:
 * - Exactly 20 courses
 * - Max 5 courses per industry
 * - Max 5 global-only courses
 * - Minimum score threshold: 65
 * - Sorted descending by score
 * 
 * @param scoredCourses All scored courses
 * @returns Final 20 recommendations
 */
function applyOutputConstraints(scoredCourses: CourseScore[]): CourseScore[] {
  // Sort by score (highest first)
  const sortedAll = [...scoredCourses].sort((a, b) => b.weightedScore - a.weightedScore);

  const finalCourses: CourseScore[] = [];
  const selectedIds = new Set<string>();
  const industryCounts: Record<string, number> = {};
  let globalOnlyCount = 0;

  const tryAddCourse = (
    courseScore: CourseScore,
    enforceIndustryLimit: boolean,
    enforceGlobalLimit: boolean
  ) => {
    if (finalCourses.length >= OUTPUT_CONSTRAINTS.totalCourses) return false;
    if (selectedIds.has(courseScore.course.id)) return false;

    const isGlobalOnly = courseScore.course.nigerianAvailable === false;
    if (enforceGlobalLimit && isGlobalOnly && globalOnlyCount >= OUTPUT_CONSTRAINTS.maxGlobalOnly) {
      return false;
    }

    const industry = courseScore.course.category || 'Other';
    const currentIndustryCount = industryCounts[industry] || 0;
    if (enforceIndustryLimit && currentIndustryCount >= OUTPUT_CONSTRAINTS.maxPerIndustry) {
      return false;
    }

    finalCourses.push(courseScore);
    selectedIds.add(courseScore.course.id);

    if (isGlobalOnly) {
      globalOnlyCount++;
    }
    industryCounts[industry] = currentIndustryCount + 1;

    courseScore.eligibilityRules.passedGlobalConstraint = !isGlobalOnly || !enforceGlobalLimit || globalOnlyCount <= OUTPUT_CONSTRAINTS.maxGlobalOnly;
    return true;
  };

  // Pass 1: Enforce minimum score and all constraints
  const qualifiedCourses = sortedAll.filter(
    sc => sc.weightedScore >= OUTPUT_CONSTRAINTS.minimumScore
  );
  for (const courseScore of qualifiedCourses) {
    tryAddCourse(courseScore, true, true);
    if (finalCourses.length >= OUTPUT_CONSTRAINTS.totalCourses) break;
  }

  // Pass 2: Relax minimum score, keep constraints
  if (finalCourses.length < OUTPUT_CONSTRAINTS.totalCourses) {
    for (const courseScore of sortedAll) {
      tryAddCourse(courseScore, true, true);
      if (finalCourses.length >= OUTPUT_CONSTRAINTS.totalCourses) break;
    }
  }

  // Pass 3: Relax industry + global-only limits to reach 20
  if (finalCourses.length < OUTPUT_CONSTRAINTS.totalCourses) {
    for (const courseScore of sortedAll) {
      tryAddCourse(courseScore, false, false);
      if (finalCourses.length >= OUTPUT_CONSTRAINTS.totalCourses) break;
    }
  }

  return finalCourses;
}

// ========================================
// EXPLANATION METADATA GENERATION
// ========================================

/**
 * Generate human-readable explanation for why a course was recommended
 * 
 * @param courseScore Scored course data
 * @param profile User profile
 * @returns Array of reasons
 */
function generateRecommendationReasons(courseScore: CourseScore, profile: UserProfile): string[] {
  const reasons: string[] = [];
  const scores = courseScore.rawScores;
  
  // Interest match reasons
  if (scores.interestMatch >= 80) {
    const matchedInterests = courseScore.course.interestMatch
      .filter(i => (profile.interests[i] || 0) >= 4)
      .map(i => formatIndustryName(i));
    
    if (matchedInterests.length > 0) {
      reasons.push(`Strongly aligns with your passion for ${matchedInterests.join(' and ')}`);
    }
  } else if (scores.interestMatch >= 60) {
    reasons.push('Good fit with your career interests');
  }
  
  // Personality fit reasons
  if (scores.personalityFit >= 80) {
    reasons.push('Excellent match with your personality and work style');
  } else if (scores.personalityFit >= 65) {
    reasons.push('Compatible with your personality traits');
  }
  
  // Academic strength reasons
  if (scores.academicStrength >= 85) {
    reasons.push('Well-suited to your academic strengths');
  } else if (scores.academicStrength >= 70) {
    reasons.push('Appropriate for your academic level');
  }
  
  // Future relevance reasons
  if (scores.futureRelevance >= 90) {
    reasons.push('Outstanding career prospects and future growth');
  } else if (scores.futureRelevance >= 75) {
    reasons.push('Strong career demand for the next 5+ years');
  }
  
  // Financial feasibility reasons
  if (scores.financialFeasibility >= 80) {
    reasons.push('Affordable options available within your budget');
  } else if (scores.financialFeasibility >= 60) {
    reasons.push('Financially feasible with planning');
  }
  
  // Fallback if no specific reasons
  if (reasons.length === 0) {
    reasons.push('Balanced fit across your profile');
  }
  
  return reasons.slice(0, 3); // Max 3 reasons for clarity
}

/**
 * Format industry ID to human-readable name
 */
function formatIndustryName(id: string): string {
  const names: Record<string, string> = {
    'technology': 'Technology',
    'media-creative': 'Media & Creative fields',
    'governance-policy': 'Governance & Policy',
    'finance-business': 'Finance & Business',
    'health': 'Healthcare',
    'engineering': 'Engineering',
    'social-impact': 'Social Impact',
    'education': 'Education',
  };
  return names[id] || id.replace('-', ' & ');
}

/**
 * Generate "Why Fits" summary text
 */
function generateWhyFits(reasons: string[]): string {
  if (reasons.length === 0) {
    return 'This course offers a balanced fit for your profile.';
  }
  
  return `This course ${reasons.join(', ').toLowerCase()}.`;
}

// ========================================
// MAIN RECOMMENDATION FUNCTION
// ========================================

/**
 * Calculate course recommendations using two-stage architecture
 * 
 * STAGE 1: Eligibility Filtering (Hard Exclusions)
 * STAGE 2: Scoring & Ranking (Weighted Optimization)
 * 
 * @param profile User assessment profile
 * @returns Enhanced course recommendations with explanation metadata
 */
export function calculateRecommendationsV2(profile: UserProfile): EnhancedCourseRecommendation[] {
  // STAGE 1: Apply eligibility filters
  const eligibleCourses = applyEligibilityFilters(profile);
  
  // STAGE 2: Score eligible courses
  const scoredCourses = scoreCourses(eligibleCourses, profile);
  
  // Apply final output constraints
  const finalCourses = applyOutputConstraints(scoredCourses);
  
  // Transform to enhanced recommendations with full metadata
  const recommendations: EnhancedCourseRecommendation[] = finalCourses.map(courseScore => {
    const reasons = generateRecommendationReasons(courseScore, profile);
    const whyFits = generateWhyFits(reasons);
    
    return {
      course: courseScore.course,
      fitScore: courseScore.weightedScore,
      interestScore: Math.round(courseScore.rawScores.interestMatch),
      personalityScore: Math.round(courseScore.rawScores.personalityFit),
      financialScore: Math.round(courseScore.rawScores.financialFeasibility),
      locationScore: 0, // Location removed from scoring
      futureScore: Math.round(courseScore.rawScores.futureRelevance),
      whyFits,
      eligibilityRules: courseScore.eligibilityRules,
      scoringBreakdown: {
        interestMatch: Math.round(courseScore.rawScores.interestMatch),
        personalityFit: Math.round(courseScore.rawScores.personalityFit),
        academicStrength: Math.round(courseScore.rawScores.academicStrength),
        futureRelevance: Math.round(courseScore.rawScores.futureRelevance),
        financialFeasibility: Math.round(courseScore.rawScores.financialFeasibility),
        weightedTotal: courseScore.weightedScore
      },
      recommendationReason: reasons
    };
  });
  
  return recommendations;
}

// ========================================
// UTILITY & HELPER FUNCTIONS
// ========================================

/**
 * Generate personalized assessment summary
 * Analyzes user profile to create tailored introduction
 * 
 * @param profile User profile
 * @param recommendations Course recommendations
 * @returns Personalized summary text
 */
export function generatePersonalizedSummaryV2(
  profile: UserProfile, 
  recommendations: EnhancedCourseRecommendation[]
): string {
  const firstName = profile.fullName?.split(' ')[0] || 'there';
  
  // Analyze learner type
  const learnerType = analyzeLearnerType(profile);
  
  // Get top interests
  const topInterests = getTopInterests(profile);
  
  // Get work style preferences
  const workStyle = analyzeWorkStyle(profile.personality);
  
  // Get top recommended categories
  const topCategories = [...new Set(recommendations.slice(0, 5).map(r => r.course.category))].slice(0, 2);
  
  return `Hi ${firstName}, based on your comprehensive assessment, you are ${learnerType}. ` +
    `You thrive in ${topInterests}, enjoy ${workStyle}, and are well-suited for ${topCategories.join(' and ')} programs. ` +
    `These ${recommendations.length} personalized recommendations are optimized for your unique profile.`;
}

/**
 * Analyze learner type from profile
 */
function analyzeLearnerType(profile: UserProfile): string {
  const { personality, waecEstimate, learningStyle } = profile;
  
  const isAnalytical = personality?.analyticalVsCreative <= 0;
  const isStructured = personality?.structuredVsFlexible <= 0;
  const isHighAchiever = waecEstimate === 'mostly_distinctions';
  const isFastLearner = learningStyle === 'fast_learner';
  
  if (isAnalytical && isStructured && isHighAchiever) {
    return 'a methodical, academically strong learner';
  } else if (!isAnalytical && isFastLearner) {
    return 'a creative, quick-thinking learner';
  } else if (personality?.peopleVsTask <= -1) {
    return 'a collaborative, people-oriented learner';
  } else if (isFastLearner && isHighAchiever) {
    return 'a high-achieving, fast learner';
  } else {
    return 'a versatile, balanced learner';
  }
}

/**
 * Get top interests from profile
 */
function getTopInterests(profile: UserProfile): string {
  const topIndustries = Object.entries(profile.interests || {})
    .filter(([_, score]) => (score as number) >= 4)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 2)
    .map(([id]) => formatIndustryName(id));
  
  return topIndustries.length > 0 ? topIndustries.join(' and ') : 'various fields';
}

/**
 * Analyze work style from personality
 */
function analyzeWorkStyle(personality: UserProfile['personality']): string {
  if (!personality) return 'diverse work environments';
  
  const styles: string[] = [];
  
  if (personality.analyticalVsCreative <= -1) {
    styles.push('analytical problem-solving');
  } else if (personality.analyticalVsCreative >= 1) {
    styles.push('creative innovation');
  }
  
  if (personality.peopleVsTask <= -1) {
    styles.push('collaborative teamwork');
  } else if (personality.peopleVsTask >= 1) {
    styles.push('independent work');
  }
  
  return styles.length > 0 ? styles.join(' and ') : 'balanced work styles';
}

/**
 * Diagnostic function to analyze filtering results
 * Useful for debugging and understanding recommendation outcomes
 * 
 * @param profile User profile
 * @returns Diagnostic information
 */
export function diagnoseRecommendations(profile: UserProfile) {
  const allCourses = courses.length;
  const eligible = applyEligibilityFilters(profile);
  const scored = scoreCourses(eligible, profile);
  const aboveThreshold = scored.filter(s => s.weightedScore >= OUTPUT_CONSTRAINTS.minimumScore);
  const final = applyOutputConstraints(scored);
  
  return {
    totalCourses: allCourses,
    afterDepartmentGate: eligible.length,
    afterScoring: scored.length,
    aboveMinimumScore: aboveThreshold.length,
    finalRecommendations: final.length,
    averageScore: scored.length > 0 
      ? Math.round(scored.reduce((sum, s) => sum + s.weightedScore, 0) / scored.length)
      : 0,
    topScore: scored.length > 0 ? Math.max(...scored.map(s => s.weightedScore)) : 0,
    lowestScore: scored.length > 0 ? Math.min(...scored.map(s => s.weightedScore)) : 0
  };
}
