import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProfile, CourseRecommendation } from '@/types';
import { calculateRecommendationsV2, EnhancedCourseRecommendation } from '@/lib/recommendationsV2';

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
  hydrateFromShare: (payload: { profile?: Partial<UserProfile>; recommendations?: CourseRecommendation[] }) => void;
  resetAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>()(
  persist(
    (set, get) => ({
      step: 0,
      totalSteps: 4,
      profile: {
        fullName: '',
        academicTrack: undefined,
        waecEstimate: undefined,
        jambEstimate: undefined,
        learningStyle: undefined,
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
        // Use V2 recommendation engine with enhanced metadata
        const recommendations = calculateRecommendationsV2(profile as UserProfile);
        set({ recommendations, isComplete: true });
      },

      hydrateFromShare: ({ profile, recommendations }) => {
        set((state) => ({
          profile: { ...state.profile, ...profile },
          recommendations: recommendations ?? state.recommendations,
          isComplete: true,
        }));
      },
      
      resetAssessment: () => set({
        step: 0,
        profile: {
          fullName: '',
          academicTrack: undefined,
          waecEstimate: undefined,
          jambEstimate: undefined,
          learningStyle: undefined,
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
    }),
    {
      name: 'assessment-storage', // localStorage key
      partialize: (state) => ({
        profile: state.profile,
        recommendations: state.recommendations,
        isComplete: state.isComplete,
      }), // Only persist these fields, not step
    }
  )
);
