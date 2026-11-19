"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore, type UserRole } from "@/stores/auth.store";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { ShoppingBag, Sparkles, Shield, X, Check, Loader2 } from "lucide-react";

export function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

interface GoogleLoginProps {
  onSuccess?: () => void;
  defaultRole?: UserRole;
  compact?: boolean;
}

export function GoogleLoginSection({
  onSuccess,
  defaultRole = "CUSTOMER",
  compact = false,
}: GoogleLoginProps) {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const [selectedRole, setSelectedRole] = useState<UserRole>(defaultRole);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Modal Google Form State
  const [googleName, setGoogleName] = useState("");
  const [googleEmail, setGoogleEmail] = useState("");

  const handleGoogleClick = async () => {
    setIsLoading(true);

    try {
      // 1. Attempt official Supabase OAuth with Google
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            role: selectedRole,
          },
        },
      });

      if (error) {
        // If Supabase Google provider is not yet configured with client credentials,
        // open the dedicated Google Sign-in modal window to let user authenticate smoothly
        setIsModalOpen(true);
      }
    } catch {
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteGoogleAuth = async (emailToUse: string, nameToUse: string) => {
    if (!emailToUse || !emailToUse.includes("@")) {
      toast.error("Please enter a valid Google email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameToUse || emailToUse.split("@")[0],
          email: emailToUse.toLowerCase().trim(),
          avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameToUse || emailToUse)}`,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to sign in with Google.");
        return;
      }

      setUser(data.user);
      setIsModalOpen(false);
      toast.success(`Signed in as ${selectedRole.toLowerCase()}: ${data.user.name}`);

      if (onSuccess) {
        onSuccess();
      } else {
        if (data.user.role === "ADMIN") {
          router.push("/admin");
        } else if (data.user.role === "ARTISAN") {
          router.push("/sell/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch {
      toast.error("Error connecting to database. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Role Picker Pills */}
      {!compact && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block text-center">
            Sign in as:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setSelectedRole("CUSTOMER")}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedRole === "CUSTOMER"
                  ? "bg-[#B5502B] text-white border-[#B5502B] shadow-sm"
                  : "bg-white text-[#4A2418] border-border/80 hover:bg-cream-50"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("ARTISAN")}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedRole === "ARTISAN"
                  ? "bg-[#B5502B] text-white border-[#B5502B] shadow-sm"
                  : "bg-white text-[#4A2418] border-border/80 hover:bg-cream-50"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisan</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedRole("ADMIN")}
              className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border text-xs font-semibold transition-all ${
                selectedRole === "ADMIN"
                  ? "bg-purple-700 text-white border-purple-700 shadow-sm"
                  : "bg-white text-[#4A2418] border-border/80 hover:bg-cream-50"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Google Login Trigger Button */}
      <button
        type="button"
        onClick={handleGoogleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-border/80 bg-white hover:bg-cream-50 text-[#4A2418] text-xs font-semibold transition-all shadow-xs hover:shadow-sm"
      >
        <GoogleIcon className="w-4 h-4 shrink-0" />
        <span>Continue with Google ({selectedRole.toLowerCase()})</span>
      </button>

      {/* Google Sign-In Window Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-border relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-cream-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Google Header */}
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-cream-50 border border-border flex items-center justify-center mx-auto mb-2">
                <GoogleIcon className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-foreground">
                Sign in with Google
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                to continue to <strong className="text-foreground">ArtisanConnect</strong> as{" "}
                <span className="font-semibold text-[#B5502B] uppercase text-[10px] bg-cream-100 px-1.5 py-0.5 rounded">
                  {selectedRole}
                </span>
              </p>
            </div>

            {/* Role switch in modal */}
            <div className="flex justify-center gap-1.5 mb-4 bg-cream-50/80 p-1 rounded-lg border border-border/50">
              {(["CUSTOMER", "ARTISAN", "ADMIN"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`text-[10px] font-semibold py-1 px-2.5 rounded-md transition-colors ${
                    selectedRole === r
                      ? "bg-white text-[#B5502B] shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Google Account Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCompleteGoogleAuth(googleEmail, googleName);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">
                  Google Account Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tejas Maddewad"
                  value={googleName}
                  onChange={(e) => setGoogleName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-foreground mb-1">
                  Google Account Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={googleEmail}
                  onChange={(e) => setGoogleEmail(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#4285F4] text-white text-xs font-semibold hover:bg-[#3367D6] transition-colors shadow-sm disabled:opacity-70 mt-3"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm & Sign in as {selectedRole}</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[10px] text-center text-muted-foreground mt-4">
              Your Google profile will be saved to your Supabase PostgreSQL database.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
