"use client"; // Add this directive at the top

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { CircleCheckBig, CircleX } from "lucide-react";
import { itemFromArray } from "@tsparticles/engine";
export const HoverEffect = ({
    items,
    className
}) => {
    let [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        (<div
            className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  py-4", className)}>
            {items.map((item, idx) => (
                <Link
                    href={item.link}
                    key={item?.link}
                    title={item?.title || item?.name}
                    className="relative group  block p-2 h-full w-full bg-primary"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}>
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-black block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }} />
                        )}
                    </AnimatePresence>
                    <Card state={item.state}>
                        <CardTitle >{item.title || item.name}</CardTitle>
                        {
                            item.state ? <CircleCheckBig className="text-green-600 mt-2" /> : <CircleX className="text-red-600 mt-2" />
                        }

                    </Card>
                </Link>
            ))}
        </div>)
    );
};

export const Card = ({
    className,
    children,
    state
}) => {
    return (
        (<div
            className={cn(
                `rounded-2xl h-full w-full p-4 overflow-hidden ${state ? "bg-green-100" : "bg-red-100"}  border border-transparent group-hover:border-slate-700 relative z-20`,
                className
            )}>
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>)
    );
};
export const CardTitle = ({
    className,
    children
}) => {
    return (
        (<h4 className={cn("text-black text-xl font-bold tracking-wide", className)}>
            {children}
        </h4>)
    );
};
