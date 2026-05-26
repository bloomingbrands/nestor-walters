import {
  getBookBySlug,
  getBookPriceUsdCents,
  wpPlainText,
} from "@/lib/wordpress";
import type { CartLine } from "@/context/cart-context";
import { OrderBookButtonV5 } from "./OrderBookButtonV5";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS, SLATE } from "./tokens";

// Drawings from the Earth Day Eulogy series (also used on v1).
const SIDE_IMAGES: { src: string; alt: string }[] = [
  { src: "/assets/EDE1_EddiesGhost_web.jpg", alt: "Eddie's Ghost" },
  { src: "/assets/EDE2_EarthHeart_web.jpg", alt: "Earth Heart" },
  { src: "/assets/EDE3_Jaya_web.jpg", alt: "Jaya" },
  { src: "/assets/EDE4_Rider_web.jpg", alt: "Rider" },
];

export async function BookV5() {
  const book = await getBookBySlug("an-earth-day-eulogy");
  const priceCents = book ? getBookPriceUsdCents(book) : null;
  const line: CartLine | null =
    book && priceCents !== null
      ? {
          id: book.id,
          slug: book.slug,
          title: wpPlainText(book.title.rendered) || "An Earth Day Eulogy",
          unitPriceCents: priceCents,
        }
      : null;

  return (
    <section
      id="book"
      className="relative w-full"
      style={{ backgroundColor: MIST, color: INK }}
    >
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0"
        style={{ borderTop: `1px solid ${STONE}` }}
      >
        {/* LEFT — copy + order */}
        <div
          className="lg:col-span-4 flex flex-col justify-between p-8 md:p-12 lg:p-16"
          style={{ borderRight: `1px solid ${STONE}` }}
        >
          <div>
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: SLATE,
              }}
            >
              Volume · 2025
            </p>
            <h2
              className="mt-6 font-light leading-[1.02]"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.025em",
                color: VOID,
              }}
            >
              An Earth Day
              <br />
              Eulogy
            </h2>
            <p
              className="mt-8 text-base leading-relaxed"
              style={{ fontFamily: SANS, color: INK, maxWidth: "40ch" }}
            >
              A ghost story. Wilder, a veteran father, is visited by spirits
              who warn that either Earth — or our old way of life — must
              change.
            </p>
            <p
              className="mt-4 text-sm leading-relaxed italic"
              style={{ fontFamily: SANS, color: SLATE, maxWidth: "40ch" }}
            >
              First-edition paperback, independently printed using 100%
              post-consumer materials.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-4">
            <OrderBookButtonV5 line={line} />
            {line && (
              <p
                className="text-[10px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.28em",
                  color: SLATE,
                }}
              >
                ${(line.unitPriceCents / 100).toFixed(2)} · ships from us ·
                secure PayPal checkout
              </p>
            )}
            <a
              href="https://books2read.com"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.28em",
                color: INK,
              }}
            >
              Also on digital platforms ↗
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>

        {/* MIDDLE — book covers */}
        <div
          className="lg:col-span-4 flex items-center justify-center p-8 md:p-12 lg:p-16"
          style={{ borderRight: `1px solid ${STONE}`, backgroundColor: PAPER }}
        >
          <div className="flex w-full gap-4 justify-center">
            {/* Front cover */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "2 / 3", minWidth: "260px", maxWidth: "320px", flex: "1 1 260px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/earth-day-eulogy.png"
                alt="An Earth Day Eulogy — front cover"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            {/* Back cover */}
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "2 / 3", minWidth: "260px", maxWidth: "320px", flex: "1 1 260px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/Earth-day-eulogy-back-cover.png"
                alt="An Earth Day Eulogy — back cover"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT — 4 image grid */}
        <div className="lg:col-span-4 grid grid-cols-2">
          {SIDE_IMAGES.map((img, i) => (
            <div
              key={img.src}
              className="relative"
              style={{
                aspectRatio: "1 / 1",
                backgroundColor: MIST,
                borderBottom: i < 2 ? `1px solid ${STONE}` : "none",
                borderRight: i % 2 === 0 ? `1px solid ${STONE}` : "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
