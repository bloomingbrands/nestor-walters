import Image from "next/image";
import Link from "next/link";
import { VersionSwitcher } from "@/components/version-switcher";
import { ParallaxComponentV2 } from "@/components/ui/parallax-scrolling-v2";
import { BentoGridShowcase } from "@/components/ui/bento-grid";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import { PoemCard } from "@/components/ui/poem-card";
import { Card } from "@/components/ui/card";
import { VeteranTransferScene } from "@/components/ui/veteran-transfer-scene";
import { SpeakingScene } from "@/components/ui/speaking-scene";

const LIGHT_BG = "oklch(0.86 0.015 60)";
const LIGHT_TEXT_PRIMARY = "oklch(0.20 0.02 55)";
const LIGHT_TEXT_SECONDARY = "oklch(0.35 0.015 55)";
const LIGHT_TEXT_MUTED = "oklch(0.50 0.01 55)";
const ACCENT = "oklch(0.65 0.08 55)";
const LIGHT_BORDER = "oklch(0.60 0.02 55 / 0.2)";

const PortraitCardLight = () => (
  <Card className="relative h-full min-h-0 w-full overflow-hidden p-0" style={{ borderColor: LIGHT_BORDER }}>
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black/80 to-transparent px-6 py-6">
      <p className="text-xl font-serif font-bold tracking-tight text-white drop-shadow-md">
        Nestor Walters
      </p>
      <p className="text-sm text-white/80 drop-shadow-sm mt-1">
        Navy Veteran · Poet · Earth Scientist
      </p>
      <p className="text-xs text-white/60 mt-2 leading-relaxed">
        Born in Bangladesh, raised in Greece. 10-year U.S. Navy veteran. Stanford graduate in math & creative writing. Doctoral candidate in earth science at University of Maine.
      </p>
    </div>
    <Image
      src="/assets/nestor-walters.png"
      alt="Nestor Walters"
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 19rem"
      priority
    />
  </Card>
);

