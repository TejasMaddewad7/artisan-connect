"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    toast.success("Password reset instructions dispatched to your email.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-md w-full mx-auto px-4 py-16 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border/50 shadow-sm">
          {isSubmitted ? (
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="font-heading text-2xl font-bold text-[#4A2418]">
                Check Your Inbox
              </h1>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We have dispatched a secure password reset link to <strong>{email}</strong>.
              </p>
              <div className="pt-4">
                <Link
                  href="/sign-in"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B5502B] hover:underline"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
                  SECURITY & ACCESS
                </span>
                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418] mt-1">
                  Reset Password
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your registered email address and we&apos;ll send you a recovery link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                      placeholder="e.g. priya@example.com"
                      className="w-full h-10 pl-9 pr-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reset Link</span>
                </button>

                <div className="text-center pt-2">
                  <Link
                    href="/sign-in"
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#B5502B]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </Link>
                </div>
              </form>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
