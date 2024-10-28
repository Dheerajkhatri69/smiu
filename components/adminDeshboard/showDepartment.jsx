"use client";
import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { DepCard } from './smallComp/DepCard';

// Helper function to truncate text
const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
        return {
            truncated: words.slice(0, wordLimit).join(" ") + '...',
            isTruncated: true,
        };
    }
    return {
        truncated: text,
        isTruncated: false,
    };
};

// TruncatedText component for handling "Read More" functionality
const TruncatedText = ({ text, wordLimit }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { truncated, isTruncated } = truncateText(text, wordLimit);

    const handleToggle = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div>
            {isExpanded ? text : truncated}
            {isTruncated && (
                <button
                    onClick={handleToggle}
                    className="text-blue-600 ml-2"
                >
                    {isExpanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
};

export const ShowDepartment = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog
    const [message, setMessage] = useState(""); // To store success or error message
    const [confirmDelete, setConfirmDelete] = useState(null); // To store department to delete

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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    const deleteDepartment = async () => {
        if (!confirmDelete) return; // Exit if no department is selected for deletion

        try {
            let result = await fetch(`http://localhost:3000/api/departments/${confirmDelete.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();

            if (result.success) {
                setMessage(`Department "${confirmDelete.name}" successfully deleted!`);
                // Remove the deleted department from the local state
                setDepartments(departments.filter(dep => dep._id !== confirmDelete.id));
            } else {
                setMessage("Error: Unable to delete department. Please try again.");
            }
        } catch (error) {
            setMessage("Error: Unable to delete department. Please check your connection.");
        }
        setIsDialogOpen(false); // Close the dialog after the action is completed
        setConfirmDelete(null); // Reset confirmDelete after deletion
    };

    const handleDeleteClick = (departmentId, departmentName) => {
        // Store department to confirm deletion
        setConfirmDelete({ id: departmentId, name: departmentName });
        setIsDialogOpen(true); // Open the confirmation dialog
    };

    if (loading) {
        return (
            <div className='container mx-auto flex flex-col justify-center items-center mt-20'>
                <h1 className='text-4xl font-extrabold mb-4'>Departments</h1>

                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Manage Departments</h2>
                    <Link href="#">
                        <button className="px-4 py-2 bg-black text-primary font-semibold rounded-lg hover:scale-105 duration-100 ease-in-out">
                            Add Department
                        </button>
                    </Link>
                </div>

                <div className='container mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2'>

                    <div className="flex items-center justify-center m-4">
                        <Skeleton className="md:h-96 w-60 h-60 md:w-96 flex flex-col justify-end items-start p-2 rounded-lg overflow-hidden group/card relative bg-primary-foreground" >
                            <Skeleton className="h-8 w-[50%] rounded bg-primary" />
                            <Skeleton className="h-12 w-full rounded bg-primary mt-2" />
                        </Skeleton>
                    </div>
                    <div className="flex items-center justify-center m-4">
                        <Skeleton className="md:h-96 w-60 h-60 md:w-96 flex flex-col justify-end items-start p-2 rounded-lg overflow-hidden group/card relative bg-primary-foreground" >
                            <Skeleton className="h-8 w-[50%] rounded bg-primary" />
                            <Skeleton className="h-12 w-full rounded bg-primary mt-2" />
                        </Skeleton>
                    </div>
                    <div className="flex items-center justify-center m-4">
                        <Skeleton className="md:h-96 w-60 h-60 md:w-96 flex flex-col justify-end items-start p-2 rounded-lg overflow-hidden group/card relative bg-primary-foreground" >
                            <Skeleton className="h-8 w-[50%] rounded bg-primary" />
                            <Skeleton className="h-12 w-full rounded bg-primary mt-2" />
                        </Skeleton>
                    </div>
                    <div className="flex items-center justify-center m-4">
                        <Skeleton className="md:h-96 w-60 h-60 md:w-96 flex flex-col justify-end items-start p-2 rounded-lg overflow-hidden group/card relative bg-primary-foreground" >
                            <Skeleton className="h-8 w-[50%] rounded bg-primary" />
                            <Skeleton className="h-12 w-full rounded bg-primary mt-2" />
                        </Skeleton>
                    </div>
                    
                </div>

                <Table className="min-w-full table-auto border-collapse shadow-lg">
                    <TableCaption>A list of your departments.</TableCaption>
                    <TableHeader className="bg-primary-foreground text-black font-mono text-xl rounded-lg">
                        <TableRow>
                            <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Image</TableHead>
                            <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Department Name</TableHead>
                            <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Description</TableHead>
                            <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Long Description</TableHead>
                            <TableHead className="p-4 font-bold text-right text-gray-700 dark:text-gray-200">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(4)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-10 w-10 ml-2 rounded-full bg-primary-foreground" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[150px] rounded bg-primary-foreground" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[200px] rounded bg-primary-foreground" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[150px] rounded bg-primary-foreground" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-4 w-[100px] rounded bg-primary-foreground" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='flex flex-col justify-center items-center mt-4 px-4'>
            <h1 className='text-4xl font-extrabold mb-6'>
                Departments
            </h1>

            <div className="flex justify-between items-center w-full mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Manage Departments</h2>
                <Link href="/dashboard/addDepartment">
                    <button className="px-4 py-2 bg-black text-primary font-semibold rounded-lg hover:scale-105 duration-100 ease-in-out">
                        Add Department
                    </button>
                </Link>
            </div>

            <div className='container mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-2'>
                {departments.length > 0 ? (
                    departments.map((department) => (

                        <Link href={`/dashboard/departments/${department._id}`}>
                            <DepCard image={department.image} name={department.name} description={department.description} />
                        </Link>
                    ))
                ) : (
                    null
                )}
                <Link href="/dashboard/addDepartment">
                    <DepCard type={"add"} />
                </Link>
            </div>

            <Table className="min-w-full table-auto border-collapse drop-shadow-2xl">
                <TableCaption className="text-lg text-gray-500">A list of your departments.</TableCaption>
                <TableHeader className="bg-primary-foreground text-black font-mono text-xl rounded-lg">
                    <TableRow>
                        <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Image</TableHead>
                        <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Department Name</TableHead>
                        <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Description</TableHead>
                        <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Long Description</TableHead>
                        <TableHead className="p-4 font-bold text-right text-gray-700 dark:text-gray-200">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {departments.length > 0 ? (
                        departments.map((department) => (
                            <TableRow key={department._id} className="hover:bg-primary-foreground dark:hover:bg-gray-700">
                                <TableCell className="p-4 text-gray-800 dark:text-gray-100 w-40">
                                    <div className="relative w-[30px] h-[30px]">
                                        <Image
                                            src={department.image}
                                            alt="Uploaded Image"
                                            layout="fill" // This makes the image fill the container
                                            objectFit="cover" // This ensures the image maintains aspect ratio
                                            className="rounded-lg"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="p-4 text-gray-800 dark:text-gray-100">{department.name}</TableCell>
                                {/* TruncatedText for description */}
                                <TableCell className="p-4 text-gray-800 dark:text-gray-100">
                                    <TruncatedText text={department.description} wordLimit={10} />
                                </TableCell>
                                {/* TruncatedText for link */}
                                <TableCell className="p-4 text-gray-800 dark:text-gray-100">
                                    <TruncatedText text={department.link} wordLimit={10} />
                                </TableCell>
                                <TableCell className="p-4 text-right w-[200px]">
                                    <Link href={`/dashboard/departments/${department._id}`}>
                                        <button className="px-4 py-1 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="px-4 py-1 ml-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 "
                                        onClick={() => handleDeleteClick(department._id, department.name)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-300 p-4">
                                No departments found.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Confirmation Dialog */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete the department{" "}
                            {confirmDelete?.name ? `"${confirmDelete.name}"` : ""}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="text-red-600 bg-red-100 rounded-lg hover:bg-red-200 " onClick={deleteDepartment}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
