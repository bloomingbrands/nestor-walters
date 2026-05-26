import type { Metadata } from "next";
import { VersionSwitcher } from "@/components/version-switcher";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { HeroV5 } from "@/components/landing/v5/HeroV5";
import { PillarsV5 } from "@/components/landing/v5/PillarsV5";
import { BookV5 } from "@/components/landing/v5/BookV5";
import { WritingCardsV5 } from "@/components/landing/v5/WritingCardsV5";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";

export const metadata: Metadata = {
  title: "Sword · Circle · Pen — Nestor Walters",
  description:
    "For veterans, scientists, and creatives. Writing, science, and the Veterans Transfer Project by Nestor Walters.",
  robots: { index: false, follow: false },
};

export default function V5Landing() {
  return (
    <main style={{ backgroundColor: "#fffeff" }}>
      <NavV5 />
      <HeroV5 />
      <PillarsV5 />
      <BookV5 />
      <WritingCardsV5 />
      <NewsletterV5 />
      <FooterV5 />
      <VersionSwitcher />
    </main>
  );
}
