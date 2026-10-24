"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
  User,
  LogOut,
  Package,
  Store,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuthStore } from "@/stores/auth.store";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { toast } from "sonner";

const navLinks = [
  { label: "All Crafts", href: "/category/all" },
  { label: "Home & Living", href: "/category/home-living" },
  { label: "Jewelry", href: "/category/jewelry" },
  { label: "Textiles & Fashion", href: "/category/textiles-fashion" },
  { label: "Art & Gifts", href: "/category/art-gifts" },
  { label: "Meet the Artisans", href: "/artisans" },
];

const categories = [
  {
    name: "Jewelry",
    href: "/category/jewelry",
    subcategories: ["Necklaces", "Earrings", "Bracelets", "Rings", "Brooches"],
  },
  {
    name: "Home & Living",
    href: "/category/home-living",
    subcategories: ["Pottery", "Planters", "Table Décor", "Wall Art", "Candles"],
  },
  {
    name: "Textiles & Fashion",
    href: "/category/textiles-fashion",
    subcategories: [
      "Sarees",
      "Scarves",
      "Bags & Totes",
      "Table Linens",
      "Cushion Covers",
    ],
  },
  {
    name: "Art & Personalised Gifts",
    href: "/category/art-gifts",
    subcategories: [
      "Paintings",
      "Gift Boxes",
      "Personalized Items",
      "Cards & Stationery",
    ],
  },
];

interface HeaderProps {
  cartCount?: number;
  wishlistCount?: number;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  } | null;
}

export function Header({
  cartCount,
  wishlistCount,
  user,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const authStoreUser = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const activeUser = user !== undefined && user !== null ? user : authStoreUser;

  const storeCartCount = useCartStore((s) => s.getTotalItems());
  const storeWishlistCount = useWishlistStore((s) => s.getTotalItems());

  const effectiveCartCount = cartCount !== undefined ? cartCount : storeCartCount;
  const effectiveWishlistCount = wishlistCount !== undefined ? wishlistCount : storeWishlistCount;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/50 shadow-sm">
      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Mobile hamburger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="lg:hidden p-2 -ml-2 hover:bg-cream-100 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <MobileMenu
                user={activeUser}
                onClose={() => setMobileMenuOpen(false)}
              />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-terracotta-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 3C7 8 4 12 4 16C4 19.5 7.5 21 12 21C16.5 21 20 19.5 20 16C20 12 17 8 12 3Z" />
                <path d="M12 7V17" />
                <path d="M9 10C9 12 10.5 14 12 14" />
                <path d="M15 10C15 12 13.5 14 12 14" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold text-brown-700">
                ArtisanConnect
              </span>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground uppercase -mt-1">
                Handmade · People · Purpose
              </p>
            </div>
          </Link>

          {/* Categories dropdown (desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-foreground hover:text-terracotta-500 transition-colors">
                <Menu className="w-4 h-4" />
                Categories
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 p-2">
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.name} asChild>
                  <Link
                    href={cat.href}
                    className="flex items-center justify-between py-2"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Search bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search handmade treasures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full h-10 pl-4 pr-11 rounded-full border border-border",
                  "bg-cream-50 text-sm placeholder:text-muted-foreground/60",
                  "focus:outline-none focus:ring-2 focus:ring-terracotta-500/30 focus:border-terracotta-500",
                  "transition-all"
                )}
              />
              <button
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors"
                aria-label="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile search */}
            <button
              className="md:hidden p-2 hover:bg-cream-100 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Sign in / User menu */}
            {activeUser ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1.5 px-2 py-1.5 text-sm hover:bg-cream-100 rounded-lg transition-colors">
                    <div className="w-7 h-7 rounded-full bg-[#fae2d7] flex items-center justify-center text-[#B5502B] text-xs font-bold border border-[#B5502B]/20">
                      {activeUser.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-xs font-semibold text-[#4A2418]">
                      {activeUser.name.split(" ")[0]}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border border-border shadow-lg rounded-xl p-1 z-50">
                  <div className="px-3 py-2 border-b border-border/40">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#4A2418]">{activeUser.name}</p>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-cream-100 text-[#B5502B]">
                        {activeUser.role}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">{activeUser.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href="/account/orders" className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-cream-50 cursor-pointer">
                      <Package className="w-3.5 h-3.5 text-[#B5502B]" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account/profile" className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-cream-50 cursor-pointer">
                      <User className="w-3.5 h-3.5 text-[#B5502B]" />
                      <span>Profile & Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  {activeUser.role === "ARTISAN" && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/sell/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-cream-50 cursor-pointer text-[#B5502B] font-semibold"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Artisan Studio Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {activeUser.role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-cream-50 cursor-pointer text-purple-700 font-semibold">
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        <span>Marketplace Admin</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="my-1 border-t border-border/40" />
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      toast.info("Signed out of your account");
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/sign-in"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#4A2418] hover:text-[#B5502B] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Sign in</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 hover:bg-cream-100 rounded-lg transition-colors"
              aria-label={`Wishlist (${effectiveWishlistCount} items)`}
            >
              <Heart className="w-5 h-5 text-[#4A2418]" />
              {effectiveWishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-[#B5502B] text-white text-[10px] font-bold leading-none">
                  {effectiveWishlistCount > 9 ? "9+" : effectiveWishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-cream-100 rounded-lg transition-colors"
              aria-label={`Cart (${effectiveCartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5 text-[#4A2418]" />
              {effectiveCartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full bg-[#B5502B] text-white text-[10px] font-bold leading-none">
                  {effectiveCartCount > 9 ? "9+" : effectiveCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary navigation (desktop) */}
      <nav className="hidden lg:block border-t border-border/30 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-8 h-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/80 hover:text-terracotta-500 transition-colors font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

// ─── Mobile Menu ────────────────────────────────────────────────
function MobileMenu({
  user,
  onClose,
}: {
  user: HeaderProps["user"];
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <span className="font-heading text-lg font-bold text-brown-700">
          ArtisanConnect
        </span>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-cream-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-4 pr-10 rounded-lg border border-border bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/30"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-2">
        <ul className="space-y-0.5">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-cream-100 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="my-3 mx-3 h-px bg-border/50" />

        <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Categories
        </p>
        <ul className="space-y-0.5">
          {categories.map((cat) => (
            <li key={cat.name}>
              <Link
                href={cat.href}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-cream-100 transition-colors"
              >
                {cat.name}
                <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border/50 space-y-2">
        {user ? (
          <div className="flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-600 text-sm font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        ) : (
          <Link
            href="/sign-in"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full h-10 rounded-lg bg-terracotta-500 text-white text-sm font-medium hover:bg-terracotta-600 transition-colors"
          >
            <User className="w-4 h-4" />
            Sign in
          </Link>
        )}
        <Link
          href="/sell/register"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full h-10 rounded-lg border border-terracotta-500 text-terracotta-500 text-sm font-medium hover:bg-terracotta-50 transition-colors"
        >
          <Store className="w-4 h-4" />
          Start selling
        </Link>
      </div>
    </div>
  );
}
