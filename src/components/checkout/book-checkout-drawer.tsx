"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { checkoutShippingSchema, type CheckoutShipping } from "@/lib/checkout-schema";
import { useCart } from "@/context/cart-context";
import Link from "next/link";

const emptyShipping: CheckoutShipping = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
};

type BookCheckoutDrawerProps = {
  /** PayPal REST app client id (public); supplied from server env, not `NEXT_PUBLIC_*`. */
  paypalClientId?: string;
};

export function BookCheckoutDrawer({ paypalClientId }: BookCheckoutDrawerProps) {
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const {
    lines,
    checkoutOpen,
    step,
    setStep,
    setQty,
    removeLine,
    closeCheckout,
    clearCart,
  } = useCart();

  const [shipping, setShipping] = useState<CheckoutShipping>(emptyShipping);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCloseCheckout = useCallback(() => {
    setShipping(emptyShipping);
    setSubmitError(null);
    closeCheckout();
  }, [closeCheckout]);

  useEffect(() => {
    if (!checkoutOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseCheckout();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [checkoutOpen, handleCloseCheckout]);

  const itemsPayload = useCallback(
    () => lines.map((x) => ({ id: x.line.id, quantity: x.quantity })),
    [lines],
  );

  const subtotalCents = lines.reduce((s, x) => s + x.line.unitPriceCents * x.quantity, 0);

  const goStep2 = () => {
    setSubmitError(null);
    if (lines.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }
    setStep(2);
  };

  const goStep3 = () => {
    setSubmitError(null);
    const parsed = checkoutShippingSchema.safeParse(shipping);
    if (!parsed.success) {
      setSubmitError("Please complete all shipping fields.");
      return;
    }
    setShipping(parsed.data);
    setStep(3);
  };

  const clientId = paypalClientId;

  if (!checkoutOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[200] bg-black/70 transition-opacity"
        aria-hidden
        onClick={handleCloseCheckout}
      />
      <div
        id={panelId}
        role="dialog"
        aria-modal
        aria-label="Checkout"
        className="fixed inset-y-0 right-0 z-[210] flex w-[min(100%,24rem)] flex-col border-l border-white/10 bg-zinc-950 shadow-[-16px_0_48px_rgba(0,0,0,0.5)]"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Checkout · Step {step} of 3
          </p>
          <button
            ref={closeBtnRef}
            type="button"
            className="text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white"
            onClick={handleCloseCheckout}
          >
            Close
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="font-serif text-xl text-white">Cart</h2>
              {lines.length === 0 ? (
                <p className="text-sm leading-relaxed text-zinc-500">
                  Your cart is empty. Open a book page and choose{" "}
                  <span className="text-zinc-400">Add to cart</span>, or browse{" "}
                  <Link href="/books" className="text-amber-100/90 underline-offset-4 hover:underline">
                    Books
                  </Link>
                  .
                </p>
              ) : (
                <ul className="space-y-4">
                  {lines.map(({ line, quantity }) => (
                    <li
                      key={line.id}
                      className="flex gap-3 border-b border-white/10 pb-4 text-sm text-zinc-300"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white">{line.title}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {(line.unitPriceCents / 100).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}{" "}
                          each
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            className="h-8 w-8 rounded border border-white/20 text-lg leading-none text-zinc-300 hover:bg-white/10"
                            aria-label="Decrease quantity"
                            onClick={() => setQty(line.id, quantity - 1)}
                          >
                            −
                          </button>
                          <span className="w-8 text-center tabular-nums">{quantity}</span>
                          <button
                            type="button"
                            className="h-8 w-8 rounded border border-white/20 text-lg leading-none text-zinc-300 hover:bg-white/10"
                            aria-label="Increase quantity"
                            onClick={() => setQty(line.id, quantity + 1)}
                          >
                            +
                          </button>
                          <button
                            type="button"
                            className="ml-2 text-xs uppercase tracking-wider text-zinc-500 underline-offset-2 hover:text-white hover:underline"
                            onClick={() => removeLine(line.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-sm text-zinc-400">
                Subtotal:{" "}
                <span className="text-white">
                  {(subtotalCents / 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </p>
              {submitError ? <p className="text-sm text-amber-200/90">{submitError}</p> : null}
              <button
                type="button"
                className="w-full rounded border border-white/20 bg-white/10 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/15"
                onClick={goStep2}
              >
                Next · Shipping
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <h2 className="font-serif text-xl text-white">Shipping</h2>
              <div className="grid gap-3">
                {(
                  [
                    ["fullName", "Full name"],
                    ["email", "Email"],
                    ["phone", "Phone"],
                    ["address1", "Address line 1"],
                    ["address2", "Address line 2 (optional)"],
                    ["city", "City"],
                    ["state", "State / province"],
                    ["postalCode", "Postal code"],
                    ["country", "Country"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="block text-xs text-zinc-500">
                    <span className="mb-1 block uppercase tracking-wider">{label}</span>
                    <input
                      className="mt-1 w-full rounded border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none ring-amber-200/30 focus:border-amber-200/40 focus:ring-1"
                      value={String(shipping[key as keyof CheckoutShipping] ?? "")}
                      onChange={(e) =>
                        setShipping((s) => ({ ...s, [key]: e.target.value }) as CheckoutShipping)
                      }
                    />
                  </label>
                ))}
              </div>
              {submitError ? <p className="text-sm text-amber-200/90">{submitError}</p> : null}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="flex-1 rounded border border-white/15 py-3 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="flex-1 rounded border border-white/20 bg-white/10 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/15"
                  onClick={goStep3}
                >
                  Next · Pay
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <h2 className="font-serif text-xl text-white">Pay with PayPal</h2>
              <p className="text-xs leading-relaxed text-zinc-500">
                You will complete payment on PayPal. By continuing you agree to pay the subtotal
                shown for the books in your cart plus any taxes PayPal applies.
              </p>
              {!clientId ? (
                <p className="text-sm text-amber-200/90">
                  PayPal is not configured. Set PAYPAL_CLIENT_ID and other PayPal server variables
                  in your environment (see .env.example).
                </p>
              ) : (
                <PayPalScriptProvider options={{ clientId, currency: "USD" }}>
                  <PayPalButtons
                    style={{ layout: "vertical", shape: "rect" }}
                    createOrder={async () => {
                      const parsed = checkoutShippingSchema.safeParse(shipping);
                      if (!parsed.success) {
                        throw new Error("Invalid shipping");
                      }
                      const res = await fetch("/api/checkout/paypal/create-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          items: itemsPayload(),
                          shipping: parsed.data,
                        }),
                      });
                      const data = (await res.json()) as { id?: string; error?: string };
                      if (!res.ok) throw new Error(data.error ?? "Create order failed");
                      if (!data.id) throw new Error("No order id");
                      return data.id;
                    }}
                    onApprove={async (data) => {
                      setSubmitError(null);
                      const parsed = checkoutShippingSchema.safeParse(shipping);
                      if (!parsed.success) {
                        setSubmitError("Shipping invalid");
                        return;
                      }
                      const res = await fetch("/api/checkout/paypal/capture-order", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          orderID: data.orderID,
                          items: itemsPayload(),
                          shipping: parsed.data,
                        }),
                      });
                      const out = (await res.json()) as { ok?: boolean; error?: string };
                      if (!res.ok) {
                        setSubmitError(out.error ?? "Payment failed");
                        return;
                      }
                      clearCart();
                      handleCloseCheckout();
                    }}
                  />
                </PayPalScriptProvider>
              )}
              <button
                type="button"
                className="w-full rounded border border-white/15 py-3 text-xs uppercase tracking-[0.2em] text-zinc-400 hover:text-white"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              {submitError ? <p className="text-sm text-amber-200/90">{submitError}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
