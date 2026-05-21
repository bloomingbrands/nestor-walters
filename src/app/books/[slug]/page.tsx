import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OrderBookButton } from "@/components/books/order-book-button";
import {
  formatBookPriceUsd,
  getBookBySlug,
  getBookCoverUrl,
  getBookPriceUsdCents,
  stripBookCoverFromContentHtml,
  wpPlainText,
} from "@/lib/wordpress";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Book — Nestor Walters" };
  const title = book.acf?.title ?? wpPlainText(book.title.rendered);
  return {
    title: `${title} — Books — Nestor Walters`,
    description: wpPlainText(book.excerpt.rendered).slice(0, 160) || undefined,
  };
}

export default async function BookDetailPage({ params }: Props) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const title = book.acf?.title ?? wpPlainText(book.title.rendered);
  const author = book.acf?.author;
  const priceLabel = formatBookPriceUsd(book);
  const priceCents = getBookPriceUsdCents(book);
  const cover = getBookCoverUrl(book);
  const bodyHtml = stripBookCoverFromContentHtml(book.content.rendered, cover);
  const external = book.acf?.external_url?.trim();
  const modified = book.modified
    ? new Date(book.modified).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const line =
    priceCents !== null
      ? { id: book.id, slug: book.slug, title, unitPriceCents: priceCents }
      : null;

  return (
    <main className="px-6 pb-24 pt-10 md:px-10">
      <article className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/books" className="text-zinc-400 hover:text-white">
            Books
          </Link>
          <span className="mx-2 text-zinc-700">/</span>
          <span className="text-zinc-400">{title}</span>
        </p>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-start">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt="" className="aspect-[3/4] w-full object-cover" />
            ) : (
              <div className="flex aspect-[3/4] items-center justify-center text-sm text-zinc-600">
                No cover image
              </div>
            )}
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/80">Get Signed Copy</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight text-white md:text-4xl">{title}</h1>
            {author ? <p className="mt-3 text-sm text-zinc-400">{author}</p> : null}
            {modified ? (
              <p className="mt-2 text-xs text-zinc-600">Updated {modified}</p>
            ) : null}

            {priceLabel ? (
              <p className="mt-8 font-serif text-3xl text-amber-100/95">{priceLabel}</p>
            ) : (
              <p className="mt-8 text-sm text-zinc-500">
                Online checkout for this title is coming soon. Use the publisher link below, or check
                back once pricing is live.
              </p>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <OrderBookButton line={line} />
              {external ? (
                <a
                  href={external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded border border-white/15 px-6 py-3 text-center text-xs uppercase tracking-[0.2em] text-zinc-300 transition-colors hover:border-white/30 hover:text-white"
                >
                  Publisher site
                </a>
              ) : null}
            </div>

            {book.acf?.description ? (
              <p className="mt-10 text-base leading-relaxed text-zinc-300">{book.acf.description}</p>
            ) : null}

            <div
              className="mt-10 max-w-none space-y-6 text-sm leading-relaxed text-zinc-400 [&_a]:text-amber-100/90 [&_a]:underline [&_a]:underline-offset-4 [&_figure]:my-8 [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:font-normal [&_h2]:text-zinc-100 [&_h3]:mt-6 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-zinc-200 [&_img]:h-auto [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />
          </div>
        </div>
      </article>
    </main>
  );
}
