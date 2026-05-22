"use client";
import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !consent) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail("");
      setConsent(false);
    }, 3200);
  };

  return (
    <section id="letter" data-testid="newsletter" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div className="grid grid-cols-12">
        <div
          className="col-span-12 lg:col-span-5 px-5 md:px-8 lg:px-12 py-16 lg:py-24"
          style={{ borderRight: "1px solid var(--ink)" }}
        >
          <div className="meta" style={{ color: "var(--muted)" }}>
            § 05 — Correspondence
          </div>
          <h2 className="h-display mt-4" style={{ fontSize: "clamp(40px, 6.5vw, 96px)" }}>
            A word
            <br />
            <span className="font-serif-ed italic font-normal lowercase tracking-tight">between us.</span>
          </h2>
          <p className="font-serif-ed text-xl md:text-2xl leading-snug mt-8 max-w-[44ch]">
            New essays, field notes, and stray thoughts arrive irregularly — when
            there is something worth saying. No schedule. No noise.
          </p>

          <div className="meta mt-10 flex items-center gap-3" style={{ color: "var(--muted)" }}>
            <span className="h-1.5 w-1.5 rounded-full accent-bg" />
            <span>Roughly six dispatches a year</span>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 px-5 md:px-8 lg:px-12 py-16 lg:py-24">
          <form
            onSubmit={submit}
            data-testid="newsletter-form"
            className="max-w-xl"
          >
            <label className="meta block mb-3" style={{ color: "var(--muted)" }}>
              Your Address
            </label>
            <input
              data-testid="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="reader@somewhere.earth"
              className="input-stark"
            />

            <label
              className="mt-8 flex items-start gap-3 cursor-pointer select-none"
              data-testid="newsletter-consent-row"
            >
              <span
                aria-hidden
                className="mt-[3px] inline-flex h-4 w-4 items-center justify-center"
                style={{
                  border: "1px solid var(--ink)",
                  background: consent ? "var(--ink)" : "transparent",
                }}
              >
                {consent && <Check size={12} color="var(--paper)" />}
              </span>
              <input
                data-testid="newsletter-consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="sr-only"
              />
              <span className="font-serif-ed text-base md:text-lg leading-snug">
                I would like to receive this correspondence — irregular, slow, &amp; without obligation.
              </span>
            </label>

            <div className="mt-10 flex items-center gap-4">
              <button
                type="submit"
                data-testid="newsletter-submit"
                disabled={sent || !email || !consent}
                className="btn-stark"
                style={{
                  opacity: !email || !consent ? 0.55 : 1,
                  cursor: !email || !consent ? "not-allowed" : "pointer",
                }}
              >
                {sent ? "Received" : "Send"} <ArrowRight size={16} />
              </button>
              {sent && (
                <span data-testid="newsletter-sent" className="meta accent-text">
                  ● Filed. Watch your inbox.
                </span>
              )}
            </div>

            <div className="mt-12 tick-divider" />

            <div className="meta mt-6 grid grid-cols-2 gap-4" style={{ color: "var(--muted)" }}>
              <span>For speaking & collaborations</span>
              <span className="text-right">Use the channels shared publicly</span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
