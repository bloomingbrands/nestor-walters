import Link from "next/link";
import {
  type WPPost,
  wpPlainText,
  getPostFeaturedImage,
  POSTS_PER_PAGE,
} from "@/lib/wordpress";
import { PAPER, MIST, STONE, INK, VOID, MONO, SANS } from "./tokens";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function readTime(html: string): string {
  const words = wpPlainText(html).trim().split(/\s+/).filter(Boolean).length;
  const min = Math.max(1, Math.round(words / 220));
  return `${min} min read`;
}

function PostCard({ post, index }: { post: WPPost; index: number }) {
  const title = wpPlainText(post.title.rendered);
  const excerpt = wpPlainText(post.excerpt.rendered);
  const img = getPostFeaturedImage(post);
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      className="group relative"
      style={{ borderTop: `1px solid ${STONE}` }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-12"
      >
        <div className="md:col-span-1">
          <span
            className="text-[11px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.3em",
              color: STONE,
            }}
          >
            {num}
          </span>
        </div>

        <div className="md:col-span-7 flex flex-col gap-4">
          <div
            className="flex items-center gap-4 text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.28em",
              color: STONE,
            }}
          >
            <span style={{ color: INK }}>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{readTime(post.content.rendered)}</span>
          </div>

          <h2
            className="font-light leading-[1.1]"
            style={{
              fontFamily: SANS,
              fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
              letterSpacing: "-0.02em",
              color: VOID,
            }}
          >
            {title}
          </h2>

          {excerpt && (
            <p
              className="text-base leading-relaxed"
              style={{
                fontFamily: SANS,
                color: INK,
                maxWidth: "62ch",
              }}
            >
              {excerpt}
            </p>
          )}

          <span
            className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.3em",
              color: VOID,
            }}
          >
            Read entry <span aria-hidden>→</span>
          </span>
        </div>

        <div className="md:col-span-4">
          <div
            className="relative w-full overflow-hidden"
            style={{
              aspectRatio: "4 / 3",
              backgroundColor: MIST,
              border: `1px solid ${STONE}`,
            }}
          >
            {img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={img}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span
                className="absolute inset-0 flex items-center justify-center text-[10px] uppercase"
                style={{
                  fontFamily: MONO,
                  letterSpacing: "0.3em",
                  color: STONE,
                }}
              >
                No image
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

function Pager({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  const prev = page > 1 ? `/v5/journal${page - 1 > 1 ? `?page=${page - 1}` : ""}` : null;
  const next = page < totalPages ? `/v5/journal?page=${page + 1}` : null;

  return (
    <nav
      className="mt-16 flex items-center justify-between pt-8"
      style={{ borderTop: `1px solid ${STONE}` }}
    >
      {prev ? (
        <Link
          href={prev}
          className="text-[11px] uppercase"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.3em",
            color: VOID,
          }}
        >
          ← Newer
        </Link>
      ) : (
        <span />
      )}
      <span
        className="text-[10px] uppercase"
        style={{
          fontFamily: MONO,
          letterSpacing: "0.3em",
          color: STONE,
        }}
      >
        Page {String(page).padStart(2, "0")} of {String(totalPages).padStart(2, "0")}
      </span>
      {next ? (
        <Link
          href={next}
          className="text-[11px] uppercase"
          style={{
            fontFamily: MONO,
            letterSpacing: "0.3em",
            color: VOID,
          }}
        >
          Older →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

export function JournalListV5({
  posts,
  page,
  totalPages,
  total,
}: {
  posts: WPPost[];
  page: number;
  totalPages: number;
  total: number;
}) {
  const startIndex = (page - 1) * POSTS_PER_PAGE;

  return (
    <main style={{ backgroundColor: PAPER, color: INK }}>
      {/* Hero */}
      <section
        className="relative w-full"
        style={{ borderBottom: `1px solid ${STONE}` }}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 pt-40 md:pt-48 pb-16 md:pb-20">
          <Link
            href="/v5"
            className="inline-flex items-center gap-2 text-[10px] uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: INK,
            }}
          >
            ← Back to Sword · Circle · Pen
          </Link>

          <p
            className="mt-10 text-xs md:text-sm uppercase"
            style={{
              fontFamily: MONO,
              letterSpacing: "0.32em",
              color: INK,
              fontWeight: 500,
            }}
          >
            The Journal
          </p>

          <h1
            className="mt-6 font-light leading-[1.02]"
            style={{
              fontFamily: SANS,
              fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              letterSpacing: "-0.035em",
              color: VOID,
              maxWidth: "20ch",
            }}
          >
            A living archive of prose and reflection.
          </h1>

          <p
            className="mt-8 text-lg md:text-xl leading-relaxed"
            style={{ fontFamily: SANS, color: INK, maxWidth: "58ch" }}
          >
            Essays, field notes, and entries from the long work of paying
            attention. Posts arrive irregularly — when there is something
            worth saying.
          </p>

          {total > 0 && (
            <p
              className="mt-10 text-[11px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: STONE,
              }}
            >
              {total} {total === 1 ? "entry" : "entries"} · Page{" "}
              {String(page).padStart(2, "0")} of{" "}
              {String(Math.max(1, totalPages)).padStart(2, "0")}
            </p>
          )}
        </div>
      </section>

      {/* Entries */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-12 md:py-16">
        {posts.length === 0 ? (
          <p
            className="py-20 text-center text-base"
            style={{ fontFamily: SANS, color: STONE }}
          >
            No entries yet.
          </p>
        ) : (
          <div>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={startIndex + i} />
            ))}
            <div style={{ borderBottom: `1px solid ${STONE}` }} />
            <Pager page={page} totalPages={totalPages} />
          </div>
        )}
      </section>
    </main>
  );
}
