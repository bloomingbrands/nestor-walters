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
import { PhilosophyScene } from "@/components/ui/philosophy-scene";
import { NewsletterCorrespondence } from "@/components/ui/newsletter-correspondence";
import { HorizonScene } from "@/components/ui/horizon-scene";
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
      <div className="flex flex-col lg:flex-row w-full lg:items-stretch">
        <div className="w-full lg:w-1/2 flex flex-col"><PhilosophyScene /></div>
        <div className="w-full lg:w-1/2 flex flex-col"><NewsletterCorrespondence /></div>
      </div>
      <HorizonScene />
      <VersionSwitcher />
    </>
  );
}
