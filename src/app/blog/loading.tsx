export default function BlogLoading() {
  return (
    <main className="bg-zinc-950 px-6 pb-24 pt-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Header skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-5 w-48 rounded bg-zinc-800" />
          <div className="h-10 w-64 rounded bg-zinc-800" />
          <div className="h-4 w-full max-w-xl rounded bg-zinc-800" />
        </div>

        <div className="mt-16">
          <div className="animate-pulse">
            <div className="h-3 w-20 rounded bg-zinc-800" />
            <div className="mt-3 h-3 w-56 rounded bg-zinc-800" />
          </div>

          <div className="mt-2">
            {[...Array(3)].map((_, i) => (
              <article
                key={i}
                className="border-b border-white/10 py-10 last:border-b-0"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-start animate-pulse">
                  {/* Image placeholder */}
                  <div className="relative h-36 w-full shrink-0 overflow-hidden rounded bg-zinc-900 md:h-28 md:w-40">
                    <div className="h-full w-full bg-zinc-800" />
                  </div>
                  {/* Content placeholder */}
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="h-3 w-24 rounded bg-zinc-800" />
                    <div className="h-6 w-3/4 rounded bg-zinc-800" />
                    <div className="h-4 w-full rounded bg-zinc-800" />
                    <div className="h-4 w-5/6 rounded bg-zinc-800" />
                    <div className="h-3 w-12 rounded bg-zinc-800" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
