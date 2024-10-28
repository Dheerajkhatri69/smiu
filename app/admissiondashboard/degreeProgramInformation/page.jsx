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
    // Define the array of program options
    const undergraduateProgramOptions = [
        { value: "BBA_4_Years", label: "BBA 4 Years" },
        { value: "BBA_14_Years_Education", label: "BBA (After 14 years of Education)" },
        { value: "BS_Entrepreneurship", label: "BS (Entrepreneurship)" },
        { value: "BS_Public_Administration", label: "BS (Public Administration)" },
        { value: "BS_Economics", label: "BS (Economics)" },

        { value: "BS_Accounting_Finance", label: "BS Accounting & Finance" },
        { value: "BS_Banking_Finance", label: "BS Banking & Finance" },
        { value: "BS_Commerce", label: "BS Commerce" },

        { value: "BS_Computer_Science", label: "BS Computer Science" },
        { value: "BS_Information_Technology", label: "BS Information Technology" },
        { value: "BS_Cyber_Security", label: "BS Cyber Security" },

        { value: "BS_Software_Engineering", label: "BS Software Engineering" },
        { value: "BS_Data_Science", label: "BS Data Science" },

        { value: "BS_AI", label: "BS AI" },
        { value: "BS_Mathematics", label: "BS Mathematics" },

        { value: "BS_Media_Studies", label: "BS Media Studies" },

        { value: "BS_English", label: "BS English" },

        { value: "BS_Development_Studies", label: "BS Development Studies" },
        { value: "BS_Sociology", label: "BS Sociology" },

        { value: "BEd_4_Years", label: "B.Ed. (04-Years)" },
        { value: "BEd_2_Years", label: "B.Ed. (02-Years)" },
        { value: "BEd_1_5_Years", label: "B.Ed. (1.5-Years)" },

        { value: "BS_Environmental_Sciences", label: "BS Environmental Sciences" },
        { value: "BS_Food_Science_Tech", label: "BS Food Science and Tech" },
    ];
    const graduateProgramOptions = [
        { value: "MBA_1_5_Years", label: "MBA 1.5 Years" },
        { value: "MBA_2_Years", label: "MBA 2 Years" },
        { value: "MS_Management_Sciences", label: "MS (Management Sciences)" },
        { value: "MS_Public_Administration", label: "MS (Public Administration)" },
        { value: "MS_Computer_Science", label: "MS Computer Science" },
        { value: "MS_Mathematics", label: "MS Mathematics" },
        { value: "MS_Media_Studies_Research", label: "MS (Media Studies Research Track)" },
        { value: "MS_Linguistics", label: "MS (Linguistics)" },
        { value: "MS_Development_Studies", label: "MS Development Studies" },
        { value: "PGD_EPM", label: "PGD in EPM" },
        { value: "MS_Education", label: "MS (Education)" },
        { value: "MS_Environmental_Sciences", label: "MS Environmental Sciences" },
    ];
    const postgraduateProgramOptions = [

        { value: "PhD_Management_Sciences", label: "PhD (Management Sciences)" },
        { value: "PhD_Computer_Science", label: "PhD Computer Science" },
        { value: "PhD_AI", label: "PhD Artificial Intelligence (AI)" },
        { value: "PhD_Mathematics", label: "PhD Mathematics" },
        { value: "PhD_Media_Studies", label: "PhD Media Studies" },
        { value: "PhD_Education", label: "PhD Education" },
        { value: "PhD_Environmental_Sciences", label: "PhD Environmental Sciences" },
    ];

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
    const [selectedDegree, setSelectedDegree] = useState("");

    // Determine which program options to display based on the selected degree level
    const getProgramOptions = () => {
        if (selectedDegree === "undergraduate") return undergraduateProgramOptions;
        if (selectedDegree === "graduate") return graduateProgramOptions;
        if (selectedDegree === "postgraduate") return postgraduateProgramOptions;
        return [];
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
                        <h3 className="font-semibold text-2xl text-gray-800 text-center">Degree Program Information</h3>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">


                                <span className="flex flex-col space-y-8 w-full">

                                    <FormField
                                        control={form.control}
                                        name="degreeProgram"
                                        rules={validationRules.degreeProgram}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Degree Program</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                            setSelectedDegree(value); // Update local state
                                                        }}
                                                        value={field.value} // Ensure correct value from form state
                                                    >
                                                        <SelectTrigger className="w-full bg-white/50">
                                                            <SelectValue placeholder="--Select Degree Program--" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                                                            <SelectItem value="graduate">Graduate</SelectItem>
                                                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <span className="lg:flex  items-end justify-between block space-y-8">

                                        <FormField
                                            control={form.control}
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
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
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
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
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
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
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="choice01"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value} // Ensure correct value from form state
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </span>

                                </span>

                            </span>
                            <span className="flex flex-col gap-8">

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
