import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS, ARTISANS } from "@/lib/data/mock-catalog";
import type { Product, ArtisanProfile } from "@/types";

export interface PendingArtisanApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  shopName: string;
  bio: string;
  city: string;
  state: string;
  craftCategories: string[];
  panNumber: string;
  bankAccount: string;
  ifscCode: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const INITIAL_PENDING: PendingArtisanApplication[] = [
  {
    id: "app-101",
    fullName: "Suresh Babu",
    email: "suresh@kalamkari.in",
    phone: "+91 98480 12345",
    shopName: "Kalamkari Traditions",
    bio: "Generational natural dye pen Kalamkari artisan working with temple themes.",
    city: "Machilipatnam",
    state: "Andhra Pradesh",
    craftCategories: ["Textiles & Fashion", "Art & Gifts"],
    panNumber: "ABCDE9876K",
    bankAccount: "9100200481239",
    ifscCode: "SBIN0001234",
    submittedAt: "2 hours ago",
    status: "PENDING",
  },
  {
    id: "app-102",
    fullName: "Budhram Baghel",
    email: "budhram@dhokrabells.com",
    phone: "+91 97520 67890",
    shopName: "Dhokra Bells Studio",
    bio: "Traditional lost-wax bell metal casting artisan from Bastar tribal community.",
    city: "Bastar",
    state: "Chhattisgarh",
    craftCategories: ["Home & Living", "Art & Gifts"],
    panNumber: "XYZPA1234M",
    bankAccount: "5010023910245",
    ifscCode: "HDFC0000456",
    submittedAt: "5 hours ago",
    status: "PENDING",
  },
];

interface ArtisanCatalogStore {
  customProducts: Product[];
  pendingApplications: PendingArtisanApplication[];
  addProduct: (product: Product) => void;
  submitApplication: (app: Omit<PendingArtisanApplication, "id" | "submittedAt" | "status">) => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string) => void;
  getAllProducts: () => Product[];
}

export const useArtisanCatalogStore = create<ArtisanCatalogStore>()(
  persist(
    (set, get) => ({
      customProducts: [],
      pendingApplications: INITIAL_PENDING,

      addProduct: (product) => {
        set((state) => ({
          customProducts: [product, ...state.customProducts],
        }));
      },

      submitApplication: (appData) => {
        const newApp: PendingArtisanApplication = {
          ...appData,
          id: `app-${Date.now()}`,
          submittedAt: "Just now",
          status: "PENDING",
        };
        set((state) => ({
          pendingApplications: [newApp, ...state.pendingApplications],
        }));
      },

      approveApplication: (id) => {
        set((state) => ({
          pendingApplications: state.pendingApplications.map((app) =>
            app.id === id ? { ...app, status: "APPROVED" as const } : app
          ),
        }));
      },

      rejectApplication: (id) => {
        set((state) => ({
          pendingApplications: state.pendingApplications.map((app) =>
            app.id === id ? { ...app, status: "REJECTED" as const } : app
          ),
        }));
      },

      getAllProducts: () => {
        return [...get().customProducts, ...PRODUCTS];
      },
    }),
    {
      name: "artisan-connect-catalog",
    }
  )
);
