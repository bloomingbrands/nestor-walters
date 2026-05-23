"use client";

import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onOpen?: () => void;
};

export function HeaderCartButton({ className, onOpen }: Props) {
  const { lines, openCheckout } = useCart();
  const count = lines.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <button
      type="button"
      onClick={() => {
        openCheckout();
        onOpen?.();
      }}
      className={cn(
        "relative inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-200 transition-colors hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]",
        className,
      )}
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Open cart"}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 6h15l-1.5 9h-12z" />
        <circle cx="9" cy="20" r="1" />
        <circle cx="18" cy="20" r="1" />
        <path d="M6 6L5 3H2" />
      </svg>
      {count > 0 ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-200/20 px-1.5 text-[10px] font-medium tabular-nums text-amber-100">
          {count}
        </span>
      ) : null}
    </button>
  );
}
