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

export const ShowStudentSignupEmail = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog
    const [message, setMessage] = useState(""); // To store success or error message
    const [confirmDelete, setConfirmDelete] = useState(null); // To store department to delete

    // Fetch department data when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("/api/studentSignupEmail");
                if (!response.ok) {
                    throw new Error("Failed to fetch Student Signup Email");
                }
                const data = await response.json();
                setUsers(data.result); // Assuming your API returns an array in `result`
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [message]);

    const deleteUser = async () => {
        if (!confirmDelete) return; // Exit if no department is selected for deletion

        try {
            let result = await fetch(`/api/studentSignupEmail/${confirmDelete.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();

            if (result.success) {
                setMessage(`User "${confirmDelete.name}" successfully deleted!`);
                // Remove the deleted department from the local state
                setDepartments(users.filter(user => user._id !== confirmDelete.id));
            } else {
                setMessage("Error: Unable to delete user. Please try again.");
            }
        } catch (error) {
            setMessage("Error: Unable to delete user. Please check your connection.");
        }
        setIsDialogOpen(false); // Close the dialog after the action is completed
        setConfirmDelete(null); // Reset confirmDelete after deletion
    };

    const handleDeleteClick = (userId, useremail) => {
        // Store department to confirm deletion
        setConfirmDelete({ id: userId, email: useremail });
        setIsDialogOpen(true); // Open the confirmation dialog
    };

    if (loading) {
        return (
            <div className='container mx-auto flex flex-col justify-center items-center mt-20'>
                <h1 className='text-4xl font-extrabold mb-4'>Student Signup Email</h1>

                <div className="flex justify-between items-center w-full mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Manage Student Signup Email</h2>
                    <Link href="#">
                        <button className="px-4 py-2 bg-black text-primary font-semibold rounded-lg hover:scale-105 duration-100 ease-in-out">
                            Add Student Signup Email
                        </button>
                    </Link>
                </div>

                <Table className="min-w-full table-auto border-collapse shadow-lg">
                    <TableCaption>A list of Student Signup Email.</TableCaption>
                    <TableHeader className="bg-primary-foreground text-black font-mono text-xl rounded-lg">
                        <TableRow>
                            <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">CNIC</TableHead>
                            <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Email</TableHead>
                            <TableHead className="p-4 font-bold text-right text-gray-700 dark:text-gray-200">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(4)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-4 w-[150px] rounded bg-primary-foreground" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-[150px] rounded bg-primary-foreground" />
                                </TableCell>
                                <TableCell className="flex gap-2 justify-end items-center mt-3">
                                    <Skeleton className="h-4 w-[50px] rounded bg-primary-foreground" />
                                    <Skeleton className="h-4 w-[50px] rounded bg-primary-foreground" />
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
            Student Signup Email
            </h1>

            <div className="flex justify-between items-center w-full mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Manage Student Signup Email</h2>
                <Link href="#">
                    <button className="px-4 py-2 bg-black text-primary font-semibold rounded-lg hover:scale-105 duration-100 ease-in-out">
                        ADD NEW Student Signup Email
                    </button>
                </Link>
            </div>


            <Table className="min-w-full table-auto border-collapse drop-shadow-2xl">
                <TableCaption className="text-lg text-gray-500">A list of Student Signup Email.</TableCaption>
                <TableHeader className="bg-primary-foreground text-black font-mono text-xl rounded-lg">
                    <TableRow>
                        <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">CNIC</TableHead>
                        <TableHead className="p-4 font-bold text-left text-gray-700 dark:text-gray-200">Email</TableHead>
                        <TableHead className="p-4 font-bold text-right text-gray-700 dark:text-gray-200">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <TableRow key={user._id} className="hover:bg-primary-foreground dark:hover:bg-gray-700">
                                <TableCell className="p-4 text-gray-800 dark:text-gray-100">{user.cnic}</TableCell>
                                <TableCell className="p-4 text-gray-800 dark:text-gray-100">{user.email}</TableCell>
                                <TableCell className="p-4 text-right w-[200px]">
                                    <Link href={`/dashboard/studentsignupEmail/${user._id}`}>
                                        <button className="px-4 py-1 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200">
                                            Edit
                                        </button>
                                    </Link>
                                    <button
                                        className="px-4 py-1 ml-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 "
                                        onClick={() => handleDeleteClick(user._id, user.email)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500 dark:text-gray-300 p-4">
                                No Student Signup Email found.
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
                            Are you sure you want to delete the User{" "}
                            {confirmDelete?.email ? `"${confirmDelete.email}"` : ""}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="text-red-600 bg-red-100 rounded-lg hover:bg-red-200 " onClick={deleteUser}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};
