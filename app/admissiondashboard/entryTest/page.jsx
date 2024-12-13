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

    useEffect(() => {
        getEntryTestQ();
        warnOnPageReload();

        return () => {
            clearInterval(timerRef.current);
            removePageReloadWarning();
        };
    }, []);

    const getEntryTestQ = async () => {
        try {
            const response = await fetch("/api/admission/entryTestQ");
            if (!response.ok) throw new Error("Failed to fetch admission state");
            const data = await response.json();
            setQuizData(data.result.filter(q => q.quizNo === '1'));
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

    const calculateScore = () => {
        if (score > 0) return; // Ensure this runs only once
        let calculatedScore = 0;
        quizData.forEach((q) => {
            if (answered[q.id] === q.answer) calculatedScore++;
        });
        setScore(calculatedScore);
        setMessageHead("Test Submitted");
        setMessage(`Your score: ${calculatedScore}`);
        setIsDialogOpen(true);
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
                                    Finish
                                </button>
                            )
                        )}
                    </div>
                </div>
            </div>
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
}
