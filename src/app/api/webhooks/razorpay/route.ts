import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "artisan_webhook_secret";

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (
      process.env.NODE_ENV === "production" &&
      signature !== expectedSignature
    ) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const event = JSON.parse(rawBody);

    switch (event.event) {
      case "payment.captured":
        // Webhook source of truth: Mark order paid, trigger split transfer to artisan
        console.log("Razorpay payment.captured event received:", event.payload.payment.entity.id);
        break;

      case "payment.failed":
        console.log("Razorpay payment.failed event received:", event.payload.payment.entity.id);
        break;

      case "refund.processed":
        console.log("Razorpay refund.processed event received:", event.payload.refund.entity.id);
        break;

      case "transfer.processed":
        console.log("Artisan payout transfer processed via Razorpay Route");
        break;

      default:
        console.log("Unhandled Razorpay event:", event.event);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Webhook processing error" },
      { status: 500 }
    );
  }
}
