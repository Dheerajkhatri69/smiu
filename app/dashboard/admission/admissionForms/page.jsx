'use client';

import { CompAdmissionForms } from "@/components/adminDeshboard/admission/admissionForms";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DatabaseIcon, EllipsisVertical, MessageCircle, SendHorizontal, Trash } from "lucide-react";
import deleteUser from "@/components/adminDeshboard/admission/deleteForm";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const Page = () => {
    const [existData, setExistData] = useState([]); // Original data
    const [filteredData, setFilteredData] = useState([]); // Filtered data to display
    const [filter, setFilter] = useState("Showall"); // Track the current filter
    const [selectUser, setSelectUser] = useState(false);
    const [selectedCNICs, setSelectedCNICs] = useState([]); // Store selected CNICs

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageHead, setMessageHead] = useState("");

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
            setFilteredData(completeForms);
        } else {
            setFilteredData(existData);
        }
    };

    const handleCheckboxChange = (cnic, isChecked) => {
        if (isChecked === "true") {
            setSelectedCNICs((prevItems) => prevItems.filter((item) => item !== Number(cnic)));
        } else {
            setSelectedCNICs((prevItems) => [...prevItems, Number(cnic)]);
        }
    };
    const handleALLCheckboxChange = (isChecked) => {
        // console.log();
        if (isChecked === "true") {
            setSelectedCNICs([]);
        } else {
            setSelectedCNICs([]);
            filteredData.map((e) => {
                setSelectedCNICs((prevItems) => [...prevItems, Number(e.cnic)]);
            })
        }

    }
    const getAdmissionStateS = async (cnic) => {
        try {
            const response = await fetch(`/api/admission/admissionstate/${cnic}`);
            if (!response.ok) {
                throw new Error("Failed to fetch admission state");
            }
            const data = await response.json();
            return data.result;
        } catch (error) {
            console.error("Error fetching admission state:", error.message);
            return null; // Explicitly return null to indicate failure
        }
    };
    
    const deleteSelectedUser = async () => {
        const failedCNICs = [];
        const successfulCNICs = [];
    
        for (const cnic of selectedCNICs) {
            try {
                const state = await getAdmissionStateS(cnic);
                if (!state) {
                    console.error(`Failed to fetch state for CNIC: ${cnic}`);
                    failedCNICs.push(cnic);
                    continue; // Skip this CNIC and move to the next
                }
    
                const deleteSteps = deleteUser(state, cnic);
                let allStepsSuccessful = true;
    
                for (const step of deleteSteps) {
                    const isDeleted = await step(); // Execute each deletion step
                    if (!isDeleted) {
                        allStepsSuccessful = false;
                        failedCNICs.push(cnic);
                        break; // Stop further steps if one fails
                    }
                }
    
                if (allStepsSuccessful) {
                    successfulCNICs.push(cnic);
                }
            } catch (error) {
                console.error(`Unexpected error during deletion for CNIC ${cnic}:`, error.message);
                failedCNICs.push(cnic);
            }
        }
    
        // Display consolidated message
        if (failedCNICs.length > 0 || successfulCNICs.length > 0) {
            setMessageHead("Deletion Summary");
            setMessage(`
                ${successfulCNICs.length > 0 ? `Successfully deleted data for CNICs: ${successfulCNICs.join(", ")}.` : ""}
                ${failedCNICs.length > 0 ? `Failed to delete data for CNICs: ${failedCNICs.join(", ")}.` : ""}
            `);
            setIsDialogOpen(true);
        } else {
            setMessageHead("No Deletion Performed");
            setMessage("No CNICs were successfully processed.");
            setIsDialogOpen(true);
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
            <div className="flex justify-between">
                <Button className="text-black bg-primary-foreground m-2" onClick={() => { setSelectUser(!selectUser) }}>
                    Select
                </Button>

                {selectUser ?
                    <div className="flex items-center mx-4">
                        <Checkbox id="terms"
                            className="bg-gray-200 rounded-lg h-5 font-bold w-5 border-gray-300 text-black m-1 shadow-md"
                            onClick={(e) => handleALLCheckboxChange(e.target.ariaChecked)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Select All
                        </label>
                    </div>
                    : null}
            </div>
            {
                selectedCNICs.length > 0 ?
                    <div className="bg-background/50 p-4 rounded-2xl mx-2 duration-100 ease-out">
                        <div className="flex justify-between">
                            <p className="text-l font-bold">
                                Selected Form:
                            </p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild >
                                    <EllipsisVertical cursor="pointer" className="hover:scale-125 duration-100 ease-in" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-primary/90">
                                    <DropdownMenuLabel>{selectedCNICs.length+" Form"}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <SendHorizontal />
                                            <span>Invite For Test</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <MessageCircle />
                                        <span>Message</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="p-0">
                                        <Button className="w-full p-1 text-red-500 font-bold"
                                            onClick={() => deleteSelectedUser()} // Pass cnic to deleteUser
                                        >
                                            <Trash />
                                            <span>Delete</span>
                                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div>
                            <ul>
                                {selectedCNICs.map((cnic, idx) => (
                                    <li key={idx}>{cnic}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    : null
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2">
                {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                        <div key={index}>
                            {
                                selectUser ?
                                    <Checkbox
                                        id={`checkbox-${index}`}
                                        checked={selectedCNICs?.includes(Number(item.cnic))}
                                        className="bg-gray-200 rounded-lg h-5 font-bold w-5 border-gray-300 text-black m-1 shadow-md"
                                        onClick={(e) =>
                                            handleCheckboxChange(item.cnic, e.target.ariaChecked)
                                        }
                                    />
                                    : null
                            }
                            <CompAdmissionForms item={item} className="w-full" />
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
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{messageHead}</AlertDialogTitle>
                        <AlertDialogDescription>{message}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    );
};

export default Page;
