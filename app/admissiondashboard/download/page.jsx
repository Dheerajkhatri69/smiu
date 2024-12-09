'use client'
import React, { useEffect, useState } from 'react';
import { CheckCheck, FileWarning } from "lucide-react";

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import Link from 'next/link';
import { checkInviteExistence } from '@/components/adminDeshboard/admission/entryTest/invitef';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

const Download = () => {
    const [invitedState, setInvitedState] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageHead, setMessageHead] = useState("");
    const route =  useRouter()
    const { data: session } = useSession(); // Get session data

    useEffect(() => {
        // Ensure session is loaded before accessing session.user
        if (session?.user?.cnic) {
            inviteForTest(session.user.cnic);
        }
    }, [session]);

    const inviteForTest = async (cnic) => {
        try {
            const check = await checkInviteExistence(cnic); // Pass CNIC to the function
            setInvitedState(check);
            setLoading(false);
        } catch (error) {
            console.error("Error checking invite existence:", error);
        }
    };
    const gotoEntryTest = () => {
        setMessageHead("Alert: You have only one chance to attempt the test");
        setMessage(
            "During the test, if you try to go back or access other websites, your test will be terminated. " +
            "You have 1 hour to attempt 60 MCQs: 15 Math, 15 General Knowledge, 15 IQ, and 15 English."
        );
        setIsDialogOpen(true);
    };


    return (
        <div className='m-2 flex flex-col gap-4 items-center'>
            {
                loading ?
                    Array.from({ length: 3 }).map((_, index) => (
                        <Alert
                            key={index}
                            className="max-w-[500px] gap-2 flex bg-background/50 shadow-lg border-none rounded-2xl cursor-pointer">
                            <Skeleton className="h-6 w-6 bg-gray-300 rounded-full" />
                            <div className="flex flex-col gap-2 w-full">
                                <Skeleton className="h-4 w-1/3 bg-gray-300 rounded" />
                                <Skeleton className="h-3 w-2/3 bg-gray-300 rounded" />
                            </div>
                        </Alert>
                    ))
                    :
                    invitedState ? (
                        <Alert
                            onClick={gotoEntryTest}
                            className="max-w-[500px] bg-green-200 hover:scale-110 ease-in duration-150 shadow-lg border-none rounded-2xl cursor-pointer">
                            <CheckCheck className="h-4 w-4" />
                            <AlertTitle>Attempt Your Entry Test Now!</AlertTitle>
                            <AlertDescription>
                                Click here to start your entry test. Best of luck in showcasing your skills and potential!
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Alert className="max-w-[500px] bg-yellow-100 hover:scale-110 ease-in duration-150 shadow-lg border-none rounded-2xl">
                            <FileWarning className="h-4 w-4" />
                            <AlertTitle>No Updates Available</AlertTitle>
                            <AlertDescription>
                                There are currently no updates available. Please check back later for the latest information.
                            </AlertDescription>
                        </Alert>
                    )
            }
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{messageHead}</AlertDialogTitle>
                        <AlertDialogDescription>{message}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => route.push("/admissiondashboard/entryTest")}>Go</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default Download;
