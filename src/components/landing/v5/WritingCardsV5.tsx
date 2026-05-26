import { PAPER, MIST, STONE, INK, VOID, MONO, SANS } from "./tokens";

type Card = {
  call: string;
  genre: string;
  title: string;
  publication: string;
  year: string;
  excerpt: string;
  href?: string;
  status?: "Published" | "Forthcoming" | "Slot reserved";
};

const CARDS: Card[] = [
  {
    call: "PR · 813 · NW",
    genre: "Fiction",
    title: "The Nursery",
    publication: "The New England Review",
    year: "Forthcoming",
    excerpt:
      "A short story about what we hand down — and what insists on being inherited anyway. Forthcoming in the pages of NER.",
    href: "https://www.nereview.com",
    status: "Forthcoming",
  },
  {
    call: "PR · 814 · NW",
    genre: "Poem",
    title: "Staring at the Horizon",
    publication: "Periodical · TBD",
    year: "—",
    excerpt:
      "A poem on watchstanding — the long blue line where sky stops pretending to be water. Excerpt to be provided.",
    status: "Published",
  },
  {
    call: "PR · 815 · NW",
    genre: "Essay",
    title: "Essay (title forthcoming)",
    publication: "Periodical · TBD",
    year: "—",
    excerpt:
      "Selected essay from the collected nonfiction. Final selection and excerpt pending Nestor's pick.",
    status: "Published",
  },
  {
    call: "PR · 816 · NW",
    genre: "—",
    title: "Reserved",
    publication: "To be assigned",
    year: "—",
    excerpt: "Card slot held for a fourth work — Nestor to select.",
    status: "Slot reserved",
  },
  {
    call: "PR · 817 · NW",
    genre: "—",
    title: "Reserved",
    publication: "To be assigned",
    year: "—",
    excerpt: "Card slot held for a fifth work — Nestor to select.",
    status: "Slot reserved",
  },
];

export function WritingCardsV5() {
  return (
    <section
      id="writing"
      className="w-full"
      style={{
        backgroundColor: PAPER,
        color: INK,
        borderTop: `1px solid ${STONE}`,
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: STONE,
              }}
            >
              Stack · Selected
            </p>
            <h2
              className="mt-4 font-light leading-[1.02]"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.025em",
                color: VOID,
              }}
            >
              Selected Work
            </h2>
          </div>
          <p
            className="text-[11px] uppercase"
            style={{ fontFamily: MONO, letterSpacing: "0.28em", color: INK }}
          >
            by Nestor Walters
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)]">
          {CARDS.map((c) => {
            const isReserved = c.status === "Slot reserved";
            const isFeatured = c.genre === "Essay";
            const inner = (
              <article
                className="relative flex h-full flex-col p-6 md:p-7 transition-colors"
                style={{
                  backgroundColor: PAPER,
                  border: `1px solid ${STONE}`,
                  fontFamily: MONO,
                  color: INK,
                  minHeight: "320px",
                }}
              >
                {/* corner perforations */}
                <span
                  aria-hidden
                  className="absolute top-2 left-2 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: STONE }}
                />
                <span
                  aria-hidden
                  className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: STONE }}
                />

                <div
                  className="flex items-center justify-between text-[10px] uppercase"
                  style={{ letterSpacing: "0.3em", color: STONE }}
                >
                  <span>{c.call}</span>
                  <span>{c.year}</span>
                </div>

                <div
                  className="mt-4 text-[11px] uppercase"
                  style={{ letterSpacing: "0.3em", color: VOID }}
                >
                  {c.genre}
                </div>

                <h3
                  className="mt-3 text-[1.45rem] leading-tight"
                  style={{
                    fontFamily: MONO,
                    fontWeight: 500,
                    color: VOID,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {c.title}
                </h3>

                <p
                  className="mt-2 text-[11px] uppercase"
                  style={{ letterSpacing: "0.22em", color: INK }}
                >
                  {c.publication}
                </p>

                <div
                  className="my-5 h-px w-10"
                  style={{ backgroundColor: STONE }}
                />

                <p
                  className="text-[13px] leading-relaxed"
                  style={{
                    fontFamily: MONO,
                    color: isReserved ? STONE : INK,
                    flex: 1,
                  }}
                >
                  {c.excerpt}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span
                    className="text-[10px] uppercase"
                    style={{ letterSpacing: "0.3em", color: STONE }}
                  >
                    {c.status}
                  </span>
                  {c.href && !isReserved && (
                    <span
                      className="text-[10px] uppercase"
                      style={{
                        letterSpacing: "0.3em",
                        color: VOID,
                        borderBottom: `1px solid ${INK}`,
                        paddingBottom: "2px",
                      }}
                    >
                      Read ↗
                    </span>
                  )}
                </div>
              </article>
            );

            return (
              <li
                key={c.call}
                className={`h-full ${isFeatured ? "sm:row-span-2" : ""}`}
              >
                {c.href && !isReserved ? (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>

        {/* hidden sentinel — keeps MIST token referenced */}
        <span aria-hidden style={{ color: MIST }} className="sr-only" />
      </div>
    </section>
  );
}
