import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import { supabase } from '@/integrations/supabase/client'; // Not used - we use access codes now

interface PaymentState {
  sessionId: string | null;
  email: string | null;
  isPaid: boolean;
  expiresAt: string | null;
  isLoading: boolean;
  
  // Actions
  setEmail: (email: string) => void;
  createSession: (email: string, assessmentData: any) => Promise<string>;
  checkPaymentStatus: () => Promise<boolean>;
  verifyPayment: (reference: string) => Promise<boolean>;
  clearSession: () => void;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      email: null,
      isPaid: false,
      expiresAt: null,
      isLoading: false,

      setEmail: (email) => set({ email }),

      createSession: async (email, assessmentData) => {
        set({ isLoading: true });
        try {
          // Payment functionality disabled - using access codes instead
          console.warn('Payment functionality is disabled. Using access codes instead.');
          set({ isLoading: false });
          throw new Error('Payment functionality disabled. Please use an access code.');
        } catch (error) {
          console.error('Error creating session:', error);
          set({ isLoading: false });
          throw error;
        }
      },

      checkPaymentStatus: async () => {
        const { sessionId, expiresAt } = get();
        
        if (!sessionId) {
          set({ isPaid: false });
          return false;
        }

        // Check if session has expired locally first
        if (expiresAt) {
          const expiry = new Date(expiresAt);
          if (new Date() > expiry) {
            set({ isPaid: false, expiresAt: null });
            return false;
          }
        }

        // Payment functionality disabled
        return false;
      },

      verifyPayment: async (reference: string) => {
        set({ isLoading: true });
        // Payment functionality disabled
        console.warn('Payment functionality is disabled. Using access codes instead.');
        set({ isLoading: false });
        return false;
      },

      clearSession: () => set({
        sessionId: null,
        email: null,
        isPaid: false,
        expiresAt: null,
        isLoading: false,
      }),
    }),
    {
      name: 'pathfinder-payment',
      partialize: (state) => ({
        sessionId: state.sessionId,
        email: state.email,
        isPaid: state.isPaid,
        expiresAt: state.expiresAt,
      }),
    }
  )
);
