import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/integrations/supabase/client';

interface AccessState {
  isUnlocked: boolean;
  unlockedAt: string | null;
  expiresAt: string | null;
  email: string;
  fullName: string;
  shareToken: string | null;
  isLoading: boolean;
  
  setEmail: (email: string) => void;
  setFullName: (name: string) => void;
  validateAccessCode: (code: string, email: string) => Promise<boolean>;
  checkAccess: () => boolean;
  generateShareToken: () => Promise<string | null>;
  loadFromShareToken: (token: string) => Promise<boolean>;
  clearAccess: () => void;
}

export const useAccessStore = create<AccessState>()(
  persist(
    (set, get) => ({
      isUnlocked: false,
      unlockedAt: null,
      expiresAt: null,
      email: '',
      fullName: '',
      shareToken: null,
      isLoading: false,

      setEmail: (email) => set({ email }),
      setFullName: (name) => set({ fullName: name }),

      validateAccessCode: async (code: string, email: string) => {
        set({ isLoading: true });
        try {
          // Call server-side edge function for secure validation
          const { data, error } = await supabase.functions.invoke('validate-access-code', {
            body: { code: code.toUpperCase().trim(), email }
          });

          if (error) {
            console.error('Error validating access code:', error);
            set({ isLoading: false });
            return false;
          }

          if (data?.valid) {
            const now = new Date();
            set({
              isUnlocked: true,
              unlockedAt: now.toISOString(),
              expiresAt: data.expiresAt,
              email,
              isLoading: false,
            });
            return true;
          }

          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error('Error validating access code:', error);
          set({ isLoading: false });
          return false;
        }
      },

      checkAccess: () => {
        const { isUnlocked, expiresAt } = get();
        if (!isUnlocked || !expiresAt) return false;
        
        const expires = new Date(expiresAt);
        const isValid = expires > new Date();
        
        if (!isValid) {
          set({ isUnlocked: false, unlockedAt: null, expiresAt: null });
        }
        
        return isValid;
      },

      generateShareToken: async () => {
        const { email } = get();
        if (!email) return null;

        const token = `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Update session with share token
        const { error } = await supabase
          .from('assessment_sessions')
          .update({ share_token: token })
          .eq('email', email);

        if (error) {
          console.error('Error generating share token:', error);
          return null;
        }

        set({ shareToken: token });
        return token;
      },

      loadFromShareToken: async (token: string) => {
        set({ isLoading: true });
        try {
          const { data, error } = await supabase
            .from('assessment_sessions')
            .select('*')
            .eq('share_token', token)
            .single();

          if (error || !data) {
            set({ isLoading: false });
            return false;
          }

          // Check if access is still valid (within 24 hours of payment)
          if (data.expires_at) {
            const expiresAt = new Date(data.expires_at);
            if (expiresAt > new Date()) {
              set({
                isUnlocked: true,
                expiresAt: data.expires_at,
                email: data.email,
                shareToken: token,
                isLoading: false,
              });
              return true;
            }
          }

          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error('Error loading from share token:', error);
          set({ isLoading: false });
          return false;
        }
      },

      clearAccess: () => set({
        isUnlocked: false,
        unlockedAt: null,
        expiresAt: null,
        email: '',
        fullName: '',
        shareToken: null,
      }),
    }),
    {
      name: 'pathfinder-access',
      partialize: (state) => ({
        isUnlocked: state.isUnlocked,
        unlockedAt: state.unlockedAt,
        expiresAt: state.expiresAt,
        email: state.email,
        fullName: state.fullName,
        shareToken: state.shareToken,
      }),
    }
  )
);
