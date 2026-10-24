"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTotalItems, clearCart } = useCartStore();
  const { getTotalItems: getWishlistTotal } = useWishlistStore();

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPaise: number } | null>(null);

  const subtotal = getSubtotal();
  const freeShippingThreshold = 100000; // ₹1,000 in paise
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 8000; // ₹80 in paise
  const discount = appliedCoupon ? appliedCoupon.discountPaise : 0;
  const total = Math.max(0, subtotal + deliveryFee - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "HANDMADE10") {
      const discountAmount = Math.round(subtotal * 0.1); // 10% off
      setAppliedCoupon({ code: "HANDMADE10", discountPaise: discountAmount });
      toast.success("Coupon 'HANDMADE10' applied! 10% discount added.");
    } else if (couponCode.toUpperCase() === "ARTISAN50") {
      setAppliedCoupon({ code: "ARTISAN50", discountPaise: 5000 });
      toast.success("Coupon 'ARTISAN50' applied! ₹50 discount added.");
    } else {
      toast.error("Invalid coupon code. Try 'HANDMADE10' or 'ARTISAN50'");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.info("Coupon removed");
  };

  // Group items by artisan
  const itemsByArtisan = items.reduce((acc, item) => {
    const artisanName = item.product.artisan?.shopName || "Artisan Studio";
    if (!acc[artisanName]) {
      acc[artisanName] = [];
    }
    acc[artisanName].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getTotalItems()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumbs items={[{ label: "Shopping Cart" }]} className="mb-6" />

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#4A2418]">
              Your Cart ({getTotalItems()} items)
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review your authentic handmade selections before checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={() => {
                clearCart();
                toast.info("Cart cleared");
              }}
              className="text-xs text-muted-foreground hover:text-destructive underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-border/50 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-[#B5502B]">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2418]">
              Your cart is waiting for handmade warmth
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
              Support independent artisans across India. Discover handcrafted pottery, jewelry, and handloom textiles.
            </p>
            <Link
              href="/category/all"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B5502B] text-white text-xs sm:text-sm font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Marketplace</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 cols: Cart Items Grouped by Artisan */}
            <div className="lg:col-span-8 space-y-6">
              {Object.entries(itemsByArtisan).map(([artisanName, artisanItems]) => (
                <div
                  key={artisanName}
                  className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
                >
                  <div className="bg-cream-50 p-4 border-b border-border/40 flex items-center justify-between">
                    <span className="text-xs font-bold text-brown-800 uppercase tracking-wide">
                      Craft Studio: {artisanName}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      Ships directly from artisan workshop
                    </span>
                  </div>

                  <div className="divide-y divide-border/40 p-4 sm:p-6 space-y-4">
                    {artisanItems.map((item) => (
                      <div key={item.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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

                        {/* Title and details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-semibold text-sm text-[#4A2418] hover:text-[#B5502B] transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            By {item.product.artisan?.shopName}
                          </p>
                          <div className="mt-1">
                            <span className="font-heading font-bold text-sm text-[#B5502B]">
                              {formatPrice(item.product.price)}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Stepper & Delete */}
                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                          <QuantityStepper
                            value={item.quantity}
                            onChange={(q) => updateQuantity(item.id, q)}
                            max={item.product.stock || 20}
                            size="sm"
                          />
                          <span className="font-heading font-bold text-sm text-[#4A2418] w-20 text-right">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                          <button
                            onClick={() => {
                              removeItem(item.id);
                              toast.info(`Removed "${item.product.name}"`);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-lg transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right 4 cols: Order Summary & Coupon */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-6 sticky top-24">
              <h2 className="font-heading text-xl font-bold text-[#4A2418]">
                Order Summary
              </h2>

              {/* Coupon Code Input */}
              <div className="space-y-2 pb-4 border-b border-border/40">
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Coupon code (HANDMADE10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full h-9 pl-9 pr-3 text-xs rounded-lg border border-border uppercase focus:outline-none focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 h-9 rounded-lg bg-cream-200 text-brown-800 text-xs font-semibold hover:bg-cream-300 transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {appliedCoupon && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-green-50 border border-green-200 text-xs text-green-800">
                    <span>Coupon <strong>{appliedCoupon.code}</strong> applied!</span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-900 hover:underline font-bold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
                  <span>{deliveryFee === 0 ? <strong className="text-green-700">FREE</strong> : formatPrice(deliveryFee)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-700 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-border/40 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-foreground">Total (incl. GST)</span>
                  <span className="font-heading text-xl font-bold text-[#B5502B]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Free delivery notice */}
              {subtotal < freeShippingThreshold && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  Add {formatPrice(freeShippingThreshold - subtotal)} more for free delivery!
                </p>
              )}

              {/* Proceed to Checkout CTA */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#B5502B] text-white font-semibold text-xs sm:text-sm hover:bg-[#A04424] shadow-md transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
                <ShieldCheck className="w-4 h-4 text-green-700" />
                <span>100% Secure Checkout powered by Razorpay</span>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
