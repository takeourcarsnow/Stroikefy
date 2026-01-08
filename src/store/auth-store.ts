import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ROLE_PERMISSIONS, RolePermissions } from '@/types';
import { currentUser } from '@/data/users';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: RolePermissions | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Start with mock user for demo
      user: currentUser,
      isAuthenticated: true,
      isLoading: false,
      permissions: ROLE_PERMISSIONS[currentUser.role],
      
      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock login - in production, this would call Supabase auth
        if (email) {
          const user = { ...currentUser, email };
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            permissions: ROLE_PERMISSIONS[user.role],
          });
          return true;
        }
        
        set({ isLoading: false });
        return false;
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          permissions: null,
        });
      },
      
      setUser: (user) => {
        set({ 
          user, 
          isAuthenticated: !!user,
          permissions: user ? ROLE_PERMISSIONS[user.role] : null,
        });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
