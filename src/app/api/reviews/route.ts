import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch reviews for a product
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "productId is required" }, { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: { id: true, name: true, avatar: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const transformed = reviews.map((r) => ({
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
    }));

    return NextResponse.json({ reviews: transformed });
  } catch (error) {
    console.error("Reviews GET error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST - Submit a new review
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, userId, rating, title, content } = body;

    if (!productId || !userId || !rating || !content) {
      return NextResponse.json(
        { error: "productId, userId, rating, and content are required" },
        { status: 400 }
      );
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        productId,
        userId,
        rating: Math.min(5, Math.max(1, rating)),
        title: title || null,
        content,
        isVerifiedPurchase: true,
      },
      include: {
        user: {
          select: { id: true, name: true, avatar: true },
        },
      },
    });

    // Update product's average rating and review count
    const allReviews = await prisma.review.findMany({
      where: { productId },
      select: { rating: true },
    });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
    await prisma.product.update({
      where: { id: productId },
      data: {
        ratingAvg: Math.round(avgRating * 10) / 10,
        reviewCount: allReviews.length,
      },
    });

    return NextResponse.json({
      review: {
        id: review.id,
        userId: review.userId,
        userName: review.user.name,
        userAvatar: review.user.avatar,
        productId: review.productId,
        rating: review.rating,
        title: review.title,
        content: review.content,
        isVerifiedPurchase: review.isVerifiedPurchase,
        createdAt: review.createdAt.toISOString(),
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
