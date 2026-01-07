import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  validateAccessCode as apiValidateAccessCode, 
  getSessionByShareToken, 
  generateShareToken as apiGenerateShareToken 
} from '@/lib/api';

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
          // Call API for secure validation
          const result = await apiValidateAccessCode(code.toUpperCase().trim(), email);

          if (result.valid) {
            const now = new Date();
            set({
              isUnlocked: true,
              unlockedAt: now.toISOString(),
              expiresAt: result.expiresAt || null,
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

        try {
          const token = await apiGenerateShareToken(email);
          if (token) {
            set({ shareToken: token });
            return token;
          }
          return null;
        } catch (error) {
          console.error('Error generating share token:', error);
          return null;
        }
      },

      loadFromShareToken: async (token: string) => {
        set({ isLoading: true });
        try {
          const session = await getSessionByShareToken(token);

          if (!session) {
            set({ isLoading: false });
            return false;
          }

          // Check if access is still valid (within 24 hours of payment)
          if (session.expiresAt) {
            const expiresAt = new Date(session.expiresAt);
            if (expiresAt > new Date()) {
              set({
                isUnlocked: true,
                expiresAt: session.expiresAt,
                email: session.email,
                fullName: session.fullName || '',
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
