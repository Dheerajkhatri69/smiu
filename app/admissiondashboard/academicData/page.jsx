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
        cnic: "",
        email: "",
        state: false,

        hsc_alevel_board: "",
        hsc_alevel_degree: "",
        hsc_alevel_examType: "",
        hsc_alevel_grade: "",
        hsc_alevel_group: "",
        hsc_alevel_institution: "",
        hsc_alevel_optainedMarks: "",
        hsc_alevel_passingYear: "",
        hsc_alevel_percentage: "",
        hsc_alevel_seatNo: "",
        hsc_alevel_startYear: "",
        hsc_alevel_totalMarks: "",

        // SSC/O-level fields
        ssc_olevel_board: "",
        ssc_olevel_degree: "",
        ssc_olevel_examType: "",
        ssc_olevel_grade: "",
        ssc_olevel_group: "",
        ssc_olevel_institution: "",
        ssc_olevel_optainedMarks: "",
        ssc_olevel_passingYear: "",
        ssc_olevel_percentage: "",
        ssc_olevel_seatNo: "",
        ssc_olevel_startYear: "",
        ssc_olevel_totalMarks: ""
    });

    // Initialize the form with react-hook-form with validation
    const form = useForm({
        defaultValues: {
            hsc_alevel_board: "",
            hsc_alevel_degree: "",
            hsc_alevel_examType: "",
            hsc_alevel_grade: "",
            hsc_alevel_group: "",
            hsc_alevel_institution: "",
            hsc_alevel_optainedMarks: "",
            hsc_alevel_passingYear: "",
            hsc_alevel_percentage: "",
            hsc_alevel_seatNo: "",
            hsc_alevel_startYear: "",
            hsc_alevel_totalMarks: "",

            // SSC/O-level fields
            ssc_olevel_board: "",
            ssc_olevel_degree: "",
            ssc_olevel_examType: "",
            ssc_olevel_grade: "",
            ssc_olevel_group: "",
            ssc_olevel_institution: "",
            ssc_olevel_optainedMarks: "",
            ssc_olevel_passingYear: "",
            ssc_olevel_percentage: "",
            ssc_olevel_seatNo: "",
            ssc_olevel_startYear: "",
            ssc_olevel_totalMarks: ""
        },
        mode: "onBlur", // Validate on blur
    });

    // Validation rules for all fields to be required
    const validationRules = {
        // HSC/A-level fields
        hsc_alevel_board: { required: "Board is required" },
        hsc_alevel_degree: { required: "Degree is required" },
        hsc_alevel_examType: { required: "Exam Type is required" },
        hsc_alevel_grade: { required: "Grade is required" },
        hsc_alevel_group: { required: "Group is required" },
        hsc_alevel_institution: { required: "Institution is required" },
        hsc_alevel_optainedMarks: { required: "Obtained Marks are required" },
        hsc_alevel_passingYear: { required: "Passing Year is required" },
        hsc_alevel_percentage: { required: "Percentage is required" },
        hsc_alevel_seatNo: { required: "Seat No is required" },
        hsc_alevel_startYear: { required: "Start Year is required" },
        hsc_alevel_totalMarks: { required: "Total Marks are required" },

        // SSC/O-level fields
        ssc_olevel_board: { required: "Board is required" },
        ssc_olevel_degree: { required: "Degree is required" },
        ssc_olevel_examType: { required: "Exam Type is required" },
        ssc_olevel_grade: { required: "Grade is required" },
        ssc_olevel_group: { required: "Group is required" },
        ssc_olevel_institution: { required: "Institution is required" },
        ssc_olevel_optainedMarks: { required: "Obtained Marks are required" },
        ssc_olevel_passingYear: { required: "Passing Year is required" },
        ssc_olevel_percentage: { required: "Percentage is required" },
        ssc_olevel_seatNo: { required: "Seat No is required" },
        ssc_olevel_startYear: { required: "Start Year is required" },
        ssc_olevel_totalMarks: { required: "Total Marks are required" }

    };

    const { reset, handleSubmit } = form;

    const router = useRouter();

    const { data: session } = useSession(); // Get session data
    const [user, setUser] = useState(null); // Initialize with null

    useEffect(() => {
        if (session?.user) {
            getAdmissionState(session.user)
            setUser(session.user); // Update user state when session is available
            getAcademicData(session.user);
        }
    }, [session]); // Use effect will run when session changes


    const getAdmissionState = async (formdata) => {
        try {
            const response = await fetch(`/api/admission/admissionstate/${formdata.cnic}`);
            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }
            const data = await response.json();
            if (!data?.result?.degreeProgramInformation) {
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



    const getAcademicData = async (formData) => {
        // const addstudentSignupEmail = async (formData) => {
        try {
            const academicDataExistResponse = await fetch("/api/admission/academicData/academicDataExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const academicDataExistResult = await academicDataExistResponse.json();

            if (academicDataExistResult.exists) {
                setExistData({
                    ...academicDataExistResult.data // Update the state with the fetched data
                });
                return; // Stop further processing if any field exists
            }


        } catch (error) {
            setMessage("Error: Please check your connection.");
        }
    };



    // Handle form submission

    const useremail = user ? `${user.email || ""}` : "User email";
    const usercnic = user ? `${user.cnic || ""}` : "User CNIC";

    const addAcademicData = async (formdata) => {
        try {
            let result = await fetch("/api/admission/academicData", {
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
                            academicData: formdata.state
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

                router.push("/admissiondashboard/printPreview");
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
            ...formData, // Use the form data passed to the onSubmit function
            cnic: usercnic,
            email: useremail,
            state: true
        };


        addAcademicData(fullData)
    };

    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    <div className="mb-7">
                        <h3 className="font-semibold text-2xl text-gray-800 text-center">SSC / O-LEVEL Eduction</h3>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                            <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">

                                <span className="flex flex-col space-y-8 w-full">

                                    <span className="lg:flex justify-between block items-end space-y-8">

                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_degree"
                                            rules={validationRules.ssc_olevel_degree}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Degree</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Update form state
                                                            }}
                                                            value={field.value || existData.ssc_olevel_degree} // Ensure correct value from form state
                                                            disabled={existData.state}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50">
                                                                <SelectValue placeholder="-Select Degree-" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="ssc">SSC</SelectItem>
                                                                <SelectItem value="o_level">O-Level</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_group"
                                            rules={validationRules.ssc_olevel_group}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Group</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Update form state
                                                            }}
                                                            value={field.value || existData.ssc_olevel_group} // Ensure correct value from form state
                                                            disabled={existData.state}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50">
                                                                <SelectValue placeholder="-Select Group-" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="general_science">General Science</SelectItem>
                                                                <SelectItem value="science">Science</SelectItem>
                                                                <SelectItem value="humanities">Humanities</SelectItem>
                                                                <SelectItem value="computer_science">Computer Science</SelectItem>
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
                                            name="ssc_olevel_board"
                                            rules={validationRules.ssc_olevel_board}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Board</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)} // Correctly update form state
                                                            value={field.value || existData.ssc_olevel_board} // Ensure form state value is used
                                                            disabled={existData.state}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50">
                                                                <SelectValue placeholder="-Select Board-" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="BISE Lahore Board">BISE Lahore Board</SelectItem>
                                                                <SelectItem value="BISE Gujranwala Board">BISE Gujranwala Board</SelectItem>
                                                                <SelectItem value="BISE Sahiwal Board">BISE Sahiwal Board</SelectItem>
                                                                <SelectItem value="BISE Bahawalpur Board">BISE Bahawalpur Board</SelectItem>
                                                                <SelectItem value="BISE DG Khan Board">BISE DG Khan Board</SelectItem>
                                                                <SelectItem value="BISE Faisalabad Board">BISE Faisalabad Board</SelectItem>
                                                                <SelectItem value="BISE Multan Board">BISE Multan Board</SelectItem>
                                                                <SelectItem value="BISE Rawalpindi Board">BISE Rawalpindi Board</SelectItem>
                                                                <SelectItem value="BISE Sargodha Board">BISE Sargodha Board</SelectItem>
                                                                <SelectItem value="BISE Federal Board">BISE Federal Board</SelectItem>
                                                                <SelectItem value="BISE Hyderabad Board">BISE Hyderabad Board</SelectItem>
                                                                <SelectItem value="BISE Larkana Board">BISE Larkana Board</SelectItem>
                                                                <SelectItem value="BISE MirpurKhas Board">BISE MirpurKhas Board</SelectItem>
                                                                <SelectItem value="BISE Sukkur Board">BISE Sukkur Board</SelectItem>
                                                                <SelectItem value="BSEK Karachi Board">BSEK Karachi Board</SelectItem>
                                                                <SelectItem value="BSEK Agha Khan Board">BSEK Agha Khan Board</SelectItem>
                                                                <SelectItem value="BISE Abbotabad Board">BISE Abbotabad Board</SelectItem>
                                                                <SelectItem value="BISE Bannu Board">BISE Bannu Board</SelectItem>
                                                                <SelectItem value="BISE Kohat Board">BISE Kohat Board</SelectItem>
                                                                <SelectItem value="BISE Malakand Board">BISE Malakand Board</SelectItem>
                                                                <SelectItem value="BISE Mardan Board">BISE Mardan Board</SelectItem>
                                                                <SelectItem value="BISE Peshawar Board">BISE Peshawar Board</SelectItem>
                                                                <SelectItem value="BISE Swat Board">BISE Swat Board</SelectItem>
                                                                <SelectItem value="BISE DI Khan Board">BISE DI Khan Board</SelectItem>
                                                                <SelectItem value="BISE Quetta Board">BISE Quetta Board</SelectItem>
                                                                <SelectItem value="BISE AJK Board">BISE AJK Board</SelectItem>
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
                                            name="ssc_olevel_institution"
                                            rules={validationRules.ssc_olevel_institution}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Institution</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Institution" {...field}
                                                            value={existData.ssc_olevel_institution || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                            name="ssc_olevel_seatNo"
                                            rules={validationRules.ssc_olevel_seatNo}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Seat No</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Seat No" {...field}
                                                            value={existData.ssc_olevel_seatNo || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_examType"
                                            rules={validationRules.ssc_olevel_examType}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Exam Type</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Update form state
                                                            }}
                                                            value={field.value || existData.ssc_olevel_examType} // Ensure correct value from form state
                                                            disabled={existData.state}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50">
                                                                <SelectValue placeholder="-Select Exam Type-" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="annual">Annual</SelectItem>
                                                                <SelectItem value="Supplementary">Supplementary</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_startYear"
                                            rules={validationRules.ssc_olevel_startYear}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Start Year</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Start Year" {...field}
                                                            value={existData.ssc_olevel_startYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_passingYear"
                                            rules={validationRules.ssc_olevel_passingYear}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Passing Year</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Passing Year" {...field}
                                                            value={existData.ssc_olevel_passingYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                            name="ssc_olevel_optainedMarks"
                                            rules={validationRules.ssc_olevel_optainedMarks}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Optained Marks</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Optained Marks" {...field}
                                                            value={existData.ssc_olevel_optainedMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_totalMarks"
                                            rules={validationRules.ssc_olevel_totalMarks}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Total Marks</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Total Marks" {...field}
                                                            value={existData.ssc_olevel_totalMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_percentage"
                                            rules={validationRules.ssc_olevel_percentage}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Persentage</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="Persentage" {...field}
                                                            value={existData.ssc_olevel_percentage || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                            onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                            disabled={existData.state} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="ssc_olevel_grade"
                                            rules={validationRules.ssc_olevel_grade}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Grade</FormLabel>
                                                    <FormControl>
                                                        <Select
                                                            onValueChange={(value) => {
                                                                field.onChange(value); // Update form state
                                                            }}
                                                            value={field.value || existData.ssc_olevel_grade} // Ensure correct value from form state
                                                            disabled={existData.state}
                                                        >
                                                            <SelectTrigger className="w-[200px] bg-white/50">
                                                                <SelectValue placeholder="-Select Grade-" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="A-1">A-1</SelectItem>
                                                                <SelectItem value="A">A</SelectItem>
                                                                <SelectItem value="B">B</SelectItem>
                                                                <SelectItem value="C">C</SelectItem>
                                                                <SelectItem value="D">D</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
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
                            <div className="mb-7">
                                <h3 className="font-semibold text-2xl text-gray-800 text-center">HSC / A-LEVEL Eduction</h3>
                            </div>
                            <span className="flex flex-col gap-8">

                                <span className="lg:flex justify-between block items-end space-y-8">

                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_degree"
                                        rules={validationRules.hsc_alevel_degree}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Degree</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                        }}
                                                        value={field.value || existData.hsc_alevel_degree} // Ensure correct value from form state
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="-Select Degree-" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="hsc">HSC</SelectItem>
                                                            <SelectItem value="a_level">A-Level</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_group"
                                        rules={validationRules.hsc_alevel_group}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Group</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                        }}
                                                        value={field.value || existData.hsc_alevel_group} // Ensure correct value from form state
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="-Select Group-" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pre_engineering">Pre-Engineering</SelectItem>
                                                            <SelectItem value="pre_medical">Pre-Medical</SelectItem>
                                                            <SelectItem value="humanities">Humanities</SelectItem>
                                                            <SelectItem value="computer_science">Computer Science</SelectItem>
                                                            <SelectItem value="commerce">Commerce</SelectItem>
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
                                        name="hsc_alevel_board"
                                        rules={validationRules.ssc_olevel_board}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Board</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => field.onChange(value)} // Correctly update form state
                                                        value={field.value || existData.hsc_alevel_board} // Ensure form state value is used
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="-Select Board-" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="BISE Lahore Board">BISE Lahore Board</SelectItem>
                                                            <SelectItem value="BISE Gujranwala Board">BISE Gujranwala Board</SelectItem>
                                                            <SelectItem value="BISE Sahiwal Board">BISE Sahiwal Board</SelectItem>
                                                            <SelectItem value="BISE Bahawalpur Board">BISE Bahawalpur Board</SelectItem>
                                                            <SelectItem value="BISE DG Khan Board">BISE DG Khan Board</SelectItem>
                                                            <SelectItem value="BISE Faisalabad Board">BISE Faisalabad Board</SelectItem>
                                                            <SelectItem value="BISE Multan Board">BISE Multan Board</SelectItem>
                                                            <SelectItem value="BISE Rawalpindi Board">BISE Rawalpindi Board</SelectItem>
                                                            <SelectItem value="BISE Sargodha Board">BISE Sargodha Board</SelectItem>
                                                            <SelectItem value="BISE Federal Board">BISE Federal Board</SelectItem>
                                                            <SelectItem value="BISE Hyderabad Board">BISE Hyderabad Board</SelectItem>
                                                            <SelectItem value="BISE Larkana Board">BISE Larkana Board</SelectItem>
                                                            <SelectItem value="BISE MirpurKhas Board">BISE MirpurKhas Board</SelectItem>
                                                            <SelectItem value="BISE Sukkur Board">BISE Sukkur Board</SelectItem>
                                                            <SelectItem value="BSEK Karachi Board">BSEK Karachi Board</SelectItem>
                                                            <SelectItem value="BSEK Agha Khan Board">BSEK Agha Khan Board</SelectItem>
                                                            <SelectItem value="BISE Abbotabad Board">BISE Abbotabad Board</SelectItem>
                                                            <SelectItem value="BISE Bannu Board">BISE Bannu Board</SelectItem>
                                                            <SelectItem value="BISE Kohat Board">BISE Kohat Board</SelectItem>
                                                            <SelectItem value="BISE Malakand Board">BISE Malakand Board</SelectItem>
                                                            <SelectItem value="BISE Mardan Board">BISE Mardan Board</SelectItem>
                                                            <SelectItem value="BISE Peshawar Board">BISE Peshawar Board</SelectItem>
                                                            <SelectItem value="BISE Swat Board">BISE Swat Board</SelectItem>
                                                            <SelectItem value="BISE DI Khan Board">BISE DI Khan Board</SelectItem>
                                                            <SelectItem value="BISE Quetta Board">BISE Quetta Board</SelectItem>
                                                            <SelectItem value="BISE AJK Board">BISE AJK Board</SelectItem>
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
                                        name="hsc_alevel_institution"
                                        rules={validationRules.hsc_alevel_institution}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Institution</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Institution" {...field}
                                                        value={existData.hsc_alevel_institution || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                        name="hsc_alevel_seatNo"
                                        rules={validationRules.hsc_alevel_seatNo}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Seat No</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Seat No" {...field}
                                                        value={existData.hsc_alevel_seatNo || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_examType"
                                        rules={validationRules.hsc_alevel_examType}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Exam Type</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                        }}
                                                        value={field.value || existData.hsc_alevel_examType} // Ensure correct value from form state
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="-Select Exam Type-" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="annual">Annual</SelectItem>
                                                            <SelectItem value="Supplementary">Supplementary</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_startYear"
                                        rules={validationRules.hsc_alevel_startYear}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Start Year</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Start Year" {...field}
                                                        value={existData.hsc_alevel_startYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_passingYear"
                                        rules={validationRules.hsc_alevel_passingYear}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Passing Year</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Passing Year" {...field}
                                                        value={existData.hsc_alevel_passingYear || field.value}  // If existData.mname is present, use it; otherwise, use field.value
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
                                        name="hsc_alevel_optainedMarks"
                                        rules={validationRules.hsc_alevel_optainedMarks}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Optained Marks</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Optained Marks" {...field}
                                                        value={existData.hsc_alevel_optainedMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_totalMarks"
                                        rules={validationRules.hsc_alevel_totalMarks}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Total Marks</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Total Marks" {...field}
                                                        value={existData.hsc_alevel_totalMarks || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_percentage"
                                        rules={validationRules.hsc_alevel_percentage}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Persentage</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Persentage" {...field}
                                                        value={existData.hsc_alevel_percentage || field.value}  // If existData.mname is present, use it; otherwise, use field.value
                                                        onChange={field.onChange}               // Keep the input reactive to user input when existData.mname is absent
                                                        disabled={existData.state} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hsc_alevel_grade"
                                        rules={validationRules.hsc_alevel_grade}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            field.onChange(value); // Update form state
                                                        }}
                                                        value={field.value || existData.hsc_alevel_grade} // Ensure correct value from form state
                                                        disabled={existData.state}
                                                    >
                                                        <SelectTrigger className="w-[200px] bg-white/50">
                                                            <SelectValue placeholder="-Select Grade-" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="A-1">A-1</SelectItem>
                                                            <SelectItem value="A">A</SelectItem>
                                                            <SelectItem value="B">B</SelectItem>
                                                            <SelectItem value="C">C</SelectItem>
                                                            <SelectItem value="D">D</SelectItem>
                                                            <SelectItem value="other">Other</SelectItem>
                                                            <SelectItem value="result_awaiting">Result Awaiting</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </span>
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
