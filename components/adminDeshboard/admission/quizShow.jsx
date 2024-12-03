"use client";
import { GlowingStarsBackgroundCard, GlowingStarsDescription, GlowingStarsTitle } from "@/components/ui/glowing-stars";
import { CircleArrowRight } from "lucide-react";
import React from "react";
export function QuizShow({ quizNO , quizDiscription}) {
    return ((
        <div className="flex items-center justify-center antialiased">
            <GlowingStarsBackgroundCard>
                <GlowingStarsTitle>Entry Test {quizNO}</GlowingStarsTitle>
                <div className="flex justify-between items-end">
                    <GlowingStarsDescription>
                        {quizDiscription.substring(0, 60)+"...."}
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
