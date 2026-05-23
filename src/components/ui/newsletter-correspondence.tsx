"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function NewsletterCorrespondence() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("A valid address, please.");
      inputRef.current?.focus();
      return;
    }
    if (!consent) {
      setError("Please confirm your wish to receive correspondence.");
      return;
    }

    setError("");
    setSending(true);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "The message could not be sent.");
        setSending(false);
        return;
      }

      setSubmitted(true);
    } catch {
      setError("The message could not be sent.");
      setSending(false);
    }
  };

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 36 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" } as const,
    transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="correspondence"
      aria-labelledby="correspondence-heading"
      className="relative w-full overflow-hidden"
    >
      {/* Top hairline — marks the section boundary without a hard edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.38 0.04 75 / 0.5) 30%, oklch(0.38 0.04 75 / 0.5) 70%, transparent)",
        }}
      />

      {/* Candlelight glow — layered so the center feels warm, not flat */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 38%, oklch(0.22 0.06 75 / 0.22) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 inset-x-0 h-2/5"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, oklch(0.16 0.04 75 / 0.18) 0%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-28 md:py-36">
        <div
          className="w-full max-w-2xl px-10 py-14 md:px-20 md:py-20 lg:px-24"
          style={{
            backgroundColor: "oklch(0.94 0.018 80)",
            boxShadow: "0 12px 48px rgba(0,0,0,0.4), 0 2px 10px rgba(0,0,0,0.2)",
            border: "1px solid oklch(0.82 0.025 75 / 0.5)",
          }}
        >

          <motion.p
            {...reveal(0.05)}
            className="text-xs uppercase tracking-[0.3em] mb-4"
            style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.45 0.08 55)" }}
          >
            Sign up for our newsletter
          </motion.p>

          <motion.h2
            id="correspondence-heading"
            {...reveal(0.1)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight"
            style={{ color: "oklch(0.22 0.03 55)", fontFamily: "var(--font-caveat)" }}
          >
            A word between us
          </motion.h2>

          <motion.p
            {...reveal(0.22)}
            className="text-base md:text-lg lg:text-xl leading-relaxed mb-10"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontWeight: 300,
              color: "oklch(0.35 0.02 55)",
            }}
          >
            New essays, field notes, and stray thoughts arrive irregularly — when there is something worth saying. No schedule, no noise.
          </motion.p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.9, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <div className="relative w-full">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    disabled={sending}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="your address"
                    required
                    aria-label="Email address"
                    className="w-full bg-transparent border-b border-black/25 px-0 py-3 text-base text-black/85 placeholder:text-black/35 focus:border-black/55 focus:outline-none transition-colors duration-500 disabled:text-black/30 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      className="absolute -bottom-6 left-0 text-[11px]"
                      style={{ color: "oklch(0.55 0.10 45)", fontFamily: "var(--font-geist-sans)" }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <label className="flex w-full items-start gap-3 mt-1 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    disabled={sending}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (error) setError("");
                    }}
                    className="sr-only peer"
                  />
                  <span className="mt-0.5 w-3.5 h-3.5 rounded-sm border border-black/30 flex items-center justify-center transition-all duration-300 group-hover:border-black/50 peer-checked:bg-black/10 peer-checked:border-black/50 shrink-0">
                    <svg
                      className="w-2.5 h-2.5 opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      aria-hidden="true"
                      style={{ stroke: "oklch(0.45 0.08 55)" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span
                    className="text-[11px] leading-relaxed text-black/60 transition-colors duration-300 group-hover:text-black/85"
                    style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
                  >
                    I would like to receive this correspondence.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative w-fit px-7 py-3 mt-2 text-xs uppercase tracking-[0.2em] transition-all duration-500 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 rounded-sm"
                  style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.22 0.03 55)" }}
                >
                  <span className="relative z-10 transition-colors duration-500 group-hover:text-[oklch(0.55_0.10_75)] group-disabled:text-black/30">
                    {sending ? "Sending..." : "Send"}
                  </span>
                  <span
                    className="absolute inset-0 border transition-all duration-500 group-hover:bg-black/[0.04]"
                    style={{ borderColor: "oklch(0.45 0.08 55 / 0.5)" }}
                  />
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300, color: "oklch(0.35 0.02 55)" }}
                >
                  Noted. The next letter will find you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Colophon — "Sword Circle Pen" as a centered seal between flanking rules */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.55 }}
            className="mt-20 flex items-center gap-5"
            aria-hidden="true"
          >
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to right, transparent, oklch(0.26 0.01 55))" }}
            />
            <span
              className="text-[9px] uppercase tracking-[0.32em]"
              style={{ fontFamily: "var(--font-geist-mono)", color: "oklch(0.34 0.008 55)" }}
            >
              Sword Circle Pen
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(to left, transparent, oklch(0.26 0.01 55))" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
