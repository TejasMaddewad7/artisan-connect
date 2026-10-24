import Image from "next/image";
import Link from "next/link";
import { Leaf, Recycle, Heart, Droplets, Sun, Sparkles, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BotanicalLeaf } from "@/components/shared/botanical-leaf";

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Sustainability & Eco-Crafts" }]} className="mb-6" />

        <div className="relative rounded-3xl bg-[#edf3e8] border border-[#d2e2c8] p-8 sm:p-14 overflow-hidden shadow-sm mb-12">
          <BotanicalLeaf
            variant="corner"
            className="absolute top-0 right-0 w-64 h-64 text-[#7A8B69]/30 pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-semibold tracking-widest text-[#7A8B69] uppercase flex items-center gap-1.5">
              <Leaf className="w-4 h-4" /> EARTH-FIRST CRAFTSMANSHIP
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2418] mt-2">
              Rooted in Nature, <br />Crafted for Generations.
            </h1>
            <p className="text-xs sm:text-sm text-[#7A5A3F] mt-3 leading-relaxed">
              Traditional Indian crafts have been naturally circular and zero-waste for centuries. At ArtisanConnect, we champion slow living, biodegradable raw materials, and non-toxic botanical colors.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#4A2418]">
              Natural Vegetable Dyes
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our weavers and block-printers use madder root (manjistha), indigo leaves, pomegranate peel (nasphal), and turmeric instead of toxic petrochemical azo-dyes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#4A2418]">
              Solar & Wheel Powered
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Manual potter wheels, hand-thrown wooden looms, and lost-wax crucible casting emit a microscopic fraction of the carbon footprint of automated mass factories.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cream-100 text-[#B5502B] flex items-center justify-center">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#4A2418]">
              Zero-Plastic Delivery
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We replace bubble wrap with recyclable paper honeycomb cushions, unbleached cartons, and organic cotton dust-bags that return safely to the earth.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-[#4A2418]">
            Support Earth-Friendly Living
          </h2>
          <p className="text-xs text-muted-foreground mt-2 mb-6">
            Choose mindfully handmade products that enrich your home without degrading the planet.
          </p>
          <Link
            href="/category/all"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
          >
            <span>Browse Eco-Craft Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
