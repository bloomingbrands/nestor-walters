"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PAPER, STONE, INK, VOID, MONO, SANS, SLATE } from "./tokens";

type Item = { label: string; href: string; section?: string };

const ITEMS: Item[] = [
  { label: "Journal", href: "/journal" },
  { label: "Veterans", href: "/veterans-transfer-project", section: "pillars" },
  { label: "Science", href: "/science", section: "pillars" },
  { label: "Writing", href: "/writing", section: "writing" },
  { label: "About", href: "/#about", section: "about" },
];

const SECTIONS = ["pillars", "writing", "about", "newsletter"];

export function NavV5() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const menu = menuRef.current;
    const hamburger = hamburgerRef.current;
    setTimeout(() => {
      const firstLink = menu?.querySelector("a");
      firstLink?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setTimeout(() => hamburger?.focus(), 0);
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = menu?.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || menuOpen;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 transition-all"
        style={{
          backgroundColor: solid ? "rgba(241,241,243,0.96)" : "transparent",
          borderBottom: solid ? `1px solid ${STONE}` : "1px solid transparent",
          backdropFilter: solid ? "blur(10px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-12 py-4">
          <Link
            href="/"
            className="text-[10px] sm:text-[11px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: solid ? VOID : PAPER,
              mixBlendMode: solid ? "normal" : "difference",
            }}
          >
            Sword Circle Pen
          </Link>

          <nav className="hidden md:flex items-center gap-7">
            {ITEMS.map((it) => {
              const isActive =
                (isHome && it.section && active === it.section) ||
                (!isHome && pathname === it.href) ||
                (isHome && !active && it.label === "Journal");
              const baseColor = solid ? (isActive ? VOID : INK) : PAPER;
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  className="relative text-[11px] uppercase transition-colors"
                  style={{
                    fontFamily: MONO,
                    letterSpacing: "0.28em",
                    color: baseColor,
                    mixBlendMode: solid ? "normal" : "difference",
                    opacity: isActive ? 1 : 0.85,
                  }}
                >
                  {it.label}
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute -bottom-1.5 left-0 right-0 h-px"
                      style={{ backgroundColor: solid ? VOID : PAPER }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/#book"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase transition-colors"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.28em",
              color: solid ? PAPER : VOID,
              backgroundColor: solid ? VOID : PAPER,
            }}
          >
            Order the book
          </Link>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden inline-flex flex-col items-end justify-center gap-1.5 p-2 -mr-2"
          >
            <span
              aria-hidden
              className="block h-px transition-all"
              style={{
                width: 22,
                backgroundColor: solid ? VOID : PAPER,
                transform: menuOpen
                  ? "translateY(6px) rotate(45deg)"
                  : "none",
                mixBlendMode: solid ? "normal" : "difference",
              }}
            />
            <span
              aria-hidden
              className="block h-px transition-all"
              style={{
                width: menuOpen ? 22 : 16,
                backgroundColor: solid ? VOID : PAPER,
                opacity: menuOpen ? 0 : 1,
                mixBlendMode: solid ? "normal" : "difference",
              }}
            />
            <span
              aria-hidden
              className="block h-px transition-all"
              style={{
                width: 22,
                backgroundColor: solid ? VOID : PAPER,
                transform: menuOpen
                  ? "translateY(-6px) rotate(-45deg)"
                  : "none",
                mixBlendMode: solid ? "normal" : "difference",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-30 md:hidden flex flex-col"
          style={{
            backgroundColor: PAPER,
            paddingTop: "64px",
          }}
        >
          <nav className="flex flex-col px-5 pt-8 pb-10 gap-5 overflow-y-auto">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.4em",
                color: SLATE,
              }}
            >
              Navigate
            </p>
            {ITEMS.map((it) => {
              const isActive =
                (isHome && it.section && active === it.section) ||
                (!isHome && pathname === it.href) ||
                (isHome && !active && it.label === "Journal");
              return (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between border-b py-3"
                  style={{ borderColor: STONE }}
                >
                  <span
                    style={{
                      fontFamily: SANS,
                      fontSize: "1.5rem",
                      letterSpacing: "-0.02em",
                      color: isActive ? VOID : INK,
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {it.label}
                  </span>
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      fontFamily: MONO,
                      letterSpacing: "0.3em",
                      color: SLATE,
                    }}
                  >
                    {isActive ? "Now" : "→"}
                  </span>
                </Link>
              );
            })}

            <Link
              href="/#book"
              onClick={() => setMenuOpen(false)}
              className="mt-6 inline-flex w-full items-center justify-center gap-3 px-5 py-4 text-[12px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: PAPER,
                backgroundColor: VOID,
              }}
            >
              Order the book
              <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
