"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector(
      "[data-parallax-layers]",
    );

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`,
          ),
          {
            yPercent: layerObj.yPercent,
            ease: "none",
          },
          idx === 0 ? undefined : "<",
        );
      });
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: InstanceType<typeof Lenis> | null = null;
    if (!prefersReduced) {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.2,
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis!.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden" ref={parallaxRef} style={{ backgroundColor: "oklch(0.08 0.005 55)" }}>
      <section className="relative z-2 flex min-h-svh items-center justify-center py-[10em] px-4">
        <div className="absolute top-0 left-0 h-[120%] w-full">
          <div className="absolute -bottom-px left-0 z-20 h-0.5 w-full bg-[oklch(0.08_0.005_55)]"></div>
          <div
            data-parallax-layers
            className="absolute top-0 left-0 h-full w-full overflow-hidden"
          >
            <div
              data-parallax-layer="1"
              className="absolute top-[-17.5%] left-0 h-[117.5%] w-full pointer-events-none"
            >
              <Image
                src="/assets/clear-sky-colored.png"
                fill
                sizes="100vw"
                alt=""
                className="object-cover"
                priority
              />
            </div>
            <div
              data-parallax-layer="2"
              className="absolute top-[-17.5%] left-0 h-[117.5%] w-full pointer-events-none"
            >
              <Image
                src="/assets/mount-olympus-colored.png"
                fill
                sizes="100vw"
                alt=""
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[oklch(0.08_0.005_55)]/30" aria-hidden />
            </div>
            <div
              data-parallax-layer="3"
              className="absolute top-0 left-0 flex h-svh w-full flex-col items-center justify-start pt-[15%] gap-4"
            >
              <h1 className="relative text-center font-serif text-[clamp(3rem,12vw,8em)] font-bold leading-none tracking-tight text-white md:text-[10em]">
                Nestor Walters
              </h1>
              <p className="text-center font-serif text-lg font-black tracking-[0.25em] text-white/90 uppercase md:text-2xl">
                Veteran &nbsp;·&nbsp; Writer &nbsp;·&nbsp; Earth Scientist
              </p>
            </div>
            <div
              data-parallax-layer="4"
              className="absolute bottom-0 left-0 h-[150%] w-full pointer-events-none"
            >
              <Image
                src="/assets/man-dog-facing-summit-colored.png"
                fill
                sizes="100vw"
                alt=""
                className="object-cover object-bottom"
                priority
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 z-30 h-[20%] w-full bg-linear-to-b from-transparent to-black"></div>
        </div>
      </section>
    </div>
  );
}
