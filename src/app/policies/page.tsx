"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PoliciesIndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/policies/shipping");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBEFE8] text-xs text-[#4A2418]">
      Loading ArtisanConnect Policies...
    </div>
  );
}
