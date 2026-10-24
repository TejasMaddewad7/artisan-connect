"use client";

import { use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { ShieldCheck, Truck, RotateCcw, Lock, FileText } from "lucide-react";

interface PolicyContent {
  title: string;
  badge: string;
  icon: any;
  updated: string;
  sections: { title: string; content: string }[];
}

const POLICIES: Record<string, PolicyContent> = {
  shipping: {
    title: "Handmade Shipping & Delivery Policy",
    badge: "SAFE & ECO-FRIENDLY DISPATCH",
    icon: Truck,
    updated: "October 2026",
    sections: [
      {
        title: "1. Direct Workshop Fulfillment",
        content:
          "All creations on ArtisanConnect are dispatched directly from the respective artisan's studio or village workshop. This eliminates unnecessary warehouse delays and ensures direct income reaches our makers without intermediary deductions.",
      },
      {
        title: "2. Free Shipping Threshold & Rates",
        content:
          "We offer FREE express delivery on all orders across India above ₹1,000. For orders below ₹1,000, a flat standardized courier fee of ₹80 is applied at checkout to cover transit and packaging costs.",
      },
      {
        title: "3. Lead Times for Made-to-Order Crafts",
        content:
          "Items explicitly marked as 'Made to Order' require genuine crafting time (typically 3 to 7 business days) before dispatch. You will receive active SMS and email notifications at each milestone: Crafting Started, Honeycomb Wrapped, and Courier Dispatched.",
      },
      {
        title: "4. Zero-Plastic Sustainable Packaging",
        content:
          "We prohibit single-use plastic bubble wraps. Studios utilize unbleached kraft paper, biodegradable honeycomb wrap, and recycled cardboard cartons with natural jute twine to ensure fragile pottery and brass items arrive in flawless condition.",
      },
    ],
  },
  returns: {
    title: "Handmade Returns & Break-in-Transit Policy",
    badge: "100% BUYER ASSURANCE",
    icon: RotateCcw,
    updated: "October 2026",
    sections: [
      {
        title: "1. Breakage in Transit Replacement Guarantee",
        content:
          "In the rare event that a delicate ceramic, glass, or terracotta piece arrives damaged during courier handling, simply email a photo of the parcel within 48 hours of delivery. We will issue an immediate replacement or 100% refund without requiring you to return shattered pieces.",
      },
      {
        title: "2. The Nature of Handmade Uniqueness",
        content:
          "Hand-block printing, manual wheel pottery, and natural vegetable dyes have inherent variations in glaze tone, weave texture, and dye motifs. These organic imperfections are the true hallmark of authentic craftsmanship and are not considered manufacturing defects.",
      },
      {
        title: "3. 7-Day Return Window",
        content:
          "Standard non-customized creations can be returned within 7 days of delivery in their original, unused state with craft tags intact. Return courier pickup is coordinated by ArtisanConnect.",
      },
      {
        title: "4. Instant Refund Settlements",
        content:
          "Approved refunds are credited directly back to your original payment method (Razorpay UPI, Debit/Credit Card, Netbanking) within 3-5 business days.",
      },
    ],
  },
  privacy: {
    title: "Privacy & Data Protection Policy",
    badge: "256-BIT ENCRYPTED & CONFIDENTIAL",
    icon: Lock,
    updated: "October 2026",
    sections: [
      {
        title: "1. Respect for Your Data",
        content:
          "We respect your privacy. ArtisanConnect never sells, rents, or shares your personal details or browsing habits with third-party advertising networks. We only collect details essential for order fulfillment and courier tracking updates.",
      },
      {
        title: "2. Payment Security",
        content:
          "Payment transactions are processed through Razorpay's PCI-DSS Level 1 certified gateway. We never store credit/debit card numbers, CVVs, or UPI PINs on our servers.",
      },
      {
        title: "3. Communication Preferences",
        content:
          "You can manage your email and SMS preferences anytime in your Profile & Settings. We send transactional order notifications and opt-in artisan story newsletters.",
      },
    ],
  },
  terms: {
    title: "Terms of Service & Guild Standards",
    badge: "FAIR-TRADE MARKETPLACE CHARTER",
    icon: FileText,
    updated: "October 2026",
    sections: [
      {
        title: "1. Marketplace Agreement",
        content:
          "By accessing ArtisanConnect, you participate in a fair-trade collective committed to supporting verified generational artisans across India under transparent, ethical pricing guidelines.",
      },
      {
        title: "2. Artisan Authenticity Standards",
        content:
          "All sellers agree to our strict handmade charter. Industrial factory machine-goods falsely labeled as handmade are permanently removed from the catalog, and payouts withheld.",
      },
      {
        title: "3. Razorpay Split Settlements",
        content:
          "Platform orders are routed through automated split payouts: 90% goes directly to the verified artisan studio account and 10% covers marketplace hosting, curation, and gateway fees.",
      },
    ],
  },
};

export default function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolved = use(params);
  const slug = resolved.slug.toLowerCase();
  const policy = POLICIES[slug] || POLICIES.shipping;
  const IconComponent = policy.icon;

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs
          items={[
            { label: "Policies & Standards", href: "/policies/shipping" },
            { label: policy.title },
          ]}
          className="mb-6"
        />

        {/* Policy Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm mb-8">
          <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center text-[#B5502B] mb-4">
            <IconComponent className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
            {policy.badge}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-2">
            {policy.title}
          </h1>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {policy.updated} · Fair-Trade ArtisanConnect Marketplace
          </p>

          {/* Quick Tabs to Other Policies */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border/40">
            {Object.entries(POLICIES).map(([k, p]) => (
              <Link
                key={k}
                href={`/policies/${k}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  k === slug
                    ? "bg-[#B5502B] text-white"
                    : "bg-cream-50 text-muted-foreground hover:bg-cream-100"
                }`}
              >
                {p.title.split("&")[0].trim()}
              </Link>
            ))}
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm space-y-8">
          {policy.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="font-heading text-xl font-bold text-[#4A2418]">
                {section.title}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
