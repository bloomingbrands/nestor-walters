import type { Metadata } from "next";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { HeroV5 } from "@/components/landing/v5/HeroV5";
import { PillarsV5 } from "@/components/landing/v5/PillarsV5";
import { BookV5 } from "@/components/landing/v5/BookV5";
import { WritingCardsV5 } from "@/components/landing/v5/WritingCardsV5";
import { AboutAuthorV5 } from "@/components/landing/v5/AboutAuthorV5";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";

export const metadata: Metadata = {
  title: "Sword · Circle · Pen — Nestor Walters",
  description:
    "For veterans, scientists, and creatives. Writing, science, and the Veterans Transfer Project by Nestor Walters.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="v5-landing" style={{ backgroundColor: "#fffeff" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>
      <NavV5 />
      <HeroV5 />
      <PillarsV5 />
      <BookV5 />
      <WritingCardsV5 />
      <AboutAuthorV5 />
      <NewsletterV5 />
      <FooterV5 />
    </main>
  );
}
