"use client"; // Add this directive at the top

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { NavigationMenuDemo } from './smallComp/NavigationMenuDemo';

const Navbar = () => {
    const [open, setOpen] = useState(false);  // Control for mobile menu

    const [DepMenu, setDepMenu] = useState([]);

    // Fetch department data when the component mounts
    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch("/api/departments");
                if (!response.ok) {
                    throw new Error("Failed to fetch departments");
                }
                const data = await response.json();
                // console.log(data.result); // Assuming your API returns an array in `result`
                setDepMenu(data.result); // Assuming your API returns an array in `result`
            } catch (error) {
                alert(error.message);
            }
        };

        fetchDepartments();
    }, []);
    // const DepMenu = [
    //     {
    //         title: "Business Administration",
    //         link: "/dep/business_administration",
    //     },
    //     {
    //         title: "Accounting Banking & Finance",
    //         link: "/dep/accounting_banking_finance",
    //     },
    //     {
    //         title: "Computer Science",
    //         link: "/dep/computer_science",
    //     },
    //     {
    //         title: "Software Engineering",
    //         link: "/dep/software_engineering",
    //     },
    //     {
    //         title: "Artificial Intelligence & Mathematical Sciences",
    //         link: "/dep/artificial_intelligence_mathematical_sciences",
    //     },
    //     {
    //         title: "Media & Communication Studies",
    //         link: "/dep/media_communication_studies",
    //     },
    //     {
    //         title: "English",
    //         link: "/dep/english",
    //     },
    //     {
    //         title: "Social and Development Studies",
    //         link: "/dep/social_development_studies",
    //     },
    //     {
    //         title: "Education",
    //         link: "/dep/education",
    //     },
    //     {
    //         title: "Environmental Sciences",
    //         link: "/dep/environmental_sciences",
    //     },
    // ];



    const AboutMenu = [
        { title: "History of SMIU", link: "#" },
        { title: "About SMIU", link: "#" },
        { title: "Vice Chancellor's Message", link: "#" },
        { title: "The Founder", link: "#" },
        { title: "Future Project", link: "#" },
        { title: "Historical Land Marks", link: "#" },
        { title: "Statuary Bodies", link: "#" },
    ];

    const StudentMenu = [
        { title: "Final Term Examinations Spring 2024", link: "#" },
        { title: "CANVASSING RULES FOR ELECTIONS 2024-25", link: "#" },
        { title: "Student enrollment & Passout", link: "#" },
        { title: "SEEF Scholarship Program", link: "#" },
        { title: "Return Package", link: "#" },
        { title: "Academic Calendar", link: "#" },
        { title: "Students Societies", link: "#" },
        { title: "Scholarships", link: "#" },
        { title: "Ehsaas Scholarship", link: "#" },
        { title: "SAMS Portal", link: "#" },
        { title: "Examination System", link: "#" },
    ];

    return (
        <nav className="p-4 py-1 z-50 dark:bg-black dark:text-white bg-background/50 border-b backdrop-blur w-full fixed top-0">
            <div className="container mx-auto flex justify-between items-center">

                {/* Logo */}
                <div className='flex justify-center items-center'>
                    <Image src="/Logo/SMIULogo1.png" alt="Logo" width={80} height={80} />
                </div>
                <div className='flex items-center'>
                    {/* Search Bar */}
                    <div className='max-w-md mx-1 rounded-lg'>
                        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-transparent overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-black">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                className="max-w-[70px] placeholder-black placeholder:text-md bg-transparent transition-all duration-300 ease-in-out focus:max-w-[220px] hover:max-w-[220px] peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                placeholder="Search.."
                            />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex space-x-4 items-center">
                        <Link href="/" className="text-sm lg:text-base flex justify-center rounded-md py-2 font-semibold text-gray-900 hover:text-gray-500">
                            Home
                        </Link>
                        <NavigationMenuDemo He_Link={"/dep"} Title={"Department"} menu={DepMenu} />
                        <NavigationMenuDemo He_Link={"/"} Title={"About"} menu={AboutMenu} />
                        <NavigationMenuDemo He_Link={"/"} Title={"Student"} menu={StudentMenu} />
                        <div>
                            <Link href='/CMS' >
                                <Button className="m-1 bg-black border-none hover:bg-primary-foreground font-semibold text-white" variant="outline">CMS</Button>
                            </Link>

                            <Link href='/admissionPortal' >
                                <Button className="m-1 bg-black border-none hover:bg-primary-foreground font-semibold text-white" variant="outline">Admission Portal</Button>
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="text-black w-10 h-10 relative focus:outline-none lg:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span
                                aria-hidden="true"
                                className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${open ? 'rotate-45' : '-translate-y-1.5'
                                    }`}
                            ></span>
                            <span
                                aria-hidden="true"
                                className={`block z-50 absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${open ? 'opacity-0' : ''
                                    }`}
                            ></span>
                            <span
                                aria-hidden="true"
                                className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${open ? '-rotate-45' : 'translate-y-1.5'
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 w-64 h-screen rounded-s-xl shadow-2xl bg-primary-foreground transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
                        } lg:hidden z-40`}

                >
                    <div className="flex flex-col items-center py-4 space-y-2">
                        {/* Close Menu Button */}
                        <button
                            className="text-black w-10 h-10 fixed right-4 focus:outline-none lg:hidden"
                            onClick={() => setOpen(!open)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span
                                    aria-hidden="true"
                                    className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${open ? 'rotate-45' : '-translate-y-1.5'
                                        }`}
                                ></span>
                                <span
                                    aria-hidden="true"
                                    className={`block z-50 absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${open ? 'opacity-0' : ''
                                        }`}
                                ></span>
                                <span
                                    aria-hidden="true"
                                    className={`block absolute h-0.5 w-8 bg-current transform transition duration-500 ease-in-out ${open ? '-rotate-45' : 'translate-y-1.5'
                                        }`}
                                ></span>
                            </div>

                        </button>

                        <div className='flex flex-col items-center py-4 space-y-2 pt-10'>

                            <div className="flex items-center w-full justify-between flex-shrink-0 p-4 ">
                                {/* Logo */}
                                <Link href="/">
                                    <div className='flex justify-center items-center'>
                                        <Image src="/Logo/SMIULogo1.png" alt="Logo" width={160} height={160} />
                                    </div>
                                </Link>
                            </div>
                            <Link href="/" className="text-lg font-semibold">Home</Link>
                            <NavigationMenuDemo Title={"Department"} menu={DepMenu} />
                            <NavigationMenuDemo Title={"About"} menu={AboutMenu} />
                            <NavigationMenuDemo Title={"Student"} menu={StudentMenu} />
                            <div className="flex flex-col items-center space-y-2">
                                <Link href='/CMS' >
                                    <Button className="m-1 bg-black border-none hover:bg-primary-foreground font-semibold text-white" variant="outline">CMS</Button>
                                </Link>

                                <Link href='/admissionPortal' >
                                    <Button className="m-1 bg-black border-none hover:bg-primary-foreground font-semibold text-white" variant="outline">Admission Portal</Button>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
