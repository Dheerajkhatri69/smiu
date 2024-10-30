"use client";

import { useForm } from "react-hook-form";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageHead, setMessageHead] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // To store the uploaded image URL
    const [formData, setFormData] = useState({}); // Store all form data here
    const [selectedDate, setSelectedDate] = useState(null);


    // Initialize the form with react-hook-form with validation
    const form = useForm({
        defaultValues: {
            firstName: "",
            middleName: "",
            lastName: "",
            fathersName: "",
            fathersOccupation: "",
            nationality: "",
            cnic: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            religion: "",
            maritalstatus: "",
            domicile: "",
            domicileDistrict: "",
            mobile: "",
            homephone: "",
            postalAddress: "",
            permanentAddress: "",
        },
        mode: "onBlur", // Validate on blur
    });

    // Validation rules for all fields to be required
    const validationRules = {
        firstName: { required: "First Name is required" },
        middleName: { required: "Middle Name is required" },
        lastName: { required: "Last Name is required" },
        cnic: {
            required: "CNIC is required",
            pattern: {
                value: /^\d{13}$/,
                message: "CNIC must be 13 digits",
            },
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
            },
        },
        mobile: {
            required: "Mobile number is required",
            pattern: {
                value: /^(?:\+92|0)?[3][0-9]{2}-?[0-9]{7}$/, // Pakistani mobile number regex
                message: "Invalid Pakistani mobile number",
            },
        },
        fathersName: { required: "Father Name is required" },
        fathersOccupation: { required: "Father Occupation is required" },
        nationality: { required: "Nationality is required" },
        dateOfBirth: { required: "Date of Birth is required" },
        gender: { required: "Gender is required" },
        religion: { required: "Religion is required" },
        maritalstatus: { required: "Marital Status is required" },
        domicile: { required: "Domicile is required" },
        domicileDistrict: { required: "Domicile District is required" },
        homephone: { required: "Home Phone is required" },
        postalAddress: { required: "Postal Address is required" },
        permanentAddress: { required: "Permanent Address is required" },
    };

    const { reset, handleSubmit } = form;

    // Handle form submission
    const onSubmit = (data) => {
        if (imageUrl === "") {
            setMessageHead(
                <>
                    <span className="bg-yellow-200 p-2">
                        Alart
                    </span>
                </>
            )
            setMessage("Profile Pic is required");
            setIsDialogOpen(true);
            return
        }
        const fullData = {
            ...data,
            image: imageUrl, // Include the uploaded image URL
        };
        console.log("Form data:", fullData); // Log all form data, including image URL
        setMessageHead(
            <>
                <span className="bg-green-400 p-2">
                    Success
                </span>
            </>
        )
        setMessage("Form submitted successfully!");
        setIsDialogOpen(true);
        reset(); // Clears all fields to default values
        setImageUrl(""); // Clear the image URLs
    };
    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    <div className="mb-7">
                        <h3 className="font-semibold text-2xl text-gray-800 text-center">Personal Data</h3>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                                <span className="flex flex-col space-y-8">

                                    <UploadButton
                                        endpoint="imageUploader"
                                        className="w-[200px] text-sm px-4 py-3 font-bold bg-primary border border-black rounded-lg focus:outline-none focus:border-purple-400"
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
                                </span>

                                <span className="flex flex-col space-y-8 w-full">

                                    <span className="lg:flex justify-between block items-end space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            rules={validationRules.firstName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="First Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="middleName"
                                            rules={validationRules.middleName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Middle Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Middle Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            rules={validationRules.lastName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Last Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </span>

                                    <span className="lg:flex justify-between block items-end space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="fathersName"
                                            rules={validationRules.fathersName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Father Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Father's Name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="fathersOccupation"
                                            rules={validationRules.fathersOccupation}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Father Occupation</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Father's Occupation" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="nationality"
                                            rules={validationRules.nationality}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nationality</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50" >
                                                                <SelectValue placeholder="Select Nationality" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="pakistan">Pakistan</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </span>
                                    <span className="lg:flex  items-end justify-between block space-y-8">

                                        <FormField
                                            control={form.control}
                                            rules={validationRules.cnic}
                                            name="cnic"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CNIC</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="XXXXX-XXXXXXX-X" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            rules={validationRules.email}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="you@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </span>
                                </span>

                            </span>

                            <span className="flex flex-col gap-8">

                                <span className="lg:flex justify-between items-end block space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="dateOfBirth"
                                        rules={validationRules.dateOfBirth}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Date of Birth</FormLabel>
                                                <FormControl>
                                                    <div className="relative max-w-sm">
                                                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                            <svg
                                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                                aria-hidden="true"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                                            </svg>
                                                        </div>
                                                        <input
                                                            id="datepicker-format"
                                                            type="text"
                                                            className="bg-gray-50 border w-[200px] bg-white/50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="Select date"
                                                            value={field.value || selectedDate || ""}
                                                            onChange={(e) => {
                                                                const date = e.target.value;
                                                                field.onChange(date);
                                                                setSelectedDate(date); // Update local state if needed
                                                            }}
                                                        // Here you would handle the date picker logic, maybe using a library
                                                        />
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        rules={validationRules.gender}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Gender</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(value)}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="Select Gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="religion"
                                        rules={validationRules.religion}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Religion</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(value)}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="Select Religion" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="islam">Islam</SelectItem>
                                                            <SelectItem value="christianity">Christianity</SelectItem>
                                                            <SelectItem value="hinduism">Hinduism</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="maritalstatus"
                                        rules={validationRules.maritalstatus}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marital Status</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(value)}
                                                        value={field.value}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="Select Marital Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="single">Single</SelectItem>
                                                            <SelectItem value="married">Married</SelectItem>
                                                            <SelectItem value="divorced">Divorced</SelectItem>
                                                            <SelectItem value="widowed">Widowed</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </span>
                                <span className="lg:flex justify-between items-end block space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="domicile"
                                        rules={validationRules.domicile}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Domicile</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                        }}
                                                        value={field.value} // Ensure correct value from form state
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="Select Domicile" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="sindh_rural">Sindh Rural</SelectItem>
                                                            <SelectItem value="sindh_urban">Sindh Urban</SelectItem>
                                                            <SelectItem value="punjab">Punjab</SelectItem>
                                                            <SelectItem value="balochistan">Balochistan</SelectItem>
                                                            <SelectItem value="kpk">KPK</SelectItem>
                                                            <SelectItem value="gilgit_baltistan">Gilgit-Baltistan</SelectItem>
                                                            <SelectItem value="ajk">AJK</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="domicileDistrict"
                                        rules={validationRules.domicileDistrict}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Domicile District</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Domicile District" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        rules={validationRules.mobile}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Mobile" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="homephone"
                                        rules={validationRules.homephone}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Home Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Home Phone" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>
                                <FormField
                                    control={form.control}
                                    name="postalAddress"
                                    rules={validationRules.postalAddress}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Postal Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Postal Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="permanentAddress"
                                    rules={validationRules.permanentAddress}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Permanent Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Permanent Address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </span>

                            <Button type="submit" className="w-full lg:w-[200px] bg-black text-white font-extrabold hover:bg-gray-600">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{messageHead}</AlertDialogTitle>
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
