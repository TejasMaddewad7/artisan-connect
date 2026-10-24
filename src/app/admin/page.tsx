"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Store,
  DollarSign,
  Check,
  X,
  Sliders,
  Package,
  ArrowUpRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ARTISANS, PRODUCTS } from "@/lib/data/mock-catalog";
import { useArtisanCatalogStore } from "@/stores/artisan-catalog.store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminPanelPage() {
  const [commissionRate, setCommissionRate] = useState(10);
  const { pendingApplications, approveApplication, rejectApplication } = useArtisanCatalogStore();

  const pendingArtisans = pendingApplications.filter((a) => a.status === "PENDING");

  const handleApprove = (id: string, name: string) => {
    approveApplication(id);
    toast.success(`Approved ${name}! Storefront is now live on ArtisanConnect.`);
  };

  const handleReject = (id: string, name: string) => {
    rejectApplication(id);
    toast.error(`Rejected application for ${name}`);
  };

  const updateCommission = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Platform commission rate updated to ${commissionRate}%`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-[#4A2418] mt-1">
              Marketplace Administration & Curation
            </h1>
            <p className="text-xs text-muted-foreground">
              Review handmade studio registrations, configure Razorpay commissions, and audit orders.
            </p>
          </div>
        </div>

        {/* Platform Overview Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <span className="text-xs text-muted-foreground font-semibold">Total Marketplace GMV</span>
            <p className="font-heading text-2xl font-bold text-[#4A2418] mt-2">
              {formatPrice(34200000)} {/* ₹3,42,000 */}
            </p>
            <p className="text-[11px] text-green-700 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +24% month-over-month
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <span className="text-xs text-muted-foreground font-semibold">Platform Commission (10%)</span>
            <p className="font-heading text-2xl font-bold text-green-700 mt-2">
              {formatPrice(3420000)} {/* ₹34,200 */}
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Net platform retained revenue
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <span className="text-xs text-muted-foreground font-semibold">Active Artisan Studios</span>
            <p className="font-heading text-2xl font-bold text-[#4A2418] mt-2">
              {ARTISANS.length} Studios
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Across 8 Indian states
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <span className="text-xs text-muted-foreground font-semibold">Pending Verifications</span>
            <p className="font-heading text-2xl font-bold text-[#B5502B] mt-2">
              {pendingArtisans.length} Studios
            </p>
            <p className="text-[11px] text-amber-700 mt-1">
              Requires KYC review
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Pending Artisan Applications Queue (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border/40 flex items-center justify-between">
              <h3 className="font-heading text-lg font-bold text-[#4A2418]">
                Pending Artisan Applications Queue ({pendingArtisans.length})
              </h3>
              <span className="text-xs text-muted-foreground">
                Artisan Fair Trade Compliance Check
              </span>
            </div>

            {pendingArtisans.length === 0 ? (
              <div className="p-12 text-center text-xs text-muted-foreground">
                All submitted artisan studios have been verified and approved.
              </div>
            ) : (
              <div className="divide-y divide-border/30">
                {pendingArtisans.map((app) => (
                  <div key={app.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-foreground">{app.shopName}</h4>
                        <span className="text-[10px] bg-cream-100 text-brown-800 px-2 py-0.5 rounded">
                          {app.submittedAt}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Owner: {app.fullName || (app as any).owner} • {app.city}, {app.state}
                      </p>
                      <p className="text-xs text-[#8c5e3c] mt-1 font-medium">
                        Craft: {Array.isArray(app.craftCategories) ? app.craftCategories.join(", ") : (app as any).craft}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        PAN: <span className="font-mono">{app.panNumber || (app as any).pan}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApprove(app.id, app.shopName)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-green-600 text-white text-xs font-semibold hover:bg-green-700 transition-colors shadow-sm"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Studio</span>
                      </button>
                      <button
                        onClick={() => handleReject(app.id, app.shopName)}
                        className="p-2 rounded-xl border border-border text-muted-foreground hover:text-destructive hover:bg-red-50 transition-colors"
                        aria-label="Reject"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Platform Commission Settings (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#4A2418] pb-2 border-b border-border/40 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#B5502B]" />
              Platform Settings
            </h3>

            <form onSubmit={updateCommission} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Default Platform Commission (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    max={30}
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(Number(e.target.value))}
                    className="w-24 h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                  />
                  <span className="text-muted-foreground font-semibold">% per transaction</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Artisans receive {100 - commissionRate}% split via Razorpay Route.
                </p>
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Free Shipping Minimum Threshold
                </label>
                <input
                  type="text"
                  disabled
                  defaultValue="₹1,000"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-cream-50 text-xs text-muted-foreground"
                />
              </div>

              <div>
                <label className="block font-semibold text-foreground mb-1">
                  Artisan Payout Hold Period
                </label>
                <input
                  type="text"
                  disabled
                  defaultValue="7 Days post-delivery (Return window)"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-cream-50 text-xs text-muted-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#B5502B] text-white font-semibold text-xs hover:bg-[#A04424] transition-colors shadow-sm"
              >
                Save Settings
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
