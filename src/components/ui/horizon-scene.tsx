"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HorizonScene() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

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
      aria-labelledby="horizon-heading"
      className="relative w-full overflow-hidden"
    >
      {/* Depth gradient — sky-to-earth, not uniform */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.07 0.005 55) 0%, oklch(0.10 0.012 65 / 0.7) 55%, oklch(0.08 0.006 55) 100%)",
        }}
      />

      {/* Horizon amber glow — low sun, distant, at the fold where earth meets sky */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 45% at 50% 72%, oklch(0.24 0.07 65 / 0.26) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] md:min-h-[90vh] px-6 py-20 md:py-28">
        <div className="w-full max-w-2xl text-center">

          <h2
            id="horizon-heading"
            data-horizon-reveal
            className="mb-8 md:mb-10 leading-tight"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "oklch(0.92 0.005 68)",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
            }}
          >
            The journey continues.
          </h2>

          <p
            data-horizon-reveal
            className="leading-relaxed mb-8 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 300,
              fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
              color: "oklch(0.67 0.006 55)",
            }}
          >
            Through literature, environmental thought, veteran advocacy, and public dialogue, Sword Circle Pen continues to explore what it means to live thoughtfully in a changing world.
          </p>

          {/* Quote — given breathing room and a warmer tone so it lands before the CTAs */}
          <p
            data-horizon-reveal
            className="italic mb-10 max-w-lg mx-auto"
            style={{
              fontFamily: "var(--font-caveat)",
              fontSize: "clamp(1.15rem, 2.8vw, 1.5rem)",
              color: "oklch(0.60 0.06 68 / 0.92)",
              lineHeight: 1.5,
            }}
          >
            Some companions walk beside us through every chapter.
          </p>

          {/* Horizon line — the visual pause between contemplation and action */}
          <div
            data-horizon-reveal
            aria-hidden="true"
            className="mb-10 mx-auto"
            style={{
              width: "min(360px, 70%)",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, oklch(0.42 0.05 68 / 0.55), transparent)",
            }}
          />

          <div
            data-horizon-reveal
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {/* Primary CTA — amber-tinted border and text, set apart from the others */}
            <Link
              href="/blog"
              className="group relative px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 rounded-sm"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: "oklch(0.76 0.09 68)",
              }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[oklch(0.88_0.09_68)]">
                Read the Work
              </span>
              <span
                className="absolute inset-0 transition-all duration-500 group-hover:bg-white/[0.04]"
                style={{
                  border: "1px solid oklch(0.50 0.07 68 / 0.55)",
                }}
              />
            </Link>

            {/* Secondary */}
            <a
              href="mailto:nestor@swordcirclepen.com?subject=Speaking%20Inquiry"
              className="group relative px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 rounded-sm"
              style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.58 0.005 55)" }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white/75">
                Invite to Speak
              </span>
              <span className="absolute inset-0 border border-white/15 transition-all duration-500 group-hover:border-white/28 group-hover:bg-white/[0.03]" />
            </a>

            {/* Secondary */}
            <Link
              href="/#correspondence"
              className="group relative px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 rounded-sm"
              style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.58 0.005 55)" }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-white/75">
                Connect
              </span>
              <span className="absolute inset-0 border border-white/15 transition-all duration-500 group-hover:border-white/28 group-hover:bg-white/[0.03]" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
