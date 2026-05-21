import "server-only";

import { Resend } from "resend";
import type { CheckoutItem, CheckoutShipping } from "@/lib/checkout-schema";
import { getBookById, getBookPriceUsdCents, wpPlainText } from "@/lib/wordpress";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendOrderNotificationEmail(params: {
  items: CheckoutItem[];
  shipping: CheckoutShipping;
  paypalOrderId: string;
  captureStatus: string;
  capturedUsd: string;
}): Promise<void> {
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  const from = process.env.RESEND_FROM_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!to || !from || !key) {
    if (process.env.NODE_ENV === "development") {
      console.warn("ORDER_NOTIFICATION_EMAIL, RESEND_FROM_EMAIL, or RESEND_API_KEY missing — skip email");
    }
    return;
  }

  const lines: string[] = [];
  for (const it of params.items) {
    const book = await getBookById(it.id);
    const title = book
      ? book.acf?.title ?? wpPlainText(book.title.rendered)
      : `Book #${it.id}`;
    const cents = book ? getBookPriceUsdCents(book) : null;
    const unit = cents !== null ? (cents / 100).toFixed(2) : "?";
    lines.push(
      `<tr><td>${escapeHtml(title)}</td><td>${it.quantity}</td><td>$${unit}</td></tr>`,
    );
  }

  const s = params.shipping;
  const html = `
  <h1>New book order</h1>
  <p><strong>PayPal order</strong> ${escapeHtml(params.paypalOrderId)} — status ${escapeHtml(params.captureStatus)}, captured <strong>$${escapeHtml(params.capturedUsd)}</strong> USD</p>
  <h2>Buyer</h2>
  <p>${escapeHtml(s.fullName)}<br/>
  <a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a><br/>
  ${escapeHtml(s.phone)}</p>
  <h2>Shipping</h2>
  <p>${escapeHtml(s.address1)}${s.address2 ? `<br/>${escapeHtml(s.address2)}` : ""}<br/>
  ${escapeHtml(s.city)}, ${escapeHtml(s.state)} ${escapeHtml(s.postalCode)}<br/>
  ${escapeHtml(s.country)}</p>
  <h2>Items</h2>
  <table border="1" cellpadding="6"><thead><tr><th>Title</th><th>Qty</th><th>Unit USD</th></tr></thead><tbody>${lines.join("")}</tbody></table>
  `;

  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    subject: `Book order — $${params.capturedUsd} — ${s.fullName}`,
    html,
  });
  if (error) {
    console.error("Resend error", error);
    throw new Error(error.message);
  }
}
