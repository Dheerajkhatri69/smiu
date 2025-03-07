'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminMCQCreator({ params }) {
    const [quizData, setQuizData] = useState([]);

    useEffect(() => {
        getEntryTestQ();
    }, []);

    const getEntryTestQ = async () => {
        try {
            const response = await fetch("/api/admission/entryTestQ");
            if (!response.ok) {
                throw new Error("Failed to fetch admission state");
            }
            const data = await response.json();
            setQuizData(data.result.filter(q => q.quizNo === params.showQuiz));

        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border flex gap-4 flex-col items-center border-white/40 shadow-lg p-2 md:p-8 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    <div className="w-full">
                        <Link href={"/dashboard/admission/entryTest"} className="flex justify-start">
                            <ArrowLeftCircle size={30} className="text-black" />
                        </Link>
                    </div>
                    <Card className="bg-transparent shadow-none border-none py-4">
                        <CardHeader className="p-0">
                            <CardTitle>Questions</CardTitle>
                            <CardDescription>Number of Questions: {quizData.length}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 my-2">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {quizData
                                    .sort((a, b) => a.id - b.id) // Sort in ascending order of q.id
                                    .map((q) => (
                                        <li
                                            key={q.id}
                                            className="p-4 bg-gray-100 rounded-xl hover:scale-105 hover:bg-primary/50 shadow-xl duration-150 ease-in"
                                        >
                                            <div>
                                                <p className="font-bold">Q.No: {q.id}</p>
                                                <p className="font-bold">{q.question}</p>
                                            </div>
                                            <ul className="mt-2">
                                                {q.options.map((option, index) => (
                                                    <li key={index} className="flex items-center">
                                                        <span className="mr-2">{index + 1}.</span>
                                                        <span>{option}</span>
                                                        {option === q.answer && (
                                                            <span className="ml-2 text-green-500 font-bold">
                                                                (Correct)
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div >
    );
}
