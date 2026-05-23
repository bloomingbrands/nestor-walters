"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

interface FloatingLetterProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  rotateRange?: [number, number];
}

function FloatingLetter({
  children,
  className = "",
  delay = 0,
  duration = 20,
  xRange = [-20, 20],
  yRange = [-15, 15],
  rotateRange = [-3, 3],
}: FloatingLetterProps) {
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
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

export function VeteranTransferScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const layers = layersRef.current;
    if (!section || !layers) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      // Background parallax: subtle drift upward
      gsap.to(layers.querySelector("[data-vtp-layer='bg']"), {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Floating letters: drift with scroll
      gsap.utils.toArray<HTMLElement>("[data-vtp-layer='letter']").forEach((el, i) => {
        const yDir = i % 2 === 0 ? -30 : -50;
        gsap.to(el, {
          yPercent: yDir,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });

      // Military artifacts: fade out and drift down
      gsap.utils.toArray<HTMLElement>("[data-vtp-layer='artifact']").forEach((el) => {
        gsap.to(el, {
          yPercent: 40,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "20% top",
            end: "80% top",
            scrub: 0.8,
          },
        });
      });

      // Academic items: fade in and rise
      gsap.utils.toArray<HTMLElement>("[data-vtp-layer='academic']").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: -20,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "30% bottom",
              end: "70% center",
              scrub: 0.8,
            },
          }
        );
      });

      // Text reveal
      gsap.utils.toArray<HTMLElement>("[data-vtp-reveal]").forEach((el) => {
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
      id="veteran-transfer"
      className="relative w-full overflow-hidden bg-[url('/assets/forward-colored.png')] bg-fixed bg-center bg-cover"
    >
      
      {/* Layered content */}
      <div
        ref={layersRef}
        className="relative min-h-[80vh] md:min-h-[90vh]"
      >
        {/* Background layer: subtle campus architecture suggestion */}
        <div
          data-vtp-layer="bg"
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
                `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 800'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23a09070' stop-opacity='0.08'/><stop offset='100%' stop-color='%23708090' stop-opacity='0.04'/></linearGradient></defs><rect width='1200' height='800' fill='url(%23g)'/><path d='M0 600 L200 500 L200 400 L250 400 L250 520 L300 490 L300 380 L350 380 L350 470 L400 450 L400 350 L450 350 L450 440 L500 420 L500 320 L550 320 L550 410 L600 390 L600 300 L650 300 L650 390 L700 370 L700 280 L750 280 L750 360 L800 340 L800 250 L850 250 L850 330 L900 310 L900 220 L950 220 L950 300 L1000 280 L1000 200 L1050 200 L1050 280 L1100 260 L1100 180 L1150 180 L1150 260 L1200 240 L1200 800 L0 800 Z' fill='%23a09070' fill-opacity='0.06'/><path d='M100 700 L150 650 L150 550 L200 550 L200 630 L250 600 L250 500 L300 500 L300 580 L350 550 L350 450 L400 450 L400 530 L450 500 L450 400 L500 400 L500 480 L550 450 L550 350 L600 350 L600 430 L650 400 L650 300 L700 300 L700 380 L750 350 L750 250 L800 250 L800 330 L850 300 L850 200 L900 200 L900 280 L950 250 L950 150 L1000 150 L1000 230 L1050 200 L1050 100 L1100 100 L1100 180 L1150 150 L1150 50 L1200 50 L1200 800 L100 800 Z' fill='%23708090' fill-opacity='0.04'/></svg>`
              )}")`,
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              filter: "blur(2px)",
            }}
          />
        </div>

        {/* Floating acceptance letters */}
        <FloatingLetter
          className="absolute top-[12%] left-[8%] z-20"
          delay={0}
          duration={22}
          xRange={[-15, 15]}
          yRange={[-10, 10]}
          rotateRange={[-4, 2]}
        >
          <div
            data-vtp-layer="letter"
            className="w-72 md:w-96 p-6 md:p-8 shadow-2xl"
            style={{
              backgroundColor: "oklch(0.95 0.02 75)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2)",
              transform: "rotate(-3deg)",
            }}
          >
            <div className="border-b border-amber-900/20 pb-3 mb-4">
              <p
                className="text-xs uppercase tracking-[0.2em] text-amber-900/60"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Office of Admissions
              </p>
            </div>
            <p
              className="text-sm leading-relaxed text-amber-950/80 mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              We are pleased to inform you of your acceptance into the graduate program in Earth and Environmental Sciences.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <div
                className="w-8 h-8 rounded-full border border-amber-900/30 flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.85 0.06 55)" }}
              >
                <span className="text-[11px] text-amber-950/70">S</span>
              </div>
              <p
                className="text-sm text-amber-900/50 italic"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                Stanford University
              </p>
            </div>
          </div>
        </FloatingLetter>

        <FloatingLetter
          className="absolute top-[25%] right-[10%] z-20"
          delay={3}
          duration={25}
          xRange={[-10, 20]}
          yRange={[-12, 8]}
          rotateRange={[-2, 5]}
        >
          <div
            data-vtp-layer="letter"
            className="w-60 md:w-80 p-5 md:p-7 shadow-2xl"
            style={{
              backgroundColor: "oklch(0.94 0.018 85)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.15)",
              transform: "rotate(2deg)",
            }}
          >
            <div className="border-b border-stone-800/15 pb-2.5 mb-3">
              <p
                className="text-xs uppercase tracking-[0.2em] text-stone-700/50"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Admissions Committee
              </p>
            </div>
            <p
              className="text-sm leading-relaxed text-stone-800/75 mb-3"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Congratulations. Your application to the College of Arts and Sciences has been reviewed and accepted.
            </p>
            <p
              className="text-sm text-stone-600/60 italic"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              University of Maine
            </p>
          </div>
        </FloatingLetter>

        <FloatingLetter
          className="absolute top-[55%] left-[15%] z-20"
          delay={6}
          duration={18}
          xRange={[-20, 10]}
          yRange={[-8, 12]}
          rotateRange={[-5, 3]}
        >
          <div
            data-vtp-layer="letter"
            className="w-56 md:w-68 p-5 md:p-6 shadow-xl"
            style={{
              backgroundColor: "oklch(0.93 0.015 95)",
              boxShadow: "0 6px 24px rgba(0,0,0,0.3), 0 1px 6px rgba(0,0,0,0.15)",
              transform: "rotate(-1deg)",
            }}
          >
            <div className="border-b border-yellow-900/15 pb-2 mb-3">
              <p
                className="text-xs uppercase tracking-[0.2em] text-yellow-900/50"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Veterans Services
              </p>
            </div>
            <p
              className="text-sm leading-relaxed text-yellow-950/75"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              Your transfer packet is complete. Welcome to the next chapter.
            </p>
          </div>
        </FloatingLetter>

        <FloatingLetter
          className="absolute top-[65%] right-[8%] z-20"
          delay={9}
          duration={21}
          xRange={[-12, 18]}
          yRange={[-10, 10]}
          rotateRange={[-3, 4]}
        >
          <div
            data-vtp-layer="letter"
            className="w-64 md:w-80 p-5 md:p-7 shadow-2xl"
            style={{
              backgroundColor: "oklch(0.96 0.012 80)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.18)",
              transform: "rotate(3deg)",
            }}
          >
            <div className="border-b border-stone-800/20 pb-3 mb-4">
              <p
                className="text-xs uppercase tracking-[0.2em] text-stone-700/55"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                Letter of Recommendation
              </p>
            </div>
            <p
              className="text-sm leading-relaxed text-stone-800/80 mb-4"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              It is without reservation that I recommend this candidate. His discipline, intellectual rigor, and clarity of purpose are unlike anything I have encountered in twenty years of teaching.
            </p>
            <p
              className="text-sm text-stone-600/55 italic"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              — Prof. R. Holloway, Dept. of Earth Sciences
            </p>
          </div>
        </FloatingLetter>

        {/* Military artifacts */}
        <div
          data-vtp-layer="artifact"
          className="absolute top-[40%] right-[20%] z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-24 h-24 md:w-32 md:h-32 rounded-full opacity-30"
            style={{
              background:
                "radial-gradient(circle at 40% 40%, oklch(0.35 0.05 100 / 0.4), oklch(0.25 0.04 90 / 0.2))",
              filter: "blur(1px)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] uppercase tracking-[0.3em] text-white/20"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            DD-214
          </div>
        </div>

        <div
          data-vtp-layer="artifact"
          className="absolute top-[65%] left-[5%] z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-16 h-20 md:w-20 md:h-24 opacity-25"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.4 0.06 110 / 0.5) 0%, oklch(0.3 0.05 100 / 0.3) 100%)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
            }}
          />
        </div>

        {/* Academic items fading in */}
        <div
          data-vtp-layer="academic"
          className="absolute top-[50%] right-[5%] z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-36 md:h-44 p-3 opacity-0"
            style={{
              width: 200,
              minWidth: 200,
              backgroundColor: "oklch(0.88 0.02 75)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              transform: "rotate(4deg)",
            }}
          >
            <div className="h-full border border-amber-900/10 p-2">
              <div className="space-y-1.5">
                {[68, 74, 62, 80, 71, 65, 78, 72].map((w) => (
                  <div
                    key={w}
                    className="h-px bg-amber-900/20"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          data-vtp-layer="academic"
          className="absolute top-[70%] left-[25%] z-10 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="w-24 h-32 md:w-28 md:h-40 p-2.5 opacity-0"
            style={{
              backgroundColor: "oklch(0.9 0.015 85)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
              transform: "rotate(-5deg)",
            }}
          >
            <div className="h-full border border-stone-800/10 p-2 flex flex-col justify-between">
              <div className="space-y-1">
                {[78, 84, 72, 90, 81].map((w) => (
                  <div
                    key={w}
                    className="h-px bg-stone-800/15"
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
              <p
                className="text-[7px] text-stone-600/40 text-right"
                style={{ fontFamily: "var(--font-caveat)" }}
              >
                essay draft
              </p>
            </div>
          </div>
        </div>

        {/* Central text content */}
        <div className="relative z-30 flex flex-col items-center justify-center min-h-[70vh] px-6 py-16 md:py-20">
          <div className="max-w-6xl text-center bg-black/40 backdrop-blur-sm rounded-lg p-8 md:p-12">
            <p
              data-vtp-reveal
              className="text-sm uppercase tracking-[0.4em] font-semibold text-white mb-6"
              style={{ fontFamily: "var(--font-geist-mono)" }}
            >
              Your Next Mission
            </p>

            <h2
              data-vtp-reveal
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-8 leading-tight"
              style={{ fontFamily: "var(--font-caveat)" }}
            >
              The Veteran Transfer Project
            </h2>

            <p
              data-vtp-reveal
              className="text-2xl text-white leading-relaxed mb-10 mx-auto text-center"
              style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
            >
              Service develops discipline. Education expands possibility. The transition between the two should never be walked alone. Built from lived experience, this project offers guidance, strategy, and mentorship for veterans pursuing higher education and long-term transformation.
            </p>

            <div
              data-vtp-reveal
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            >
              <Link
                href="#veteran-transfer"
                className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-white"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <span className="relative z-10">Explore the Mission</span>
                <span className="absolute inset-0 border border-white/20 transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/5" />
              </Link>
              <Link
                href="/blog"
                className="group relative px-8 py-3 text-xs uppercase tracking-[0.2em] text-white transition-colors duration-500 hover:text-white/80"
                style={{ fontFamily: "var(--font-geist-mono)" }}
              >
                <span className="relative z-10">Read the Manual</span>
                <span className="absolute inset-0 border border-white/10 transition-all duration-500 group-hover:border-white/25" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
