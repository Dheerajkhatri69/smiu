'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, DatabaseIcon, Delete, EllipsisVertical, Loader2, MessageCircle, Trash, } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "./button";
import Link from "next/link";
import { useState } from "react";

const Verified = ({ className, ...props }) => (
    <svg
        aria-label="Verified Account"
        viewBox="0 0 24 24"
        className={className}
        {...props}
    >
        <g fill="currentColor">
            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
        </g>
    </svg>
);

const truncate = (str, length) => {
    if (!str || str.length <= length) return str;
    return `${str.slice(0, length - 3)}...`;
};


const TweetHeader = ({ status, user, deleteUser }) => (
    <div className="flex flex-row justify-between tracking-tight">
        <div className="flex items-center space-x-2">
            <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{user.fname.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="flex items-center whitespace-nowrap font-semibold">
                    {truncate(user.fname + " " + user.lname, 20)}
                    {status.personalData ? <Verified className="ml-1 inline size-4 text-green-500" /> : null}
                    {status.guardiansData ? <Verified className="ml-1 inline size-4 text-green-500" /> : null}
                    {status.degreeProgramInformation ? <Verified className="ml-1 inline size-4 text-green-500" /> : null}
                    {status.academicData ? <Verified className="ml-1 inline size-4 text-green-500" /> : null}
                    {status.finalStepUploadDocuments ? <Verified className="ml-1 inline size-4 text-green-500" /> : null}
                </p>
                <div className="flex items-center space-x-1">
                    <p
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-gray-500 transition-all duration-75"
                    >
                        @{truncate(user.email, 16)}
                    </p>
                </div>
            </div>
        </div>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <EllipsisVertical cursor="pointer" className="hover:scale-x-150" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-primary/90">
                <DropdownMenuLabel>{user.fname}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        {
                            status.personalData ? <Check /> : <Cross1Icon />
                        }
                        <span>Personal Data</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {
                            status.guardiansData ? <Check /> : <Cross1Icon />
                        }
                        <span>Guardians Data</span>
                        <DropdownMenuShortcut>⌘G</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {
                            status.degreeProgramInformation ? <Check /> : <Cross1Icon />
                        }
                        <span>Degree Program</span>
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {
                            status.academicData ? <Check /> : <Cross1Icon />
                        }
                        <span>Academic Data</span>
                        <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        {
                            status.finalStepUploadDocuments ? <Check /> : <Cross1Icon />
                        }
                        <span>Documents</span>
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <DatabaseIcon />
                        <span>All Information</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <MessageCircle />
                    <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                    <Button className="w-full p-1 text-red-500 font-bold"
                        onClick={() => deleteUser(user.cnic)} // Pass cnic to deleteUser
                    >
                        <Trash />
                        <span>Delete</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    </div>
);

const TweetBody = ({ user }) => (
    <div className="flex justify-between items-end">
        <div>
            <p
                className="text-sm font-normal text-gray-500"
            >
                <span>Full Name: </span>
                <span
                    className="text-sm font-normal"
                >{user.fname + " " + user.mname + " " + user.lname}</span>
            </p>
            <p
                className="text-sm font-normal text-gray-500"
            >
                <span>Father: </span>
                <span
                    className="text-sm font-normal"
                >{user.fathersName}</span>
            </p>
            <p
                className="text-sm font-normal text-gray-500"
            >
                <span>CNIC: </span>
                <span
                    className="text-sm font-normal"
                >{user.cnic}</span>
            </p>
            <p
                className="text-sm font-bold text-gray-500"
            >
                <span>Mobile: </span>
                <span
                    className="text-sm"
                >{user.mobile}</span>
            </p>
        </div>

        <div>
            <Link href={`/dashboard/admission/admissionForms/${user.cnic}`} >
                <Button className="bg-gray-200 text-black hover:bg-slate-300 duration-100 ease-in">
                    {
                        false ? <Loader2 className="animate-spin" /> : null
                    }
                    All Info
                </Button>
            </Link>
        </div>
    </div>
);
export const Tweet = (props) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageHead, setMessageHead] = useState("");


    const deleteUser = async (cnic) => {
        try {
            // Define all delete functions in sequence
            const deleteSteps = [
                deleteuploadDocuments,
                deleteacademicData,
                deletedegreeProgramInformation,
                deleteguardiansData,
                deletepersonaldata,
                deleteadmissionstate,
            ];

            // Iterate through each delete function
            for (const step of deleteSteps) {
                const isDeleted = await step(cnic);
                if (!isDeleted) {
                    setMessageHead("Deletion Failed");
                    setMessage("An error occurred while deleting data. Please try again.");
                    setIsDialogOpen(true);
                    return; // Exit early if any step fails
                }
            }
            // Success message
            setMessageHead("Deletion Successful");
            setMessage("All related data has been deleted successfully.");
            setIsDialogOpen(true);
        } catch (error) {
            console.error("Error during deletion:", error);
            setMessageHead("Error");
            setMessage("An unexpected error occurred. Please contact support.");
            setIsDialogOpen(true);
        }
    };

    const deleteadmissionstate = async (cnic) => {
        try {
            const response = await fetch(`/api/admission/admissionstate/${cnic}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (response.ok) {
                return true; // Success message
            } else {
                alert(data.error || data.message); // Error message
                return false;
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
            return false;
        }
    };

    const deletepersonaldata = async (cnic) => {
        try {
            const response = await fetch("/api/admission/personaldataExiste/usingCnic", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic }),
            });
            const data = await response.json();

            if (response.ok) {
                return true; // Success message
            } else {
                alert(data.error || data.message); // Error message
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }
    const deleteuploadDocuments = async (cnic) => {
        try {
            const response = await fetch("/api/admission/uploadDocuments/uploadDocumentsExiste", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic }),
            });
            const data = await response.json();

            if (response.ok) {
                return true; // Success message
            } else {
                alert(data.error || data.message); // Error message
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }

    const deletedegreeProgramInformation = async (cnic) => {
        try {
            const response = await fetch("/api/admission/degreeProgramInformation/degreeProgramInformationExiste", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic }),
            });
            const data = await response.json();

            if (response.ok) {
                return true; // Success message
            } else {
                alert(data.error || data.message); // Error message
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }
    const deleteacademicData = async (cnic) => {
        try {
            const response = await fetch("/api/admission/academicData/academicDataExiste", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic }),
            });
            const data = await response.json();

            if (response.ok) {
                return true; // Success message
            } else {
                alert(data.error || data.message); // Error message
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }

    const deleteguardiansData = async (cnic) => {
        try {
            const response = await fetch("/api/admission/guardiansData/guardiansDataExiste", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic }),
            });
            const data = await response.json();

            if (response.ok) {
                return true; // Success message
            } else {
                alert(data.error || data.message); // Error message
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while deleting the user.");
        }
    }
    return (
        <div className="flex hover:scale-y-105 duration-150 ease-in backdrop-blur-lg border border-white/40 shadow-lg bg-background/50 rounded-3xl size-full flex-col gap-2 border-black p-4">
            <TweetHeader status={props.all} user={props.user} deleteUser={deleteUser}/>
            <TweetBody user={props.user} />

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="rounded-md">
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


