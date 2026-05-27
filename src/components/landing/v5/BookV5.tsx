import {
  getBookBySlug,
  getBookPriceUsdCents,
  wpPlainText,
} from "@/lib/wordpress";
import type { CartLine } from "@/context/cart-context";
import { OrderBookButtonV5 } from "./OrderBookButtonV5";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS, SLATE } from "./tokens";


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
              Jacob Wilder has nothing against Earth Day, but he has little
              patience for nostalgia — especially when the past he is asked to
              honor is one he never lived. Then the spirits arrive. What they
              offer is not comfort. It is a choice: our old way of life, or the
              planet that makes it possible.
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

        {/* MIDDLE — book cover */}
        <div
          className="lg:col-span-8 flex items-center justify-center p-8 md:p-12 lg:p-16"
          style={{ backgroundColor: PAPER }}
        >
          <div className="relative overflow-hidden" style={{ aspectRatio: "2 / 3", maxWidth: "420px", width: "100%" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/blue-cover_web.png"
              alt="An Earth Day Eulogy — front cover"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
