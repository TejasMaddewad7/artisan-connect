"use client";

import { use, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/product/product-card";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FilterSidebar } from "@/components/shared/filter-sidebar";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { CATEGORIES, PRODUCTS } from "@/lib/data/mock-catalog";
import type { ProductFilters, SortOption } from "@/types";
import { toast } from "sonner";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const { addItem, getTotalItems: getCartTotal } = useCartStore();
  const { toggleItem, isInWishlist, getTotalItems: getWishlistTotal } = useWishlistStore();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState<SortOption>("featured");
  const [activeFilters, setActiveFilters] = useState<ProductFilters>({
    subcategories: [],
    priceRanges: [],
    materials: [],
    tags: [],
  });

  const category = CATEGORIES.find((c) => c.slug === resolvedParams.slug) || {
    id: "all",
    name: resolvedParams.slug === "all" ? "All Crafts" : resolvedParams.slug.replace("-", " ").toUpperCase(),
    slug: resolvedParams.slug,
    subtitle: "Authentic, handcrafted treasures straight from traditional studios.",
    description: "Browse curated collections of handmade creations.",
  };

  const filterSections = [
    {
      id: "subcategories",
      title: "Subcategories",
      type: "checkbox" as const,
      options: [
        { value: "Necklaces", label: "Necklaces", count: 8 },
        { value: "Earrings", label: "Earrings", count: 12 },
        { value: "Bracelets", label: "Bracelets", count: 6 },
        { value: "Rings", label: "Rings", count: 4 },
        { value: "Brooches", label: "Brooches", count: 2 },
      ],
    },
    {
      id: "priceRanges",
      title: "Price Range",
      type: "checkbox" as const,
      options: [
        { value: "0-500", label: "₹0 - ₹500", count: 10 },
        { value: "500-1000", label: "₹500 - ₹1,000", count: 18 },
        { value: "1000-2000", label: "₹1,000 - ₹2,000", count: 9 },
        { value: "above-2000", label: "Above ₹2,000", count: 3 },
      ],
    },
    {
      id: "materials",
      title: "Material",
      type: "checkbox" as const,
      options: [
        { value: "Metal", label: "Brass & Metal", count: 14 },
        { value: "Beads", label: "Beads & Stones", count: 8 },
        { value: "Terracotta", label: "Clay & Terracotta", count: 11 },
        { value: "Cotton", label: "Handloom Cotton", count: 15 },
      ],
    },
    {
      id: "tags",
      title: "Craft Tags",
      type: "checkbox" as const,
      options: [
        { value: "Handmade", label: "100% Handmade", count: 35 },
        { value: "Eco-friendly", label: "Eco-friendly", count: 20 },
        { value: "Made to Order", label: "Made to Order", count: 8 },
      ],
    },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter((p) => {
      if (resolvedParams.slug !== "all" && p.category.slug !== resolvedParams.slug) {
        return false;
      }
      return true;
    });

    if (activeFilters.priceRanges && activeFilters.priceRanges.length > 0) {
      result = result.filter((p) => {
        const inRupees = p.price / 100;
        return activeFilters.priceRanges?.some((range) => {
          if (range === "0-500") return inRupees <= 500;
          if (range === "500-1000") return inRupees > 500 && inRupees <= 1000;
          if (range === "1000-2000") return inRupees > 1000 && inRupees <= 2000;
          if (range === "above-2000") return inRupees > 2000;
          return true;
        });
      });
    }

    if (activeSort === "price-low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (activeSort === "price-high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (activeSort === "top-rated") {
      result = [...result].sort((a, b) => b.ratingAvg - a.ratingAvg);
    }

    return result;
  }, [resolvedParams.slug, activeFilters, activeSort]);

  const handleAddToCart = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      addItem(product, 1);
      toast.success(`Added "${product.name}" to cart!`);
    }
  };

  const handleToggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) {
      const added = toggleItem(product);
      if (added) toast.success(`Saved "${product.name}" to wishlist`);
      else toast.info(`Removed "${product.name}" from wishlist`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: "Categories", href: "/category/all" },
            { label: category.name },
          ]}
          className="mb-4"
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#4A2418]">
            {category.name}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {category.subtitle || category.description}
          </p>
        </div>

        {/* Controls Bar: Mobile filter button + Sort dropdown + Product Count */}
        <div className="flex items-center justify-between bg-white p-3.5 px-4 rounded-xl border border-border/50 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Sheet Trigger */}
            <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-cream-100 transition-colors">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filter
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6 overflow-y-auto bg-white">
                <SheetHeader className="mb-4">
                  <SheetTitle className="font-heading text-xl font-bold">Filter By</SheetTitle>
                </SheetHeader>
                <FilterSidebar
                  sections={filterSections}
                  activeFilters={activeFilters}
                  onFilterChange={(f) => {
                    setActiveFilters(f);
                    setMobileFilterOpen(false);
                  }}
                />
              </SheetContent>
            </Sheet>

            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">{filteredProducts.length}</span> handcrafted treasures
            </span>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-medium hover:bg-cream-100 transition-colors">
                  <ArrowUpDown className="w-3.5 h-3.5 text-terracotta-500" />
                  <span className="capitalize">{activeSort.replace(/-/g, " ")}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 bg-white">
                <DropdownMenuItem onClick={() => setActiveSort("featured")}>
                  Featured
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSort("newest")}>
                  Newest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSort("price-low-high")}>
                  Price low-high
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSort("price-high-low")}>
                  Price high-low
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSort("top-rated")}>
                  Top rated
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSort("best-selling")}>
                  Best selling
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Content Layout: Left Sidebar + Right Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-border/50 shadow-sm sticky top-24">
            <FilterSidebar
              sections={filterSections}
              activeFilters={activeFilters}
              onFilterChange={setActiveFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-border/50">
                <p className="font-heading text-lg font-semibold text-brown-800">
                  No handcrafted treasures match your filter criteria.
                </p>
                <button
                  onClick={() => setActiveFilters({})}
                  className="mt-4 px-4 py-2 rounded-lg bg-terracotta-500 text-white text-xs font-medium hover:bg-terracotta-600 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={isInWishlist(product.id)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
