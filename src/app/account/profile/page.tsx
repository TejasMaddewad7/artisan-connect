"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Save,
  Package,
  Heart,
  Store,
  LayoutDashboard,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useAuthStore, type UserRole } from "@/stores/auth.store";
import { useOrderStore } from "@/stores/order.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, updateProfile, loginAs } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);
  const wishlistCount = useWishlistStore((s) => s.getTotalItems());

  const [name, setName] = useState(user?.name || "Priya Sharma");
  const [email, setEmail] = useState(user?.email || "customer@demo.com");
  const [phone, setPhone] = useState(user?.phone || "+91 98765 43210");
  const [addressLine1, setAddressLine1] = useState(
    user?.address?.addressLine1 || "Flat 402, Lotus Greens, Sector 15"
  );
  const [city, setCity] = useState(user?.address?.city || "Jaipur");
  const [state, setState] = useState(user?.address?.state || "Rajasthan");
  const [pincode, setPincode] = useState(user?.address?.pincode || "302001");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      email,
      phone,
      address: {
        fullName: name,
        phone,
        email,
        addressLine1,
        city,
        state,
        pincode,
      },
    });
    toast.success("Profile details updated successfully!");
  };

  const handleSwitchRole = (role: "customer" | "artisan" | "admin") => {
    loginAs(role);
    toast.success(`Switched role to ${role.toUpperCase()}`);
    // re-sync local form state with switched user
    const newUser = useAuthStore.getState().user;
    if (newUser) {
      setName(newUser.name);
      setEmail(newUser.email);
      setPhone(newUser.phone || "");
      if (newUser.address) {
        setAddressLine1(newUser.address.addressLine1);
        setCity(newUser.address.city);
        setState(newUser.address.state);
        setPincode(newUser.address.pincode);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "My Account" },
            { label: "Profile & Preferences" },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
              ACCOUNT MANAGEMENT
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#4A2418] mt-1">
              Personal Profile & Preferences
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage your personal credentials, delivery addresses, and platform roles.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Profile Card & Role Switcher (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm text-center">
              <div className="relative w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-cream-100 bg-cream-200 shadow-sm">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-heading text-3xl text-brown-700">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <h2 className="font-heading text-xl font-bold text-[#4A2418]">
                {user?.name || "Priya Sharma"}
              </h2>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>

              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cream-100 text-[#B5502B] border border-border/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Role: {user?.role || "CUSTOMER"}</span>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-border/40 text-center">
                <Link
                  href="/account/orders"
                  className="p-2.5 rounded-xl bg-cream-50 hover:bg-cream-100 transition-colors"
                >
                  <Package className="w-4 h-4 text-[#B5502B] mx-auto mb-1" />
                  <span className="text-xs font-bold block">{orders.length}</span>
                  <span className="text-[10px] text-muted-foreground">Orders</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="p-2.5 rounded-xl bg-cream-50 hover:bg-cream-100 transition-colors"
                >
                  <Heart className="w-4 h-4 text-[#B5502B] mx-auto mb-1" />
                  <span className="text-xs font-bold block">{wishlistCount}</span>
                  <span className="text-[10px] text-muted-foreground">Wishlist</span>
                </Link>
              </div>
            </div>

            {/* Test Role Switcher Card */}
            <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-3">
              <h3 className="font-heading text-sm font-bold text-[#4A2418]">
                ⚡ Quick Role Switcher
              </h3>
              <p className="text-[11px] text-muted-foreground">
                Instantly preview ArtisanConnect from different personas:
              </p>
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleSwitchRole("customer")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    user?.role === "CUSTOMER"
                      ? "border-[#B5502B] bg-[#fae2d7] text-[#B5502B]"
                      : "border-border hover:bg-cream-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5" />
                    Buyer (Priya)
                  </span>
                  {user?.role === "CUSTOMER" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchRole("artisan")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    user?.role === "ARTISAN"
                      ? "border-[#B5502B] bg-[#fae2d7] text-[#B5502B]"
                      : "border-border hover:bg-cream-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Store className="w-3.5 h-3.5" />
                    Artisan (Meera)
                  </span>
                  {user?.role === "ARTISAN" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSwitchRole("admin")}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    user?.role === "ADMIN"
                      ? "border-purple-600 bg-purple-50 text-purple-700"
                      : "border-border hover:bg-cream-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Admin (Operations)
                  </span>
                  {user?.role === "ADMIN" && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Edit Profile & Address Form (8 cols) */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm">
            <h2 className="font-heading text-xl font-bold text-[#4A2418] pb-3 border-b border-border/40 mb-6">
              Contact & Delivery Information
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border/40">
                <h3 className="font-heading text-base font-bold text-[#4A2418] mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#B5502B]" />
                  Default Delivery Address
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Street Address / House / Flat
                    </label>
                    <input
                      type="text"
                      required
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
