"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  id: number;
  slug: string;
  title: string;
  unitPriceCents: number;
};

type LineEntry = { line: CartLine; quantity: number };

type CartCtx = {
  lines: LineEntry[];
  checkoutOpen: boolean;
  step: 1 | 2 | 3;
  addBook: (line: CartLine, qty?: number) => void;
  setQty: (id: number, qty: number) => void;
  removeLine: (id: number) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  setStep: (s: 1 | 2 | 3) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<LineEntry[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const addBook = useCallback((line: CartLine, qty = 1) => {
    setLines((prev) => {
      const i = prev.findIndex((x) => x.line.id === line.id);
      if (i >= 0) {
        const n = [...prev];
        n[i] = { ...n[i], quantity: Math.min(99, n[i].quantity + qty) };
        return n;
      }
      return [...prev, { line, quantity: Math.min(99, Math.max(1, qty)) }];
    });
    setCheckoutOpen(true);
    setStep(1);
  }, []);

  const setQty = useCallback((id: number, qty: number) => {
    setLines((prev) =>
      prev
        .map((x) =>
          x.line.id === id ? { ...x, quantity: Math.max(0, Math.min(99, qty)) } : x,
        )
        .filter((x) => x.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((id: number) => {
    setLines((prev) => prev.filter((x) => x.line.id !== id));
  }, []);

  const openCheckout = useCallback(() => {
    setCheckoutOpen(true);
    setStep(1);
  }, []);

  const closeCheckout = useCallback(() => {
    setCheckoutOpen(false);
    setStep(1);
  }, []);

  const clearCart = useCallback(() => {
    setLines([]);
  }, []);

  const value = useMemo(
    () => ({
      lines,
      checkoutOpen,
      step,
      addBook,
      setQty,
      removeLine,
      openCheckout,
      closeCheckout,
      setStep,
      clearCart,
    }),
    [
      lines,
      checkoutOpen,
      step,
      addBook,
      setQty,
      removeLine,
      openCheckout,
      closeCheckout,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
