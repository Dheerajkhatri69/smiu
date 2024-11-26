"use client";

import { MaskContainer } from "./ui/svg-mask-effect";

export function SVGMaskEffectDemo() {
  return (
    (
      <div
        className="h-full w-full flex items-center justify-center overflow-hidden bg-[url('/Dep/talpur1.jpg')] bg-cover bg-center"
      >
        <MaskContainer
          revealText={
            <p
              className="container mx-auto text-black/50 text-center  text-4xl font-bold">
              The first rule of MRR Club is you do not talk about MRR Club. The
              second rule of MRR Club is you DO NOT talk about MRR Club.
            </p>
          }
          className="h-[60rem] rounded-md">
            <span className="text-primary">
            The first rule of <span className="text-red-500">MRR Club</span> is you
          do not talk about MRR Club. The second rule of MRR Club is you DO NOT
          talk about <span className="text-red-500">MRR Club</span>.
        
            </span>
        </MaskContainer>
      </div>)
  );
}
