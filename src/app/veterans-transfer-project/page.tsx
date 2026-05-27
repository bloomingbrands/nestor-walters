import type { Metadata } from "next";
import { NavV5 } from "@/components/landing/v5/NavV5";
import { VeteransTransferProject } from "@/components/landing/v5/VeteransTransferProject";
import { NewsletterV5 } from "@/components/landing/v5/NewsletterV5";
import { FooterV5 } from "@/components/landing/v5/FooterV5";

export const metadata: Metadata = {
  title: "Veterans Transfer Project — Sword · Circle · Pen",
  description:
    "Education is the most powerful weapon you can use to change the world. A toolkit for veterans considering college, built with Next Step Inbound.",
  robots: { index: false, follow: false },
};

export default function VeteransTransferProjectPage() {
  return (
    <>
      <NavV5 />
      <VeteransTransferProject />
      <NewsletterV5 />
      <FooterV5 />
    </>
  );
}
