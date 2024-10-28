"use client";
import React, { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import Image from 'next/image';
import { UploadButton } from '@/utils/uploadthing';
import bcrypt from 'bcryptjs';

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // To control the dialog
    const [message, setMessage] = useState(""); // To store the success or error message
    const [imageUrl, setImageUrl] = useState("");
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        image: '',
        cnic: '',
        id: '',
        gender: '',
        accounttype: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addUser = async (formData) => {
        try {
            const userExistResponse = await fetch("http://localhost:3000/api/userExiste", {
                method: "POST",
                body: JSON.stringify({ email: formData.email, cnic: formData.cnic, id: formData.id }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const userExistResult = await userExistResponse.json();

            if (userExistResult.exists) {
                if (userExistResult.exists.email) {
                    setMessage(
                        <>
                            <span className="font-extrabold">This email is already registered: </span>{formData.email}<br />
                        </>
                    )
                }
                if (userExistResult.exists.cnic) {
                    setMessage(
                        <>
                            <span className="font-extrabold">This CNIC is already registered: </span>{formData.cnic}<br />
                        </>
                    )
                }
                if (userExistResult.exists.id) {
                    setMessage(
                        <>
                            <span className="font-extrabold">This ID is already registered: </span>{formData.id}<br />
                        </>
                    )

                }
                // setMessage(errorMessage);
                setIsDialogOpen(true);
                return; // Stop further processing if any field exists
            }

            // If no user exists, proceed with adding the user
            const result = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resultJson = await result.json();

            if (resultJson.success) {
                setMessage(
                    <>
                        User added successfully! <br />
                        <span className="font-extrabold">First Name: </span>{formData.fname}<br />
                        <span className="font-extrabold">Last Name: </span>{formData.lname}<br />
                        <span className="font-extrabold">CNIC: </span>{formData.cnic}<br />
                        <span className="font-extrabold">ID: </span>{formData.id}<br />
                        <span className="font-extrabold">Gender: </span>{formData.gender}<br />
                        <span className="font-extrabold">Account Type: </span>{formData.accounttype}<br />
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
            fname: '',
            lname: '',
            cnic: '',
            image: '',
            id: '',
            gender: '',
            accounttype: '',
            email: '',
            password: '',
        });
        setImageUrl('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { fname, lname, cnic, image, id, gender, accounttype, email, password } = formData;

        // Check if CNIC is exactly 13 digits
        if (cnic.length !== 13) {
            setMessage("CNIC must be exactly 13 digits.");
            setIsDialogOpen(true);
            return;
        }

        if (!fname || !lname || !cnic || !image || !id || !gender || !accounttype || !email || !password) {
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

            addUser(formDataWithHashedPassword);


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
                                <h3 className="font-semibold text-2xl text-gray-800 text-center">User Details</h3>
                            </div>
                            <div className="space-y-6">
                                <div className='flex justify-between gap-2'>
                                    <input
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="text"
                                        name="fname"
                                        placeholder="First Name"
                                        value={formData.fname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="text"
                                        name="lname"
                                        placeholder="Last Name"
                                        value={formData.lname}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

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
                                    <UploadButton
                                        endpoint="imageUploader"
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        onClientUploadComplete={(res) => {
                                            if (res && res.length > 0) {
                                                const uploadedImageUrl = res[0].url;
                                                setImageUrl(uploadedImageUrl);
                                                setFormData((prevData) => ({
                                                    ...prevData,
                                                    image: uploadedImageUrl,
                                                }));
                                            }
                                        }}
                                        onUploadError={(error) => {
                                            alert(`ERROR! ${error.message}`);
                                        }}
                                    />
                                    {imageUrl && (
                                        <div className="relative w-full h-[200px]">
                                            <Image
                                                src={imageUrl}
                                                alt="Uploaded Image"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <input
                                        className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        type="text"
                                        name="id"
                                        placeholder="ID"
                                        value={formData.id}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="flex justify-between gap-2">
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(value) => handleSelectChange('gender', value)}
                                    >
                                        <SelectTrigger
                                            className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        >
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={formData.accounttype}
                                        onValueChange={(value) => handleSelectChange('accounttype', value)}
                                    >
                                        <SelectTrigger
                                            className="w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400"
                                        >
                                            <SelectValue placeholder="Select Account Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="teacher">Teacher</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                    Add User
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