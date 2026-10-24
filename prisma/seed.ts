import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting ArtisanConnect full database seeding...");

  // ─── 1. Seed Categories ───
  const categoriesData = [
    {
      id: "cat-jewelry",
      name: "Handmade Jewelry",
      slug: "jewelry",
      subtitle: "Everyday pieces with a personal touch.",
      description: "Unique pieces, handcrafted with love by traditional metalsmiths and beaders.",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cat-home-living",
      name: "Home & Living",
      slug: "home-living",
      subtitle: "Thoughtful details for your space.",
      description: "Handcrafted ceramics, carved wood, and artisanal accents that bring warmth home.",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cat-textiles",
      name: "Textiles & Fashion",
      slug: "textiles-fashion",
      subtitle: "Tradition woven into every thread.",
      description: "Handloom cotton, hand block-prints, natural vegetable dyes, and heritage weaves.",
      image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "cat-art-gifts",
      name: "Art & Personalised Gifts",
      slug: "art-gifts",
      subtitle: "One-of-a-kind gifts with meaning.",
      description: "Heartfelt handmade souvenirs, miniature paintings, and custom keepsakes.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    },
  ];

  for (const cat of categoriesData) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log("✅ Seeded 4 craft categories");

  // ─── 2. Seed Users with Hashed Passwords ───
  const passwordHash = await bcrypt.hash("Password@123", 10);

  const usersData = [
    { id: "usr-admin-1", name: "Curation Team (Admin)", email: "admin@artisanconnect.in", role: "ADMIN" as const, phone: "+91 98110 99887" },
    { id: "usr-artisan-1", name: "Meera Sharma", email: "meera@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 12345" },
    { id: "usr-artisan-2", name: "The Handloom House", email: "handloom@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 22345" },
    { id: "usr-artisan-3", name: "Rajesh Kumar", email: "rajesh@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 32345" },
    { id: "usr-artisan-4", name: "Lakshmi Devi", email: "lakshmi@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 42345" },
    { id: "usr-artisan-5", name: "Arjun Patel", email: "arjun@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 52345" },
    { id: "usr-artisan-6", name: "Kavita Joshi", email: "kavita@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 62345" },
    { id: "usr-artisan-7", name: "Sanjay Verma", email: "sanjay@artisanconnect.in", role: "ARTISAN" as const, phone: "+91 94140 72345" },
    { id: "usr-customer-1", name: "Priya Sharma", email: "customer@demo.com", role: "CUSTOMER" as const, phone: "+91 98765 43210" },
    { id: "usr-customer-2", name: "Ananya Iyer", email: "ananya@demo.com", role: "CUSTOMER" as const, phone: "+91 98765 11111" },
    { id: "usr-customer-3", name: "Rohan Kapoor", email: "rohan@demo.com", role: "CUSTOMER" as const, phone: "+91 98765 22222" },
    { id: "usr-customer-4", name: "Pooja Hegde", email: "pooja@demo.com", role: "CUSTOMER" as const, phone: "+91 98765 33333" },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role, phone: u.phone, passwordHash },
      create: { id: u.id, name: u.name, email: u.email, role: u.role, phone: u.phone, passwordHash },
    });
  }
  console.log("✅ Seeded 12 users (admin + 7 artisans + 4 customers) with password 'Password@123'");

  // ─── 3. Seed Artisan Profiles ───
  const artisanProfiles = [
    {
      id: "artisan-meera", userId: "usr-artisan-1", shopName: "Meera Sharma", slug: "meera-sharma",
      bio: "Master terracotta potter based in Khurja. Crafting sustainable studio pottery inspired by rural folk art traditions passed down across four generations.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
      city: "Khurja", state: "Uttar Pradesh", isVerified: true, ratingAvg: 4.9, followerCount: 2450, productCount: 8,
      craftCategories: ["Terracotta", "Studio Pottery", "Home Décor"],
    },
    {
      id: "artisan-handloom-house", userId: "usr-artisan-2", shopName: "The Handloom House", slug: "the-handloom-house",
      bio: "A sustainable collective of Bagru and Sanganer block-printers keeping the art of natural indigo and dabu resist printing alive.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=80",
      city: "Bagru", state: "Rajasthan", isVerified: true, ratingAvg: 4.8, followerCount: 3820, productCount: 12,
      craftCategories: ["Block Printing", "Organic Cotton", "Textiles"],
    },
    {
      id: "artisan-rajasthan", userId: "usr-artisan-3", shopName: "Crafts of Rajasthan", slug: "crafts-of-rajasthan",
      bio: "Jaipur-based guild of generational brass and silver artisans recreating timeless Rajputana filigree and botanical motifs.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80",
      city: "Jaipur", state: "Rajasthan", isVerified: true, ratingAvg: 4.9, followerCount: 5120, productCount: 15,
      craftCategories: ["Brass Jewelry", "Silver Filigree", "Kundan Work"],
    },
    {
      id: "artisan-loom-land", userId: "usr-artisan-4", shopName: "Loom & Land", slug: "loom-and-land",
      bio: "Weaving stories on pit looms using handspun organic cotton and Eri silk from Assam and Bengal weavers.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1200&q=80",
      city: "Maheshwar", state: "Madhya Pradesh", isVerified: true, ratingAvg: 4.7, followerCount: 1980, productCount: 9,
      craftCategories: ["Handloom", "Table Linens", "Natural Fibers"],
    },
    {
      id: "artisan-earthy-hands", userId: "usr-artisan-5", shopName: "Earthy Hands", slug: "earthy-hands",
      bio: "Contemporary stoneware, studio planters, and minimal tableware handcrafted with local clays and ash glazes.",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
      city: "Auroville", state: "Tamil Nadu", isVerified: true, ratingAvg: 4.8, followerCount: 3100, productCount: 11,
      craftCategories: ["Ceramics", "Stoneware", "Studio Pottery"],
    },
    {
      id: "artisan-mitti", userId: "usr-artisan-6", shopName: "Mitti Creations", slug: "mitti-creations",
      bio: "Preserving red clay pottery traditions with clay cooking pots, water dispensers, and decorative diyas.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
      city: "Alwar", state: "Rajasthan", isVerified: true, ratingAvg: 4.6, followerCount: 1420, productCount: 7,
      craftCategories: ["Red Clay", "Cooking Vessels", "Pooja Crafts"],
    },
    {
      id: "artisan-artisan-house", userId: "usr-artisan-7", shopName: "The Artisan House", slug: "the-artisan-house",
      bio: "Handmade gift hampers, botanical resin work, hand-carved woodblocks, and personalized stationery.",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
      coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80",
      city: "Pune", state: "Maharashtra", isVerified: true, ratingAvg: 4.9, followerCount: 4200, productCount: 14,
      craftCategories: ["Personalised Gifts", "Stationery", "Woodcraft"],
    },
  ];

  for (const a of artisanProfiles) {
    await prisma.artisanProfile.upsert({
      where: { userId: a.userId },
      update: { shopName: a.shopName, bio: a.bio, avatar: a.avatar, coverImage: a.coverImage, city: a.city, state: a.state, isVerified: a.isVerified, ratingAvg: a.ratingAvg, followerCount: a.followerCount, productCount: a.productCount, craftCategories: a.craftCategories },
      create: a,
    });
  }
  console.log("✅ Seeded 7 artisan profiles");

  // ─── 4. Seed Products with Images ───
  const productsData = [
    {
      id: "prod-terracotta-vase", name: "Hand-painted Terracotta Vase", slug: "hand-painted-terracotta-vase",
      description: "Individually wheel-thrown terracotta vase hand-embellished with white organic slip botanicals. Fired in a wood-kiln for authentic earthy warmth.",
      price: 85000, compareAtPrice: 110000, badge: "Bestseller", categoryId: "cat-home-living", artisanId: "artisan-meera",
      ratingAvg: 4.8, reviewCount: 120, stock: 14, tags: ["Terracotta", "Pottery", "Vase", "Home Décor"],
      isHandmade: true, isEco: true, isMadeToOrder: false, leadTimeDays: 2,
      detailsHtml: "<ul><li>Height: 8.5 inches, Diameter: 4.5 inches</li><li>Material: 100% natural red clay terracotta</li><li>Finish: Matte natural clay with mineral white slip</li><li>Care: Wipe with dry soft cloth; dry stems recommended</li></ul>",
      shippingReturnsHtml: "<p>Ships securely packed in eco-friendly biodegradable honeycomb paper. Standard delivery in 4-6 business days. 7-day easy return for transit damages.</p>",
      careInstructionsHtml: "<p>Do not expose to heavy moisture or submerse in water. Clean with a dry or slightly damp microfibre cloth.</p>",
      images: [
        { id: "img-tv-1", url: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80", alt: "Hand-painted Terracotta Vase front view", order: 0 },
        { id: "img-tv-2", url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80", alt: "Terracotta Vase lifestyle on wooden table", order: 1 },
        { id: "img-tv-3", url: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80", alt: "Detail of white painted leaf motifs", order: 2 },
        { id: "img-tv-4", url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80", alt: "Artisan hand-crafting pottery on wheel", order: 3 },
      ],
    },
    {
      id: "prod-cotton-tote", name: "Block-Printed Cotton Tote", slug: "block-printed-cotton-tote",
      description: "Everyday durable tote bag hand block-printed using hand-carved teak woodblocks and plant-derived vegetable dyes on 100% unbleached cotton canvas.",
      price: 49900, compareAtPrice: 65000, badge: "New", categoryId: "cat-textiles", artisanId: "artisan-handloom-house",
      ratingAvg: 4.6, reviewCount: 86, stock: 25, tags: ["Eco-friendly", "Cotton", "Block Print", "Tote Bag"],
      isHandmade: true, isEco: true, isMadeToOrder: false,
      detailsHtml: "<p>Spacious reinforced shoulder straps, internal pocket for keys/wallet. Size: 15 x 16 inches with 4-inch base gusset.</p>",
      images: [
        { id: "img-tote-1", url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80", alt: "Block Printed Cotton Tote Bag", order: 0 },
        { id: "img-tote-2", url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80", alt: "Bagru pattern close up", order: 1 },
      ],
    },
    {
      id: "prod-brass-leaf-earrings", name: "Brass Leaf Earrings", slug: "brass-leaf-earrings",
      description: "Artisanal brushed brass earrings delicately etched with botanical leaf veins. Lightweight with hypoallergenic surgical steel ear hooks.",
      price: 65000, compareAtPrice: 85000, categoryId: "cat-jewelry", artisanId: "artisan-rajasthan",
      ratingAvg: 4.9, reviewCount: 142, stock: 18, tags: ["Jewelry", "Brass", "Botanical", "Earrings"],
      isHandmade: true, isEco: false, isMadeToOrder: true, leadTimeDays: 3,
      detailsHtml: "<p>Length: 2.2 inches. Material: High-grade recycled jeweler's brass with anti-tarnish protective coating.</p>",
      images: [
        { id: "img-leaf-1", url: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80", alt: "Brass Leaf Earrings on stone slab", order: 0 },
        { id: "img-leaf-2", url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80", alt: "Earrings detail", order: 1 },
      ],
    },
    {
      id: "prod-handwoven-runner", name: "Handwoven Table Runner", slug: "handwoven-table-runner",
      description: "Traditional pit-loom woven runner using handspun unbleached cotton and raw linen threads in terracotta and warm ochre stripes with fringed ends.",
      price: 120000, compareAtPrice: 150000, badge: "Popular", categoryId: "cat-textiles", artisanId: "artisan-loom-land",
      ratingAvg: 4.7, reviewCount: 98, stock: 8, tags: ["Handloom", "Table Runner", "Linen", "Home Decor"],
      isHandmade: true, isEco: true, isMadeToOrder: false,
      detailsHtml: "<p>Dimensions: 14 x 72 inches. Hand-wash in cold water with mild detergent.</p>",
      images: [
        { id: "img-runner-1", url: "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80", alt: "Handwoven Table Runner on rustic wooden dining table", order: 0 },
      ],
    },
    {
      id: "prod-beaded-necklace", name: "Beaded Necklace", slug: "beaded-necklace",
      description: "Artisan beaded choker featuring hand-strung lapis lazuli and amber beads with vintage tribal silver spacer beads.",
      price: 120000, compareAtPrice: 160000, badge: "Popular", categoryId: "cat-jewelry", artisanId: "artisan-rajasthan",
      ratingAvg: 4.8, reviewCount: 64, stock: 12, tags: ["Jewelry", "Beads", "Necklace"],
      isHandmade: true, isEco: false, isMadeToOrder: false,
      images: [
        { id: "img-bn-1", url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80", alt: "Beaded Necklace handmade", order: 0 },
      ],
    },
    {
      id: "prod-terracotta-pendant", name: "Terracotta Pendant", slug: "terracotta-pendant",
      description: "Fired clay pendant hand-painted with ancient mandala symmetry, suspended on an adjustable waxed cotton cord.",
      price: 85000, compareAtPrice: 95000, badge: "New", categoryId: "cat-jewelry", artisanId: "artisan-meera",
      ratingAvg: 4.7, reviewCount: 39, stock: 20, tags: ["Terracotta", "Jewelry", "Handmade"],
      isHandmade: true, isEco: true, isMadeToOrder: true, leadTimeDays: 2,
      images: [
        { id: "img-tp-1", url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80", alt: "Terracotta Pendant Necklace", order: 0 },
      ],
    },
    {
      id: "prod-silver-charm-bracelet", name: "Silver Charm Bracelet", slug: "silver-charm-bracelet",
      description: "Handcrafted 925 sterling silver chain with miniature handcrafted charms representing lotus, crescent moon, and banyan leaf.",
      price: 175000, compareAtPrice: 220000, badge: "Bestseller", categoryId: "cat-jewelry", artisanId: "artisan-rajasthan",
      ratingAvg: 4.9, reviewCount: 110, stock: 9, tags: ["Silver", "Jewelry", "Bracelet"],
      isHandmade: true, isEco: false, isMadeToOrder: false,
      images: [
        { id: "img-scb-1", url: "https://images.unsplash.com/photo-1611591475836-8c4c703b0704?auto=format&fit=crop&w=800&q=80", alt: "Silver Charm Bracelet", order: 0 },
      ],
    },
    {
      id: "prod-hand-painted-bowl", name: "Hand-painted Bowl", slug: "hand-painted-bowl",
      description: "Stoneware breakfast bowl hand-painted with cobalt blue and warm rust botanical flourishes, food safe and microwave safe.",
      price: 65000, compareAtPrice: 80000, categoryId: "cat-home-living", artisanId: "artisan-earthy-hands",
      ratingAvg: 4.8, reviewCount: 52, stock: 16, tags: ["Ceramics", "Bowl", "Handmade"],
      isHandmade: true, isEco: true, isMadeToOrder: false,
      images: [
        { id: "img-hpb-1", url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80", alt: "Hand-painted Ceramic Bowl", order: 0 },
      ],
    },
    {
      id: "prod-decorative-planter", name: "Decorative Planter", slug: "decorative-planter",
      description: "Ribbed terracotta indoor planter with drainage tray. Perfect for succulents, ferns, or pothos vines.",
      price: 95000, compareAtPrice: 120000, badge: "Popular", categoryId: "cat-home-living", artisanId: "artisan-mitti",
      ratingAvg: 4.7, reviewCount: 77, stock: 22, tags: ["Planter", "Terracotta", "Eco-friendly"],
      isHandmade: true, isEco: true, isMadeToOrder: false,
      images: [
        { id: "img-planter-1", url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80", alt: "Artisan Terracotta Planter", order: 0 },
      ],
    },
    {
      id: "prod-gift-box", name: "Artisan Keepsake Gift Box", slug: "artisan-keepsake-gift-box",
      description: "Curated gift box with scented soy candle in handmade clay vessel, brass bookmark, and plantable seed paper notebook.",
      price: 145000, compareAtPrice: 180000, badge: "Bestseller", categoryId: "cat-art-gifts", artisanId: "artisan-artisan-house",
      ratingAvg: 4.9, reviewCount: 88, stock: 15, tags: ["Gift Box", "Sustainable", "Personalised"],
      isHandmade: true, isEco: true, isMadeToOrder: false,
      images: [
        { id: "img-gift-1", url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80", alt: "Artisan Keepsake Gift Box tied with twine and dried flowers", order: 0 },
      ],
    },
  ];

  for (const p of productsData) {
    const { images, ...productFields } = p;
    await prisma.product.upsert({
      where: { slug: productFields.slug },
      update: {
        name: productFields.name,
        description: productFields.description,
        price: productFields.price,
        compareAtPrice: productFields.compareAtPrice ?? null,
        badge: productFields.badge ?? null,
        tags: productFields.tags,
        stock: productFields.stock,
        isHandmade: productFields.isHandmade,
        isEco: productFields.isEco,
        isMadeToOrder: productFields.isMadeToOrder,
        leadTimeDays: productFields.leadTimeDays ?? null,
        detailsHtml: productFields.detailsHtml ?? null,
        shippingReturnsHtml: productFields.shippingReturnsHtml ?? null,
        careInstructionsHtml: productFields.careInstructionsHtml ?? null,
        ratingAvg: productFields.ratingAvg,
        reviewCount: productFields.reviewCount,
        categoryId: productFields.categoryId,
        artisanId: productFields.artisanId,
        status: "ACTIVE",
      },
      create: {
        ...productFields,
        status: "ACTIVE",
      },
    });

    // Upsert product images
    for (const img of images) {
      await prisma.productImage.upsert({
        where: { id: img.id },
        update: { url: img.url, alt: img.alt, order: img.order },
        create: { id: img.id, productId: p.id, url: img.url, alt: img.alt, order: img.order },
      });
    }
  }
  console.log("✅ Seeded 10 products with images");

  // ─── 5. Seed Reviews ───
  const reviewsData = [
    {
      id: "rev-1", productId: "prod-terracotta-vase", userId: "usr-customer-2",
      rating: 5, title: "Breathtaking artistry!",
      content: "The hand-painted motifs on this vase are even more stunning in person. It adds so much soul and rustic character to my living room mantel.",
    },
    {
      id: "rev-2", productId: "prod-terracotta-vase", userId: "usr-customer-3",
      rating: 5, title: "Packaged with such care",
      content: "Arrived in 100% paper packaging without a single scratch. Truly support Meera ji's craft, this is genuine artisan heritage.",
    },
    {
      id: "rev-3", productId: "prod-brass-leaf-earrings", userId: "usr-customer-4",
      rating: 5, title: "Lightweight and so elegant",
      content: "Wore these to a festive dinner and got dozens of compliments. Very light on the ears and high quality craftsmanship.",
    },
    {
      id: "rev-4", productId: "prod-cotton-tote", userId: "usr-customer-1",
      rating: 4, title: "Perfect everyday bag",
      content: "Spacious and sturdy. The block print pattern is gorgeous and the vegetable dyes smell so nice and earthy.",
    },
    {
      id: "rev-5", productId: "prod-gift-box", userId: "usr-customer-2",
      rating: 5, title: "Best gift I've ever given!",
      content: "My friend absolutely loved this gift box. The candle smells divine and the brass bookmark is a beautiful touch. Will order again!",
    },
    {
      id: "rev-6", productId: "prod-silver-charm-bracelet", userId: "usr-customer-1",
      rating: 5, title: "Stunning silver work",
      content: "The lotus and moon charms are so delicate and detailed. This is now my everyday bracelet. Pure 925 silver quality.",
    },
    {
      id: "rev-7", productId: "prod-hand-painted-bowl", userId: "usr-customer-3",
      rating: 5, title: "Art you can eat from",
      content: "Using this bowl for my morning oatmeal feels like a ritual now. The cobalt blue brush strokes are mesmerizing.",
    },
    {
      id: "rev-8", productId: "prod-decorative-planter", userId: "usr-customer-4",
      rating: 4, title: "Beautiful planter, great drainage",
      content: "My pothos looks so much better in this ribbed terracotta planter. The drainage tray is a nice functional touch.",
    },
    {
      id: "rev-9", productId: "prod-handwoven-runner", userId: "usr-customer-2",
      rating: 5, title: "Elevates the dining table",
      content: "The ochre and terracotta stripes are exactly what my wooden dining table needed. Beautiful handloom quality.",
    },
    {
      id: "rev-10", productId: "prod-beaded-necklace", userId: "usr-customer-1",
      rating: 5, title: "Gorgeous tribal design",
      content: "The lapis lazuli beads have such a deep blue color. The silver spacer beads add a vintage charm. Love it!",
    },
  ];

  for (const r of reviewsData) {
    await prisma.review.upsert({
      where: { id: r.id },
      update: { rating: r.rating, title: r.title, content: r.content },
      create: { ...r, isVerifiedPurchase: true },
    });
  }
  console.log("✅ Seeded 10 reviews");

  // ─── 6. Seed Addresses for demo customer ───
  await prisma.address.upsert({
    where: { id: "addr-1" },
    update: {},
    create: {
      id: "addr-1",
      userId: "usr-customer-1",
      fullName: "Priya Sharma",
      phone: "+91 98765 43210",
      addressLine1: "Flat 402, Lotus Greens, Sector 15",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      isDefault: true,
    },
  });
  console.log("✅ Seeded demo address");

  console.log("\n🎉 Full database seeding completed successfully!");
  console.log("   Login credentials: any user email + Password@123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
