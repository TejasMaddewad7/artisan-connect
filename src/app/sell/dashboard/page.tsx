"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  TrendingUp,
  Users,
  DollarSign,
  Plus,
  Eye,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Store,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AddProductModal } from "@/components/artisan/add-product-modal";
import { PRODUCTS, ARTISANS } from "@/lib/data/mock-catalog";
import { useArtisanCatalogStore } from "@/stores/artisan-catalog.store";
import { formatPrice } from "@/lib/utils";

export default function ArtisanDashboardPage() {
  const artisan = ARTISANS[0]; // Meera Sharma demo
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { customProducts, addProduct } = useArtisanCatalogStore();

  const baseStudioProducts = PRODUCTS.filter((p) => p.artisanId === artisan.id);
  const studioCustomProducts = customProducts.filter((p) => p.artisanId === artisan.id);
  const studioProducts = [...studioCustomProducts, ...baseStudioProducts];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        artisan={artisan}
        onProductAdded={(newProd) => addProduct(newProd)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
                Verified Studio
              </span>
              <span className="text-xs text-muted-foreground">ID: {artisan.id}</span>
            </div>
            <h1 className="font-heading text-3xl font-bold text-[#4A2418] mt-1">
              {artisan.shopName} — Studio Dashboard
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage your handcrafted inventory, track orders, and view Razorpay Route payouts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/artisans/${artisan.slug}`}
              className="px-4 py-2 rounded-xl border border-border text-xs font-semibold hover:bg-cream-100 transition-colors"
            >
              View Public Storefront
            </Link>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Creation</span>
            </button>
          </div>
        </div>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Total Studio Earnings</span>
              <DollarSign className="w-4 h-4 text-green-700" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#4A2418] mt-2">
              {formatPrice(4850000)} {/* ₹48,500 */}
            </p>
            <p className="text-[11px] text-green-700 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +18.4% from last month
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Orders to Pack & Ship</span>
              <Package className="w-4 h-4 text-[#B5502B]" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#4A2418] mt-2">
              5 orders
            </p>
            <p className="text-[11px] text-amber-700 mt-1">
              2 made-to-order items in craft
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Patrons & Followers</span>
              <Users className="w-4 h-4 text-purple-700" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#4A2418] mt-2">
              {artisan.followerCount}
            </p>
            <p className="text-[11px] text-green-700 mt-1 flex items-center gap-0.5">
              <ArrowUpRight className="w-3 h-3" /> +140 new followers this week
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border/50 shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-semibold">
              <span>Customer Rating</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <p className="font-heading text-2xl font-bold text-[#4A2418] mt-2">
              4.9 / 5.0
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Based on 148 verified reviews
            </p>
          </div>
        </div>

        {/* Studio Product Catalog Management */}
        <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden mb-8">
          <div className="p-5 border-b border-border/40 flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-[#4A2418]">
              Your Active Handmade Listings ({studioProducts.length})
            </h3>
            <span className="text-xs text-muted-foreground">
              90% payout via Razorpay Route
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-cream-50 text-muted-foreground uppercase text-[10px] tracking-wider border-b border-border/40">
                <tr>
                  <th className="py-3 px-4">Creation</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {studioProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-cream-50/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0">
                          {p.images?.[0] && (
                            <Image
                              src={p.images[0].url}
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{p.category.name}</td>
                    <td className="py-3 px-4 font-bold text-foreground">{formatPrice(p.price)}</td>
                    <td className="py-3 px-4">{p.stock} units</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-green-50 text-green-700 font-semibold">
                        <CheckCircle className="w-3 h-3" /> Active
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/product/${p.slug}`}
                        className="inline-flex items-center gap-1 text-[#B5502B] hover:underline font-semibold"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
