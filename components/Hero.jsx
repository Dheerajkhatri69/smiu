"use client";
import { MaskContainer } from "./ui/svg-mask-effect";
const mainPicUrl = "/Dep/talpur1.jpg";
export function SVGMaskEffectDemo() {
  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${mainPicUrl})` }}
    >
      <MaskContainer
        revealText={
          <p
            className="w-full container mx-auto text-center text-4xl font-bold text-amber-200"
          >
            The first rule of
            <span className="text-white"> MRR Club </span>
            is you do not talk about MRR Club. The second rule of MRR Club is you DO NOT talk about
            <span className="text-white"> MRR Club</span>.
          </p>

        }
        className="h-screen rounded-md"
      >
        The first rule of
        <span className="text-red-500"> MRR Club </span>
        is you do not talk about MRR Club. The second rule of MRR Club is you DO NOT talk about
        <span className="text-red-500"> MRR Club</span>.
      </MaskContainer>
    </div>
  );
}
