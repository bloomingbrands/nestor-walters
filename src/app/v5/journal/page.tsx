import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { JournalListV5 } from "@/components/landing/v5/JournalListV5";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";
import { VersionSwitcher } from "@/components/version-switcher";
import { getPublishedPostsPage, POSTS_PER_PAGE } from "@/lib/wordpress";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { page: raw } = await searchParams;
  const p = Math.max(1, parseInt(raw ?? "1", 10) || 1);
  return {
    title:
      p > 1
        ? `Journal — Page ${p} — Sword · Circle · Pen`
        : "Journal — Sword · Circle · Pen",
    description:
      "Essays, field notes, and entries from Nestor Walters — the long work of paying attention.",
    robots: { index: false, follow: false },
  };
}

export default async function JournalV5Page({ searchParams }: Props) {
  const { page: raw } = await searchParams;
  const pageNum = Math.max(1, parseInt(raw ?? "1", 10) || 1);

  const { posts, total, totalPages, page } = await getPublishedPostsPage(
    pageNum,
    POSTS_PER_PAGE,
  );

  if (totalPages > 0 && pageNum > totalPages) {
    redirect(
      totalPages <= 1 ? "/v5/journal" : `/v5/journal?page=${totalPages}`,
    );
  }

  return (
    <>
      <NavV5 />
      <JournalListV5
        posts={posts}
        page={page}
        totalPages={totalPages}
        total={total}
      />
      <NewsletterV5 />
      <FooterV5 />
      <VersionSwitcher />
    </>
  );
}
