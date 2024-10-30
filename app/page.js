import {FlickeringGridDemo} from "@/components/Hero";
// import { MacbookScrollDemo } from "@/components/Hero2";
import Clips from "@/components/smallComp/Clips";
import { TimelineDemo } from "@/components/smallComp/Department";
import { CoverDemo } from "@/components/smallComp/Hading";
import { BentoGridThirdDemo } from "@/components/smallComp/LatestNews";
import Map from "@/components/smallComp/Map";
import { InfiniteMovingCardsDemo } from "@/components/smallComp/students";
import { HeroScrollDemo } from "@/components/smallComp/VC";
import { AnimatedPinDemo } from "@/components/smallComp/Wellcome2";


export default function Home() {
  return (
    <div className="">
      {/* <MacbookScrollDemo/> */}
      <FlickeringGridDemo/>
      {/* <SVGMaskEffectDemo /> */}
      <AnimatedPinDemo />
      <TimelineDemo />
      <CoverDemo text={"SMIU"} hading={"Latest News"} />
      <BentoGridThirdDemo />
      <HeroScrollDemo />
      <Clips />
      <InfiniteMovingCardsDemo />
      <Map />
    </div>
  );
}
