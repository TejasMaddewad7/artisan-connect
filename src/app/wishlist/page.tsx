"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowLeft, BellRing } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { useWishlistStore } from "@/stores/wishlist.store";
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getTotalItems: getWishlistTotal } = useWishlistStore();
  const { addItem, getTotalItems: getCartTotal } = useCartStore();

  const handleMoveToCart = (item: (typeof items)[0]) => {
    addItem(item.product, 1);
    removeItem(item.productId);
    toast.success(`Moved "${item.product.name}" to cart!`);
  };

  const handleMoveAllToCart = () => {
    items.forEach((item) => {
      addItem(item.product, 1);
    });
    clearWishlist();
    toast.success(`Moved all ${items.length} items to your shopping cart!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "My Wishlist" }]} className="mb-6" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#4A2418]">
              My Wishlist ({items.length} items)
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Saved artisanal creations that captured your heart.
            </p>
          </div>

          {items.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToCart}
                className="px-4 py-2 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
              >
                Move All to Cart
              </button>
              <button
                onClick={() => {
                  clearWishlist();
                  toast.info("Wishlist cleared");
                }}
                className="px-3 py-2 rounded-xl border border-border text-xs text-muted-foreground hover:bg-cream-100 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-border/50 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-[#B5502B]">
              <Heart className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2418]">
              Your wishlist is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              Click the heart icon on any product card while browsing to save your favourite creations here.
            </p>
            <Link
              href="/category/all"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B5502B] text-white text-xs sm:text-sm font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Handmade Products</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <div className="divide-y divide-border/40 p-4 sm:p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-4 items-center flex-1 min-w-0">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-cream-100 border border-border/50 flex-shrink-0">
                      {item.product.images?.[0] ? (
                        <Image
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    {/* Details */}
                    <div className="min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-semibold text-sm text-[#4A2418] hover:text-[#B5502B] transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        By {item.product.artisan?.shopName}
                      </p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="font-heading font-bold text-sm text-[#B5502B]">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.stock <= 5 && (
                          <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                            Only {item.product.stock} left in studio
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions: Add to Cart + Remove Heart */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={() => {
                        removeItem(item.productId);
                        toast.info(`Removed "${item.product.name}" from wishlist`);
                      }}
                      className="p-2 rounded-xl text-muted-foreground hover:text-destructive hover:bg-cream-100 transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Price-drop notifications opt-in banner */}
            <div className="bg-cream-100/60 p-4 border-t border-border/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <BellRing className="w-4 h-4 text-[#B5502B]" />
                <span className="text-[#4A2418] font-medium">
                  We&apos;ll notify you automatically when an item in your wishlist goes on sale or has low craft inventory.
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
