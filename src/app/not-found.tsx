import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center"
      style={{ backgroundColor: "oklch(0.08 0.005 55)" }}
    >
      <h1
        className="font-serif text-3xl tracking-tight md:text-4xl"
        style={{ color: "oklch(0.94 0.003 55)" }}
      >
        This page has wandered into silence
      </h1>
      <p
        className="mt-5 max-w-md text-sm leading-relaxed"
        style={{ color: "oklch(0.94 0.003 55 / 0.7)" }}
      >
        The words you are looking for have drifted elsewhere. Perhaps they were
        never meant to be here.
      </p>
      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex items-center border border-white/15 px-6 py-3 text-[10px] uppercase tracking-[0.28em] text-zinc-300 transition-colors hover:border-amber-200/30 hover:text-white"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
