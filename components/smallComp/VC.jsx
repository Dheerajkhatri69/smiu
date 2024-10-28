"use client";
import React from "react";
import { ContainerScroll } from "../ui/container-scroll-animation";
import Image from "next/image";
import VCpic from "@/public/vc-smiu.png"
export function HeroScrollDemo() {
  return (
    (<div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-sm sm:text-lg font-semibold text-black dark:text-white">
            It gives natural vibrations to my hands and sensations to my mind when to write about 
            this august university i.e. 
            <span className="font-extrabold bg-gradient-to-tr from-purple-400 to-pink-300">Sindh Madressatul Islam University, Karachi. </span>
            This is the institute credited with production of wise persons, visionary leaders, freedom fighters, 
            educationists and founders, 
            viz: 
            <span className="font-extrabold bg-gradient-to-tr from-purple-400 to-pink-300">Quaid-e-Azam Mohammad Ali Jinnah</span> , 
            Sir Shahnawaz Bhutto, Sir Abdullah Haroon, 
            Sir Ghulam Hussain Hidayatullah, 
            Khan Bahadur Mohammad Ayub Khuhro, Allama I.I.
             Kazi, Allama Umer Bin Mohammad Doudpota, Hanif Muhammad and to my groomer i.e. 
             <span className="font-extrabold bg-gradient-to-tr from-purple-400 to-pink-300"> my father father Taj Muhammad Sahrai. </span>​<br />
              <span className="text-4xl md:text-[4rem] font-bold mt-1 leading-none">
              Prof. Dr. Mujeeb-U-Ddin Sahrai Memon
              </span>
            </h1>
          </>
        }>
        <Image
          src={VCpic}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false} />
      </ContainerScroll>
    </div>)
  );
}
