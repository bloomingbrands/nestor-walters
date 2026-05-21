import "server-only";

import { getBookById, getBookPriceUsdCents } from "@/lib/wordpress";

function paypalConfigured(): boolean {
  return Boolean(
    process.env.PAYPAL_API_BASE &&
      process.env.PAYPAL_CLIENT_ID &&
      process.env.PAYPAL_CLIENT_SECRET,
  );
}

export async function getPayPalAccessToken(): Promise<string> {
  const base = process.env.PAYPAL_API_BASE;
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!base || !id || !secret) {
    throw new Error("PayPal is not configured");
  }
  const auth = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal auth failed: ${res.status} ${t}`);
  }
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

/** Sum line totals from WordPress book prices (cents). Returns null if any item invalid. */
export async function computeOrderTotalCents(
  items: { id: number; quantity: number }[],
): Promise<number | null> {
  let total = 0;
  for (const it of items) {
    const book = await getBookById(it.id);
    if (!book) return null;
    const cents = getBookPriceUsdCents(book);
    if (cents === null) return null;
    total += cents * it.quantity;
  }
  return total;
}

export function centsToUsdString(cents: number): string {
  return (cents / 100).toFixed(2);
}

export async function paypalCreateOrder(totalUsd: string): Promise<{ id: string }> {
  if (!paypalConfigured()) throw new Error("PayPal is not configured");
  const token = await getPayPalAccessToken();
  const base = process.env.PAYPAL_API_BASE!;
  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalUsd,
          },
        },
      ],
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal create order failed: ${res.status} ${t}`);
  }
  const data = (await res.json()) as { id: string };
  return { id: data.id };
}

export async function paypalCaptureOrder(orderId: string): Promise<{
  status: string;
  capturedUsd: string;
}> {
  if (!paypalConfigured()) throw new Error("PayPal is not configured");
  const token = await getPayPalAccessToken();
  const base = process.env.PAYPAL_API_BASE!;
  const res = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`PayPal capture failed: ${res.status} ${t}`);
  }
  const data = (await res.json()) as {
    status?: string;
    purchase_units?: {
      payments?: {
        captures?: { amount?: { currency_code?: string; value?: string } }[];
      };
    }[];
  };
  const capture = data.purchase_units?.[0]?.payments?.captures?.[0];
  const value = capture?.amount?.value ?? "0";
  return { status: data.status ?? "UNKNOWN", capturedUsd: value };
}
