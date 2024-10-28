"use client";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";

export function DepCard(prom) {
    return (
        <div className="flex items-center justify-center m-4">

            {prom.type === "add" ? (
                <DirectionAwareHover className={"bg-primary"} type={"add"} imageUrl={"https://utfs.io/f/gIwxHZcSzCKXSeza7Aj89FwTyUm4v5pHMehinJrOXNZBRA7j"}>
                    <p className="font-bold text-xl">{"Add Department"}</p>
                    <p className="font-normal text-sm">{prom.description}</p>
                </DirectionAwareHover>
            ) : (
            <DirectionAwareHover imageUrl={prom.image}>
                <p className="font-bold text-xl">{prom.name}</p>
                <p className="font-normal text-sm">{prom.description}</p>
              </DirectionAwareHover>
            )}
        </div>
    );
}
