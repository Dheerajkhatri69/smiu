"use client"; // Ensures this is a client-side component in Next.js

import Link from "next/link";
import React, { useState } from "react";
import bcrypt from "bcryptjs"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog
    const [message, setMessage] = useState("");
    const [messageTitle, setMessageTitle] = useState("Message");
    const [formData, setFormData] = useState({
        cnic: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addstudentSignupEmail = async (formData) => {
        try {
            const studentSignupExistResponse = await fetch("http://localhost:3000/api/studentSignupEmail/studentSignupEmailExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const studentSignupExistResult = await studentSignupExistResponse.json();

            if (studentSignupExistResult.exists) {

                if (studentSignupExistResult.exists.cnic) {
                    setMessageTitle(
                        <>
                            <span className="bg-yellow-400 p-2">Alert</span><br />
                        </>
                    )
                    setMessage(
                        <>
                            <span className="font-extrabold">This CNIC is already registered: </span>{formData.cnic}<br />
                        </>
                    )
                }
                if (studentSignupExistResult.exists.email) {
                    setMessageTitle(
                        <>
                            <span className="bg-yellow-400 p-2">Alert</span><br />
                        </>
                    )
                    setMessage(
                        <>
                            <span className="font-extrabold">This email is already registered: </span>{formData.email}<br />
                        </>
                    )
                }
                // setMessage(errorMessage);
                setIsDialogOpen(true);
                return; // Stop further processing if any field exists
            }

            // If no user exists, proceed with adding the user
            const result = await fetch("http://localhost:3000/api/studentSignupEmail", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resultJson = await result.json();

            if (resultJson.success) {
                setMessageTitle(
                    <>
                        <div className="flex justify-center">
                            <span className="bg-green-400 p-2">Signup successfully! </span><br />
                        </div>
                    </>
                )

                setMessage(
                    <>
                        <br />
                        <span className="font-extrabold">CNIC: </span>{formData.cnic}<br />
                        <span className="font-extrabold">Email: </span>{formData.email}<br />
                        <span className="font-extrabold">Password: </span>{formData.password.slice(0, 10)}...<br />
                    </>
                );
            } else {
                setMessage("Error: Unable to add user. Please try again.");
            }
        } catch (error) {
            setMessage("Error: Unable to add user. Please check your connection.");
        }
        setIsDialogOpen(true);

        setFormData({
            cnic: '',
            email: '',
            password: '',
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if CNIC is exactly 13 digits
        if (formData.cnic.length !== 13) {
            setMessage("CNIC must be exactly 13 digits.");
            setIsDialogOpen(true);
            return;
        }

        // Check if all fields are filled
        const { cnic, email, password } = formData;
        if (!cnic || !email || !password) {
            setMessage("Please fill out all fields.");
            setIsDialogOpen(true);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

        const formDataWithHashedPassword = {
            ...formData,
            password: hashedPassword,
        };

        // addUser(formDataWithHashedPassword);
        // Log form data to console
        addstudentSignupEmail(formDataWithHashedPassword)
        // console.log("Form Data Submitted:", formData);
    };

    return (
        <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto h-full my-auto p-4">
            <div 
            className="flex w-full sm:w-[600px] items-center shadow-2xl rounded-xl overflow-hidden bg-primary-foreground"
            >
                
                <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-2xl font-bold">Create an account</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">CNIC</label>
                            <div className="relative flex items-center">
                                <input
                                    name="cnic"
                                    type="number"
                                    required
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter CNIC"
                                    value={formData.cnic}
                                    onChange={handleChange}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-4 h-4 absolute right-4"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="10" cy="7" r="6" />
                                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-4 h-4 absolute right-4"
                                    viewBox="0 0 682.667 682.667"
                                >
                                    <defs>
                                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                            <path d="M0 512h512V0H0Z" />
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                        <path
                                            fill="none"
                                            strokeMiterlimit="10"
                                            strokeWidth="40"
                                            d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                                        />
                                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" />
                                    </g>
                                </svg>
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#bbb"
                                    stroke="#bbb"
                                    className="w-4 h-4 absolute right-4 cursor-pointer"
                                    viewBox="0 0 128 128"
                                >
                                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                        >
                            Create an account
                        </button>
                    </div>
                </form>
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{messageTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {message}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>OK</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Page;
