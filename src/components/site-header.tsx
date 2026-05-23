"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useCallback, useEffect, useId, useRef, useState } from "react";
import { HeaderCartButton } from "@/components/books/header-cart-button";
import { fontBedross } from "@/fonts/bedross";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Journal" },
  { href: "/books", label: "Books" },
  { href: "/#speaking", label: "Speaking" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      const panel = document.getElementById(panelId);
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        (last as HTMLElement).focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        (first as HTMLElement).focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, close, panelId]);

  useEffect(() => {
    startTransition(() => {
      close();
    });
  }, [pathname, close]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/10 bg-zinc-950/90 backdrop-blur-md" style={{ transform: "translateZ(0)" }}>
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 md:h-16 md:px-6">
          <Link
            href="/"
            className={cn(
              fontBedross.className,
              "shrink-0 text-lg text-zinc-200 transition-colors hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]",
            )}
          >
            Sword Circle Pen
          </Link>

          <div className="flex shrink-0 items-center gap-5 md:gap-8">
            <nav
              className="hidden items-center gap-8 md:flex md:gap-10"
              aria-label="Main"
            >
              {NAV.map(({ href, label }) => {
                const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-xs uppercase tracking-[0.2em] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded-sm",
                      active ? "text-white" : "text-zinc-200 hover:text-white",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <HeaderCartButton className="max-md:hidden" />
            <div className="flex items-center gap-3 md:hidden">
              <HeaderCartButton />
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/15 bg-white/5 text-zinc-200 transition-colors hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? "Close" : "Menu"}</span>
                <span className="flex h-3.5 w-5 flex-col justify-between" aria-hidden>
                  <span
                    className={cn(
                      "h-px origin-center bg-current transition-transform duration-200",
                      open && "translate-y-[6px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px bg-current transition-opacity duration-200",
                      open && "opacity-0",
                    )}
                  />
                  <span
                    className={cn(
                      "h-px origin-center bg-current transition-transform duration-200",
                      open && "translate-y-[-6px] -rotate-45",
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-[oklch(0.08_0.005_55)]/70 transition-opacity duration-300 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!open}
        onClick={close}
      />

      <div
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        className={cn(
          "fixed top-14 right-0 bottom-0 z-[45] flex w-[min(100%,20rem)] flex-col border-l border-white/10 bg-zinc-950 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out md:top-16 md:hidden",
          open ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        <div className="flex h-14 shrink-0 items-center justify-end border-b border-white/10 px-4">
          <button
            ref={closeBtnRef}
            type="button"
            className="text-xs uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-white"
            onClick={close}
          >
            Close
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-6" aria-label="Mobile main">
          <div className="border-b border-white/5 py-4">
            <HeaderCartButton onOpen={close} />
          </div>
          {NAV.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b border-white/5 py-4 text-sm uppercase tracking-[0.2em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50",
                  active ? "text-white" : "text-zinc-400 hover:text-zinc-100",
                )}
                onClick={close}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
