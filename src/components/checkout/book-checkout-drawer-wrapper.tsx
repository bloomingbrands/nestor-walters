import { BookCheckoutDrawer } from "@/components/checkout/book-checkout-drawer";

/**
 * Loads PayPal client id on the server only (no `NEXT_PUBLIC_*` in the client bundle).
 * The id is still sent to the browser inside PayPal’s SDK — that is expected for OAuth public clients.
 */
export function BookCheckoutDrawerWrapper() {
  const paypalClientId = process.env.PAYPAL_CLIENT_ID?.trim() || undefined;
  return <BookCheckoutDrawer paypalClientId={paypalClientId} />;
}
