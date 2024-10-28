"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { Cover } from "../ui/cover";

export function InfiniteMovingCardsDemo() {
  return (
    (<div
      className="h-[20rem] container mx-auto my-4 rounded-lg flex flex-col antialiased bg-background/40 items-center justify-center relative overflow-hidden">

      <header className="py-2">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
          SMIU <Cover>STUDENTS</Cover>
        </h1>
      </header>

      <InfiniteMovingCards items={images} direction="right" speed="slow" />
    </div>)
  );
}
const images = [
  { src: "/student/std1.jpg" },
  { src: "/student/std2.jpg" },
  { src: "/student/std3.jpg" },
  { src: "/student/std4.jpg" },
  { src: "/student/std5.jpg" },
  { src: "/student/std6.jpg" },
  { src: "/student/std7.jpg" },
  { src: "/student/std8.jpg" },
  { src: "/student/std9.jpg" },
  { src: "/student/std10.jpg" },
  { src: "/student/std11.jpg" },
  { src: "/student/std12.jpg" },
  { src: "/student/std13.jpg" },
  { src: "/student/std14.jpg" },
  { src: "/student/std15.jpg" },
  { src: "/student/std16.jpg" },
  { src: "/student/std17.jpg" },
  { src: "/student/std18.jpg" }
];

