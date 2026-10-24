"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrdersRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account/orders");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBEFE8] text-xs text-[#4A2418]">
      Redirecting to your orders...
    </div>
  );
}
