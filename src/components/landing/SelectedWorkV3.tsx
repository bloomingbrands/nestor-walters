'use client';
import React from "react";
import { ArrowUpRight } from "lucide-react";

const works = [
  {
    no: "01",
    title: "Some Days",
    pub: "ISSUED Journal",
    year: "2024",
    form: "Poem",
    excerpt:
      "you're not a poet the voice says / go back to bed. a real poet doesn't slip / into a sleeve-holed sleeping bag / he got in the Navy, stare at an empty page / on the dining table, scrape dried food…",
  },
  {
    no: "02",
    title: "The Husband Who Came Back from the War",
    pub: "ISSUED Journal",
    year: "2023",
    form: "Fiction",
    excerpt:
      "in a story about two women / who grow up together playing / make-believe birds, who play bird-bandits, / princesses, dove-maidens, / sea nightingales and seven sparrows…",
  },
  {
    no: "03",
    title: "five ways to kill a mouse",
    pub: "ISSUED Journal",
    year: "2023",
    form: "Poem",
    excerpt:
      "we burned the one in the sticky trap. it struggled / against its tiny legs, writhing flames, fluttering / like cloth in a strong wind. i didn't / tell her this, the girl on my dorm room couch…",
  },
  {
    no: "04",
    title: "Swan: A Mother's Day Dedication",
    pub: "The Stanford Daily",
    year: "2022",
    form: "Essay",
    excerpt:
      "\"I struggled to find the words to thank you\" / is what the draft of my Instagram post said / and I was going to leave it to Billy Collins. / But as I scrolled through pictures I might / collage into some glimpse of who you are…",
  },
  {
    no: "05",
    title: "In The Boot Camp Laundry Room",
    pub: "The Line Literary",
    year: "2021",
    form: "Poem",
    excerpt:
      "we rise, together, one more time / The boy and I face the same wall / streaked with old, white, lead paint. / We hang, suspended from the same rod…",
  },
  {
    no: "06",
    title: "Homecoming",
    pub: "The Wrath-Bearing Tree",
    year: "2020",
    form: "Poem",
    excerpt:
      "he lies down, finally to rest. / grey light bands his closed door / with no silver at the edges. They said he left / one foot in the sand. wait, a head / no, a hand.",
  },
];

export default function SelectedWorkV3() {
  return (
    <section id="work" data-testid="selected-work" style={{ borderBottom: "1px solid var(--ink)" }}>
      {/* Section header */}
      <div
        className="grid grid-cols-12 items-end"
        style={{ borderBottom: "1px solid var(--ink)" }}
      >
        <div
          className="col-span-12 md:col-span-5 px-5 md:px-8 lg:px-12 py-10"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          <div className="meta" style={{ color: "var(--muted)" }}>
            § 01 — The Archive
          </div>
          <h2 className="h-display mt-4" style={{ fontSize: "clamp(40px, 6vw, 88px)" }}>
            Selected
            <br />
            <span className="accent-text">Work.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-7 px-5 md:px-8 lg:px-12 py-10">
          <p className="font-serif-ed text-xl md:text-2xl leading-snug" style={{ maxWidth: "62ch" }}>
            An index of pieces published across literary journals and university presses.
            Each entry is a fragment — read it, leave it, return to it later. The full
            manuscript lives elsewhere; these are the doorways.
          </p>
          <div className="meta mt-6 flex flex-wrap items-center gap-5" style={{ color: "var(--muted)" }}>
            <span>06 Entries</span>
            <span>·</span>
            <span>04 Publications</span>
            <span>·</span>
            <span>2020 — 2024</span>
          </div>
        </div>
      </div>

      {/* Ledger header */}
      <div
        className="hidden md:grid grid-cols-12 meta"
        style={{ borderBottom: "1px solid var(--ink)", color: "var(--muted)" }}
      >
        <div className="col-span-1 px-4 py-3" style={{ borderRight: "1px solid var(--ink)" }}>№</div>
        <div className="col-span-3 px-4 py-3" style={{ borderRight: "1px solid var(--ink)" }}>Title</div>
        <div className="col-span-5 px-4 py-3" style={{ borderRight: "1px solid var(--ink)" }}>Excerpt</div>
        <div className="col-span-2 px-4 py-3" style={{ borderRight: "1px solid var(--ink)" }}>Published in</div>
        <div className="col-span-1 px-4 py-3 text-right">Year</div>
      </div>

      {/* Rows */}
      <div>
        {works.map((w, i) => (
          <article
            key={w.no}
            data-testid={`work-row-${w.no}`}
            className="grid grid-cols-12 group cursor-pointer transition-colors"
            style={{
              borderBottom: i === works.length - 1 ? "none" : "1px solid var(--ink)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              className="col-span-2 md:col-span-1 px-4 py-6 meta self-start"
              style={{ borderRight: "1px solid var(--ink)" }}
            >
              {w.no}
            </div>
            <div
              className="col-span-10 md:col-span-3 px-4 py-6"
              style={{ borderRight: "1px solid var(--ink)" }}
            >
              <h3 className="font-display font-black text-2xl md:text-3xl leading-[0.95]">
                {w.title}
              </h3>
              <div className="meta mt-3" style={{ color: "var(--muted)" }}>
                {w.form}
              </div>
            </div>
            <div
              className="col-span-12 md:col-span-5 px-4 py-6"
              style={{ borderRight: "1px solid var(--ink)" }}
            >
              <p className="font-serif-ed italic text-lg md:text-xl leading-snug">
                &ldquo;{w.excerpt}&rdquo;
              </p>
            </div>
            <div
              className="col-span-8 md:col-span-2 px-4 py-6 meta"
              style={{ borderRight: "1px solid var(--ink)" }}
            >
              {w.pub}
            </div>
            <div className="col-span-4 md:col-span-1 px-4 py-6 flex items-start justify-end gap-2">
              <span className="meta">{w.year}</span>
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
