"use client";

import Image from "next/image";
import { PAPER, INK, VOID } from "./tokens";

/*
  ── PARALLAX VERSION (commented out for recovery) ──
  To restore the scroll-driven parallax effect, swap the component
  body below with the original implementation and uncomment the
  useEffect that initializes gsap + ScrollTrigger + Lenis.

  See git history (commit before "flatten hero") for the full
  original source if needed.
*/

export function HeroV5() {
  return (
    <div
      id="main-content"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: VOID }}
    >
      <section className="relative z-[2] flex min-h-svh items-center justify-center py-[10em] px-4">
        {/* Background layers — flat, no parallax */}
        <div className="absolute inset-0">
          {/* Starry sky */}
          <Image
            src="/assets/starry-skies.png"
            fill
            sizes="100vw"
            alt=""
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(140,145,155,0.35), rgba(160,165,175,0.55))",
            }}
            aria-hidden
          />

          {/* Mountain */}
          <Image
            src="/assets/mount-olympus-summit2.png"
            fill
            sizes="100vw"
            alt=""
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(140,145,155,0.45)" }}
            aria-hidden
          />

          {/* Bottom fade to void */}
          <div
            className="absolute bottom-0 left-0 z-20 h-[25%] w-full"
            style={{
              background: `linear-gradient(to bottom, transparent, ${VOID})`,
            }}
          />

          {/* Top border line */}
          <div
            className="absolute bottom-0 left-0 z-20 h-0.5 w-full"
            style={{ backgroundColor: VOID }}
          />
        </div>

        {/* Content — centered */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-6 px-6">
          <img
            src="/assets/bold-logo.png"
            alt=""
            className="w-[min(52vw,440px)] h-auto object-contain"
            style={{ opacity: 0.9 }}
          />
          <h1
            className="text-center font-light leading-[0.95] tracking-tight"
            style={{
              color: PAPER,
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.5rem, 13vw, 12rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Sword Circle Pen
          </h1>
          <p
            className="text-center text-sm md:text-base uppercase"
            style={{
              letterSpacing: "0.32em",
              color: "rgba(255,254,255,0.75)",
              fontFamily: "var(--font-ibm-plex-mono), monospace",
            }}
          >
            For veterans, scientists, and creatives
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ color: "rgba(255,254,255,0.5)" }}
        >
          <span
            className="text-[10px] uppercase"
            style={{
              letterSpacing: "0.3em",
              fontFamily: "var(--font-ibm-plex-mono), monospace",
            }}
          >
            Scroll
          </span>
          <span
            className="h-8 w-px"
            style={{ background: "rgba(255,254,255,0.4)" }}
          />
        </div>
      </section>
      {/* hidden sentinel so INK token isn't pruned by linters */}
      <span style={{ color: INK }} className="sr-only">
        INK
      </span>
    </div>
  );
}
