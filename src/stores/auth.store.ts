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

export const DEMO_USERS: Record<string, UserProfile> = {
  customer: {
    id: "usr-customer-1",
    name: "Priya Sharma",
    email: "customer@demo.com",
    role: "CUSTOMER",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    address: {
      fullName: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "customer@demo.com",
      addressLine1: "Flat 402, Lotus Greens, Sector 15",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
    },
  },
  artisan: {
    id: "usr-artisan-1",
    name: "Meera Sharma",
    email: "meera@artisanconnect.in",
    role: "ARTISAN",
    phone: "+91 94140 12345",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    address: {
      fullName: "Meera Sharma",
      phone: "+91 94140 12345",
      email: "meera@artisanconnect.in",
      addressLine1: "Studio 12, Sanganer Craft Cluster",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302029",
    },
  },
  admin: {
    id: "usr-admin-1",
    name: "Curation Team (Admin)",
    email: "admin@artisanconnect.in",
    role: "ADMIN",
    phone: "+91 98110 99887",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    address: {
      fullName: "Admin Operations",
      phone: "+91 98110 99887",
      email: "admin@artisanconnect.in",
      addressLine1: "ArtisanConnect HQ, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
    },
  },
};

interface AuthStore {
  user: UserProfile | null;
  loginAs: (role: "customer" | "artisan" | "admin") => void;
  setUser: (user: UserProfile | null) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: DEMO_USERS.customer, // Default logged in as demo customer for smooth evaluation

      loginAs: (role) => {
        set({ user: DEMO_USERS[role] });
      },

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
    }),
    {
      name: "artisan-connect-auth",
    }
  )
);
