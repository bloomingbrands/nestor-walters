import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getPostFeaturedImage,
  wpPlainText,
} from "@/lib/wordpress";
import Image from "next/image";

type Props = { params: Promise<{ slug: string }> };

function formatListDate(iso: string): string {
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const title = wpPlainText(post.title.rendered);
  const description = wpPlainText(post.excerpt.rendered).slice(0, 160);
  return {
    title: `${title} — Nestor Walters`,
    description: description || undefined,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const title = wpPlainText(post.title.rendered);
  const author = post._embedded?.author?.[0]?.name;
  const img = getPostFeaturedImage(post);
  const excerpt = wpPlainText(post.excerpt.rendered).slice(0, 300);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    author: author ? { "@type": "Person", name: author } : undefined,
    datePublished: post.date,
    dateModified: (post as { modified?: string }).modified ?? post.date,
    image: img ? `https://swordcirclepen.com${img}` : undefined,
    description: excerpt || undefined,
    url: `https://swordcirclepen.com/blog/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Sword Circle Pen",
      logo: {
        "@type": "ImageObject",
        url: "https://swordcirclepen.com/assets/ico.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://swordcirclepen.com/blog/${slug}`,
    },
  };

  return (
    <article className="px-6 pb-24 pt-10 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
          <Link href="/blog" className="text-zinc-400 transition-colors hover:text-white">
            Journal
          </Link>
          <span className="mx-2 text-zinc-700">/</span>
          <time dateTime={post.date}>{formatListDate(post.date)}</time>
        </p>
        <h1 className="mt-6 font-serif text-3xl leading-tight text-white md:text-4xl">
          {title}
        </h1>
        {author ? <p className="mt-4 text-sm text-zinc-500">{author}</p> : null}

        {img ? (
          <div className="relative mt-10 aspect-video w-full overflow-hidden bg-zinc-900">
            <Image fill src={img} alt={title} sizes="(min-width: 768px) 768px, 100vw" className="h-full w-full object-cover" priority />
          </div>
        ) : null}

        <div
          className="mt-12 max-w-none space-y-6 text-[0.95rem] leading-relaxed text-zinc-300 [&_a]:text-amber-100/90 [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:border-l [&_blockquote]:border-amber-200/20 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_figure]:my-8 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:text-zinc-100 [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-normal [&_h3]:text-zinc-100 [&_img]:h-auto [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <p className="mt-16 border-t border-white/10 pt-8 text-sm text-zinc-500">
          <a href={post.link} className="text-zinc-400 underline-offset-4 hover:text-white hover:underline">
            View on Sword Circle Pen
          </a>
        </p>
      </div>
    </article>
  );
}
