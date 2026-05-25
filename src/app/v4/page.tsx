import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ParallaxComponentV2 } from "@/components/ui/parallax-scrolling-v2";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import { PoemCard } from "@/components/ui/poem-card";
import { NewsletterCorrespondence } from "@/components/ui/newsletter-correspondence";
import { VersionSwitcher } from "@/components/version-switcher";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const BG      = "oklch(0.91 0.012 70)";
const BG_DARK = "oklch(0.10 0.008 55)";
const TEXT    = "oklch(0.20 0.02 55)";
const TEXT_S  = "oklch(0.38 0.015 55)";
const TEXT_M  = "oklch(0.52 0.01 55)";
const ACCENT  = "oklch(0.60 0.10 55)";
const BORDER  = "oklch(0.55 0.02 55 / 0.18)";

const offerings = [
  {
    num: "01",
    title: "The Writing",
    body: "Poetry, essays, and fiction born from service, science, and the long work of paying attention.",
    cta: "Read the archive",
    href: "/blog",
  },
  {
    num: "02",
    title: "Earth Day Eulogy",
    body: "A collection of illustrations and verse — available now through Sword Circle Pen.",
    cta: "Order the book",
    href: "/books",
  },
  {
    num: "03",
    title: "Speaking",
    body: "Public talks and workshops on writing, military transition, and science communication.",
    cta: "Get in touch",
    href: "#correspondence",
  },
  {
    num: "04",
    title: "Veterans",
    body: "Resources and community for veterans navigating the transition to civilian and academic life.",
    cta: "Learn more",
    href: "#correspondence",
  },
];

