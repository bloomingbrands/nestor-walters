"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PAPER, STONE, INK, VOID, MONO } from "./tokens";

type Item = { label: string; href: string; section?: string };

const ITEMS: Item[] = [
  { label: "Veterans", href: "/v5/veterans-transfer-project", section: "pillars" },
  { label: "Science", href: "/v5/science", section: "pillars" },
  { label: "Writing", href: "/v5/writing", section: "writing" },
  { label: "The Book", href: "/v5#book", section: "book" },
  { label: "Newsletter", href: "/v5#newsletter", section: "newsletter" },
];

const SECTIONS = ["pillars", "book", "writing", "newsletter"];

export function NavV5() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/v5") return;

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

  const isHome = pathname === "/v5";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 transition-all"
      style={{
        backgroundColor:
          scrolled || !isHome ? "rgba(255,254,255,0.92)" : "transparent",
        borderBottom:
          scrolled || !isHome
            ? `1px solid ${STONE}`
            : "1px solid transparent",
        backdropFilter: scrolled || !isHome ? "blur(10px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12 py-4">
        <Link
          href="/v5"
          className="text-[11px] uppercase"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.32em",
            color: scrolled || !isHome ? VOID : PAPER,
            mixBlendMode: scrolled || !isHome ? "normal" : "difference",
          }}
        >
          Sword · Circle · Pen
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {ITEMS.map((it) => {
            const isActive =
              (isHome && it.section && active === it.section) ||
              (!isHome && pathname === it.href);
            const baseColor =
              scrolled || !isHome ? (isActive ? VOID : INK) : PAPER;
            return (
              <Link
                key={it.href}
                href={it.href}
                className="relative text-[11px] uppercase transition-colors"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.28em",
                  color: baseColor,
                  mixBlendMode:
                    scrolled || !isHome ? "normal" : "difference",
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {it.label}
                {isActive && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1.5 left-0 right-0 h-px"
                    style={{
                      backgroundColor:
                        scrolled || !isHome ? VOID : PAPER,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/v5#book"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-[10px] uppercase transition-colors"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.28em",
            color: scrolled || !isHome ? PAPER : VOID,
            backgroundColor: scrolled || !isHome ? VOID : PAPER,
          }}
        >
          Order the book
        </Link>
      </div>
    </header>
  );
}
