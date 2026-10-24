"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Truck, ArrowRight, Home } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "AC-849201";

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-border/50 shadow-sm">
      {/* Success Check Icon */}
      <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
        THANK YOU FOR SUPPORTING INDEPENDENT ARTISANS
      </span>
      <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-2">
        Your Order is Confirmed!
      </h1>
      <p className="text-xs sm:text-sm text-muted-foreground mt-2">
        Order Reference: <strong className="text-foreground">{orderNumber}</strong>
      </p>

      {/* Delivery Timeline Card */}
      <div className="my-8 p-6 rounded-2xl bg-cream-50 border border-border/40 text-left max-w-md mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-[#B5502B]" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Dispatched Directly by Artisan</h4>
            <p className="text-[11px] text-muted-foreground">Studio is preparing your handmade treasures.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-green-700" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Estimated Delivery</h4>
            <p className="text-[11px] text-muted-foreground">In 3-5 business days with live SMS tracking.</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-8">
        A confirmation receipt and GST tax invoice have been dispatched to your email address.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
        <Link
          href="/category/all"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-cream-100 transition-colors"
        >
          <span>Explore More Crafts</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense fallback={<div className="p-12 text-center text-xs">Loading order confirmation...</div>}>
          <OrderConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
