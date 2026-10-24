import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Leaf,
  Users,
  Award,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BotanicalLeaf } from "@/components/shared/botanical-leaf";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Our Story & Purpose" }]} className="mb-6" />

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-[#F6DFD3]/90 border border-[#E9CBBB] p-8 sm:p-14 overflow-hidden shadow-sm mb-12">
          <BotanicalLeaf
            variant="corner"
            className="absolute top-0 right-0 w-72 h-72 text-[#7A8B69]/25 pointer-events-none"
          />

          <div className="relative z-10 max-w-2xl">
            <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
              HANDMADE · PEOPLE · PURPOSE
            </span>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#4A2418] mt-2 leading-tight">
              Honoring Generational Hands, <br />
              Preserving Living Heritage.
            </h1>
            <p className="text-sm sm:text-base text-[#7A5A3F] mt-4 leading-relaxed">
              ArtisanConnect was born out of a profound reverence for India&apos;s master weavers, potters, bell-metal casters, and block-printers whose timeless crafts were being lost to exploitative middlemen and mass-manufactured replicas.
            </p>
          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center text-[#B5502B]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#4A2418]">
              90% Direct Payouts
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We charge only a nominal 10% platform commission on successful deliveries. 90% of every rupee reaches the artisan&apos;s bank account via Razorpay Route split settlements.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center text-[#7A8B69]">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#4A2418]">
              Pure & Sustainable
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every item is created with natural, organic raw materials—unrefined terracotta clay, vegetable dyes, certified handloom silk, and recyclable honeycomb packaging.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cream-100 flex items-center justify-center text-brown-700">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold text-[#4A2418]">
              Verified Provenance
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No generic factory dropshipping. Every studio on ArtisanConnect undergoes strict KYC and craft verification, guaranteeing authentic Indian Geographical Indication (GI) heritage.
            </p>
          </div>
        </div>

        {/* Story & Image Row */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-border/50 shadow-sm mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
              THE ARTISAN REVOLUTION
            </span>
            <h2 className="font-heading text-3xl font-bold text-[#4A2418]">
              Where Every Creation Carries A Living Pulse
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              When you drink from a terracotta kulhad shaped on a manual wheel in Sanganer, or wrap yourself in a Chanderi saree hand-woven over 45 days, you are connecting with generations of love, patience, and ancestral knowledge.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              We empower generational craft clusters across Rajasthan, Chhattisgarh, Andhra Pradesh, West Bengal, and Varanasi to thrive in the digital age without compromising their dignity or artisanal traditions.
            </p>
            <div className="pt-2">
              <Link
                href="/artisans"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
              >
                <span>Explore Artisan Studios</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-border/40 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
              alt="Artisan at work"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Studio Clusters Map Banner */}
        <div className="bg-[#fcf5ef] rounded-3xl p-8 border border-border/50 text-center max-w-3xl mx-auto">
          <MapPin className="w-8 h-8 text-[#B5502B] mx-auto mb-3" />
          <h3 className="font-heading text-2xl font-bold text-[#4A2418]">
            Partnering With 350+ Generational Craft Clusters
          </h3>
          <p className="text-xs text-muted-foreground mt-2 max-w-lg mx-auto">
            From Blue Pottery in Jaipur to Dhokra metal bells in Bastar, Kalamkari textiles in Machilipatnam, and Varanasi silk looms.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
