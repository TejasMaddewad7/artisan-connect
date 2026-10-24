"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { BotanicalLeaf } from "@/components/shared/botanical-leaf";

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Crafts", href: "/category/all" },
      { label: "Home & Living", href: "/category/home-living" },
      { label: "Jewelry", href: "/category/jewelry" },
      { label: "Textiles & Fashion", href: "/category/textiles-fashion" },
      { label: "Art & Gifts", href: "/category/art-gifts" },
    ],
  },
  about: {
    title: "About",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "How It Works", href: "/how-it-works" },
      { label: "Meet the Artisans", href: "/artisans" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Shipping Policy", href: "/policies/shipping" },
      { label: "Returns & Refunds", href: "/policies/returns" },
      { label: "Privacy Policy", href: "/policies/privacy" },
      { label: "Terms of Service", href: "/policies/terms" },
    ],
  },
  sellers: {
    title: "Sellers",
    links: [
      { label: "Sell with Us", href: "/sell/register" },
      { label: "Seller Guidelines", href: "/sell/guidelines" },
      { label: "Seller Dashboard", href: "/sell/dashboard" },
      { label: "Seller FAQ", href: "/sell/faq" },
    ],
  },
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-brown-700 text-white overflow-hidden">
      {/* Decorative leaf */}
      <BotanicalLeaf
        variant="corner"
        className="absolute top-0 right-0 w-48 h-48 text-white/5 rotate-180"
      />

      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold">
                Stay inspired
              </h3>
              <p className="text-white/60 text-sm mt-1">
                Get handpicked stories, new arrivals, and exclusive offers
                delivered to your inbox.
              </p>
            </div>
            <form
              onSubmit={handleSubscribe}
              className="flex w-full md:w-auto"
            >
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-11 pl-10 pr-4 rounded-l-lg bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-terracotta-400/50 focus:border-terracotta-400"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-5 rounded-r-lg bg-terracotta-500 text-white text-sm font-medium hover:bg-terracotta-600 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
                {!subscribed && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-medium text-sm mb-4 text-white/90">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-terracotta-500 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 3C7 8 4 12 4 16C4 19.5 7.5 21 12 21C16.5 21 20 19.5 20 16C20 12 17 8 12 3Z" />
                </svg>
              </div>
              <span className="font-heading text-sm font-bold">
                ArtisanConnect
              </span>
            </div>
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} ArtisanConnect. Made with ♥ for
              artisans everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
