'use client';

import { CompAdmissionForms } from "@/components/adminDeshboard/admission/admissionForms";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge"

const Page = () => {
    const [existData, setExistData] = useState([]); // Original data
    const [filteredData, setFilteredData] = useState([]); // Filtered data to display
    const [filter, setFilter] = useState("Showall"); // Track the current filter

    useEffect(() => {
        getAdmissionState();
    }, []);

    useEffect(() => {
        applyFilter();
    }, [filter, existData]); // Re-apply the filter whenever filter or data changes

    const getAdmissionState = async () => {
        try {
            const response = await fetch("/api/admission/admissionstate/");
            if (!response.ok) {
                throw new Error("Failed to fetch admission state");
            }
            const data = await response.json();

            // Store data.result in state
            setExistData(data.result);
            setFilteredData(data.result); // Initialize filteredData with all data
        } catch (error) {
            alert(error.message);
        }
    };

    const applyFilter = () => {
        if (filter === "ShowComlete") {
            const completeForms = existData.filter(
                (item) =>
                    item.personalData === true &&
                    item.guardiansData === true &&
                    item.degreeProgramInformation === true &&
                    item.academicData === true &&
                    item.finalStepUploadDocuments === true
            );
            console.log("Complete Forms:", completeForms);
            setFilteredData(completeForms);
        } else {
            setFilteredData(existData);
        }
    };


    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between mx-2">
                <ToggleGroup
                    type="single"
                    value={filter}
                    onValueChange={(value) => setFilter(value)}
                    className="bg-background/50 rounded-sm"
                >
                    <ToggleGroupItem value="Showall">All Form</ToggleGroupItem>
                    <ToggleGroupItem value="ShowComlete">Complete Form</ToggleGroupItem>
                </ToggleGroup>
                <Badge variant="outline" className={"bg-background/50 shadow-lg hover:bg-white rounded-full"}>{filteredData.length < 9 ? "0" + filteredData.length : filteredData.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div key={index}>
                            <CompAdmissionForms item={item} />
                        </div>
                    ))
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className="backdrop-blur-lg border border-white/40 shadow-lg bg-background/50 rounded-3xl flex-col gap-2 border-black p-4"
                            >
                                <div className="flex flex-row gap-2">
                                    <Skeleton className="size-10 shrink-0 rounded-full bg-slate-300" />
                                    <Skeleton className="h-10 w-full bg-slate-300" />
                                </div>
                                <Skeleton className="h-20 w-full bg-slate-400 mt-2" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
