'use client'
import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
const Page = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate ID and password
        if (!id || !password) {
            setMessage("Please enter both ID and password.");
            setIsDialogOpen(true);
            return;
        }

        try {
            const res = await signIn('credentials', {
                id,
                password,
                redirect: false,
            });

            // Log the response for debugging
            console.log(res);

            if (res.error) {
                console.error("Sign-in error:", res.error);
                setMessage("Invalid credentials");
                setIsDialogOpen(true);
                return;
            }

            // Successful login, redirect to the dashboard
            router.replace("/dashboard");
        } catch (error) {
            console.error("Unexpected error:", error);
            setMessage("An unexpected error occurred. Please try again later.");
            setIsDialogOpen(true);
        }
    };


    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className='min-h-screen flex justify-center'>
                <div className="flex-col flex self-center lg:px-14 sm:max-w-4xl xl:max-w-md z-10">
                    <div className="self-start hidden lg:flex flex-col text-gray-300">
                        <h1 className="bg-white/30 backdrop-blur-lg border border-white/40 my-3 text-black py-4 px-2 text-center rounded-3xl shadow-lg font-semibold text-4xl">
                            Welcome into CMS
                        </h1>
                        <p className="pr-3 text-sm opacity-75 text-black text-center">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for
                            previewing layouts and visual mockups.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center self-center z-10 mx-14">
                    <div className="bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-white mx-auto rounded-3xl w-96">
                        <div className="mb-7">
                            <h3 className="font-semibold text-2xl text-gray-800 text-center">CMS</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input
                                    className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                    type="text"
                                    placeholder="ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    className="text-sm text-black px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-purple-400"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-sm ml-auto">
                                    <a href="#" className="text-gray-700 hover:text-gray-600">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center bg-primary hover:bg-primary/80 text-black p-3 rounded-lg tracking-wide font-semibold cursor-pointer transition ease-in duration-500"
                                >
                                    Sign In
                                </button>
                            </div>
                            <div className="flex items-center justify-center space-x-2 my-5">
                                <span className="h-px w-16 bg-black"></span>
                                <span className="text-black font-normal">or</span>
                                <span className="h-px w-16 bg-black"></span>
                            </div>
                            <div className="flex justify-center gap-5 w-full">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center mb-6 md:mb-0 hover:bg-neutral-600 hover:font-extrabold font-bold shadow-sm bg-black text-sm text-primary p-3 rounded-lg tracking-wide cursor-pointer transition ease-in duration-500"
                                >
                                    <span>Contact</span>
                                </button>
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center mb-6 md:mb-0 hover:bg-neutral-600 hover:font-extrabold font-bold shadow-sm bg-black text-sm text-primary p-3 rounded-lg tracking-wide cursor-pointer transition ease-in duration-500"
                                >
                                    <span>Other</span>
                                </button>
                            </div>
                        </form>
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
