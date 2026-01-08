import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, ROLE_PERMISSIONS, RolePermissions } from '@/types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  permissions: RolePermissions | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithUser: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  setPermissions: (permissions: RolePermissions | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Start with demo user for development
      user: {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@stroikefy.com',
        role: 'admin',
        avatar: '',
        createdAt: new Date(),
      },
      isAuthenticated: true,
      isLoading: false,
      permissions: ROLE_PERMISSIONS.admin,
      
      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve => setTimeout, 1000));
        
        // Mock login - in production, this would call Supabase auth
        if (email) {
          const user: User = {
            id: '1',
            name: 'Demo User',
            email,
            role: 'admin',
            avatar: '',
            createdAt: new Date(),
          };
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

      loginWithUser: (user: User) => {
        set({ 
          user, 
          isAuthenticated: true, 
          permissions: ROLE_PERMISSIONS[user.role],
        });
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

      setPermissions: (permissions) => {
        set({ permissions });
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
