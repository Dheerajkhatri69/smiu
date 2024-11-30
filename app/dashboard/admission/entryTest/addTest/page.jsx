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
import { BookmarkX } from "lucide-react";

export default function AdminMCQCreator() {
    const [quizData, setQuizData] = useState([]);
    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", "", "", ""]);
    const [answer, setAnswer] = useState("");

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const addQuestion = () => {
        if (!question || options.some((opt) => !opt.trim()) || !answer) {
            alert("Please fill all fields and select a valid answer.");
            return;
        }

        const newQuestion = {
            id: quizData.length + 1,
            question,
            options,
            answer,
        };

        setQuizData([...quizData, newQuestion]);
        setQuestion("");
        setOptions(["", "", "", ""]);
        setAnswer("");
        console.log(quizData)
    };
    const removeQuestion = (id) => {
        const updatedQuizData = quizData.filter((q) => q.id !== id);
        setQuizData(updatedQuizData);
    };

    return (

        <div className='relative overflow-hidden'>
            <div className="bg-primary-foreground absolute top-0 left-0 bg-gradient-to-b bg-background/50 blur bottom-0 leading-5 h-[50%] rotate-45 w-full overflow-hidden rounded-3xl"></div>
            <div className="flex justify-center self-center z-10 m-2">
                <div className="backdrop-blur-lg border flex gap-4 flex-col items-center border-white/40 shadow-lg p-12 bg-primary-foreground/50 mx-auto rounded-3xl w-full">
                    {
                        quizData.length >= 60 ? null:
                            <Card className="min-w-[350px] w-full max-w-[500px] shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-center">Create MCQs</CardTitle>
                                    <div className="flex justify-between items-center">
                                        <CardDescription>For Entry Test.</CardDescription>
                                        <CardDescription className="text-xl font-bold">{quizData.length}/60</CardDescription>
                                    </div>
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
                                quizData.length >= 60 ? <Button className="text-black" onClick={()=>{console.log(quizData)}}>Add Quiz</Button> : null
                            }

                            <CardTitle>Questions</CardTitle>
                            <CardDescription>Number of Question: {quizData.length}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {quizData.length === 0 ? (
                                <p className="text-center text-gray-500">No questions added yet.</p>
                            ) : (
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
