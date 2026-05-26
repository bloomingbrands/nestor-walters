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
      {/* Mountain logo watermark */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/scp_mountain_logo_bold.png"
          alt=""
          className="w-[min(78%,900px)] max-w-none select-none"
          style={{ opacity: 0.06 }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* LEFT — image pair */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <figure
                className="relative w-[78%] ml-auto"
                style={{
                  border: `1px solid ${STONE}`,
                  backgroundColor: PAPER,
                  boxShadow: "0 30px 60px -30px rgba(16,16,20,0.25)",
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4 / 5", backgroundColor: MIST }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/nestor-and-rider-painting.png"
                    alt="Nestor and Rider — painting"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption
                  className="px-4 py-3 text-[10px] uppercase"
                  style={{
                    fontFamily: MONO,
                    letterSpacing: "0.32em",
                    color: STONE,
                    borderTop: `1px solid ${STONE}`,
                  }}
                >
                  Plate I · Nestor & Rider
                </figcaption>
              </figure>

              <figure
                className="relative w-[64%] -mt-20 md:-mt-28"
                style={{
                  border: `1px solid ${STONE}`,
                  backgroundColor: PAPER,
                  boxShadow: "0 30px 60px -30px rgba(16,16,20,0.3)",
                }}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4 / 3", backgroundColor: MIST }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/inspiration-in-car.png"
                    alt="Inspiration, in a car"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <figcaption
                  className="px-4 py-3 text-[10px] uppercase"
                  style={{
                    fontFamily: MONO,
                    letterSpacing: "0.32em",
                    color: STONE,
                    borderTop: `1px solid ${STONE}`,
                  }}
                >
                  Plate II · Field notes
                </figcaption>
              </figure>
            </div>
          </div>

          {/* RIGHT — copy */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.4em",
                color: INK,
                fontWeight: 500,
              }}
            >
              The Author
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
