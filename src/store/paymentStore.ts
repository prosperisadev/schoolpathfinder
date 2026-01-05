import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

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
          const { data, error } = await supabase
            .from('assessment_sessions')
            .insert({
              email,
              assessment_data: assessmentData,
              payment_status: 'pending'
            })
            .select('id')
            .single();

          if (error) throw error;

          set({ 
            sessionId: data.id, 
            email,
            isLoading: false 
          });
          
          return data.id;
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

        try {
          const { data, error } = await supabase
            .from('assessment_sessions')
            .select('payment_status, expires_at')
            .eq('id', sessionId)
            .single();

          if (error) {
            console.error('Error checking payment status:', error);
            return false;
          }

          const isPaid = data.payment_status === 'paid';
          const hasExpired = data.expires_at && new Date(data.expires_at) < new Date();

          if (isPaid && !hasExpired) {
            set({ isPaid: true, expiresAt: data.expires_at });
            return true;
          } else {
            set({ isPaid: false });
            return false;
          }
        } catch (error) {
          console.error('Error checking payment:', error);
          return false;
        }
      },

      verifyPayment: async (reference: string) => {
        const { sessionId, email } = get();
        if (!sessionId || !email) return false;

        set({ isLoading: true });
        try {
          // Include email for session ownership verification
          const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: { reference, sessionId, email }
          });

          if (error) throw error;

          if (data.success) {
            set({ 
              isPaid: true, 
              expiresAt: data.expiresAt,
              isLoading: false 
            });
            return true;
          }
          
          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error('Error verifying payment:', error);
          set({ isLoading: false });
          return false;
        }
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
