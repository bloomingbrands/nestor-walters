"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SpeakingScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    const ctx = gsap.context(() => {
      // Spotlight intensifies as section enters viewport
      gsap.fromTo(
        spotlight,
        { opacity: 0.3, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "center center",
            scrub: 1,
          },
        }
      );

      // Floating fragments: gentle scroll-linked drift
      gsap.utils.toArray<HTMLElement>("[data-speaker-fragment]").forEach((el, i) => {
        const yDir = i % 2 === 0 ? -25 : -45;
        gsap.fromTo(
          el,
          { yPercent: 15, opacity: 0 },
          {
            yPercent: yDir,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      // Audience silhouettes fade in
      gsap.utils.toArray<HTMLElement>("[data-speaker-audience]").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 10, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "40% bottom",
              end: "70% center",
              scrub: 0.8,
            },
          }
        );
      });

      // Text reveal
      gsap.utils.toArray<HTMLElement>("[data-speaker-reveal]").forEach((el) => {
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
      id="speaking"
      aria-labelledby="speaking-heading"
      className="relative w-full overflow-hidden bg-[url('/assets/speaking-event.png')] motion-safe:bg-fixed motion-reduce:bg-scroll bg-left bg-no-repeat bg-cover"
    >
      {/* Dark scrim — ensures 4.5:1 contrast for all text against the background image */}
      <div aria-hidden="true" className="absolute inset-0 z-20 bg-black/70" />
      <div className="relative z-30 flex flex-col items-center justify-center min-h-[90vh] md:min-h-[100vh] px-6 py-20 md:py-28">
        {/* Stage figure silhouette */}
        <div data-speaker-reveal className="relative mb-12 md:mb-16">
          <div
            className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full"
          />
          {/* Subtle shoulders suggestion */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 md:w-28 h-8 md:h-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, oklch(0.3 0.02 55 / 0.4), transparent 70%)",
              filter: "blur(4px)",
            }}
          />
        </div>

        <div className="max-w-3xl text-center">
          <p
            data-speaker-reveal
            className="text-xs uppercase tracking-[0.3em] mb-6"
            style={{
              fontFamily: "var(--font-geist-mono)",
              color: "oklch(0.78 0.08 55)",
            }}
          >
            Lectures &amp; Appearances
          </p>

          <h2
            id="speaking-heading"
            data-speaker-reveal
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight"
            style={{
              fontFamily: "var(--font-caveat)",
              color: "oklch(0.94 0.003 55)",
            }}
          >
            The voice between service and scholarship
          </h2>

          <p
            data-speaker-reveal
              className="text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 300,
              color: "oklch(0.78 0.006 55)",
            }}
          >
            Nestor Walters speaks on veteran transition, the ethics of environmental
            stewardship, and the discipline of attention that both military service and
            literary craft demand. His lectures move between memoir and argument,
            personal testimony and collective responsibility.
          </p>

          <p
            data-speaker-reveal
              className="text-sm leading-relaxed mb-12 max-w-xl mx-auto"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 300,
              color: "oklch(0.80 0.008 55)",
            }}
          >
            Available for university keynotes, panel discussions, veteran transition
            workshops, and literary readings. Each engagement is shaped to the
            audience, the occasion, and the room.
          </p>

          <div
            data-speaker-reveal
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <a
              href="mailto:nestor@swordcirclepen.com?subject=Speaking%20Inquiry"
              className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white rounded-sm"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: "oklch(0.94 0.003 55)",
              }}
            >
              <span className="relative z-10">Inquire About Speaking</span>
              <span
                className="absolute inset-0 border transition-all duration-500 group-hover:bg-white/5"
                style={{ borderColor: "oklch(0.65 0.08 55 / 0.4)" }}
              />
            </a>
            <span
              className="text-[10px] uppercase tracking-[0.2em]"
              style={{
                fontFamily: "var(--font-geist-mono)",
                color: "oklch(0.80 0.008 55)",
              }}
            >
              Universities · Conferences · Veteran Organizations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
