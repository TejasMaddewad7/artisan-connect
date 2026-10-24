"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type BadgeVariant =
  | "Bestseller"
  | "New"
  | "Popular"
  | "Handmade"
  | "Eco-friendly"
  | "Made to Order"
  | "Sustainable"
  | "Supports Local";

interface ProductBadgeProps {
  variant: BadgeVariant;
  className?: string;
  size?: "sm" | "md";
}

const badgeConfig: Record<
  BadgeVariant,
  { bg: string; text: string; border: string }
> = {
  Bestseller: {
    bg: "bg-terracotta-500",
    text: "text-white",
    border: "border-terracotta-500",
  },
  New: {
    bg: "bg-amber-500",
    text: "text-white",
    border: "border-amber-500",
  },
  Popular: {
    bg: "bg-terracotta-400",
    text: "text-white",
    border: "border-terracotta-400",
  },
  Handmade: {
    bg: "bg-cream-200",
    text: "text-brown-700",
    border: "border-brown-200",
  },
  "Eco-friendly": {
    bg: "bg-sage-100",
    text: "text-sage-600",
    border: "border-sage-200",
  },
  "Made to Order": {
    bg: "bg-cream-200",
    text: "text-brown-600",
    border: "border-brown-200",
  },
  Sustainable: {
    bg: "bg-sage-100",
    text: "text-sage-600",
    border: "border-sage-200",
  },
  "Supports Local": {
    bg: "bg-terracotta-100",
    text: "text-terracotta-700",
    border: "border-terracotta-200",
  },
};

export function ProductBadge({
  variant,
  className,
  size = "sm",
}: ProductBadgeProps) {
  const config = badgeConfig[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-medium border",
        config.bg,
        config.text,
        config.border,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      {variant}
    </span>
  );
}
