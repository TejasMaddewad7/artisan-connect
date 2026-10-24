import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, Sparkles, Truck, Store } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "How It Works" }]} className="mb-6" />

        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
            TRANSPARENT & FAIR
          </span>
          <h1 className="font-heading text-4xl font-bold text-[#4A2418] mt-2">
            How ArtisanConnect Works
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-3 leading-relaxed">
            We bridge the gap between discerning customers and authentic, generational craft masters across India.
          </p>
        </div>

        {/* 3 Steps for Buyers */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#4A2418] mb-8 text-center">
            For Discerning Buyers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cream-100 text-[#B5502B] font-heading font-bold text-xl flex items-center justify-center mx-auto">
                1
              </div>
              <h3 className="font-semibold text-sm text-foreground">Discover Real Provenance</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every creation lists the actual artisan, their village or town, and the generational techniques used.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cream-100 text-[#B5502B] font-heading font-bold text-xl flex items-center justify-center mx-auto">
                2
              </div>
              <h3 className="font-semibold text-sm text-foreground">Direct Fair-Trade Impact</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                90% of every rupee you spend goes straight to the maker&apos;s bank account via Razorpay Route split payouts.
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cream-100 text-[#B5502B] font-heading font-bold text-xl flex items-center justify-center mx-auto">
                3
              </div>
              <h3 className="font-semibold text-sm text-foreground">Delivered From The Studio</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Items are safely packed with eco-friendly honeycomb wrap and shipped straight from the workshop with live tracking.
              </p>
            </div>
          </div>
        </div>

        {/* For Sellers */}
        <div className="bg-[#F6DFD3] rounded-3xl p-8 sm:p-12 border border-[#E9CBBB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418]">
              Are you an artisan, weaver, or craft guild?
            </h2>
            <p className="text-xs sm:text-sm text-[#7A5A3F] mt-2 leading-relaxed">
              Open your free digital storefront today. No listing fees, no hidden cuts. Just 10% platform commission on successful deliveries.
            </p>
          </div>
          <Link
            href="/sell/register"
            className="px-6 py-3 rounded-xl bg-[#B5502B] text-white text-xs sm:text-sm font-semibold hover:bg-[#A04424] transition-colors shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <span>Start Selling With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
