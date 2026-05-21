import Link from "next/link";

const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Journal" },
  { href: "/books", label: "Books" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-zinc-950 px-6 py-14 text-zinc-500 md:px-10 md:py-16">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3 md:gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-600">Sword Circle Pen</p>
          <p className="mt-4 max-w-xs font-serif text-lg leading-snug text-zinc-300">
            Service, humanity, and the enduring power of thought.
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Explore</p>
          <nav className="mt-4 flex flex-col gap-3" aria-label="Footer">
            {FOOTER_NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="w-fit text-xs uppercase tracking-[0.2em] text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Connect</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600">
            For speaking, collaborations, or questions about the work — use the channels you
            share publicly when ready; this space stays quiet by design.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-white/5 pt-8 text-[11px] text-zinc-600 md:flex-row md:items-start md:justify-between md:gap-6">
        <p className="text-center md:text-left">
          © {year} Nestor Walters. Thoughtfully written between oceans, memory, and Earth.
        </p>
        <p className="text-center md:text-right">
          This site was designed by{" "}
          <a
            href="https://www.blooming-brands.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
          >
            Blooming Brands Inc
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
