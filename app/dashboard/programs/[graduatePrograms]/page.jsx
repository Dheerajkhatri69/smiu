"use client";
import React, { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Cover } from "@/components/ui/cover";
import { Skeleton } from "@/components/ui/skeleton";

const Page = ({ params }) => {
    const [programs, setPrograms] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getPrograms();
    }, []);

    // Filter the data whenever programs or params.graduatePrograms change
    useEffect(() => {
        applyFilter();
    }, [programs, params.graduatePrograms]);

    const getPrograms = async () => {
        try {
            const response = await fetch("/api/program");
            if (!response.ok) {
                throw new Error("Failed to fetch programs.");
            }
            const data = await response.json();
            if (data.success) {
                setPrograms(data.result); // Assuming the response contains a `result` array
                setLoading(false);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const applyFilter = () => {
        const filterCategory = programs.filter(
            (item) => item.category === params.graduatePrograms
        );
        setFilteredData(filterCategory);
    };

    return (
        <div className="m-2 flex flex-col items-center">
            <h1 className="sm:text-4xl text-2xl my-4">
                <Cover>
                    {params.graduatePrograms} Programs
                </Cover>
            </h1>

            <div className="w-full flex flex-wrap justify-center gap-4">
                {
                    loading ?
                        Array.from({ length: 6 }).map((_, index) => (
                            <Alert
                                key={index}
                                className="max-w-[500px] bg-background/50 hover:scale-105 ease-in duration-150 shadow-lg border-none rounded-2xl cursor-pointer">
                                {/* <Skeleton className="h-6 w-6 bg-black/50 rounded-full mb-2" /> */}
                                <Terminal size={20} />
                                
                                <div className="flex flex-col gap-2 w-full">
                                    <Skeleton className="h-3 w-1/3 bg-black/30 rounded" />
                                    <Skeleton className="h-3 w-1/4 bg-black/30 rounded" />
                                    <Skeleton className="h-4 w-2/3 bg-black/30 rounded" />
                                </div>
                            </Alert>
                        ))
                        :
                        filteredData.map((program, index) => (
                            <Alert
                                key={index}
                                className="max-w-[500px] bg-background/50 hover:scale-105 ease-in duration-150 shadow-lg border-none rounded-2xl cursor-pointer"
                            >
                                <Terminal size={20} />
                                <div className="flex flex-col w-full">
                                    <AlertTitle>{program.program}</AlertTitle>
                                    <AlertTitle>{program.sort}</AlertTitle>
                                    <AlertDescription>{program.department}</AlertDescription>
                                </div>
                            </Alert>
                        ))

                }
            </div>
        </div>
    );
};

export default Page;
