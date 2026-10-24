"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Leaf,
  Clock,
  Truck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Share2,
  MapPin,
  Star,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { RatingStars } from "@/components/shared/rating-stars";
import { ProductBadge } from "@/components/shared/product-badge";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { ProductCard } from "@/components/product/product-card";
import { CartDrawer } from "@/components/cart/cart-drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useCartStore } from "@/stores/cart.store";
import { useWishlistStore } from "@/stores/wishlist.store";
import { useAuthStore } from "@/stores/auth.store";
import { PRODUCTS, REVIEWS } from "@/lib/data/mock-catalog";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  const product = PRODUCTS.find((p) => p.slug === resolvedParams.slug) || PRODUCTS[0];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  const reviews = REVIEWS.filter((r) => r.productId === product.id);

  const user = useAuthStore((s) => s.user);
  const [reviewsList, setReviewsList] = useState(reviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) {
      toast.error("Please enter your review text");
      return;
    }
    setIsSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          userId: user?.id || "usr-customer-1",
          rating: newRating,
          title: newTitle.trim(),
          content: newContent.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Failed to submit review");
        return;
      }

      setReviewsList([
        {
          id: data.review?.id || `rev-${Date.now()}`,
          productId: product.id,
          userId: user?.id || "usr-customer-1",
          userName: user?.name || "Customer",
          rating: newRating,
          title: newTitle.trim(),
          content: newContent.trim(),
          createdAt: new Date().toISOString(),
          isVerifiedPurchase: true,
        },
        ...reviewsList,
      ]);
      toast.success("Review submitted and saved to Supabase!");
      setShowReviewForm(false);
      setNewTitle("");
      setNewContent("");
    } catch {
      toast.error("Network error while submitting review");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  const { addItem, getTotalItems: getCartTotal } = useCartStore();
  const { toggleItem, isInWishlist, getTotalItems: getWishlistTotal } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} × "${product.name}" to cart!`);
  };

  const handleToggleWishlist = () => {
    const added = toggleItem(product);
    if (added) toast.success(`Saved "${product.name}" to wishlist`);
    else toast.info(`Removed "${product.name}" from wishlist`);
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setPincodeStatus("Delivery available in 3-5 business days. Free delivery above ₹1,000.");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const images = product.images && product.images.length > 0 ? product.images : [
    { id: "fallback-1", url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80", alt: product.name, order: 0 }
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header
        cartCount={getCartTotal()}
        wishlistCount={getWishlistTotal()}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {/* Breadcrumb */}
        <Breadcrumbs
          items={[
            { label: product.category.name, href: `/category/${product.category.slug}` },
            { label: product.name },
          ]}
          className="mb-6"
        />

        {/* Product Main Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Large Image Showcase with Left/Right arrows */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-border/50 shadow-sm group">
              <Image
                src={images[activeImageIndex].url}
                alt={images[activeImageIndex].alt || product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-105 cursor-zoom-in"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <ProductBadge variant={product.badge} size="md" />
                </div>
              )}

              {/* Arrow navigation buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white flex items-center justify-center text-brown-800 transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow hover:bg-white flex items-center justify-center text-brown-800 transition-all opacity-80 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip (4+) */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden bg-white border-2 transition-all ${
                      activeImageIndex === idx
                        ? "border-[#B5502B] ring-2 ring-[#B5502B]/20"
                        : "border-border/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-border/50 shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <Link
                  href={`/artisans/${product.artisan.slug}`}
                  className="text-xs uppercase tracking-wider font-semibold text-[#B5502B] hover:underline"
                >
                  By {product.artisan.shopName}
                </Link>
                <button
                  onClick={handleToggleWishlist}
                  className="p-2 rounded-full hover:bg-cream-100 text-brown-600 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted ? "fill-[#B5502B] text-[#B5502B]" : "text-muted-foreground"
                    }`}
                  />
                </button>
              </div>

              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2418] mt-1">
                {product.name}
              </h1>

              {/* Rating and Reviews link */}
              <div className="flex items-center gap-3 mt-2">
                <RatingStars rating={product.ratingAvg} size="md" />
                <span className="text-xs text-muted-foreground font-medium">
                  ({product.reviewCount} reviews)
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="text-xs text-sage-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stock})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 pb-4 border-b border-border/40">
              <span className="font-heading text-3xl font-bold text-[#4A2418]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
              <span className="text-[11px] text-muted-foreground">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Feature Icon Row (Handmade, Sustainable, Supports Local Artisans) */}
            <div className="grid grid-cols-3 gap-2 py-3 px-3 bg-cream-50 rounded-xl border border-border/40 text-center">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#B5502B]" />
                <span className="text-[11px] font-medium text-foreground">100% Handmade</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Leaf className="w-4 h-4 text-[#7A8B69]" />
                <span className="text-[11px] font-medium text-foreground">Eco-friendly</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Heart className="w-4 h-4 text-[#B5502B]" />
                <span className="text-[11px] font-medium text-foreground">Supports Artisan</span>
              </div>
            </div>

            {/* Made to order alert if applicable */}
            {product.isMadeToOrder && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  Made to order: Please allow <strong>{product.leadTimeDays || 3} days</strong> for our master artisan to craft this piece before shipping.
                </span>
              </div>
            )}

            {/* Quantity Stepper & Add to Cart button */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-muted-foreground">Quantity:</span>
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  max={product.stock}
                  size="md"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#B5502B] text-white font-semibold text-sm hover:bg-[#A04424] shadow-md hover:shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="p-3.5 rounded-xl border border-[#B5502B] text-[#B5502B] hover:bg-cream-100 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-[#B5502B]" : ""}`} />
                </button>
              </div>
            </div>

            {/* Pincode Delivery Check */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#B5502B]" />
                Check delivery availability:
              </p>
              <form onSubmit={checkPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 h-9 px-3 text-xs rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-[#B5502B]"
                />
                <button
                  type="submit"
                  className="px-4 h-9 rounded-lg bg-cream-200 text-brown-800 text-xs font-semibold hover:bg-cream-300 transition-colors"
                >
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p className="text-[11px] text-[#7A5A3F] mt-1.5 font-medium">{pincodeStatus}</p>
              )}
            </div>

            {/* Accordions: Product Details, Shipping & Returns, Care Instructions */}
            <div className="pt-2 border-t border-border/40">
              <Accordion defaultValue={["details"]} className="w-full">
                <AccordionItem value="details" className="border-b border-border/30">
                  <AccordionTrigger className="text-xs font-bold text-foreground">
                    Product Details & Craft Story
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {product.detailsHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: product.detailsHtml }} />
                    ) : (
                      <p>
                        Handmade by generational artisans utilizing traditional techniques. Each individual creation carries gentle organic variations in shade and texture that make it singularly yours.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="shipping" className="border-b border-border/30">
                  <AccordionTrigger className="text-xs font-bold text-foreground">
                    Shipping & 7-Day Returns
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {product.shippingReturnsHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: product.shippingReturnsHtml }} />
                    ) : (
                      <p>
                        Packaged with 100% plastic-free recycled paper packaging. Dispatches in 24-48 hours. Easy 7-day returns if any transit damage occurs.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="care" className="border-b border-border/30">
                  <AccordionTrigger className="text-xs font-bold text-foreground">
                    Care Instructions
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground leading-relaxed">
                    {product.careInstructionsHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: product.careInstructionsHtml }} />
                    ) : (
                      <p>
                        Clean gently with a soft dry cloth. Store away from excessive moisture and direct prolonged sunlight to preserve organic colors.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16 bg-white p-6 sm:p-10 rounded-2xl border border-border/50 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border/40">
            <div>
              <h2 className="font-heading text-2xl font-bold text-[#4A2418]">
                Customer Reviews
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={product.ratingAvg} size="md" />
                <span className="text-xs text-muted-foreground">
                  Based on {reviewsList.length} verified purchases
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-[#B5502B] text-white hover:bg-[#A04424] transition-colors self-start sm:self-auto shadow-sm"
            >
              {showReviewForm ? "Cancel Review" : "Write a Review"}
            </button>
          </div>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mb-8 p-5 bg-[#FBEFE8]/60 border border-[#E9CBBB] rounded-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#B5502B]">
                Share your handcrafted experience
              </h3>
              <div>
                <label className="block text-xs font-semibold mb-1">Your Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= newRating ? "text-amber-500 fill-amber-500" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-medium ml-2">{newRating} / 5 Stars</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Review Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Exquisite craftsmanship and authentic finish"
                  className="w-full h-9 px-3 text-xs rounded-lg border border-border bg-white focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Your Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Share details about the packaging, handmade texture, or the artisan's craft..."
                  className="w-full p-3 text-xs rounded-lg border border-border bg-white focus:ring-1 focus:ring-[#B5502B]"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmittingReview}
                className="px-5 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors disabled:opacity-60 shadow-sm"
              >
                {isSubmittingReview ? "Submitting to Supabase..." : "Submit Review"}
              </button>
            </form>
          )}

          <div className="space-y-6">
            {reviewsList.length > 0 ? (
              reviewsList.map((rev) => (
                <div key={rev.id} className="pb-6 border-b border-border/30 last:border-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-foreground">{rev.userName}</span>
                      <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-green-50 text-green-700 font-medium">
                        Verified Purchase
                      </span>
                    </div>
                    <RatingStars rating={rev.rating} size="sm" />
                  </div>
                  {rev.title && (
                    <h4 className="text-xs font-semibold text-foreground mt-2">{rev.title}</h4>
                  )}
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {rev.content}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No reviews yet for this product. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="font-heading text-2xl font-bold text-[#4A2418] mb-6">
            You might also adore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={isInWishlist(p.id)}
                onAddToCart={(id) => {
                  const item = PRODUCTS.find((x) => x.id === id);
                  if (item) {
                    addItem(item, 1);
                    toast.success(`Added "${item.name}" to cart!`);
                  }
                }}
                onToggleWishlist={(id) => {
                  const item = PRODUCTS.find((x) => x.id === id);
                  if (item) toggleItem(item);
                }}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Add-to-Cart Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border/60 p-3 px-4 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] text-muted-foreground uppercase">Price</span>
          <p className="font-heading text-lg font-bold text-[#4A2418]">
            {formatPrice(product.price)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] shadow"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

      <CartDrawer />
      <Footer />
    </div>
  );
}
