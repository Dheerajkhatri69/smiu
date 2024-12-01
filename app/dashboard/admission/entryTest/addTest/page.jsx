'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkX, CircleCheckBig } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
export default function AdminMCQCreator() {
    const [questionL = setQuestionL] = useState(60);
    const [quizNO, setQuizNo] = useState(0);
    const [quizData, setQuizData] = useState([]);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");
    const [progress, setProgress] = useState(0);
    const router = useRouter();
    const [addButton, setAddButton] = useState(false)
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };
    const addQuestion = () => {
        if (!question || options.some((opt) => !opt.trim()) || !answer || !quizNO) {
            alert("Please fill all fields and select a valid answer.");
            return;
        }
        const newQuestion = {
            quizNo: quizNO,
            id: quizData.length + 1,
            question,
            options,
            answer,
        };

        setQuizData([...quizData, newQuestion]);
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
    };
    const removeQuestion = (id) => {
        const updatedQuizData = quizData.filter((q) => q.id !== id);
        setQuizData(updatedQuizData);
    };


    const addQuiz = async (formData) => {
        setAddButton(true);
        const totalQuizzes = formData.length;
        let currentProgress = 0; // Local progress tracker

        for (const quiz of formData) {
            const success = await addQuizSingle(quiz);
            if (success) {
                currentProgress++;
                setProgress((currentProgress / totalQuizzes) * 100); // Update progress as percentage
            }
        }
    };

    const addQuizSingle = async (quiz) => {

        try {
            const response = await fetch('/api/admission/entryTestQ', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quiz),
            });

            if (response.ok) {
                return true; // Return success for progress update
            } else {
                const result = await response.json();
                console.error("Failed to add quiz:", result);
                return false; // Failed case
            }
        } catch (error) {
            console.error("Error adding quiz:", error);
            return false; // Error case
        }
    };


    return (

        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border flex gap-4 flex-col items-center border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    {
                        quizData.length > 0 ? null
                            :
                            <Input
                                placeholder="Enter Quiz Code"
                                type="number"
                                disabled={quizData.length > 0}
                                onChange={(e) => setQuizNo(e.target.value)}
                            />
                    }
                    {
                        quizData.length >= questionL ? null :
                            <Card className="min-w-[350px] w-full max-w-[500px] shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-center">Create MCQs</CardTitle>
                                    <div className="flex justify-between items-center">
                                        <CardDescription>For Entry Test.</CardDescription>
                                        <CardDescription className="text-xl font-bold">{quizData.length}/60</CardDescription>
                                    </div>
                                    <label className="block font-semibold mb-2">Quiz No</label>
                                    <Input
                                        value={quizNO}
                                        disabled
                                    />
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <label className="block font-semibold mb-2">Question</label>
                                        <Input
                                            placeholder="Enter question"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-semibold mb-2">Options</label>
                                        {options.map((option, index) => (
                                            <div key={index} className="mb-2">
                                                <Input
                                                    placeholder={`Option ${index + 1}`}
                                                    value={option}
                                                    onChange={(e) => handleOptionChange(index, e.target.value)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mb-4">
                                        <label className="block font-semibold mb-2">Correct Answer</label>
                                        <Select
                                            onValueChange={(value) => setAnswer(value)}
                                            value={answer}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select Correct Answer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Options</SelectLabel>
                                                    {options.map((option, index) => (
                                                        option.trim() && (
                                                            <SelectItem key={index} value={option}>
                                                                {option}
                                                            </SelectItem>
                                                        )
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="text-black font-bold" onClick={addQuestion}>Add Question</Button>
                                </CardFooter>
                            </Card>
                    }
                    <Card className="min-w-[350px] w-full max-w-[500px]">
                        <CardHeader>
                            {
                                quizData.length >= questionL ?
                                    <div>
                                        <Button disabled={addButton} className="text-black" onClick={() => addQuiz(quizData)}>Add Quiz</Button>
                                        <Progress value={progress} className="w-full mt-2" />
                                    </div> : null
                            }
                            {
                                progress >= 100 ?
                                    <div className="w-full flex flex-col text-green-500 items-center justify-center mt-2">
                                        <div>Successfully added quiz {quizNO}</div>
                                        <CircleCheckBig className="opacity-50 text-green-500" size={100} />
                                        <div className="w-full">
                                            <Button className="text-black" onClick={() => router.push("/dashboard/admission/entryTest")}>Back</Button>
                                        </div>
                                    </div>
                                    : null
                            }
                            <CardTitle>Questions</CardTitle>
                            <CardDescription>Number of Question: {quizData.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {quizData.length === 0 ? (
                                <p className="text-center text-gray-500">No questions added yet.</p>
                            ) : (
                                progress >= 100 ? null :
                                    <ul className="space-y-4">
                                        {quizData.map((q) => (
                                            <li key={q.id} className="p-4 bg-gray-100 rounded-md hover:scale-105 hover:bg-primary/50 shadow-xl duration-150 ease-in">
                                                <div className="flex justify-between">
                                                    <p className="font-bold">{q.question}</p>
                                                    <BookmarkX
                                                        className="text-red-500 hover:scale-110 duration-150 ease-in cursor-pointer"
                                                        onClick={() => removeQuestion(q.id)}
                                                    />
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
                            )}
                        </CardContent>

                    </Card>

                </div>
            </div>
        </div >
    );
}
