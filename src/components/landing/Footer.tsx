import React from "react";

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      style={{ background: "var(--paper)", color: "var(--ink)" }}
    >
      <div className="grid grid-cols-12" style={{ borderBottom: "1px solid var(--ink)" }}>
        <div
          className="col-span-12 lg:col-span-7 px-5 md:px-8 lg:px-12 py-16"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          <h3
            className="h-display"
            style={{ fontSize: "clamp(56px, 12vw, 220px)", lineHeight: 0.86 }}
          >
            Sword
            <br />
            Circle
            <br />
            <span className="accent-text">Pen.</span>
          </h3>
          <p className="font-serif-ed italic text-xl mt-8 max-w-[42ch]" style={{ color: "var(--muted)" }}>
            Service, humanity, and the enduring power of thought.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <div className="grid grid-cols-2">
            <div className="px-6 py-8" style={{ borderRight: "1px solid var(--ink)", borderBottom: "1px solid var(--ink)" }}>
              <div className="meta" style={{ color: "var(--muted)" }}>Explore</div>
              <ul className="mt-4 space-y-2 font-display font-bold uppercase tracking-tight text-sm">
                <li><a href="#top" data-testid="footer-home" className="link-underline">Home</a></li>
                <li><a href="#work" data-testid="footer-journal" className="link-underline">Journal</a></li>
                <li><a href="#index" data-testid="footer-bio" className="link-underline">The Author</a></li>
                <li><a href="#project" data-testid="footer-project" className="link-underline">The Project</a></li>
              </ul>
            </div>
            <div className="px-6 py-8" style={{ borderBottom: "1px solid var(--ink)" }}>
              <div className="meta" style={{ color: "var(--muted)" }}>Publications</div>
              <ul className="mt-4 space-y-2 font-serif-ed italic text-base">
                <li>ISSUED Journal</li>
                <li>The Stanford Daily</li>
                <li>The Line Literary</li>
                <li>The Wrath-Bearing Tree</li>
              </ul>
            </div>
            <div className="col-span-2 px-6 py-8">
              <div className="meta" style={{ color: "var(--muted)" }}>Correspondence</div>
              <p className="font-serif-ed text-base md:text-lg mt-3 leading-snug">
                For speaking, collaborations, or questions about the work — use the
                channels shared publicly when ready; this space stays quiet by design.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 items-center">
        <div className="col-span-12 md:col-span-6 px-5 md:px-8 lg:px-12 py-5 meta" style={{ borderRight: "1px solid var(--ink)", color: "var(--muted)" }}>
          © 2026 Nestor Walters — Thoughtfully written between oceans, memory & earth.
        </div>
        <div className="hidden md:flex col-span-3 px-8 py-5 meta items-center gap-3" style={{ borderRight: "1px solid var(--ink)" }}>
          <span className="h-1.5 w-1.5 rounded-full accent-bg" />
          <span>Open · Reading</span>
        </div>
        <div className="col-span-12 md:col-span-3 px-5 md:px-8 lg:px-12 py-5 meta text-right" style={{ color: "var(--muted)" }}>
          Designed by{" "}
          <a
            href="https://www.blooming-brands.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--ink)", textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            Blooming Brands Inc
          </a>
        </div>
      </div>
    </footer>
  );
}
