import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BlogPagination } from "@/components/blog-pagination";
import {
  getPublishedPostsPage,
  POSTS_PER_PAGE,
  getPostFeaturedImage,
  wpPlainText,
  type WPPost,
} from "@/lib/wordpress";

const JOURNAL_DESCRIPTION =
  "Essays and reflections from WordPress — prose, memory, and the long work of paying attention.";

type BlogPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: BlogPageProps): Promise<Metadata> {
  const { page: raw } = await searchParams;
  const p = Math.max(1, parseInt(raw ?? "1", 10) || 1);
  return {
    title: p > 1 ? `Journal — Page ${p} — Nestor Walters` : "Journal — Nestor Walters",
    description: JOURNAL_DESCRIPTION,
  };
}

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

function PostEntry({ post }: { post: WPPost }) {
  const title = wpPlainText(post.title.rendered);
  const excerpt = wpPlainText(post.excerpt.rendered);
  const img = getPostFeaturedImage(post);

  return (
    <article className="border-b border-white/10 py-10 last:border-b-0">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {img ? (
          <div className="relative h-36 w-full shrink-0 overflow-hidden bg-zinc-900 md:h-28 md:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element -- remote WP media; domains allowlisted in next.config */}
            <img src={img} alt="" className="h-full w-full object-cover opacity-90" />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          <time
            dateTime={post.date}
            className="text-[10px] uppercase tracking-[0.25em] text-zinc-500"
          >
            {formatListDate(post.date)}
          </time>
          <h2 className="mt-2 font-serif text-xl leading-snug text-white md:text-2xl">
            <Link
              href={`/blog/${post.slug}`}
              className="transition-colors hover:text-amber-100/90"
            >
              {title}
            </Link>
          </h2>
          {excerpt ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 line-clamp-4">
              {excerpt}
            </p>
          ) : null}
          <div className="mt-5">
            <Link
              href={`/blog/${post.slug}`}
              className="text-xs uppercase tracking-[0.2em] text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              Read
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: raw } = await searchParams;
  const pageNum = Math.max(1, parseInt(raw ?? "1", 10) || 1);

  const postsPage = await getPublishedPostsPage(pageNum, POSTS_PER_PAGE);
  const { posts, totalPages } = postsPage;

  if (totalPages > 0 && pageNum > totalPages) {
    redirect(totalPages <= 1 ? "/blog" : `/blog?page=${totalPages}`);
  }

  const effectivePage = postsPage.page;

  return (
    <main className="px-6 pb-24 pt-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        <p className="font-serif text-lg italic text-zinc-500 md:text-xl">
          A living archive of prose and reflection.
        </p>
        <h1 className="mt-4 font-serif text-4xl text-white md:text-5xl">Journal</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-500">
          {JOURNAL_DESCRIPTION}
        </p>

        <section className="mt-16">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500">Entries</h2>
          {posts.length === 0 ? (
            <p className="mt-8 text-sm text-zinc-500">No posts yet.</p>
          ) : (
            <>
              <p className="mt-3 text-xs text-zinc-600">
                Showing {(effectivePage - 1) * POSTS_PER_PAGE + 1}–
                {(effectivePage - 1) * POSTS_PER_PAGE + posts.length} of {postsPage.total}{" "}
                {postsPage.total === 1 ? "post" : "posts"}
              </p>
              <div className="mt-2">{posts.map((post) => (
                <PostEntry key={post.id} post={post} />
              ))}</div>
              <BlogPagination page={effectivePage} totalPages={totalPages} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}
