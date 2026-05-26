import Link from "next/link";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS } from "./tokens";

export function AboutAuthorV5() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: MIST,
        borderTop: `1px solid ${STONE}`,
      }}
    >
      {/* Mountain logo — full-bleed backdrop */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/scp_mountain_logo_bold.png"
          alt=""
          className="absolute inset-0 h-full w-full select-none"
          style={{ opacity: 0.16, objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT — rider painting on the left, two smaller images stacked on the right */}
          <div className="lg:col-span-5 order-2 lg:order-1 lg:pt-[14%]">
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
              <div className="col-span-7">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/nestor-and-rider-painting.png"
                  alt="Nestor and Rider — painting"
                  className="w-full h-auto select-none"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-6 md:gap-8">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/inspiration-in-car.png"
                  alt="Inspiration, in a car"
                  className="w-full h-auto select-none"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/nestor-and-earth.png"
                  alt="Nestor and Earth"
                  className="w-full h-auto select-none"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — copy on a translucent paper card (no rounded corners) */}
          <div
            className="lg:col-span-7 order-1 lg:order-2 flex flex-col p-8 md:p-10 lg:p-12"
            style={{
              backgroundColor: "rgba(255,254,255,0.82)",
              backdropFilter: "blur(4px)",
              border: `1px solid ${STONE}`,
            }}
          >
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.4em",
                color: INK,
                fontWeight: 500,
              }}
            >
              About The Author
            </p>

            <h2
              className="mt-6 font-light leading-[0.98]"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.035em",
                color: VOID,
              }}
            >
              Nestor Walters
            </h2>

            <p
              className="mt-6 text-[11px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: STONE,
              }}
            >
              Veteran · Writer · Earth Scientist
            </p>

            <div
              className="my-10 h-px w-16"
              style={{ backgroundColor: STONE }}
            />

            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{
                fontFamily: SANS,
                color: INK,
                maxWidth: "56ch",
              }}
            >
              Born in Bangladesh, raised in Greece, served ten years in the
              U.S. Navy. Transferred to college for math and creative writing,
              then completed a master&rsquo;s in computational engineering.
              Now pursuing doctoral studies in earth science at the
              University of Maine.
            </p>

            <p
              className="mt-6 text-base md:text-lg leading-relaxed italic"
              style={{
                fontFamily: SANS,
                color: INK,
                maxWidth: "56ch",
              }}
            >
              Fiction, poetry, and essays born from service, science, and the
              long work of paying attention.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/v5/journal"
                className="inline-flex items-center gap-3 px-5 py-2.5 text-[11px] uppercase transition-opacity hover:opacity-90"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.3em",
                  color: PAPER,
                  backgroundColor: VOID,
                }}
              >
                Read the Journal
                <span aria-hidden>→</span>
              </Link>
              <a
                href="#writing"
                className="text-[11px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.3em",
                  color: VOID,
                  borderBottom: `1px solid ${INK}`,
                  paddingBottom: "2px",
                }}
              >
                Selected Work ↓
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
