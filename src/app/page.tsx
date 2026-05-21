import Image from "next/image";
import Link from "next/link";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
import { BentoGridShowcase } from "@/components/ui/bento-grid";
import { PolaroidCard } from "@/components/ui/polaroid-card";
import { PoemCard } from "@/components/ui/poem-card";
import { Card } from "@/components/ui/card";
import { VeteranTransferScene } from "@/components/ui/veteran-transfer-scene";

// --- Center Portrait ---

const PortraitCard = () => (
  <Card className="relative h-full min-h-0 w-full overflow-hidden p-0">
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

export default function Home() {
  return (
    <>
      <ParallaxComponent />
      <section className="bg-black px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col">
          <div className="mb-10 max-w-2xl text-left md:mb-12">
            <p className="text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              The archive
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-tight text-white md:text-4xl">
              Selected work
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400 md:text-base">
              Fiction, poetry, and essays born from service, science, and the long work of paying attention—not a catalog, but fragments pulled from a larger body of writing.
            </p>
            <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              <Link
                href="/blog"
                className="text-zinc-400 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Journal
              </Link>
            </p>
          </div>
          <BentoGridShowcase
            integrations={
              <PolaroidCard
                src="/assets/mount-olympus-summit.png"
                alt="Mountain summit, cold light"
                caption="The ascent"
                rotate={-2}
                size="large"
              />
            }
            secondaryFeature={
              <PolaroidCard
                src="/assets/clearsky.png"
                alt="Open sky"
                caption="Between deployments"
                rotate={1.5}
                size="large"
              />
            }
            journey={
              <PolaroidCard
                src="/assets/ground-slice.png"
                alt="Strata of earth"
                caption="Earth & memory"
                rotate={-1}
                size="large"
              />
            }
            mainFeature={<PortraitCard />}
            poems={[
            <PoemCard
              key="some-days"
              compact
              title="Some Days"
              publication="ISSUED Journal"
              color="bg-yellow-100"
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
              color="bg-sky-100"
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
              color="bg-rose-100"
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
              color="bg-lime-100"
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
              color="bg-amber-100"
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
              color="bg-violet-100"
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

      <VeteranTransferScene />
    </>
  );
}
