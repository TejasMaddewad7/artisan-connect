import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper for status text
function getStatusText(status: string): string {
  switch (status) {
    case "CONFIRMED":
      return "Order confirmed & assigned to artisan studio for crafting";
    case "PROCESSING":
      return "Artisan is actively crafting / packaging your order";
    case "SHIPPED":
      return "Shipped with courier tracking";
    case "DELIVERED":
      return "Delivered safely";
    case "CANCELLED":
      return "Order cancelled";
    default:
      return "Order placed";
  }
}

// GET - Fetch user's orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "userId is required" }, { status: 400 });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: { orderBy: { order: "asc" }, take: 1 },
                artisan: {
                  select: { id: true, shopName: true, slug: true },
                },
                category: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const transformed = orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      createdAt: o.createdAt.toISOString(),
      status: o.status,
      statusText: getStatusText(o.status),
      items: o.items.map((i) => ({
        product: {
          ...i.product,
          artisan: { ...i.product.artisan, memberSince: "2026" },
          createdAt: i.product.createdAt.toISOString(),
          updatedAt: i.product.updatedAt.toISOString(),
        },
        quantity: i.quantity,
        price: i.priceAtPurchase,
      })),
      subtotal: o.subtotal,
      deliveryFee: o.deliveryFee,
      codFee: 0,
      total: o.total,
      paymentMethod: o.paymentMethod,
      shippingAddress: {
        fullName: "Customer",
        phone: "",
        email: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",
      },
      courier: "Delhivery Surface (Eco-wrap)",
      trackingNumber: `DLV-${o.id.slice(-8).toUpperCase()}`,
      estimatedDelivery: "Expected in 3-5 business days",
    }));

    return NextResponse.json({ orders: transformed });
  } catch (error) {
    console.error("Orders GET error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST - Create a new order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, items, paymentMethod, shippingAddress, subtotal, deliveryFee, codFee, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required to place order" },
        { status: 400 }
      );
    }

    // Resolve or create user if needed
    let validUserId = userId;
    if (!validUserId && shippingAddress?.email) {
      let existing = await prisma.user.findUnique({
        where: { email: shippingAddress.email.toLowerCase().trim() },
      });
      if (!existing) {
        existing = await prisma.user.create({
          data: {
            email: shippingAddress.email.toLowerCase().trim(),
            name: shippingAddress.fullName || "Customer",
            phone: shippingAddress.phone || null,
            role: "CUSTOMER",
          },
        });
      }
      validUserId = existing.id;
    }

    if (!validUserId) {
      return NextResponse.json(
        { error: "Valid user or contact email is required to place an order" },
        { status: 400 }
      );
    }

    const orderNumber = `AC-${Math.floor(100000 + Math.random() * 900000)}`;

    // Create the order with items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: validUserId,
          status: paymentMethod === "COD" ? "CONFIRMED" : "PENDING_PAYMENT",
          subtotal,
          deliveryFee: deliveryFee || 0,
          discount: 0,
          tax: 0,
          total,
          paymentMethod: paymentMethod || "RAZORPAY",
          paymentStatus: paymentMethod === "COD" ? "PENDING" : "PAID",
          items: {
            create: items.map((item: { productId: string; quantity: number; priceAtPurchase: number }) => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: item.priceAtPurchase,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  artisan: true,
                  images: { take: 1 },
                },
              },
            },
          },
        },
      });

      return newOrder;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