export default function V4Landing() {
  return (
    <>
      {/* ① Mountain hero — natural parallax from Design II, SCP-focused copy */}
      <ParallaxComponentV2
        heading="Sword Circle Pen"
        subheading="Poetry  ·  Essays  ·  Field Notes"
      />

      {/* ② Sword Circle Pen — brand + offerings */}
      <section className="px-6 py-20 md:px-16 md:py-28" style={{ backgroundColor: BG }}>
        <div className="mx-auto max-w-6xl">

          <p
            className="text-[10px] uppercase tracking-[0.32em] mb-5"
            style={{ fontFamily: "var(--font-geist-mono)", color: ACCENT }}
          >
            Sword Circle Pen
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              style={{ fontFamily: "var(--font-caveat)", color: TEXT }}
            >
              Where the work lives.
            </h2>
            <p
              className="max-w-[30ch] text-sm leading-relaxed lg:text-right"
              style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: TEXT_S }}
            >
              A literary imprint at the intersection of service, science, and craft.
            </p>
          </div>

          <div className="h-px mb-14" style={{ backgroundColor: BORDER }} />

          {/* Offerings — 4-col sharp grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ backgroundColor: BORDER }}
          >
            {offerings.map((o) => (
              <div
                key={o.num}
                className="group flex flex-col gap-5 p-8"
                style={{ backgroundColor: BG }}
              >
                <span
                  className="text-[10px] tracking-[0.25em] uppercase"
                  style={{ fontFamily: "var(--font-geist-mono)", color: TEXT_M }}
                >
                  {o.num}
                </span>
                <h3
                  className="text-lg font-semibold leading-snug"
                  style={{ color: TEXT, fontFamily: "var(--font-geist-sans)" }}
                >
                  {o.title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: TEXT_S, fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
                >
                  {o.body}
                </p>
                <Link
                  href={o.href}
                  className="text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:underline underline-offset-4 w-fit"
                  style={{ fontFamily: "var(--font-geist-mono)", color: ACCENT }}
                >
                  {o.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ③ Archive — photo panel + portrait (Design I elements) */}
      <section
        className="relative overflow-hidden px-6 py-20 md:px-16 md:py-28"
        style={{ backgroundColor: BG_DARK }}
      >
        <div className="mx-auto max-w-6xl">
          <p
            className="text-[10px] uppercase tracking-[0.32em] mb-14"
            style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.94 0.003 55 / 0.35)" }}
          >
            The Archive — images from the field
          </p>

          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-start">

            {/* Left — polaroid scatter: the "fuzzy panel" Samuel likes */}
            <div className="flex-1">
              {/* Mobile: 2-col staggered */}
              <div className="lg:hidden grid grid-cols-2 gap-4 pb-6">
                {[
                  { src: "/assets/EDE1_EddiesGhost_web.jpg", alt: "Eddie's Ghost",        caption: "Eddie's Ghost",         rotate: -8  },
                  { src: "/assets/clearsky.png",              alt: "Open sky",              caption: "Between deployments",   rotate: 5   },
                  { src: "/assets/EDE3_Jaya_web.jpg",         alt: "Jaya",                 caption: "Jaya",                  rotate: -5  },
                  { src: "/assets/ground-slice.png",          alt: "Strata",               caption: "Field notes",           rotate: 7   },
                ].map((c) => (
                  <div key={c.caption} className="flex justify-center">
                    <PolaroidCard {...c} size="sm" />
                  </div>
                ))}
              </div>

              {/* Desktop: scattered */}
              <div className="hidden lg:block relative" style={{ minHeight: 560 }}>
                <div className="absolute" style={{ top: 0, left: 0, zIndex: 1 }}>
                  <PolaroidCard src="/assets/EDE1_EddiesGhost_web.jpg" alt="Eddie's Ghost" caption="Eddie's Ghost" rotate={-10} size="large" />
                </div>
                <div className="absolute" style={{ top: 55, left: 230, zIndex: 2 }}>
                  <PolaroidCard src="/assets/clearsky.png" alt="Open sky" caption="Between deployments" rotate={8} size="large" />
                </div>
                <div className="absolute" style={{ top: 290, left: 50, zIndex: 3 }}>
                  <PolaroidCard src="/assets/EDE3_Jaya_web.jpg" alt="Jaya" caption="Jaya" rotate={-7} size="large" />
                </div>
                <div className="absolute" style={{ top: 210, left: 320, zIndex: 1 }}>
                  <PolaroidCard src="/assets/ground-slice.png" alt="Strata" caption="Field notes" rotate={13} size="large" />
                </div>
              </div>
            </div>

            {/* Right — portrait, secondary (not centered, not dominant) */}
            <div className="w-full lg:w-64 shrink-0">
              <p
                className="text-[9px] uppercase tracking-[0.28em] mb-5"
                style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.94 0.003 55 / 0.35)" }}
              >
                Author
              </p>

              <div className="group relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/assets/nestor-and-dog-custom.png"
                  alt="Nestor Walters"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 80vw, 16rem"
                />
                <Image
                  src="/assets/nestor-and-rider.png"
                  alt=""
                  fill
                  aria-hidden
                  className="object-cover object-center opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                  sizes="(max-width: 1024px) 80vw, 16rem"
                />
                <div
                  className="absolute bottom-0 inset-x-0 p-5"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
                >
                  <p className="text-white text-sm font-medium">Nestor &amp; Rider Walters</p>
                  <p className="text-[11px] mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>Hover to reveal photo</p>
                </div>
              </div>

              <p
                className="text-[10px] leading-relaxed mt-5 italic"
                style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: "oklch(0.94 0.003 55 / 0.35)" }}
              >
                Photos pending — Nestor is selecting images from his personal archive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ④ Selected writing — compact 3-col (sharp from Design III, clean) */}
      <section className="px-6 py-20 md:px-16 md:py-28" style={{ backgroundColor: BG }}>
        <div className="mx-auto max-w-6xl">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <p
                className="text-[10px] uppercase tracking-[0.32em] mb-3"
                style={{ fontFamily: "var(--font-geist-mono)", color: ACCENT }}
              >
                Selected writing
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "var(--font-caveat)", color: TEXT }}
              >
                From the archive
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-[11px] uppercase tracking-[0.2em] hover:underline underline-offset-4 shrink-0"
              style={{ fontFamily: "var(--font-geist-mono)", color: TEXT_M }}
            >
              All writing →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <PoemCard
              compact
              title="Some Days"
              publication="ISSUED Journal"
              bgColor="oklch(0.94 0.025 95)"
              rotate={-1}
              lines={[
                "you're not a poet the voice says",
                "go back to bed. a real poet doesn't slip",
                "into a sleeve-holed sleeping bag",
                "he got in the Navy, stare at an empty page",
                "on the dining table, scrape dried food…",
              ]}
              href="https://issuedjournal.com/three-poems-by-nestor-walters/"
            />
            <PoemCard
              compact
              title="The Husband Who Came Back from the War"
              publication="ISSUED Journal"
              bgColor="oklch(0.92 0.02 230)"
              rotate={1}
              lines={[
                "in a story about two women",
                "who grow up together playing",
                "make-believe birds, who play bird-bandits,",
                "princesses, dove-maidens,",
                "sea nightingales and seven sparrows…",
              ]}
              href="https://issuedjournal.com/three-poems-by-nestor-walters/"
            />
            <PoemCard
              compact
              title="Homecoming"
              publication="The Wrath-Bearing Tree"
              bgColor="oklch(0.92 0.02 300)"
              rotate={-1}
              lines={[
                "he lies down, finally to rest.",
                "grey light bands his closed door",
                "with no silver at the edges. They said he left",
                "one foot in the sand. wait, a head",
                "no, a hand.",
              ]}
              href="https://www.wrath-bearingtree.com/2020/12/new-poetry-from-nestor-walters-homecoming/"
            />
          </div>
        </div>
      </section>

      {/* ⑤ Newsletter */}
      <NewsletterCorrespondence />

      <VersionSwitcher />
    </>
  );
}
