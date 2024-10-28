"use client";
import React from "react";
import {
    TextRevealCard,
    TextRevealCardDescription,
    TextRevealCardTitle,
} from "../ui/text-reveal-card";

export function TextRevealCardPreview() {
    return (
        <div className="flex items-center relative mx-auto bg-gradient-to-tr from-white to-[#161b04] p-0.5 shadow-lg justify-center h-[25rem] w-full">
            <TextRevealCard text="Sindh Madressatul Islam University (SMIU)" revealText="Sindh Madressatul Islam University (SMIU)">
                <TextRevealCardTitle>
                    It is one of the oldest institutions in South Asia, which started as a school in 1885, became a college in 1943, and a university in February 2012.
                </TextRevealCardTitle>
                <TextRevealCardDescription>
                    Welcome To
                </TextRevealCardDescription>
            </TextRevealCard>
        </div>
    );
}
