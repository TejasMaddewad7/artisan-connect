// Shared types used across the application

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in paise
  compareAtPrice?: number;
  images: ProductImage[];
  category: Category;
  categoryId: string;
  artisan: ArtisanProfile;
  artisanId: string;
  badge?: "Bestseller" | "New" | "Popular" | null;
  tags: string[];
  ratingAvg: number;
  reviewCount: number;
  stock: number;
  isHandmade: boolean;
  isEco: boolean;
  supportsLocalArtisans: boolean;
  isMadeToOrder: boolean;
  leadTimeDays?: number;
  variants?: ProductVariant[];
  detailsHtml?: string;
  shippingReturnsHtml?: string;
  careInstructionsHtml?: string;
  status: "DRAFT" | "PENDING" | "ACTIVE" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  order: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: "size" | "color" | "material";
  value: string;
  priceDelta: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  subtitle?: string;
  image?: string;
  parentId?: string;
  parent?: Category;
  children?: Category[];
  productCount?: number;
}

export interface ArtisanProfile {
  id: string;
  userId: string;
  shopName: string;
  slug: string;
  bio: string;
  avatar?: string;
  coverImage?: string;
  city: string;
  state: string;
  ratingAvg: number;
  followerCount: number;
  productCount: number;
  isFollowing?: boolean;
  memberSince: string;
  craftCategories?: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  productId: string;
  variantId?: string;
  variant?: ProductVariant;
  quantity: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
  productId: string;
  addedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  productId: string;
  rating: number;
  title?: string;
  content: string;
  isVerifiedPurchase: boolean;
  createdAt: string;
  images?: string[];
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: "RAZORPAY" | "COD";
  paymentStatus: "PENDING" | "PAID" | "FAILED" | "REFUNDED";
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURN_REQUESTED"
  | "RETURNED"
  | "REFUNDED";

export interface OrderItem {
  id: string;
  product: Product;
  productId: string;
  variantId?: string;
  quantity: number;
  priceAtPurchase: number;
  artisanId: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: "CUSTOMER" | "ARTISAN" | "ADMIN";
}

// Filter types for category page
export interface ProductFilters {
  categorySlug?: string;
  subcategories?: string[];
  priceRanges?: string[];
  materials?: string[];
  ratings?: number[];
  tags?: string[];
  artisanId?: string;
  inStockOnly?: boolean;
  search?: string;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-low-high"
  | "price-high-low"
  | "top-rated"
  | "best-selling";

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
