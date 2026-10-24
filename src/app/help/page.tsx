"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  Search,
  Package,
  RotateCcw,
  Truck,
  ShieldCheck,
  CreditCard,
  Store,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: "Orders & Shipping",
    q: "How does shipping work on ArtisanConnect?",
    a: "Every handcrafted piece is shipped directly from the artisan's studio or workshop across India. We provide free shipping on orders above ₹1,000, and a flat ₹80 courier charge for smaller orders. You receive live SMS and tracking link once the parcel is handed to Delhivery or BlueDart.",
  },
  {
    category: "Orders & Shipping",
    q: "What does 'Made to Order' mean?",
    a: "Some intricate items (like hand-carved mirrors, custom block-print sarees, or personalized brass deities) are created fresh upon your order. They require 3 to 7 days of crafting lead time before being packed with care and dispatched.",
  },
  {
    category: "Payments",
    q: "Which payment options are supported?",
    a: "We support Razorpay Secure (Google Pay, PhonePe, Paytm, UPI, RuPay, Visa, Mastercard, and Netbanking) with 256-bit encryption. Cash on Delivery (COD) is also available across 18,000+ Indian PIN codes for a nominal ₹49 handling fee.",
  },
  {
    category: "Returns & Authenticity",
    q: "What if a ceramic or terracotta item breaks during transit?",
    a: "We offer an unconditional 100% Break-in-Transit replacement guarantee. Simply take a quick photo of the parcel within 48 hours of delivery and email us at support@artisanconnect.in. We will dispatch a fresh replacement or refund your money immediately.",
  },
  {
    category: "Returns & Authenticity",
    q: "How do you verify genuine handmade authenticity?",
    a: "Our curation liaisons physically inspect studio setups, check raw materials (unrefined terracotta, vegetable indigo, pure mulberry silk), and verify artisan identity documents to eliminate industrial factory replicas.",
  },
  {
    category: "For Artisans",
    q: "How do artisans receive payouts?",
    a: "We charge only a 10% platform commission on successfully delivered orders. 90% of the sale value is automatically credited directly to the artisan's registered bank account via Razorpay Route split settlements.",
  },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Help Center & FAQ" }]} className="mb-6" />

        {/* Hero */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center text-[#B5502B] mx-auto mb-3">
            <HelpCircle className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
            ANSWERS & ASSISTANCE
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-1">
            How can we help you today?
          </h1>

          <div className="relative max-w-md mx-auto mt-6">
            <input
              type="text"
              placeholder="Search help articles, returns, payments, shipping..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-border bg-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#B5502B]/30"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <Link
            href="/account/orders"
            className="p-5 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-[#B5502B] flex-shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-foreground">Track Your Order</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Check live courier status and download invoices.
              </p>
            </div>
          </Link>

          <Link
            href="/policies/returns"
            className="p-5 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-green-700 flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-foreground">Returns & Breakage</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Break-in-transit guarantees and replacement policies.
              </p>
            </div>
          </Link>

          <Link
            href="/contact"
            className="p-5 rounded-2xl bg-white border border-border/50 shadow-sm hover:shadow-md transition-shadow flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-xl bg-cream-100 flex items-center justify-center text-brown-700 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs sm:text-sm text-foreground">Talk to Liaison</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                WhatsApp, email, or telephone customer support.
              </p>
            </div>
          </Link>
        </div>

        {/* FAQ Accordion List */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border/50 shadow-sm mb-12">
          <h2 className="font-heading text-2xl font-bold text-[#4A2418] mb-6">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-border/40">
            {filteredFaqs.map((faq, idx) => {
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

        {/* Contact CTA */}
        <div className="bg-[#F6DFD3] rounded-3xl p-8 border border-[#E9CBBB] text-center max-w-xl mx-auto shadow-sm">
          <h3 className="font-heading text-2xl font-bold text-[#4A2418]">
            Still have an unanswered question?
          </h3>
          <p className="text-xs text-[#7A5A3F] mt-1.5 mb-6">
            Our artisan liaison team is available Monday through Saturday.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
          >
            <span>Contact Support Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
