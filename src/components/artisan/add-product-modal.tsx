"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Plus, Upload, Sparkles, Check, Image as ImageIcon } from "lucide-react";
import type { Product, Category, ArtisanProfile } from "@/types";
import { CATEGORIES } from "@/lib/data/mock-catalog";
import { toast } from "sonner";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  artisan: ArtisanProfile;
  onProductAdded: (newProduct: Product) => void;
}

const PRESET_IMAGES = [
  {
    name: "Handmade Pottery Urn",
    url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Block-printed Handloom Silk",
    url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bell Metal Dokra Figure",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Hand-carved Sheesham Wood Mirror",
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
  },
];

export function AddProductModal({
  isOpen,
  onClose,
  artisan,
  onProductAdded,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState(CATEGORIES[0].id);
  const [priceRupees, setPriceRupees] = useState("");
  const [stock, setStock] = useState("8");
  const [leadTimeDays, setLeadTimeDays] = useState("4");
  const [isMadeToOrder, setIsMadeToOrder] = useState(false);
  const [isEco, setIsEco] = useState(true);
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !priceRupees) {
      toast.error("Please fill in required fields");
      return;
    }

    const pricePaise = Math.round(parseFloat(priceRupees) * 100);
    const category = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
    const finalImageUrl = customImageUrl.trim() || selectedImage;

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      slug: `${slug}-${Math.floor(100 + Math.random() * 900)}`,
      description: description || `Meticulously handcrafted in ${artisan.city} using generational techniques.`,
      price: pricePaise,
      badge: "New",
      stock: parseInt(stock, 10) || 5,
      isHandmade: true,
      isEco,
      supportsLocalArtisans: true,
      isMadeToOrder,
      leadTimeDays: isMadeToOrder ? parseInt(leadTimeDays, 10) : undefined,
      ratingAvg: 5.0,
      reviewCount: 0,
      tags: ["Handmade", isEco ? "Eco-friendly" : "", isMadeToOrder ? "Made to Order" : ""].filter(Boolean),
      categoryId: category.id,
      category,
      artisanId: artisan.id,
      artisan,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: [
        {
          id: `img-${Date.now()}`,
          url: finalImageUrl,
          alt: name,
          order: 0,
        },
      ],
      detailsHtml: `<p>${description || "Handcrafted creation with certified craft materials."}</p>`,
      shippingReturnsHtml: "<p>Shipped in safe eco-friendly protective packaging. 7-day safe transit guarantee.</p>",
      careInstructionsHtml: "<p>Handle with gentle care. Dust softly with a dry lint-free cloth.</p>",
    };

    onProductAdded(newProduct);
    toast.success(`"${name}" is now live in your artisan storefront!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-cream-100 text-muted-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-semibold tracking-widest text-[#B5502B] uppercase">
            STUDIO CREATION SUITE
          </span>
          <h2 className="font-heading text-2xl font-bold text-[#4A2418] mt-1">
            Add New Handcrafted Item
          </h2>
          <p className="text-xs text-muted-foreground">
            List a new artisanal piece directly to the ArtisanConnect catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Creation Title *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Hand-turned Terracotta Floral Vase"
              className="w-full h-10 px-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Craft Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-xs bg-white focus:ring-1 focus:ring-[#B5502B]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Selling Price (₹ INR) *
              </label>
              <input
                type="number"
                required
                min="50"
                step="10"
                value={priceRupees}
                onChange={(e) => setPriceRupees(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full h-10 px-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Available Stock Units
              </label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">
                Craft Lead Time (Days)
              </label>
              <input
                type="number"
                min="1"
                value={leadTimeDays}
                onChange={(e) => setLeadTimeDays(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
              />
            </div>
          </div>

          {/* Photo Selection */}
          <div>
            <label className="block text-xs font-semibold text-foreground mb-2">
              Select Handcrafted Image
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {PRESET_IMAGES.map((img, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedImage(img.url);
                    setCustomImageUrl("");
                  }}
                  className={`relative h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === img.url && !customImageUrl
                      ? "border-[#B5502B] ring-2 ring-[#B5502B]/30"
                      : "border-border hover:opacity-80"
                  }`}
                >
                  <Image src={img.url} alt={img.name} fill className="object-cover" />
                  {selectedImage === img.url && !customImageUrl && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B5502B] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              <input
                type="url"
                value={customImageUrl}
                onChange={(e) => setCustomImageUrl(e.target.value)}
                placeholder="Or paste external high-res photo URL (Unsplash, Cloudinary)..."
                className="w-full h-9 px-3 rounded-lg border border-border text-[11px] focus:ring-1 focus:ring-[#B5502B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground mb-1">
              Story & Material Details
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the clay composition, hand-weaving process, natural dyes, or heritage motif..."
              className="w-full p-3 rounded-xl border border-border text-xs focus:ring-1 focus:ring-[#B5502B]"
            />
          </div>

          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isMadeToOrder}
                onChange={(e) => setIsMadeToOrder(e.target.checked)}
                className="rounded border-border text-[#B5502B] focus:ring-[#B5502B]"
              />
              <span className="font-semibold text-foreground">Made to Order</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={isEco}
                onChange={(e) => setIsEco(e.target.checked)}
                className="rounded border-border text-[#B5502B] focus:ring-[#B5502B]"
              />
              <span className="font-semibold text-foreground">Eco-friendly Materials</span>
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-border/40">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-border text-xs font-semibold hover:bg-cream-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
