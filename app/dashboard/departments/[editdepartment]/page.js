"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { UploadButton } from "@/utils/uploadthing";
import CodeEditor from "@/components/codeediter/CodeEditer";

export default function Page(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getDepartmentsDetail();
    }, []);

    const getDepartmentsDetail = async () => {
        try {
            const res = await fetch(`/api/departments/${props.params.editdepartment}`);
            const departmentsData = await res.json();
            if (departmentsData.success) {
                // console.log(departmentsData.result)
                setName(departmentsData.result.name);
                setDescription(departmentsData.result.description);
                setLink(departmentsData.result.link);
                setImage(departmentsData.result.image);
            } else {
                setMessage("Failed to fetch department details.");
                setIsDialogOpen(true);
            }
        } catch (error) {
            console.error("Error fetching department details:", error);
            setMessage("An error occurred while fetching department details.");
            setIsDialogOpen(true);
        }
    };

    // Auto-fill and format link based on the department name

    const updateDepartment = async () => {
        try {
            let result = await fetch(`/api/departments/${props.params.editdepartment}`, {
                method: "PUT",
                body: JSON.stringify({ name, description, link, image }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();

            if (result.success) {
                setMessage(
                    <>
                        Department successfully updated! <br />
                        <span className="font-extrabold">Name: </span>{name} <br />
                        <span className="font-extrabold">Description: </span>{description} <br />
                        <span className="font-extrabold">Path: </span>{link.length >= 100 ? link.slice(0, 99) + "..." : link}
                    </>
                );
            } else {
                setMessage("Error: Unable to add department. Please try again.");
            }
        } catch (error) {
            setMessage("Error: Unable to add department. Please check your connection.");
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !description || !link) {
            setMessage("All fields are required.");
            setIsDialogOpen(true);
            return;
        }
        updateDepartment();
    };

    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className='min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8'>
                <div className="flex justify-center self-center z-10 w-full max-w-3xl mx-auto">
                    <div className="bg-white/30 my-20 w-full container backdrop-blur-lg border border-white/40 shadow-lg p-6 sm:p-12 bg-white mx-auto rounded-3xl">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-7">
                                <h3 className="font-semibold text-2xl sm:text-3xl text-gray-800 text-center">Add Department</h3>
                            </div>
                            <div className="space-y-6">

                                <LabelInputContainer>
                                    <Label htmlFor="name">Department Name</Label>
                                    <input
                                        className="w-full text-sm sm:text-base px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Department Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="image">Upload Department Image</Label>
                                    <UploadButton
                                        endpoint="imageUploader"
                                        className="px-4 py-2 hover:bg-primary-foreground text-primary rounded-lg bg-zinc-800 transition duration-200"
                                        onClientUploadComplete={(res) => {
                                            if (res && res.length > 0) {
                                                setImageUrl(res[0].url); // Set the uploaded image URL
                                            }
                                        }}
                                        onUploadError={(error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                    {image && (
                                        <div className="relative w-full h-[200px] mt-2">
                                            <Image
                                                src={image}
                                                alt="Uploaded Image"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    )}
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="description">Department Description</Label>
                                    <textarea
                                        id="description"
                                        placeholder="Brief description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                        className="w-full text-sm sm:text-base px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                    />
                                </LabelInputContainer>

                                <LabelInputContainer>
                                    <Label htmlFor="link">Large Description</Label>
                                    <CodeEditor getcode={setLink} getvalue={link} />
                                </LabelInputContainer>

                                <button
                                    className="bg-gradient-to-br text-2xl sm:text-xl relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-16 sm:h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                                    type="submit"
                                >
                                    Add &rarr;
                                    <BottomGradient />
                                </button>
                            </div>
                        </form>

                        {/* Alert Dialog */}
                        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <AlertDialogContent className="rounded-md">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Department</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        {message}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Close</AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>

    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({ children, className }) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
