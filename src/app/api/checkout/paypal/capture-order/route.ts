import { NextResponse } from "next/server";
import { captureOrderBodySchema } from "@/lib/checkout-schema";
import { centsToUsdString, computeOrderTotalCents, paypalCaptureOrder } from "@/lib/paypal";
import { sendOrderNotificationEmail } from "@/lib/order-email";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = captureOrderBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }
    const { orderID, items, shipping } = parsed.data;

    const expectedCents = await computeOrderTotalCents(items);
    if (expectedCents === null) {
      return NextResponse.json({ error: "Invalid book or missing price" }, { status: 400 });
    }
    const expectedUsd = centsToUsdString(expectedCents);

    const capture = await paypalCaptureOrder(orderID);
    const got = parseFloat(capture.capturedUsd);
    const exp = parseFloat(expectedUsd);
    if (!Number.isFinite(got) || Math.abs(got - exp) > 0.02) {
      return NextResponse.json(
        { error: "Captured amount does not match order", expected: expectedUsd, captured: capture.capturedUsd },
        { status: 400 },
      );
    }

    try {
      await sendOrderNotificationEmail({
        items,
        shipping,
        paypalOrderId: orderID,
        captureStatus: capture.status,
        capturedUsd: capture.capturedUsd,
      });
    } catch (e) {
      console.error("Order notification email failed:", e);
    }

    return NextResponse.json({ ok: true, status: capture.status, capturedUsd: capture.capturedUsd });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
