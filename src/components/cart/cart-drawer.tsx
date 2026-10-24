"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { useCartStore } from "@/stores/cart.store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const freeShippingThreshold = 100000; // ₹1,000 in paise
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col bg-white">
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border/60 flex flex-row items-center justify-between">
          <SheetTitle className="font-heading text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-terracotta-500" />
            Your Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
          </SheetTitle>
          <button
            onClick={closeCart}
            className="p-1 rounded-md hover:bg-cream-100 text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </SheetHeader>

        {/* Free Shipping Progress */}
        <div className="bg-cream-100/70 p-3 px-4 border-b border-border/40 text-xs">
          {remainingForFreeShipping > 0 ? (
            <p className="text-brown-700">
              Add <span className="font-semibold text-terracotta-600">{formatPrice(remainingForFreeShipping)}</span> more for <span className="font-semibold">FREE Shipping</span>!
            </p>
          ) : (
            <p className="text-sage-600 font-semibold">
              🎉 Congratulations! You unlocked FREE Shipping!
            </p>
          )}
          <div className="w-full bg-cream-200 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-terracotta-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border/40 p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-brown-400" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-brown-800">Your cart is empty</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                Explore handcrafted authentic treasures made with love by independent artisans.
              </p>
              <Link
                href="/category/all"
                onClick={closeCart}
                className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-terracotta-500 text-white text-xs font-medium hover:bg-terracotta-600 transition-colors"
              >
                Start Exploring
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-cream-100 flex-shrink-0 border border-border/50">
                  {item.product.images?.[0] ? (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                      No img
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    onClick={closeCart}
                    className="text-xs font-semibold text-foreground hover:text-terracotta-500 line-clamp-1 transition-colors"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-[11px] text-muted-foreground truncate">
                    By {item.product.artisan?.shopName || "Artisan"}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-heading font-bold text-sm text-terracotta-600">
                      {formatPrice(item.product.price)}
                    </span>
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                      size="sm"
                      max={item.product.stock || 20}
                    />
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-red-50 rounded-md transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border/60 bg-cream-50/50 space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-heading font-bold text-base text-foreground">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              Taxes and shipping calculated at checkout.
            </p>
            <div className="flex gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeCart}
                className="flex-1 text-center py-2.5 px-3 rounded-lg border border-border bg-white text-xs font-semibold hover:bg-cream-100 transition-colors"
              >
                View Full Cart
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-terracotta-500 text-white text-xs font-semibold hover:bg-terracotta-600 shadow-sm transition-colors"
              >
                Checkout
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
