"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo({image , title}) {
  return (
    (<CardContainer >
      <CardBody
        className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 ">
        
        <CardItem
          as="p"
          translateZ="60"
          className="font-bold my-4 text-lg text-black max-w-sm mt-2 ">
          {title}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail" />
        </CardItem>
        
      </CardBody>
    </CardContainer>)
  );
}
