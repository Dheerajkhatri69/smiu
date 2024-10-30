import { ChevronRight } from "lucide-react";
import AnimatedGradientText from "./ui/animated-gradient-text";
import FlickeringGrid from "./ui/flickering-grid";
import { RainbowButton } from "./ui/rainbow-button";
import { VelocityScroll } from "./ui/scroll-based-velocity";
import SparklesText from "./ui/sparkles-text";
import { cn } from "@/lib/utils";
import AvatarCircles from "./ui/avatar-circles";

const avatarUrls = [
  "https://utfs.io/f/gIwxHZcSzCKXH717tBUhacfb26rjsJZu7iQmqC9RzN3odwvL",
  "https://utfs.io/f/gIwxHZcSzCKXH717tBUhacfb26rjsJZu7iQmqC9RzN3odwvL",
  "https://utfs.io/f/gIwxHZcSzCKXH717tBUhacfb26rjsJZu7iQmqC9RzN3odwvL",
];
export function FlickeringGridDemo() {
  return (
    <div className="relative h-screen flex flex-col gap-2 justify-center items-center rounded-lg w-full bg-primary overflow-hidden border">

      <FlickeringGrid
        className="z-0 absolute inset-0 w-full h-full"
        squareSize={20}
        gridGap={6}
        // color="#B9E5E8"
        color="#ffffff"
        maxOpacity={1}
        flickerChance={0.1}
      />
      <div className="z-10 flex items-center justify-center">
        <AnimatedGradientText>
          🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />{" "}
          <span
            className={cn(
              `inline animate-gradient bg-gradient-to-r from-[#ffaa40]  via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
            )}
          >
            Introducing SMIU
          </span>
          <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedGradientText>
      </div>
      <AvatarCircles numPeople={9} avatarUrls={avatarUrls} />
      <VelocityScroll
        text="Welcome To Sindh Madressatul Islam University (SMIU)."
        default_velocity={1}
        className="font-display mx-4 text-center text-4xl font-dheerajTitle font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-7xl md:leading-[5rem]"
      />
      <SparklesText
        className={"font-dheerajTitle text-center text-sm sm:text-xl max-w-[600px] px-2"}
        text="Sindh Madressatul Islam University (SMIU) is a chartered University duly recognized by the Higher Education Commission of Pakistan. It is one of the oldest institutions in South Asia, which started as a school in 1885, became a college in 1943 and a university in February 2012." />

      <RainbowButton className={"my-4"}>Get Unlimited Access</RainbowButton>
      
    </div>
  );
}
