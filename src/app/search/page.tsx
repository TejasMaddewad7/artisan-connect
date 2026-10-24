"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ProductCard } from "@/components/product/product-card";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { PRODUCTS } from "@/lib/data/mock-catalog";
import { toast } from "sonner";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const matchingProducts = PRODUCTS.filter((p) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.artisan.shopName.toLowerCase().includes(q) ||
      p.category.name.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-[#4A2418]">
          Search Handmade Treasures
        </h1>
        <div className="relative max-w-md mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product, artisan, craft material..."
            className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5502B]/30"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Showing {matchingProducts.length} results {query && `for "${query}"`}
        </p>
      </div>

      {matchingProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-border/50">
          <p className="font-heading text-lg font-semibold text-brown-800">
            No handcrafted pieces matched your query.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Try searching for &quot;terracotta&quot;, &quot;cotton&quot;, &quot;brass&quot;, or &quot;handloom&quot;.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {matchingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={isInWishlist(product.id)}
              onAddToCart={() => {
                addItem(product, 1);
                toast.success(`Added "${product.name}" to cart!`);
              }}
              onToggleWishlist={() => toggleItem(product)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default function SearchResultsPage() {
  const { getTotalItems: getCartTotal } = useCartStore();
  const { getTotalItems: getWishlistTotal } = useWishlistStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Search Results" }]} className="mb-6" />
        <Suspense fallback={<div className="p-12 text-center text-xs">Searching marketplace...</div>}>
          <SearchResultsContent />
        </Suspense>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
