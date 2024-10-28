"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DepContent } from "@/components/depComp/depContent";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

export default function Page({ params }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility
    const [departments, setDepartments] = useState([]); // State to store departments
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
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                alert(error.message);
                setLoading(false); // Stop loading in case of error
            }
        };

        fetchDepartments();
    }, []);

    return (
        <div className="container mt-20 mx-auto py-0 px-8">
            <header className="py-4 flex justify-end items-center">
                <button
                    className="text-black w-10 h-10 relative focus:outline-none lg:hidden"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span
                            aria-hidden="true"
                            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isSidebarOpen ? 'rotate-45' : '-translate-y-1.5'
                                }`}
                        ></span>
                        <span
                            aria-hidden="true"
                            className={`block z-50 absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isSidebarOpen ? 'opacity-0' : ''
                                }`}
                        ></span>
                        <span
                            aria-hidden="true"
                            className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${isSidebarOpen ? '-rotate-45' : 'translate-y-1.5'
                                }`}
                        ></span>
                    </div>
                </button>
            </header>
            <div className="flex antialiased rounded-xl text-gray-900 bg-primary-foreground dark:bg-dark">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-10 flex shadow-2xl bg-primary-foreground flex-col w-60 transform transition-transform duration-300 rounded-xl lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0 z-50" : "-translate-x-full lg:translate-x-0"}`}
                >

                    <div className="z-10 flex flex-col flex-1">
                        <div className="flex items-center justify-between flex-shrink-0 w-full p-4 ">
                            {/* Logo */}
                            <Link href="/">
                                <div className='flex justify-center items-center'>
                                    <Image src="/Logo/SMIULogo1.png" alt="Logo" width={160} height={160} />
                                </div>
                            </Link>
                        </div>

                        {/* Sidebar content */}
                        <nav className="flex flex-col flex-1 w-full p-4 mt-4">
                            {
                                loading ? (
                                    <div className="py-2">
                                        <Skeleton className="w-[90%] bg-primary h-[20px] mb-2 rounded-full" />
                                        <Skeleton className="w-full bg-primary h-[20px] mb-4 rounded-lg" />
                                        <Skeleton className="w-[90%] bg-primary h-[20px] mb-2 rounded-full" />
                                        <Skeleton className="w-[90%] bg-primary h-[20px] mb-2 rounded-full" />
                                    </div>
                                ) : (
                                    departments.map((list, idx) => (
                                        <Link
                                            href={`/dep/${list._id}`}
                                            key={idx}
                                            className={`${params.deps === list._id
                                                ? "px-1 text-black"
                                                : "text-gray-700"
                                                } flex items-center font-extrabold hover:ml-2 py-2 duration-100 ease-in-out overflow-hidden`}
                                        >
                                            <span className="mr-2 text-xl no-underline">{'>'}</span> {/* Add icon here */}
                                            {list.name}
                                        </Link>
                                    ))
                                )
                            }
                        </nav>

                    </div>
                </div>

                {/* Main content area */}
                <div className="flex-grow p-0">
                    {
                        loading ? (
                            <div className="p-4">
                                <Skeleton className="w-[300px] bg-primary h-[50px] mb-4 rounded-lg" />
                                <Skeleton className="w-full bg-primary h-[200px] mb-4 rounded-lg" />
                                <Skeleton className="w-[80%] bg-primary h-[20px] mb-2 rounded-full" />
                                <Skeleton className="w-[80%] bg-primary h-[20px] mb-2 rounded-full" />
                            </div>
                        ) : (
                            departments.map((list, idx) => (
                                params.deps === list._id ? (
                                    <DepContent
                                        key={idx}
                                        prmlink={list.link}
                                        prmTitle={list.name}
                                        prmImage={list.image}
                                        prmDes={list.description}
                                    />
                                ) : null  // Render nothing if condition is not met
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}
