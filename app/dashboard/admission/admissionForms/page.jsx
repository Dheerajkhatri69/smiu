'use client'
import { CompAdmissionForms } from "@/components/adminDeshboard/admission/admissionForms";
import { Skeleton } from "@/components/ui/skeleton";
import { Tweet } from "@/components/ui/TweetCard";
import { useEffect, useState } from "react";

const Page = () => {
    const [existData, setExistData] = useState([]); // Initialize as an empty array for storing fetched data

    useEffect(() => {
        getAdmissionState();
    }, []); // Empty dependency array ensures this runs only once

    const getAdmissionState = async () => {
        try {
            const response = await fetch("/api/admission/admissionstate/");
            if (!response.ok) {
                throw new Error("Failed to fetch admission state");
            }
            const data = await response.json();

            // Store data.result in existData state
            setExistData(data.result);

            // Optional: Log to verify
            console.log("Fetched and stored data:", data.result);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-2'>
            {existData.length > 0 ? (
                existData.map((item, index) => (
                    <div key={index}>
                        <CompAdmissionForms item={item} />
                    </div>
                ))
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
                    <div className={"backdrop-blur-lg border border-white/40 shadow-lg bg-background/50 rounded-3xl flex-col gap-2 border-black p-4"}>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="size-10 shrink-0 rounded-full bg-slate-300" />
                            <Skeleton className="h-10 w-full bg-slate-300" />
                        </div>
                        <Skeleton className="h-20 w-full bg-slate-400 mt-2" />
                    </div>
                    <div className={"backdrop-blur-lg border border-white/40 shadow-lg bg-background/50 rounded-3xl size-full flex-col gap-2 border-black p-4"}>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="size-10 shrink-0 rounded-full bg-slate-300" />
                            <Skeleton className="h-10 w-full bg-slate-300" />
                        </div>
                        <Skeleton className="h-20 w-full bg-slate-400 mt-2" />
                    </div>
                    <div className={"backdrop-blur-lg border border-white/40 shadow-lg bg-background/50 rounded-3xl size-full flex-col gap-2 border-black p-4"}>
                        <div className="flex flex-row gap-2">
                            <Skeleton className="size-10 shrink-0 rounded-full bg-slate-300" />
                            <Skeleton className="h-10 w-full bg-slate-300" />
                        </div>
                        <Skeleton className="h-20 w-full bg-slate-400 mt-2" />
                    </div>
                </div>

            )}
        </div>

    );
};

export default Page;

