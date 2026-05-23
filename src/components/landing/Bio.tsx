import React from "react";
import Image from "next/image";

const PORTRAIT =
  "https://static.prod-images.emergentagent.com/jobs/80950cd3-ba3d-4e26-910f-4febc1ac68dd/images/1e598c9e0d729270ff135355ab9d289394b9ade4d8f9318bd030b9d70ec77001.png";

const timeline = [
  { y: "Dhaka, BD", l: "Born" },
  { y: "Athens, GR", l: "Raised" },
  { y: "U.S. Navy", l: "10 Years of Service" },
  { y: "Stanford", l: "Math & Creative Writing" },
  { y: "U. of Maine", l: "Doctoral · Earth Science" },
];

export default function Bio() {
  return (
    <section id="index" data-testid="bio-section" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div className="grid grid-cols-12">
        {/* Portrait card */}
        <div
          className="col-span-12 lg:col-span-5 relative"
          style={{ borderRight: "1px solid var(--ink)", background: "var(--surface)" }}
        >
          <div className="relative" style={{ aspectRatio: "4 / 5" }}>
            <Image
              fill
              src={PORTRAIT}
              alt="Nestor Walters"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="duotone w-full h-full object-cover"
              loading="eager"
            />
            <div
              className="absolute top-5 left-5 meta px-2 py-1"
              style={{ background: "var(--paper)", border: "1px solid var(--ink)" }}
            >
              Subject · N.W.
            </div>
            <div
              className="absolute bottom-5 left-5 right-5 px-3 py-3 flex items-center justify-between"
              style={{ background: "var(--paper)", border: "1px solid var(--ink)" }}
            >
              <span className="meta">b. 19—— · Dhaka</span>
              <span className="meta accent-text">Vita</span>
            </div>
          </div>
        </div>

        {/* Bio text */}
        <div className="col-span-12 lg:col-span-7 px-5 md:px-8 lg:px-12 py-12 lg:py-20">
          <div className="meta" style={{ color: "var(--muted)" }}>
            § 03 — The Author
          </div>
          <h2 className="h-display mt-4" style={{ fontSize: "clamp(40px, 6vw, 92px)" }}>
            Notes
            <br />
            on a life,
            <br />
            <span className="font-serif-ed italic font-normal tracking-tight lowercase">written sideways.</span>
          </h2>

          <p className="font-serif-ed text-xl md:text-2xl leading-snug mt-10 max-w-[60ch]">
            Born in Bangladesh, raised in Greece. <strong className="font-display font-black">Ten-year</strong>{" "}
            U.S. Navy veteran. Stanford graduate in math &amp; creative writing.
            Doctoral candidate in earth science at the University of Maine.
          </p>

          <p className="font-serif-ed text-lg md:text-xl leading-snug mt-6 max-w-[60ch]" style={{ color: "var(--muted)" }}>
            I write what the discipline of service made it possible to see, and what
            the patience of science makes it possible to say — slowly, and only when
            there is something worth saying.
          </p>

          {/* Timeline ledger */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-5" style={{ border: "1px solid var(--ink)" }}>
            {timeline.map((t, i) => (
              <div
                key={t.l}
                className="px-4 py-5"
                style={{
                  borderRight: i < timeline.length - 1 ? "1px solid var(--ink)" : "none",
                  borderBottom: "1px solid var(--ink)",
                }}
              >
                <div className="font-display font-black text-base md:text-lg uppercase tracking-tight">
                  {t.y}
                </div>
                <div className="meta mt-2" style={{ color: "var(--muted)" }}>
                  {t.l}
                </div>
              </div>
            ))}
            <div className="col-span-2 md:col-span-5 px-4 py-4 flex items-center justify-between">
              <span className="meta" style={{ color: "var(--muted)" }}>
                Status — In progress
              </span>
              <span className="meta accent-text">●&nbsp;&nbsp;Writing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
