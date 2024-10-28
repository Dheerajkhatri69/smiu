"use client"; // Ensures this is a client-side component in Next.js

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react"; // Import the signIn function
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const Page = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email and password
        if (!email || !password) {
            setMessage("Please enter both email and password.");
            setIsDialogOpen(true);
            return;
        }

        try {
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            // Log the response for debugging
            console.log(res);

            // Check if there was an error
            if (!res.ok || res.error) {
                console.error("Sign-in error:", res.error);
                setMessage("Invalid credentials. Please check your email and password.");
                setIsDialogOpen(true);
                return;
            }

            // Successful login, redirect to admission dashboard
            router.replace("/admissiondashboard");
        } catch (error) {
            // Handle unexpected errors
            console.error("Unexpected error:", error);
            setMessage("An unexpected error occurred. Please try again later.");
            setIsDialogOpen(true);
        }
    };

    return (
        <div className="font-[sans-serif] max-w-4xl flex items-center mx-auto mt-20 md:h-screen p-4">
            <div className="grid md:grid-cols-3 items-center shadow-2xl rounded-xl overflow-hidden bg-primary-foreground">
                <form className="md:col-span-2 w-full py-6 px-6 sm:px-16" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h3 className="text-gray-800 text-2xl font-bold">Login to your account</h3>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Email</label>
                            <div className="relative flex items-center">
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter email"
                                />
                                {/* SVG icon */}
                            </div>
                        </div>

                        <div>
                            <label className="text-gray-800 text-sm mb-2 block">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500"
                                    placeholder="Enter password"
                                />
                                {/* SVG icon */}
                            </div>
                        </div>
                    </div>

                    <div className="!mt-12">
                        <button
                            type="submit"
                            className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-gray-800 text-sm mt-6 text-center">
                        Don't have an account?{" "}
                        <Link href="/admissionPortal/signup" className="text-blue-600 font-semibold hover:underline ml-1">
                            Sign up here
                        </Link>
                    </p>
                </form>

                <div className="max-md:order-1 text-primary flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-gray-900 to-gray-700 lg:px-8 px-4 py-4">
                    <div>
                        <h4 className="text-white text-lg font-semibold">INSTRUCTIONS!</h4>
                        <p className="text-[13px] text-gray-300 mt-3 leading-relaxed">
                            Keep all the required documents with you before you start to fill Admission form. Fill your Admission form
                            carefully. Forms with incomplete or false information will be rejected. No Verbal communication reference
                            will be accepted at any stage of admission process.
                        </p>
                    </div>
                </div>
            </div>

            {/* Alert Dialog */}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Form Submission</AlertDialogTitle>
                        <AlertDialogDescription>{message}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Page;
