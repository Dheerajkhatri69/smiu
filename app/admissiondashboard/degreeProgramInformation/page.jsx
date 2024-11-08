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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageHead, setMessageHead] = useState("");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({}); // Store all form data here
    const [selectedDate, setSelectedDate] = useState(null);
    const [existData, setExistData] = useState({
        cnic: "",
        email: "",
        state: false,
        choice01: "",
        choice02: "",
        choice03: "",
        choice04: "",
        choice05: "",
        choice06: "",
        choice07: "",
        choice08: "",
        degreeProgram: "",
        finance_scheme: false,
        immediate_family_to_attend_university: "",
        transport_facility: false,
    });


    // Define the array of program options
    const undergraduateProgramOptions = [
        { value: "BBA 4 Years", label: "BBA 4 Years" },
        { value: "BBA (After 14 years of Education)", label: "BBA (After 14 years of Education)" },
        { value: "BS (Entrepreneurship)", label: "BS (Entrepreneurship)" },
        { value: "BS (Public Administration)", label: "BS (Public Administration)" },
        { value: "BS (Economics)", label: "BS (Economics)" },
        { value: "BS Accounting & Finance", label: "BS Accounting & Finance" },
        { value: "BS Banking & Finance", label: "BS Banking & Finance" },
        { value: "BS Commerce", label: "BS Commerce" },
        { value: "BS Computer Science", label: "BS Computer Science" },
        { value: "BS Information Technology", label: "BS Information Technology" },
        { value: "BS Cyber Security", label: "BS Cyber Security" },
        { value: "BS Software Engineering", label: "BS Software Engineering" },
        { value: "BS Data Science", label: "BS Data Science" },
        { value: "BS AI", label: "BS AI" },
        { value: "BS Mathematics", label: "BS Mathematics" },
        { value: "BS Media Studies", label: "BS Media Studies" },
        { value: "BS English", label: "BS English" },
        { value: "BS Development Studies", label: "BS Development Studies" },
        { value: "BS Sociology", label: "BS Sociology" },
        { value: "B.Ed. (04-Years)", label: "B.Ed. (04-Years)" },
        { value: "B.Ed. (02-Years)", label: "B.Ed. (02-Years)" },
        { value: "B.Ed. (1.5-Years)", label: "B.Ed. (1.5-Years)" },
        { value: "BS Environmental Sciences", label: "BS Environmental Sciences" },
        { value: "BS Food Science and Tech", label: "BS Food Science and Tech" },
    ];

    const graduateProgramOptions = [
        { value: "MBA 1.5 Years", label: "MBA 1.5 Years" },
        { value: "MBA 2 Years", label: "MBA 2 Years" },
        { value: "MS (Management Sciences)", label: "MS (Management Sciences)" },
        { value: "MS (Public Administration)", label: "MS (Public Administration)" },
        { value: "MS Computer Science", label: "MS Computer Science" },
        { value: "MS Mathematics", label: "MS Mathematics" },
        { value: "MS (Media Studies Research Track)", label: "MS (Media Studies Research Track)" },
        { value: "MS (Linguistics)", label: "MS (Linguistics)" },
        { value: "MS Development Studies", label: "MS Development Studies" },
        { value: "PGD in EPM", label: "PGD in EPM" },
        { value: "MS (Education)", label: "MS (Education)" },
        { value: "MS Environmental Sciences", label: "MS Environmental Sciences" },
    ];

    const postgraduateProgramOptions = [
        { value: "PhD (Management Sciences)", label: "PhD (Management Sciences)" },
        { value: "PhD Computer Science", label: "PhD Computer Science" },
        { value: "PhD Artificial Intelligence (AI)", label: "PhD Artificial Intelligence (AI)" },
        { value: "PhD Mathematics", label: "PhD Mathematics" },
        { value: "PhD Media Studies", label: "PhD Media Studies" },
        { value: "PhD Education", label: "PhD Education" },
        { value: "PhD Environmental Sciences", label: "PhD Environmental Sciences" },
    ];

    // Initialize the form with react-hook-form with validation
    const form = useForm({
        defaultValues: {
            choice01: "",
            choice02: "",
            choice03: "",
            choice04: "",
            choice05: "",
            choice06: "",
            choice07: "",
            choice08: "",
            finance_scheme: false,
            transport_facility: false,
            immediate_family_to_attend_university: "no"
        },
        mode: "onBlur", // Validate on blur
    });

    // Validation rules for all fields to be required
    const validationRules = {
        degreeProgram: { required: "Degree Program is required" },
        choice01: { required: "1st Choice is required" },
        choice02: { required: "2nd Choice is required" },
        choice03: { required: "3rd Choice is required" },
        choice04: { required: "4th Choice is required" },
        choice05: { required: "5th Choice is required" },
        choice06: { required: "6th Choice is required" },
        choice07: { required: "7th Choice is required" },
        choice08: { required: "8th Choice is required" },
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


    const { data: session } = useSession(); // Get session data
    const [user, setUser] = useState(null); // Initialize with null

    useEffect(() => {
        if (session?.user) {
            setUser(session.user); // Update user state when session is available
            getDegreeProgramInformation(session.user);
            console.log(existData)

        }
    }, [session]); // Use effect will run when session changes

    const getDegreeProgramInformation = async (formData) => {
        // const addstudentSignupEmail = async (formData) => {
        try {
            const degreeProgramInformationExistResponse = await fetch("/api/admission/degreeProgramInformation/degreeProgramInformationExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const degreeProgramInformationExistResult = await degreeProgramInformationExistResponse.json();

            if (degreeProgramInformationExistResult.exists) {
                setExistData({
                    ...degreeProgramInformationExistResult.data // Update the state with the fetched data
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
    const addDegreeProgramInformation = async (formdata) => {
        try {
            let result = await fetch("/api/admission/degreeProgramInformation", {
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
                            degreeProgramInformation: formdata.state
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


    // Handle form submission
    const onSubmit = (formData) => {

        const fullData = {
            ...formData,
            cnic: usercnic,
            email: useremail,
            state: true
        };

        addDegreeProgramInformation(fullData)
        // console.log("Form data:", fullData); // Log all form data, including image URL

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
                                        rules={validationRules.degreeProgram}
                                        name="degreeProgram"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Select Degree Program</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                            setSelectedDegree(value); // Update local state
                                                        }}
                                                        value={field.value || existData.degreeProgram} // Ensure correct value from form state
                                                        disabled={existData.state}
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
                                            rules={validationRules.choice01}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>1st Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)} // Handle value change
                                                            value={field.value} // Use value from form state, fallback to existData.choice01
                                                            disabled={existData.state} // Disable the select if the state is true
                                                        >
                                                            <SelectTrigger className="w-full 2xl:w-[500px] lg:w-[300px] bg-white/50">
                                                                <SelectValue placeholder="--Select Program--" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {/* Map through your program options to create SelectItems */}
                                                                {getProgramOptions().map((program) => (
                                                                    <SelectItem key={program.value} value={program.value}>
                                                                        {program.label} {/* Display program label */}
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
                                            name="choice02"
                                            rules={validationRules.choice02}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>2nd Choice</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value || existData.choice02} // Ensure correct value from form state
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
                                            rules={validationRules.choice03}
                                            name="choice03"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>3rd Choice</FormLabel>
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
                                            name="choice04"
                                            rules={validationRules.choice04}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>4th Choice</FormLabel>
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
                                            name="choice05"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>5th Choice</FormLabel>
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
                                            name="choice06"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>6th Choice</FormLabel>
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
                                            name="choice07"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>7th Choice</FormLabel>
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
                                            name="choice08"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>8th Choice</FormLabel>
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
                                    name="finance_scheme"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Check the box if you are interested in Finance Scheme</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="finance_scheme"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="bg-white"
                                                    />
                                                    <label
                                                        htmlFor="finance_scheme"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Slep Finance Scheme
                                                    </label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="transport_facility"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Check the box if you are interested in Transport Facility</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="transport_facility"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="bg-white"
                                                    />
                                                    <label
                                                        htmlFor="transport_facility"
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        Transport Facility
                                                    </label>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="immediate_family_to_attend_university"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Are you the first person in your immediate family to attend university?</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="yes"
                                                            id="immediate_family_yes"
                                                            className="bg-white text-black"
                                                        />
                                                        <Label htmlFor="immediate_family_yes">YES</Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem
                                                            value="no"
                                                            id="immediate_family_no"
                                                            className="bg-white text-black"
                                                        />
                                                        <Label htmlFor="immediate_family_no">NO</Label>
                                                    </div>
                                                </RadioGroup>
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
