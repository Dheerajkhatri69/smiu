"use client";
import React from "react";
import { PinContainer } from "../ui/3d-pin";
import mainPic from "@/public/Dep/talpur1.jpg"
export function AnimatedPinDemo() {
    return (
        (<div className="h-[40rem] p-10 w-full flex justify-center overflow-hidden">
            <PinContainer title="Sindh Madressatul Islam University (SMIU)" className={""} >
                <div
                    className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[36rem]"
                >
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500 ">
                            Pakistan Higher Education Commission, is one of South Asia oldest institutions, founded in 1885 as a school, later becoming a college in 1943, and a university in 2012.
                        </span>
                    </div><div
                        className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500"
                        style={{
                            backgroundImage: `url(${mainPic.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />

                </div>
            </PinContainer>
        </div>)
    );
}
