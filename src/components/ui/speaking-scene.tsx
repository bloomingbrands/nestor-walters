"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FloatingFragmentProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  rotateRange?: [number, number];
}

function FloatingFragment({
  children,
  className = "",
  style,
  delay = 0,
  duration = 20,
  xRange = [-20, 20],
  yRange = [-15, 15],
  rotateRange = [-3, 3],
}: FloatingFragmentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(ref.current, {
      x: gsap.utils.random(xRange[0], xRange[1]),
      y: gsap.utils.random(yRange[0], yRange[1]),
      rotation: gsap.utils.random(rotateRange[0], rotateRange[1]),
      duration: duration + gsap.utils.random(-5, 5),
      ease: "sine.inOut",
      delay,
    });

    return () => { tl.kill(); };
  }, [delay, duration, xRange, yRange, rotateRange]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

const QUOTES = [
  {
    text: "a real poet doesn't slip into a sleeve-holed sleeping bag",
    source: "Some Days",
  },
  {
    text: "we rise, together, one more time",
    source: "In The Boot Camp Laundry Room",
  },
  {
    text: "grey light bands his closed door with no silver at the edges",
    source: "Homecoming",
  },
  {
    text: "stare at an empty page on the dining table, scrape dried food",
    source: "Some Days",
  },
  {
    text: "The boy and I face the same wall streaked with old, white, lead paint",
    source: "In The Boot Camp Laundry Room",
  },
  {
    text: "he left one foot in the sand. wait, a head no, a hand",
    source: "Homecoming",
  },
];

