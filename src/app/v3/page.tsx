import type { Metadata } from "next";
import Nav from "@/components/landing/Nav";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};
import SelectedWork from "@/components/landing/SelectedWorkV3";
import PhotoSeries from "@/components/landing/PhotoSeries";
import Bio from "@/components/landing/Bio";
import VeteranProject from "@/components/landing/VeteranProject";
import Newsletter from "@/components/landing/Newsletter";
import Footer from "@/components/landing/Footer";
import { VersionSwitcher } from "@/components/version-switcher";

export default function LandingPageV3() {
  return (
    <div data-v3 data-testid="landing-page" className="min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <SelectedWork />
      <PhotoSeries />
      <Bio />
      <VeteranProject />
      <Newsletter />
      <Footer />
      <VersionSwitcher />
    </div>
  );
}
