import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";
import { PRODUCTS } from "@/lib/data/mock-catalog";

export interface OrderRecord {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  statusText: string;
  items: {
    product: Product;
    quantity: number;
    price: number; // in paise
  }[];
  subtotal: number;
  deliveryFee: number;
  codFee: number;
  total: number;
  paymentMethod: "RAZORPAY" | "COD";
  shippingAddress: {
    fullName: string;
    phone: string;
    email: string;
    addressLine1: string;
    city: string;
    state: string;
    pincode: string;
  };
  courier?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const INITIAL_ORDERS: OrderRecord[] = [
  {
    id: "ord-seed-1",
    orderNumber: "AC-782910",
    createdAt: "2026-10-20T10:30:00Z",
    status: "DELIVERED",
    statusText: "Delivered at doorstep with eco packaging",
    items: [
      {
        product: PRODUCTS[0], // Hand-painted Terracotta Chai Kulhad Set
        quantity: 1,
        price: PRODUCTS[0].price,
      },
    ],
    subtotal: 85000,
    deliveryFee: 0,
    codFee: 0,
    total: 85000,
    paymentMethod: "RAZORPAY",
    shippingAddress: {
      fullName: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "customer@demo.com",
      addressLine1: "Flat 402, Lotus Greens, Sector 15",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
    },
    courier: "Delhivery Surface",
    trackingNumber: "DLV-98432109IN",
    estimatedDelivery: "Delivered on Oct 23, 2026",
  },
  {
    id: "ord-seed-2",
    orderNumber: "AC-892401",
    createdAt: "2026-10-23T14:15:00Z",
    status: "SHIPPED",
    statusText: "In transit from Jaipur craft cluster",
    items: [
      {
        product: PRODUCTS[1], // Dabu Hand-block Printed Chanderi Silk Saree
        quantity: 1,
        price: PRODUCTS[1].price,
      },
      {
        product: PRODUCTS[2], // Dokra Tribal Brass Dancing Figure
        quantity: 1,
        price: PRODUCTS[2].price,
      },
    ],
    subtotal: PRODUCTS[1].price + PRODUCTS[2].price,
    deliveryFee: 0,
    codFee: 0,
    total: PRODUCTS[1].price + PRODUCTS[2].price,
    paymentMethod: "RAZORPAY",
    shippingAddress: {
      fullName: "Priya Sharma",
      phone: "+91 98765 43210",
      email: "customer@demo.com",
      addressLine1: "Flat 402, Lotus Greens, Sector 15",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
    },
    courier: "BlueDart Express",
    trackingNumber: "BD-884129402",
    estimatedDelivery: "Expected by Oct 26, 2026",
  },
];

interface OrderStore {
  orders: OrderRecord[];
  addOrder: (order: OrderRecord) => void;
  getOrder: (orderNumber: string) => OrderRecord | undefined;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: INITIAL_ORDERS,

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      getOrder: (orderNumber) => {
        return get().orders.find((o) => o.orderNumber === orderNumber);
      },
    }),
    {
      name: "artisan-connect-orders",
    }
  )
);
