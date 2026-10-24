"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  maxRating = 5,
  size = "sm",
  showValue = false,
  reviewCount,
  className,
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const adjustedFullStars = rating - fullStars >= 0.75 ? fullStars + 1 : fullStars;
  const emptyStars = maxRating - adjustedFullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: adjustedFullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className={cn(sizeClasses[size], "text-amber-500 fill-amber-500")}
          />
        ))}
        {hasHalfStar && (
          <div className="relative">
            <Star className={cn(sizeClasses[size], "text-amber-500/30")} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star
                className={cn(sizeClasses[size], "text-amber-500 fill-amber-500")}
              />
            </div>
          </div>
        )}
        {Array.from({ length: Math.max(0, emptyStars) }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            className={cn(sizeClasses[size], "text-amber-500/30")}
          />
        ))}
      </div>
      {showValue && (
        <span className={cn(textSizeClasses[size], "text-muted-foreground font-medium")}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className={cn(textSizeClasses[size], "text-muted-foreground")}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
