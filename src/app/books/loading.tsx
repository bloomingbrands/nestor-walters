export default function BooksLoading() {
  return (
    <main className="bg-zinc-950 px-6 pb-24 pt-10 md:px-10">
      <div className="mx-auto max-w-6xl">
        {/* Header skeleton */}
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-32 rounded bg-zinc-800" />
          <div className="h-10 w-48 rounded bg-zinc-800" />
          <div className="h-5 w-full max-w-2xl rounded bg-zinc-800" />
        </div>

        <ul className="mt-12 grid list-none grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <li key={i} className="animate-pulse">
              <div className="flex flex-col overflow-hidden rounded-lg border border-white/10 bg-zinc-900/40">
                {/* Cover placeholder */}
                <div className="relative aspect-[3/4] w-full bg-zinc-900">
                  <div className="absolute inset-0 bg-zinc-800" />
                </div>
                {/* Content placeholder */}
                <div className="flex flex-1 flex-col p-5 space-y-3">
                  <div className="h-3 w-16 rounded bg-zinc-800" />
                  <div className="h-5 w-2/3 rounded bg-zinc-800" />
                  <div className="h-4 w-full rounded bg-zinc-800" />
                  <div className="h-4 w-full rounded bg-zinc-800" />
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="h-4 w-20 rounded bg-zinc-800" />
                    <div className="h-3 w-16 rounded bg-zinc-800" />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
