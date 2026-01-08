// Types for the PathFinder platform

export interface UserProfile {
  fullName: string;
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
  { id: "technology", name: "Technology", icon: "💻", description: "Software, AI, Data Science, Cybersecurity" },
  { id: "media-creative", name: "Media & Creative", icon: "🎨", description: "Design, Film, Music, Journalism, Marketing" },
  { id: "governance-policy", name: "Governance & Policy", icon: "⚖️", description: "Law, Public Administration, International Relations" },
  { id: "finance-business", name: "Finance & Business", icon: "📊", description: "Banking, Consulting, Entrepreneurship, Economics" },
  { id: "health", name: "Health", icon: "🏥", description: "Medicine, Nursing, Pharmacy, Public Health" },
  { id: "engineering", name: "Engineering", icon: "⚙️", description: "Mechanical, Civil, Electrical, Chemical Engineering" },
  { id: "social-impact", name: "Social Impact", icon: "🌍", description: "NGOs, Education, Community Development, Sustainability" },
];

export const PERSONALITY_TRAITS = [
  {
    id: "analyticalVsCreative",
    leftLabel: "Analytical",
    rightLabel: "Creative",
    leftDescription: "You enjoy solving problems with logic and data",
    rightDescription: "You thrive when expressing ideas and creating new things",
  },
  {
    id: "structuredVsFlexible",
    leftLabel: "Structured",
    rightLabel: "Flexible",
    leftDescription: "You prefer clear plans and organized routines",
    rightDescription: "You adapt easily and enjoy variety in your work",
  },
  {
    id: "peopleVsTask",
    leftLabel: "People-Oriented",
    rightLabel: "Task-Oriented",
    leftDescription: "You're energized by working with and helping others",
    rightDescription: "You focus best when working independently on tasks",
  },
  {
    id: "riskVsStability",
    leftLabel: "Risk-Taking",
    rightLabel: "Stability-Seeking",
    leftDescription: "You're comfortable with uncertainty and new ventures",
    rightDescription: "You prefer security and predictable career paths",
  },
];
