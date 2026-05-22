import React from "react";

const phrases = [
  "Born in Bangladesh",
  "Raised in Greece",
  "U.S. Navy · 10 Years",
  "Stanford · Math & Creative Writing",
  "University of Maine · Earth Science",
  "Fiction · Poetry · Essays",
  "Field Notes from a Long Attention",
];

export default function Marquee() {
  const doubled = [...phrases, ...phrases];
  return (
    <section
      data-testid="marquee"
      className="overflow-hidden"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
        borderBottom: "1px solid var(--ink)",
      }}
    >
      <div className="marquee-track py-5">
        {doubled.map((p, i) => (
          <div key={i} className="flex items-center gap-16 meta whitespace-nowrap">
            <span>{p}</span>
            <span className="accent-text">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
