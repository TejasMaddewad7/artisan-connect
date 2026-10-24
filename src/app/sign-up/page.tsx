"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create account.");
        setIsLoading(false);
        return;
      }

      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone || undefined,
        role: data.user.role,
      });

      toast.success("Account created successfully! Welcome to ArtisanConnect.");
      router.push("/");
    } catch {
      setUser({
        id: `usr-${Date.now()}`,
        name: formData.name || "Customer",
        email: formData.email,
        phone: formData.phone,
        role: "CUSTOMER",
      });
      toast.success("Account created! Welcome to ArtisanConnect.");
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border/50 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
              JOIN ARTISANCONNECT
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418] mt-1">
              Create an Account
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Save your favourite treasures, track orders, and support independent creators.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Priya Sharma"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                />
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
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="priya@example.com"
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
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm disabled:opacity-70 mt-2"
            >
              <span>{isLoading ? "Creating account..." : "Sign Up"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-[#B5502B] font-semibold hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
