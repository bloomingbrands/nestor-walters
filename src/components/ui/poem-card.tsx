"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const tapeImages = [
  "/assets/scotch-tape-01.png",
  "/assets/scotsh-tape-02.png",
  "/assets/scotsh-tape-03.png",
  "/assets/scotsh-tape-04.png",
];

interface PoemCardProps {
  title: string;
  publication: string;
  lines: string[];
  href: string;
  rotate?: number;
  color?: string;
  bgColor?: string;
  /** Which scotch tape strip image to use (1–4) */
  tape?: 1 | 2 | 3 | 4;
  /** Tighter layout for bento column height-matched to polaroids */
  compact?: boolean;
  /** Extra downward offset for the tape strip in px */
  tapeOffsetY?: number;
}

export function PoemCard({
  title,
  publication,
  lines,
  href,
  rotate = -1,
  color = "bg-yellow-100",
  bgColor,
  tape = 1,
  compact = false,
  tapeOffsetY = 0,
}: PoemCardProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  const openModal = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const poemText = lines.join("\n");

  return (
    <>
      <div className={cn("relative flex justify-center", compact ? "pt-3" : "pt-5")}>
        <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/3" style={tapeOffsetY ? { marginTop: tapeOffsetY } : undefined}>
          <Image
            src={tapeImages[(tape - 1) % tapeImages.length]}
            alt=""
            width={compact ? 52 : 72}
            height={compact ? 20 : 28}
            className="object-contain"
            style={{ width: "auto", height: "auto" }}
            loading="eager"
          />
        </div>

        <motion.button
          type="button"
          onClick={openModal}
          aria-label={`Read ${title}`}
          className={cn(
            "relative w-full max-w-full cursor-pointer text-left shadow-[4px_6px_20px_rgba(0,0,0,0.45)]",
            !bgColor && color,
            compact ? "p-2 pt-4" : "p-4 pt-6 sm:p-5 sm:pt-7",
          )}
          style={{ rotate, ...(bgColor ? { backgroundColor: bgColor } : {}) }}
          whileHover={{
            y: compact ? -2 : -6,
            rotate: 0,
            scale: compact ? 1.01 : 1.03,
            boxShadow: "6px 10px 28px rgba(0,0,0,0.55)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <p
            className={cn(
              "leading-snug text-zinc-800 whitespace-pre-line",
              compact
                ? "line-clamp-3 text-[11px] md:text-xs"
                : "line-clamp-6 text-sm leading-relaxed sm:text-base",
            )}
          >
            {poemText}
          </p>
          <div className={cn("border-t border-zinc-300/60", compact ? "mt-2 pt-2" : "mt-4 pt-3")}>
            <p
              className={cn(
                "font-semibold leading-snug tracking-wide text-zinc-700",
                compact ? "text-[10px]" : "text-xs",
              )}
            >
              {title}
            </p>
            <p
              className={cn(
                "mt-0.5 uppercase tracking-widest text-zinc-500",
                compact ? "text-[9px]" : "text-xs",
              )}
            >
              {publication}
            </p>
            <p
              className={cn(
                "text-zinc-400",
                compact ? "mt-1 text-[9px]" : "mt-2 text-xs",
              )}
            >
              {compact ? "Tap to read" : "Click to read full poem"}
            </p>
          </div>
        </motion.button>
      </div>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[200] bg-black/75 backdrop-blur-sm"
            aria-hidden
            onClick={close}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal
            aria-labelledby={`${panelId}-title`}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4 sm:p-8"
            onClick={close}
          >
            <div
              className={cn(
                "relative max-h-[min(88vh,42rem)] w-full max-w-lg overflow-y-auto shadow-[0_24px_64px_rgba(0,0,0,0.55)]",
                !bgColor && color,
              )}
              style={bgColor ? { backgroundColor: bgColor } : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-300/50 bg-inherit/95 px-5 py-3 backdrop-blur-sm">
                <div className="min-w-0 pr-4">
                  <p
                    id={`${panelId}-title`}
                    className="truncate font-semibold tracking-wide text-zinc-800"
                  >
                    {title}
                  </p>
                  <p className="mt-0.5 text-[10px] uppercase tracking-widest text-zinc-500">
                    {publication}
                  </p>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={close}
                  className="shrink-0 text-xs uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-zinc-900"
                >
                  Close
                </button>
              </div>

              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <p className="whitespace-pre-line text-base leading-relaxed text-zinc-800 sm:text-lg sm:leading-loose">
                  {poemText}
                </p>
              </div>

              <div className="border-t border-zinc-300/60 px-6 py-4 sm:px-8">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-900 hover:underline"
                >
                  Read at {publication} →
                </a>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
