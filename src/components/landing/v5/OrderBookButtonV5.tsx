"use client";

import { useCart, type CartLine } from "@/context/cart-context";
import { PAPER, STONE, INK, VOID, MONO } from "./tokens";

type Props = {
  line: CartLine | null;
};

export function OrderBookButtonV5({ line }: Props) {
  const { addBook } = useCart();

  if (!line) {
    return (
      <button
        type="button"
        aria-disabled="true"
        title="Checkout opens once a price is set for this book"
        className="inline-flex w-fit cursor-not-allowed items-center gap-3 px-6 py-3 text-[11px] uppercase opacity-50"
        style={{
          fontFamily: MONO,
          letterSpacing: "0.3em",
          color: INK,
          backgroundColor: PAPER,
          border: `1px solid ${STONE}`,
        }}
      >
        Order the book
        <span aria-hidden>→</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => addBook(line, 1)}
      className="inline-flex w-fit items-center gap-3 px-6 py-3 text-[11px] uppercase transition-colors hover:opacity-90"
      style={{
        fontFamily: MONO,
        letterSpacing: "0.3em",
        color: PAPER,
        backgroundColor: VOID,
        border: `1px solid ${VOID}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = INK;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = VOID;
      }}
    >
      Order the book
      <span aria-hidden>→</span>
    </button>
  );
}
