"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterCorrespondence() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <section
      id="correspondence"
      className="relative w-full h-full flex flex-col overflow-hidden"
    >
      {/* Atmospheric warm glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, oklch(0.20 0.04 75 / 0.12) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col flex-1 justify-start px-8 pt-28 pb-12 md:px-12 md:pt-36 md:pb-16">
        <div className="w-full max-w-md">
          {/* Wax seal / mark */}
<motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
            style={{ color: "oklch(0.88 0.1 80)", fontFamily: "var(--font-caveat)" }}
          >
            A word between us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base text-white/60 leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
          >
            New essays, field notes, and stray thoughts arrive irregularly — when there is something worth saying. No schedule, no noise.
          </motion.p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.9, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="flex flex-col items-start gap-4"
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
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/50 focus:outline-none transition-colors duration-500 disabled:text-white/40 disabled:cursor-not-allowed"
                    style={{
                      fontFamily: "var(--font-geist-sans)",
                      fontWeight: 300,
                    }}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-6 left-0 text-[11px] text-amber-400/70"
                      style={{ fontFamily: "var(--font-geist-sans)" }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <label className="flex w-full items-start gap-3 mt-2 cursor-pointer group">
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
                  <span
                    className="mt-0.5 w-3.5 h-3.5 rounded-sm border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white/40 peer-checked:bg-white/15 peer-checked:border-white/40 shrink-0"
                  >
                    <svg
                      className="w-2.5 h-2.5 text-white/60 opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span
                    className="text-[11px] leading-relaxed text-white/45 transition-colors duration-300 group-hover:text-white/60"
                    style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
                  >
                    I would like to receive this correspondence.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="group relative px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/60 border border-amber-200/30 transition-all duration-500 hover:text-white/90 hover:border-amber-200/70 disabled:text-white/25 disabled:border-white/10 disabled:cursor-not-allowed mt-2"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  <span className="relative z-10">{sending ? "Sending..." : "Send"}</span>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                <p
                  className="text-white/60 text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
                >
                  Noted. The next letter will find you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-16 text-[10px] uppercase tracking-[0.25em] text-white/25"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Sword Circle Pen
          </motion.p>
        </div>
      </div>
    </section>
  );
}
