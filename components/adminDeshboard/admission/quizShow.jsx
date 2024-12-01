"use client";
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from "@/components/ui/glowing-stars";
import { CircleArrowRight } from "lucide-react";
import React from "react";
export function QuizShow({ quizNO }) {
    return ((
        <div className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
                <GlowingStarsTitle>Entry Test {quizNO}</GlowingStarsTitle>
                <div className="flex justify-between items-end">
                    <GlowingStarsDescription>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    </GlowingStarsDescription>
                    <div
                        className="h-8 w-8 rounded-full text-black flex items-center justify-center">
                        <CircleArrowRight  size={50}/>
                    </div>
                </div>
            </GlowingStarsBackgroundCard>
        </div>
    ));
}
