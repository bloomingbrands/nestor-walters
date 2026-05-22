"use client";

import React from "react";

const faqs = [
  {
    question: "What is the Veteran Transfer Project?",
    answer:
      "A mentorship and guidance initiative helping military veterans navigate admission to elite academic institutions. Built from lived experience at Stanford and the University of Maine.",
  },
  {
    question: "Who is this for?",
    answer:
      "Active-duty service members preparing to transition, veterans considering higher education, and anyone who believes service experience deserves recognition in the academic world.",
  },
  {
    question: "What institutions do you work with?",
    answer:
      "The project focuses on elite and research-intensive universities — Stanford, Ivy League institutions, and top-tier public research programs — but the strategies apply broadly.",
  },
  {
    question: "Is there a cost?",
    answer:
      "The core guidance is offered freely. Specific mentorship arrangements and speaking engagements are discussed individually.",
  },
  {
    question: "How do I get started?",
    answer:
      "Use the speaking inquiry channel or reach out directly. Every journey begins with a conversation about where you have been and where you hope to go.",
  },
  {
    question: "What makes this different from other veteran programs?",
    answer:
      "This is not a bureaucracy. It is one veteran who walked the same path, offering what he learned to those coming behind him.",
  },
];

export function VeteranFaq() {
  return (
    <section
      id="veteran-faq"
      className="py-24 px-6"
    >
      <div className="mx-auto max-w-3xl">
        <p
          className="mb-12 text-center text-sm font-normal uppercase tracking-[0.3em]"
          style={{
            fontFamily: "var(--font-geist-mono)",
            color: "oklch(0.65 0.08 55)",
          }}
        >
          Questions
        </p>

        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border-b border-white/10 py-6"
          >
            <summary
              className="flex cursor-pointer list-none items-center justify-between text-base text-white"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <span>{faq.question}</span>
              <span
                className="ml-4 inline-block transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-zinc-400"
                >
                  <path
                    d="M6 1V11M1 6H11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </summary>
            <p
              className="pt-4 text-sm font-light leading-relaxed text-zinc-400"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
