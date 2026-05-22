"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function TheManScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const layersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const layers = layersRef.current;
    if (!section || !layers) return;

    const ctx = gsap.context(() => {
      gsap.to(layers.querySelector("[data-man-layer='bg']"), {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-man-reveal]").forEach((el) => {
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
      id="the-man"
      className="relative w-full overflow-hidden bg-[url('/assets/world-stamps.png')] bg-fixed bg-center bg-contain"
    >
      {/* Atmospheric gradient overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, oklch(0.18 0.03 75 / 0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, oklch(0.15 0.02 200 / 0.10) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.08 0.005 55) 0%, transparent 15%, transparent 85%, oklch(0.08 0.005 55) 100%)",
          }}
        />
      </div>

      <div ref={layersRef} className="relative min-h-[80vh] md:min-h-[90vh]">
        {/* Background layer */}
        <div
          data-man-layer="bg"
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

        {/* Glassmorphism layer */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            background: "oklch(0.92 0.018 75 / 0.08)",
            borderTop: "1px solid oklch(0.95 0.02 75 / 0.12)",
            borderBottom: "1px solid oklch(0.95 0.02 75 / 0.12)",
          }}
        />

        {/* Central text framed in cream */}
        <div className="relative z-30 flex flex-col items-center justify-center min-h-[80vh] px-6 py-16 md:py-20">
          <div
            data-man-reveal
            className="max-w-4xl w-full px-12 py-14 md:px-20 md:py-20"
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
              Before the writing came the journey
            </p>

            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-10 leading-tight"
              style={{ fontFamily: "var(--font-caveat)", color: "oklch(0.20 0.03 60)" }}
            >
              Fragments of a life
            </h2>

            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: "oklch(0.30 0.02 65)" }}
            >
              From Bangladesh to Greece. From the U.S. Navy to Stanford. From environmental science to literature. A life shaped by movement, discipline, curiosity, and reflection.
            </p>

            <p
              className="text-base leading-relaxed"
              style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: "oklch(0.40 0.02 65)" }}
            >
              Some stories are written. Others are lived across oceans, classrooms, ships, and silence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
