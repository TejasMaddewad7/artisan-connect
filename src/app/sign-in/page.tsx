"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuthStore } from "@/stores/auth.store";
import { GoogleLoginSection } from "@/components/auth/google-login-modal";
import { toast } from "sonner";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useAuthStore((s) => s.setUser);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to sign in. Please verify your credentials.");
        setIsLoading(false);
        return;
      }

      setUser(data.user);
      toast.success(`Welcome back, ${data.user.name}!`);

      if (data.user.role === "ADMIN") {
        router.push("/admin");
      } else if (data.user.role === "ARTISAN") {
        router.push("/sell/dashboard");
      } else {
        router.push("/");
      }
    } catch {
      toast.error("Unable to connect to the database. Please try again.");
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
              ARTISANCONNECT ACCOUNT
            </span>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418] mt-1">
              Welcome Back
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Sign in to manage your orders, wishlist, or artisan studio.
            </p>
          </div>

          {/* Google Sign In Window with Customer / Artisan / Admin selection */}
          <div className="mb-6">
            <GoogleLoginSection />
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Or sign in with email
            </span>
          </div>

          {/* Email / Password Form */}
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
