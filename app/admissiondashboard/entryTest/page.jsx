'use client';
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { checkInviteExistence } from "@/components/adminDeshboard/admission/entryTest/invitef";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

export default function Page() {
    const router = useRouter();
    const timerRef = useRef(null);
    const [timer, setTimer] = useState("00:10:00");
    const [pageIndex, setPageIndex] = useState(0);
    const [answered, setAnswered] = useState({});
    const [score, setScore] = useState(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messageHead, setMessageHead] = useState("");
    const [quizData, setQuizData] = useState([]);
    const { data: session } = useSession(); // Get session data
    const [loading, setLoading] = useState(true);
    const [invitedState, setInvitedState] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const handleInviteAndQuestions = async () => {
            try {
                if (session?.user?.cnic) {
                    // Check if the score already exists
                    const scoreExist = await checkScoreExist(session.user.cnic); // Await the result

                    // Validate response structure
                    if (scoreExist && typeof scoreExist === "object" && scoreExist.state) {
                        // User has already attempted the test
                        setMessageHead("Test Already Attempted");
                        setMessage(
                            `You have already attempted the entry test. You cannot take the test again. Your score: ${scoreExist.score}`
                        );
                        setIsDialogOpen(true);
                        return; // Exit early to prevent further API calls
                    }

                    // If the score does not exist, proceed to invite and fetch questions
                    const quizno = await inviteForTest(session.user.cnic);
                    if (quizno) {
                        getEntryTestQ(quizno); // Fetch the questions
                    } else {
                        console.warn("No quiz number found for the given CNIC.");
                    }
                }
            } catch (error) {
                console.error("Error handling invite and questions:", error);

                // Set error message for user
                setMessageHead("Error");
                setMessage("An error occurred while processing your entry test. Please try again later.");
                setIsDialogOpen(true);
            }
        };

        handleInviteAndQuestions(); // Call the async function
    }, [session?.user?.cnic]); // Only re-run when CNIC changes

    const inviteForTest = async (cnic) => {
        try {
            const check = await checkInviteExistence(cnic); // Pass CNIC to the function
            setInvitedState(check);
            return check?.quizNo || null; // Return quizNo or null if not found
        } catch (error) {
            console.error("Error checking invite existence:", error);
            return null; // Return null on error
        }
    };

    useEffect(() => {

        warnOnPageReload();

        return () => {
            clearInterval(timerRef.current);
            removePageReloadWarning();
        };
    }, []);
    const checkScoreExist = async (cnic) => {
        try {
            const res = await fetch('/api/admission/entryTestQ/testScore/testScoreExiste', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cnic }), // Send the CNIC as payload
            });

            const data = await res.json();
            return data.data;

        } catch (err) {
            console.error('Error checking invite:', err);
            throw new Error('Server error');
        }
    }

    const getEntryTestQ = async (quizno) => {
        try {
            const response = await fetch("/api/admission/entryTestQ");
            if (!response.ok) throw new Error("Failed to fetch admission state");
            const data = await response.json();
            if (data.success) {
                setLoading(false);
            }
            setQuizData(data.result.filter(q => q.quizNo === quizno));
        } catch (error) {
            alert(error.message);
        }
    };

    // Timer utilities
    const getTimeRemaining = (deadline) => {
        const total = Date.parse(deadline) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return { total, hours, minutes, seconds };
    };

    const startTimer = (deadline) => {
        const { total, hours, minutes, seconds } = getTimeRemaining(deadline);
        if (total >= 0) {
            setTimer(
                `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
                }:${seconds > 9 ? seconds : "0" + seconds}`
            );
        } else {
            clearInterval(timerRef.current);
            calculateScore(); // Calculate the score first
            setTimeout(() => {
                setMessageHead("Time's Up!");
                setMessage("The test has ended. Your result will now be submitted.");
                setIsDialogOpen(true); // Open the dialog after the score is set
            }, 0); // Ensure dialog update happens after score calculation
        }
    };


    // Timer utilities
    const initializeTimer = () => {
        const deadline = new Date();
        deadline.setHours(deadline.getHours() + 1); // Add 1 hour
        return deadline;
    };

    useEffect(() => {
        const deadline = initializeTimer();
        timerRef.current = setInterval(() => startTimer(deadline), 1000);

        return () => {
            clearInterval(timerRef.current);
        };
    }, []);


    // Quiz logic
    const addAnswer = (e) => {
        const { name, value } = e.target;
        setAnswered({ ...answered, [name]: value });
    };
    const calculateScore = async () => {
        setIsLoading(true);
        // Ensure this function runs only once
        if (score !== null && score > 0) return;

        // Calculate the score based on answers
        let calculatedScore = 0;
        quizData.forEach((q) => {
            if (answered[q.id] === q.answer) calculatedScore++;
        });

        // Update the score state
        setScore(calculatedScore);

        // Prepare data for submission
        const data = {
            cnic: invitedState?.cnic || null, // Ensure CNIC is present
            score: calculatedScore, // Pass the actual score, not the function
            state: true, // Additional state if required
        };

        // Post the score and handle the result
        try {
            const result = await postScore(data);

            if (result && result.success) {
                // Success: Show dialog with the score
                setMessageHead("Test Submitted");
                setMessage(`Your score: ${calculatedScore}`);
            } else {
                // Failure: Inform the user
                setMessageHead("Submission Failed");
                setMessage(result?.message || "An error occurred while submitting your test.");
            }
        } catch (error) {
            console.error("Error in calculateScore:", error);
            setMessageHead("Submission Failed");
            setMessage("An unexpected error occurred. Please try again.");
        } finally {
            // Ensure the dialog is shown in any case
            setIsDialogOpen(true);
        }
    };


    const postScore = async (data) => {
        try {
            const response = await fetch("/api/admission/entryTestQ/testScore", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            // Check if the response is OK (status code 2xx)
            if (!response.ok) {
                console.error(`Failed to post score. Status: ${response.status}, ${response.statusText}`);
                return {
                    success: false,
                    message: `Failed to post score. Status: ${response.status}, ${response.statusText}`,
                };
            }

            // Parse the response
            const result = await response.json();

            // Check if the response contains the expected `success` field
            if (result && result.success) {
                setIsLoading(false);
                console.log("Score posted successfully:", result);
                return { success: true, data: result };
            } else {
                console.error("API response error:", result);
                return {
                    success: false,
                    message: result?.message || "Unexpected API response format",
                };
            }
        } catch (error) {
            console.error("Error occurred while posting the score:", error);
            return {
                success: false,
                message: "An error occurred while posting the score. Please try again.",
            };
        }
    };

    const currentQuestion = quizData[pageIndex];
    const totalQuestions = quizData.length;


    // Page reload warning
    const warnOnPageReload = () => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = ""; // Modern browsers show a generic message
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
    };

    const removePageReloadWarning = () => {
        window.removeEventListener("beforeunload", (e) => {
            e.preventDefault();
        });
    };

    const handlePageReload = () => {
        setMessageHead("Warning!");
        setMessage("If you reload the page, your test will be auto-submitted.");
        setIsDialogOpen(true);
    };

    return (
        <div className="relative overflow-hidden">
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                {
                    loading ?
                        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                            {/* Header Skeleton */}
                            <div className="mb-7">
                                <Skeleton className="h-6 w-32 bg-gray-300 rounded mx-auto" />
                            </div>

                            {/* Timer and Question Index Skeleton */}
                            <div className="flex flex-row justify-between items-center w-full text-2xl font-bold mb-4">
                                <Skeleton className="h-6 w-16 bg-gray-300 rounded" />
                                <Skeleton className="h-6 w-20 bg-gray-300 rounded" />
                            </div>

                            {/* Question Skeleton */}
                            <div className="mb-4">
                                <Skeleton className="h-4 w-3/4 bg-gray-300 rounded mb-2" />
                                <Skeleton className="h-4 w-2/3 bg-gray-300 rounded" />
                            </div>

                            {/* Options Skeleton */}
                            <ul className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <li key={i} className="flex items-center">
                                        <Skeleton className="h-5 w-5 bg-gray-300 rounded-full mr-2" />
                                        <Skeleton className="h-4 w-1/2 bg-gray-300 rounded" />
                                    </li>
                                ))}
                            </ul>

                            {/* Navigation Buttons Skeleton */}
                            <div className="mt-8 w-full flex flex-row justify-between">
                                <Skeleton className="h-10 w-24 bg-gray-300 rounded" />
                                <Skeleton className="h-10 w-24 bg-gray-300 rounded" />
                            </div>
                        </div>
                        :
                        <div className="backdrop-blur-lg border border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                            <div className="mb-7">
                                <h3 className="font-semibold text-2xl text-gray-800 text-center">Entry Test</h3>
                            </div>
                            <div className="flex flex-row justify-between items-center w-full text-2xl font-bold mb-4">
                                <h2 className={parseInt(timer.split(":")[1]) < 1 ? "text-red-500" : ""}>
                                    {timer}
                                </h2>
                                <p>
                                    {pageIndex + 1} of {totalQuestions}
                                </p>
                            </div>
                            <div>
                                <div key={currentQuestion?.id}>
                                    <p>{currentQuestion?.question}</p>
                                </div>
                                <ul>
                                    {currentQuestion?.options.map((option, i) => (
                                        <li className="list-none my-3" key={i}>
                                            <input
                                                className="mr-2"
                                                type="radio"
                                                name={currentQuestion?.id.toString()}
                                                onChange={addAnswer}
                                                value={option}
                                                checked={answered[currentQuestion?.id] === option}
                                            />
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 w-full flex flex-row justify-between">
                                {pageIndex > 0 ? (
                                    <button
                                        className="bg-white text-black py-2 px-3 text-sm rounded-lg border border-white cursor-pointer hover:bg-transparent hover:text-gray-200"
                                        onClick={() => setPageIndex(pageIndex - 1)}
                                    >
                                        Previous Question
                                    </button>
                                ) : (
                                    <button
                                        className="bg-white text-black py-2 px-3 text-sm rounded-lg border border-white cursor-pointer hover:bg-transparent hover:text-gray-200"
                                        onClick={handlePageReload}
                                    >
                                        Cancel
                                    </button>
                                )}
                                {pageIndex < totalQuestions - 1 ? (
                                    <button
                                        className={`py-2 px-3 text-sm rounded-lg border cursor-pointer ${answered[currentQuestion?.id] === undefined
                                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                            : "bg-white text-black border-white hover:bg-transparent hover:text-gray-200"
                                            }`}
                                        onClick={() => setPageIndex(pageIndex + 1)}
                                        disabled={answered[currentQuestion?.id] === undefined}
                                    >
                                        Next Question
                                    </button>
                                ) : (
                                    answered[currentQuestion?.id] !== undefined && (
                                        <button
                                            onClick={calculateScore}
                                            className="text-center bg-green-700 text-white py-2 px-4 text-sm rounded-lg border border-white cursor-pointer font-bold hover:border-green-700"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="animate-spin" />
                                            ) : (
                                                "Finish"
                                            )}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                }
            </div>
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="rounded-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>{messageHead}</AlertDialogTitle>
                        <AlertDialogDescription>{message}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => router.push("/admissiondashboard/download")}>Ok</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
