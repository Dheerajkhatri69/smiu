"use client";
import React, { useState, useEffect } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import bcrypt from 'bcryptjs';

const Page = ({params}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog
    const [message, setMessage] = useState(""); // To store the success or error message
    const [formData, setFormData] = useState({
        cnic: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        getUserDetail();
    }, []);

    const getUserDetail = async () => {
        try {
            const res = await fetch(`/api/studentSignupEmail/${params.editstudentsignupEmail}`);
            const userData = await res.json();

            if (userData.success) {
                setFormData({
                    cnic: userData.result.cnic,
                    email: userData.result.email,
                    password: '' // Keep the password empty
                });
            } else {
                setMessage("Failed to fetch user details.");
                setIsDialogOpen(true);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
            setMessage("An error occurred while fetching user details.");
            setIsDialogOpen(true);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const updateUser = async (userData) => {
        try {
            const res = await fetch(`/api/studentSignupEmail/${params.editstudentsignupEmail}`, {
                method: "PUT",
                body: JSON.stringify(userData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();

            if (result.success) {
                setMessage(
                    <>
                        User successfully updated!<br />
                        <span className="font-extrabold">CNIC: </span>{formData.cnic}<br />
                        <span className="font-extrabold">Email: </span>{formData.email}<br />
                    </>
                );
            } else {
                setMessage("Error: Unable to update user. Please try again.");
            }
        } catch (error) {
            setMessage("Error: Unable to update user. Please check your connection.");
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { cnic, email, password } = formData;

        // Check if CNIC is exactly 13 digits
        if (cnic.length !== 13) {
            setMessage("CNIC must be exactly 13 digits.");
            setIsDialogOpen(true);
            return;
        }

        if (!cnic || !email || !password) {
            setMessage('Please fill out all fields.');
            setIsDialogOpen(true);
            return;
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Hash password

            const formDataWithHashedPassword = {
                ...formData,
                password: hashedPassword,
            };

            updateUser(formDataWithHashedPassword);
        } catch (error) {
            console.error("Error hashing password:", error);
            setMessage('An error occurred while processing the form.');
            setIsDialogOpen(true);
        }
    };

    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className='min-h-screen flex justify-center'>
                <div className="flex justify-center self-center z-10 mx-14">
                    <div className="bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-white mx-auto rounded-3xl container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-7">
                                <h3 className="font-semibold text-2xl text-gray-800 text-center">Student Signup Email Details</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <input
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="number"
                                        name="cnic"
                                        placeholder="CNIC"
                                        value={formData.cnic}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <input
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mt-7">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-white text-sm font-semibold rounded-lg transition duration-200"
                                >
                                    Update Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Message</AlertDialogTitle>
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
