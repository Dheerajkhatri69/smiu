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
import { useEffect, useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageHead, setMessageHead] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // To store the uploaded image URL
    const [formData, setFormData] = useState({}); // Store all form data here
    const [selectedDate, setSelectedDate] = useState(null);
    const [existData, setExistData] = useState({
        state: false,
        fname: "",
        mname: "",
        lname: "",
        image: "",
        fathersName: "",
        fathersOccupation: "",
        nationality: "",
        cnic: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        religion: "",
        maritalStatus: "",
        domicile: "",
        domicileDistrict: "",
        mobile: "",
        homephone: "",
        postalAddress: "",
        permanentAddress: ""
    });


    // Initialize the form with react-hook-form with validation

    const { data: session } = useSession(); // Get session data
    const [user, setUser] = useState(null); // Initialize with null

    useEffect(() => {
        if (session?.user) {
            setUser(session.user); // Update user state when session is available
            getPersonalData(session.user);
        }
    }, [session]); // Use effect will run when session changes



    const getPersonalData = async (formData) => {
        // const addstudentSignupEmail = async (formData) => {
        try {
            const personalDataExistResponse = await fetch("/api/admission/personaldataExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const personalDataExistResult = await personalDataExistResponse.json();

            if (personalDataExistResult.exists) {
                setExistData({
                    ...personalDataExistResult.data // Update the state with the fetched data
                });

                return; // Stop further processing if any field exists
            }


        } catch (error) {
            setMessage("Error: Please check your connection.");
        }
    };


    const useremail = user ? `${user.email || ""}` : "User";
    const usercnic = user ? `${user.cnic || ""}` : "User CNIC";
    const form = useForm({
        defaultValues: {
            state: true,
            fname: "",
            mname: "",
            lname: "",
            fathersName: "",
            fathersOccupation: "",
            nationality: "",
            cnic: "",
            email: "",
            dateOfBirth: "",
            gender: "",
            religion: "",
            maritalStatus: "",
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
        },
        email: {
            required: "Email is required",
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
        maritalStatus: { required: "Marital Status is required" },
        domicile: { required: "Domicile is required" },
        domicileDistrict: { required: "Domicile District is required" },
        homephone: { required: "Home Phone is required" },
        postalAddress: { required: "Postal Address is required" },
        permanentAddress: { required: "Permanent Address is required" },
    };

    const { reset, handleSubmit } = form;

    const addPersonalData = async (formdata) => {
        try {
            let result = await fetch("/api/admission/personaldata", {
                method: "POST",
                body: JSON.stringify(formdata),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();

            if (result.success) {

                try {
                    const response = await fetch("/api/admission/admissionstate", {
                        method: "POST",
                        body: JSON.stringify({
                            cnic: formdata.cnic,
                            personalData: formdata.state
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                
                    if (!response.ok) {
                        throw new Error(`Error: ${response.statusText}`);
                    }
                
                    const result = await response.json();
                    console.log("Response:", result);
                    // Handle the result here (e.g., update UI or display a message)
                } catch (error) {
                    console.error("Fetch error:", error);
                    // Handle the error (e.g., show an error message to the user)
                }
                
                setMessageHead(
                    <>
                        <span className="bg-green-400 p-2">
                            Success
                        </span>
                    </>
                )
                setMessage("Form submitted successfully!");
                reset(); // Clears all fields to default values
                setImageUrl(""); // Clear the image
            } else {
                setMessageHead(
                    <>
                        <span className="bg-red-400 p-2">
                            Error
                        </span>
                    </>
                )
                setMessage("Error: Unable to add personaldata. Please try again.");
            }
        } catch (error) {
            setMessageHead(
                <>
                    <span className="bg-red-400 p-2">
                        Error
                    </span>
                </>
            )
            setMessage("Error: Unable to add personaldata. Please check your connection.");
        }
        setIsDialogOpen(true);
    };
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
            cnic: usercnic,
            email: useremail
        };
        console.log(fullData)

        addPersonalData(fullData)
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
                                    {
                                        !existData.state ?
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
                                            :
                                            <Image
                                                src={existData.image}
                                                alt="Uploaded Image"
                                                layout="intrinsic"
                                                width={200} // Specify a width
                                                height={200} // Specify a height
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />


                                    }
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
                                            name="fname"
                                            rules={validationRules.firstName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>First Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="First Name" {...field}
                                                            value={existData.fname || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="mname"
                                            rules={validationRules.middleName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Middle Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Middle Name" {...field}
                                                            value={existData.mname || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="lname"
                                            rules={validationRules.lastName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Last Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Last Name" {...field}
                                                            value={existData.mname || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state} />
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
                                                        <Input placeholder="Father's Name" {...field}
                                                            value={existData.fathersName || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state}
                                                        />
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
                                                        <Input placeholder="Father's Occupation" {...field}
                                                            value={existData.fathersOccupation || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state}
                                                        />
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
                                                            value={field.value || existData.nationality}
                                                            disabled={existData.state}
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
                                            name="cnic"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>CNIC</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="XXXXX-XXXXXXX-X"
                                                            {...field}
                                                            value={usercnic}
                                                            disabled // This will disable the input field
                                                        />
                                                        {/* <Input placeholder="XXXXX-XXXXXXX-X"  {...field} /> */}
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="you@example.com"
                                                            {...field}
                                                            value={useremail}
                                                            disabled
                                                        />
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
                                                        <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
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
                                                        <Input
                                                            placeholder="Select date"
                                                            {...field}
                                                            value={existData.dateOfBirth || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state}
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
                                                        value={field.value || existData.gender}
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="Select Gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
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
                                                        value={field.value || existData.religion}
                                                        disabled={existData.state}
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
                                        name="maritalStatus"
                                        rules={validationRules.maritalStatus}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marital Status</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(value)}
                                                        value={field.value || existData.maritalStatus}
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="Select Marital Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Single">Single</SelectItem>
                                                            <SelectItem value="Married">Married</SelectItem>
                                                            <SelectItem value="Divorced">Divorced</SelectItem>
                                                            <SelectItem value="Widowed">Widowed</SelectItem>
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
                                                        value={field.value || existData.domicile} // Ensure correct value from form state
                                                        disabled={existData.state}
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
                                                    <Input placeholder="Domicile District" {...field}
                                                        value={existData.domicileDistrict || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state}
                                                    />
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
                                                    <Input placeholder="Mobile" {...field}
                                                        value={existData.mobile || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state} />
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
                                                    <Input placeholder="Home Phone" {...field}
                                                        value={existData.homephone || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state}
                                                    />
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
                                                <Input placeholder="Postal Address" {...field}
                                                    value={existData.postalAddress || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                    onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                    disabled={existData.state} />
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
                                                <Input placeholder="Permanent Address" {...field}
                                                    value={existData.permanentAddress || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                    onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                    disabled={existData.state} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </span>

                            <Button type="submit" disabled={existData.state} className="w-full lg:w-[200px] bg-black text-white font-extrabold hover:bg-gray-600">Save and Next</Button>
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
