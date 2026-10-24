import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/data/mock-catalog";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search")?.toLowerCase();
  const sort = searchParams.get("sort") || "featured";
  const minPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : null;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : null;

  let results = [...PRODUCTS];

  if (category && category !== "all") {
    results = results.filter((p) => p.category.slug === category);
  }

  if (search) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.artisan.shopName.toLowerCase().includes(search)
    );
  }

  if (minPrice !== null) {
    results = results.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== null) {
    results = results.filter((p) => p.price <= maxPrice);
  }

  if (sort === "price-low-high") {
    results.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high-low") {
    results.sort((a, b) => b.price - a.price);
  } else if (sort === "top-rated") {
    results.sort((a, b) => b.ratingAvg - a.ratingAvg);
  }

  return NextResponse.json({
    products: results,
    total: results.length,
  });
}
