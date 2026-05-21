"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function NewsletterCorrespondence() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("A valid address, please.");
      inputRef.current?.focus();
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      id="correspondence"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "oklch(0.08 0.005 55)" }}
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

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-28 md:py-36">
        <div className="max-w-lg w-full text-center">
          {/* Wax seal / mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mb-8 w-10 h-10 rounded-full border flex items-center justify-center"
            style={{
              borderColor: "oklch(0.65 0.08 55 / 0.4)",
              backgroundColor: "oklch(0.65 0.08 55 / 0.08)",
            }}
          >
            <span
              className="text-lg"
              style={{
                color: "oklch(0.65 0.08 55 / 0.7)",
                fontFamily: "var(--font-caveat)",
              }}
            >
              N
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-4"
            style={{ fontFamily: "var(--font-caveat)" }}
          >
            A word between us
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-sm md:text-base text-white/50 leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
          >
            New essays, field notes, and stray thoughts arrive irregularly — when there is something worth saying. No schedule, no noise.
          </motion.p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0 max-w-sm mx-auto"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="your address"
                    required
                    className="w-full bg-transparent border-b border-white/20 px-0 py-3 text-sm text-white/80 placeholder:text-white/25 focus:border-white/50 focus:outline-none transition-colors duration-500"
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
                <button
                  type="submit"
                  className="group relative px-6 py-3 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors duration-500 hover:text-white/90 sm:ml-6 sm:mt-0 mt-2"
                  style={{ fontFamily: "var(--font-geist-mono)" }}
                >
                  <span className="relative z-10">Send</span>
                  <span className="absolute bottom-2 left-6 right-6 h-px bg-white/20 transition-all duration-500 group-hover:bg-white/50" />
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
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mt-16 text-[10px] uppercase tracking-[0.25em] text-white/15"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            Sword Circle Pen
          </motion.p>
        </div>
      </div>
    </section>
  );
}
