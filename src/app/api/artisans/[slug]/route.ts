import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const artisan = await prisma.artisanProfile.findUnique({
      where: { slug },
      include: {
        products: {
          where: { status: "ACTIVE" },
          include: {
            images: { orderBy: { order: "asc" } },
            category: true,
          },
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: { followers: true },
        },
      },
    });

    if (!artisan) {
      return NextResponse.json(
        { error: "Artisan not found" },
        { status: 404 }
      );
    }

    const transformed = {
      id: artisan.id,
      userId: artisan.userId,
      shopName: artisan.shopName,
      slug: artisan.slug,
      bio: artisan.bio,
      avatar: artisan.avatar,
      coverImage: artisan.coverImage,
      city: artisan.city,
      state: artisan.state,
      ratingAvg: artisan.ratingAvg,
      followerCount: artisan._count.followers || artisan.followerCount,
      productCount: artisan.products.length,
      craftCategories: artisan.craftCategories,
      memberSince: new Date(artisan.createdAt).getFullYear().toString(),
      products: artisan.products.map((p) => ({
        ...p,
        artisan: {
          id: artisan.id,
          userId: artisan.userId,
          shopName: artisan.shopName,
          slug: artisan.slug,
          bio: artisan.bio,
          avatar: artisan.avatar,
          city: artisan.city,
          state: artisan.state,
          ratingAvg: artisan.ratingAvg,
          followerCount: artisan.followerCount,
          productCount: artisan.products.length,
          memberSince: new Date(artisan.createdAt).getFullYear().toString(),
        },
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
      })),
    };

    return NextResponse.json({ artisan: transformed });
  } catch (error) {
    console.error("Artisan detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch artisan" },
      { status: 500 }
    );
  }
}
