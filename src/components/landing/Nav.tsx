'use client';
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Index", href: "#index" },
  { label: "Journal", href: "#work" },
  { label: "Project", href: "#project" },
  { label: "Letter", href: "#letter" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-nav"
      className="sticky top-0 z-50"
      style={{
        background: "var(--paper)",
        borderBottom: "1px solid var(--ink)",
        transition: "box-shadow 200ms ease",
        boxShadow: scrolled ? "0 1px 0 0 var(--ink)" : "none",
      }}
    >
      <div className="grid grid-cols-12 items-stretch">
        <a
          href="#top"
          data-testid="nav-logo"
          className="col-span-6 md:col-span-3 flex items-center px-5 md:px-8 py-5"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="h-7 w-7 grid place-items-center"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              <span className="font-display text-[12px] font-black">N</span>
            </div>
            <span className="font-display font-black tracking-tight text-[15px] uppercase">
              Sword<span className="accent-text">/</span>Circle<span className="accent-text">/</span>Pen
            </span>
          </div>
        </a>

        <div
          className="hidden md:flex col-span-6 items-center gap-10 px-8 py-5"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase()}`}
              className="meta link-underline"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex col-span-3 items-center justify-between px-8 py-5">
          <span className="meta" style={{ color: "var(--muted)" }}>
            Vol · MMXXVI
          </span>
          <a href="#letter" data-testid="nav-cta" className="meta link-underline">
            Subscribe →
          </a>
        </div>

        <button
          data-testid="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden col-span-6 flex items-center justify-end px-5 py-5"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden px-5 pb-6 pt-2 flex flex-col gap-4"
          style={{ borderTop: "1px solid var(--ink)" }}
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="meta"
              onClick={() => setOpen(false)}
            >
              {l.label} →
            </a>
          ))}
          <a href="#letter" className="meta accent-text" onClick={() => setOpen(false)}>
            Subscribe to the Letter →
          </a>
        </div>
      )}
    </header>
  );
}
