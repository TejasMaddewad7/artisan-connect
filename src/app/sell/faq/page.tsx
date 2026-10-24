"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Store, DollarSign, ShieldCheck, ArrowRight, Package } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

const SELLER_FAQS = [
  {
    q: "How much does it cost to list products on ArtisanConnect?",
    a: "Listing products on ArtisanConnect is 100% free with zero upfront or monthly subscription charges. We operate on a transparent success-based model: a 10% platform commission is deducted only when an order is successfully confirmed and delivered.",
  },
  {
    q: "When and how do I receive my payouts?",
    a: "Payouts are automated via Razorpay Route split settlement. 90% of the item price is transferred directly into your registered Indian bank account or linked UPI ID within 3-5 days of customer delivery.",
  },
  {
    q: "Who handles shipping and logistics?",
    a: "ArtisanConnect partners with Delhivery, BlueDart, and India Post. When a customer orders, shipping labels are generated automatically in your Artisan Dashboard. Couriers arrive directly at your studio or workshop address for pickup.",
  },
  {
    q: "What documents do I need to register?",
    a: "You will need: (1) Permanent Account Number (PAN), (2) Active Bank Account details (Account Number & IFSC) or UPI ID, (3) Workshop pickup address, and (4) Studio/craft photos for curation verification. GSTIN is optional for small turnover craft guilds.",
  },
  {
    q: "Can I sell made-to-order bespoke creations?",
    a: "Yes! In fact, customers love personalized and bespoke crafts. You can set realistic crafting lead times (e.g. 5 days, 10 days) when listing, and your dashboard will track orders currently in craft.",
  },
];

export default function SellerFaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "Sellers", href: "/sell/register" },
            { label: "Seller FAQ" },
          ]}
          className="mb-6"
        />

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm mb-8">
          <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
            SELLER ASSISTANCE
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-1">
            Frequently Asked Questions for Artisans
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Everything you need to know about opening your digital studio on ArtisanConnect.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border/50 shadow-sm mb-8">
          <div className="divide-y divide-border/40">
            {SELLER_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-semibold text-xs sm:text-sm text-[#4A2418] hover:text-[#B5502B] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180 text-[#B5502B]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed pl-1 pr-6 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-[#F6DFD3] rounded-3xl p-8 border border-[#E9CBBB] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#4A2418]">
              Ready to showcase your heritage craft?
            </h3>
            <p className="text-xs text-[#7A5A3F] mt-1">
              Join 350+ verified generational makers and artisans across India.
            </p>
          </div>
          <Link
            href="/sell/register"
            className="px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors whitespace-nowrap shadow-sm"
          >
            Apply as Artisan Studio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
