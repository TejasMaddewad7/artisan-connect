"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  FileText,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { useOrderStore, type OrderRecord } from "@/stores/order.store";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function MyOrdersPage() {
  const orders = useOrderStore((s) => s.orders);
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "DELIVERED">("ALL");

  const filteredOrders = orders.filter((o) => {
    if (filter === "ACTIVE") return o.status !== "DELIVERED";
    if (filter === "DELIVERED") return o.status === "DELIVERED";
    return true;
  });

  const getStatusBadge = (status: OrderRecord["status"]) => {
    switch (status) {
      case "DELIVERED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
          </span>
        );
      case "SHIPPED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3.5 h-3.5" /> Dispatched & In Transit
          </span>
        );
      case "PROCESSING":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5" /> Handcrafting in Studio
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Order Confirmed
          </span>
        );
    }
  };

  const downloadInvoice = (orderNumber: string) => {
    toast.success(`Tax Invoice for ${orderNumber} generated & downloaded.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBEFE8] text-[#4A2418]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs
          items={[
            { label: "My Account", href: "/account/profile" },
            { label: "Orders & Shipments" },
          ]}
          className="mb-6"
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-semibold tracking-widest text-[#B5502B] uppercase">
              PURCHASE HISTORY
            </span>
            <h1 className="font-heading text-3xl font-bold text-[#4A2418] mt-1">
              My Orders & Shipments
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Track authentic handmade creations dispatched directly from artisan workshops.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-border/50 self-start sm:self-auto shadow-sm">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === "ALL"
                  ? "bg-[#B5502B] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setFilter("ACTIVE")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === "ACTIVE"
                  ? "bg-[#B5502B] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Active Shipments
            </button>
            <button
              onClick={() => setFilter("DELIVERED")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filter === "DELIVERED"
                  ? "bg-[#B5502B] text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Delivered
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center border border-border/50 shadow-sm max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-[#B5502B]">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-[#4A2418]">
              No orders found in this view
            </h2>
            <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
              Support traditional craft studios by browsing our curated handmade marketplace.
            </p>
            <Link
              href="/category/all"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#B5502B] text-white text-xs font-semibold hover:bg-[#A04424] transition-colors shadow-sm"
            >
              <span>Explore Handmade Treasures</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-border/50 shadow-sm overflow-hidden"
              >
                {/* Order Top Banner */}
                <div className="bg-cream-50/70 p-4 sm:p-5 border-b border-border/40 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-semibold block">
                        Order Placed
                      </span>
                      <span className="font-semibold text-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-semibold block">
                        Order Reference
                      </span>
                      <span className="font-bold text-[#B5502B] font-mono">
                        {order.orderNumber}
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-semibold block">
                        Total Amount
                      </span>
                      <span className="font-bold text-foreground">
                        {formatPrice(order.total)}
                      </span>
                      <span className="text-[10px] text-muted-foreground ml-1">
                        ({order.paymentMethod === "RAZORPAY" ? "Razorpay Paid" : "COD"})
                      </span>
                    </div>

                    <div>
                      <span className="text-muted-foreground text-[10px] uppercase font-semibold block">
                        Shipped To
                      </span>
                      <span className="text-foreground truncate max-w-[140px] block">
                        {order.shippingAddress.fullName}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <button
                      onClick={() => downloadInvoice(order.orderNumber)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-semibold hover:bg-cream-50 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#B5502B]" />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Delivery Tracker Bar */}
                <div className="px-5 py-3 bg-[#fdfaf7] border-b border-border/30 text-xs flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-700" />
                    <span className="text-muted-foreground">
                      Courier: <strong>{order.courier || "Delhivery Logistics"}</strong>
                    </span>
                    {order.trackingNumber && (
                      <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-border">
                        {order.trackingNumber}
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-green-800 text-[11px]">
                    {order.statusText}
                  </span>
                </div>

                {/* Items in this Order */}
                <div className="p-5 divide-y divide-border/30">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-cream-100 flex-shrink-0 border border-border/40">
                          {item.product.images?.[0] ? (
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
                              Craft
                            </div>
                          )}
                        </div>

                        <div>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="font-heading text-base font-bold text-[#4A2418] hover:text-[#B5502B] transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Crafted by{" "}
                            <Link
                              href={`/artisans/${item.product.artisan?.slug || ""}`}
                              className="text-[#B5502B] hover:underline font-semibold"
                            >
                              {item.product.artisan?.shopName || "Master Artisan"}
                            </Link>{" "}
                            · {item.product.artisan?.city || "Jaipur"}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-1">
                            Qty: {item.quantity} × {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-[#4A2418] text-xs font-semibold transition-colors"
                        >
                          Buy Again
                        </Link>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="px-4 py-2 rounded-xl border border-border hover:bg-cream-50 text-xs font-semibold transition-colors"
                        >
                          Write Review
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
