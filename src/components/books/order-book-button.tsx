"use client";

import { useCart, type CartLine } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type Props = {
  line: CartLine | null;
  className?: string;
};

export function OrderBookButton({ line, className }: Props) {
  const { addBook } = useCart();

  if (!line) {
    return (
      <button
        type="button"
        disabled
        className={cn(
          "inline-flex cursor-not-allowed rounded border border-white/10 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.22em] text-zinc-500",
          className,
        )}
        title="Checkout opens once a price is set for this book in WordPress"
      >
        Add to cart
      </button>
    );
  }

  return (
    <button
      type="button"
      className={cn(
        "inline-flex rounded border border-amber-200/40 bg-amber-200/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-amber-100 transition-colors hover:border-amber-200/60 hover:bg-amber-200/15",
        className,
      )}
      onClick={() => addBook(line, 1)}
    >
      Add to cart
    </button>
  );
}
