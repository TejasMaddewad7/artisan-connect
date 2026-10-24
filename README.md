# ArtisanConnect — Handmade · People · Purpose

A production-ready, multi-vendor handmade marketplace built for generational Indian artisans, weavers, and craft studios.

---

## 🎨 Design System & Palette

- **Primary Terracotta**: `#B5502B`
- **Deep Brown Text**: `#4A2418`
- **Cream / Peach Background**: `#FBEFE8`
- **Sage Green Leaf Accents**: `#7A8B69`
- **Typography**: Cormorant Garamond (Headings) + Inter (Body/UI)
- **Aesthetic**: Botanical flourishes, organic slip motifs, soft card shadows, rounded corners.

---

## 🚀 Recreated Screens & Features

1. **Homepage (`/`)**:
   - Hero banner with trust badges (*Authentic Craftsmanship, Support Local Makers, Sustainable Choices*)
   - Pottery visual with "Crafted with purpose" script overlay
   - Side promo card (*Meaningful gifts, made by hand*)
   - 4 Category cards (*Find something beautifully handmade*)
   - 4 Handpicked product cards with ratings, price in ₹, artisan credit, tag chips, and instant add-to-cart
   - Seller CTA banner with 4-point verification checklist and decorative botanical leaf SVGs
   - Newsletter signup footer

2. **Category Page (`/category/[slug]` & `/category/all`)**:
   - Breadcrumb navigation
   - Collapsible filter sidebar (subcategories, price ranges, materials, tags)
   - Sort dropdown (*Featured, Newest, Price low-high, Price high-low, Top rated, Best selling*)
   - Mobile-responsive bottom-sheet filter drawer

3. **Product Detail Page (`/product/[slug]`)**:
   - High-res image gallery with thumbnail strip and navigation arrows
   - Price in ₹ with tax note
   - Feature row (*100% Handmade, Eco-friendly, Supports Artisan*)
   - Made-to-order lead time indicator
   - PIN code delivery estimator
   - Accordions for Product Details, Shipping & Returns, Care Instructions
   - Verified purchase customer reviews
   - Related products carousel
   - Sticky mobile Add-to-Cart bar

4. **Artisan Studio Profile (`/artisans/[slug]`) & Directory (`/artisans`)**:
   - Wide cover banner with overlapping circular studio avatar
   - Location pin, artisan bio, and studio story
   - Optimistic 1-click Studio Follow toggle with formatted counters (e.g. 2.5K)
   - Studio statistics: Total Products, Followers, Average Rating
   - Tabs: Studio Products, Artisan Story & Heritage, Reviews

5. **Shopping Cart (`/cart` & Slide-over Drawer)**:
   - Dynamic slide-over drawer triggered on adding items
   - Full cart page with items grouped by artisan studio
   - Free shipping progress bar (threshold: ₹1,000)
   - Coupon codes (`HANDMADE10` for 10% off, `ARTISAN50` for ₹50 off)
   - Dynamic price calculation in integer paise

6. **Wishlist (`/wishlist`)**:
   - Synchronized heart buttons across all product cards
   - Individual "Add to Cart" and bulk "Move All to Cart"
   - Price-drop and craft inventory alerts opt-in

7. **Seller Registration (`/sell/register`)**:
   - 3-step progress stepper: Basic Information, Studio Details & Categories, KYC & Payout verification
   - Interactive craft category selector
   - Submission confirmation screen (*Pending Admin Approval*)

8. **Checkout & Payments (`/checkout`)**:
   - Full recipient address form
   - Payment method toggle: Razorpay (Cards, UPI, Netbanking) vs Cash on Delivery (COD)
   - 256-bit encrypted checkout flow with order confirmation

9. **Artisan Dashboard (`/sell/dashboard`)**:
   - Studio revenue metrics, pending orders to fulfill, follower growth
   - Active listings catalog table

10. **Admin Panel (`/admin`)**:
    - Gross Merchandise Value (GMV) and platform commission (10%) overview
    - 1-click artisan application approval / rejection queue
    - Platform commission percentage setting

---

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@artisanconnect.in` | `Admin@123` |
| **Artisan** | `meera@artisanconnect.in` | `Artisan@123` |
| **Customer**| `customer@demo.com` | `Customer@123` |

*(Quick 1-click fill buttons are also provided on `/sign-in` for rapid testing).*

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local dev server
npm run dev

# 3. Open in browser
http://localhost:3000
```
