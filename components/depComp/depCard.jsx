"use client"
import { HoverEffect } from "../ui/card-hover-effect";
import { Cover } from "../ui/cover";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

export function CardHoverEffectDemo() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for skeleton

    // Fetch department data when the component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch("/api/departments");
                if (!response.ok) {
                    throw new Error("Failed to fetch departments");
                }
                const data = await response.json();
                setDepartments(data.result); // Assuming your API returns an array in `result`
                setLoading(false); // Stop loading once data is fetched
            } catch (error) {
                alert(error.message);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="container mt-20 mx-auto py-0 px-8">
            <header className="py-2">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                    SMIU <Cover>Department</Cover>
                </h1>
            </header>

            {/* Display skeleton if loading, otherwise render HoverEffect */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {/* Display skeletons for cards */}
                    <Skeleton className="w-full flex flex-col gap-4 bg-primary-foreground h-[250px] rounded-lg p-4" >
                        <Skeleton className="w-full bg-primary h-[20px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-[40px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-full rounded-lg" />
                    </Skeleton>
                    <Skeleton className="w-full flex flex-col gap-4 bg-primary-foreground h-[250px] rounded-lg p-4" >
                        <Skeleton className="w-full bg-primary h-[20px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-[40px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-full rounded-lg" />
                    </Skeleton>
                    <Skeleton className="w-full flex flex-col gap-4 bg-primary-foreground h-[250px] rounded-lg p-4" >
                        <Skeleton className="w-full bg-primary h-[20px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-[40px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-full rounded-lg" />
                    </Skeleton>
                    <Skeleton className="w-full flex flex-col gap-4 bg-primary-foreground h-[250px] rounded-lg p-4" >
                        <Skeleton className="w-full bg-primary h-[20px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-[40px] rounded-lg" />
                        <Skeleton className="w-full bg-primary h-full rounded-lg" />
                    </Skeleton>
                </div>
            ) : (
                <HoverEffect items={departments} />
            )}
        </div>
    );
}
