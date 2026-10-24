import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting ArtisanConnect database seeding...");

  // 1. Seed Categories
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
      subtitle: "Meaningful gifts, made by hand.",
      description: "Original folk art, Madhubani miniatures, personalized keepsake boxes, and greeting crafts.",
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

  // 2. Seed Users & Artisan Profiles
  const demoUsers = [
    {
      id: "usr-admin-1",
      name: "Super Admin",
      email: "admin@artisanconnect.in",
      role: "ADMIN" as const,
    },
    {
      id: "usr-artisan-1",
      name: "Meera Sharma",
      email: "meera@artisanconnect.in",
      role: "ARTISAN" as const,
      artisan: {
        shopName: "Mitti & Clay Studio",
        slug: "mitti-and-clay",
        bio: "Specializing in hand-thrown terracotta kulhads and terracotta home accents with natural glazes.",
        city: "Jaipur",
        state: "Rajasthan",
        isVerified: true,
        ratingAvg: 4.9,
        followerCount: 2540,
        craftCategories: ["Home & Living", "Art & Gifts"],
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        coverImage: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80",
      },
    },
    {
      id: "usr-customer-1",
      name: "Priya Sharma",
      email: "customer@demo.com",
      role: "CUSTOMER" as const,
    },
  ];

  for (const u of demoUsers) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: { name: u.name, role: u.role },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
      },
    });

    if (u.artisan) {
      await prisma.artisanProfile.upsert({
        where: { userId: user.id },
        update: u.artisan,
        create: {
          id: "artisan-meera",
          userId: user.id,
          ...u.artisan,
        },
      });
    }
  }
  console.log("✅ Seeded demo accounts and artisan studio");

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