export default function V2Landing() {
  return (
    <>
      {/* 1. DARK — Hero */}
      <ParallaxComponentV2 />

      {/* 2. LIGHT — Archive / Reading Room */}
      <section
        className="px-6 py-16 md:px-12 md:py-24"
        style={{ backgroundColor: LIGHT_BG }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          <div className="mb-10 max-w-2xl text-left md:mb-12">
            <p
              className="text-[10px] uppercase tracking-[0.28em]"
              style={{ color: ACCENT }}
            >
              The archive
            </p>
            <h2
              className="mt-3 font-serif text-3xl tracking-tight md:text-4xl"
              style={{ color: LIGHT_TEXT_PRIMARY }}
            >
              Selected work
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed md:text-base"
              style={{ color: LIGHT_TEXT_SECONDARY }}
            >
              Fiction, poetry, and essays born from service, science, and the long work of paying attention. Not a catalog, but fragments pulled from a larger body of writing.
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.25em]">
              <Link
                href="/blog"
                className="underline-offset-4 transition-all duration-300 hover:underline"
                style={{ color: ACCENT }}
              >
                Journal →
              </Link>
            </p>
          </div>

          <div className="h-px w-12 mb-10" style={{ backgroundColor: "oklch(0.65 0.08 55 / 0.2)" }} />

          <BentoGridShowcase
            leftColumn={
              <div className="flex flex-col gap-6">
                <PolaroidCard
                  src="/assets/mount-olympus-summit.png"
                  alt="Mountain summit, cold light"
                  caption="The ascent"
                  rotate={-2}
                  size="large"
                />
                <PolaroidCard
                  src="/assets/clearsky.png"
                  alt="Open sky"
                  caption="Between deployments"
                  rotate={1.5}
                  size="large"
                />
                <PolaroidCard
                  src="/assets/ground-slice.png"
                  alt="Strata of earth"
                  caption="Earth & memory"
                  rotate={-1}
                  size="large"
                />
              </div>
            }
            mainFeature={<PortraitCardLight />}
            poems={[
            <PoemCard
              key="some-days"
              compact
              title="Some Days"
              publication="ISSUED Journal"
              bgColor="oklch(0.94 0.025 95)"
              rotate={-1.5}
              lines={[
                "you're not a poet the voice says",
                "go back to bed. a real poet doesn't slip",
                "into a sleeve-holed sleeping bag",
                "he got in the Navy, stare at an empty page",
                "on the dining table, scrape dried food…",
              ]}
              href="https://issuedjournal.com/three-poems-by-nestor-walters/"
            />,
            <PoemCard
              key="husband"
              compact
              title="The Husband Who Came Back from the War"
              publication="ISSUED Journal"
              bgColor="oklch(0.92 0.02 230)"
              rotate={1}
              lines={[
                "in a story about two women",
                "who grow up together playing",
                "make-believe birds, who play bird-bandits,",
                "princesses, dove-maidens,",
                "sea nightingales and seven sparrows…",
              ]}
              href="https://issuedjournal.com/three-poems-by-nestor-walters/"
            />,
            <PoemCard
              key="mouse"
              compact
              title="five ways to kill a mouse"
              publication="ISSUED Journal"
              bgColor="oklch(0.92 0.02 15)"
              rotate={-1}
              lines={[
                "we burned the one in the sticky trap. it struggled",
                "against its tiny legs, writhing flames, fluttering",
                "like cloth in a strong wind. i didn't",
                "tell her this, the girl on my dorm room couch…",
              ]}
              href="https://issuedjournal.com/three-poems-by-nestor-walters/"
            />,
            <PoemCard
              key="swan"
              compact
              title="Swan: A Mother's Day Dedication"
              publication="The Stanford Daily"
              bgColor="oklch(0.93 0.02 120)"
              rotate={1.5}
              lines={[
                '"I struggled to find the words to thank you"',
                "is what the draft of my Instagram post said",
                "and I was going to leave it to Billy Collins.",
                "But as I scrolled through pictures I might",
                "collage into some glimpse of who you are…",
              ]}
              href="https://stanforddaily.com/2020/05/10/the-swan-a-mothers-day-dedication/"
            />,
            <PoemCard
              key="bootcamp"
              compact
              title="In The Boot Camp Laundry Room"
              publication="The Line Literary"
              bgColor="oklch(0.93 0.025 85)"
              rotate={-1}
              lines={[
                "we rise, together, one more time",
                "The boy and I face the same wall",
                "streaked with old, white, lead paint.",
                "We hang, suspended from the same rod…",
              ]}
              href="https://www.thelineliterary.org/poetry/in-the-boot-camp-laundry-room"
            />,
            <PoemCard
              key="homecoming"
              compact
              title="Homecoming"
              publication="The Wrath-Bearing Tree"
              bgColor="oklch(0.92 0.02 300)"
              rotate={1}
              lines={[
                "he lies down, finally to rest.",
                "grey light bands his closed door",
                "with no silver at the edges. They said he left",
                "one foot in the sand. wait, a head",
                "no, a hand.",
              ]}
              href="https://www.wrath-bearingtree.com/2020/12/new-poetry-from-nestor-walters-homecoming/"
            />,
            ]}
          />
        </div>
      </section>

      {/* 3. DARK — Veteran Transfer */}
      <VeteranTransferScene />

      {/* 4. DARK — Speaking */}
      <SpeakingScene />

      {/* 5. LIGHT — Newsletter / Correspondence Desk */}
      <section
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: LIGHT_BG }}
      >
        {/* Warm atmospheric glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, oklch(0.92 0.02 65 / 0.3) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center px-6 py-28 md:py-36">
          <div className="max-w-lg w-full text-center">
            {/* Wax seal */}
            <div
              className="mx-auto mb-8 w-10 h-10 rounded-full border flex items-center justify-center"
              style={{
                borderColor: "oklch(0.65 0.08 55 / 0.4)",
                backgroundColor: "oklch(0.65 0.08 55 / 0.08)",
              }}
            >
              <span
                className="text-lg"
                style={{
                  color: "oklch(0.65 0.08 55 / 0.7)",
                  fontFamily: "var(--font-caveat)",
                }}
              >
                N
              </span>
            </div>

            <h2
              className="text-2xl md:text-3xl font-bold tracking-tight mb-4"
              style={{ color: LIGHT_TEXT_PRIMARY, fontFamily: "var(--font-caveat)" }}
            >
              A word between us
            </h2>

            <p
              className="text-sm md:text-base leading-relaxed mb-10"
              style={{ color: LIGHT_TEXT_SECONDARY, fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
            >
              New essays, field notes, and stray thoughts arrive irregularly — when there is something worth saying. No schedule, no noise.
            </p>

            <form className="flex flex-col items-center gap-4 max-w-sm mx-auto">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="your address"
                  disabled
                  className="w-full bg-transparent border-b px-0 py-3 text-sm transition-colors duration-500 disabled:cursor-not-allowed"
                  style={{
                    borderColor: LIGHT_BORDER,
                    color: LIGHT_TEXT_PRIMARY,
                    fontFamily: "var(--font-geist-sans)",
                    fontWeight: 300,
                  }}
                />
              </div>

              <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                <span
                  className="mt-0.5 w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-all duration-300 shrink-0"
                  style={{ borderColor: LIGHT_BORDER }}
                />
                <span
                  className="text-[11px] leading-relaxed transition-colors duration-300"
                  style={{ color: LIGHT_TEXT_MUTED, fontFamily: "var(--font-geist-sans)", fontWeight: 300 }}
                >
                  I would like to receive this correspondence.
                </span>
              </label>

              <button
                type="button"
                disabled
                className="group relative px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-500 mt-2 disabled:cursor-not-allowed"
                style={{
                  color: LIGHT_TEXT_MUTED,
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                <span className="relative z-10">Send</span>
                <span
                  className="absolute bottom-2 left-6 right-6 h-px transition-all duration-500"
                  style={{ backgroundColor: LIGHT_BORDER }}
                />
              </button>
            </form>

            <p
              className="mt-16 text-[10px] uppercase tracking-[0.25em]"
              style={{ color: LIGHT_TEXT_MUTED, fontFamily: "var(--font-geist-mono)" }}
            >
              Sword Circle Pen
            </p>
          </div>
        </div>
      </section>
      <VersionSwitcher />
    </>
  );
}
