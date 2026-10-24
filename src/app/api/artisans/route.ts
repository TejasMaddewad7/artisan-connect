import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const artisans = await prisma.artisanProfile.findMany({
      where: { isVerified: true },
      orderBy: { followerCount: "desc" },
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
    });

    const transformed = artisans.map((a) => ({
      ...a,
      memberSince: new Date(a.createdAt).getFullYear().toString(),
    }));

    return NextResponse.json({ artisans: transformed });
  } catch (error) {
    console.error("Artisans API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch artisans" },
      { status: 500 }
    );
  }
}
