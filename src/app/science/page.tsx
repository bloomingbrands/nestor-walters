import type { Metadata } from "next";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { SubpageShell } from "@/components/landing/v5/SubpageShell";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";

export const metadata: Metadata = {
  title: "Science — Sword · Circle · Pen",
  description:
    "Doctoral research in earth science at the University of Maine.",
  robots: { index: false, follow: false },
};

export default function SciencePage() {
  return (
    <>
      <NavV5 />
      <SubpageShell
        index="II"
        kicker="Circle"
        title="Earth keeps the longer record."
        lede="Doctoral research in earth science at the University of Maine — field notes from where the planet remembers."
        image="/assets/sceince01.png"
        blocks={[
          {
            kicker: "Doctoral research",
            heading: "University of Maine · Earth Sciences.",
            body: "Current doctoral work in earth science, following a master's in computational engineering. The throughline: where models meet ground truth.",
          },
          {
            kicker: "Field notes",
            heading: "What gets written down in the field.",
            body: "Short notes from the lab and the field — not papers, not press releases. Working scientist's observations, written for readers outside the discipline.",
          },
          {
            kicker: "Method",
            heading: "Slow looking as a research practice.",
            body: "Long attention is the instrument science and writing share. Both reward staying with a thing past the point you thought you understood it.",
          },
        ]}
      />
      <NewsletterV5 />
      <FooterV5 />
    </>
  );
}
