import Image from "next/image";
import Link from "next/link";
import { BentoGridShowcase } from "@/components/ui/bento-grid";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import { PoemCard } from "@/components/ui/poem-card";
import { Card } from "@/components/ui/card";

const PortraitCard = () => (
  <Card className="group relative h-full min-h-0 w-full overflow-hidden p-0">
    {/* Custom illustration — always visible */}
    <Image
      src="/assets/nestor-and-dog-custom.png"
      alt="Nestor Walters"
      fill
      className="object-cover object-center"
      sizes="(max-width: 768px) 100vw, 19rem"
      priority
    />
    {/* Real photo — fades in on hover, fades out on mouse leave */}
    <Image
      src="/assets/nestor-and-rider.png"
      alt="Nestor Walters"
      fill
      className="object-cover object-center opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
      sizes="(max-width: 768px) 100vw, 19rem"
    />
    <div className="absolute bottom-0 left-0 right-0 z-10 bg-linear-to-t from-black/80 to-transparent px-6 py-6">
      <p className="text-xl font-serif font-bold tracking-tight text-white drop-shadow-md">
        Nestor &amp; Rider Walters
      </p>
      <p className="text-sm text-white/80 drop-shadow-sm mt-1">
        Navy Veteran · Poet · Earth Scientist
      </p>
      <p className="text-xs text-white/60 mt-2 leading-relaxed">
        Born in Bangladesh, raised in Greece. 10-year U.S. Navy veteran. Stanford graduate in math &amp; creative writing. Doctoral candidate in earth science at University of Maine.
      </p>
    </div>
  </Card>
);

/*
  Triangle path — all leaning left, corner-only overlaps:
  Card 1 (top-left)   →  Card 2 (middle-right, steeper lean)  →  Card 3 (bottom-left, gentle lean)
  Each card's bottom corner just catches the next card's top corner.
  Cards 313px wide; each stacked ~250px lower so only the last ~50px overlap at the corner.
  zIndex ascends so the "last to land" card sits on top at each corner.
*/
const cards = [
  { src: "/assets/EDE_earthcradle.png",        alt: "Earth Cradle",   caption: "Earth Cradle",   rotate: 8   },
  { src: "/assets/EDE1_EddiesGhost_web.jpg",   alt: "Eddie's Ghost",  caption: "Eddie's Ghost",  rotate: -10 },
  { src: "/assets/EDE2_EarthHeart_web.jpg",    alt: "Earth Heart",    caption: "Earth Heart",    rotate: -7,  deep: true },
  { src: "/assets/EDE3_Jaya_web.jpg",          alt: "Jaya",           caption: "Jaya",           rotate: -13 },
  { src: "/assets/EDE4_Rider_web.jpg",         alt: "Rider",          caption: "Rider",          rotate: -5,  deep: true },
];

const PolaroidScatter = () => (
  <>
    {/* ── Mobile: 2×2 staggered grid ── */}
    <div className="lg:hidden grid grid-cols-2 gap-x-3 gap-y-6 py-4 overflow-visible">
      {cards.map((c, i) => (
        <div
          key={c.caption}
          className="flex justify-center overflow-visible"
          style={{ paddingTop: i % 2 === 1 ? 28 : 0 }}
        >
          <PolaroidCard {...c} size="sm" />
        </div>
      ))}
    </div>

    {/* ── Desktop: absolute scatter ── */}
  <div className="hidden lg:block relative w-full overflow-visible" style={{ minHeight: 820 }}>
    {/* Card 5 — top, 400px left of Card 1 */}
    <div className="absolute" style={{ top: 0, left: -396, zIndex: 1 }}>
      <PolaroidCard
        src="/assets/EDE_earthcradle.png"
        alt="Earth Cradle"
        caption="Earth Cradle"
        rotate={8}
        size="large"
      />
    </div>

    {/* Card 1 — top-left */}
    <div className="absolute" style={{ top: 0, left: -46, zIndex: 1 }}>
      <PolaroidCard
        src="/assets/EDE1_EddiesGhost_web.jpg"
        alt="Eddie's Ghost"
        caption="Eddie's Ghost"
        rotate={12}
        size="large"
      />
    </div>

    {/* Card 4 — middle-left, across from Card 2 */}
    <div className="absolute" style={{ top: 315, left: -408, zIndex: 3 }}>
      <PolaroidCard
        src="/assets/EDE2_EarthHeart_web.jpg"
        alt="Earth Heart"
        caption="Earth Heart"
        rotate={-14}
        size="large"
        deep
      />
    </div>

    {/* Card 2 — middle-right, steeper lean */}
    <div className="absolute" style={{ top: 250, left: 140, zIndex: 2 }}>
      <PolaroidCard
        src="/assets/EDE3_Jaya_web.jpg"
        alt="Jaya"
        caption="Jaya"
        rotate={-18}
        size="large"
      />
    </div>

    {/* Card 3 — bottom-left, gentle lean — lands on top */}
    <div className="absolute" style={{ top: 500, left: -60, zIndex: 4 }}>
      <PolaroidCard
        src="/assets/EDE4_Rider_web.jpg"
        alt="Rider"
        caption="Rider"
        deep
        rotate={-9}
        size="large"
      />
    </div>
  </div>
  </>
);

export function SelectedWork() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col">
        <div className="mb-10 max-w-2xl text-left md:mb-12">
          <p
            className="text-[14px] font-black uppercase tracking-[0.28em]"
            style={{ color: "oklch(0.65 0.08 55)" }}
          >
            The archive
          </p>
          <h2 className="mt-3 font-serif text-3xl tracking-tight text-white md:text-4xl">
            Selected work
          </h2>
          <p
            className="mt-4 text-sm leading-relaxed md:text-base"
            style={{ color: "oklch(0.70 0.006 55)" }}
          >
            Fiction, poetry, and essays born from service, science, and the long work of paying attention. Not a catalog, but fragments pulled from a larger body of writing.
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.25em]">
            <Link
              href="/blog"
              className="text-[14px] font-black uppercase tracking-[0.28em] underline-offset-4 transition-all duration-300 hover:underline"
              style={{ color: "oklch(0.65 0.08 55 / 0.7)" }}
            >
              Journal →
            </Link>
          </p>
        </div>

        <div className="h-px w-12 mb-10" style={{ backgroundColor: "oklch(0.65 0.08 55 / 0.15)" }} />

        <BentoGridShowcase
          leftColumn={<PolaroidScatter />}
          mainFeature={<PortraitCard />}
          poems={[
            <PoemCard
              key="some-days"
              title="Some Days"
              publication="ISSUED Journal"
              bgColor="oklch(0.94 0.025 95)"
              rotate={-1.5}
              tape={1}
              tapeOffsetY={20}
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
              title="The Husband Who Came Back from the War"
              publication="ISSUED Journal"
              bgColor="oklch(0.92 0.02 230)"
              rotate={1}
              tape={3}
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
              title="five ways to kill a mouse"
              publication="ISSUED Journal"
              bgColor="oklch(0.92 0.02 15)"
              rotate={-1}
              tape={2}
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
              title="Swan: A Mother's Day Dedication"
              publication="The Stanford Daily"
              bgColor="oklch(0.93 0.02 120)"
              rotate={1.5}
              tape={4}
              tapeOffsetY={20}
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
              title="In The Boot Camp Laundry Room"
              publication="The Line Literary"
              bgColor="oklch(0.93 0.025 85)"
              rotate={-1}
              tape={2}
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
              title="Homecoming"
              publication="The Wrath-Bearing Tree"
              bgColor="oklch(0.92 0.02 300)"
              rotate={1}
              tape={3}
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
  );
}
