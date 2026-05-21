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
      Cart
      {count > 0 ? (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-200/20 px-1.5 text-[10px] font-medium tabular-nums text-amber-100">
          {count}
        </span>
      ) : null}
    </button>
  );
}
