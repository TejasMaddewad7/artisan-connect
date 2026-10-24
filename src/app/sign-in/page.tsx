"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, User } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loginAs = useAuthStore((s) => s.loginAs);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let roleToLog: "customer" | "artisan" | "admin" = "customer";
    if (email.includes("admin")) roleToLog = "admin";
    else if (email.includes("artisan") || email.includes("meera")) roleToLog = "artisan";

    setTimeout(() => {
      loginAs(roleToLog);
      setIsLoading(false);
      toast.success(`Welcome back, ${roleToLog === "admin" ? "Admin" : roleToLog === "artisan" ? "Meera (Artisan)" : "Priya"}!`);
      if (roleToLog === "admin") {
        router.push("/admin");
      } else if (roleToLog === "artisan") {
        router.push("/sell/dashboard");
      } else {
        router.push("/");
      }
    }, 500);
  };

  const fillDemo = (role: "admin" | "artisan" | "customer") => {
    if (role === "admin") {
      setEmail("admin@artisanconnect.in");
      setPassword("Admin@123");
      loginAs("admin");
      toast.info("Logged in as Super Admin demo");
    } else if (role === "artisan") {
      setEmail("meera@artisanconnect.in");
      setPassword("Artisan@123");
      loginAs("artisan");
      toast.info("Logged in as Artisan demo (Meera Sharma)");
    } else {
      setEmail("customer@demo.com");
      setPassword("Customer@123");
      loginAs("customer");
      toast.info("Logged in as Customer demo (Priya Sharma)");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border/50 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
              ARTISANCONNECT ACCOUNT
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418] mt-1">
              Welcome Back
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Sign in to manage your orders, wishlist, or artisan studio.
            </p>
          </div>

          {/* Quick Demo Login Buttons */}
          <div className="p-3 bg-cream-50 rounded-xl border border-border/40 mb-6">
            <p className="text-[11px] font-semibold text-center text-brown-800 mb-2">
              ⚡ 1-Click Demo Logins:
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => fillDemo("customer")}
                className="py-1.5 px-2 rounded-lg bg-white border border-border text-[11px] font-semibold hover:bg-cream-100 transition-colors"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => fillDemo("artisan")}
                className="py-1.5 px-2 rounded-lg bg-white border border-border text-[11px] font-semibold hover:bg-cream-100 transition-colors"
              >
                Artisan
              </button>
              <button
                type="button"
                onClick={() => fillDemo("admin")}
                className="py-1.5 px-2 rounded-lg bg-white border border-border text-[11px] font-semibold hover:bg-cream-100 transition-colors"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="you@domain.com"
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-foreground">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[#B5502B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
              <span>{isLoading ? "Signing in..." : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-[#B5502B] font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
