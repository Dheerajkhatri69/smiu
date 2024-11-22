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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageHead, setMessageHead] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({}); // Store all form data here
    const [selectedDate, setSelectedDate] = useState(null);
    const [existData, setExistData] = useState({
        address: "",
        cnic: "",
        designation: "",
        eCompleteAddress: "",
        eMobile: "",
        eRelationshipWithApllicant: "",
        email: "",
        emergencyName: "",
        guardianName: "",
        jobNature: "",
        mobile: "",
        monthlyIncome: "",
        occupation: "",
        organization: "",
        relationshipWithApllicant: "",
        state: false
    });


    // Initialize the form with react-hook-form with validation
    const form = useForm({
        defaultValues: {
            guardianName: "",
            occupation: "",
            jobNature: "",
            relationshipWithApllicant: "",
            monthlyIncome: "",
            mobile: "",
            organization: "",
            designation: "",
            address: "",
            emergencyName: "",
            eRelationshipWithApllicant: "",
            eMobile: "",
            eCompleteAddress: "",
        },
        mode: "onBlur", // Validate on blur
    });

    // Validation rules for all fields to be required
    const validationRules = {
        guardianName: { required: "Guardian Name is required" },
        occupation: { required: "Occupation is required" },
        jobNature: { required: "Job Nature is required" },
        relationshipWithApllicant: { required: "Relationship With Apllicant is required" },
        monthlyIncome: { required: "Monthly Income is required" },
        mobile: {
            required: "Mobile number is required",
            pattern: {
                value: /^(?:\+92|0)?[3][0-9]{2}-?[0-9]{7}$/, // Pakistani mobile number regex
                message: "Invalid Pakistani mobile number",
            },
        },
        organization: { required: "Organization is required" },
        designation: { required: "Designation is required" },
        address: { required: "Address is required" },
        emergencyName: { required: "Emergency Name is required" },
        eRelationshipWithApllicant: { required: "Relationship With Apllicant is required" },
        eMobile: {
            required: "Mobile number is required",
            pattern: {
                value: /^(?:\+92|0)?[3][0-9]{2}-?[0-9]{7}$/, // Pakistani mobile number regex
                message: "Invalid Pakistani mobile number",
            },
        },
        eCompleteAddress: { required: "Complete Address is required" },
    };

    const { reset, handleSubmit } = form;


    const { data: session } = useSession(); // Get session data
    const [user, setUser] = useState(null); // Initialize with null
    const router = useRouter();
    useEffect(() => {
        if (session?.user) {
            setUser(session.user); // Update user state when session is available
            getAdmissionState(session.user)
            getGuardiansData(session.user);
        }
    }, [session]); // Use effect will run when session changes

    const getAdmissionState = async (formdata) => {
        try {
            const response = await fetch(`/api/admission/admissionstate/${formdata.cnic}`);
            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }
            const data = await response.json();
            if (!data?.result?.personalData) {
                setMessageHead(
                    <span className="bg-yellow-400 p-2">
                        Alert!
                    </span>
                );
                setMessage("Please fill out the form in sequence before proceeding.");
                setIsDialogOpen(true);
                router.push("/admissiondashboard");
            }

        } catch (error) {
            alert(error.message);
        }
    }

    const getGuardiansData = async (formData) => {
        // const addstudentSignupEmail = async (formData) => {
        try {
            const guardiansDataExistResponse = await fetch("/api/admission/guardiansData/guardiansDataExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const guardiansDataExistResult = await guardiansDataExistResponse.json();

            if (guardiansDataExistResult.exists) {
                setExistData({
                    ...guardiansDataExistResult.data // Update the state with the fetched data
                });

                return; // Stop further processing if any field exists
            }


        } catch (error) {
            setMessage("Error: Please check your connection.");
        }
    };


    const useremail = user ? `${user.email || ""}` : "User email";
    const usercnic = user ? `${user.cnic || ""}` : "User CNIC";
    // Handle form submission

    const addGuardiansData = async (formdata) => {
        try {
            let result = await fetch("/api/admission/guardiansData", {
                method: "POST",
                body: JSON.stringify(formdata),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();

            if (result.success) {

                try {
                    let response = await fetch(`/api/admission/admissionstate/${formdata.cnic}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            cnic: formdata.cnic,
                            guardiansData: formdata.state
                        }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    response = await response.json();
                } catch (error) {
                    console.error("Fetch error:", error);
                    // Handle the error (e.g., show an error message to the user)
                }

                setMessageHead(
                    <span className="bg-green-400 p-2">
                        Success!
                    </span>
                );
                setMessage("Form submitted successfully!");
                setIsDialogOpen(true);

                router.push("/admissiondashboard/degreeProgramInformation");
                reset(); // Clears all fields to default values
                // Redirect to /admissiondashboard
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


    const onSubmit = (formData) => {
        const fullData = {
            ...formData,
            cnic: usercnic,
            email: useremail,
            state: true
        };
        addGuardiansData(fullData)
        // console.log("Form data:", fullData); // Log all form data, including image URL
    };

    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    <div className="mb-7">
                        <h3 className="font-semibold text-2xl text-gray-800 text-center">Guardian/Sponsor Information</h3>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">

                                <span className="flex flex-col space-y-8 w-full">

                                    <span className="lg:flex justify-between block items-end space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="guardianName"
                                            rules={validationRules.guardianName}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Guardian/Sponsor Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Guardian/Sponsor Name" {...field}
                                                            value={existData.guardianName || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                            name="occupation"
                                            rules={validationRules.occupation}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Occupation</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Occupation" {...field}
                                                            value={existData.occupation || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                            name="jobNature"
                                            rules={validationRules.jobNature}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Job Nature</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Update form state
                                                            }}
                                                            value={field.value || existData.jobNature} // Ensure correct value from form state
                                                            disabled={existData.state}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50">
                                                                <SelectValue placeholder="Select Job Nature" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="government_job">Government Job</SelectItem>
                                                                <SelectItem value="private_job">Private Job</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                    </span>

                                    <span className="lg:flex justify-between block items-end space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="relationshipWithApllicant"
                                            rules={validationRules.relationshipWithApllicant}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Relationship With Apllicant</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Relationship With Apllicant" {...field}
                                                            value={existData.relationshipWithApllicant || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                            name="monthlyIncome"
                                            rules={validationRules.monthlyIncome}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Monthly Income</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Monthly Income" {...field}
                                                            value={existData.monthlyIncome || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                                        <Input placeholder="Mobile number" {...field}
                                                            value={existData.mobile || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                    </span>
                                    <span className="lg:flex  items-end justify-between block space-y-8">

                                        <FormField
                                            control={form.control}
                                            rules={validationRules.organization}
                                            name="organization"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Organization</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Organization" {...field}
                                                            value={existData.organization || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                            name="designation"
                                            rules={validationRules.designation}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Designation</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Designation" {...field}
                                                            value={existData.designation || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                        name="address"
                                        rules={validationRules.address}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Address" {...field}
                                                        value={existData.address || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>

                            </span>
                            <div className="mb-7">
                                <h3 className="font-semibold text-2xl text-gray-800 text-center">Emergency Contect information</h3>
                            </div>
                            <span className="flex flex-col gap-8">

                                <span className="lg:flex justify-between block items-end space-y-8">
                                    <FormField
                                        control={form.control}
                                        name="emergencyName"
                                        rules={validationRules.emergencyName}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Emergency Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Emergency Name" {...field}
                                                        value={existData.emergencyName || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                        name="eRelationshipWithApllicant"
                                        rules={validationRules.eRelationshipWithApllicant}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Relationship With Apllicant</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Relationship With Apllicant" {...field}
                                                        value={existData.eRelationshipWithApllicant || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                        name="eMobile"
                                        rules={validationRules.eMobile}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Mobile</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Mobile Number" {...field}
                                                        value={existData.eMobile || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                    name="eCompleteAddress"
                                    rules={validationRules.eCompleteAddress}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Complete Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Complete Address" {...field}
                                                    value={existData.eCompleteAddress || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                    onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                    disabled={existData.state}
                                                />
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
