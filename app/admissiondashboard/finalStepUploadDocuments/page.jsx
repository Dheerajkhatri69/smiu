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
import { useRouter } from "next/navigation";

const Page = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [messageHead, setMessageHead] = useState("");
    const [message, setMessage] = useState("");
    const [imageUrl, setImageUrl] = useState({
        imgFeeVoucher: "",
        imgCnic_FormB: "",
        imgSSC_Marksheet: "",
        imgHSC_Marksheet: "",
    }); // To store the uploaded image URL
    const [formData, setFormData] = useState({}); // Store all form data here
    const [selectedDate, setSelectedDate] = useState(null);
    const [existData, setExistData] = useState({
        state: false,

        imgFeeVoucher: "",
        imgCnic_FormB: "",
        imgSSC_Marksheet: "",
        imgHSC_Marksheet: "",

        cnic: "",
        email: "",

    });


    // Initialize the form with react-hook-form with validation
    const router = useRouter();
    const { data: session } = useSession(); // Get session data
    const [user, setUser] = useState(null); // Initialize with null

    useEffect(() => {
        if (session?.user) {
            setUser(session.user); // Update user state when session is available
            getAdmissionState(session.user);
            getUploadDocuments(session.user);
        }
    }, [session]); // Use effect will run when session changes


    const getAdmissionState = async (formdata) => {
        try {
            const response = await fetch(`/api/admission/admissionstate/${formdata.cnic}`);
            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }
            const data = await response.json();
            if (!data?.result?.academicData) {
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

    const getUploadDocuments = async (formData) => {
        // const addstudentSignupEmail = async (formData) => {
        try {
            const uploadDocumentsExistResponse = await fetch("/api/admission/uploadDocuments/uploadDocumentsExiste", {
                method: "POST",
                body: JSON.stringify({ cnic: formData.cnic, email: formData.email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const uploadDocumentsExistResult = await uploadDocumentsExistResponse.json();

            if (uploadDocumentsExistResult.exists) {
                setExistData({
                    ...uploadDocumentsExistResult.data // Update the state with the fetched data
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

            imgFeeVoucher: "",
            imgCnic_FormB: "",
            imgSSC_Marksheet: "",
            imgHSC_Marksheet: "",

            cnic: "",
            email: "",

        },
        mode: "onBlur", // Validate on blur
    });

    // Validation rules for all fields to be required

    const { reset, handleSubmit } = form;

    const addUploadDocuments = async (formdata) => {
        try {
            let result = await fetch("/api/admission/uploadDocuments", {
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
                            finalStepUploadDocuments: formdata.state
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
                    <>
                        <span className="bg-green-400 p-2">
                            Success
                        </span>
                    </>
                )
                setMessage("Form submitted successfully!");
                reset(); // Clears all fields to default values
                setImageUrl((prevData) => ({
                    ...prevData,
                    imgFeeVoucher: "",
                    imgCnic_FormB: "",
                    imgSSC_Marksheet: "",
                    imgHSC_Marksheet: "",
                }));
                router.push("/admissiondashboard");
            } else {
                setMessageHead(
                    <>
                        <span className="bg-red-400 p-2">
                            Error
                        </span>
                    </>
                )
                setMessage("Error: Unable to add Upload Documents. Please try again.");
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
        if (
            imageUrl.imgFeeVoucher === "" ||
            imageUrl.imgCnic_FormB === "" ||
            imageUrl.imgSSC_Marksheet === "" ||
            imageUrl.imgHSC_Marksheet === ""
        ) {
            setMessageHead(
                <span className="bg-yellow-200 p-2">Alert</span>
            );
            setMessage("All documents must be uploaded. Please ensure none are missing.");
            setIsDialogOpen(true);
            return;
        }

        const fullData = {
            ...data,
            imgFeeVoucher: imageUrl.imgFeeVoucher, // Include the uploaded image URL
            imgCnic_FormB: imageUrl.imgCnic_FormB,
            imgSSC_Marksheet: imageUrl.imgSSC_Marksheet,
            imgHSC_Marksheet: imageUrl.imgHSC_Marksheet,
            cnic: usercnic,
            email: useremail
        };
        addUploadDocuments(fullData)
    };
    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    <div className="mb-7">
                        <h3 className="font-semibold text-2xl text-gray-800 text-center">Upload Documents</h3>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex justify-between flex-wrap gap-10">
                                <div>
                                    <div className="mb-7">
                                        <h3 className="font-semibold text-xl text-gray-800">Fee Voucher / Challan</h3>
                                    </div>
                                    <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                                        <span className="flex flex-col space-y-8">

                                            {
                                                !existData.state ?
                                                    <UploadButton
                                                        endpoint="imageUploader"
                                                        className={`w-[200px] text-sm px-4 py-3 font-bold  border ${imageUrl.imgFeeVoucher === "" ? "border-red-500 bg-red-300" : "border-black bg-primary"}  rounded-lg focus:outline-none focus:border-purple-400`}
                                                        onClientUploadComplete={(res) => {
                                                            if (res && res.length > 0) {
                                                                const uploadedImageUrl = res[0].url;
                                                                // setImageUrl(uploadedImageUrl);
                                                                setImageUrl((prevData) => ({
                                                                    ...prevData,
                                                                    imgFeeVoucher: uploadedImageUrl,
                                                                }));
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    imgFeeVoucher: uploadedImageUrl,
                                                                }));
                                                            }
                                                        }}
                                                        onUploadError={(error) => {
                                                            alert(`ERROR! ${error.message}`);
                                                        }}
                                                    />
                                                    :
                                                    <Image
                                                        src={existData.imgFeeVoucher}
                                                        alt="Uploaded Image"
                                                        layout="intrinsic"
                                                        width={200} // Specify a width
                                                        height={200} // Specify a height
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                            }
                                            {imageUrl.imgFeeVoucher && (
                                                <div className="relative w-full h-[200px]">
                                                    <Image
                                                        src={imageUrl.imgFeeVoucher}
                                                        alt="Uploaded Image"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </span>
                                    </span>
                                </div>

                                <div>

                                    <div className="mb-7">
                                        <h3 className="font-semibold text-xl text-gray-800">CNIC / FormB</h3>
                                    </div>
                                    <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                                        <span className="flex flex-col space-y-8">
                                            {
                                                !existData.state ?
                                                    <UploadButton
                                                        endpoint="imageUploader"
                                                        className={`w-[200px] text-sm px-4 py-3 font-bold  border ${imageUrl.imgCnic_FormB === "" ? "border-red-500 bg-red-300" : "border-black bg-primary"}  rounded-lg focus:outline-none focus:border-purple-400`}
                                                        onClientUploadComplete={(res) => {
                                                            if (res && res.length > 0) {
                                                                const uploadedImageUrl = res[0].url;
                                                                // setImageUrl(uploadedImageUrl);
                                                                setImageUrl((prevData) => ({
                                                                    ...prevData,
                                                                    imgCnic_FormB: uploadedImageUrl,
                                                                }));
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    imgCnic_FormB: uploadedImageUrl,
                                                                }));
                                                            }
                                                        }}
                                                        onUploadError={(error) => {
                                                            alert(`ERROR! ${error.message}`);
                                                        }}
                                                    />
                                                    :
                                                    <Image
                                                        src={existData.imgCnic_FormB}
                                                        alt="Uploaded Image"
                                                        layout="intrinsic"
                                                        width={200} // Specify a width
                                                        height={200} // Specify a height
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                            }
                                            {imageUrl.imgCnic_FormB && (
                                                <div className="relative w-full h-[200px]">
                                                    <Image
                                                        src={imageUrl.imgCnic_FormB}
                                                        alt="Uploaded Image"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </span>
                                    </span>
                                </div>

                                <div>

                                    <div className="mb-7">
                                        <h3 className="font-semibold text-xl text-gray-800">SSC Marksheet</h3>
                                    </div>
                                    <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                                        <span className="flex flex-col space-y-8">
                                            {
                                                !existData.state ?
                                                    <UploadButton
                                                        endpoint="imageUploader"
                                                        className={`w-[200px] text-sm px-4 py-3 font-bold  border ${imageUrl.imgSSC_Marksheet === "" ? "border-red-500 bg-red-300" : "border-black bg-primary"}  rounded-lg focus:outline-none focus:border-purple-400`}
                                                        onClientUploadComplete={(res) => {
                                                            if (res && res.length > 0) {
                                                                const uploadedImageUrl = res[0].url;
                                                                // setImageUrl(uploadedImageUrl);
                                                                setImageUrl((prevData) => ({
                                                                    ...prevData,
                                                                    imgSSC_Marksheet: uploadedImageUrl,
                                                                }));
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    imgSSC_Marksheet: uploadedImageUrl,
                                                                }));
                                                            }
                                                        }}
                                                        onUploadError={(error) => {
                                                            alert(`ERROR! ${error.message}`);
                                                        }}
                                                    />
                                                    :
                                                    <Image
                                                        src={existData.imgSSC_Marksheet}
                                                        alt="Uploaded Image"
                                                        layout="intrinsic"
                                                        width={200} // Specify a width
                                                        height={200} // Specify a height
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                            }
                                            {imageUrl.imgSSC_Marksheet && (
                                                <div className="relative w-full h-[200px]">
                                                    <Image
                                                        src={imageUrl.imgSSC_Marksheet}
                                                        alt="Uploaded Image"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </span>
                                    </span>
                                </div>
                                <div>

                                    <div className="mb-7">
                                        <h3 className="font-semibold text-xl text-gray-800">HSC Marksheet</h3>
                                    </div>
                                    <span className="lg:flex lg:space-x-8 justify-between items-center block space-y-8">
                                        <span className="flex flex-col space-y-8">
                                            {
                                                !existData.state ?
                                                    <UploadButton
                                                        endpoint="imageUploader"
                                                        className={`w-[200px] text-sm px-4 py-3 font-bold  border ${imageUrl.imgHSC_Marksheet === "" ? "border-red-500 bg-red-300" : "border-black bg-primary"}  rounded-lg focus:outline-none focus:border-purple-400`}
                                                        onClientUploadComplete={(res) => {
                                                            if (res && res.length > 0) {
                                                                const uploadedImageUrl = res[0].url;
                                                                // setImageUrl(uploadedImageUrl);
                                                                setImageUrl((prevData) => ({
                                                                    ...prevData,
                                                                    imgHSC_Marksheet: uploadedImageUrl,
                                                                }));
                                                                setFormData((prevData) => ({
                                                                    ...prevData,
                                                                    imgHSC_Marksheet: uploadedImageUrl,
                                                                }));
                                                            }
                                                        }}
                                                        onUploadError={(error) => {
                                                            alert(`ERROR! ${error.message}`);
                                                        }}
                                                    />
                                                    :
                                                    <Image
                                                        src={existData.imgHSC_Marksheet}
                                                        alt="Uploaded Image"
                                                        layout="intrinsic"
                                                        width={200} // Specify a width
                                                        height={200} // Specify a height
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                            }
                                            {imageUrl.imgHSC_Marksheet && (
                                                <div className="relative w-full h-[200px]">
                                                    <Image
                                                        src={imageUrl.imgHSC_Marksheet}
                                                        alt="Uploaded Image"
                                                        layout="fill"
                                                        objectFit="cover"
                                                        className="rounded-lg"
                                                    />
                                                </div>
                                            )}
                                        </span>
                                    </span>

                                </div>
                            </div>

                            <Button type="submit" disabled={existData.state} className="w-full lg:w-[200px] bg-black text-white font-extrabold hover:bg-gray-600">Save</Button>
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
