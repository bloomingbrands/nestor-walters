import React from "react";
import Image from "next/image";

const items = [
  {
    n: "I",
    title: "The Ascent",
    note: "On climbing, and what waits at altitude.",
    img: "https://images.unsplash.com/reserve/aOcWqRTfQ12uwr3wWevA_14401305508_804b300054_o.jpg?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGFzY2VudCUyMG1pbmltYWx8ZW58MHx8fHwxNzc5NDE2ODk1fDA&ixlib=rb-4.1.0&q=85",
    coord: "47.0 N · 122.4 W",
  },
  {
    n: "II",
    title: "Between Deployments",
    note: "Open water. The long, blue silence.",
    img: "https://images.pexels.com/photos/30037147/pexels-photo-30037147.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    coord: "32.7 N · 117.1 W",
  },
  {
    n: "III",
    title: "Earth & Memory",
    note: "Strata, sediment, the patience of stone.",
    img: "https://images.unsplash.com/photo-1624973192803-c52b7530afe8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxlYXJ0aCUyMHRleHR1cmUlMjBhYnN0cmFjdHxlbnwwfHx8fDE3Nzk0MTY4OTV8MA&ixlib=rb-4.1.0&q=85",
    coord: "44.9 N · 68.7 W",
  },
];

export default function PhotoSeries() {
  return (
    <section data-testid="photo-series" style={{ borderBottom: "1px solid var(--ink)" }}>
      <div
        className="grid grid-cols-12 items-end"
        style={{ borderBottom: "1px solid var(--ink)" }}
      >
        <div className="col-span-12 md:col-span-7 px-5 md:px-8 lg:px-12 py-10" style={{ borderRight: "1px solid var(--ink)" }}>
          <div className="meta" style={{ color: "var(--muted)" }}>§ 02 — Plates</div>
          <h2 className="h-display mt-4" style={{ fontSize: "clamp(40px, 6vw, 88px)" }}>
            Three Plates
            <br />
            <span className="font-serif-ed italic font-normal lowercase tracking-tight">from the field.</span>
          </h2>
        </div>
        <div className="col-span-12 md:col-span-5 px-5 md:px-8 lg:px-12 py-10">
          <p className="font-serif-ed text-lg md:text-xl leading-snug">
            Three terrains the writing returns to — peak, sea, and stone. The images are
            stand-ins. The places are real, and they don&apos;t argue.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {items.map((it, i) => (
          <figure
            key={it.n}
            data-testid={`plate-${it.n}`}
            className="relative group cursor-pointer"
            style={{
              borderRight: i < items.length - 1 ? "1px solid var(--ink)" : "none",
              borderBottom: "1px solid var(--ink)",
            }}
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
              <Image
                fill
                src={it.img}
                alt={it.title}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="duotone w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div
                className="absolute top-4 left-4 meta px-2 py-1"
                style={{ background: "var(--paper)", border: "1px solid var(--ink)" }}
              >
                Plate {it.n}
              </div>
              <div
                className="absolute bottom-4 right-4 meta px-2 py-1"
                style={{ background: "var(--paper)", border: "1px solid var(--ink)" }}
              >
                {it.coord}
              </div>
            </div>
            <figcaption className="px-5 py-6" style={{ borderTop: "1px solid var(--ink)" }}>
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display font-black text-2xl md:text-3xl uppercase tracking-tight">
                  {it.title}
                </h3>
                <span className="meta accent-text">{it.n}</span>
              </div>
              <p className="font-serif-ed italic text-lg mt-3">{it.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
