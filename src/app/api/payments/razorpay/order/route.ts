import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, paymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Always compute price server-side from integer paise
    const subtotal = items.reduce((acc: number, item: any) => {
      const price = Number(item.product?.price || 0);
      return acc + price * (item.quantity || 1);
    }, 0);

    const deliveryFee = subtotal >= 100000 ? 0 : 8000; // Free above ₹1,000
    const totalPaise = subtotal + deliveryFee;

    // Razorpay order simulation (in test mode, or with real keys if RAZORPAY_KEY_ID exists)
    const razorpayKey = process.env.RAZORPAY_KEY_ID || "rzp_test_artisanconnect";
    const razorpayOrderId = `order_${crypto.randomBytes(8).toString("hex")}`;

    return NextResponse.json({
      success: true,
      razorpayOrderId,
      amount: totalPaise, // in paise
      currency: "INR",
      key: razorpayKey,
      notes: {
        splitCommission: "10%",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}
