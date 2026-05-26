import { PAPER, STONE, INK, VOID, MONO, SANS } from "./tokens";

export function FooterV5() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="w-full"
      style={{
        backgroundColor: VOID,
        color: PAPER,
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.4em",
                color: STONE,
              }}
            >
              Imprint
            </p>
            <h3
              className="mt-4 font-light leading-tight"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                letterSpacing: "-0.02em",
                color: PAPER,
              }}
            >
              Sword · Circle · Pen
            </h3>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{
                fontFamily: SANS,
                color: "rgba(255,254,255,0.65)",
                maxWidth: "38ch",
              }}
            >
              For veterans, scientists, and creatives.
            </p>
          </div>

          <nav className="md:col-span-4 grid grid-cols-2 gap-6 content-start">
            {[
              { label: "Veterans", href: "#pillars" },
              { label: "Science", href: "#pillars" },
              { label: "Writing", href: "#writing" },
              { label: "The Book", href: "#book" },
              { label: "Newsletter", href: "#newsletter" },
              { label: "Journal", href: "/v5/journal" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[11px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.28em",
                  color: PAPER,
                }}
              >
                {l.label} ↗
              </a>
            ))}
          </nav>

          <div className="md:col-span-3">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.4em",
                color: STONE,
              }}
            >
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2">
              {[
                { label: "swordcirclepen.com", href: "https://swordcirclepen.com" },
                { label: "X / @nestorwalters", href: "https://x.com/nestorwalters" },
                { label: "ede-book.org", href: "https://ede-book.org" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px]"
                    style={{
                      fontFamily: MONO,
                      letterSpacing: "0.1em",
                      color: "rgba(255,254,255,0.8)",
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8"
          style={{ borderTop: `1px solid rgba(189,189,196,0.18)` }}
        >
          <p
            className="text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: "rgba(255,254,255,0.5)",
            }}
          >
            © {year} Nestor Walters
          </p>
          <p
            className="text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: "rgba(255,254,255,0.5)",
            }}
          >
            INK · {INK.toUpperCase()}
          </p>
        </div>
      </div>
    </footer>
  );
}
