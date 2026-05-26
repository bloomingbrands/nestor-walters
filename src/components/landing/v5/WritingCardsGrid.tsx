"use client";

import { useEffect, useState } from "react";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS } from "./tokens";

export type WritingCard = {
  call: string;
  genre: string;
  title: string;
  publication: string;
  year: string;
  excerpt: string;
  status: "Published" | "Forthcoming" | "Hosted here";
  cta?: string;
  externalUrl?: string;
  externalLabel?: string;
  hostedHtml?: string | null;
  hostedDate?: string | null;
};

export function WritingCardsGrid({ cards }: { cards: WritingCard[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx]);

  const open = openIdx !== null ? cards[openIdx] : null;

  return (
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 auto-rows-[minmax(320px,auto)]">
        {cards.map((c, i) => {
          const isFeatured = c.genre === "Essay";
          return (
            <li
              key={c.call}
              className={`h-full ${isFeatured ? "sm:row-span-2" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                className="block h-full w-full text-left"
              >
                <article
                  className="relative flex h-full flex-col p-6 md:p-7 transition-colors hover:bg-[#fafafa]"
                  style={{
                    backgroundColor: PAPER,
                    border: `1px solid ${STONE}`,
                    fontFamily: MONO,
                    color: INK,
                    minHeight: "320px",
                  }}
                >
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
                    style={{ fontFamily: MONO, color: INK, flex: 1 }}
                  >
                    {c.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span
                      className="text-[10px] uppercase"
                      style={{ letterSpacing: "0.3em", color: STONE }}
                    >
                      {c.status}
                    </span>
                    <span
                      className="text-[10px] uppercase"
                      style={{
                        letterSpacing: "0.3em",
                        color: VOID,
                        borderBottom: `1px solid ${INK}`,
                        paddingBottom: "2px",
                      }}
                    >
                      {c.hostedHtml ? "Read here →" : (c.cta ?? "Read →")}
                    </span>
                  </div>
                </article>
              </button>
            </li>
          );
        })}
      </ul>

      {open && (
        <Modal card={open} onClose={() => setOpenIdx(null)} />
      )}
    </>
  );
}

function Modal({
  card,
  onClose,
}: {
  card: WritingCard;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      className="fixed inset-0 z-50 flex items-stretch justify-center"
      style={{ backgroundColor: "rgba(16,16,20,0.55)" }}
      onClick={onClose}
    >
      <div
        className="relative my-0 sm:my-8 mx-0 sm:mx-6 w-full max-w-[860px] overflow-y-auto"
        style={{
          backgroundColor: PAPER,
          border: `1px solid ${STONE}`,
          color: INK,
          maxHeight: "100vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 md:px-10 py-4"
          style={{
            backgroundColor: "rgba(255,254,255,0.96)",
            backdropFilter: "blur(6px)",
            borderBottom: `1px solid ${STONE}`,
          }}
        >
          <p
            className="text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: STONE,
            }}
          >
            <span style={{ color: INK }}>{card.call}</span>
            <span className="mx-3">·</span>
            {card.genre}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.3em",
              color: VOID,
              borderBottom: `1px solid ${INK}`,
              paddingBottom: "2px",
            }}
          >
            Close ✕
          </button>
        </div>

        <div className="px-6 md:px-10 pt-10 pb-12">
          <p
            className="text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: STONE,
            }}
          >
            {card.publication}
            {card.hostedDate && (
              <>
                <span className="mx-3">·</span>
                <span>
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }).format(new Date(card.hostedDate))}
                </span>
              </>
            )}
          </p>

          <h2
            className="mt-4 font-light leading-[1.05]"
            style={{
              fontFamily: SANS,
              fontSize: "clamp(1.75rem, 4vw, 3rem)",
              letterSpacing: "-0.03em",
              color: VOID,
            }}
          >
            {card.title}
          </h2>

          {card.hostedHtml ? (
            <ModalProse html={card.hostedHtml} />
          ) : (
            <ExternalOnlyBody card={card} />
          )}

          {(card.externalUrl || card.hostedHtml) && (
            <footer
              className="mt-12 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
              style={{ borderTop: `1px solid ${STONE}` }}
            >
              <button
                type="button"
                onClick={onClose}
                className="text-[11px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.3em",
                  color: INK,
                }}
              >
                ← Back to the work
              </button>
              {card.externalUrl && (
                <a
                  href={card.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-3 px-5 py-2.5 text-[11px] uppercase"
                  style={{
                    fontFamily: MONO,
                    letterSpacing: "0.3em",
                    color: PAPER,
                    backgroundColor: VOID,
                  }}
                >
                  {card.externalLabel ?? "View at publisher"}
                  <span aria-hidden>↗</span>
                </a>
              )}
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}

function ExternalOnlyBody({ card }: { card: WritingCard }) {
  return (
    <div className="mt-8">
      <p
        className="text-base leading-relaxed"
        style={{ fontFamily: SANS, color: INK, maxWidth: "62ch" }}
      >
        {card.excerpt}
      </p>
      <div
        className="mt-10 p-6"
        style={{ backgroundColor: MIST, border: `1px solid ${STONE}` }}
      >
        <p
          className="text-[10px] uppercase"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.32em",
            color: STONE,
          }}
        >
          Where to find it
        </p>
        <p
          className="mt-3 text-base leading-relaxed"
          style={{ fontFamily: SANS, color: INK }}
        >
          {card.status === "Forthcoming"
            ? `This work is forthcoming in ${card.publication}. Use the button below to follow the publisher and catch it on release.`
            : `This work lives at ${card.publication}. Use the button below to read it at the publisher.`}
        </p>
      </div>
    </div>
  );
}

function ModalProse({ html }: { html: string }) {
  return (
    <>
      <style>{`
        .v5-modal-prose { font-family: ${SANS}; color: ${INK}; }
        .v5-modal-prose p { margin-bottom: 1.25rem; line-height: 1.75; font-size: 1.05rem; }
        .v5-modal-prose a { color: ${VOID}; text-decoration: underline; text-decoration-color: ${INK}; text-underline-offset: 4px; }
        .v5-modal-prose h2, .v5-modal-prose h3 { color: ${VOID}; font-weight: 300; letter-spacing: -0.02em; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.15; }
        .v5-modal-prose h2 { font-size: 1.875rem; }
        .v5-modal-prose h3 { font-size: 1.5rem; }
        .v5-modal-prose blockquote { border-left: 1px solid ${INK}; padding-left: 1.5rem; margin: 1.75rem 0; font-style: italic; color: ${VOID}; }
        .v5-modal-prose ul, .v5-modal-prose ol { padding-left: 1.5rem; margin: 1rem 0 1.25rem; }
        .v5-modal-prose ul { list-style: disc; }
        .v5-modal-prose ol { list-style: decimal; }
        .v5-modal-prose li { margin-bottom: 0.5rem; }
        .v5-modal-prose img { max-width: 100%; height: auto; margin: 1.5rem 0; }
        .v5-modal-prose figure { margin: 2rem 0; }
        .v5-modal-prose code { background: ${MIST}; border: 1px solid ${STONE}; padding: 0.1em 0.4em; font-family: ${MONO}; font-size: 0.9em; color: ${VOID}; }
        .v5-modal-prose pre { background: ${MIST}; border: 1px solid ${STONE}; padding: 1.25rem; margin: 1.5rem 0; overflow-x: auto; font-family: ${MONO}; font-size: 0.9em; color: ${INK}; }
        .v5-modal-prose hr { border: 0; border-top: 1px solid ${STONE}; margin: 2.5rem 0; }
        .v5-modal-prose em { font-style: italic; }
        .v5-modal-prose strong { font-weight: 500; color: ${VOID}; }
      `}</style>
      <div
        className="v5-modal-prose mt-10"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </>
  );
}
