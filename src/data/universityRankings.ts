import { School } from "@/types";

// Course-aware university rankings with detailed pros/cons
export interface UniversityRanking {
  universityId: string;
  courseId: string;
  ranking: number; // Overall ranking for this course at this university (1-100)
  pros: string[];
  cons: string[];
  region: "nigeria" | "africa" | "global";
}

export const UNIVERSITY_COURSE_RANKINGS: UniversityRanking[] = [
  // ===== COMPUTER SCIENCE =====
  // Nigerian Universities
  {
    universityId: "unilag",
    courseId: "computer-science",
    ranking: 95,
    region: "nigeria",
    pros: ["Strong industry connections with Lagos tech scene", "Active alumni network at top companies", "Regular hackathons and tech events", "Partnership with Google and Microsoft"],
    cons: ["Limited lab equipment", "Large class sizes", "Occasional strike actions", "Infrastructure challenges"],
  },
  {
    universityId: "covenant",
    courseId: "computer-science",
    ranking: 96,
    region: "nigeria",
    pros: ["Best infrastructure in Nigeria", "Zero tolerance for strikes", "Strong entrepreneurship focus", "Modern computer labs"],
    cons: ["High tuition fees", "Strict religious code", "Located in Ota (commute from Lagos)", "Limited scholarship availability"],
  },
  {
    universityId: "ui",
    courseId: "computer-science",
    ranking: 88,
    region: "nigeria",
    pros: ["Oldest university in Nigeria", "Strong research tradition", "Affordable tuition", "Beautiful campus"],
    cons: ["Outdated curriculum in some areas", "Frequent strikes", "Aging infrastructure", "Rural location"],
  },
  {
    universityId: "oau",
    courseId: "computer-science",
    ranking: 87,
    region: "nigeria",
    pros: ["Strong science foundation", "Affordable tuition", "Good research output", "Peaceful campus environment"],
    cons: ["Strike disruptions", "Limited tech industry connections", "Rural location", "Aging facilities"],
  },
  {
    universityId: "futa",
    courseId: "computer-science",
    ranking: 90,
    region: "nigeria",
    pros: ["Specialized tech focus", "Modern labs", "Strong engineering integration", "Growing startup ecosystem"],
    cons: ["Smaller alumni network", "Rural location", "Limited funding", "Fewer international partnerships"],
  },
  {
    universityId: "futminna",
    courseId: "computer-science",
    ranking: 85,
    region: "nigeria",
    pros: ["Affordable tuition", "Good faculty", "Peaceful environment", "Strong mathematics foundation"],
    cons: ["Remote location", "Limited industry exposure", "Basic infrastructure", "Fewer tech events"],
  },
  {
    universityId: "abu",
    courseId: "computer-science",
    ranking: 83,
    region: "nigeria",
    pros: ["Strong northern presence", "Affordable", "Large campus", "Good library facilities"],
    cons: ["Limited tech industry in North", "Security concerns in region", "Infrastructure gaps", "Frequent strikes"],
  },
  {
    universityId: "uniben",
    courseId: "computer-science",
    ranking: 82,
    region: "nigeria",
    pros: ["Growing tech scene in Edo", "Affordable tuition", "Good faculty", "Improving infrastructure"],
    cons: ["Limited industry partnerships", "Occasional strikes", "Smaller tech ecosystem", "Competition from Lagos universities"],
  },
  {
    universityId: "unn",
    courseId: "computer-science",
    ranking: 84,
    region: "nigeria",
    pros: ["First indigenous university", "Strong eastern presence", "Good research output", "Affordable"],
    cons: ["Strike actions", "Infrastructure challenges", "Limited tech industry in East", "Funding constraints"],
  },
  {
    universityId: "unilorin",
    courseId: "computer-science",
    ranking: 86,
    region: "nigeria",
    pros: ["Strike-free record", "Academic calendar stability", "Good management", "Affordable tuition"],
    cons: ["Limited tech industry connections", "Smaller city", "Basic facilities", "Fewer internship opportunities"],
  },

  // African Universities (non-Nigeria)
  {
    universityId: "uct",
    courseId: "computer-science",
    ranking: 98,
    region: "africa",
    pros: ["Top-ranked in Africa", "World-class research facilities", "Strong global partnerships", "High employability rate"],
    cons: ["Very expensive for international students", "Extremely competitive admission", "High cost of living in Cape Town", "Visa requirements"],
  },
  {
    universityId: "wits",
    courseId: "computer-science",
    ranking: 96,
    region: "africa",
    pros: ["Excellent research output", "Strong industry links", "Modern facilities", "Johannesburg tech hub access"],
    cons: ["High tuition for internationals", "Safety concerns in Johannesburg", "Competitive entry", "Expensive living costs"],
  },
  {
    universityId: "nairobi",
    courseId: "computer-science",
    ranking: 92,
    region: "africa",
    pros: ["Leading East African university", "Growing tech scene in Nairobi", "More affordable than South Africa", "Good regional network"],
    cons: ["Limited compared to global standards", "Infrastructure gaps", "Political instability affects operations", "High competition"],
  },

  // Global Universities
  {
    universityId: "mit",
    courseId: "computer-science",
    ranking: 100,
    region: "global",
    pros: ["Best CS program globally", "Silicon Valley connections", "Unlimited resources", "World-changing research"],
    cons: ["Extremely competitive (3% acceptance)", "Very expensive ($80k+/year)", "Intense academic pressure", "Difficult for international students"],
  },
  {
    universityId: "stanford",
    courseId: "computer-science",
    ranking: 100,
    region: "global",
    pros: ["In heart of Silicon Valley", "Top tech company recruitment", "Entrepreneurship culture", "Amazing weather"],
    cons: ["5% acceptance rate", "Extremely expensive", "Very competitive environment", "High cost of living"],
  },
  {
    universityId: "cmu",
    courseId: "computer-science",
    ranking: 99,
    region: "global",
    pros: ["#1 ranked CS school often", "Robotics pioneer", "Strong AI research", "Top industry placement"],
    cons: ["Intense workload", "Very expensive", "Cold Pittsburgh weather", "High stress environment"],
  },

  // ===== MEDICINE =====
  // Nigerian Universities
  {
    universityId: "ui",
    courseId: "medicine",
    ranking: 99,
    region: "nigeria",
    pros: ["Best medical school in Nigeria", "Teaching hospital with diverse cases", "Strong research tradition", "Excellent clinical exposure"],
    cons: ["Frequent strikes disrupt training", "6+ years due to delays", "Aging infrastructure", "Limited modern equipment"],
  },
  {
    universityId: "unilag",
    courseId: "medicine",
    ranking: 98,
    region: "nigeria",
    pros: ["Excellent teaching hospital", "Lagos provides diverse patient cases", "Strong international partnerships", "Active medical research"],
    cons: ["Very competitive entry", "High cost of living in Lagos", "Strike disruptions", "Overcrowded facilities"],
  },
  {
    universityId: "abu",
    courseId: "medicine",
    ranking: 94,
    region: "nigeria",
    pros: ["Strong northern medical tradition", "Affordable tuition", "Good clinical exposure", "Large teaching hospital"],
    cons: ["Security concerns in region", "Limited modern equipment", "Brain drain of faculty", "Strike actions"],
  },
  {
    universityId: "unn",
    courseId: "medicine",
    ranking: 92,
    region: "nigeria",
    pros: ["Pioneer medical school in East", "Good teaching hospital", "Affordable", "Strong community medicine"],
    cons: ["Infrastructure challenges", "Strike disruptions", "Limited research funding", "Equipment shortages"],
  },
  {
    universityId: "ucth",
    courseId: "medicine",
    ranking: 91,
    region: "nigeria",
    pros: ["Focused medical university", "Good clinical training", "Federal government backing", "Improving facilities"],
    cons: ["Smaller university", "Limited research output", "Strike issues", "Rural location"],
  },
  {
    universityId: "uniben",
    courseId: "medicine",
    ranking: 88,
    region: "nigeria",
    pros: ["Good teaching hospital", "Affordable tuition", "Growing medical school", "Decent clinical exposure"],
    cons: ["Less renowned than UI/UNILAG", "Strike actions", "Limited international exposure", "Funding challenges"],
  },
  {
    universityId: "unilorin",
    courseId: "medicine",
    ranking: 87,
    region: "nigeria",
    pros: ["Strike-free academic calendar", "Predictable graduation timeline", "Good management", "Affordable"],
    cons: ["Smaller teaching hospital", "Limited research facilities", "Less prestigious", "Fewer specialist departments"],
  },
  {
    universityId: "lautech",
    courseId: "medicine",
    ranking: 85,
    region: "nigeria",
    pros: ["Good clinical training", "Affordable", "Focus on medical sciences", "Improving reputation"],
    cons: ["History of funding crises", "Strike disruptions", "Limited facilities", "Smaller hospital"],
  },
  {
    universityId: "ebsu",
    courseId: "medicine",
    ranking: 80,
    region: "nigeria",
    pros: ["Growing medical school", "State support", "Affordable tuition", "Expanding facilities"],
    cons: ["Newer program", "Limited track record", "Fewer specialists", "Basic infrastructure"],
  },

  // ===== LAW =====
  // Nigerian Universities
  {
    universityId: "ui",
    courseId: "law",
    ranking: 97,
    region: "nigeria",
    pros: ["Oldest law school", "Supreme Court justices as alumni", "Strong moot court tradition", "Excellent faculty"],
    cons: ["Strikes affect LLB program", "Aging facilities", "Limited practical training", "Theory-heavy curriculum"],
  },
  {
    universityId: "unilag",
    courseId: "law",
    ranking: 96,
    region: "nigeria",
    pros: ["Top law firms recruit here", "Lagos Bar proximity", "Strong alumni network", "International law focus"],
    cons: ["Very competitive", "High living costs", "Large class sizes", "Strike disruptions"],
  },
  {
    universityId: "abu",
    courseId: "law",
    ranking: 90,
    region: "nigeria",
    pros: ["Strong northern legal tradition", "Sharia law specialization", "Affordable", "Good faculty"],
    cons: ["Limited corporate law exposure", "Security issues", "Fewer law firm opportunities", "Strike actions"],
  },
  {
    universityId: "unn",
    courseId: "law",
    ranking: 88,
    region: "nigeria",
    pros: ["Pioneer eastern law school", "Good academic reputation", "Affordable", "Strong legal research"],
    cons: ["Limited corporate law firms in East", "Strike issues", "Infrastructure gaps", "Less prestigious than UI/UNILAG"],
  },
  {
    universityId: "covenant",
    courseId: "law",
    ranking: 85,
    region: "nigeria",
    pros: ["No strikes guarantee", "Modern facilities", "Business law focus", "Entrepreneurial approach"],
    cons: ["Expensive tuition", "Religious restrictions", "Newer program", "Less prestigious than traditional schools"],
  },
  {
    universityId: "unilorin",
    courseId: "law",
    ranking: 84,
    region: "nigeria",
    pros: ["Academic calendar stability", "Good Law School pass rates", "Affordable", "Quality teaching"],
    cons: ["Smaller legal community", "Limited internship opportunities", "Less prestigious", "Basic facilities"],
  },
  {
    universityId: "oau",
    courseId: "law",
    ranking: 86,
    region: "nigeria",
    pros: ["Good academic tradition", "Affordable", "Quality faculty", "Strong legal research"],
    cons: ["Strike disruptions", "Rural location", "Limited law firm exposure", "Aging infrastructure"],
  },
  {
    universityId: "uniben",
    courseId: "law",
    ranking: 82,
    region: "nigeria",
    pros: ["Growing reputation", "Mid-belt location", "Affordable", "Improving facilities"],
    cons: ["Less prestigious", "Limited corporate law exposure", "Strike issues", "Smaller legal market"],
  },
  {
    universityId: "buk",
    courseId: "law",
    ranking: 81,
    region: "nigeria",
    pros: ["Strong northern presence", "Sharia law expertise", "Affordable", "State backing"],
    cons: ["Security concerns", "Limited corporate opportunities", "Infrastructure gaps", "Regional bias in placement"],
  },
  {
    universityId: "futa",
    courseId: "law",
    ranking: 78,
    region: "nigeria",
    pros: ["Newer perspective", "Technology law focus", "Affordable", "Modern approach"],
    cons: ["Unproven track record", "Limited prestige", "Small legal community", "Rural location"],
  },
];

// Helper function to get rankings for a specific course and region
export function getCourseUniversityRankings(
  courseId: string,
  region?: "nigeria" | "africa" | "global"
): UniversityRanking[] {
  let rankings = UNIVERSITY_COURSE_RANKINGS.filter(r => r.courseId === courseId);
  
  if (region) {
    rankings = rankings.filter(r => r.region === region);
  }
  
  return rankings.sort((a, b) => b.ranking - a.ranking);
}

// Helper function to get top N universities for a course in a region
export function getTopUniversities(
  courseId: string,
  region: "nigeria" | "africa" | "global",
  limit: number = 10
): UniversityRanking[] {
  return getCourseUniversityRankings(courseId, region).slice(0, limit);
}
