"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin, Star, ArrowRight, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { ARTISANS } from "@/lib/data/mock-catalog";
import { formatCompactNumber } from "@/lib/utils";

export default function ArtisansDirectoryPage() {
  const [search, setSearch] = useState("");
  const { getTotalItems: getCartTotal } = useCartStore();
  const { getTotalItems: getWishlistTotal } = useWishlistStore();

  const filteredArtisans = ARTISANS.filter((a) => {
    const query = search.toLowerCase();
    return (
      a.shopName.toLowerCase().includes(query) ||
      a.city.toLowerCase().includes(query) ||
      a.state.toLowerCase().includes(query) ||
      a.craftCategories?.some((c) => c.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs
          items={[{ label: "Meet the Artisans" }]}
          className="mb-4"
        />

        {/* Directory Hero */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
            INDIE STUDIOS & GUILDS
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-2">
            Meet the Artisans
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
            Discover the generational weavers, potters, silversmiths, and folk artists behind every one-of-a-kind creation.
          </p>

          {/* Search Box */}
          <div className="relative max-w-md mx-auto mt-6">
            <input
              type="text"
              placeholder="Search by artisan name, craft or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5502B]/30"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Artisans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredArtisans.map((artisan) => (
            <Link
              key={artisan.id}
              href={`/artisans/${artisan.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              {/* Cover Banner */}
              <div className="relative h-32 w-full bg-cream-200 overflow-hidden">
                {artisan.coverImage && (
                  <Image
                    src={artisan.coverImage}
                    alt={artisan.shopName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between relative">
                {/* Floating Avatar */}
                <div className="relative -mt-12 mb-3 w-16 h-16 rounded-full border-2 border-white overflow-hidden shadow bg-cream-100">
                  {artisan.avatar && (
                    <Image
                      src={artisan.avatar}
                      alt={artisan.shopName}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div>
                  <h3 className="font-heading text-lg font-bold text-[#4A2418] group-hover:text-[#B5502B] transition-colors">
                    {artisan.shopName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B5502B]" />
                    <span>{artisan.city}, {artisan.state}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {artisan.bio}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-foreground font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {artisan.ratingAvg.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      {formatCompactNumber(artisan.followerCount)} followers
                    </span>
                  </div>
                  <span className="text-[#B5502B] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View studio <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
