import { Course, CourseRecommendation, UserProfile } from "@/types";
import { courses } from "@/data/courses";

// Weights for the recommendation algorithm
const WEIGHTS = {
  interest: 0.35,
  personality: 0.20,
  financial: 0.20,
  location: 0.10,
  future: 0.15,
};

export function calculateRecommendations(profile: UserProfile): CourseRecommendation[] {
  const recommendations: CourseRecommendation[] = courses.map(course => {
    const interestScore = calculateInterestScore(course, profile);
    const personalityScore = calculatePersonalityScore(course, profile);
    const financialScore = calculateFinancialScore(course, profile);
    const locationScore = calculateLocationScore(course, profile);
    const futureScore = calculateFutureScore(course);

    const fitScore = 
      interestScore * WEIGHTS.interest +
      personalityScore * WEIGHTS.personality +
      financialScore * WEIGHTS.financial +
      locationScore * WEIGHTS.location +
      futureScore * WEIGHTS.future;

    return {
      course,
      fitScore: Math.round(fitScore),
      interestScore: Math.round(interestScore),
      personalityScore: Math.round(personalityScore),
      financialScore: Math.round(financialScore),
      locationScore: Math.round(locationScore),
      futureScore: Math.round(futureScore),
      whyFits: generateWhyFits(course, profile, { interestScore, personalityScore, financialScore, locationScore, futureScore }),
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
  const schools = course.schools.filter(s => s.location === profile.preferredLocation || profile.preferredLocation === 'global');
  
  if (schools.length === 0) return 50;

  // Find cheapest option
  const cheapestSchool = schools.reduce((min, school) => {
    const tuition = school.tuitionRange.min;
    const minTuition = min.tuitionRange.min;
    
    // Convert to same currency for comparison
    const normalizedTuition = school.tuitionRange.currency === 'NGN' ? tuition / 1500 : tuition;
    const normalizedMin = min.tuitionRange.currency === 'NGN' ? minTuition / 1500 : minTuition;
    
    return normalizedTuition < normalizedMin ? school : min;
  });

  const tuition = cheapestSchool.tuitionRange.min;
  const currency = cheapestSchool.tuitionRange.currency;
  
  // Normalize user budget
  const userBudget = profile.budgetRange.currency === 'NGN' 
    ? profile.budgetRange.max / 1500 
    : profile.budgetRange.max;
  
  const normalizedTuition = currency === 'NGN' ? tuition / 1500 : tuition;

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

function generateWhyFits(
  course: Course, 
  profile: UserProfile,
  scores: { interestScore: number; personalityScore: number; financialScore: number; locationScore: number; futureScore: number }
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

  if (reasons.length === 0) {
    return `This course offers a balanced fit across your interests, personality, and goals.`;
  }

  return `This course ${reasons.slice(0, 3).join(', ')}.`;
}
