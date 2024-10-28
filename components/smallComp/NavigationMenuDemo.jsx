"use client";
import React, { useState } from "react";
import Link from 'next/link';

export function NavigationMenuDemo({ menu, Title, He_Link }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li
            className="relative inline-block text-left"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <div>
                <Link
                    href={He_Link || "#"}
                    className="inline-flex w-full justify-center items-center rounded-md py-2 text-lg md:text-base lg:text-lg font-semibold text-gray-900 hover:text-gray-500"
                    id="menu-button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    {Title}
                    <svg
                        className={`-mr-1 h-6 w-6 ${isOpen ? "rotate-180" : ""} transition-all duration-300 ease-in-out text-gray-900 hover:text-gray-500`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </Link>
            </div>

            {isOpen && (
                <div
                    className="absolute right-0 z-10 mt-2 w-[200px] min-w-[100px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                >
                    <div className="py-1" role="none">
                        {menu.map((item, index) => (
                            <Link
                                key={index}
                                href={`/dep/${item._id}`}
                                className="block px-4 py-2 text-sm text-gray-500 hover:px-5 transition-all duration-300 ease-in-out hover:text-gray-900"
                                role="menuitem"
                                tabIndex="-1"
                                onClick={() => setIsOpen(false)}  // Close menu when clicked
                            >
                                {item.title || item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </li>
    );
}
