import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: { select: { products: true } },
      },
    });

    const transformed = categories.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      subtitle: c.subtitle,
      description: c.description,
      image: c.image,
      parentId: c.parentId,
      productCount: c._count.products,
    }));

    return NextResponse.json({ categories: transformed });
  } catch (error) {
    console.error("Categories API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
