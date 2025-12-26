import { create } from 'zustand';
import { UserProfile, CourseRecommendation } from '@/types';
import { calculateRecommendations } from '@/lib/recommendations';

interface AssessmentState {
  step: number;
  totalSteps: number;
  profile: Partial<UserProfile>;
  recommendations: CourseRecommendation[];
  isComplete: boolean;
  
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
  step: 0,
  totalSteps: 5,
  profile: {
    interests: {},
    personality: {
      analyticalVsCreative: 0,
      structuredVsFlexible: 0,
      peopleVsTask: 0,
      riskVsStability: 0,
    },
  },
  recommendations: [],
  isComplete: false,

  setStep: (step) => set({ step }),
  
  nextStep: () => set((state) => ({ 
    step: Math.min(state.step + 1, state.totalSteps) 
  })),
  
  prevStep: () => set((state) => ({ 
    step: Math.max(state.step - 1, 0) 
  })),
  
  updateProfile: (data) => set((state) => ({
    profile: { ...state.profile, ...data }
  })),
  
  completeAssessment: () => {
    const { profile } = get();
    const recommendations = calculateRecommendations(profile as UserProfile);
    set({ recommendations, isComplete: true });
  },
  
  resetAssessment: () => set({
    step: 0,
    profile: {
      interests: {},
      personality: {
        analyticalVsCreative: 0,
        structuredVsFlexible: 0,
        peopleVsTask: 0,
        riskVsStability: 0,
      },
    },
    recommendations: [],
    isComplete: false,
  }),
}));
