import type { Metadata } from "next";
import { VersionSwitcher } from "@/components/version-switcher";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};
import { TheManScene } from "@/components/ui/the-man-scene";
import { EarthDayEulogy } from "@/components/ui/earth-day-eulogy";
import { VeteranTransferScene } from "@/components/ui/veteran-transfer-scene";
import { VeteranFaq } from "@/components/ui/veteran-faq";
import { SpeakingScene } from "@/components/ui/speaking-scene";
import { NewsletterCorrespondence } from "@/components/ui/newsletter-correspondence";
import { SelectedWork } from "@/components/landing/SelectedWork";

export default function Home() {
  return (
    <>
      <ParallaxComponent />
      <TheManScene />
      <SelectedWork />
      <EarthDayEulogy />
      <VeteranTransferScene />
      <VeteranFaq />
      <SpeakingScene />
      <NewsletterCorrespondence />
      {/* <HorizonScene /> */}
      <VersionSwitcher />
    </>
  );
}
