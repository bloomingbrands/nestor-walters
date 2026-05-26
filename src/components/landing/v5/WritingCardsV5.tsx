import { getPostBySlug } from "@/lib/wordpress";
import { WritingCardsGrid, type WritingCard } from "./WritingCardsGrid";
import { PAPER, STONE, INK, VOID, MONO, SANS, SLATE } from "./tokens";

type CardSeed = Omit<WritingCard, "hostedHtml" | "hostedDate"> & {
  wpSlug?: string;
};

const CARD_SEEDS: CardSeed[] = [
  {
    call: "PR · 813 · NW",
    genre: "Fiction",
    title: "The Nursery",
    publication: "The New England Review · 46.3–4",
    year: "2025",
    excerpt:
      "A short story about what we hand down — and what insists on being inherited anyway. Read it in NER issue 46.3–4.",
    status: "Published",
    cta: "Order issue 46.3–4 →",
    externalUrl: "https://www.nereview.com/single-issues/",
    externalLabel: "Order from NER",
  },
  {
    call: "PR · 814 · NW",
    genre: "Poetry",
    title: "The Glass Beach",
    publication: "Strange Horizons",
    year: "Forthcoming",
    excerpt:
      "A poem at the edge of the tideline — what the ocean returns once it's done with it.",
    status: "Forthcoming",
    cta: "Strange Horizons →",
    externalUrl: "https://strangehorizons.com",
    externalLabel: "Visit Strange Horizons",
  },
  {
    call: "PR · 815 · NW",
    genre: "Essay",
    title: "Ensuring Tomorrows",
    publication: "STANFORD Magazine",
    year: "2024",
    excerpt:
      "An essay on what gets handed to the next generation — service, science, and the long obligation of looking ahead.",
    status: "Hosted here",
    wpSlug: "the-impossible-dream",
    externalUrl: "https://stanfordmag.org/contents/the-impossible-dream",
    externalLabel: "Read at STANFORD Magazine",
  },
  {
    call: "PR · 816 · NW",
    genre: "Poetry",
    title: "five ways to kill a mouse",
    publication: "ISSUED Journal",
    year: "—",
    excerpt:
      "we burned the one in the sticky trap. it struggled against its tiny legs, writhing flames, fluttering like cloth in a strong wind.",
    status: "Hosted here",
    wpSlug: "five-ways-to-kill-a-mouse",
    externalUrl: "https://issuedjournal.com/three-poems-by-nestor-walters/",
    externalLabel: "Read at ISSUED Journal",
  },
  {
    call: "PR · 817 · NW",
    genre: "Review",
    title: "Mercy for Heroes",
    publication: "ISSUED Journal",
    year: "—",
    excerpt:
      "A review on the costs we ask soldiers to carry home, and the imagination it takes to meet them where they actually are.",
    status: "Published",
    cta: "ISSUED Journal →",
    externalUrl: "https://issuedjournal.com/nestor-walters/",
    externalLabel: "Read at ISSUED Journal",
  },
];

export async function WritingCardsV5() {
  const cards: WritingCard[] = await Promise.all(
    CARD_SEEDS.map(async ({ wpSlug, ...rest }) => {
      if (!wpSlug) {
        return { ...rest, hostedHtml: null, hostedDate: null };
      }
      const post = await getPostBySlug(wpSlug);
      return {
        ...rest,
        hostedHtml: post?.content.rendered ?? null,
        hostedDate: post?.date ?? null,
      };
    }),
  );

  return (
    <section
      id="writing"
      className="w-full"
      style={{
        backgroundColor: PAPER,
        color: INK,
        borderTop: `1px solid ${STONE}`,
      }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 py-20 md:py-28">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p
              className="text-[10px] uppercase"
              style={{
                fontFamily: MONO,
                letterSpacing: "0.32em",
                color: SLATE,
              }}
            >
              Published Writing
            </p>
            <h2
              className="mt-4 font-light leading-[1.02]"
              style={{
                fontFamily: SANS,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.025em",
                color: VOID,
              }}
            >
              Selected Work
            </h2>
          </div>
          <p
            className="text-[11px] uppercase"
            style={{ fontFamily: MONO, letterSpacing: "0.28em", color: INK }}
          >
            by Nestor Walters
          </p>
        </header>

        <WritingCardsGrid cards={cards} />
      </div>
    </section>
  );
}
