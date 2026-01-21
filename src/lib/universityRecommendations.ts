/**
 * University Recommendation Engine
 * 
 * This module provides functions for:
 * - Fetching universities from database
 * - Filtering by course availability
 * - Ranking by course-specific performance
 * - Handling fallback to global universities
 */

import { Course } from "@/types";
// import { supabase } from "@/integrations/supabase/client"; // Not used - we use API endpoints instead

export interface UniversityRecommendation {
  id: string;
  name: string;
  country: string;
  region: string;
  globalRank?: number;
  countryRank?: number;
  rankingScore: number;
  courseRankingScore: number;
  programStrength: string;
  website?: string;
  offersCourse: boolean;
}

/**
 * Get recommended universities for a specific course
 * @param courseId - The course ID
 * @param location - Preferred location (nigeria, africa, or global)
 * @returns Array of universities offering this course, ranked by performance
 */
export async function getUniversitiesForCourse(
  courseId: string,
  location: "nigeria" | "africa" | "global" = "nigeria"
): Promise<UniversityRecommendation[]> {
  try {
    // First, try to fetch from database (new comprehensive system)
    const { data: universityData, error: uniError } = await supabase
      .from("universities_comprehensive")
      .select(`
        id,
        name,
        country,
        region,
        global_rank,
        country_rank,
        ranking_score,
        website,
        university_course_offerings(
          course_ranking_score,
          program_strength,
          is_available
        )
      `)
      .eq("university_course_offerings.course_id", courseId)
      .eq("university_course_offerings.is_available", true);

    if (uniError) {
      console.warn("Error fetching universities from DB:", uniError);
      // Fall back to hardcoded data
      return getHardcodedUniversitiesForCourse(courseId, location);
    }

    if (!universityData || universityData.length === 0) {
      // Fall back to hardcoded data if no database results
      return getHardcodedUniversitiesForCourse(courseId, location);
    }

    // Transform database results
    const recommendations: UniversityRecommendation[] = universityData
      .filter(uni => filterByLocation(uni.country, location))
      .map((uni: any) => {
        const courseOffering = uni.university_course_offerings?.[0];
        return {
          id: uni.id,
          name: uni.name,
          country: uni.country,
          region: uni.region,
          globalRank: uni.global_rank,
          countryRank: uni.country_rank,
          rankingScore: parseFloat(uni.ranking_score),
          courseRankingScore: courseOffering
            ? parseFloat(courseOffering.course_ranking_score)
            : parseFloat(uni.ranking_score),
          programStrength: courseOffering?.program_strength || "Strong program",
          website: uni.website,
          offersCourse: true,
        };
      })
      .sort((a, b) => b.courseRankingScore - a.courseRankingScore)
      .slice(0, 10);

    return recommendations;
  } catch (error) {
    console.error("Error in getUniversitiesForCourse:", error);
    return getHardcodedUniversitiesForCourse(courseId, location);
  }
}

/**
 * Fallback: Get hardcoded universities for a course
 * Used when database is unavailable
 */
