import type { Metadata } from "next";
import Link from "next/link";
import {
  formatBookPriceUsd,
  getBookCoverUrl,
  getPublishedBooks,
  wpPlainText,
  type WPBook,
} from "@/lib/wordpress";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Books — Nestor Walters",
  description: "Published books and works for sale — Sword Circle Pen.",
};

function BookCard({ book }: { book: WPBook }) {
  const title = book.acf?.title ?? wpPlainText(book.title.rendered);
  const blurb = book.acf?.description ?? wpPlainText(book.excerpt.rendered);
  const cover = getBookCoverUrl(book);
  const price = formatBookPriceUsd(book);
  const author = book.acf?.author;

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40 transition-colors hover:border-amber-200/25 hover:bg-zinc-900/70"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-950">
        {cover ? (
          <Image
            fill
            src={cover}
            alt={title}
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-xs uppercase tracking-[0.2em] text-zinc-600">
            No cover
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] uppercase tracking-[0.28em] text-amber-200/70">Book</p>
        <h2 className="mt-2 font-serif text-xl leading-snug text-white group-hover:text-amber-50/95">
          {title}
        </h2>
        {author ? <p className="mt-1 text-xs text-zinc-500">{author}</p> : null}
        {blurb ? (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-zinc-400">{blurb}</p>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-zinc-500">
          {price ? (
            <span className="text-amber-100/90">{price}</span>
          ) : (
            <span className="text-zinc-600">Price on detail</span>
          )}
          <span className="uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300">
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function BooksPage() {
  const books = await getPublishedBooks();

  return (
    <main className="px-6 pb-24 pt-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">Published work</p>
        <h1 className="mt-3 font-serif text-4xl text-white md:text-5xl">Books</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 md:text-base">
          First-edition and featured titles from WordPress — covers, descriptions, and pricing
          when available. Select a book for the full page and to order.
        </p>

        {books.length === 0 ? (
          <p className="mt-12 text-sm text-zinc-500">No books published yet.</p>
        ) : (
          <ul className="mt-12 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <li key={book.id}>
                <BookCard book={book} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
