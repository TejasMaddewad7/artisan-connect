import Link from "next/link";
import { CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, Store, FileText } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

export default function SellerGuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "Sellers", href: "/sell/register" },
            { label: "Craft & Seller Guidelines" },
          ]}
          className="mb-6"
        />

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm mb-8">
          <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
            STANDARDS OF EXCELLENCE
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-1">
            Artisan Quality & Authenticity Guidelines
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            To preserve customer trust, every studio on ArtisanConnect pledges adherence to our Craft Charter.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-green-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>What We Actively Welcome</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-2 pl-7 list-disc">
              <li>100% handmade, hand-loomed, hand-embroidered, wheel-thrown, or lost-wax cast items.</li>
              <li>Generational Indian regional craft traditions with authentic Geographical Indication provenance.</li>
              <li>Organic materials: unrefined clay, brass/bell-metal, mulberry silk, khadi cotton, natural stones.</li>
              <li>Transparent lead-times clearly declared for made-to-order creations.</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>Prohibited Listings</span>
            </div>
            <ul className="text-xs text-muted-foreground space-y-2 pl-7 list-disc">
              <li>Mass factory manufactured products falsely represented as hand-crafted.</li>
              <li>Drop-shipped generic inventory from overseas suppliers.</li>
              <li>Items incorporating restricted wildlife animal products, ivory, or synthetic counterfeit gems.</li>
              <li>Misleading listings with photos copied from stock repositories without depicting actual workshop creations.</li>
            </ul>
          </div>

          <div className="bg-[#F6DFD3] rounded-3xl p-8 border border-[#E9CBBB] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-[#4A2418]">
                Ready to sell your handmade creations?
              </h3>
              <p className="text-xs text-[#7A5A3F] mt-1">
                Zero listing fees. Keep 90% of your selling price with direct Razorpay bank payouts.
              </p>
            </div>
            <Link
              href="/sell/register"
              className="px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors whitespace-nowrap shadow-sm"
            >
              Start Registration
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