function getHardcodedUniversitiesForCourse(
  courseId: string,
  location: "nigeria" | "africa" | "global"
): UniversityRecommendation[] {
  const nigerianUniversities: UniversityRecommendation[] = [
    {
      id: "unilag-1",
      name: "University of Lagos (UNILAG)",
      country: "Nigeria",
      region: "West Africa",
      countryRank: 1,
      rankingScore: 94.5,
      courseRankingScore: 92,
      programStrength: "Leading program with modern facilities",
      website: "www.unilag.edu.ng",
      offersCourse: true,
    },
    {
      id: "ui-1",
      name: "University of Ibadan (UI)",
      country: "Nigeria",
      region: "West Africa",
      countryRank: 2,
      rankingScore: 93.8,
      courseRankingScore: 94,
      programStrength: "Premier institution with strong reputation",
      website: "www.ui.edu.ng",
      offersCourse: true,
    },
    {
      id: "covenant-1",
      name: "Covenant University",
      country: "Nigeria",
      region: "West Africa",
      countryRank: 3,
      rankingScore: 89.2,
      courseRankingScore: 90,
      programStrength: "Modern facilities and industry partnerships",
      website: "www.covenantuniversity.edu.ng",
      offersCourse: true,
    },
    {
      id: "abu-1",
      name: "Ahmadu Bello University (ABU)",
      country: "Nigeria",
      region: "West Africa",
      countryRank: 4,
      rankingScore: 87.5,
      courseRankingScore: 88,
      programStrength: "Well-established with quality teaching",
      website: "www.abu.edu.ng",
      offersCourse: true,
    },
    {
      id: "unn-1",
      name: "University of Nigeria, Nsukka (UNN)",
      country: "Nigeria",
      region: "West Africa",
      countryRank: 5,
      rankingScore: 86.8,
      courseRankingScore: 86,
      programStrength: "First indigenous university with strong academics",
      website: "www.unn.edu.ng",
      offersCourse: true,
    },
  ];

  // Filter by location preference
  let universities = nigerianUniversities;

  if (location === "africa") {
    // Add African universities (fallback list)
    universities = [
      ...nigerianUniversities,
      {
        id: "wits-1",
        name: "University of the Witwatersrand",
        country: "South Africa",
        region: "Southern Africa",
        countryRank: 1,
        rankingScore: 88.0,
        courseRankingScore: 87,
        programStrength: "Top African university",
        website: "www.wits.ac.za",
        offersCourse: true,
      },
      {
        id: "uct-1",
        name: "University of Cape Town",
        country: "South Africa",
        region: "Southern Africa",
        countryRank: 2,
        rankingScore: 87.5,
        courseRankingScore: 86,
        programStrength: "Research-intensive institution",
        website: "www.uct.ac.za",
        offersCourse: true,
      },
    ];
  } else if (location === "global") {
    // Add global universities
    universities = [
      ...nigerianUniversities,
      {
        id: "oxford-1",
        name: "University of Oxford",
        country: "United Kingdom",
        region: "Europe",
        globalRank: 2,
        rankingScore: 99.0,
        courseRankingScore: 98,
        programStrength: "World-class institution",
        website: "www.ox.ac.uk",
        offersCourse: true,
      },
      {
        id: "mit-1",
        name: "Massachusetts Institute of Technology",
        country: "United States",
        region: "North America",
        globalRank: 1,
        rankingScore: 99.5,
        courseRankingScore: 99,
        programStrength: "Top technology institution globally",
        website: "www.mit.edu",
        offersCourse: true,
      },
    ];
  }

  return universities.sort((a, b) => b.courseRankingScore - a.courseRankingScore);
}

/**
 * Filter universities by location preference
 */
function filterByLocation(
  universityCountry: string,
  preferredLocation: "nigeria" | "africa" | "global"
): boolean {
  if (preferredLocation === "global") return true;

  if (preferredLocation === "africa") {
    // Include African countries
    const africanCountries = [
      "Nigeria",
      "South Africa",
      "Egypt",
      "Kenya",
      "Ghana",
      "Ethiopia",
      "Rwanda",
      "Cameroon",
      "Uganda",
      "Tanzania",
    ];
    return africanCountries.includes(universityCountry);
  }

  if (preferredLocation === "nigeria") {
    return universityCountry === "Nigeria";
  }

  return true;
}

/**
 * Get enhanced course with university recommendations
 */
export async function getEnhancedCourseRecommendation(
  course: Course,
  preferredLocation: "nigeria" | "africa" | "global" = "nigeria"
) {
  const universities = await getUniversitiesForCourse(course.id, preferredLocation);

  return {
    course,
    recommendedUniversities: universities,
    totalUniversitiesOffering: universities.filter(u => u.offersCourse).length,
  };
}

/**
 * Batch get universities for multiple courses
 */
export async function getBatchUniversitiesForCourses(
  courseIds: string[],
  preferredLocation: "nigeria" | "africa" | "global" = "nigeria"
) {
  const results: Record<string, UniversityRecommendation[]> = {};

  // Fetch in parallel for efficiency
  const promises = courseIds.map(async (courseId) => {
    const universities = await getUniversitiesForCourse(courseId, preferredLocation);
    results[courseId] = universities;
  });

  await Promise.all(promises);
  return results;
}
