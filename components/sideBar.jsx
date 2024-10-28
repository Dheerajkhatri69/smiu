"use client"; // Add this directive at the top

import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

export default function SidebarComponent() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true); // State to manage loading

    // Simulating loading state for demonstration purposes
    // You can replace this with actual data fetching logic
    setTimeout(() => {
        setLoading(false); // Simulate loading complete after 2 seconds
    }, 2000);

    return (
        <div>
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 z-20 flex w-80 transform transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:flex`} // Always show on large screens
            >
                {/* Curvy shape */}
                <svg
                    className="absolute inset-0 w-full h-full text-primary-foreground "
                    style={{ filter: 'drop-shadow(10px 0 10px #00000030)' }}
                    preserveAspectRatio="none"
                    viewBox="0 0 309 800"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z" />
                </svg>

                {/* Sidebar content */}
                <div className="z-10 flex flex-col flex-1 ">
                    <div className="flex items-center justify-between flex-shrink-0 w-64 p-4 ">
                        {/* Logo */}
                        <div className='flex justify-center items-center'>
                            {loading ? ( // Show Skeleton while loading
                                <Skeleton className="h-[140px] w-[160px] rounded-xl bg-primary" />
                            ) : (
                                <Image src="/Logo/SMIULogo1.png" alt="Logo" width={160} height={160} />
                            )}
                        </div>
                        {/* Close btn (visible on mobile only) */}
                        <button
                            onClick={() => setIsSidebarOpen(false)}
                            className="p-1 rounded-lg focus:outline-none focus:ring lg:hidden"
                        >
                            <svg
                                className="w-6 h-6"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="sr-only">Close sidebar</span>
                        </button>
                    </div>
                    <nav className="flex flex-col flex-1 w-64 p-4 mt-4">
                        {loading ? ( // Show Skeletons for nav items while loading
                            <div className="flex flex-col space-y-3">
                                <Skeleton className="h-[20px] w-[200px] rounded-xl bg-primary" />
                                <Skeleton className="h-[20px] w-[200px] rounded-xl bg-primary" />
                                <Skeleton className="h-[20px] w-[200px] rounded-xl bg-primary" />

                            </div>
                        ) : (
                            <a href="#" className="flex items-center space-x-2">
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                <span>Home</span>
                            </a>
                        )}
                    </nav>
                    <div className="flex-shrink-0 p-4">
                        <button className="flex items-center space-x-2">
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Menu button (hidden on large screens) */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="fixed p-2 z-10 text-white bg-black rounded-lg top-5 left-5 lg:hidden"
            >
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span className="sr-only">Open menu</span>
            </button>
        </div>
    );
}
