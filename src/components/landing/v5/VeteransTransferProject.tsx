"use client";

import Link from "next/link";
import { useState } from "react";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS } from "./tokens";

type Video = { id: string; title: string };

type Group =
  | {
      num: string;
      label: string;
      kicker: string;
      blurb: string;
      kind: "youtube";
      playlistHref: string;
      videos: Video[];
    }
  | {
      num: string;
      label: string;
      kicker: string;
      blurb: string;
      kind: "pdf";
      embed: string;
      openHref: string;
      downloadHref: string;
    };

const GROUPS: Group[] = [
  {
    num: "01",
    label: "Personal Statements",
    kicker: "Essays · 9 episodes",
    blurb:
      "What admissions readers are actually looking for in a veteran's personal statement, with worked examples and the most common pitfalls.",
    kind: "youtube",
    playlistHref:
      "https://www.youtube.com/playlist?list=PLRN314zoNwD2CB00EsqFhb6T1VqUMMhox",
    videos: [
      { id: "i7NkRJF3p8Q", title: "NSI Episode 1 — That Person" },
      { id: "iB9iH698mfk", title: "NSI Episode 2 — Tell Me A Story" },
      { id: "SfnBHGuCeX4", title: "NSI Episode 3 — What Makes a Story?" },
      { id: "DiRDxiIgXwI", title: "NSI Episode 4.1 — Structuring, Part 1" },
      { id: "fPNhUkNy3BI", title: "NSI Episode 4.2 — Structuring, Part 2" },
      { id: "hg7m49LCs5I", title: "NSI Episode 8 — Sample Essay #1" },
      { id: "1ui8fjKXdAw", title: "NSI Episode 9 — Sample Essay #2" },
      { id: "RuLkd3csA-Q", title: "NSI Episode 10 — Sample Essay #3" },
      { id: "Qv2wvPt3bnA", title: "NSI Episode 11 — Sample Essay #4" },
    ],
  },
  {
    num: "02",
    label: "Letters of Recommendation",
    kicker: "Recommenders · 3 episodes",
    blurb:
      "How to identify the right recommenders, brief them well, and follow up — a process built from veterans who got in.",
    kind: "youtube",
    playlistHref:
      "https://www.youtube.com/playlist?list=PLRN314zoNwD0QOReJOj7udDqvt0lPoiiM",
    videos: [
      {
        id: "lM-3b42fBxs",
        title: "Part 1 — Decide That You Need a Letter of Recommendation",
      },
      {
        id: "JFLHtgzKvJY",
        title: "Part 2 — Choose a Recommender That Knows You Well",
      },
      { id: "x-vhm96YtX0", title: "Part 3 — Make the Official Request" },
    ],
  },
  {
    num: "03",
    label: "Resume Preparation",
    kicker: "Resume · 6 episodes",
    blurb:
      "Translating service into a record an admissions committee can read. The difference between what was done and what was learned.",
    kind: "youtube",
    playlistHref:
      "https://www.youtube.com/playlist?list=PLRN314zoNwD1mEoJ59ltO87cHejWPlnMX",
    videos: [
      { id: "Wba5F79LOc0", title: "Keep It Simple, Student" },
      { id: "HJaVb7HunQA", title: "Organize — Get Your Ship Together" },
      { id: "BqqIHWFUxUo", title: "Choosing Meaningful Content" },
      { id: "T-nB0waCLD0", title: "Action, Not Adjective" },
      { id: "BLNVPBGGmXU", title: "Check, Check, Check Again" },
      {
        id: "aB9AxDnMmhk",
        title:
          "A Real Challenge Transferring to a 4-Year School — My Stanford Math Story",
      },
    ],
  },
  {
    num: "04",
    label: "Veteran Transfer Manual",
    kicker: "PDF · Free",
    blurb:
      "A free downloadable manual — expanded guidance plus anonymized sample essays from successful student veterans. No email gate, distribute freely.",
    kind: "pdf",
    embed:
      "https://drive.google.com/file/d/1WsRy4zF_dQibeTpS1GejpVgn7LK2d0ET/preview",
    openHref:
      "https://drive.google.com/file/d/1WsRy4zF_dQibeTpS1GejpVgn7LK2d0ET/view",
    downloadHref:
      "https://drive.google.com/uc?export=download&id=1WsRy4zF_dQibeTpS1GejpVgn7LK2d0ET",
  },
];

