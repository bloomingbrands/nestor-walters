import type { Metadata } from "next";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { SubpageShell } from "@/components/landing/v5/SubpageShell";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";

export const metadata: Metadata = {
  title: "Writing — Sword · Circle · Pen",
  description:
    "Fiction, poetry, and essays by Nestor Walters.",
  robots: { index: false, follow: false },
};

export default function WritingPage() {
  return (
    <>
      <NavV5 />
      <SubpageShell
        index="III"
        kicker="Pen"
        title="Writing as the long work of paying attention."
        lede="Fiction, poetry, and essays born from service, science, and the slow practice of staying with a thing until it speaks back."
        image="/assets/writing01.png"
        blocks={[
          {
            kicker: "Fiction",
            heading: "The Nursery · forthcoming, New England Review.",
            body: "Short fiction concerned with inheritance — what is handed down deliberately, and what arrives anyway. Selected works also in Palo Alto Weekly and Atticus Review.",
          },
          {
            kicker: "Poetry",
            heading: "Staring at the Horizon, and other watchstanding poems.",
            body: "Poems from and about service — published across ISSUED Journal, The Stanford Daily, The Line Literary, and The Wrath-Bearing Tree.",
          },
          {
            kicker: "Essays",
            heading: "Field-note essays from a working life.",
            body: "Nonfiction at the seam between earth science and service. Published in STANFORD Magazine and elsewhere — full list forthcoming.",
          },
        ]}
      />
      <NewsletterV5 />
      <FooterV5 />
    </>
  );
}
