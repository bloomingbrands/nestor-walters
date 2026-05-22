import React from "react";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
const HERO_IMG =
  "https://static.prod-images.emergentagent.com/jobs/80950cd3-ba3d-4e26-910f-4febc1ac68dd/images/1e598c9e0d729270ff135355ab9d289394b9ade4d8f9318bd030b9d70ec77001.png";


export default function Hero() {
  return (
    <section id="top" data-testid="hero" className="relative" style={{ borderBottom: "1px solid var(--ink)" }}>
      {/* Top meta strip */}
      <div
        className="grid grid-cols-12 items-center"
        style={{ borderBottom: "1px solid var(--ink)" }}
      >
        <div
          className="col-span-6 md:col-span-3 px-5 md:px-8 py-3 meta"
          style={{ borderRight: "1px solid var(--ink)", color: "var(--muted)" }}
        >
          № 001 · Field Edition
        </div>
        <div
          className="hidden md:flex col-span-6 px-8 py-3 meta items-center gap-3"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          <span className="h-1.5 w-1.5 rounded-full accent-bg" />
          <span>An archive of service, science & the long work of paying attention</span>
        </div>
        <div className="hidden md:block col-span-3 px-8 py-3 meta text-right" style={{ color: "var(--muted)" }}>
          43.6591° N · 70.2568° W
        </div>
        <div className="md:hidden col-span-6 px-5 py-3 meta text-right" style={{ color: "var(--muted)" }}>
          43.6591° N
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* LEFT — big type */}
        <div
          className="col-span-12 lg:col-span-8 px-5 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          <div className="meta mb-8" style={{ color: "var(--muted)" }}>
            <span className="accent-text">●</span>&nbsp;&nbsp;Portfolio · 2014 — Present
          </div>

          <h1
            data-testid="hero-name"
            className="h-display fade-up"
            style={{ fontSize: "clamp(56px, 11.5vw, 196px)" }}
          >
            Nestor
            <br />
            <span style={{ display: "inline-block" }}>
              Walt<span className="accent-text">e</span>rs
            </span>
          </h1>

          <div className="mt-10 max-w-2xl">
            <div className="flex items-center gap-3 meta mb-5">
              <span>Veteran</span>
              <span className="accent-text">/</span>
              <span>Writer</span>
              <span className="accent-text">/</span>
              <span>Earth Scientist</span>
            </div>
            <p className="font-serif-ed text-xl md:text-2xl leading-snug" style={{ maxWidth: "52ch" }}>
              Fiction, poetry, and essays born from service, science, and the long work of paying attention —
              <em> not a catalog, but fragments pulled from a larger body of writing.</em>
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a data-testid="hero-cta-journal" href="#work" className="btn-stark">
                Enter The Journal <ArrowDownRight size={16} />
              </a>
              <a data-testid="hero-cta-project" href="#project" className="btn-ghost">
                The Next Mission
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT — image stack */}
        <div className="col-span-12 lg:col-span-4 relative" style={{ background: "var(--surface)" }}>
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "3 / 4", borderBottom: "1px solid var(--ink)" }}
          >
            <Image
              src={HERO_IMG}
              alt="Silhouette by the ocean"
                fill
              className="duotone w-full h-full object-cover"
            />
            <div
              className="absolute top-4 left-4 meta px-2 py-1"
              style={{ background: "var(--paper)", border: "1px solid var(--ink)" }}
            >
              Plate I · Atlantic
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div
              className="px-5 py-6"
              style={{ borderRight: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}
            >
              <div className="meta" style={{ color: "var(--muted)" }}>
                Service
              </div>
              <div className="font-display font-black text-3xl mt-1">10y</div>
              <div className="meta mt-1">U.S. Navy</div>
            </div>
            <div
              className="px-5 py-6"
              style={{ borderBottom: "1px solid var(--ink)" }}
            >
              <div className="meta" style={{ color: "var(--muted)" }}>
                Degrees
              </div>
              <div className="font-display font-black text-3xl mt-1">02</div>
              <div className="meta mt-1">Stanford · Maine</div>
            </div>
            <div className="col-span-2 px-5 py-6 flex items-center justify-between">
              <span className="meta" style={{ color: "var(--muted)" }}>Currently</span>
              <span className="font-serif-ed italic text-lg">Earth Science / U. Maine</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
