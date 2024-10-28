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

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageHead, setMessageHead] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({}); // Store all form data here
    const [selectedDate, setSelectedDate] = useState(null);


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

    // Handle form submission
    const onSubmit = (fullData) => {

        console.log("Form data:", fullData); // Log all form data, including image URL
        setMessageHead(
            <>
                <span className="bg-green-400 p-2">
                    Success!
                </span>
            </>
        )
        setMessage("Form submitted successfully!");
        setIsDialogOpen(true);
        reset(); // Clears all fields to default values
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
                                                        <Input placeholder="Guardian/Sponsor Name" {...field} />
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
                                                        <Input placeholder="Occupation" {...field} />
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
                                                            value={field.value} // Ensure correct value from form state
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
                                                        <Input placeholder="Relationship With Apllicant" {...field} />
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
                                                        <Input placeholder="Monthly Income" {...field} />
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
                                                        <Input placeholder="Mobile number" {...field} />
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
                                                        <Input placeholder="Organization" {...field} />
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
                                                        <Input placeholder="Designation" {...field} />
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
                                                    <Input placeholder="Address" {...field} />
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
                                                    <Input placeholder="Emergency Name" {...field} />
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
                                                    <Input placeholder="Relationship With Apllicant" {...field} />
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
                                                    <Input placeholder="Mobile Number" {...field} />
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
                                                <Input placeholder="Complete Address" {...field} />
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
