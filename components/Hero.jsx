"use client";

import { MaskContainer } from "./ui/svg-mask-effect";

export function SVGMaskEffectDemo() {
  return (
    (
      <div
        className="h-full w-full flex flex-col items-center justify-center overflow-hidden bg-[url('/Dep/talpur1.jpg')] bg-cover bg-center"
      >
        <MaskContainer
          revealText={
            <p
              className="container mx-auto text-primary/30 text-center  text-4xl font-bold">
              Welcome To
              Sindh Madressatul Islam University. 
              (SMIU) is a chartered University duly recognized by the Higher Education Commission of Pakistan. 
            </p>
          }
          className="h-[60rem] rounded-md">
          <span className="text-primary">
            Welcome To <span className="text-red-500">Sindh Madressatul Islam University. </span>
            (SMIU) is a chartered University duly recognized by the Higher Education Commission of Pakistan. 
          </span>
        </MaskContainer>
      </div>)
  );
}
