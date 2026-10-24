"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, Upload, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Stepper } from "@/components/shared/stepper";
import { useArtisanCatalogStore } from "@/stores/artisan-catalog.store";
import { toast } from "sonner";

interface FormData {
  // Step 1
  fullName: string;
  email: string;
  phone: string;
  shopName: string;
  bio: string;
  // Step 2
  city: string;
  state: string;
  craftCategories: string[];
  pickupAddress: string;
  instagram: string;
  // Step 3
  panNumber: string;
  gstin: string;
  bankAccount: string;
  ifscCode: string;
  upiId: string;
  agreedToTerms: boolean;
}

export default function SellerRegistrationPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    shopName: "",
    bio: "",
    city: "",
    state: "",
    craftCategories: [],
    pickupAddress: "",
    instagram: "",
    panNumber: "",
    gstin: "",
    bankAccount: "",
    ifscCode: "",
    upiId: "",
    agreedToTerms: false,
  });

  const steps = [
    { label: "Basic Info", description: "Your details & story" },
    { label: "Shop Details", description: "Studio & crafts" },
    { label: "Verification", description: "KYC & Payouts" },
  ];

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.fullName || !formData.email || !formData.shopName || !formData.bio) {
        toast.error("Please fill in all required fields marked with *");
        return;
      }
    } else if (currentStep === 1) {
      if (!formData.city || !formData.state || formData.craftCategories.length === 0) {
        toast.error("Please provide city, state, and at least one craft category");
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const submitApplication = useArtisanCatalogStore((s) => s.submitApplication);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.panNumber || !formData.bankAccount || !formData.agreedToTerms) {
      toast.error("Please provide PAN, Bank Account details and accept terms.");
      return;
    }

    submitApplication({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      shopName: formData.shopName,
      bio: formData.bio,
      city: formData.city,
      state: formData.state,
      craftCategories: formData.craftCategories,
      panNumber: formData.panNumber,
      bankAccount: formData.bankAccount,
      ifscCode: formData.ifscCode,
    });

    setIsSubmitted(true);
    toast.success("Artisan application submitted successfully!");
  };

  const toggleCategory = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.craftCategories.includes(cat);
      return {
        ...prev,
        craftCategories: exists
          ? prev.craftCategories.filter((c) => c !== cat)
          : [...prev.craftCategories, cat],
      };
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[{ label: "Become an Artisan" }]} className="mb-6" />

        {/* Heading */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
            JOIN OUR GUILD
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418] mt-2">
            Become an Artisan
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Join ArtisanConnect and share your handmade creations with the world. Keep 90% of your earnings with direct Razorpay bank payouts.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-14 text-center border border-border/50 shadow-sm max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2418]">
              Application Submitted for Verification!
            </h2>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold my-4">
              Status: Pending Admin Approval
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
              Welcome to ArtisanConnect, <strong>{formData.shopName}</strong>! Our curation team reviews all handmade studios within 24-48 hours. We&apos;ll notify you at <strong>{formData.email}</strong> once your storefront is live.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/"
                className="px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-border/50 shadow-sm">
            {/* Stepper Header */}
            <div className="max-w-xl mx-auto mb-10">
              <Stepper steps={steps} currentStep={currentStep} />
            </div>

            {/* Form Steps */}
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
              {/* STEP 1: Basic Information */}
              {currentStep === 0 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-heading text-xl font-bold text-[#4A2418] pb-2 border-b border-border/30">
                    Step 1: Basic Artisan Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Meera Sharma"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="meera@artisan.in"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Shop / Studio Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.shopName}
                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                        placeholder="e.g. Mitti Creations"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                      {formData.shopName && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          Store URL: artisanconnect.in/artisans/{formData.shopName.toLowerCase().replace(/\s+/g, "-")}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Tell us about your work & craft heritage *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Describe your techniques, materials used, whether items are made on wheels or pit-looms, and how you learned your craft..."
                      className="w-full p-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: Shop Details */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-heading text-xl font-bold text-[#4A2418] pb-2 border-b border-border/30">
                    Step 2: Studio Location & Craft Categories
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Jaipur or Khurja"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="e.g. Rajasthan"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-2">
                      Primary Craft Categories (Select all that apply) *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Pottery & Ceramics",
                        "Terracotta",
                        "Handmade Jewelry",
                        "Brass & Metalcraft",
                        "Handloom Textiles",
                        "Block Printing",
                        "Woodcarving",
                        "Folk Painting & Art",
                      ].map((cat) => {
                        const selected = formData.craftCategories.includes(cat);
                        return (
                          <button
                            type="button"
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              selected
                                ? "bg-[#B5502B] text-white border-[#B5502B]"
                                : "bg-cream-100 text-brown-800 border-border hover:bg-cream-200"
                            }`}
                          >
                            {cat} {selected && "✓"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Workshop Pickup Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pickupAddress}
                      onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                      placeholder="Studio / Workshop address for courier pickup"
                      className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Instagram / Portfolio handle (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      placeholder="@meerastudiopottery"
                      className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: Verification & Payouts */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="font-heading text-xl font-bold text-[#4A2418] pb-2 border-b border-border/30">
                    Step 3: Verification & Payout Accounts
                  </h3>

                  <div className="p-3.5 rounded-xl bg-cream-50 border border-border/40 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-terracotta-600 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      All payouts are processed automatically via <strong>Razorpay Route</strong> directly into your verified bank account minus the 10% platform commission upon customer order fulfillment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        PAN Card Number *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={10}
                        value={formData.panNumber}
                        onChange={(e) => setFormData({ ...formData, panNumber: e.target.value.toUpperCase() })}
                        placeholder="ABCDE1234F"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs uppercase focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        GSTIN (Optional if under exemption limit)
                      </label>
                      <input
                        type="text"
                        value={formData.gstin}
                        onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                        placeholder="08AAAAA0000A1Z5"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs uppercase focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Bank Account Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.bankAccount}
                        onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        placeholder="Account number"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        IFSC Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ifscCode}
                        onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                        placeholder="SBIN0001234"
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs uppercase focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 pt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreedToTerms}
                      onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
                      className="mt-0.5 rounded border-border text-[#B5502B] focus:ring-[#B5502B]"
                    />
                    <span className="text-xs text-muted-foreground leading-relaxed">
                      I certify that all products listed on ArtisanConnect are 100% authentically handmade or artisan-crafted by my studio, and I agree to the Artisan Fair Trade Charter and 10% platform commission policy.
                    </span>
                  </label>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-border/40">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border text-xs font-semibold text-foreground hover:bg-cream-100 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 2 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-md"
                  >
                    <span>Submit Application</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
