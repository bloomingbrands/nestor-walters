import Link from "next/link";
import { cn } from "@/lib/utils";

type BlogPaginationProps = {
  page: number;
  totalPages: number;
};

function pageHref(p: number): string {
  return p <= 1 ? "/blog" : `/blog?page=${p}`;
}

export function BlogPagination({ page, totalPages }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const showNumbers = totalPages <= 9;
  const pages = showNumbers
    ? Array.from({ length: totalPages }, (_, i) => i + 1)
    : null;

  const linkClass =
    "text-xs uppercase tracking-[0.2em] text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline";
  const disabledClass = "text-xs uppercase tracking-[0.2em] text-zinc-700 cursor-default";

  return (
    <nav
      className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Journal pagination"
    >
      <div className="flex items-center gap-4">
        {page > 1 ? (
          <Link href={pageHref(page - 1)} className={linkClass}>
            Previous
          </Link>
        ) : (
          <span className={disabledClass}>Previous</span>
        )}
        {page < totalPages ? (
          <Link href={pageHref(page + 1)} className={linkClass}>
            Next
          </Link>
        ) : (
          <span className={disabledClass}>Next</span>
        )}
      </div>

      {pages ? (
        <ul className="flex flex-wrap items-center gap-2 sm:justify-end">
          {pages.map((p) => (
            <li key={p}>
              {p === page ? (
                <span
                  className="inline-flex min-w-8 items-center justify-center rounded border border-white/20 bg-white/5 px-2 py-1 text-xs text-white"
                  aria-current="page"
                >
                  {p}
                </span>
              ) : (
                <Link
                  href={pageHref(p)}
                  className={cn(
                    "inline-flex min-w-8 items-center justify-center rounded border border-transparent px-2 py-1 text-xs text-zinc-500 transition-colors hover:border-white/15 hover:text-zinc-200",
                  )}
                >
                  {p}
                </Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-zinc-500 sm:text-right">
          Page <span className="text-zinc-300">{page}</span> of{" "}
          <span className="text-zinc-300">{totalPages}</span>
        </p>
      )}
    </nav>
  );
}