export function SpeakingScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const fragmentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
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
      className="relative w-full overflow-hidden"
      
    >
      {/* Atmospheric base layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, oklch(0.12 0.008 55 / 0.3) 0%, oklch(0.06 0.004 55) 60%)",
          }}
        />
        {/* Edge darkness */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, transparent 30%, oklch(0.04 0.003 55 / 0.9) 100%)",
          }}
        />
      </div>

      {/* Central spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "140%",
          height: "120%",
          background:
            "radial-gradient(ellipse at 50% 35%, oklch(0.85 0.06 75 / 0.08) 0%, oklch(0.65 0.08 55 / 0.04) 15%, transparent 45%)",
        }}
      />

      {/* Stage floor glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "100%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 50% 100%, oklch(0.55 0.06 55 / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Floating quote fragments */}
      <div ref={fragmentsRef} className="absolute inset-0 pointer-events-none">
        {QUOTES.map((quote, i) => {
          const positions = [
            { top: "8%", left: "6%", align: "text-left" as const },
            { top: "15%", right: "8%", align: "text-right" as const },
            { top: "38%", left: "3%", align: "text-left" as const },
            { top: "45%", right: "5%", align: "text-right" as const },
            { top: "62%", left: "10%", align: "text-left" as const },
            { top: "55%", right: "12%", align: "text-right" as const },
          ];
          const pos = positions[i];
          return (
            <FloatingFragment
              key={i}
              className="absolute z-20"
              style={{ top: pos.top, left: pos.left, right: pos.right } as React.CSSProperties}
              delay={i * 1.5}
              duration={18 + i * 2}
              xRange={[-12, 12]}
              yRange={[-8, 8]}
              rotateRange={[-2, 2]}
            >
              <div
                data-speaker-fragment
                className={`max-w-[16rem] md:max-w-[18rem] ${pos.align}`}
                style={{
                  transform: `rotate(${-1.5 + i}deg)`,
                }}
              >
                <p
                  className="text-[11px] md:text-xs leading-relaxed text-white/60 italic"
                  style={{
                    fontFamily: "var(--font-caveat)",
                    textWrap: "balance",
                  }}
                >
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p
                  className="mt-1.5 text-[9px] uppercase tracking-[0.2em] text-white/40"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  {quote.source}
                </p>
              </div>
            </FloatingFragment>
          );
        })}
      </div>

      {/* Audience silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg
          data-speaker-audience
          viewBox="0 0 1200 120"
          className="w-full h-auto opacity-40"
          preserveAspectRatio="none"
          style={{ filter: "blur(0.5px)" }}
        >
          <defs>
            <linearGradient id="audienceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.08 0.005 55)" stopOpacity="0" />
              <stop offset="40%" stopColor="oklch(0.07 0.004 55)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="oklch(0.05 0.003 55)" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Row 1: closest, larger silhouettes */}
          <g fill="url(#audienceGrad)">
            <ellipse cx="80" cy="95" rx="22" ry="28" />
            <ellipse cx="140" cy="102" rx="18" ry="24" />
            <ellipse cx="200" cy="92" rx="24" ry="30" />
            <ellipse cx="270" cy="98" rx="20" ry="26" />
            <ellipse cx="340" cy="94" rx="23" ry="29" />
            <ellipse cx="410" cy="100" rx="19" ry="25" />
            <ellipse cx="480" cy="91" rx="25" ry="31" />
            <ellipse cx="560" cy="97" rx="21" ry="27" />
            <ellipse cx="640" cy="93" rx="24" ry="29" />
            <ellipse cx="720" cy="99" rx="20" ry="26" />
            <ellipse cx="790" cy="92" rx="23" ry="30" />
            <ellipse cx="860" cy="96" rx="22" ry="28" />
            <ellipse cx="930" cy="101" rx="19" ry="25" />
            <ellipse cx="1000" cy="94" rx="24" ry="30" />
            <ellipse cx="1070" cy="98" rx="21" ry="27" />
            <ellipse cx="1140" cy="95" rx="22" ry="28" />
          </g>
          {/* Row 2: slightly smaller, more distant */}
          <g fill="url(#audienceGrad)" opacity="0.6">
            <ellipse cx="50" cy="78" rx="16" ry="20" />
            <ellipse cx="110" cy="82" rx="14" ry="18" />
            <ellipse cx="170" cy="76" rx="17" ry="21" />
            <ellipse cx="240" cy="80" rx="15" ry="19" />
            <ellipse cx="310" cy="77" rx="16" ry="20" />
            <ellipse cx="380" cy="81" rx="14" ry="18" />
            <ellipse cx="450" cy="75" rx="18" ry="22" />
            <ellipse cx="520" cy="79" rx="15" ry="19" />
            <ellipse cx="600" cy="76" rx="17" ry="21" />
            <ellipse cx="680" cy="80" rx="15" ry="19" />
            <ellipse cx="750" cy="77" rx="16" ry="20" />
            <ellipse cx="820" cy="81" rx="14" ry="18" />
            <ellipse cx="890" cy="76" rx="17" ry="21" />
            <ellipse cx="960" cy="79" rx="15" ry="19" />
            <ellipse cx="1030" cy="77" rx="16" ry="20" />
            <ellipse cx="1100" cy="80" rx="14" ry="18" />
            <ellipse cx="1160" cy="78" rx="15" ry="19" />
          </g>
        </svg>
      </div>

      {/* Central stage figure and text */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-[90vh] md:min-h-[100vh] px-6 py-20 md:py-28">
        {/* Stage figure silhouette */}
        <div data-speaker-reveal className="relative mb-12 md:mb-16">
          <div
            className="w-24 h-24 md:w-32 md:h-32 mx-auto rounded-full"
            style={{
              background:
                "radial-gradient(circle at 40% 35%, oklch(0.45 0.03 55 / 0.5), oklch(0.25 0.02 55 / 0.8))",
              filter: "blur(8px)",
            }}
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
              color: "oklch(0.65 0.08 55)",
            }}
          >
            Lectures &amp; Appearances
          </p>

          <h2
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
              color: "oklch(0.62 0.008 55)",
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
              className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500"
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
                color: "oklch(0.62 0.008 55)",
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