type Active = { groupIdx: number; videoIdx: number };

export function VeteransTransferProject() {
  const [active, setActive] = useState<Active>({ groupIdx: 0, videoIdx: 0 });
  const [openGroups, setOpenGroups] = useState<Record<number, boolean>>({
    0: true,
  });

  const activeGroup = GROUPS[active.groupIdx];
  const activeVideo =
    activeGroup.kind === "youtube"
      ? activeGroup.videos[active.videoIdx]
      : null;

  const selectGroup = (i: number) => {
    setOpenGroups((s) => ({ ...s, [i]: !s[i] }));
    const g = GROUPS[i];
    if (g.kind === "pdf") {
      setActive({ groupIdx: i, videoIdx: 0 });
    } else if (active.groupIdx !== i) {
      setActive({ groupIdx: i, videoIdx: 0 });
    }
  };

  const selectVideo = (groupIdx: number, videoIdx: number) => {
    setActive({ groupIdx, videoIdx });
    setOpenGroups((s) => ({ ...s, [groupIdx]: true }));
  };

  return (
    <main style={{ backgroundColor: PAPER, color: INK }}>
      {/* Hero */}
      <section
        className="relative w-full overflow-hidden"
        style={{ borderBottom: `1px solid ${STONE}` }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: MIST }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/vtp01.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0.4 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,254,255,0.5) 0%, rgba(255,254,255,0.9) 70%, #fffeff 100%)",
          }}
        />

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 pt-40 md:pt-48 pb-20 md:pb-24">
          <Link
            href="/v5"
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
              color: STONE,
            }}
          >
            <span style={{ color: INK }}>I</span>
            <span className="mx-3">·</span>
            Sword
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
            Veterans Transfer Project
          </h1>

          <figure className="mt-12 max-w-3xl">
            <blockquote
              className="font-light leading-[1.2] italic"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
                color: VOID,
                borderLeft: `1px solid ${INK}`,
                paddingLeft: "1.5rem",
              }}
            >
              &ldquo;Education is the most powerful weapon which you can use to
              change the world.&rdquo;
            </blockquote>
            <figcaption
              className="mt-4 text-[11px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: STONE,
                paddingLeft: "1.5rem",
              }}
            >
              — Nelson Mandela
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Intro copy */}
      <section className="mx-auto max-w-[1100px] px-6 md:px-12 lg:px-16 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <aside className="md:col-span-3">
            <p
              className="md:sticky md:top-28 text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: STONE,
              }}
            >
              Notes · I
            </p>
          </aside>
          <div className="md:col-span-9 flex flex-col gap-8">
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: SANS, color: INK, maxWidth: "62ch" }}
            >
              America, the United States, and the world, need people wielding
              this weapon responsibly. Climate change disasters, clean water
              shortages, as well as good old fashioned space exploration and
              scientific investigation, all need driven, cooperative,
              hardworking, highly skilled people to tackle them. Our enlisted
              veteran experience prepared us especially well for this in two
              ways: working with others and taking the suck.
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: SANS, color: INK, maxWidth: "62ch" }}
            >
              The United States is especially short on scientists and
              engineers, according to the National Science Foundation, putting
              us behind on scientific progress. It doesn&rsquo;t seem that way
              for now because our living conditions continue to attract the
              brightest minds from other, more densely populated countries. But
              how long we can continue to do so is uncertain.
            </p>
            <p
              className="text-lg md:text-xl leading-relaxed"
              style={{ fontFamily: SANS, color: INK, maxWidth: "62ch" }}
            >
              To help veterans who are considering college, we worked with{" "}
              <a
                href="https://www.nextstepinbound.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: VOID,
                  borderBottom: `1px solid ${INK}`,
                }}
              >
                Next Step Inbound
              </a>{" "}
              to make this series:
            </p>
          </div>
        </div>
      </section>

      {/* Indexed resource panel */}
      <section
        id="resources"
        className="w-full"
        style={{
          backgroundColor: MIST,
          borderTop: `1px solid ${STONE}`,
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <header className="mb-12">
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: STONE,
              }}
            >
              Resources
            </p>
            <h2
              className="mt-4 font-light leading-[1.02]"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.025em",
                color: VOID,
              }}
            >
              The series, in four parts.
            </h2>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Nested side index */}
            <nav className="lg:col-span-4" aria-label="Resources index">
              <ul className="flex flex-col">
                {GROUPS.map((g, gi) => {
                  const isActiveGroup = gi === active.groupIdx;
                  const isOpen = !!openGroups[gi];
                  return (
                    <li key={g.num}>
                      <button
                        type="button"
                        onClick={() => selectGroup(gi)}
                        aria-expanded={isOpen}
                        className="w-full text-left transition-colors"
                        style={{
                          padding: "18px 0",
                          borderBottom: `1px solid ${STONE}`,
                          borderTop: gi === 0 ? `1px solid ${STONE}` : "none",
                        }}
                      >
                        <div className="flex items-baseline gap-5">
                          <span
                            className="text-[11px]"
                            style={{
                              fontFamily: MONO,
                              letterSpacing: "0.28em",
                              color: isActiveGroup ? VOID : STONE,
                              minWidth: "2.5rem",
                            }}
                          >
                            {g.num}
                          </span>
                          <span className="flex-1">
                            <span
                              className="block"
                              style={{
                                fontFamily: SANS,
                                fontSize: "1.15rem",
                                letterSpacing: "-0.01em",
                                color: isActiveGroup ? VOID : INK,
                                fontWeight: isActiveGroup ? 500 : 400,
                              }}
                            >
                              {g.label}
                            </span>
                            <span
                              className="mt-1 block text-[10px] uppercase"
                              style={{
                                fontFamily: MONO,
                                letterSpacing: "0.3em",
                                color: STONE,
                              }}
                            >
                              {g.kicker}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className="text-[12px]"
                            style={{
                              color: VOID,
                              transform: isOpen
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                              transition: "transform 0.2s",
                              display: g.kind === "youtube" ? "inline-block" : "none",
                            }}
                          >
                            ›
                          </span>
                        </div>
                      </button>

                      {g.kind === "youtube" && isOpen && (
                        <ul
                          className="flex flex-col"
                          style={{ borderBottom: `1px solid ${STONE}` }}
                        >
                          {g.videos.map((v, vi) => {
                            const isActiveVideo =
                              isActiveGroup && vi === active.videoIdx;
                            return (
                              <li key={v.id}>
                                <button
                                  type="button"
                                  onClick={() => selectVideo(gi, vi)}
                                  className="w-full text-left"
                                  style={{
                                    padding: "10px 0 10px 2.5rem",
                                    borderTop: `1px dashed ${STONE}`,
                                    color: isActiveVideo ? VOID : INK,
                                  }}
                                >
                                  <div className="flex items-baseline gap-4">
                                    <span
                                      className="text-[10px]"
                                      style={{
                                        fontFamily: MONO,
                                        letterSpacing: "0.22em",
                                        color: isActiveVideo ? VOID : STONE,
                                        minWidth: "1.5rem",
                                      }}
                                    >
                                      {String(vi + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: SANS,
                                        fontSize: "0.92rem",
                                        lineHeight: 1.45,
                                        fontWeight: isActiveVideo ? 500 : 400,
                                        color: isActiveVideo ? VOID : INK,
                                      }}
                                    >
                                      {v.title}
                                    </span>
                                    {isActiveVideo && (
                                      <span
                                        aria-hidden
                                        className="ml-auto text-[12px]"
                                        style={{ color: VOID }}
                                      >
                                        ▸
                                      </span>
                                    )}
                                  </div>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Active panel */}
            <div className="lg:col-span-8">
              <div
                className="flex flex-col lg:sticky lg:top-24"
                style={{
                  backgroundColor: PAPER,
                  border: `1px solid ${STONE}`,
                  padding: "clamp(20px, 3vw, 36px)",
                }}
              >
                <div
                  className="flex items-center justify-between gap-4 text-[10px] uppercase"
                  style={{
                    fontFamily: MONO,
                    letterSpacing: "0.32em",
                    color: STONE,
                  }}
                >
                  <span>
                    <span style={{ color: VOID }}>{activeGroup.num}</span>
                    <span className="mx-3">·</span>
                    {activeGroup.kicker}
                  </span>
                  <div className="flex items-center gap-5">
                    <a
                      href={
                        activeGroup.kind === "youtube"
                          ? `https://www.youtube.com/watch?v=${activeVideo?.id}`
                          : activeGroup.openHref
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px]"
                      style={{
                        fontFamily: MONO,
                        letterSpacing: "0.28em",
                        color: VOID,
                        borderBottom: `1px solid ${INK}`,
                        paddingBottom: "2px",
                      }}
                    >
                      Open ↗
                    </a>
                    {activeGroup.kind === "pdf" && (
                      <a
                        href={activeGroup.downloadHref}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px]"
                        style={{
                          fontFamily: MONO,
                          letterSpacing: "0.28em",
                          color: VOID,
                          borderBottom: `1px solid ${INK}`,
                          paddingBottom: "2px",
                        }}
                      >
                        Download ↓
                      </a>
                    )}
                  </div>
                </div>

                <h3
                  className="mt-5 font-light leading-tight"
                  style={{
                    fontFamily: SANS,
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.02em",
                    color: VOID,
                  }}
                >
                  {activeGroup.kind === "youtube" && activeVideo
                    ? activeVideo.title
                    : activeGroup.label}
                </h3>

                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{
                    fontFamily: SANS,
                    color: INK,
                    maxWidth: "58ch",
                  }}
                >
                  {activeGroup.blurb}
                </p>

                <div
                  className="mt-8 relative w-full overflow-hidden"
                  style={{
                    aspectRatio:
                      activeGroup.kind === "pdf" ? "4 / 5" : "16 / 9",
                    backgroundColor: VOID,
                  }}
                >
                  {activeGroup.kind === "youtube" && activeVideo ? (
                    <iframe
                      key={activeVideo.id}
                      src={`https://www.youtube.com/embed/${activeVideo.id}`}
                      title={activeVideo.title}
                      className="absolute inset-0 h-full w-full"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : activeGroup.kind === "pdf" ? (
                    <iframe
                      key={activeGroup.embed}
                      src={activeGroup.embed}
                      title={activeGroup.label}
                      className="absolute inset-0 h-full w-full"
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  ) : null}
                </div>

                {activeGroup.kind === "youtube" && (
                  <p
                    className="mt-4 text-[10px] uppercase"
                    style={{
                      fontFamily: MONO,
                      letterSpacing: "0.3em",
                      color: STONE,
                    }}
                  >
                    Episode {String(active.videoIdx + 1).padStart(2, "0")} of{" "}
                    {String(activeGroup.videos.length).padStart(2, "0")}
                    <span className="mx-3">·</span>
                    <a
                      href={activeGroup.playlistHref}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: INK }}
                    >
                      Full playlist ↗
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Further Inspiration */}
      <section
        id="inspiration"
        className="w-full"
        style={{
          backgroundColor: PAPER,
          borderTop: `1px solid ${STONE}`,
        }}
      >
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 lg:px-16 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <aside className="md:col-span-3">
              <p
                className="md:sticky md:top-28 text-[10px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.32em",
                  color: STONE,
                }}
              >
                Further · Inspiration
              </p>
            </aside>

            <div className="md:col-span-9">
              <h2
                className="font-light leading-[1.05]"
                style={{
                  fontFamily: SANS,
                  fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                  letterSpacing: "-0.025em",
                  color: VOID,
                  maxWidth: "22ch",
                }}
              >
                For further inspiration.
              </h2>

              <p
                className="mt-8 text-lg leading-relaxed"
                style={{ fontFamily: SANS, color: INK, maxWidth: "62ch" }}
              >
                Watch Khan Academy&rsquo;s{" "}
                <em>You Can Learn Anything</em> to get a better appreciation of
                your own potential. Browse the 2014 remake of Carl
                Sagan&rsquo;s <em>Cosmos</em> to see how we, humanity, got here
                and where we could go. On a personal note, here is my own
                (briefly told) college story, a few of my notes for veterans
                pursuing competitive universities, and my own reasons for
                doing anything difficult or challenging.
              </p>

              <p
                className="mt-6 text-lg leading-relaxed italic"
                style={{ fontFamily: SANS, color: INK }}
              >
                Then, ready or not, the world needs you. So let&rsquo;s begin.
              </p>

              {/* Two embeds */}
              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Khan Academy */}
                <figure
                  style={{
                    border: `1px solid ${STONE}`,
                    backgroundColor: PAPER,
                  }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "16 / 9", backgroundColor: VOID }}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/JC82Il2cjqA"
                      title="Khan Academy — You Can Learn Anything"
                      className="absolute inset-0 h-full w-full"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <figcaption
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderTop: `1px solid ${STONE}` }}
                  >
                    <div>
                      <p
                        className="text-[10px] uppercase"
                        style={{
                          fontFamily: MONO,
                          letterSpacing: "0.3em",
                          color: STONE,
                        }}
                      >
                        Khan Academy
                      </p>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: SANS,
                          color: VOID,
                          fontSize: "1rem",
                        }}
                      >
                        You Can Learn Anything
                      </p>
                    </div>
                    <a
                      href="https://www.youtube.com/watch?v=JC82Il2cjqA"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] uppercase"
                      style={{
                        fontFamily: MONO,
                        letterSpacing: "0.28em",
                        color: VOID,
                        borderBottom: `1px solid ${INK}`,
                        paddingBottom: "2px",
                      }}
                    >
                      Watch ↗
                    </a>
                  </figcaption>
                </figure>

                {/* Cosmos — external doc site; embedded if it allows, link out either way */}
                <figure
                  style={{
                    border: `1px solid ${STONE}`,
                    backgroundColor: PAPER,
                  }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: "16 / 9", backgroundColor: VOID }}
                  >
                    <iframe
                      src="https://watchdocumentaries.com/cosmos-a-spacetime-odyssey/"
                      title="Cosmos — A Spacetime Odyssey"
                      className="absolute inset-0 h-full w-full"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      allow="fullscreen"
                    />
                  </div>
                  <figcaption
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderTop: `1px solid ${STONE}` }}
                  >
                    <div>
                      <p
                        className="text-[10px] uppercase"
                        style={{
                          fontFamily: MONO,
                          letterSpacing: "0.3em",
                          color: STONE,
                        }}
                      >
                        2014 · Carl Sagan
                      </p>
                      <p
                        className="mt-1"
                        style={{
                          fontFamily: SANS,
                          color: VOID,
                          fontSize: "1rem",
                        }}
                      >
                        Cosmos — A Spacetime Odyssey
                      </p>
                    </div>
                    <a
                      href="https://watchdocumentaries.com/cosmos-a-spacetime-odyssey/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] uppercase"
                      style={{
                        fontFamily: MONO,
                        letterSpacing: "0.28em",
                        color: VOID,
                        borderBottom: `1px solid ${INK}`,
                        paddingBottom: "2px",
                      }}
                    >
                      Watch ↗
                    </a>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
