// Types for the PathFinder platform

export interface UserProfile {
  fullName: string;
  email: string;
  age: number;
  country: string;
  academicBackground: string;
  academicTrack: "science" | "art" | "commercial";
  waecEstimate: "mostly_distinctions" | "mix_distinctions_credits" | "mostly_credits";
  jambEstimate: "very_confident" | "fairly_confident" | "not_confident";
  learningStyle: "fast_learner" | "moderate_learner" | "practical_learner";
  preferredLocation: "nigeria" | "africa" | "global";
  budgetRange: {
    min: number;
    max: number;
    currency: "NGN" | "USD";
  };
  interests: Record<string, number>; // 0-5 scale
  personality: {
    analyticalVsCreative: number; // -2 to 2 (analytical to creative)
    structuredVsFlexible: number; // -2 to 2
    peopleVsTask: number; // -2 to 2
    riskVsStability: number; // -2 to 2
  };
}

export interface Course {
  id: string;
  name: string;
  category: string;
  overview: string;
  coreSkills: string[];
  nigeriaContext: {
    description: string;
    teachingStyle: string;
    careerOpportunities: string[];
    salaryRange: { min: number; max: number; currency: string };
  };
  globalContext: {
    description: string;
    teachingStyle: string;
    careerOpportunities: string[];
    salaryRange: { min: number; max: number; currency: string };
  };
  careerPath: {
    dayToDay: string;
    typicalEmployers: string[];
  };
  curriculum: {
    year1: string[];
    year2: string[];
    year3: string[];
    year4: string[];
  };
  futureOutlook: {
    relevanceToday: number; // 1-10
    relevanceIn5Years: number; // 1-10
    techImpact: string;
    trends: string[];
  };
  successPathway: {
    internships: string[];
    certifications: string[];
    projects: string[];
    volunteering: string[];
  };
  schools: School[];
  interestMatch: string[];
  personalityMatch: {
    analyticalVsCreative: number;
    structuredVsFlexible: number;
    peopleVsTask: number;
    riskVsStability: number;
  };
  // NEW FIELDS for matching logic
  academicTrackRequired?: ("science" | "art" | "commercial")[];
  difficultyLevel?: "low" | "medium" | "high";
  department?: "Science" | "Art" | "Commercial"; // Nigerian university classification
  nigerianAvailable?: boolean; // Whether course is offered in Nigerian universities (verified)
}

export interface AdmissionRequirements {
  // Nigerian universities
  waecSubjects?: string[]; // e.g., ["English", "Mathematics", "Physics", "Chemistry", "Biology"]
  minimumWaecGrade?: string; // e.g., "5 credits including English and Mathematics"
  jambScore?: number; // e.g., 250
  jambSubjects?: string[]; // e.g., ["English", "Mathematics", "Physics", "Chemistry"]
  postUtme?: boolean;
  
  // International universities
  satScore?: { min: number; max: number };
  actScore?: { min: number; max: number };
  ieltsScore?: number;
  toeflScore?: number;
  aLevels?: string; // e.g., "ABB including Mathematics"
  ibScore?: number;
  gpa?: number;
  otherRequirements?: string[];
}

export interface School {
  id: string;
  name: string;
  location: "nigeria" | "africa" | "global";
  country: string;
  tuitionRange: { min: number; max: number; currency: string };
  scholarshipAvailable: boolean;
  pros: string[];
  cons: string[];
  ranking?: number;
  admissionRequirements?: AdmissionRequirements;
  courseSpecificRequirements?: Record<string, AdmissionRequirements>; // course-specific overrides
}

export interface CourseRecommendation {
  course: Course;
  fitScore: number;
  interestScore: number;
  personalityScore: number;
  financialScore: number;
  locationScore: number;
  futureScore: number;
  whyFits: string;
}

export type Industry = 
  | "technology"
  | "media-creative"
  | "governance-policy"
  | "finance-business"
  | "health"
  | "engineering"
  | "social-impact";

export const INDUSTRIES: { id: Industry; name: string; icon: string; description: string }[] = [
  { id: "technology", name: "Technology", icon: "💻", description: "Building apps, websites, and working with computers" },
  { id: "media-creative", name: "Media & Creative", icon: "🎨", description: "Art, video making, music, writing stories, advertising" },
  { id: "governance-policy", name: "Law & Government", icon: "⚖️", description: "Becoming a lawyer, working in government offices" },
  { id: "finance-business", name: "Business & Money", icon: "📊", description: "Banking, starting your own business, managing money" },
  { id: "health", name: "Health & Medicine", icon: "🏥", description: "Becoming a doctor, nurse, pharmacist, or health worker" },
  { id: "engineering", name: "Engineering", icon: "⚙️", description: "Building things, fixing machines, designing structures" },
  { id: "social-impact", name: "Helping People", icon: "🌍", description: "Teaching, helping communities, charity work" },
];

export const PERSONALITY_TRAITS = [
  {
    id: "analyticalVsCreative",
    leftLabel: "I like numbers & facts",
    rightLabel: "I like art & ideas",
    leftDescription: "I enjoy solving problems step-by-step using my head",
    rightDescription: "I enjoy making new things and using my imagination",
  },
  {
    id: "structuredVsFlexible",
    leftLabel: "I like order & plans",
    rightLabel: "I like freedom & change",
    leftDescription: "I feel good when I have a clear plan to follow",
    rightDescription: "I feel good when I can try different things each day",
  },
  {
    id: "peopleVsTask",
    leftLabel: "I like working with people",
    rightLabel: "I like working alone",
    leftDescription: "I enjoy being around others and helping them",
    rightDescription: "I work better when I'm on my own with my tasks",
  },
  {
    id: "riskVsStability",
    leftLabel: "I like trying new things",
    rightLabel: "I like things to be safe",
    leftDescription: "I'm okay with taking chances and doing something new",
    rightDescription: "I prefer things that are sure and won't change suddenly",
  },
];
