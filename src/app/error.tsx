"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <main
      className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center"
      style={{ backgroundColor: "oklch(0.08 0.005 55)" }}
    >
      <h1
        className="font-serif text-3xl tracking-tight md:text-4xl"
        style={{ color: "oklch(0.94 0.003 55)" }}
      >
        Something has gone quiet.
      </h1>
      <h3>
        {error.digest ? ` (${error.digest})` : ""}
      </h3>
      <p
        className="mt-5 max-w-md text-sm leading-relaxed"
        style={{ color: "oklch(0.94 0.003 55 / 0.7)" }}
      >
        An unexpected hush has fallen across the page. If the silence persists,
        you may wish to return to the beginning.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center border border-white/15 px-6 py-3 text-[10px] uppercase tracking-[0.28em] text-zinc-300 transition-colors hover:border-amber-200/30 hover:text-white"
        >
          Try again
        </button>
        <button
          onClick={() => router.push("/")}
          className="inline-flex items-center border border-white/15 px-6 py-3 text-[10px] uppercase tracking-[0.28em] text-zinc-300 transition-colors hover:border-amber-200/30 hover:text-white"
        >
          Return home
        </button>
      </div>
    </main>
  );
}
