import { VersionSwitcher } from "@/components/version-switcher";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";
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
      <PhilosophyScene />
      <NewsletterCorrespondence />
      <HorizonScene />
      <VersionSwitcher />
    </>
  );
}
