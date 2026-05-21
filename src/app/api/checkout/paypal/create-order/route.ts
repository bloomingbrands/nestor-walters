import { NextResponse } from "next/server";
import { createOrderBodySchema } from "@/lib/checkout-schema";
import { centsToUsdString, computeOrderTotalCents, paypalCreateOrder } from "@/lib/paypal";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = createOrderBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }
    const { items, shipping } = parsed.data;
    const totalCents = await computeOrderTotalCents(items);
    if (totalCents === null) {
      return NextResponse.json({ error: "Invalid book or missing price_usd in WordPress" }, { status: 400 });
    }
    const totalUsd = centsToUsdString(totalCents);
    const { id } = await paypalCreateOrder(totalUsd);
    return NextResponse.json({ id, totalUsd, shippingEmail: shipping.email });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
