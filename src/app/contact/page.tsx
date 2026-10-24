"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Order Tracking & Inquiry",
    message: "",
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setIsSent(true);
    toast.success("Thank you! Your message has been routed to our studio liaison team.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumbs items={[{ label: "Contact Us" }]} className="mb-6" />

        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
            WE ARE HERE FOR YOU
          </span>
          <h1 className="font-heading text-4xl font-bold text-[#4A2418] mt-2">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Have questions about an order, custom artisan commissions, or seller onboarding?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Studios (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-4">
              <h3 className="font-heading text-lg font-bold text-[#4A2418]">
                Direct Support Channels
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-[#B5502B] flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Email Support</span>
                    <a href="mailto:support@artisanconnect.in" className="text-muted-foreground hover:text-[#B5502B]">
                      support@artisanconnect.in
                    </a>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Average response: under 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-green-700 flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Phone & WhatsApp Hotline</span>
                    <a href="tel:+919876543210" className="text-muted-foreground hover:text-[#B5502B]">
                      +91 (0141) 489-2019 / +91 98765 43210
                    </a>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Mon - Sat: 9:30 AM – 7:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center text-brown-700 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-foreground block">Curation Hub & Headquarters</span>
                    <p className="text-muted-foreground leading-relaxed">
                      ArtisanConnect India Craft Hub, <br />
                      Sanganer Cluster Road, Jaipur, Rajasthan 302029
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fair trade promise */}
            <div className="bg-[#fcf5ef] p-6 rounded-2xl border border-border/40 text-xs space-y-2">
              <div className="flex items-center gap-2 text-green-800 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Direct Craft Verification</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-[11px]">
                Every question is resolved in direct liaison with our on-ground craft cluster managers across Rajasthan, Chhattisgarh, and Andhra Pradesh.
              </p>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm">
            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#4A2418]">
                  Message Received!
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Our support team will get back to you at <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFormData({ name: "", email: "", subject: "Order Tracking & Inquiry", message: "" });
                  }}
                  className="px-5 py-2 rounded-xl bg-cream-100 text-xs font-semibold text-[#4A2418] hover:bg-cream-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-heading text-xl font-bold text-[#4A2418] pb-2 border-b border-border/40">
                  Send Us A Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full h-10 px-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
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
                      placeholder="e.g. priya@example.com"
                      className="w-full h-10 px-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border text-xs bg-white focus:ring-1 focus:ring-[#B5502B]"
                  >
                    <option value="Order Tracking & Inquiry">Order Tracking & Delivery Status</option>
                    <option value="Bespoke Commission">Custom Artisan Commission or Bulk Gifting</option>
                    <option value="Artisan Studio Onboarding">Artisan Studio Registration & KYC</option>
                    <option value="Packaging & Returns">Returns, Breakage & Packaging Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details such as order number, artisan name, or bespoke requirements..."
                    className="w-full p-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
