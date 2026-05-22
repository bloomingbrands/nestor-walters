"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function EarthDayEulogy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Text reveal
      gsap.utils.toArray<HTMLElement>("[data-eulogy-reveal]").forEach((el) => {
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
      id="earth-day-eulogy"
      className="relative w-full overflow-hidden bg-[url('/assets/earth-day-bg.png')] bg-cover bg-center bg-no-repeat bg-fixed"
      
    >
      {/* Atmospheric layers */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Ocean-depth gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, oklch(0.15 0.03 220 / 0.15) 0%, transparent 60%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, transparent 30%, oklch(0.04 0.003 55 / 0.95) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.06 0.004 55) 0%, transparent 15%, transparent 85%, oklch(0.06 0.004 55) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] px-6 py-20 md:py-28">
        <div
          data-eulogy-reveal
          className="max-w-4xl w-full px-12 py-14 md:px-20 md:py-20 text-center"
          style={{
            backgroundColor: "oklch(0.95 0.022 78)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.45), 0 2px 10px rgba(0,0,0,0.25)",
            border: "1px solid oklch(0.85 0.03 75 / 0.6)",
          }}
        >
          <p
            className="text-sm uppercase tracking-[0.3em] mb-8"
            style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.50 0.04 75)" }}
          >
            Featured Work
          </p>

          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "var(--font-caveat)", color: "oklch(0.20 0.03 60)" }}
          >
            Earth Day Eulogy
          </h2>

          <p
            className="text-base md:text-lg italic leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: "oklch(0.35 0.02 65)" }}
          >
            A warning wrapped in story.
          </p>

          <p
            className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
            style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: "oklch(0.30 0.02 65)" }}
          >
            Earth Day Eulogy explores the emotional and ecological consequences of humanity&apos;s separation from the natural world. Part literary reflection. Part environmental meditation. Part elegy for what may already be disappearing.
          </p>

          <blockquote
            className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-caveat)", color: "oklch(0.40 0.03 65)" }}
          >
            The Earth remembers what humanity forgets.
          </blockquote>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="#earth-day-eulogy"
              className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500"
              style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.35 0.03 65)" }}
            >
              <span className="relative z-10 transition-colors duration-500 group-hover:text-[oklch(0.20_0.03_60)]">Explore Earth Day Eulogy</span>
              <span
                className="absolute inset-0 border transition-all duration-500 group-hover:bg-[oklch(0.88_0.03_75/0.4)]"
                style={{ borderColor: "oklch(0.50 0.03 65 / 0.5)" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
