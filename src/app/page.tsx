"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Heart, Leaf, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { BotanicalLeaf } from "@/components/shared/botanical-leaf";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { CATEGORIES, PRODUCTS } from "@/lib/data/mock-catalog";
import { toast } from "sonner";

export default function HomePage() {
  const { addItem, getTotalItems: getCartTotal } = useCartStore();
  const { toggleItem, isInWishlist, getTotalItems: getWishlistTotal } = useWishlistStore();

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addItem(product, 1);
      toast.success(`Added "${product.name}" to your cart!`);
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      const added = toggleItem(product);
      if (added) {
        toast.success(`Saved "${product.name}" to wishlist`);
      } else {
        toast.info(`Removed "${product.name}" from wishlist`);
      }
    }
  };

  const handpickedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      {/* Global Header */}
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1">
        {/* ─── Hero Section with Side Promo ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Main Hero Card (8 cols) */}
            <div className="lg:col-span-8 bg-[#F6DFD3]/80 border border-[#E9CBBB]/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between shadow-sm">
              {/* Botanical Leaf Overlay */}
              <BotanicalLeaf
                variant="corner"
                className="absolute top-0 left-0 w-64 h-64 text-[#7A8B69]/30 pointer-events-none"
              />

              <div className="relative z-10 max-w-xl">
                <span className="text-[11px] font-semibold tracking-[0.25em] text-[#B5502B] uppercase">
                  MADE BY HAND, MADE WITH HEART
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-[54px] leading-[1.1] font-bold text-[#4A2418] mt-3">
                  Discover the beauty <br className="hidden sm:inline" />
                  of handmade.
                </h1>
                <p className="text-sm sm:text-base text-[#7A5A3F] mt-4 leading-relaxed max-w-md">
                  Thoughtfully crafted treasures from independent makers across India. Authentic heritage, sustainable stories.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    href="/category/all"
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#B5502B] text-white font-medium text-sm hover:bg-[#A04424] transition-all shadow-md hover:shadow-lg group"
                  >
                    <span>Explore handmade</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Pottery Image with Script Overlay */}
              <div className="absolute right-0 bottom-0 top-0 w-2/5 hidden sm:block pointer-events-none">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=700&q=80"
                    alt="Handmade terracotta pottery"
                    fill
                    className="object-cover object-center mix-blend-multiply opacity-90"
                    priority
                  />
                  {/* Handwritten script overlay */}
                  <div className="absolute top-12 right-10 text-white/95 font-serif italic text-2xl drop-shadow-md select-none transform rotate-3">
                    Crafted <br />
                    <span className="text-xl pl-4">with purpose</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="relative z-10 pt-10 sm:pt-14 mt-auto border-t border-[#E9CBBB]/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5 text-xs text-[#5C3F2A] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#B5502B]" />
                  <span>Authentic Craftsmanship</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#5C3F2A] font-medium">
                  <Heart className="w-4 h-4 text-[#B5502B]" />
                  <span>Support Local Makers</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#5C3F2A] font-medium">
                  <Leaf className="w-4 h-4 text-[#7A8B69]" />
                  <span>Sustainable Choices</span>
                </div>
              </div>
            </div>

            {/* Side Promo Card (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-border/60 shadow-sm flex flex-col justify-between overflow-hidden relative group">
              <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 bg-cream-100">
                <Image
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                  alt="Meaningful gifts, made by hand"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div>
                <h3 className="font-heading text-2xl font-bold text-[#4A2418]">
                  Meaningful gifts, <br />
                  made by hand
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  Unique, thoughtful and full of heart. Wrap your sentiments in authentic artisanal care.
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <Link
                  href="/category/art-gifts"
                  className="w-11 h-11 rounded-full bg-[#B5502B] text-white flex items-center justify-center hover:bg-[#A04424] transition-colors shadow-sm group-hover:translate-x-1"
                  aria-label="Explore gifts"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Categories Section: "Find something beautifully handmade" ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418]">
              Find something beautifully handmade
            </h2>
            <Link
              href="/category/all"
              className="text-xs sm:text-sm font-semibold text-[#B5502B] hover:text-[#A04424] flex items-center gap-1 group transition-colors"
            >
              <span>View all categories</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full bg-cream-100 overflow-hidden">
                  <Image
                    src={category.image || ""}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex items-center justify-between mt-auto">
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#4A2418] group-hover:text-[#B5502B] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {category.subtitle}
                    </p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-cream-100 group-hover:bg-[#B5502B] group-hover:text-white flex items-center justify-center text-brown-600 transition-colors flex-shrink-0 ml-2">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Handpicked Products Section ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 gap-2">
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418]">
                Handpicked for you
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Unique finds from makers worth discovering.
              </p>
            </div>
            <Link
              href="/category/all"
              className="text-xs sm:text-sm font-semibold text-[#B5502B] hover:text-[#A04424] flex items-center gap-1 group transition-colors"
            >
              <span>View all products</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {handpickedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isInWishlist(product.id)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        </section>

        {/* ─── Seller CTA Banner ─── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-[#F6DFD3] border border-[#E9CBBB] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
            {/* Left and Right Botanical Leaf SVGs */}
            <BotanicalLeaf
              variant="branch"
              className="absolute -bottom-6 -left-6 w-48 h-48 text-[#7A8B69]/30 pointer-events-none rotate-45"
            />
            <BotanicalLeaf
              variant="branch"
              className="absolute -bottom-6 -right-6 w-48 h-48 text-[#7A8B69]/30 pointer-events-none -rotate-45"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Text Left */}
              <div className="lg:col-span-5">
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418]">
                  Your craft deserves <br />
                  a wider audience.
                </h2>
                <p className="text-xs sm:text-sm text-[#7A5A3F] mt-3 leading-relaxed">
                  Bring your handmade creations to more customers. Build your digital storefront, tell your story, and grow your business with ArtisanConnect.
                </p>
              </div>

              {/* 4 Checklist Items Center */}
              <div className="lg:col-span-4 space-y-3">
                {[
                  "Create your artisan profile",
                  "Showcase your products",
                  "Reach customers beyond local exhibitions",
                  "Manage listings with ease",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-[#4A2418]">
                    <CheckCircle2 className="w-4 h-4 text-[#B5502B] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTAs Right */}
              <div className="lg:col-span-3 flex flex-col items-start lg:items-end gap-3">
                <Link
                  href="/sell/register"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B5502B] text-white text-sm font-medium hover:bg-[#A04424] transition-colors shadow-md hover:shadow-lg"
                >
                  <span>Start selling</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-xs font-semibold text-[#4A2418] hover:text-[#B5502B] underline underline-offset-4 transition-colors"
                >
                  Learn how it works
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
