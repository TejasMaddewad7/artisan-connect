import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { slug },
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
        reviews: {
          include: {
            user: {
              select: { id: true, name: true, avatar: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const transformed = {
      ...product,
      artisan: {
        ...product.artisan,
        memberSince: new Date(product.artisan.createdAt).getFullYear().toString(),
      },
      reviews: product.reviews.map((r) => ({
        id: r.id,
        userId: r.userId,
        userName: r.user.name,
        userAvatar: r.user.avatar,
        productId: r.productId,
        rating: r.rating,
        title: r.title,
        content: r.content,
        isVerifiedPurchase: r.isVerifiedPurchase,
        createdAt: r.createdAt.toISOString(),
      })),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };

    return NextResponse.json({ product: transformed });
  } catch (error) {
    console.error("Product detail error:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
