"use client"; // Add this directive at the top

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import Image from "next/image";
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
          href={`dep/${item._id}`}
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
          <Card>
            <CardTitle >{item.title || item.name}</CardTitle>
            {/* <CardDescription>{item.description}</CardDescription> */}<CardDescription>
              {item.description.length > 50 ? `${item.description.slice(0, 50)}...` : item.description}
            </CardDescription>

            <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg shadow-lg"> {/* 16:9 aspect ratio */}
              <Image
                src={item.image}
                alt="YouTube Thumbnail"
                layout="fill"            // Fills the parent container
                objectFit="cover"        // Cover the area of the container
                className="rounded-lg"    // Rounded corners
              />
            </div>
          </Card>
        </Link>
      ))}
    </div>)
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-primary-foreground border border-transparent group-hover:border-slate-700 relative z-20",
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
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("my-2 text-neutral-700 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>)
  );
};
