import Link from "next/link";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS, SLATE } from "./tokens";

type Block = {
  kicker?: string;
  heading: string;
  body: string;
};

type Props = {
  index: string;
  kicker: string;
  title: string;
  lede: string;
  image: string;
  blocks: Block[];
  cta?: { label: string; href: string };
};

export function SubpageShell({
  index,
  kicker,
  title,
  lede,
  image,
  blocks,
  cta,
}: Props) {
  return (
    <main style={{ backgroundColor: PAPER, color: INK }}>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ borderBottom: `1px solid ${STONE}` }}
      >
        <div
          className="absolute inset-0"
          style={{ backgroundColor: MIST }}
          aria-hidden
        />

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 pt-40 md:pt-48 pb-24 md:pb-32">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: INK,
            }}
          >
            ← Back to Sword · Circle · Pen
          </Link>

          <p
            className="mt-10 text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.4em",
              color: SLATE,
            }}
          >
            <span style={{ color: INK }}>{index}</span>
            <span className="mx-3">·</span>
            {kicker}
          </p>

          <h1
            className="mt-6 font-light leading-[1.02]"
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.035em",
              color: VOID,
              maxWidth: "18ch",
            }}
          >
            {title}
          </h1>

          <p
            className="mt-8 text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: SANS, color: INK, maxWidth: "52ch" }}
          >
            {lede}
          </p>

          {cta && (
            <a
              href={cta.href}
              className="mt-12 inline-flex items-center gap-3 px-6 py-3 text-[11px] uppercase transition-opacity hover:opacity-90"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: PAPER,
                backgroundColor: VOID,
              }}
            >
              {cta.label}
              <span aria-hidden>→</span>
            </a>
          )}
        </div>
      </section>

      {/* Body blocks */}
      <section className="mx-auto max-w-[1100px] px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <aside className="md:col-span-3">
            <p
              className="sticky top-28 text-xs md:text-sm uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: INK,
                fontWeight: 500,
              }}
            >
              Notes · {index}
            </p>
          </aside>

          <div className="md:col-span-9 flex flex-col gap-16">
            {blocks.map((b, i) => (
              <article
                key={i}
                className="pb-12"
                style={{
                  borderBottom:
                    i < blocks.length - 1 ? `1px solid ${STONE}` : "none",
                }}
              >
                {b.kicker && (
                  <p
                    className="text-xs md:text-sm uppercase"
                    style={{
                      fontFamily: MONO,
                      letterSpacing: "0.3em",
                      color: INK,
                      fontWeight: 500,
                    }}
                  >
                    {b.kicker}
                  </p>
                )}
                <h2
                  className="mt-4 font-light leading-[1.1]"
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                    letterSpacing: "-0.02em",
                    color: VOID,
                  }}
                >
                  {b.heading}
                </h2>
                <p
                  className="mt-5 text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: SANS, color: INK, maxWidth: "62ch" }}
                >
                  {b.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
