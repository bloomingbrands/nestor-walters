import { PAPER, MIST, STONE, INK, VOID, MONO, SANS, SLATE } from "./tokens";

type Pillar = {
  index: string;
  kicker: string;
  title: string;
  body: string;
  href: string;
  image: string;
};

const PILLARS: Pillar[] = [
  {
    index: "I",
    kicker: "Sword",
    title: "Veterans Transfer Project",
    body: "Unlocking the untapped veteran intellectual potential — personal statements, recommendation letters, and resume preparation, drawn from those who have done it.",
    href: "/veterans-transfer-project",
    image:
      "/assets/vtp01.png",
  },
  {
    index: "II",
    kicker: "Circle",
    title: "Science",
    body: "Doctoral research in earth science at the University of Maine. Field notes from where the planet keeps the longer record.",
    href: "/science",
    image: "/assets/sceince01.png",
  },
  {
    index: "III",
    kicker: "Pen",
    title: "Writing",
    body: "Fiction, poetry, and essays born from service, science, and the long work of paying attention.",
    href: "/writing",
    image:
      "/assets/writing01.png",
  },
];

export function PillarsV5() {
  return (
    <section
      id="pillars"
      className="relative w-full"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3">
        {PILLARS.map((p, i) => (
          <article
            key={p.index}
            className="relative flex flex-col"
            style={{
              borderRight:
                i < PILLARS.length - 1 ? `1px solid ${STONE}` : "none",
              borderBottom: `1px solid ${STONE}`,
            }}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16 / 10",
                backgroundColor: MIST,
                borderBottom: `1px solid ${STONE}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(16,16,20,0.15) 0%, rgba(16,16,20,0) 35%, rgba(16,16,20,0.35) 100%)",
                }}
                aria-hidden
              />
              <div
                className="absolute top-4 left-4 px-2 py-1 text-[10px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.3em",
                  color: PAPER,
                  backgroundColor: "rgba(16,16,20,0.55)",
                  backdropFilter: "blur(2px)",
                }}
              >
                {p.kicker}
              </div>
            </div>

            <div className="flex flex-col gap-3 p-5 md:p-6 lg:p-7">
              <div
                className="text-[10px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.32em",
                  color: SLATE,
                }}
              >
                <span style={{ color: INK }}>{p.index}</span>
                <span className="mx-3">·</span>
                {p.kicker}
              </div>

              <h2
                className="font-light leading-[1.05]"
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.02em",
                  color: VOID,
                }}
              >
                {p.title}
              </h2>

              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: SANS, color: INK, maxWidth: "38ch" }}
              >
                {p.body}
              </p>

              <div className="mt-2">
                <a
                  href={p.href}
                  className="inline-flex items-center gap-3 text-[11px] uppercase transition-opacity hover:opacity-80"
                  style={{
                    fontFamily: MONO,
                    letterSpacing: "0.3em",
                    color: VOID,
                    borderBottom: `1px solid ${INK}`,
                    paddingBottom: "4px",
                  }}
                >
                  Enter
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
