"use client";

import { useState } from "react";
import { PAPER, STONE, INK, VOID, MONO, SANS } from "./tokens";

export function NewsletterV5() {
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <section
      id="newsletter"
      className="w-full"
      style={{
        backgroundColor: PAPER,
        borderTop: `1px solid ${STONE}`,
        color: INK,
      }}
    >
      <div className="mx-auto max-w-3xl px-6 md:px-12 py-24 md:py-32 text-center">
        <p
          className="text-[13px] md:text-[14px] uppercase"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.38em",
            color: INK,
            fontWeight: 500,
          }}
        >
          Newsletter
        </p>

        <h2
          className="mt-6 font-light leading-[1.05]"
          style={{
            fontFamily: SANS,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            letterSpacing: "-0.025em",
            color: VOID,
          }}
        >
          Irregular notes from the field, the code, and the road.
        </h2>

        <p
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed"
          style={{ fontFamily: SANS, color: INK }}
        >
          No schedule, no noise.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email && agree) setSubmitted(true);
          }}
          className="mx-auto mt-12 flex max-w-md flex-col items-center gap-6"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            disabled={submitted}
            placeholder="your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent px-0 py-3 text-center text-sm outline-none"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.08em",
              color: VOID,
              borderBottom: `1px solid ${STONE}`,
            }}
          />

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 cursor-pointer accent-[#101014]"
              style={{ accentColor: VOID }}
            />
            <span
              className="text-[11px] leading-relaxed"
              style={{ fontFamily: MONO, color: INK, letterSpacing: "0.05em" }}
            >
              I would like to be notified.
            </span>
          </label>

          <button
            type="submit"
            disabled={submitted || !email || !agree}
            className="mt-2 inline-flex items-center gap-3 px-12 py-3 text-[11px] uppercase transition-opacity hover:opacity-90 disabled:cursor-not-allowed"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.3em",
              color: PAPER,
              backgroundColor: VOID,
            }}
          >
            {submitted ? "Received" : "SIGNUP"}
          </button>
          <p aria-live="polite" className="sr-only">
            {submitted ? "You have been subscribed." : ""}
          </p>
        </form>

        <p
          className="mt-16 text-[13px] md:text-[14px] uppercase"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.38em",
            color: INK,
            fontWeight: 500,
          }}
        >
          Sword Circle Pen
        </p>
      </div>
    </section>
  );
}
