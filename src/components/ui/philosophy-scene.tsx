"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PhilosophyScene() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>("[data-philosophy-reveal]");
      gsap.fromTo(
        elements,
        { y: prefersReduced ? 0 : 40, opacity: prefersReduced ? 1 : 0 },
        {
          y: 0,
          opacity: 1,
          duration: prefersReduced ? 0 : 0.9,
          ease: "power3.out",
          stagger: prefersReduced ? 0 : 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ backgroundColor: "oklch(0.08 0.005 55)" }}
    >
      {/* Warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.18 0.03 55 / 0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 items-center justify-center px-6 py-20 md:py-28">
        <div className="w-full max-w-xl text-center">
          <h2
            data-philosophy-reveal
            className="text-4xl md:text-6xl lg:text-7xl text-center mb-16 md:mb-24"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "oklch(0.94 0.003 55)",
            }}
          >
            Sword. Circle. Pen.
          </h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16 mb-16 md:mb-24">
            {/* Sword */}
            <div className="flex flex-col items-center gap-4" data-philosophy-reveal>
              <span
                className="text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "oklch(0.94 0.003 55)",
                }}
              aria-hidden="true"
              >
                ⚔
              </span>
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "oklch(0.65 0.08 55)",
                }}
              >
                SWORD
              </p>
              <div className="space-y-1 text-center">
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Discipline.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Sacrifice.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Service.
                </p>
              </div>
            </div>

            {/* Circle */}
            <div className="flex flex-col items-center gap-4" data-philosophy-reveal>
              <span
                className="text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "oklch(0.94 0.003 55)",
                }}
              aria-hidden="true"
              >
                ◯
              </span>
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "oklch(0.65 0.08 55)",
                }}
              >
                CIRCLE
              </p>
              <div className="space-y-1 text-center">
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Humanity.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Earth.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Continuity.
                </p>
              </div>
            </div>

            {/* Pen */}
            <div className="flex flex-col items-center gap-4" data-philosophy-reveal>
              <span
                className="text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: "oklch(0.94 0.003 55)",
                }}
              aria-hidden="true"
              >
                ✎
              </span>
              <p
                className="text-xs uppercase tracking-[0.3em]"
                style={{
                  fontFamily: "var(--font-geist-mono)",
                  color: "oklch(0.65 0.08 55)",
                }}
              >
                PEN
              </p>
              <div className="space-y-1 text-center">
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Reflection.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Creation.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                    color: "oklch(0.70 0.006 55)",
                  }}
                >
                  Legacy.
                </p>
              </div>
            </div>
          </div>

          <p
            data-philosophy-reveal
            className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 300,
              color: "oklch(0.70 0.006 55)",
            }}
          >
            A philosophy shaped by service, humanity, and the enduring power of thought.
          </p>
        </div>
      </div>
    </section>
  );
}
