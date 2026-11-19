import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "CUSTOMER" | "ARTISAN" | "ADMIN";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  artisan?: {
    id: string;
    shopName: string;
    slug: string;
    avatar?: string | null;
  } | null;
  address?: {
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
}

// Deprecated demo users removed; empty export preserved for type safety
export const DEMO_USERS: Record<string, UserProfile> = {};

interface AuthStore {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
  loginAs?: (role: "customer" | "artisan" | "admin") => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null, // Clean initial state: no hardcoded demo accounts

      setUser: (user) => {
        set({ user });
      },

      updateProfile: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },

      logout: () => {
        set({ user: null });
      },

      loginAs: (role) => {
        set((state) => ({
          user: state.user
            ? { ...state.user, role: role.toUpperCase() as UserRole }
            : null,
        }));
      },
    }),
    {
      name: "artisan-connect-auth",
    }
  )
);
