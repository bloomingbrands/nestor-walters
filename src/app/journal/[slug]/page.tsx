import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPostFeaturedImage,
  wpPlainText,
} from "@/lib/wordpress";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";
import {
  PAPER,
  MIST,
  STONE,
  INK,
  VOID,
  MONO,
  SANS,
} from "@/components/landing/v5/tokens";

type Props = { params: Promise<{ slug: string }> };

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found", robots: { index: false } };
  const title = wpPlainText(post.title.rendered);
  const description = wpPlainText(post.excerpt.rendered).slice(0, 160);
  return {
    title: `${title} — Sword · Circle · Pen`,
    description: description || undefined,
    robots: { index: false, follow: false },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = wpPlainText(post.title.rendered);
  const author = post._embedded?.author?.[0]?.name;
  const img = getPostFeaturedImage(post);

  const PROSE_CLASSES = [
    "mt-12",
    "max-w-none",
    "space-y-6",
    "text-[1.05rem]",
    "md:text-[1.125rem]",
    "leading-[1.75]",
    "[&_a]:underline",
    "[&_a]:underline-offset-4",
    "[&_a]:decoration-1",
    "[&_p]:mb-5",
    "[&_h2]:mt-12",
    "[&_h2]:mb-4",
    "[&_h2]:text-3xl",
    "[&_h2]:md:text-4xl",
    "[&_h2]:font-light",
    "[&_h2]:tracking-tight",
    "[&_h2]:leading-tight",
    "[&_h3]:mt-10",
    "[&_h3]:mb-3",
    "[&_h3]:text-2xl",
    "[&_h3]:font-light",
    "[&_h3]:tracking-tight",
    "[&_blockquote]:my-8",
    "[&_blockquote]:pl-6",
    "[&_blockquote]:italic",
    "[&_ul]:list-disc",
    "[&_ul]:pl-6",
    "[&_ul]:mb-5",
    "[&_ol]:list-decimal",
    "[&_ol]:pl-6",
    "[&_ol]:mb-5",
    "[&_li]:mb-2",
    "[&_figure]:my-10",
    "[&_img]:my-6",
    "[&_img]:h-auto",
    "[&_img]:max-w-full",
    "[&_em]:italic",
    "[&_strong]:font-medium",
    "[&_code]:px-1.5",
    "[&_code]:py-0.5",
    "[&_code]:text-[0.9em]",
    "[&_pre]:p-5",
    "[&_pre]:my-6",
    "[&_pre]:overflow-x-auto",
    "[&_pre]:text-[0.9em]",
    "[&_pre]:leading-relaxed",
  ].join(" ");

  return (
    <>
      <NavV5 />
      <main style={{ backgroundColor: PAPER, color: INK }}>
        {/* Hero */}
        <section
          className="relative w-full"
          style={{ borderBottom: `1px solid ${STONE}` }}
        >
          <div className="mx-auto max-w-[920px] px-6 md:px-12 lg:px-16 pt-36 md:pt-44 pb-12 md:pb-16">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: INK,
              }}
            >
              ← The Journal
            </Link>

            <div
              className="mt-10 flex flex-wrap items-center gap-4 text-[11px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: STONE,
              }}
            >
              <time dateTime={post.date} style={{ color: INK, fontWeight: 500 }}>
                {formatDate(post.date)}
              </time>
              <span>·</span>
              <span>{readTime(post.content.rendered)}</span>
              {author && (
                <>
                  <span>·</span>
                  <span style={{ color: INK }}>{author}</span>
                </>
              )}
            </div>

            <h1
              className="mt-6 font-light leading-[1.05]"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                color: VOID,
                maxWidth: "22ch",
              }}
            >
              {title}
            </h1>
          </div>

          {img && (
            <div
              className="mx-auto max-w-[1200px] px-6 md:px-12 lg:px-16 pb-16 md:pb-20"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{
                  aspectRatio: "16 / 9",
                  backgroundColor: MIST,
                  border: `1px solid ${STONE}`,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </section>

        {/* Body */}
        <section className="mx-auto max-w-[760px] px-6 md:px-12 lg:px-16 py-16 md:py-24">
          <div
            className={PROSE_CLASSES}
            style={
              {
                fontFamily: SANS,
                color: INK,
                ["--v5-ink" as string]: INK,
                ["--v5-void" as string]: VOID,
                ["--v5-stone" as string]: STONE,
                ["--v5-mist" as string]: MIST,
              } as React.CSSProperties
            }
          >
            <style>{`
              .v5-prose a { color: ${VOID}; text-decoration-color: ${INK}; }
              .v5-prose h2, .v5-prose h3 { color: ${VOID}; font-family: ${SANS}; letter-spacing: -0.02em; }
              .v5-prose blockquote { border-left: 1px solid ${INK}; color: ${VOID}; font-family: ${SANS}; }
              .v5-prose code { background: ${MIST}; border: 1px solid ${STONE}; font-family: ${MONO}; color: ${VOID}; }
              .v5-prose pre { background: ${MIST}; border: 1px solid ${STONE}; font-family: ${MONO}; color: ${INK}; }
              .v5-prose hr { border: 0; border-top: 1px solid ${STONE}; margin: 2.5rem 0; }
            `}</style>
            <div
              className="v5-prose"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          <footer
            className="mt-20 flex flex-col gap-6 pt-10 md:flex-row md:items-center md:justify-between"
            style={{ borderTop: `1px solid ${STONE}` }}
          >
            <Link
              href="/journal"
              className="text-[11px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: VOID,
              }}
            >
              ← Back to the Journal
            </Link>
            <a
              href={post.link}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.3em",
                color: INK,
              }}
            >
              View on Sword Circle Pen ↗
            </a>
          </footer>
        </section>
      </main>
      <NewsletterV5 />
      <FooterV5 />
    </>
  );
}
