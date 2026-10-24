import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.toLowerCase();
    const sort = searchParams.get("sort") || "featured";
    const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined;
    const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;
    const artisanId = searchParams.get("artisanId");
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize") || 20)));

    // Build where clause
    const where: Record<string, unknown> = {
      status: "ACTIVE",
    };

    if (category && category !== "all") {
      where.category = { slug: category };
    }

    if (artisanId) {
      where.artisanId = artisanId;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { tags: { hasSome: [search] } },
        { artisan: { shopName: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) (where.price as Record<string, number>).gte = minPrice;
      if (maxPrice !== undefined) (where.price as Record<string, number>).lte = maxPrice;
    }

    // Build orderBy
    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "price-low-high":
        orderBy = { price: "asc" };
        break;
      case "price-high-low":
        orderBy = { price: "desc" };
        break;
      case "top-rated":
        orderBy = { ratingAvg: "desc" };
        break;
      case "newest":
        orderBy = { createdAt: "desc" };
        break;
      case "best-selling":
        orderBy = { reviewCount: "desc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          images: { orderBy: { order: "asc" } },
          category: true,
          artisan: {
            select: {
              id: true,
              userId: true,
              shopName: true,
              slug: true,
              bio: true,
              avatar: true,
              coverImage: true,
              city: true,
              state: true,
              ratingAvg: true,
              followerCount: true,
              productCount: true,
              craftCategories: true,
              createdAt: true,
            },
          },
          variants: true,
        },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ]);

    // Transform to match frontend Product type
    const transformed = products.map((p) => ({
      ...p,
      artisan: {
        ...p.artisan,
        memberSince: new Date(p.artisan.createdAt).getFullYear().toString(),
      },
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      products: transformed,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
