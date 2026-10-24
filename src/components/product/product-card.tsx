"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { RatingStars } from "@/components/shared/rating-stars";
import { ProductBadge } from "@/components/shared/product-badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  variant?: "grid" | "list";
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  variant = "grid",
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  className,
}: ProductCardProps) {
  const primaryImage = product.images?.[0];
  const tag = product.isHandmade
    ? "Handmade"
    : product.isEco
    ? "Eco-friendly"
    : product.isMadeToOrder
    ? "Made to Order"
    : null;

  if (variant === "list") {
    return (
      <div
        className={cn(
          "group bg-white rounded-xl overflow-hidden shadow-sm border border-border/50",
          "hover:shadow-md transition-all duration-300 flex",
          className
        )}
      >
        {/* Image */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-48 flex-shrink-0 overflow-hidden"
        >
          <div className="w-full h-full bg-cream-100">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="192px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ShoppingBag className="w-8 h-8" />
              </div>
            )}
          </div>
          {product.badge && (
            <div className="absolute top-2 left-2">
              <ProductBadge variant={product.badge} />
            </div>
          )}
        </Link>

        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="font-medium text-foreground group-hover:text-terracotta-500 transition-colors line-clamp-1">
                {product.name}
              </h3>
            </Link>
            <Link
              href={`/artisans/${product.artisan?.slug}`}
              className="text-xs text-muted-foreground hover:text-terracotta-500 transition-colors mt-0.5 inline-block"
            >
              By {product.artisan?.shopName}
            </Link>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              <RatingStars
                rating={product.ratingAvg}
                reviewCount={product.reviewCount}
                showValue
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleWishlist?.(product.id)}
                className="p-2 rounded-lg hover:bg-cream-100 transition-colors"
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isWishlisted
                      ? "fill-terracotta-500 text-terracotta-500"
                      : "text-muted-foreground"
                  )}
                />
              </button>
              <button
                onClick={() => onAddToCart?.(product.id)}
                className="p-2 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
                aria-label="Add to cart"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div
      className={cn(
        "group bg-white rounded-xl overflow-hidden shadow-sm border border-border/50",
        "hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Image */}
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden aspect-square bg-cream-100"
      >
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-10 h-10" />
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <ProductBadge variant={product.badge} />
          </div>
        )}

        {/* Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist?.(product.id);
          }}
          className={cn(
            "absolute top-2.5 right-2.5 p-1.5 rounded-full transition-all duration-200",
            "bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm",
            isWishlisted && "animate-pulse-heart"
          )}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isWishlisted
                ? "fill-terracotta-500 text-terracotta-500"
                : "text-brown-500 hover:text-terracotta-500"
            )}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="p-3.5">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-medium text-sm text-foreground group-hover:text-terracotta-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-1">
          <Link
            href={`/artisans/${product.artisan?.slug}`}
            className="text-xs text-muted-foreground hover:text-terracotta-500 transition-colors"
          >
            By {product.artisan?.shopName}
          </Link>
          <RatingStars
            rating={product.ratingAvg}
            reviewCount={product.reviewCount}
            showValue
          />
        </div>

        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2">
            <span className="font-heading text-lg font-bold text-foreground">
              {formatPrice(product.price)}
            </span>
            {tag && <ProductBadge variant={tag} size="sm" />}
          </div>
          <button
            onClick={() => onAddToCart?.(product.id)}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              "bg-terracotta-500 text-white hover:bg-terracotta-600",
              "active:scale-95 shadow-sm hover:shadow-md"
            )}
            aria-label="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
