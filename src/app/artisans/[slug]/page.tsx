"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, UserPlus, Check, Star, Package, Users, ShieldCheck, Heart } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { RatingStars } from "@/components/shared/rating-stars";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { ARTISANS, PRODUCTS, REVIEWS } from "@/lib/data/mock-catalog";
import { formatCompactNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function ArtisanProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  const artisan = ARTISANS.find((a) => a.slug === resolvedParams.slug) || ARTISANS[0];
  const artisanProducts = PRODUCTS.filter((p) => p.artisanId === artisan.id);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(artisan.followerCount);

  const { addItem, getTotalItems: getCartTotal } = useCartStore();
  const { toggleItem, isInWishlist, getTotalItems: getWishlistTotal } = useWishlistStore();

  const handleFollowToggle = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
      toast.info(`Unfollowed ${artisan.shopName}`);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
      toast.success(`Following ${artisan.shopName}! You'll be notified of new handcrafted drops.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Meet the Artisans", href: "/artisans" },
            { label: artisan.shopName },
          ]}
          className="mb-6"
        />

        {/* Profile Card with Cover Banner & Avatar */}
        <div className="bg-white rounded-3xl overflow-hidden border border-border/50 shadow-sm mb-10">
          {/* Cover Banner */}
          <div className="relative h-48 sm:h-64 lg:h-72 w-full bg-cream-200">
            {artisan.coverImage ? (
              <Image
                src={artisan.coverImage}
                alt={`${artisan.shopName} workshop`}
                fill
                className="object-cover"
                priority
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Profile Header Info */}
          <div className="px-6 sm:px-10 pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              {/* Circular Avatar */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white overflow-hidden shadow-md bg-cream-100 flex-shrink-0">
                {artisan.avatar ? (
                  <Image
                    src={artisan.avatar}
                    alt={artisan.shopName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-heading text-3xl text-brown-600">
                    {artisan.shopName.charAt(0)}
                  </div>
                )}
              </div>

              {/* Follow Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleFollowToggle}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-sm ${
                    isFollowing
                      ? "bg-cream-200 text-brown-800 hover:bg-cream-300"
                      : "bg-[#B5502B] text-white hover:bg-[#A04424]"
                  }`}
                >
                  {isFollowing ? (
                    <>
                      <Check className="w-4 h-4 text-green-700" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Follow Studio</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Shop Details */}
            <div className="max-w-2xl">
              <h1 className="font-heading text-3xl font-bold text-[#4A2418]">
                {artisan.shopName}
              </h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#B5502B]" />
                <span>
                  {artisan.city}, {artisan.state}
                </span>
                <span>•</span>
                <span>Master Artisan since {artisan.memberSince}</span>
              </div>
              <p className="text-xs sm:text-sm text-[#7A5A3F] mt-3 leading-relaxed">
                {artisan.bio}
              </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 sm:grid-cols-3 max-w-md gap-4 mt-6 pt-6 border-t border-border/40 text-center sm:text-left">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Products</span>
                <p className="font-heading text-xl font-bold text-foreground">
                  {artisanProducts.length || artisan.productCount}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Followers</span>
                <p className="font-heading text-xl font-bold text-foreground">
                  {formatCompactNumber(followerCount)}
                </p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Rating</span>
                <p className="font-heading text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-1">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500 inline" />
                  {artisan.ratingAvg.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs: Products / About / Reviews */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="bg-white border border-border/50 p-1 rounded-xl mb-8">
            <TabsTrigger value="products" className="text-xs font-semibold px-4 py-2">
              Studio Products ({artisanProducts.length})
            </TabsTrigger>
            <TabsTrigger value="about" className="text-xs font-semibold px-4 py-2">
              Artisan Story & Heritage
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs font-semibold px-4 py-2">
              Studio Reviews
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            {artisanProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-border/50">
                <p className="font-heading text-lg font-semibold text-brown-800">
                  New handcrafted creations are being made on the wheel/loom right now.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artisanProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    isWishlisted={isInWishlist(p.id)}
                    onAddToCart={(id) => {
                      addItem(p, 1);
                      toast.success(`Added "${p.name}" to cart!`);
                    }}
                    onToggleWishlist={() => toggleItem(p)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-border/50 shadow-sm space-y-6 max-w-3xl">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#4A2418]">
                  Generational Craftsmanship
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Every single piece that leaves {artisan.shopName}&apos;s studio carries the spirit of traditional Indian craftsmanship. Working directly out of {artisan.city}, raw earth, indigenous fibers, and non-toxic natural pigments are shaped patiently by hand.
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-600 mb-2">
                  Specialized Craft Disciplines:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {artisan.craftCategories?.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full bg-cream-100 text-brown-800 text-xs font-medium border border-border/40"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cream-50 border border-border/40 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-terracotta-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-foreground">ArtisanConnect Verified Guild Member</h5>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    This studio undergoes regular ethical audits for 100% fair artisan compensation, safe craft workshops, and genuine provenance.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="bg-white rounded-2xl p-6 sm:p-10 border border-border/50 shadow-sm space-y-6 max-w-3xl">
              <h3 className="font-heading text-xl font-bold text-[#4A2418]">
                What Patrons Say About {artisan.shopName}
              </h3>
              <div className="space-y-4">
                {REVIEWS.map((r) => (
                  <div key={r.id} className="pb-4 border-b border-border/30 last:border-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground">{r.userName}</span>
                      <RatingStars rating={r.rating} size="sm" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {r.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
