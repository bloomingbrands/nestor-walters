"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HorizonScene() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-horizon-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="horizon"
      className="relative w-full overflow-hidden"
    >
      {/* Warm gradient at top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.12 0.02 75 / 0.1) 0%, oklch(0.08 0.005 55) 40%)",
        }}
      />

      {/* Atmospheric center glow — subtle sunrise warmth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.65 0.08 55 / 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] md:min-h-[90vh] px-6 py-20 md:py-28">
        <div className="max-w-3xl text-center">
          <h2
            data-horizon-reveal
            className="text-4xl md:text-6xl lg:text-7xl mb-8 md:mb-10 leading-tight"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "oklch(0.94 0.003 55)",
            }}
          >
            The journey continues.
          </h2>

          <p
            data-horizon-reveal
            className="text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 300,
              color: "oklch(0.70 0.006 55)",
            }}
          >
            Through literature, environmental thought, veteran advocacy, and public dialogue, Sword Circle Pen continues to explore what it means to live thoughtfully in a changing world.
          </p>

          <p
            data-horizon-reveal
            className="text-base md:text-lg italic mb-12 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "oklch(0.65 0.06 55 / 0.7)",
            }}
          >
            Some companions walk beside us through every chapter.
          </p>

          <div
            data-horizon-reveal
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              href="/blog"
              className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors duration-500 hover:text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span className="relative z-10">Read the Work</span>
              <span className="absolute inset-0 border border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/5" />
            </Link>
            <a
              href="mailto:nestor@swordcirclepen.com?subject=Speaking%20Inquiry"
              className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors duration-500 hover:text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span className="relative z-10">Invite to Speak</span>
              <span className="absolute inset-0 border border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/5" />
            </a>
            <Link
              href="/#correspondence"
              className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] text-white/80 transition-colors duration-500 hover:text-white"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              <span className="relative z-10">Connect</span>
              <span className="absolute inset-0 border border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
